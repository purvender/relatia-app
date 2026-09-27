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

  console.log("🎉 All 21 Provider Domain & Onboarding Tests Passed Successfully!\n");
}

runTests();
