import type {
  ProviderOrganizationRecord,
  ProviderVenueRecord,
  BookableSpaceRecord,
  OfferingRecord,
} from "./types";

export type ReadinessCheckItem = {
  id: string;
  name: string;
  passed: boolean;
  critical: boolean;
  message: string;
};

export type DiscoveryReadinessEvaluation = {
  isEligible: boolean;
  score: number; // 0 - 100 percentage
  passedCount: number;
  totalChecks: number;
  checks: ReadinessCheckItem[];
  blockers: string[];
  warnings: string[];
};

export type VenueReadinessInput = {
  provider: ProviderOrganizationRecord | null;
  venue: ProviderVenueRecord;
  bookableSpaces: BookableSpaceRecord[];
  offerings: OfferingRecord[];
};

/**
 * Pure, deterministic evaluation of whether a Venue and its BookableSpaces
 * are ready and eligible for enterprise discovery in Relatia.
 */
export function evaluateDiscoveryReadiness(
  input: VenueReadinessInput,
): DiscoveryReadinessEvaluation {
  const { provider, venue, bookableSpaces, offerings } = input;
  const checks: ReadinessCheckItem[] = [];
  const blockers: string[] = [];
  const warnings: string[] = [];

  // Check 1: Provider Organization Existence & Status
  const providerActive =
    provider != null &&
    (provider.status === "VERIFIED" || provider.status === "PENDING_VERIFICATION");

  checks.push({
    id: "provider_status",
    name: "Provider Organization Verification",
    passed: providerActive,
    critical: true,
    message: providerActive
      ? `Provider organization "${provider?.name}" is active and verified.`
      : provider
      ? `Provider account is currently ${provider.status.toLowerCase().replace(/_/g, " ")}. Verification required.`
      : "No provider organization profile attached to this venue.",
  });
  if (!providerActive) {
    blockers.push("Verify the provider organization profile before this venue can go live.");
  }

  // Check 2: Venue Base Status & Active Flag
  const venueActive =
    venue.active &&
    venue.visibility !== "ARCHIVED" &&
    venue.visibility !== "PAUSED";

  checks.push({
    id: "venue_active",
    name: "Venue Operational Status",
    passed: venueActive,
    critical: true,
    message: venueActive
      ? "Venue is active and available for booking operations."
      : "Venue is currently paused, archived, or deactivated.",
  });
  if (!venueActive) {
    blockers.push("Activate and unpause this venue to enable discovery.");
  }

  // Check 3: Identity & Location Completeness
  const hasIdentity =
    Boolean(venue.name && venue.name.trim().length >= 2) &&
    Boolean(venue.city && venue.city.trim().length >= 2) &&
    Boolean(venue.cuisine && venue.cuisine.trim().length >= 2);

  checks.push({
    id: "identity_fields",
    name: "Core Venue Profile Details",
    passed: hasIdentity,
    critical: true,
    message: hasIdentity
      ? `Venue profile complete (${venue.name}, ${venue.city} · ${venue.cuisine})`
      : "Missing essential profile details (name, city, or cuisine style).",
  });
  if (!hasIdentity) {
    blockers.push("Complete all required venue profile fields (name, city, and cuisine).");
  }

  // Check 4: Address or Locality
  const hasAddressInfo = Boolean(
    (venue.address && venue.address.trim().length > 0) ||
    (venue.locality && venue.locality.trim().length > 0)
  );
  checks.push({
    id: "address_info",
    name: "Micro-Locality & Address",
    passed: hasAddressInfo,
    critical: false,
    message: hasAddressInfo
      ? `Location details saved: ${venue.locality ?? venue.address}`
      : "No micro-locality or street address recorded.",
  });
  if (!hasAddressInfo) {
    warnings.push("Add a specific business district or locality (e.g. DLF Cyber City, BKC, Indiranagar) to improve search discovery.");
  }

  // Check 5: Verification State
  const isVerified =
    venue.verificationStatus === "VERIFIED" ||
    venue.verificationStatus === "PENDING_REVIEW";
  const isStrictlyVerified = venue.verificationStatus === "VERIFIED";

  checks.push({
    id: "verification_status",
    name: "Operational Quality & Compliance Audit",
    passed: isVerified,
    critical: true,
    message: isStrictlyVerified
      ? "Venue has passed full operational verification and compliance audit."
      : venue.verificationStatus === "PENDING_REVIEW"
      ? "Venue is under provisional operations review."
      : "Venue has not yet undergone operations review.",
  });
  if (!isVerified) {
    blockers.push("Record operational verification review before publishing this venue.");
  }

  // Check 6: Valid Bookable Spaces
  const activeSpaces = bookableSpaces.filter(
    (s) => s.isActive && s.status === "ACTIVE" && s.minCapacity > 0 && s.maxCapacity >= s.minCapacity,
  );
  const hasValidSpaces = activeSpaces.length > 0;

  checks.push({
    id: "bookable_spaces",
    name: "Private Dining Rooms & Spaces",
    passed: hasValidSpaces,
    critical: true,
    message: hasValidSpaces
      ? `${activeSpaces.length} active bookable space(s) configured (e.g. ${activeSpaces[0].name})`
      : "No active bookable spaces with guest capacity configured.",
  });
  if (!hasValidSpaces) {
    blockers.push("Add at least one active bookable space (e.g. Private Dining Room or Boardroom) with guest capacity.");
  }

  // Check 7: Offerings and Pricing Integrity
  const activeOfferings = offerings.filter((o) => o.isActive);
  const hasValidPricing = activeOfferings.every(
    (o) => o.baseAmount >= 0 && o.minimumSpend >= 0 && o.currency === "INR",
  );

  checks.push({
    id: "pricing_integrity",
    name: "Menus & Dining Packages",
    passed: hasValidPricing && activeOfferings.length > 0,
    critical: false,
    message: activeOfferings.length > 0
      ? hasValidPricing
        ? `${activeOfferings.length} dining package(s) configured with verified INR pricing.`
        : "Some active dining packages have invalid or negative pricing."
      : "No fixed dining packages attached (inquiries will require custom quotes).",
  });
  if (!hasValidPricing) {
    blockers.push("Correct package pricing to ensure all base amounts and minimum spends are positive INR values.");
  }
  if (activeOfferings.length === 0) {
    warnings.push("Add at least one curated set menu or dining package to enable instant corporate booking estimates.");
  }

  // Check 8: Public-Safe Description
  const hasDescription = Boolean(
    venue.publicDescription && venue.publicDescription.trim().length >= 10,
  );
  checks.push({
    id: "public_description",
    name: "Enterprise Overview & Highlights",
    passed: hasDescription,
    critical: false,
    message: hasDescription
      ? "Enterprise overview description is ready."
      : "No overview description provided for event hosts.",
  });
  if (!hasDescription) {
    warnings.push("Add an overview description highlighting atmosphere, AV capabilities, and hospitality features.");
  }

  // Calculation
  const criticalPassed = checks.filter((c) => c.critical).every((c) => c.passed);
  const passedCount = checks.filter((c) => c.passed).length;
  const totalChecks = checks.length;
  const score = Math.round((passedCount / totalChecks) * 100);

  const isEligible = criticalPassed && blockers.length === 0;

  return {
    isEligible,
    score,
    passedCount,
    totalChecks,
    checks,
    blockers,
    warnings,
  };
}

/**
 * Filter bookable spaces to only those that meet public-safe discovery rules
 */
export function filterDiscoverableBookableSpaces(
  spaces: BookableSpaceRecord[],
): BookableSpaceRecord[] {
  return spaces.filter(
    (s) =>
      s.isActive &&
      s.status === "ACTIVE" &&
      s.minCapacity > 0 &&
      s.maxCapacity >= s.minCapacity,
  );
}

/**
 * Filter offerings to only those that meet public-safe discovery rules
 */
export function filterDiscoverableOfferings(
  offerings: OfferingRecord[],
): OfferingRecord[] {
  return offerings.filter(
    (o) =>
      o.isActive &&
      o.isDiscoverable &&
      o.baseAmount >= 0 &&
      o.minimumSpend >= 0 &&
      o.currency === "INR",
  );
}
