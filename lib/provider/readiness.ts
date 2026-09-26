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
    name: "Provider Organization Status",
    passed: providerActive,
    critical: true,
    message: providerActive
      ? `Provider "${provider?.name}" is ${provider?.status}`
      : provider
      ? `Provider status (${provider.status}) is not eligible for discovery`
      : "No associated Provider Organization found",
  });
  if (!providerActive) {
    blockers.push("Provider organization must be VERIFIED or PENDING_VERIFICATION (not PAUSED or ARCHIVED).");
  }

  // Check 2: Venue Base Status & Active Flag
  const venueActive =
    venue.active &&
    venue.visibility !== "ARCHIVED" &&
    venue.visibility !== "PAUSED";

  checks.push({
    id: "venue_active",
    name: "Venue Active & Not Paused",
    passed: venueActive,
    critical: true,
    message: venueActive
      ? `Venue is active and visibility is ${venue.visibility}`
      : "Venue is deactivated or paused/archived",
  });
  if (!venueActive) {
    blockers.push("Venue must be active and not paused or archived.");
  }

  // Check 3: Identity & Location Completeness
  const hasIdentity =
    Boolean(venue.name && venue.name.trim().length >= 2) &&
    Boolean(venue.city && venue.city.trim().length >= 2) &&
    Boolean(venue.cuisine && venue.cuisine.trim().length >= 2);

  checks.push({
    id: "identity_fields",
    name: "Core Identity & Location Fields",
    passed: hasIdentity,
    critical: true,
    message: hasIdentity
      ? `Verified name (${venue.name}), city (${venue.city}), and cuisine (${venue.cuisine})`
      : "Missing venue name, city, or cuisine",
  });
  if (!hasIdentity) {
    blockers.push("Venue identity fields (name, city, cuisine) must be populated.");
  }

  // Check 4: Address or Locality
  const hasAddressInfo = Boolean(
    (venue.address && venue.address.trim().length > 0) ||
    (venue.locality && venue.locality.trim().length > 0)
  );
  checks.push({
    id: "address_info",
    name: "Address or Micro-Locality",
    passed: hasAddressInfo,
    critical: false,
    message: hasAddressInfo
      ? `Location details recorded: ${venue.locality ?? venue.address}`
      : "Neither address nor micro-locality is recorded",
  });
  if (!hasAddressInfo) {
    warnings.push("Adding a specific locality (e.g. DLF Cyber City, Golf Course Road) improves enterprise match quality.");
  }

  // Check 5: Verification State
  const isVerified =
    venue.verificationStatus === "VERIFIED" ||
    venue.verificationStatus === "PENDING_REVIEW";
  const isStrictlyVerified = venue.verificationStatus === "VERIFIED";

  checks.push({
    id: "verification_status",
    name: "Hospitality Verification Status",
    passed: isVerified,
    critical: true,
    message: isStrictlyVerified
      ? "Venue is fully VERIFIED by internal operations"
      : venue.verificationStatus === "PENDING_REVIEW"
      ? "Venue is PENDING_REVIEW (provisional discovery allowed with manual confirmation)"
      : `Verification status is ${venue.verificationStatus}`,
  });
  if (!isVerified) {
    blockers.push("Venue must be VERIFIED or in PENDING_REVIEW by operations.");
  }

  // Check 6: Valid Bookable Spaces
  const activeSpaces = bookableSpaces.filter(
    (s) => s.isActive && s.status === "ACTIVE" && s.minCapacity > 0 && s.maxCapacity >= s.minCapacity,
  );
  const hasValidSpaces = activeSpaces.length > 0;

  checks.push({
    id: "bookable_spaces",
    name: "Valid Bookable Spaces Configured",
    passed: hasValidSpaces,
    critical: true,
    message: hasValidSpaces
      ? `Found ${activeSpaces.length} valid active bookable space(s) (e.g. ${activeSpaces[0].name})`
      : "No active bookable spaces with valid min/max capacity configured",
  });
  if (!hasValidSpaces) {
    blockers.push("At least one active BookableSpace with valid capacity (min > 0, max >= min) is required.");
  }

  // Check 7: Offerings and Pricing Integrity
  const activeOfferings = offerings.filter((o) => o.isActive);
  const hasValidPricing = activeOfferings.every(
    (o) => o.baseAmount >= 0 && o.minimumSpend >= 0 && o.currency === "INR",
  );

  checks.push({
    id: "pricing_integrity",
    name: "Offerings & Pricing Integrity",
    passed: hasValidPricing && activeOfferings.length > 0,
    critical: false,
    message: activeOfferings.length > 0
      ? hasValidPricing
        ? `Configured ${activeOfferings.length} active offering(s) with valid non-negative pricing`
        : "Some active offerings have invalid negative pricing or unsupported currency"
      : "No structured offerings attached (venue will use baseline capacity and custom quoting)",
  });
  if (!hasValidPricing) {
    blockers.push("All active offerings must have non-negative baseAmount, non-negative minimumSpend, and INR currency.");
  }
  if (activeOfferings.length === 0) {
    warnings.push("Configuring at least one set menu or package accelerates enterprise booking conversion.");
  }

  // Check 8: Public-Safe Description
  const hasDescription = Boolean(
    venue.publicDescription && venue.publicDescription.trim().length >= 10,
  );
  checks.push({
    id: "public_description",
    name: "Public-Safe Description Quality",
    passed: hasDescription,
    critical: false,
    message: hasDescription
      ? "Public-safe description is provided"
      : "No public-safe description provided",
  });
  if (!hasDescription) {
    warnings.push("Add a curated description to provide enterprise event hosts with context.");
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
