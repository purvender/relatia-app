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

  console.log("🎉 All 13 Provider Domain & Onboarding Tests Passed Successfully!\n");
}

runTests();
