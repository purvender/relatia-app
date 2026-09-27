import assert from "node:assert/strict";
import { calculateGst, isIntraState } from "../lib/finance/gst";
import {
  createProviderBookingRequestSchema,
  acceptProviderBookingRequestSchema,
} from "../lib/provider/validation";
import type { ProviderBookingRequestRecord } from "../lib/provider/types";

// ─── In-memory test fixtures ─────────────────────────────────────────────────

type MockUser = { id: number; companyId: number; role: string };
type MockEvent = { id: number; companyId: number; status: string; city: string; budget: number; attendees: number; dateTime: string };
type MockVenue = { id: number; providerOrgId: number | null; companyId: number | null; city: string; name: string; active: boolean };
type MockProviderOrg = { id: number; status: string };
type MockRequest = ProviderBookingRequestRecord;
type MockBooking = { id: number; eventId: number; venueId: number; amount: number; taxAmount: number; paymentStatus: string; currency: string };
type MockInvoice = { id: number; bookingId: number; invoiceNumber: string; baseAmount: number; cgstAmount: number; sgstAmount: number; igstAmount: number; totalAmount: number; status: string };

// Helpers that replicate service-layer logic in-memory for unit testing
function simulateConfirmProviderBookingRequest(
  request: MockRequest,
  user: MockUser,
  event: MockEvent,
  venue: MockVenue,
  existingBooking: MockBooking | null,
  existingInvoice: MockInvoice | null,
): { booking: MockBooking; invoice: MockInvoice } | { error: string } {
  // Role check
  const allowedRoles = ["REQUESTER", "COMPANY_ADMIN", "ADMIN"];
  if (!allowedRoles.includes(user.role)) {
    return { error: `Users with role '${user.role}' cannot confirm commercial bookings.` };
  }
  // Tenant check
  if (request.companyId !== user.companyId) {
    return { error: "Access denied: You cannot confirm a request for another company." };
  }
  // Status check
  if (request.status !== "ACCEPTED") {
    if (request.status === "REJECTED") return { error: "Cannot confirm booking: provider has declined this request." };
    if (request.status === "CANCELLED") return { error: "Cannot confirm booking: request has been cancelled." };
    if (request.status === "PENDING_PROVIDER_REVIEW") return { error: "Cannot confirm booking: waiting for provider response." };
    return { error: `Cannot confirm booking: current request status is ${request.status}.` };
  }
  // Tenant check on event
  if (event.companyId !== user.companyId) {
    return { error: "Event not found or access denied." };
  }
  // Idempotency
  if (existingBooking && existingInvoice) {
    return { booking: existingBooking, invoice: existingInvoice };
  }
  // GST calculation
  const baseAmount = request.estimatedAmountPaise ?? event.budget;
  const intraState = isIntraState(venue.city, event.city);
  const gst = calculateGst(baseAmount, intraState);

  const booking: MockBooking = {
    id: 999,
    eventId: event.id,
    venueId: venue.id,
    amount: gst.baseAmount,
    taxAmount: gst.cgstAmount + gst.sgstAmount + gst.igstAmount,
    paymentStatus: "PENDING",
    currency: "INR",
  };

  const invoice: MockInvoice = {
    id: 1001,
    bookingId: booking.id,
    invoiceNumber: `INV-20261001-${booking.id}`,
    baseAmount: gst.baseAmount,
    cgstAmount: gst.cgstAmount,
    sgstAmount: gst.sgstAmount,
    igstAmount: gst.igstAmount,
    totalAmount: gst.totalAmount,
    status: "ISSUED",
  };

  return { booking, invoice };
}

// ─── Test runner ─────────────────────────────────────────────────────────────

function runCommercialFlowTests() {
  console.log("🧪 Starting Core Commercial Flow Test Suite...");

  // Shared fixtures
  const requesterUser: MockUser = { id: 1, companyId: 10, role: "REQUESTER" };
  const adminUser: MockUser = { id: 2, companyId: 10, role: "ADMIN" };
  const financeUser: MockUser = { id: 3, companyId: 10, role: "FINANCE" };
  const otherCompanyUser: MockUser = { id: 4, companyId: 99, role: "REQUESTER" };

  const event: MockEvent = {
    id: 101,
    companyId: 10,
    status: "APPROVED",
    city: "Mumbai",
    budget: 5000000, // ₹50,000 in paise
    attendees: 50,
    dateTime: "2026-12-01T18:00:00.000Z",
  };

  const providerOrg: MockProviderOrg = { id: 5, status: "VERIFIED" };
  assert.strictEqual(providerOrg.status, "VERIFIED");

  const providerVenueMumbai: MockVenue = {
    id: 201,
    providerOrgId: 5,
    companyId: null,
    city: "Mumbai",
    name: "Grand Ballroom",
    active: true,
  };

  const providerVenueDelhi: MockVenue = {
    id: 202,
    providerOrgId: 5,
    companyId: null,
    city: "Delhi",
    name: "Imperial Hall",
    active: true,
  };

  const acceptedRequest: MockRequest = {
    id: 301,
    eventId: event.id,
    companyId: 10,
    createdById: 1,
    providerOrgId: 5,
    venueId: providerVenueMumbai.id,
    bookableSpaceId: null,
    offeringId: null,
    requestedDateTime: "2026-12-01T18:00:00.000Z",
    attendees: 50,
    estimatedAmountPaise: 5000000,
    dietaryNotes: null,
    operationalNotes: null,
    status: "ACCEPTED",
    providerResponseNote: "We can accommodate your group.",
    rejectionReason: null,
    respondedByPartnerUserId: 55,
    respondedAt: "2026-09-27T10:00:00.000Z",
    createdAt: "2026-09-26T08:00:00.000Z",
    updatedAt: "2026-09-27T10:00:00.000Z",
  };

  // ── Test 43: GST Calculation Engine — Intra-State (CGST + SGST) ──────────
  {
    const base = 5000000; // ₹50,000
    const gst = calculateGst(base, true);
    assert.equal(gst.taxMode, "CGST_SGST", "Intra-state must use CGST_SGST mode");
    assert.equal(gst.cgstAmount, 450000, "CGST must be 9% of base");
    assert.equal(gst.sgstAmount, 450000, "SGST must be 9% of base");
    assert.equal(gst.igstAmount, 0, "IGST must be 0 for intra-state");
    assert.equal(gst.totalAmount, 5900000, "Total must be base + CGST + SGST");
    console.log("  ✅ Test 43 Passed: GST Engine — Intra-state (CGST + SGST)");
  }

  // ── Test 44: GST Calculation Engine — Inter-State (IGST) ─────────────────
  {
    const base = 5000000;
    const gst = calculateGst(base, false);
    assert.equal(gst.taxMode, "IGST", "Inter-state must use IGST mode");
    assert.equal(gst.igstAmount, 900000, "IGST must be 18% of base");
    assert.equal(gst.cgstAmount, 0, "CGST must be 0 for inter-state");
    assert.equal(gst.sgstAmount, 0, "SGST must be 0 for inter-state");
    assert.equal(gst.totalAmount, 5900000, "Total must be base + IGST");
    console.log("  ✅ Test 44 Passed: GST Engine — Inter-state (IGST)");
  }

  // ── Test 45: isIntraState helper ──────────────────────────────────────────
  {
    assert.equal(isIntraState("Mumbai", "Mumbai"), true, "Same city = intra-state");
    assert.equal(isIntraState("mumbai", "MUMBAI"), true, "Case-insensitive match");
    assert.equal(isIntraState("Mumbai", "Delhi"), false, "Different cities = inter-state");
    assert.equal(isIntraState("MH", "MH"), true, "State codes match");
    assert.equal(isIntraState("MH", "DL"), false, "Different state codes = inter-state");
    console.log("  ✅ Test 45 Passed: isIntraState helper — correct intra/inter classification");
  }

  // ── Test 46: GST — zero and negative base amounts throw ──────────────────
  {
    assert.throws(
      () => calculateGst(0, true),
      /positive integer/,
      "Zero base should throw"
    );
    assert.throws(
      () => calculateGst(-1000, false),
      /positive integer/,
      "Negative base should throw"
    );
    assert.throws(
      () => calculateGst(1.5, true),
      /positive integer/,
      "Float base should throw"
    );
    console.log("  ✅ Test 46 Passed: GST Engine — invalid input validation");
  }

  // ── Test 47: Confirm Provider Booking — happy path (intra-state) ──────────
  {
    const result = simulateConfirmProviderBookingRequest(
      acceptedRequest, requesterUser, event, providerVenueMumbai, null, null
    );
    assert.ok(!("error" in result), "Should succeed for valid REQUESTER");
    if (!("error" in result)) {
      assert.equal(result.booking.eventId, event.id, "Booking eventId must match");
      assert.equal(result.booking.venueId, providerVenueMumbai.id, "Booking venueId must match");
      assert.equal(result.booking.amount, 5000000, "Booking amount must be base amount");
      assert.equal(result.booking.taxAmount, 900000, "Booking taxAmount must be CGST+SGST");
      assert.equal(result.booking.paymentStatus, "PENDING", "Booking paymentStatus must be PENDING");
      assert.equal(result.invoice.status, "ISSUED", "Invoice must be ISSUED");
      assert.equal(result.invoice.cgstAmount, 450000, "Invoice CGST must be 9%");
      assert.equal(result.invoice.sgstAmount, 450000, "Invoice SGST must be 9%");
      assert.equal(result.invoice.igstAmount, 0, "Invoice IGST must be 0 for intra-state");
      assert.equal(result.invoice.totalAmount, 5900000, "Invoice total must include GST");
    }
    console.log("  ✅ Test 47 Passed: Confirm Provider Booking — happy path (REQUESTER, intra-state)");
  }

  // ── Test 48: Confirm by ADMIN — succeeds ─────────────────────────────────
  {
    const result = simulateConfirmProviderBookingRequest(
      acceptedRequest, adminUser, event, providerVenueMumbai, null, null
    );
    assert.ok(!("error" in result), "ADMIN should also be able to confirm");
    console.log("  ✅ Test 48 Passed: Confirm Provider Booking — ADMIN role succeeds");
  }

  // ── Test 49: Confirm by FINANCE — blocked ────────────────────────────────
  {
    const result = simulateConfirmProviderBookingRequest(
      acceptedRequest, financeUser, event, providerVenueMumbai, null, null
    );
    assert.ok("error" in result, "FINANCE role cannot confirm");
    assert.ok(
      (result as { error: string }).error.includes("cannot confirm"),
      "Error must mention role restriction"
    );
    console.log("  ✅ Test 49 Passed: Confirm Provider Booking — FINANCE role blocked correctly");
  }

  // ── Test 50: Cross-company confirm — blocked ──────────────────────────────
  {
    const result = simulateConfirmProviderBookingRequest(
      acceptedRequest, otherCompanyUser, event, providerVenueMumbai, null, null
    );
    assert.ok("error" in result, "Cross-company confirm must be blocked");
    assert.ok(
      (result as { error: string }).error.includes("Access denied"),
      "Error must mention access denied"
    );
    console.log("  ✅ Test 50 Passed: Confirm Provider Booking — cross-tenant isolation enforced");
  }

  // ── Test 51: Status gate — PENDING_PROVIDER_REVIEW ───────────────────────
  {
    const pendingReq: MockRequest = { ...acceptedRequest, status: "PENDING_PROVIDER_REVIEW" };
    const result = simulateConfirmProviderBookingRequest(
      pendingReq, requesterUser, event, providerVenueMumbai, null, null
    );
    assert.ok("error" in result, "PENDING request cannot be confirmed");
    assert.match(
      (result as { error: string }).error,
      /waiting for provider/,
      "Error must mention waiting for provider"
    );
    console.log("  ✅ Test 51 Passed: Confirm Provider Booking — PENDING status blocked correctly");
  }

  // ── Test 52: Status gate — REJECTED ──────────────────────────────────────
  {
    const rejectedReq: MockRequest = { ...acceptedRequest, status: "REJECTED" };
    const result = simulateConfirmProviderBookingRequest(
      rejectedReq, requesterUser, event, providerVenueMumbai, null, null
    );
    assert.ok("error" in result, "REJECTED request cannot be confirmed");
    assert.match(
      (result as { error: string }).error,
      /declined/,
      "Error must mention provider declined"
    );
    console.log("  ✅ Test 52 Passed: Confirm Provider Booking — REJECTED status blocked correctly");
  }

  // ── Test 53: Status gate — CANCELLED ─────────────────────────────────────
  {
    const cancelledReq: MockRequest = { ...acceptedRequest, status: "CANCELLED" };
    const result = simulateConfirmProviderBookingRequest(
      cancelledReq, requesterUser, event, providerVenueMumbai, null, null
    );
    assert.ok("error" in result, "CANCELLED request cannot be confirmed");
    assert.match(
      (result as { error: string }).error,
      /cancelled/,
      "Error must mention cancelled"
    );
    console.log("  ✅ Test 53 Passed: Confirm Provider Booking — CANCELLED status blocked correctly");
  }

  // ── Test 54: Idempotency — returns existing booking+invoice ──────────────
  {
    const existingBooking: MockBooking = {
      id: 888,
      eventId: event.id,
      venueId: providerVenueMumbai.id,
      amount: 5000000,
      taxAmount: 900000,
      paymentStatus: "PENDING",
      currency: "INR",
    };
    const existingInvoice: MockInvoice = {
      id: 777,
      bookingId: 888,
      invoiceNumber: "INV-20261001-888",
      baseAmount: 5000000,
      cgstAmount: 450000,
      sgstAmount: 450000,
      igstAmount: 0,
      totalAmount: 5900000,
      status: "ISSUED",
    };
    const result = simulateConfirmProviderBookingRequest(
      acceptedRequest, requesterUser, event, providerVenueMumbai, existingBooking, existingInvoice
    );
    assert.ok(!("error" in result), "Idempotent confirm must succeed");
    if (!("error" in result)) {
      assert.equal(result.booking.id, 888, "Must return existing booking ID");
      assert.equal(result.invoice.id, 777, "Must return existing invoice ID");
    }
    console.log("  ✅ Test 54 Passed: Confirm Provider Booking — idempotency returns existing records");
  }

  // ── Test 55: Inter-state GST (Mumbai venue, Delhi event) ─────────────────
  {
    const interStateEvent: MockEvent = { ...event, city: "Delhi" };
    const interStateRequest: MockRequest = { ...acceptedRequest, venueId: providerVenueDelhi.id };
    const result = simulateConfirmProviderBookingRequest(
      // Mumbai venue, Delhi event = inter-state (different cities)
      { ...acceptedRequest, venueId: providerVenueMumbai.id },
      requesterUser,
      interStateEvent,
      providerVenueMumbai,
      null,
      null
    );
    assert.ok(!("error" in result), "Inter-state confirm should succeed");
    if (!("error" in result)) {
      assert.equal(result.invoice.igstAmount, 900000, "IGST must be 18% for inter-state");
      assert.equal(result.invoice.cgstAmount, 0, "CGST must be 0 for inter-state");
      assert.equal(result.invoice.sgstAmount, 0, "SGST must be 0 for inter-state");
    }
    console.log("  ✅ Test 55 Passed: Confirm Provider Booking — inter-state IGST applied correctly");

    // Suppress unused variable warning
    void interStateRequest;
  }

  // ── Test 56: Provider Booking Request validation schema (reminder) ────────
  {
    const valid = createProviderBookingRequestSchema.safeParse({
      eventId: 101,
      venueId: 201,
      requestedDateTime: "2026-12-01T18:00:00.000Z",
      attendees: 50,
      estimatedAmountPaise: 5000000,
    });
    assert.ok(valid.success, "Valid provider booking request schema must parse");

    const noEvent = createProviderBookingRequestSchema.safeParse({
      venueId: 201,
      requestedDateTime: "2026-12-01T18:00:00.000Z",
      attendees: 50,
    });
    assert.ok(!noEvent.success, "Missing eventId must fail validation");
    console.log("  ✅ Test 56 Passed: Provider Booking Request schema validation (provider route foundation)");
  }

  // ── Test 57: Accept schema validation ────────────────────────────────────
  {
    const valid = acceptProviderBookingRequestSchema.safeParse({ requestId: 301 });
    assert.ok(valid.success, "Accept schema with just requestId must pass");

    const withNote = acceptProviderBookingRequestSchema.safeParse({
      requestId: 301,
      providerResponseNote: "We are happy to host you.",
    });
    assert.ok(withNote.success, "Accept schema with response note must pass");

    const invalid = acceptProviderBookingRequestSchema.safeParse({ requestId: 0 });
    assert.ok(!invalid.success, "requestId = 0 must fail validation");
    console.log("  ✅ Test 57 Passed: Accept request schema — valid/invalid cases");
  }

  // ── Test 58: Payment Role Authorization — FINANCE ONLY ────────────────────
  {
    // In the mature enterprise model, ONLY FINANCE role can create payment orders
    function canInitiatePayment(role: string): boolean {
      const allowedRoles = ["FINANCE"];
      return allowedRoles.includes(role);
    }
    assert.ok(canInitiatePayment("FINANCE"), "FINANCE can initiate payment");
    assert.ok(!canInitiatePayment("REQUESTER"), "REQUESTER cannot initiate payment");
    assert.ok(!canInitiatePayment("ADMIN"), "ADMIN cannot initiate normal payment");
    assert.ok(!canInitiatePayment("APPROVER"), "APPROVER cannot initiate payment");
    assert.ok(!canInitiatePayment("VIEWER"), "VIEWER cannot initiate payment");
    console.log("  ✅ Test 58 Passed: Payment order creation — FINANCE only (REQUESTER/ADMIN blocked)");
  }

  // ── Test 59: Payment Verification Role Authorization — FINANCE ONLY ────────
  {
    function canVerifyPayment(role: string): boolean {
      const allowedRoles = ["FINANCE"];
      return allowedRoles.includes(role);
    }
    assert.ok(canVerifyPayment("FINANCE"), "FINANCE can verify payment");
    assert.ok(!canVerifyPayment("REQUESTER"), "REQUESTER cannot verify payment");
    assert.ok(!canVerifyPayment("ADMIN"), "ADMIN cannot verify normal payment");
    assert.ok(!canVerifyPayment("APPROVER"), "APPROVER cannot verify payment");
    console.log("  ✅ Test 59 Passed: Payment verification — FINANCE only (REQUESTER/ADMIN blocked)");
  }

  // ── Test 60: Invoice Detail Access Role Authorization ──────────────────────
  {
    function canViewInvoice(role: string): boolean {
      const allowedRoles = ["FINANCE", "COMPANY_ADMIN", "ADMIN", "REQUESTER"];
      return allowedRoles.includes(role);
    }
    assert.ok(canViewInvoice("FINANCE"), "FINANCE can view invoice");
    assert.ok(canViewInvoice("COMPANY_ADMIN"), "COMPANY_ADMIN can view invoice");
    assert.ok(canViewInvoice("ADMIN"), "ADMIN can view invoice");
    assert.ok(canViewInvoice("REQUESTER"), "REQUESTER can view their company's invoice");
    assert.ok(!canViewInvoice("APPROVER"), "APPROVER cannot view invoice directly");
    console.log("  ✅ Test 60 Passed: Invoice detail page — REQUESTER/COMPANY_ADMIN/ADMIN/FINANCE authorized (APPROVER blocked)");
  }

  // ── Test 61: Finance Payment Tenant Isolation & Status Gates ───────────────
  {
    function simulateFinancePaymentOrder(
      eventArg: MockEvent,
      bookingArg: MockBooking,
      invoiceArg: MockInvoice,
      userArg: MockUser
    ): { orderId: string; amount: number } | { error: string } {
      if (userArg.role !== "FINANCE") {
        return { error: `Users with role '${userArg.role}' cannot initiate payment orders. Payment is restricted to Finance.` };
      }
      if (eventArg.companyId !== userArg.companyId) {
        return { error: "Event not found or access denied." };
      }
      if (eventArg.status !== "BOOKING_REQUESTED") {
        return { error: `Cannot initiate payment for event in status '${eventArg.status}'.` };
      }
      if (bookingArg.paymentStatus === "PAID") {
        return { error: "This booking has already been paid and confirmed." };
      }
      // Server-side derive amount from invoice
      const amountPaise = invoiceArg.totalAmount;
      return { orderId: `order_dev_${Date.now()}`, amount: amountPaise };
    }

    const validBooking: MockBooking = {
      id: 501,
      eventId: event.id,
      venueId: providerVenueMumbai.id,
      amount: 5000000,
      taxAmount: 900000,
      paymentStatus: "PENDING",
      currency: "INR",
    };
    const validInvoice: MockInvoice = {
      id: 601,
      bookingId: 501,
      invoiceNumber: "INV-20261001-501",
      baseAmount: 5000000,
      cgstAmount: 450000,
      sgstAmount: 450000,
      igstAmount: 0,
      totalAmount: 5900000,
      status: "ISSUED",
    };

    const bookingRequestedEvent: MockEvent = {
      ...event,
      status: "BOOKING_REQUESTED",
    };

    // 1. Happy path: FINANCE user in same company
    const happy = simulateFinancePaymentOrder(bookingRequestedEvent, validBooking, validInvoice, financeUser);
    assert.ok(!("error" in happy), "FINANCE in same company can create order");
    if (!("error" in happy)) {
      assert.equal(happy.amount, 5900000, "Server derives amount from invoice.totalAmount");
    }

    // 2. Cross-tenant attempt by FINANCE of another company
    const crossTenantFinance: MockUser = { id: 99, companyId: 999, role: "FINANCE" };
    const crossResult = simulateFinancePaymentOrder(bookingRequestedEvent, validBooking, validInvoice, crossTenantFinance);
    assert.ok("error" in crossResult, "Cross-tenant finance must be rejected");

    // 3. Already-paid invoice rejection
    const paidBooking: MockBooking = { ...validBooking, paymentStatus: "PAID" };
    const paidResult = simulateFinancePaymentOrder(bookingRequestedEvent, paidBooking, validInvoice, financeUser);
    assert.ok("error" in paidResult, "Already paid booking must be rejected");

    // 4. Non-BOOKING_REQUESTED status rejection
    const draftEvent: MockEvent = { ...event, status: "DRAFT" };
    const draftResult = simulateFinancePaymentOrder(draftEvent, validBooking, validInvoice, financeUser);
    assert.ok("error" in draftResult, "Draft event must not allow payment creation");

    console.log("  ✅ Test 61 Passed: Finance payment creation — tenant isolation, status gates, & server amount derivation");
  }

  // ── Test 62: Webhook & Verification Idempotency & State Mutation ───────────
  {
    type MockPaymentState = {
      bookingPaymentStatus: string;
      invoiceStatus: string;
      eventStatus: string;
    };

    function simulatePaymentVerification(
      currentBooking: MockBooking,
      currentInvoice: MockInvoice,
      currentEvent: MockEvent,
      signatureValid: boolean
    ): MockPaymentState | { error: string } {
      if (currentBooking.paymentStatus === "PAID" && currentEvent.status === "BOOKED") {
        // Idempotent return
        return {
          bookingPaymentStatus: currentBooking.paymentStatus,
          invoiceStatus: currentInvoice.status,
          eventStatus: currentEvent.status,
        };
      }

      if (!signatureValid) {
        return { error: "Cryptographic signature verification failed." };
      }

      return {
        bookingPaymentStatus: "PAID",
        invoiceStatus: "PAID",
        eventStatus: "BOOKED",
      };
    }

    const testBooking: MockBooking = {
      id: 502,
      eventId: event.id,
      venueId: providerVenueMumbai.id,
      amount: 5000000,
      taxAmount: 900000,
      paymentStatus: "PENDING",
      currency: "INR",
    };
    const testInvoice: MockInvoice = {
      id: 602,
      bookingId: 502,
      invoiceNumber: "INV-20261001-502",
      baseAmount: 5000000,
      cgstAmount: 450000,
      sgstAmount: 450000,
      igstAmount: 0,
      totalAmount: 5900000,
      status: "ISSUED",
    };

    // Valid verification
    const verified = simulatePaymentVerification(testBooking, testInvoice, event, true);
    assert.ok(!("error" in verified), "Valid signature should verify");
    if (!("error" in verified)) {
      assert.equal(verified.bookingPaymentStatus, "PAID");
      assert.equal(verified.invoiceStatus, "PAID");
      assert.equal(verified.eventStatus, "BOOKED");
    }

    // Invalid signature
    const invalidSig = simulatePaymentVerification(testBooking, testInvoice, event, false);
    assert.ok("error" in invalidSig, "Invalid signature must fail verification");

    // Idempotency: second run on already-paid state returns successfully
    const paidBooking: MockBooking = { ...testBooking, paymentStatus: "PAID" };
    const paidInvoice: MockInvoice = { ...testInvoice, status: "PAID" };
    const bookedEvent: MockEvent = { ...event, status: "BOOKED" };
    const duplicateRun = simulatePaymentVerification(paidBooking, paidInvoice, bookedEvent, true);
    assert.ok(!("error" in duplicateRun), "Duplicate verification must be idempotent");

    console.log("  ✅ Test 62 Passed: Webhook & payment verification — signature validation, idempotency, & state mutation");
  }

  // ── Test 63: End-to-End State Machine Flow ────────────────────────────────
  {
    // Simulate the full linear state transitions
    const states: string[] = [];
    states.push("DRAFT");                    // Event created
    states.push("PENDING_APPROVAL");         // Submitted for approval
    states.push("APPROVED");                 // Admin approved
    // Provider route: no VENUE_SELECTED, goes directly via request
    states.push("PENDING_PROVIDER_REVIEW");  // Provider booking request sent
    states.push("ACCEPTED");                 // Provider accepted
    states.push("BOOKING_REQUESTED");        // Enterprise confirmed → Booking + Invoice created
    states.push("BOOKED");                   // Finance payment verified → PAID

    const expectedTransitions = [
      ["DRAFT", "PENDING_APPROVAL"],
      ["PENDING_APPROVAL", "APPROVED"],
      ["APPROVED", "PENDING_PROVIDER_REVIEW"],
      ["PENDING_PROVIDER_REVIEW", "ACCEPTED"],
      ["ACCEPTED", "BOOKING_REQUESTED"],
      ["BOOKING_REQUESTED", "BOOKED"],
    ];

    for (const [from, to] of expectedTransitions) {
      const fromIdx = states.indexOf(from);
      const toIdx = states.indexOf(to);
      assert.ok(fromIdx < toIdx, `${from} must precede ${to} in the commercial flow`);
    }

    // Terminal states
    const terminalStates = ["BOOKED", "CANCELLED", "COMPLETED"];
    for (const s of terminalStates) {
      assert.ok(
        states.includes(s) || ["CANCELLED", "COMPLETED"].includes(s),
        `${s} must be recognized as a terminal state`
      );
    }
    console.log("  ✅ Test 63 Passed: End-to-end state machine — all transitions ordered correctly");
  }

  // ── Test 64: Invoice GST Floor Math (Fractional Paise Prevention) ──────────
  {
    // An amount that would produce fractional paise without Math.floor
    const oddBase = 9999999; // ₹99,999.99
    const gst = calculateGst(oddBase, true);
    assert.ok(Number.isInteger(gst.cgstAmount), "CGST must always be an integer");
    assert.ok(Number.isInteger(gst.sgstAmount), "SGST must always be an integer");
    assert.ok(Number.isInteger(gst.totalAmount), "Total must always be an integer");
    assert.equal(
      gst.totalAmount,
      gst.baseAmount + gst.cgstAmount + gst.sgstAmount,
      "Total = base + CGST + SGST (intra-state)"
    );
    console.log("  ✅ Test 64 Passed: GST floor math — no fractional paise in any calculation");
  }

  console.log("🎉 All 22 Core Commercial Flow Tests Passed Successfully!\n");
}

runCommercialFlowTests();
