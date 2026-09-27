import assert from "node:assert/strict";

// =============================================================================
// Relatia — Platform Admin vs Company Admin Tenancy & Security Unit Tests
// =============================================================================

type MockRole =
  | "PLATFORM_ADMIN"
  | "COMPANY_ADMIN"
  | "ADMIN"
  | "REQUESTER"
  | "APPROVER"
  | "FINANCE";

type MockUser = {
  id: number;
  email: string;
  role: MockRole;
  companyId: number | null;
};

type MockCompanyPolicy = {
  companyId: number;
  maxBudget: number;
  perPersonCap: number;
  allowedCities: string[];
  approverRole: string;
};

type MockEvent = {
  id: number;
  companyId: number;
  status: string;
  createdById: number;
};

type MockApproval = {
  id: number;
  eventId: number;
  approverId: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

// ── Auth & Guard Simulators matching lib/auth.ts and routes ──────────────────

function simulateRequirePlatformAdmin(user: MockUser): { allowed: true } | { error: string } {
  if (user.role !== "PLATFORM_ADMIN") {
    return { error: "Unauthorized: Requires PLATFORM_ADMIN role" };
  }
  return { allowed: true };
}

function simulateRequireCompanyAdmin(user: MockUser): { allowed: true } | { error: string } {
  const allowedRoles: MockRole[] = ["COMPANY_ADMIN", "ADMIN"];
  if (!allowedRoles.includes(user.role)) {
    return { error: `Unauthorized: Role '${user.role}' is not authorized for company administration` };
  }
  if (user.companyId == null) {
    return { error: "User is not linked to any company" };
  }
  return { allowed: true };
}

function simulateRequireUserRole(
  user: MockUser,
  allowedRoles: MockRole[],
): { allowed: true } | { error: string } {
  if (!allowedRoles.includes(user.role)) {
    return { error: `Unauthorized: Role '${user.role}' not in allowed roles` };
  }
  if (user.companyId == null && user.role !== "PLATFORM_ADMIN") {
    return { error: "User is not linked to any company" };
  }
  return { allowed: true };
}

// ── Scoped-context simulators matching requireScopedUser/requireTenantUser ──

type ScopedMockUser =
  | (MockUser & { context: { scope: "platform" } })
  | (MockUser & { context: { scope: "tenant"; companyId: number } });

function simulateRequireScopedUser(user: MockUser): ScopedMockUser | { error: string } {
  if (user.role === "PLATFORM_ADMIN") {
    return { ...user, context: { scope: "platform" } };
  }
  if (user.companyId == null) {
    return { error: "User is not linked to any company" };
  }
  return { ...user, context: { scope: "tenant", companyId: user.companyId } };
}

function simulateRequireTenantUser(user: MockUser): { allowed: true; companyId: number } | { error: string } {
  const scoped = simulateRequireScopedUser(user);
  if ("error" in scoped) return scoped;
  if (scoped.context.scope === "platform") {
    return { error: "Blocked: PLATFORM_ADMIN requires explicit tenant context" };
  }
  return { allowed: true, companyId: scoped.context.companyId };
}

function getWorkspaceName(user: ScopedMockUser): string {
  if (user.context.scope === "platform") return "Relatia Platform";
  return `Company-${user.context.companyId}`;
}

// ── Domain Action Simulators ──────────────────────────────────────────────────

function simulateOnboardingTenantCreation(user: MockUser): { user: MockUser; companyId: number } {
  const newCompanyId = 101;
  const updatedUser: MockUser = {
    ...user,
    companyId: newCompanyId,
    role: "COMPANY_ADMIN", // Onboarding MUST assign COMPANY_ADMIN, NOT PLATFORM_ADMIN
  };
  return { user: updatedUser, companyId: newCompanyId };
}

function simulateProviderVerificationAction(
  user: MockUser,
  providerOrgId: number,
  newStatus: "VERIFIED" | "REJECTED",
): { success: true; providerOrgId: number; status: string } | { error: string } {
  const auth = simulateRequirePlatformAdmin(user);
  if ("error" in auth) {
    return { error: auth.error };
  }
  return { success: true, providerOrgId, status: newStatus };
}

function simulateUpdateVenueVisibilityAction(
  user: MockUser,
  venueId: number,
  visibility: "DISCOVERABLE" | "PAUSED" | "DRAFT",
): { success: true; venueId: number; visibility: string } | { error: string } {
  const auth = simulateRequirePlatformAdmin(user);
  if ("error" in auth) {
    return { error: auth.error };
  }
  return { success: true, venueId, visibility };
}

function simulateAccessCompanySettings(
  user: MockUser,
  targetCompanyId: number,
  policy: MockCompanyPolicy,
): { success: true; policy: MockCompanyPolicy } | { error: string } {
  const auth = simulateRequireCompanyAdmin(user);
  if ("error" in auth) {
    return { error: auth.error };
  }
  if (user.companyId !== targetCompanyId || policy.companyId !== user.companyId) {
    return { error: "Access denied: Cannot access settings of another company" };
  }
  return { success: true, policy };
}

function simulateDecideApproval(
  user: MockUser,
  approval: MockApproval,
  event: MockEvent,
  decision: "APPROVED" | "REJECTED",
): { success: true; status: string } | { error: string } {
  const isApproverOrAdmin =
    user.role === "APPROVER" || user.role === "COMPANY_ADMIN" || user.role === "ADMIN";
  if (!isApproverOrAdmin) {
    return { error: "Unauthorized: Only approvers or company admins can act on approvals" };
  }
  if (event.companyId !== user.companyId) {
    return { error: "Access denied: Approval belongs to a different company" };
  }
  const isCompanyAdmin = user.role === "COMPANY_ADMIN" || user.role === "ADMIN";
  if (!isCompanyAdmin && approval.approverId !== user.id) {
    return { error: "Unauthorized: You are not assigned to this approval" };
  }
  return { success: true, status: decision };
}

// ── Test Execution ────────────────────────────────────────────────────────────

async function runAdminRoleTests() {
  console.log("\n=======================================================");
  console.log("🛡️  RUNNING RELATIA PLATFORM VS COMPANY ADMIN TESTS");
  console.log("=======================================================\n");

  const platformAdmin: MockUser = {
    id: 1,
    email: "platform.admin@relatia.in",
    role: "PLATFORM_ADMIN",
    companyId: null,
  };

  const companyAdminA: MockUser = {
    id: 2,
    email: "admin@company-a.com",
    role: "COMPANY_ADMIN",
    companyId: 10,
  };

  const companyAdminB: MockUser = {
    id: 3,
    email: "admin@company-b.com",
    role: "COMPANY_ADMIN",
    companyId: 20,
  };

  const requesterA: MockUser = {
    id: 4,
    email: "requester@company-a.com",
    role: "REQUESTER",
    companyId: 10,
  };

  const approverA: MockUser = {
    id: 5,
    email: "approver@company-a.com",
    role: "APPROVER",
    companyId: 10,
  };

  const financeA: MockUser = {
    id: 6,
    email: "finance@company-a.com",
    role: "FINANCE",
    companyId: 10,
  };

  const policyA: MockCompanyPolicy = {
    companyId: 10,
    maxBudget: 5000000,
    perPersonCap: 100000,
    allowedCities: ["Bengaluru", "Mumbai", "Delhi NCR"],
    approverRole: "APPROVER",
  };

  const policyB: MockCompanyPolicy = {
    companyId: 20,
    maxBudget: 2000000,
    perPersonCap: 50000,
    allowedCities: ["Hyderabad"],
    approverRole: "APPROVER",
  };

  const eventA: MockEvent = {
    id: 100,
    companyId: 10,
    status: "REQUESTED",
    createdById: requesterA.id,
  };

  const approvalA: MockApproval = {
    id: 500,
    eventId: eventA.id,
    approverId: approverA.id,
    status: "PENDING",
  };

  // 1. Onboarding creates COMPANY_ADMIN, not PLATFORM_ADMIN
  {
    const freshUser: MockUser = {
      id: 99,
      email: "founder@startup.com",
      role: "REQUESTER",
      companyId: null,
    };
    const { user: onboardedUser, companyId } = simulateOnboardingTenantCreation(freshUser);
    assert.equal(onboardedUser.role, "COMPANY_ADMIN", "Onboarded tenant creator must receive COMPANY_ADMIN");
    assert.notEqual(onboardedUser.role, "PLATFORM_ADMIN", "Onboarded tenant creator must NEVER receive PLATFORM_ADMIN");
    assert.equal(companyId, 101);
    console.log("  ✅ Test 1 Passed: Onboarding creates COMPANY_ADMIN, never PLATFORM_ADMIN");
  }

  // 2. Company Admin cannot access provider admin routes / actions
  {
    const access = simulateRequirePlatformAdmin(companyAdminA);
    assert.ok("error" in access, "COMPANY_ADMIN must be blocked from platform admin access");

    const verifyResult = simulateProviderVerificationAction(companyAdminA, 1, "VERIFIED");
    assert.ok("error" in verifyResult, "COMPANY_ADMIN cannot verify hospitality providers");

    const visibilityResult = simulateUpdateVenueVisibilityAction(companyAdminA, 1, "DISCOVERABLE");
    assert.ok("error" in visibilityResult, "COMPANY_ADMIN cannot mutate marketplace venue visibility");

    console.log("  ✅ Test 2 Passed: COMPANY_ADMIN blocked from provider admin routes and verification actions");
  }

  // 3. Platform Admin can access provider admin routes and actions
  {
    const access = simulateRequirePlatformAdmin(platformAdmin);
    assert.ok(!("error" in access), "PLATFORM_ADMIN can access platform admin routes");

    const verifyResult = simulateProviderVerificationAction(platformAdmin, 1, "VERIFIED");
    assert.ok(!("error" in verifyResult), "PLATFORM_ADMIN can verify hospitality providers");
    assert.equal(verifyResult.status, "VERIFIED");

    const visibilityResult = simulateUpdateVenueVisibilityAction(platformAdmin, 1, "DISCOVERABLE");
    assert.ok(!("error" in visibilityResult), "PLATFORM_ADMIN can update venue discoverability");
    assert.equal(visibilityResult.visibility, "DISCOVERABLE");

    console.log("  ✅ Test 3 Passed: PLATFORM_ADMIN authorized for provider admin routes and supply mutations");
  }

  // 4. Company Admin accesses own company settings and policy
  {
    const settingsResult = simulateAccessCompanySettings(companyAdminA, 10, policyA);
    assert.ok(!("error" in settingsResult), "COMPANY_ADMIN can access own company settings");
    assert.equal(settingsResult.policy.companyId, 10);
    console.log("  ✅ Test 4 Passed: COMPANY_ADMIN can access own company settings and policy");
  }

  // 5. Company Admin cannot access another company's settings or records (Tenant Isolation)
  {
    const crossTenantSettings = simulateAccessCompanySettings(companyAdminA, 20, policyB);
    assert.ok("error" in crossTenantSettings, "COMPANY_ADMIN cannot access Company B settings");
    console.log("  ✅ Test 5 Passed: COMPANY_ADMIN is strictly isolated from another company's data");
  }

  // 6. Company Admin can approve events within own company
  {
    const approvalResult = simulateDecideApproval(companyAdminA, approvalA, eventA, "APPROVED");
    assert.ok(!("error" in approvalResult), "COMPANY_ADMIN can decide pending approvals within their company");
    assert.equal(approvalResult.status, "APPROVED");
    console.log("  ✅ Test 6 Passed: COMPANY_ADMIN can approve events within own company");
  }

  // 7. Cross-tenant event approval is strictly blocked
  {
    const crossApprovalResult = simulateDecideApproval(companyAdminB, approvalA, eventA, "APPROVED");
    assert.ok("error" in crossApprovalResult, "COMPANY_ADMIN B cannot approve Company A's event");
    console.log("  ✅ Test 7 Passed: Cross-tenant approval action blocked");
  }

  // 8. Requester, Approver, and Finance behaviors remain intact
  {
    // Requester can create events and view invoices, but cannot access settings or verify providers
    const reqSettings = simulateRequireCompanyAdmin(requesterA);
    assert.ok("error" in reqSettings, "REQUESTER cannot access company settings");
    const reqProviders = simulateRequirePlatformAdmin(requesterA);
    assert.ok("error" in reqProviders, "REQUESTER cannot access provider admin");

    // Approver can approve assigned approval, but not unassigned unless admin
    const unassignedApproval: MockApproval = { id: 501, eventId: eventA.id, approverId: 999, status: "PENDING" };
    const approverUnassigned = simulateDecideApproval(approverA, unassignedApproval, eventA, "APPROVED");
    assert.ok("error" in approverUnassigned, "APPROVER cannot act on unassigned approval");

    // Finance can access finance dashboard but not provider admin
    const finAuth = simulateRequireUserRole(financeA, ["FINANCE", "COMPANY_ADMIN", "ADMIN"]);
    assert.ok(!("error" in finAuth), "FINANCE can access finance dashboard");
    const finProviders = simulateRequirePlatformAdmin(financeA);
    assert.ok("error" in finProviders, "FINANCE cannot access provider admin");

    console.log("  ✅ Test 8 Passed: REQUESTER, APPROVER, and FINANCE role behaviors remain intact");
  }

  // 9. PLATFORM_ADMIN with companyId NULL resolves to platform scope
  {
    const scoped = simulateRequireScopedUser(platformAdmin);
    assert.ok(!("error" in scoped), "PLATFORM_ADMIN NULL must resolve without company");
    assert.equal(scoped.context.scope, "platform");
    assert.equal(getWorkspaceName(scoped as ScopedMockUser), "Relatia Platform");
    console.log("  ✅ Test 9 Passed: PLATFORM_ADMIN NULL -> platform scope, no crash");
  }

  // 10. PLATFORM_ADMIN with companyId set still uses platform scope (not tenant workspace)
  {
    const adminWithCompany: MockUser = { ...platformAdmin, companyId: 999 };
    const scoped = simulateRequireScopedUser(adminWithCompany);
    assert.ok(!("error" in scoped) && scoped.context.scope === "platform");
    console.log("  ✅ Test 10 Passed: PLATFORM_ADMIN with companyId stays in platform scope");
  }

  // 11. PLATFORM_ADMIN visiting tenant route is blocked without explicit tenant context
  {
    const tenantAccess = simulateRequireTenantUser(platformAdmin);
    assert.ok("error" in tenantAccess, "PLATFORM_ADMIN must be blocked from tenant routes");
    console.log("  ✅ Test 11 Passed: PLATFORM_ADMIN blocked from tenant routes");
  }

  // 12. Tenant roles still require companyId; null companyId does not crash
  {
    const orphanRequester: MockUser = { ...requesterA, companyId: null };
    const orphanApprover: MockUser = { ...approverA, companyId: null };
    const orphanFinance: MockUser = { ...financeA, companyId: null };
    for (const u of [orphanRequester, orphanApprover, orphanFinance]) {
      const r = simulateRequireTenantUser(u);
      assert.ok("error" in r, `${u.role} without company must be rejected`);
    }
    const ok = simulateRequireTenantUser(requesterA);
    assert.ok(!("error" in ok), "REQUESTER with company must pass tenant guard");
    console.log("  ✅ Test 12 Passed: REQUESTER/APPROVER/FINANCE still require companyId");
  }

  console.log("\n=======================================================");
  console.log("🎉 ALL PLATFORM VS COMPANY ADMIN TESTS PASSED (12/12)!");
  console.log("=======================================================\n");
}

runAdminRoleTests().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
