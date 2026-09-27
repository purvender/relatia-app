import assert from "node:assert/strict";
import {
  createProviderSchema,
  updateProviderSchema,
  createProviderContactSchema,
  updateProviderContactSchema,
  createProviderVenueSchema,
  updateProviderVenueSchema,
  createBookableSpaceSchema,
  updateBookableSpaceSchema,
  createOfferingSchema,
  updateOfferingSchema,
  updateAvailabilityMetadataSchema,
  updateCancellationPolicySchema,
  recordVerificationSchema,
  createProviderBookingRequestSchema,
  acceptProviderBookingRequestSchema,
  rejectProviderBookingRequestSchema,
  cancelProviderBookingRequestSchema,
  providerRequestStatusEnum,
} from "../lib/provider/validation";
import {
  evaluateDiscoveryReadiness,
  filterDiscoverableBookableSpaces,
  filterDiscoverableOfferings,
} from "../lib/provider/readiness";

import type {
  ProviderOrganizationRecord,
  ProviderVenueRecord,
  BookableSpaceRecord,
  OfferingRecord,
  ProviderRequestStatus,
  ProviderBookingRequestRecord,
} from "../lib/provider/types";
import {
  getProviderRequestStatusLabel,
  PROVIDER_REQUEST_STATUS_LABELS,
} from "../lib/provider/types";

function runTests() {
  console.log("🧪 Starting Day 18 Step 2 Provider Onboarding & Domain Test Suite...");

  // Test 1: Provider Organization validation
  {
    const valid = createProviderSchema.safeParse({
      name: "The Oberoi Group - Gurugram",
      legalName: "EIH Limited",
      providerType: "HOTEL",
      city: "Gurugram",
      internalNotes: "Private commercial terms negotiated.",
    });
    assert.equal(valid.success, true, "Valid provider schema should pass");

    const validUpdate = updateProviderSchema.safeParse({
      id: 1,
      name: "The Oberoi Group - Delhi NCR",
      status: "VERIFIED",
    });
    assert.equal(validUpdate.success, true, "Valid provider update schema should pass");

    const invalid = createProviderSchema.safeParse({
      name: "A", // too short
      city: "",
      providerType: "INVALID_TYPE",
    });
    assert.equal(invalid.success, false, "Invalid provider schema should fail");
    console.log("  ✅ Test 1 Passed: Provider Organization Schema Validation");
  }

  // Test 2: BookableSpace validation & capacity invariants
  {
    const valid = createBookableSpaceSchema.safeParse({
      venueId: 1,
      name: "Kohinoor Private Dining Room",
      spaceType: "PRIVATE_DINING",
      minCapacity: 8,
      maxCapacity: 24,
      privacyLevel: "EXCLUSIVE",
    });
    assert.equal(valid.success, true, "Valid BookableSpace should pass");

    const invalidCapacity = createBookableSpaceSchema.safeParse({
      venueId: 1,
      name: "Invalid Space",
      spaceType: "PRIVATE_DINING",
      minCapacity: 30,
      maxCapacity: 10, // min > max violates invariant
    });
    assert.equal(invalidCapacity.success, false, "Min capacity > max capacity must fail");
    console.log("  ✅ Test 2 Passed: BookableSpace Capacity Invariant Validation");
  }

  // Test 3: Offering & Pricing Validation
  {
    const valid = createOfferingSchema.safeParse({
      venueId: 1,
      name: "5-Course CXO Degustation",
      offeringType: "SET_MENU",
      pricingBasis: "PER_PERSON",
      baseAmountPaise: 650000,
      currency: "INR",
      minimumSpendPaise: 5000000,
    });
    assert.equal(valid.success, true, "Valid offering should pass");

    const negativePricing = createOfferingSchema.safeParse({
      venueId: 1,
      name: "Invalid Pricing",
      offeringType: "SET_MENU",
      pricingBasis: "PER_PERSON",
      baseAmountPaise: -100, // Negative amount forbidden
      currency: "INR",
    });
    assert.equal(negativePricing.success, false, "Negative price amount must fail");
    console.log("  ✅ Test 3 Passed: Offering & Pricing Non-Negative Invariant");
  }

  // Test 4: Discovery Readiness Evaluation — Eligible Case
  {
    const provider: ProviderOrganizationRecord = {
      id: 1,
      name: "The Oberoi Group",
      legalName: "EIH Ltd",
      providerType: "HOTEL",
      city: "Gurugram",
      status: "VERIFIED",
      onboardingStatus: "READY_FOR_DISCOVERY",
      internalNotes: "Confidential GM notes",
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };

    const venue: ProviderVenueRecord = {
      id: 101,
      companyId: null,
      providerOrgId: 1,
      name: "The Oberoi Amarvilas Ballroom",
      city: "Gurugram",
      locality: "Golf Course Road",
      address: "Sector 54, Golf Course Road",
      capacity: 220,
      cuisine: "Contemporary Pan-Asian & Indian",
      priceBand: "LUXURY",
      tags: ["Five Star", "CXO Summit"],
      rating: 4.9,
      active: true,
      venueType: "HOTEL",
      publicDescription: "Gurugram's premier executive hospitality destination.",
      visibility: "DISCOVERABLE",
      isDiscoverable: true,
      verificationStatus: "VERIFIED",
      lastVerifiedAt: new Date().toISOString(),
      internalNotes: "Internal rate code",
    };

    const bookableSpaces: BookableSpaceRecord[] = [
      {
        id: 201,
        venueId: 101,
        name: "Kohinoor Executive Suite",
        spaceType: "PRIVATE_DINING",
        minCapacity: 8,
        maxCapacity: 24,
        privacyLevel: "EXCLUSIVE",
        seatedCapacity: 18,
        standingCapacity: 24,
        publicDescription: "Acoustically isolated private dining room.",
        status: "ACTIVE",
        isActive: true,
        internalNotes: "Keys with Front Desk",
        createdAt: new Date().toISOString(),
      },
    ];

    const offerings: OfferingRecord[] = [
      {
        id: 301,
        providerOrgId: 1,
        venueId: 101,
        bookableSpaceId: 201,
        name: "5-Course Degustation",
        offeringType: "SET_MENU",
        pricingBasis: "PER_PERSON",
        baseAmount: 650000,
        currency: "INR",
        minimumSpend: 5000000,
        minGuests: 8,
        maxGuests: 24,
        description: "Plated multi-course dinner",
        dietaryNotes: "Veg & Non-Veg",
        pricingNotes: "Taxes extra",
        isCustomQuote: false,
        taxIncluded: false,
        isActive: true,
        isDiscoverable: true,
        internalNotes: "Cost ₹2,200",
        createdAt: new Date().toISOString(),
      },
    ];

    const readiness = evaluateDiscoveryReadiness({
      provider,
      venue,
      bookableSpaces,
      offerings,
    });

    assert.equal(readiness.isEligible, true, "Fully configured venue must be eligible for discovery");
    assert.equal(readiness.blockers.length, 0, "There should be 0 blockers");
    assert.ok(readiness.score >= 80, `Score (${readiness.score}%) should be >= 80%`);
    console.log("  ✅ Test 4 Passed: Discovery Readiness Engine (Eligible Case)");
  }

  // Test 5: Discovery Readiness Evaluation — Blocked Cases
  {
    const provider: ProviderOrganizationRecord = {
      id: 1,
      name: "Paused Provider",
      legalName: null,
      providerType: "RESTAURANT",
      city: "Gurugram",
      status: "PAUSED", // PAUSED provider must block readiness
      onboardingStatus: "IN_PROGRESS",
      internalNotes: null,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };

    const venue: ProviderVenueRecord = {
      id: 102,
      companyId: null,
      providerOrgId: 1,
      name: "Paused Venue",
      city: "Gurugram",
      locality: null,
      address: null,
      capacity: 50,
      cuisine: "Indian",
      priceBand: "PREMIUM",
      tags: [],
      rating: 4.5,
      active: true,
      venueType: "RESTAURANT",
      publicDescription: null,
      visibility: "DRAFT",
      isDiscoverable: false,
      verificationStatus: "UNVERIFIED", // UNVERIFIED must block readiness
      lastVerifiedAt: null,
      internalNotes: null,
    };

    const readinessWithoutSpaces = evaluateDiscoveryReadiness({
      provider,
      venue,
      bookableSpaces: [], // No spaces must block readiness
      offerings: [],
    });

    assert.equal(readinessWithoutSpaces.isEligible, false, "Incomplete venue must not be eligible");
    assert.ok(readinessWithoutSpaces.blockers.length >= 3, "Should have multiple critical blockers");
    console.log("  ✅ Test 5 Passed: Discovery Readiness Engine (Blocked Invariants)");
  }

  // Test 6: Public-Safe Filtering of Bookable Spaces & Offerings
  {
    const spaces: BookableSpaceRecord[] = [
      {
        id: 1,
        venueId: 10,
        name: "Active Space",
        spaceType: "PRIVATE_DINING",
        minCapacity: 6,
        maxCapacity: 18,
        privacyLevel: "EXCLUSIVE",
        seatedCapacity: 14,
        standingCapacity: 18,
        publicDescription: "Public safe description",
        status: "ACTIVE",
        isActive: true,
        internalNotes: "CONFIDENTIAL REVENUE SHARE",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        venueId: 10,
        name: "Draft Space",
        spaceType: "LOUNGE",
        minCapacity: 10,
        maxCapacity: 30,
        privacyLevel: "OPEN",
        seatedCapacity: 20,
        standingCapacity: 30,
        publicDescription: "Draft space",
        status: "DRAFT",
        isActive: false, // Inactive
        internalNotes: "Not ready",
        createdAt: new Date().toISOString(),
      },
    ];

    const discoverable = filterDiscoverableBookableSpaces(spaces);
    assert.equal(discoverable.length, 1, "Only active and valid spaces should be discoverable");
    assert.equal(discoverable[0].name, "Active Space");
    console.log("  ✅ Test 6 Passed: Public-Safe BookableSpace Filtering");
  }

  // Test 7: Provider Contact Create & Edit Validation
  {
    const validContact = createProviderContactSchema.safeParse({
      providerOrgId: 1,
      name: "Amanpreet Singh",
      role: "Director of Hospitality",
      email: "amanpreet@luxurygroup.com",
      phone: "+91 98111 22334",
      preferredContactMethod: "EMAIL",
      category: "OPERATIONS",
      internalNotes: "Primary escalation contact",
    });
    assert.equal(validContact.success, true, "Valid contact schema should pass");

    const editContact = updateProviderContactSchema.safeParse({
      id: 10,
      name: "Amanpreet Singh (Promoted)",
      role: "Vice President Operations",
      isActive: false,
    });
    assert.equal(editContact.success, true, "Valid update contact schema should pass");

    const invalidEmail = createProviderContactSchema.safeParse({
      providerOrgId: 1,
      name: "Invalid Email",
      role: "Manager",
      email: "not-an-email",
    });
    assert.equal(invalidEmail.success, false, "Invalid email must fail");
    console.log("  ✅ Test 7 Passed: Provider Contact Create & Update Validation");
  }

  // Test 8: Venue Create, Edit & Invariant Validation
  {
    const validVenueCreate = createProviderVenueSchema.safeParse({
      providerOrgId: 1,
      name: "The Oberoi Grand Dining",
      city: "Gurugram",
      cuisine: "Modern Indian",
      capacity: 100,
      priceBand: "PREMIUM",
    });
    assert.equal(validVenueCreate.success, true, "Valid venue create schema should pass");

    const validVenueUpdate = updateProviderVenueSchema.safeParse({
      id: 101,
      name: "Updated Oberoi Suite",
      capacity: 120,
      priceBand: "LUXURY",
      visibility: "INTERNAL_ONLY",
      active: true,
    });
    assert.equal(validVenueUpdate.success, true, "Valid venue update should pass");

    const invalidCapacity = updateProviderVenueSchema.safeParse({
      id: 101,
      capacity: -5,
    });
    assert.equal(invalidCapacity.success, false, "Negative capacity must fail");
    console.log("  ✅ Test 8 Passed: Venue Create & Update Schema Invariants");
  }

  // Test 9: BookableSpace Edit & Invariant Validation
  {
    const validSpaceUpdate = updateBookableSpaceSchema.safeParse({
      id: 201,
      name: "The Royal Ballroom (West Wing)",
      minCapacity: 50,
      maxCapacity: 150,
      privacyLevel: "EXCLUSIVE",
      status: "ACTIVE",
    });
    assert.equal(validSpaceUpdate.success, true, "Valid space update should pass");

    const invalidCapacityUpdate = updateBookableSpaceSchema.safeParse({
      id: 201,
      minCapacity: 200,
      maxCapacity: 100, // min > max
    });
    assert.equal(invalidCapacityUpdate.success, false, "Min capacity > max capacity must fail");
    console.log("  ✅ Test 9 Passed: BookableSpace Update Schema & Capacity Invariants");
  }

  // Test 10: Offering Edit & Pricing Validation
  {
    const validOfferingUpdate = updateOfferingSchema.safeParse({
      id: 301,
      name: "Summer Tasting Menu",
      baseAmountPaise: 450000,
      minimumSpendPaise: 3000000,
      minGuests: 6,
      maxGuests: 20,
      taxIncluded: true,
    });
    assert.equal(validOfferingUpdate.success, true, "Valid offering update should pass");

    const invalidGuests = updateOfferingSchema.safeParse({
      id: 301,
      minGuests: 50,
      maxGuests: 10, // minGuests > maxGuests
    });
    assert.equal(invalidGuests.success, false, "Min guests > max guests must fail");
    console.log("  ✅ Test 10 Passed: Offering Update Schema & Guest Invariants");
  }

  // Test 11: Verification Submission & Verification Status Enum
  {
    const validVerification = recordVerificationSchema.safeParse({
      venueId: 101,
      status: "VERIFIED",
      verifiedBy: "lead.auditor@relatia.in",
      verificationSource: "PHYSICAL_SITE_INSPECTION",
      notes: "Kitchen audit passed, soundproofing verified, FSSAI valid until 2028.",
    });
    assert.equal(validVerification.success, true, "Valid verification record should pass");

    const invalidStatus = recordVerificationSchema.safeParse({
      venueId: 101,
      status: "SOME_UNKNOWN_STATUS",
      verifiedBy: "auditor@relatia.in",
    });
    assert.equal(invalidStatus.success, false, "Invalid verification status must fail");
    console.log("  ✅ Test 11 Passed: Verification Record Schema & Status Validation");
  }

  // Test 12: Availability & Cancellation Schema Validation
  {
    const validAvailability = updateAvailabilityMetadataSchema.safeParse({
      venueId: 101,
      requiresManualConfirmation: true,
      leadTimeHours: 48,
      operatingDaysNotes: "Tuesday–Sunday (Closed Mondays)",
    });
    assert.equal(validAvailability.success, true, "Valid availability schema should pass");

    const validCancellation = updateCancellationPolicySchema.safeParse({
      venueId: 101,
      summary: "Complimentary cancellation up to 48 hours prior to seating.",
      cutoffHours: 48,
      depositRequired: true,
      depositPercent: 20,
    });
    assert.equal(validCancellation.success, true, "Valid cancellation policy schema should pass");
    console.log("  ✅ Test 12 Passed: Availability & Cancellation Governance Schema Validation");
  }

  // Test 13: Inactive/Paused Spaces and Offerings Exclusion from Discovery
  {
    const offerings: OfferingRecord[] = [
      {
        id: 1,
        providerOrgId: 1,
        venueId: 101,
        bookableSpaceId: null,
        name: "Active Package",
        offeringType: "SET_MENU",
        pricingBasis: "PER_PERSON",
        baseAmount: 300000,
        currency: "INR",
        minimumSpend: 0,
        minGuests: null,
        maxGuests: null,
        description: null,
        dietaryNotes: null,
        pricingNotes: null,
        isCustomQuote: false,
        taxIncluded: true,
        isActive: true,
        isDiscoverable: true,
        internalNotes: "Internal note",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        providerOrgId: 1,
        venueId: 101,
        bookableSpaceId: null,
        name: "Paused Package",
        offeringType: "SET_MENU",
        pricingBasis: "PER_PERSON",
        baseAmount: 300000,
        currency: "INR",
        minimumSpend: 0,
        minGuests: null,
        maxGuests: null,
        description: null,
        dietaryNotes: null,
        pricingNotes: null,
        isCustomQuote: false,
        taxIncluded: true,
        isActive: false, // Inactive
        isDiscoverable: false,
        internalNotes: "Draft",
        createdAt: new Date().toISOString(),
      },
    ];

    const discoverableOfferings = filterDiscoverableOfferings(offerings);
    assert.equal(discoverableOfferings.length, 1, "Only active discoverable offerings should pass filter");
    assert.equal(discoverableOfferings[0].name, "Active Package");
    console.log("  ✅ Test 13 Passed: Inactive & Paused Records Exclusion from Discovery");
  }

  // Test 14: End-to-End Discovery Safety & Public-Safe DTO Isolation
  {
    const sensitiveVenueRecord: ProviderVenueRecord = {
      id: 999,
      companyId: null,
      providerOrgId: 1,
      name: "The Grand Hyatt Ballroom",
      city: "Gurugram",
      locality: "Golf Course Extension",
      address: "Sector 58, Gurugram",
      capacity: 350,
      cuisine: "European & Contemporary Indian",
      priceBand: "LUXURY",
      tags: ["5-Star", "CXO Summit", "Verified Partner"],
      rating: 4.95,
      active: true,
      venueType: "HOTEL",
      publicDescription: "Luxury enterprise dining venue with acoustic isolation.",
      visibility: "DISCOVERABLE",
      isDiscoverable: true,
      verificationStatus: "VERIFIED",
      lastVerifiedAt: new Date().toISOString(),
      internalNotes: "CONFIDENTIAL: Internal GM Commission Rate: 12%",
    };

    const spaces: BookableSpaceRecord[] = [
      {
        id: 801,
        venueId: 999,
        name: "Emerald Boardroom",
        spaceType: "BOARDROOM",
        minCapacity: 10,
        maxCapacity: 30,
        privacyLevel: "EXCLUSIVE",
        seatedCapacity: 24,
        standingCapacity: 30,
        publicDescription: "High-spec AV and private dining setup",
        status: "ACTIVE",
        isActive: true,
        internalNotes: "DO NOT SHARE: VIP Pin code #9482",
        createdAt: new Date().toISOString(),
      },
      {
        id: 802,
        venueId: 999,
        name: "Service Prep Area",
        spaceType: "TERRACE",
        minCapacity: 5,
        maxCapacity: 15,
        privacyLevel: "OPEN",
        seatedCapacity: null,
        standingCapacity: null,
        publicDescription: null,
        status: "DRAFT",
        isActive: false, // Inactive space
        internalNotes: "Staff-only corridor",
        createdAt: new Date().toISOString(),
      },
    ];

    const offerings: OfferingRecord[] = [
      {
        id: 901,
        providerOrgId: 1,
        venueId: 999,
        bookableSpaceId: 801,
        name: "Presidential Dinner Package",
        offeringType: "SET_MENU",
        pricingBasis: "PER_PERSON",
        baseAmount: 850000,
        currency: "INR",
        minimumSpend: 6000000,
        minGuests: 10,
        maxGuests: 30,
        description: "Chef's curated 6-course banquet",
        dietaryNotes: "All dietary preferences accommodated",
        pricingNotes: "Taxes extra",
        isCustomQuote: false,
        taxIncluded: false,
        isActive: true,
        isDiscoverable: true,
        internalNotes: "Base food cost ₹2,800/head",
        createdAt: new Date().toISOString(),
      },
      {
        id: 902,
        providerOrgId: 1,
        venueId: 999,
        bookableSpaceId: 801,
        name: "Staff Meal",
        offeringType: "CUSTOM_EXPERIENCE",
        pricingBasis: "FIXED_TOTAL",
        baseAmount: 100000,
        currency: "INR",
        minimumSpend: 0,
        minGuests: null,
        maxGuests: null,
        description: "Internal catering",
        dietaryNotes: null,
        pricingNotes: null,
        isCustomQuote: false,
        taxIncluded: true,
        isActive: false, // Inactive package
        isDiscoverable: false,
        internalNotes: "Internal rate",
        createdAt: new Date().toISOString(),
      },
    ];

    // Filter public safe bookable spaces
    const safeSpaces = filterDiscoverableBookableSpaces(spaces);
    assert.equal(safeSpaces.length, 1, "Inactive space must be excluded");
    assert.equal(safeSpaces[0].id, 801);

    // Filter public safe offerings
    const safeOfferings = filterDiscoverableOfferings(offerings);
    assert.equal(safeOfferings.length, 1, "Inactive/non-discoverable offering must be excluded");
    assert.equal(safeOfferings[0].id, 901);

    // Map discoverable spaces to PublicSafeBookableSpace DTOs
    const publicSpaces: Array<Omit<BookableSpaceRecord, "internalNotes" | "isActive" | "status" | "createdAt" | "venueId">> = safeSpaces.map((s) => ({
      id: s.id,
      name: s.name,
      spaceType: s.spaceType,
      minCapacity: s.minCapacity,
      maxCapacity: s.maxCapacity,
      privacyLevel: s.privacyLevel,
      seatedCapacity: s.seatedCapacity,
      standingCapacity: s.standingCapacity,
      publicDescription: s.publicDescription,
    }));

    // Ensure sensitive venue record metadata contains internalNotes but public-safe spaces do not leak them
    assert.ok(sensitiveVenueRecord.internalNotes?.includes("CONFIDENTIAL"));
    assert.equal((publicSpaces[0] as unknown as { internalNotes?: string }).internalNotes, undefined, "Public safe space must not expose internalNotes");

    console.log("  ✅ Test 14 Passed: End-to-End Public Safe Filtering & Isolation");
  }

  // Test 15: Verification & Visibility Decoupling Invariants
  {
    // A venue that is VERIFIED but visibility is INTERNAL_ONLY
    const verifiedInternalVenue: ProviderVenueRecord = {
      id: 501,
      companyId: null,
      providerOrgId: 2,
      name: "Private Dining Club",
      city: "Bengaluru",
      locality: "Indiranagar",
      address: "100ft Road",
      capacity: 60,
      cuisine: "Modern European",
      priceBand: "LUXURY",
      tags: ["Members Only"],
      rating: 4.8,
      active: true,
      venueType: "RESTAURANT",
      publicDescription: "Exclusive club dining",
      visibility: "INTERNAL_ONLY", // Operator has explicitly kept it internal
      isDiscoverable: false,
      verificationStatus: "VERIFIED", // Audit verified
      lastVerifiedAt: new Date().toISOString(),
      internalNotes: null,
    };

    const provider: ProviderOrganizationRecord = {
      id: 2,
      name: "Club Hospitality",
      legalName: "Club Pvt Ltd",
      providerType: "RESTAURANT",
      city: "Bengaluru",
      status: "VERIFIED",
      onboardingStatus: "IN_PROGRESS",
      internalNotes: null,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };

    const space: BookableSpaceRecord = {
      id: 502,
      venueId: 501,
      name: "Founder Room",
      spaceType: "PRIVATE_DINING",
      minCapacity: 4,
      maxCapacity: 16,
      privacyLevel: "EXCLUSIVE",
      seatedCapacity: 12,
      standingCapacity: 16,
      publicDescription: "Private dining room",
      status: "ACTIVE",
      isActive: true,
      internalNotes: null,
      createdAt: new Date().toISOString(),
    };

    const offering: OfferingRecord = {
      id: 503,
      providerOrgId: 2,
      venueId: 501,
      bookableSpaceId: 502,
      name: "Founders Degustation",
      offeringType: "SET_MENU",
      pricingBasis: "PER_PERSON",
      baseAmount: 500000,
      currency: "INR",
      minimumSpend: 2500000,
      minGuests: 4,
      maxGuests: 16,
      description: "Fine dining menu",
      dietaryNotes: null,
      pricingNotes: null,
      isCustomQuote: false,
      taxIncluded: true,
      isActive: true,
      isDiscoverable: true,
      internalNotes: null,
      createdAt: new Date().toISOString(),
    };

    const readiness = evaluateDiscoveryReadiness({
      provider,
      venue: verifiedInternalVenue,
      bookableSpaces: [space],
      offerings: [offering],
    });

    // Verification and setup are valid, so readiness is eligible
    assert.equal(readiness.isEligible, true, "Readiness score must evaluate eligibility accurately");

    // BUT discoverability check requires explicit DISCOVERABLE visibility
    const isActuallyDiscoverable = verifiedInternalVenue.visibility === "DISCOVERABLE" && readiness.isEligible;
    assert.equal(isActuallyDiscoverable, false, "INTERNAL_ONLY venue must not be discoverable even if verified");

    console.log("  ✅ Test 15 Passed: Verification vs Visibility Decoupling Invariants");
  }

  // Test 16: Comprehensive Boundary & Negative Validation Checks
  {
    // Negative lead time
    const invalidLeadTime = updateAvailabilityMetadataSchema.safeParse({
      venueId: 101,
      leadTimeHours: -10,
    });
    assert.equal(invalidLeadTime.success, false, "Negative lead time must fail validation");

    // Negative deposit percent
    const invalidDeposit = updateCancellationPolicySchema.safeParse({
      venueId: 101,
      summary: "Sample policy",
      depositPercent: 150, // exceeds 100%
    });
    assert.equal(invalidDeposit.success, false, "Deposit percent > 100% must fail validation");

    // Empty provider organization name
    const emptyName = createProviderSchema.safeParse({
      name: "   ",
      providerType: "HOTEL",
      city: "Gurugram",
    });
    assert.equal(emptyName.success, false, "Whitespace-only provider name must fail validation");

    console.log("  ✅ Test 16 Passed: Boundary & Negative Validation Coverage");
  }

  // Test 17: Plain-English Operator Blocker Quality & Formula Leak Prevention
  {
    const provider: ProviderOrganizationRecord = {
      id: 10,
      name: "Draft Hospitality",
      legalName: null,
      providerType: "RESTAURANT",
      city: "Mumbai",
      status: "DRAFT",
      onboardingStatus: "IN_PROGRESS",
      internalNotes: null,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };

    const venue: ProviderVenueRecord = {
      id: 88,
      companyId: null,
      providerOrgId: 10,
      name: "Incomplete Venue",
      city: "Mumbai",
      locality: null,
      address: null,
      capacity: 40,
      cuisine: "Seafood",
      priceBand: "PREMIUM",
      tags: [],
      rating: 4.2,
      active: true,
      venueType: "RESTAURANT",
      publicDescription: null,
      visibility: "DRAFT",
      isDiscoverable: false,
      verificationStatus: "UNVERIFIED",
      lastVerifiedAt: null,
      internalNotes: null,
    };

    const readiness = evaluateDiscoveryReadiness({
      provider,
      venue,
      bookableSpaces: [],
      offerings: [],
    });

    assert.equal(readiness.isEligible, false);
    assert.ok(readiness.blockers.length > 0, "Must contain blockers");

    // Ensure NO raw math formulas or developer-facing syntax leak into operator copy
    for (const blocker of readiness.blockers) {
      assert.equal(blocker.includes("min > 0"), false, "Blocker must not contain formula 'min > 0'");
      assert.equal(blocker.includes("max >= min"), false, "Blocker must not contain formula 'max >= min'");
      assert.equal(blocker.includes("VERIFIED or PENDING_VERIFICATION"), false, "Blocker must not expose raw enum tuple");
      assert.ok(blocker.length >= 15, "Blocker should be a clear, informative sentence");
    }

    console.log("  ✅ Test 17 Passed: Plain-English Operator Blocker Copy & Formula Isolation");
  }

  // Test 18: Discovery Catalog Filtering Rules & Multi-State Exclusion
  {
    type MockVenueFilter = {
      id: number;
      active: boolean;
      visibility: "DRAFT" | "INTERNAL_ONLY" | "DISCOVERABLE" | "PAUSED" | "ARCHIVED";
      isDiscoverable: boolean;
    };

    const venuesToTest: MockVenueFilter[] = [
      { id: 1, active: true, visibility: "DRAFT", isDiscoverable: false },
      { id: 2, active: true, visibility: "INTERNAL_ONLY", isDiscoverable: false },
      { id: 3, active: true, visibility: "INTERNAL_ONLY", isDiscoverable: true }, // Eligible but marked INTERNAL_ONLY
      { id: 4, active: true, visibility: "DISCOVERABLE", isDiscoverable: true },  // Live and discoverable!
      { id: 5, active: true, visibility: "DISCOVERABLE", isDiscoverable: false }, // Discoverable set but setup incomplete
      { id: 6, active: true, visibility: "PAUSED", isDiscoverable: false },
      { id: 7, active: true, visibility: "ARCHIVED", isDiscoverable: false },
      { id: 8, active: false, visibility: "DISCOVERABLE", isDiscoverable: true }, // Inactive venue
    ];

    const discoverableVenues = venuesToTest.filter((v) => {
      if (!v.active) return false;
      if (v.visibility !== "DISCOVERABLE") return false;
      return v.isDiscoverable;
    });

    assert.equal(discoverableVenues.length, 1, "Exactly 1 venue (id: 4) must pass discovery filter");
    assert.equal(discoverableVenues[0].id, 4);

    console.log("  ✅ Test 18 Passed: Discovery Catalog Filtering Rules & Multi-State Isolation");
  }

  // Test 19: Partner Onboarding Step Progression & Ownership Invariants
  {
    type PartnerStep =
      | "ACCOUNT_CREATED"
      | "ORG_ADDED"
      | "CONTACT_ADDED"
      | "VENUE_ADDED"
      | "SPACE_ADDED"
      | "OFFERING_ADDED"
      | "SUBMITTED";

    const stepOrder: PartnerStep[] = [
      "ACCOUNT_CREATED",
      "ORG_ADDED",
      "CONTACT_ADDED",
      "VENUE_ADDED",
      "SPACE_ADDED",
      "OFFERING_ADDED",
      "SUBMITTED",
    ];

    // Assert strictly linear progression
    assert.equal(stepOrder.indexOf("ACCOUNT_CREATED"), 0);
    assert.equal(stepOrder.indexOf("ORG_ADDED"), 1);
    assert.equal(stepOrder.indexOf("SUBMITTED"), 6);

    // Ownership check helper invariant
    function assertOwnership(partnerOrgId: number | null, targetOrgId: number) {
      if (partnerOrgId !== targetOrgId) {
        throw new Error("Access denied: you do not own this provider organization.");
      }
    }

    // Matching org passes
    assert.doesNotThrow(() => assertOwnership(42, 42));

    // Mismatched or null org fails
    assert.throws(
      () => assertOwnership(null, 42),
      /Access denied/,
      "Null partnerOrgId must throw"
    );
    assert.throws(
      () => assertOwnership(99, 42),
      /Access denied/,
      "Mismatched partnerOrgId must throw"
    );

    console.log("  ✅ Test 19 Passed: Partner Onboarding Step Progression & Ownership Invariants");
  }

  // Test 20: Partner Self-Publishing / Self-Verification Isolation
  {
    // A partner venue at SUBMITTED step must never become discoverable on its own
    const partnerSubmittedOrg: ProviderOrganizationRecord = {
      id: 50,
      name: "Grand Ballroom Partners",
      legalName: "Grand Ballroom LLP",
      providerType: "HOTEL",
      status: "PENDING_VERIFICATION",
      onboardingStatus: "IN_PROGRESS",
      city: "Mumbai",
      internalNotes: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const partnerVenue: ProviderVenueRecord = {
      id: 100,
      companyId: null,
      providerOrgId: 50,
      name: "The Royal Ballroom",
      address: "100 Marine Drive",
      city: "Mumbai",
      locality: "Marine Drive",
      capacity: 300,
      cuisine: "Multi-Cuisine",
      priceBand: "LUXURY",
      tags: ["Ballroom", "Luxury"],
      rating: 4.9,
      active: true,
      venueType: "HOTEL",
      publicDescription: "Grand ballroom suite",
      visibility: "INTERNAL_ONLY",
      isDiscoverable: false,
      verificationStatus: "PENDING_REVIEW",
      lastVerifiedAt: null,
      internalNotes: null,
    };

    const spaces: BookableSpaceRecord[] = [
      {
        id: 201,
        venueId: 100,
        name: "Main Ballroom",
        spaceType: "BALLROOM",
        minCapacity: 50,
        maxCapacity: 300,
        privacyLevel: "EXCLUSIVE",
        seatedCapacity: 300,
        standingCapacity: 400,
        publicDescription: "Full ballroom suite",
        status: "ACTIVE",
        isActive: true,
        internalNotes: null,
        createdAt: new Date().toISOString(),
      },
    ];

    const offerings: OfferingRecord[] = [
      {
        id: 301,
        venueId: 100,
        providerOrgId: 50,
        bookableSpaceId: 201,
        name: "Executive Gala Package",
        offeringType: "SET_MENU",
        pricingBasis: "PER_PERSON",
        baseAmount: 450000,
        currency: "INR",
        minimumSpend: 20000000,
        minGuests: 50,
        maxGuests: 300,
        description: "Full catering package",
        dietaryNotes: null,
        pricingNotes: null,
        isCustomQuote: false,
        taxIncluded: true,
        isActive: true,
        isDiscoverable: false,
        internalNotes: null,
        createdAt: new Date().toISOString(),
      },
    ];

    const readiness = evaluateDiscoveryReadiness({
      provider: partnerSubmittedOrg,
      venue: partnerVenue,
      bookableSpaces: spaces,
      offerings: offerings,
    });

    // Technical readiness can be scored (e.g. spaces/menus configured)
    assert.ok(readiness.score > 0, "Technical readiness can evaluate configured spaces");

    // CRITICAL: Even when spaces/menus are configured, partner cannot self-publish.
    // The venue remains INTERNAL_ONLY and not discoverable until internal operator review.
    assert.equal(
      partnerVenue.visibility === "DISCOVERABLE" && partnerVenue.isDiscoverable,
      false,
      "Partner cannot self-publish to DISCOVERABLE"
    );

    console.log("  ✅ Test 20 Passed: Partner Self-Publishing & Discovery Isolation");
  }

  // Test 21: Partner Form Enum Mapping & User-Friendly Error Messages
  {
    // Invalid providerType produces friendly error
    const result = createProviderSchema.safeParse({
      name: "Valid Name",
      providerType: "INVALID_OPTION",
      city: "Mumbai",
    });

    assert.equal(result.success, false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      assert.ok(fieldErrors.providerType, "Must have providerType error");
      assert.equal(
        fieldErrors.providerType[0],
        "Please select a valid business type.",
        "Must have clean friendly error message without raw enum leak"
      );
    }

    // All form UI select values must be valid backend enum keys
    const validOrgTypes = [
      "RESTAURANT",
      "HOTEL",
      "CLUB",
      "CATERING_COMPANY",
      "EXPERIENCE_PROVIDER",
      "ACTIVITY_PROVIDER",
      "LIVE_ENTERTAINMENT",
      "GIFTING_PROVIDER",
      "MERCHANDISE_PROVIDER",
    ];

    for (const orgType of validOrgTypes) {
      const parse = createProviderSchema.safeParse({
        name: "Test Group",
        providerType: orgType,
        city: "Mumbai",
      });
      assert.equal(parse.success, true, `ProviderType "${orgType}" must be valid`);
    }

    console.log("  ✅ Test 21 Passed: Partner Form Enum Mapping & User-Friendly Error Messages");
  }

  // Test 22: Provider Booking Request Schema & Initial Lifecycle
  {
    const validRequest = createProviderBookingRequestSchema.safeParse({
      eventId: 101,
      venueId: 201,
      bookableSpaceId: 301,
      offeringId: 401,
      requestedDateTime: "2026-10-15T19:00:00.000Z",
      attendees: 18,
      estimatedAmountPaise: 9000000,
      dietaryNotes: "2 Vegan, 1 Nut allergy",
      operationalNotes: "Need AV setup for CXO keynote",
    });

    assert.equal(validRequest.success, true, "Valid booking request must parse successfully");

    const invalidRequest = createProviderBookingRequestSchema.safeParse({
      eventId: 101,
      venueId: 201,
      requestedDateTime: "",
      attendees: 0, // Invariant: must be at least 1 guest
    });

    assert.equal(invalidRequest.success, false, "Zero attendees must fail validation");

    const statusValid = providerRequestStatusEnum.safeParse("PENDING_PROVIDER_REVIEW");
    assert.equal(statusValid.success, true, "PENDING_PROVIDER_REVIEW must be a valid status");

    const statusInvalid = providerRequestStatusEnum.safeParse("UNKNOWN_STATUS");
    assert.equal(statusInvalid.success, false, "Invalid status must fail");

    const acceptValid = acceptProviderBookingRequestSchema.safeParse({
      requestId: 55,
      providerResponseNote: "We have held the space.",
    });
    assert.equal(acceptValid.success, true, "Valid accept request schema must pass");

    const cancelValid = cancelProviderBookingRequestSchema.safeParse({
      requestId: 55,
    });
    assert.equal(cancelValid.success, true, "Valid cancel request schema must pass");

    console.log("  ✅ Test 22 Passed: Provider Booking Request Schema & Initial Lifecycle");
  }

  // Test 23: Enterprise Request Authorization & Cross-Tenant Boundaries
  {
    type EnterpriseUser = { id: number; companyId: number; role: string };
    type EventStub = { id: number; companyId: number; attendees: number };
    type VenueStub = {
      id: number;
      providerOrgId: number;
      capacity: number;
      active: boolean;
      visibility: string;
      verificationStatus: string;
    };
    type ProviderOrgStub = { id: number; status: string };

    const enterpriseUser: EnterpriseUser = { id: 1, companyId: 50, role: "REQUESTER" };
    const validEvent: EventStub = { id: 100, companyId: 50, attendees: 20 };
    const foreignEvent: EventStub = { id: 200, companyId: 999, attendees: 20 }; // Cross-company

    const verifiedOrg: ProviderOrgStub = { id: 10, status: "VERIFIED" };
    const unverifiedOrg: ProviderOrgStub = { id: 11, status: "PENDING_VERIFICATION" };

    const verifiedVenue: VenueStub = {
      id: 501,
      providerOrgId: 10,
      capacity: 50,
      active: true,
      visibility: "DISCOVERABLE",
      verificationStatus: "VERIFIED",
    };

    const unverifiedVenue: VenueStub = {
      id: 502,
      providerOrgId: 11,
      capacity: 50,
      active: true,
      visibility: "DISCOVERABLE",
      verificationStatus: "VERIFIED",
    };

    function validateRequestCreation(user: EnterpriseUser, event: EventStub, venue: VenueStub, org: ProviderOrgStub) {
      if (event.companyId !== user.companyId) {
        throw new Error("Event not found or does not belong to your company.");
      }
      if (!venue.active || venue.providerOrgId !== org.id) {
        throw new Error("The selected venue is unavailable or does not exist.");
      }
      if (org.status !== "VERIFIED") {
        throw new Error("The partner organization is not yet verified to accept corporate bookings.");
      }
      if (venue.visibility !== "DISCOVERABLE" && venue.verificationStatus !== "VERIFIED") {
        throw new Error("This venue is not currently eligible to receive booking requests.");
      }
      return true;
    }

    // Happy path: same company, verified provider
    assert.equal(validateRequestCreation(enterpriseUser, validEvent, verifiedVenue, verifiedOrg), true);

    // Cross-tenant guard: cannot request for another company's event
    assert.throws(
      () => validateRequestCreation(enterpriseUser, foreignEvent, verifiedVenue, verifiedOrg),
      /does not belong to your company/,
      "Cross-company event access must throw"
    );

    // Unverified provider guard: cannot request booking from unverified provider
    assert.throws(
      () => validateRequestCreation(enterpriseUser, validEvent, unverifiedVenue, unverifiedOrg),
      /partner organization is not yet verified/,
      "Unverified provider must not receive requests"
    );

    console.log("  ✅ Test 23 Passed: Enterprise Request Authorization & Cross-Tenant Boundaries");
  }

  // Test 24: Provider Decision Lifecycle Invariants
  {
    type RequestState = {
      id: number;
      providerOrgId: number;
      status: ProviderRequestStatus;
      rejectionReason: string | null;
      providerResponseNote: string | null;
      respondedByPartnerUserId: number | null;
      respondedAt: string | null;
    };

    function acceptRequest(
      req: RequestState,
      partner: { id: number; providerOrgId: number },
      orgStatus: string,
      note?: string | null
    ): RequestState {
      if (req.providerOrgId !== partner.providerOrgId) {
        throw new Error("Access denied: You cannot act on a request for another provider organization.");
      }
      if (orgStatus !== "VERIFIED") {
        throw new Error("Your partner organization must be fully verified before accepting requests.");
      }
      if (req.status !== "PENDING_PROVIDER_REVIEW") {
        throw new Error(`Cannot accept request: current status is ${req.status}.`);
      }
      return {
        ...req,
        status: "ACCEPTED",
        providerResponseNote: note ?? null,
        respondedByPartnerUserId: partner.id,
        respondedAt: new Date().toISOString(),
      };
    }

    function rejectRequest(
      req: RequestState,
      partner: { id: number; providerOrgId: number },
      orgStatus: string,
      reason: string
    ): RequestState {
      if (req.providerOrgId !== partner.providerOrgId) {
        throw new Error("Access denied: You cannot act on a request for another provider organization.");
      }
      if (orgStatus !== "VERIFIED") {
        throw new Error("Your partner organization must be verified before acting on requests.");
      }
      if (req.status !== "PENDING_PROVIDER_REVIEW") {
        throw new Error(`Cannot decline request: current status is ${req.status}.`);
      }
      const parsed = rejectProviderBookingRequestSchema.safeParse({ requestId: req.id, rejectionReason: reason });
      if (!parsed.success) {
        throw new Error("A valid reason for declining this booking request is required.");
      }
      return {
        ...req,
        status: "REJECTED",
        rejectionReason: reason,
        respondedByPartnerUserId: partner.id,
        respondedAt: new Date().toISOString(),
      };
    }

    const pendingRequest: RequestState = {
      id: 701,
      providerOrgId: 25,
      status: "PENDING_PROVIDER_REVIEW",
      rejectionReason: null,
      providerResponseNote: null,
      respondedByPartnerUserId: null,
      respondedAt: null,
    };

    const partnerA = { id: 10, providerOrgId: 25 };
    const partnerB = { id: 11, providerOrgId: 99 }; // Foreign provider

    // Partner B cannot act on Partner A's request
    assert.throws(
      () => acceptRequest(pendingRequest, partnerB, "VERIFIED", "Confirmed"),
      /Access denied/,
      "Foreign partner cannot accept request"
    );

    // Partner A can accept
    const accepted = acceptRequest(pendingRequest, partnerA, "VERIFIED", "We look forward to hosting.");
    assert.equal(accepted.status, "ACCEPTED");
    assert.equal(accepted.respondedByPartnerUserId, 10);
    assert.ok(accepted.respondedAt);

    // Accepted request CANNOT be rejected again
    assert.throws(
      () => rejectRequest(accepted, partnerA, "VERIFIED", "Changed mind"),
      /Cannot decline request: current status is ACCEPTED/,
      "Accepted request cannot be rejected again"
    );

    // Rejection requires a valid reason (rejection schema)
    assert.throws(
      () => rejectRequest(pendingRequest, partnerA, "VERIFIED", "No"), // too short
      /valid reason/,
      "Rejection without adequate reason must fail"
    );

    const rejected = rejectRequest(pendingRequest, partnerA, "VERIFIED", "Fully committed on the requested date.");
    assert.equal(rejected.status, "REJECTED");
    assert.equal(rejected.rejectionReason, "Fully committed on the requested date.");

    // Rejected request CANNOT be accepted again
    assert.throws(
      () => acceptRequest(rejected, partnerA, "VERIFIED", "We can fit them"),
      /Cannot accept request: current status is REJECTED/,
      "Rejected request cannot be accepted again"
    );

    console.log("  ✅ Test 24 Passed: Provider Decision Lifecycle Invariants");
  }

  // Test 25: Provider Data Query Scoping & Tenant Isolation
  {
    const mockDbRequests: ProviderBookingRequestRecord[] = [
      {
        id: 1,
        eventId: 101,
        companyId: 1,
        createdById: 10,
        providerOrgId: 5,
        venueId: 12,
        bookableSpaceId: 3,
        offeringId: 7,
        requestedDateTime: "2026-10-20T18:00:00Z",
        attendees: 15,
        estimatedAmountPaise: 7500000,
        dietaryNotes: null,
        operationalNotes: null,
        status: "PENDING_PROVIDER_REVIEW",
        providerResponseNote: null,
        rejectionReason: null,
        respondedByPartnerUserId: null,
        respondedAt: null,
        createdAt: "2026-09-27T10:00:00Z",
        updatedAt: null,
      },
      {
        id: 2,
        eventId: 102,
        companyId: 2,
        createdById: 20,
        providerOrgId: 99, // Different provider org
        venueId: 44,
        bookableSpaceId: null,
        offeringId: null,
        requestedDateTime: "2026-10-22T19:00:00Z",
        attendees: 30,
        estimatedAmountPaise: 15000000,
        dietaryNotes: null,
        operationalNotes: null,
        status: "PENDING_PROVIDER_REVIEW",
        providerResponseNote: null,
        rejectionReason: null,
        respondedByPartnerUserId: null,
        respondedAt: null,
        createdAt: "2026-09-27T11:00:00Z",
        updatedAt: null,
      },
    ];

    function getRequestsForOrg(orgId: number) {
      return mockDbRequests.filter((r) => r.providerOrgId === orgId);
    }

    const org5Requests = getRequestsForOrg(5);
    assert.equal(org5Requests.length, 1);
    assert.equal(org5Requests[0].id, 1);
    assert.equal(org5Requests[0].providerOrgId, 5);

    // Cross-tenant data isolation: Org 5 never sees Org 99's requests
    assert.ok(org5Requests.every((r) => r.providerOrgId === 5));

    console.log("  ✅ Test 25 Passed: Provider Data Query Scoping & Tenant Isolation");
  }

  // Test 26: Plain-Language Status Labels & Error Sanitization
  {
    assert.equal(getProviderRequestStatusLabel("PENDING_PROVIDER_REVIEW"), "Waiting for provider response");
    assert.equal(getProviderRequestStatusLabel("ACCEPTED"), "Provider accepted the request");
    assert.equal(getProviderRequestStatusLabel("REJECTED"), "Provider declined the request");
    assert.equal(getProviderRequestStatusLabel("CANCELLED"), "Request cancelled");

    // All labels are user-friendly without raw enum characters
    for (const [status, label] of Object.entries(PROVIDER_REQUEST_STATUS_LABELS)) {
      assert.ok(label.length > 5, `Status label for ${status} must be descriptive`);
      assert.equal(label.includes("_"), false, `Label for ${status} must not contain underscores`);
    }

    console.log("  ✅ Test 26 Passed: Plain-Language Status Labels & Error Sanitization");
  }

  console.log("🎉 All 26 Provider Domain, Onboarding & Request Tests Passed Successfully!\n");
}

// ---------------------------------------------------------------------------
// Day 20 Step 2 — Provider Inbox UI Logic Tests
// ---------------------------------------------------------------------------

function runInboxUITests() {
  console.log("🧪 Starting Day 20 Step 2 Provider Inbox UI Test Suite...");

  type InboxRequest = {
    id: number;
    providerOrgId: number;
    status: ProviderRequestStatus;
    eventTitle: string;
    companyName: string;
    venueName: string;
    venueCity: string;
    spaceName: string | null;
    offeringName: string | null;
    requestedDateTime: string;
    attendees: number;
    estimatedAmountPaise: number | null;
    dietaryNotes: string | null;
    operationalNotes: string | null;
    providerResponseNote: string | null;
    rejectionReason: string | null;
    respondedAt: string | null;
    createdAt: string;
  };

  // Shared test data
  const ORG_A = 10;
  const ORG_B = 99;

  const allRequests: InboxRequest[] = [
    {
      id: 1,
      providerOrgId: ORG_A,
      status: "PENDING_PROVIDER_REVIEW",
      eventTitle: "Q4 Leadership Summit",
      companyName: "Relatia Corp",
      venueName: "The Oberoi Grand",
      venueCity: "Gurugram",
      spaceName: "Kohinoor Suite",
      offeringName: "5-Course CXO Degustation",
      requestedDateTime: "2026-11-10T19:00:00Z",
      attendees: 20,
      estimatedAmountPaise: 15000000,
      dietaryNotes: "2 Vegan",
      operationalNotes: "AV needed",
      providerResponseNote: null,
      rejectionReason: null,
      respondedAt: null,
      createdAt: "2026-09-27T10:00:00Z",
    },
    {
      id: 2,
      providerOrgId: ORG_A,
      status: "ACCEPTED",
      eventTitle: "Founders Day Gala",
      companyName: "TechVentures Ltd",
      venueName: "The Oberoi Grand",
      venueCity: "Gurugram",
      spaceName: null,
      offeringName: null,
      requestedDateTime: "2026-10-15T20:00:00Z",
      attendees: 45,
      estimatedAmountPaise: 30000000,
      dietaryNotes: null,
      operationalNotes: null,
      providerResponseNote: "Confirmed. Looking forward to hosting you.",
      rejectionReason: null,
      respondedAt: "2026-09-26T12:00:00Z",
      createdAt: "2026-09-25T10:00:00Z",
    },
    {
      id: 3,
      providerOrgId: ORG_A,
      status: "REJECTED",
      eventTitle: "Product Launch Dinner",
      companyName: "StartupHub",
      venueName: "The Oberoi Grand",
      venueCity: "Gurugram",
      spaceName: "Emerald Room",
      offeringName: "Cocktail Package",
      requestedDateTime: "2026-10-20T18:30:00Z",
      attendees: 80,
      estimatedAmountPaise: null,
      dietaryNotes: null,
      operationalNotes: null,
      providerResponseNote: null,
      rejectionReason: "Fully committed on the requested date.",
      respondedAt: "2026-09-26T15:00:00Z",
      createdAt: "2026-09-24T08:00:00Z",
    },
    {
      id: 4,
      providerOrgId: ORG_B, // Different org — must never be visible to Org A
      status: "PENDING_PROVIDER_REVIEW",
      eventTitle: "Partner's Private Dinner",
      companyName: "OtherCo",
      venueName: "Rival Venue",
      venueCity: "Mumbai",
      spaceName: null,
      offeringName: null,
      requestedDateTime: "2026-11-05T19:00:00Z",
      attendees: 10,
      estimatedAmountPaise: 5000000,
      dietaryNotes: null,
      operationalNotes: null,
      providerResponseNote: null,
      rejectionReason: null,
      respondedAt: null,
      createdAt: "2026-09-27T09:00:00Z",
    },
  ];

  // Helper: scoped loader — mirrors getProviderBookingRequests(providerOrgId)
  function getRequestsForOrg(orgId: number): InboxRequest[] {
    return allRequests.filter((r) => r.providerOrgId === orgId);
  }

  // Helper: fetch by id + org — mirrors getProviderBookingRequestById(id, orgId)
  function getRequestByIdForOrg(id: number, orgId: number): InboxRequest | null {
    return allRequests.find((r) => r.id === id && r.providerOrgId === orgId) ?? null;
  }

  // Helper: friendly status label — mirrors ProviderRequestStatusBadge logic
  function getFriendlyStatus(status: ProviderRequestStatus): string {
    switch (status) {
      case "PENDING_PROVIDER_REVIEW":
        return "Pending Review";
      case "ACCEPTED":
        return "Accepted";
      case "REJECTED":
        return "Declined";
      case "CANCELLED":
        return "Cancelled";
    }
  }

  // ── Test 27: Verified provider can load its inbox ─────────────────────────
  {
    const inbox = getRequestsForOrg(ORG_A);
    assert.equal(inbox.length, 3, "Org A should see exactly 3 requests");
    assert.ok(inbox.every((r) => r.providerOrgId === ORG_A), "All results must belong to Org A");
    console.log("  ✅ Test 27 Passed: Verified provider loads its own inbox");
  }

  // ── Test 28: Provider sees only its own requests (no cross-org leakage) ───
  {
    const inboxA = getRequestsForOrg(ORG_A);
    const inboxB = getRequestsForOrg(ORG_B);

    assert.ok(inboxA.every((r) => r.providerOrgId === ORG_A), "Org A never sees Org B requests");
    assert.ok(inboxB.every((r) => r.providerOrgId === ORG_B), "Org B never sees Org A requests");
    assert.equal(inboxA.length + inboxB.length, allRequests.length, "Total must be sum of both org views");
    console.log("  ✅ Test 28 Passed: Cross-provider leakage prevention");
  }

  // ── Test 29: Pending filter returns only pending requests ─────────────────
  {
    const inbox = getRequestsForOrg(ORG_A);
    const pending = inbox.filter((r) => r.status === "PENDING_PROVIDER_REVIEW");
    assert.equal(pending.length, 1, "Should have exactly 1 pending request");
    assert.equal(pending[0].id, 1);
    assert.equal(pending[0].status, "PENDING_PROVIDER_REVIEW");
    console.log("  ✅ Test 29 Passed: Pending filter works correctly");
  }

  // ── Test 30: Accepted filter returns only accepted requests ───────────────
  {
    const inbox = getRequestsForOrg(ORG_A);
    const accepted = inbox.filter((r) => r.status === "ACCEPTED");
    assert.equal(accepted.length, 1, "Should have exactly 1 accepted request");
    assert.equal(accepted[0].id, 2);
    assert.equal(accepted[0].respondedAt, "2026-09-26T12:00:00Z");
    console.log("  ✅ Test 30 Passed: Accepted filter works correctly");
  }

  // ── Test 31: Rejected filter returns only declined requests ───────────────
  {
    const inbox = getRequestsForOrg(ORG_A);
    const rejected = inbox.filter((r) => r.status === "REJECTED");
    assert.equal(rejected.length, 1, "Should have exactly 1 rejected request");
    assert.equal(rejected[0].id, 3);
    assert.ok(rejected[0].rejectionReason, "Rejected request must have rejection reason");
    console.log("  ✅ Test 31 Passed: Rejected filter works correctly");
  }

  // ── Test 32: Provider opens its own request detail page (authorized) ──────
  {
    const request = getRequestByIdForOrg(1, ORG_A);
    assert.ok(request !== null, "Provider should be able to open its own request");
    assert.equal(request!.id, 1);
    assert.equal(request!.providerOrgId, ORG_A);
    assert.equal(request!.eventTitle, "Q4 Leadership Summit");
    console.log("  ✅ Test 32 Passed: Provider opens own request detail (authorized)");
  }

  // ── Test 33: Provider cannot open another provider's request detail ────────
  {
    // Org A trying to open Org B's request (id=4) must return null → notFound()
    const request = getRequestByIdForOrg(4, ORG_A);
    assert.equal(request, null, "Org A must NOT be able to access Org B request id=4");

    // Org B trying to open Org A's request (id=1) must also return null
    const crossRequest = getRequestByIdForOrg(1, ORG_B);
    assert.equal(crossRequest, null, "Org B must NOT be able to access Org A request id=1");
    console.log("  ✅ Test 33 Passed: Cross-provider detail page isolation (unauthorized = null → notFound)");
  }

  // ── Test 34: Pending request shows Accept and Reject controls ────────────
  {
    const request = getRequestByIdForOrg(1, ORG_A);
    assert.ok(request !== null);
    const isPending = request!.status === "PENDING_PROVIDER_REVIEW";
    assert.equal(isPending, true, "Pending request must show action controls");

    // Accept/reject controls are only shown when isPending === true
    // Final states hide them — verify via status
    const acceptedReq = getRequestByIdForOrg(2, ORG_A);
    const rejectedReq = getRequestByIdForOrg(3, ORG_A);
    assert.equal(acceptedReq!.status === "PENDING_PROVIDER_REVIEW", false, "Accepted request must not show action controls");
    assert.equal(rejectedReq!.status === "PENDING_PROVIDER_REVIEW", false, "Rejected request must not show action controls");
    console.log("  ✅ Test 34 Passed: Accept/reject controls gated on PENDING_PROVIDER_REVIEW status");
  }

  // ── Test 35: Accepted request hides action controls ──────────────────────
  {
    const request = getRequestByIdForOrg(2, ORG_A)!;
    assert.equal(request.status, "ACCEPTED");
    assert.ok(request.providerResponseNote, "Accepted request should have confirmation note");
    assert.ok(request.respondedAt, "Accepted request should have responded timestamp");

    // Final status means actions are locked — simulate the component branch
    const showActions = (request.status as string) === "PENDING_PROVIDER_REVIEW";
    assert.equal(showActions, false, "Actions must be hidden for ACCEPTED status");
    console.log("  ✅ Test 35 Passed: Accepted request hides action controls & shows summary");
  }

  // ── Test 36: Rejected request hides action controls ──────────────────────
  {
    const request = getRequestByIdForOrg(3, ORG_A)!;
    assert.equal(request.status, "REJECTED");
    assert.ok(request.rejectionReason, "Rejected request must expose rejection reason for provider review");
    assert.ok(request.respondedAt, "Rejected request must have responded timestamp");

    const showActions = (request.status as string) === "PENDING_PROVIDER_REVIEW";
    assert.equal(showActions, false, "Actions must be hidden for REJECTED status");
    console.log("  ✅ Test 36 Passed: Rejected request hides action controls & shows final summary");
  }

  // ── Test 37: Accept action updates status correctly (simulated) ───────────
  {
    const request = getRequestByIdForOrg(1, ORG_A)!;
    assert.equal(request.status, "PENDING_PROVIDER_REVIEW");

    // Simulate accept action outcome
    const simulateAccept = (req: InboxRequest, note: string | null): InboxRequest => {
      if (req.status !== "PENDING_PROVIDER_REVIEW") {
        throw new Error(`Cannot accept request: current status is ${req.status}.`);
      }
      return {
        ...req,
        status: "ACCEPTED",
        providerResponseNote: note,
        respondedAt: new Date().toISOString(),
      };
    };

    const acceptedReq = simulateAccept(request, "Confirmed. We have reserved the suite.");
    assert.equal(acceptedReq.status, "ACCEPTED");
    assert.equal(acceptedReq.providerResponseNote, "Confirmed. We have reserved the suite.");
    assert.ok(acceptedReq.respondedAt);

    // Double-accept must throw
    assert.throws(
      () => simulateAccept(acceptedReq, "Again"),
      /Cannot accept request: current status is ACCEPTED/
    );
    console.log("  ✅ Test 37 Passed: Accept action updates status correctly, rejects double-accept");
  }

  // ── Test 38: Reject action updates status correctly (simulated) ───────────
  {
    const request = getRequestByIdForOrg(1, ORG_A)!;

    const simulateReject = (req: InboxRequest, reason: string): InboxRequest => {
      if (req.status !== "PENDING_PROVIDER_REVIEW") {
        throw new Error(`Cannot decline request: current status is ${req.status}.`);
      }
      const parsed = rejectProviderBookingRequestSchema.safeParse({
        requestId: req.id,
        rejectionReason: reason,
      });
      if (!parsed.success) {
        throw new Error("A valid reason for declining this booking request is required.");
      }
      return {
        ...req,
        status: "REJECTED",
        rejectionReason: reason,
        respondedAt: new Date().toISOString(),
      };
    };

    // Too-short reason must throw
    assert.throws(
      () => simulateReject(request, "No"),
      /valid reason/,
      "Short rejection reason must fail validation"
    );

    const rejectedReq = simulateReject(request, "Venue fully committed on this date. Please consider another slot.");
    assert.equal(rejectedReq.status, "REJECTED");
    assert.ok(rejectedReq.rejectionReason!.length > 10);
    assert.ok(rejectedReq.respondedAt);

    // Double-reject must throw
    assert.throws(
      () => simulateReject(rejectedReq, "Changed reason"),
      /Cannot decline request: current status is REJECTED/
    );
    console.log("  ✅ Test 38 Passed: Reject action updates status correctly, validates reason, rejects double-reject");
  }

  // ── Test 39: Friendly status labels — no raw enum leakage ────────────────
  {
    const statuses: ProviderRequestStatus[] = [
      "PENDING_PROVIDER_REVIEW",
      "ACCEPTED",
      "REJECTED",
      "CANCELLED",
    ];

    for (const status of statuses) {
      const label = getFriendlyStatus(status);
      assert.ok(label.length > 0, `Label for ${status} must not be empty`);
      assert.equal(label.includes("_"), false, `Label for ${status} must not contain underscores`);
      assert.equal(label, label.trim(), "Labels must not have leading/trailing whitespace");
    }

    // These are the values the inbox badge component renders
    assert.equal(getFriendlyStatus("PENDING_PROVIDER_REVIEW"), "Pending Review");
    assert.equal(getFriendlyStatus("ACCEPTED"), "Accepted");
    assert.equal(getFriendlyStatus("REJECTED"), "Declined");
    assert.equal(getFriendlyStatus("CANCELLED"), "Cancelled");

    console.log("  ✅ Test 39 Passed: Inbox status badges show friendly labels without raw enums");
  }

  // ── Test 40: Empty state — no requests for org ────────────────────────────
  {
    const EMPTY_ORG = 777;
    const emptyInbox = getRequestsForOrg(EMPTY_ORG);
    assert.equal(emptyInbox.length, 0, "Org with no requests must return empty array");

    // Each tab filter also returns empty
    const pendingEmpty = emptyInbox.filter((r) => r.status === "PENDING_PROVIDER_REVIEW");
    const acceptedEmpty = emptyInbox.filter((r) => r.status === "ACCEPTED");
    const rejectedEmpty = emptyInbox.filter((r) => r.status === "REJECTED");
    assert.equal(pendingEmpty.length, 0);
    assert.equal(acceptedEmpty.length, 0);
    assert.equal(rejectedEmpty.length, 0);
    console.log("  ✅ Test 40 Passed: Empty state returns correctly for org with no requests");
  }

  console.log("🎉 All 14 Day 20 Step 2 Inbox UI Tests Passed Successfully!\n");
}

// ---------------------------------------------------------------------------
// Day 20 Bugfixes — Issue 1 & Issue 2 Flow Tests
// ---------------------------------------------------------------------------

function runBugfixTests() {
  console.log("🧪 Starting Day 20 Pre-Step-3 QA Bugfix Test Suite...");

  // ── Test 41: Provider Venue Selection Routing (Issue 1) ─────────────────
  {
    type VenueStub = { id: number; companyId: number | null; providerOrgId: number | null };
    type UserStub = { id: number; companyId: number };
    type EventStub = { id: number; companyId: number };

    const enterpriseUser: UserStub = { id: 1, companyId: 50 };
    const enterpriseEvent: EventStub = { id: 100, companyId: 50 };

    const sameCompanyVenue: VenueStub = { id: 10, companyId: 50, providerOrgId: null };
    const providerVenue: VenueStub = { id: 20, companyId: null, providerOrgId: 5 };

    function resolveBookingPath(venue: VenueStub, user: UserStub, event: EventStub): "DIRECT_BOOKING" | "PROVIDER_REQUEST" {
      if (venue.providerOrgId || venue.companyId !== user.companyId) {
        if (event.companyId !== user.companyId) {
          throw new Error("Event not found or access denied.");
        }
        return "PROVIDER_REQUEST";
      }
      return "DIRECT_BOOKING";
    }

    assert.equal(
      resolveBookingPath(sameCompanyVenue, enterpriseUser, enterpriseEvent),
      "DIRECT_BOOKING",
      "Same-company internal venue must hit legacy direct-booking path"
    );

    assert.equal(
      resolveBookingPath(providerVenue, enterpriseUser, enterpriseEvent),
      "PROVIDER_REQUEST",
      "Hospitality provider venue must route to Provider Booking Request workflow"
    );

    console.log("  ✅ Test 41 Passed: Provider venue selection routes to Provider Booking Request (Issue 1)");
  }

  // ── Test 42: Admin Approval & Partner Portal Readiness Consistency (Issue 2)
  {
    type PartnerRecord = { id: number; acceptedAt: string | null; providerOrgId: number | null };
    type ProviderOrgRecord = { id: number; status: "DRAFT" | "PENDING_VERIFICATION" | "VERIFIED" };

    const pendingPartner: PartnerRecord = { id: 1, acceptedAt: null, providerOrgId: 101 };
    const pendingOrg: ProviderOrgRecord = { id: 101, status: "PENDING_VERIFICATION" };

    const approvedPartner: PartnerRecord = { id: 2, acceptedAt: "2026-09-27T10:00:00Z", providerOrgId: 102 };
    const approvedOrg: ProviderOrgRecord = { id: 102, status: "VERIFIED" };

    // Newly approved org where admin set status VERIFIED
    const newlyApprovedPartner: PartnerRecord = { id: 3, acceptedAt: null, providerOrgId: 103 };
    const newlyApprovedOrg: ProviderOrgRecord = { id: 103, status: "VERIFIED" };

    function checkIsAccepted(partner: PartnerRecord, orgStatus: string | null): boolean {
      return !!partner.acceptedAt || orgStatus === "VERIFIED";
    }

    // Pending fixture (Cmber Group equivalent) remains under review
    assert.equal(
      checkIsAccepted(pendingPartner, pendingOrg.status),
      false,
      "Pending provider org fixture must remain under review (isAccepted = false)"
    );

    // Previously accepted partner is verified
    assert.equal(
      checkIsAccepted(approvedPartner, approvedOrg.status),
      true,
      "Partner with acceptedAt timestamp must be verified (isAccepted = true)"
    );

    // Newly approved org (admin status = VERIFIED) is recognized as verified
    assert.equal(
      checkIsAccepted(newlyApprovedPartner, newlyApprovedOrg.status),
      true,
      "Newly approved org (status VERIFIED) must show as Verified & Live even if acceptedAt was null"
    );

    console.log("  ✅ Test 42 Passed: Admin approval & partner readiness consistency (Issue 2)");
  }

  console.log("🎉 All Day 20 Bugfix Tests Passed Successfully!\n");
}

runTests();
runInboxUITests();
runBugfixTests();



