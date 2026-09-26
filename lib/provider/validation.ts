import { z } from "zod";

export const providerTypeEnum = z.enum([
  "RESTAURANT",
  "HOTEL",
  "CLUB",
  "CATERING_COMPANY",
  "EXPERIENCE_PROVIDER",
  "ACTIVITY_PROVIDER",
  "LIVE_ENTERTAINMENT",
  "GIFTING_PROVIDER",
  "MERCHANDISE_PROVIDER",
]);

export const providerStatusEnum = z.enum([
  "DRAFT",
  "PENDING_VERIFICATION",
  "VERIFIED",
  "PAUSED",
  "ARCHIVED",
]);

export const onboardingStatusEnum = z.enum([
  "NOT_STARTED",
  "IN_PROGRESS",
  "REVIEW_REQUIRED",
  "READY_FOR_DISCOVERY",
  "BLOCKED",
  "COMPLETE",
]);

export const venueVisibilityEnum = z.enum([
  "DRAFT",
  "INTERNAL_ONLY",
  "DISCOVERABLE",
  "PAUSED",
  "ARCHIVED",
]);

export const bookableSpaceTypeEnum = z.enum([
  "PRIVATE_DINING",
  "SEMI_PRIVATE_DINING",
  "LOUNGE",
  "TERRACE",
  "ROOFTOP",
  "BALLROOM",
  "BOARDROOM",
  "MAIN_DINING_SECTION",
  "CLUB_EVENT_SPACE",
]);

export const bookableSpaceStatusEnum = z.enum([
  "DRAFT",
  "ACTIVE",
  "PAUSED",
  "ARCHIVED",
]);

export const verificationStatusEnum = z.enum([
  "UNVERIFIED",
  "PENDING_REVIEW",
  "VERIFIED",
  "REJECTED",
]);

export const offeringTypeEnum = z.enum([
  "SET_MENU",
  "PER_PERSON_PACKAGE",
  "FIXED_EVENT_PACKAGE",
  "CUSTOM_EXPERIENCE",
  "A_LA_CARTE_MIN_SPEND",
  "BEVERAGE_PACKAGE",
]);

export const pricingBasisEnum = z.enum([
  "PER_PERSON",
  "FIXED_TOTAL",
  "MINIMUM_SPEND_ONLY",
  "CUSTOM_QUOTE",
]);

export const documentTypeEnum = z.enum([
  "FSSAI_LICENSE",
  "GSTIN_CERTIFICATE",
  "LIQUOR_LICENSE",
  "BANK_MANDATE",
  "PAN_CARD",
  "RATE_CARD",
  "VENUE_FLOOR_PLAN",
  "OTHER",
]);

export const documentReviewStatusEnum = z.enum([
  "PENDING_REVIEW",
  "VERIFIED",
  "REJECTED",
  "EXPIRED",
]);

export const contactRoleCategoryEnum = z.enum([
  "OPERATIONS",
  "SALES",
  "FINANCE",
  "MANAGEMENT",
  "GENERAL",
]);

export const createProviderSchema = z.object({
  name: z.string().min(2, "Provider name must be at least 2 characters").max(100),
  legalName: z.string().max(150).optional().nullable(),
  providerType: providerTypeEnum.default("RESTAURANT"),
  city: z.string().min(2, "City is required").max(60),
  internalNotes: z.string().max(1000).optional().nullable(),
});

export const updateProviderSchema = createProviderSchema.partial().extend({
  id: z.number().int().positive(),
  status: providerStatusEnum.optional(),
  onboardingStatus: onboardingStatusEnum.optional(),
});

export const createProviderContactSchema = z.object({
  providerOrgId: z.number().int().positive(),
  name: z.string().min(2, "Contact name is required").max(80),
  role: z.string().min(2, "Role / Title is required").max(80),
  email: z.string().email("Valid email is required"),
  phone: z.string().max(20).optional().nullable(),
  preferredContactMethod: z.enum(["EMAIL", "PHONE", "WHATSAPP"]).default("EMAIL"),
  category: contactRoleCategoryEnum.default("GENERAL"),
  internalNotes: z.string().max(500).optional().nullable(),
});

export const updateProviderContactSchema = z.object({
  id: z.number().int().positive(),
  providerOrgId: z.number().int().positive().optional(),
  name: z.string().min(2, "Contact name is required").max(80).optional(),
  role: z.string().min(2, "Role / Title is required").max(80).optional(),
  email: z.string().email("Valid email is required").optional(),
  phone: z.string().max(20).optional().nullable(),
  preferredContactMethod: z.enum(["EMAIL", "PHONE", "WHATSAPP"]).optional(),
  category: contactRoleCategoryEnum.optional(),
  isActive: z.boolean().optional(),
  internalNotes: z.string().max(500).optional().nullable(),
});

export const createProviderDocumentSchema = z.object({
  providerOrgId: z.number().int().positive(),
  docType: documentTypeEnum,
  title: z.string().min(2, "Document title is required").max(100),
  fileReference: z.string().min(2, "Storage reference or secure key is required").max(255),
  isInternalOnly: z.boolean().default(true),
  internalNotes: z.string().max(500).optional().nullable(),
});

export const createProviderVenueSchema = z.object({
  providerOrgId: z.number().int().positive(),
  companyId: z.number().int().positive().optional().nullable(),
  name: z.string().min(2, "Venue name must be at least 2 characters").max(100),
  city: z.string().min(2, "City is required").max(60),
  locality: z.string().max(100).optional().nullable(),
  address: z.string().max(255).optional().nullable(),
  capacity: z.number().int().positive("Capacity must be at least 1 guest"),
  cuisine: z.string().min(2, "Cuisine is required").max(80),
  priceBand: z.enum(["MODERATE", "PREMIUM", "LUXURY"]).default("PREMIUM"),
  tags: z.array(z.string()).default([]),
  rating: z.number().min(1.0).max(5.0).default(4.8),
  venueType: z.string().default("RESTAURANT"),
  publicDescription: z.string().max(2000).optional().nullable(),
  internalNotes: z.string().max(1000).optional().nullable(),
});

export const updateProviderVenueSchema = z.object({
  id: z.number().int().positive(),
  providerOrgId: z.number().int().positive().optional(),
  companyId: z.number().int().positive().optional().nullable(),
  name: z.string().min(2, "Venue name must be at least 2 characters").max(100).optional(),
  city: z.string().min(2, "City is required").max(60).optional(),
  locality: z.string().max(100).optional().nullable(),
  address: z.string().max(255).optional().nullable(),
  capacity: z.number().int().positive("Capacity must be at least 1 guest").optional(),
  cuisine: z.string().min(2, "Cuisine is required").max(80).optional(),
  priceBand: z.enum(["MODERATE", "PREMIUM", "LUXURY"]).optional(),
  tags: z.array(z.string()).optional(),
  rating: z.number().min(1.0).max(5.0).optional(),
  venueType: z.string().optional(),
  active: z.boolean().optional(),
  visibility: venueVisibilityEnum.optional(),
  verificationStatus: verificationStatusEnum.optional(),
  publicDescription: z.string().max(2000).optional().nullable(),
  internalNotes: z.string().max(1000).optional().nullable(),
});

export const createBookableSpaceSchema = z
  .object({
    venueId: z.number().int().positive(),
    name: z.string().min(2, "Space name is required").max(100),
    spaceType: bookableSpaceTypeEnum.default("PRIVATE_DINING"),
    minCapacity: z.number().int().positive("Min capacity must be at least 1"),
    maxCapacity: z.number().int().positive("Max capacity must be positive"),
    privacyLevel: z.enum(["EXCLUSIVE", "SEMI_PRIVATE", "OPEN"]).default("EXCLUSIVE"),
    seatedCapacity: z.number().int().positive().optional().nullable(),
    standingCapacity: z.number().int().positive().optional().nullable(),
    publicDescription: z.string().max(1000).optional().nullable(),
    status: bookableSpaceStatusEnum.default("ACTIVE"),
    isActive: z.boolean().default(true),
    internalNotes: z.string().max(500).optional().nullable(),
  })
  .refine((data) => data.minCapacity <= data.maxCapacity, {
    message: "Minimum capacity must be less than or equal to maximum capacity",
    path: ["minCapacity"],
  });

export const updateBookableSpaceSchema = z
  .object({
    id: z.number().int().positive(),
    name: z.string().min(2, "Space name is required").max(100).optional(),
    spaceType: bookableSpaceTypeEnum.optional(),
    minCapacity: z.number().int().positive("Min capacity must be at least 1").optional(),
    maxCapacity: z.number().int().positive("Max capacity must be positive").optional(),
    privacyLevel: z.enum(["EXCLUSIVE", "SEMI_PRIVATE", "OPEN"]).optional().nullable(),
    seatedCapacity: z.number().int().positive().optional().nullable(),
    standingCapacity: z.number().int().positive().optional().nullable(),
    publicDescription: z.string().max(1000).optional().nullable(),
    status: bookableSpaceStatusEnum.optional(),
    isActive: z.boolean().optional(),
    internalNotes: z.string().max(500).optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.minCapacity !== undefined && data.maxCapacity !== undefined) {
        return data.minCapacity <= data.maxCapacity;
      }
      return true;
    },
    {
      message: "Minimum capacity must be less than or equal to maximum capacity",
      path: ["minCapacity"],
    },
  );

export const createOfferingSchema = z
  .object({
    providerOrgId: z.number().int().positive().optional().nullable(),
    venueId: z.number().int().positive().optional().nullable(),
    bookableSpaceId: z.number().int().positive().optional().nullable(),
    name: z.string().min(2, "Package / Offering name is required").max(100),
    offeringType: offeringTypeEnum.default("SET_MENU"),
    pricingBasis: pricingBasisEnum.default("PER_PERSON"),
    baseAmountPaise: z.number().int().nonnegative("Base amount cannot be negative"),
    currency: z.literal("INR").default("INR"),
    minimumSpendPaise: z.number().int().nonnegative("Minimum spend cannot be negative").default(0),
    minGuests: z.number().int().positive().optional().nullable(),
    maxGuests: z.number().int().positive().optional().nullable(),
    description: z.string().max(1000).optional().nullable(),
    dietaryNotes: z.string().max(500).optional().nullable(),
    pricingNotes: z.string().max(500).optional().nullable(),
    isCustomQuote: z.boolean().default(false),
    taxIncluded: z.boolean().default(false),
    isActive: z.boolean().default(true),
    isDiscoverable: z.boolean().default(true),
    internalNotes: z.string().max(500).optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.minGuests && data.maxGuests) {
        return data.minGuests <= data.maxGuests;
      }
      return true;
    },
    {
      message: "Minimum guests cannot exceed maximum guests",
      path: ["minGuests"],
    },
  );

export const updateOfferingSchema = z
  .object({
    id: z.number().int().positive(),
    bookableSpaceId: z.number().int().positive().optional().nullable(),
    name: z.string().min(2, "Package / Offering name is required").max(100).optional(),
    offeringType: offeringTypeEnum.optional(),
    pricingBasis: pricingBasisEnum.optional(),
    baseAmountPaise: z.number().int().nonnegative("Base amount cannot be negative").optional(),
    currency: z.literal("INR").optional(),
    minimumSpendPaise: z.number().int().nonnegative("Minimum spend cannot be negative").optional(),
    minGuests: z.number().int().positive().optional().nullable(),
    maxGuests: z.number().int().positive().optional().nullable(),
    description: z.string().max(1000).optional().nullable(),
    dietaryNotes: z.string().max(500).optional().nullable(),
    pricingNotes: z.string().max(500).optional().nullable(),
    isCustomQuote: z.boolean().optional(),
    taxIncluded: z.boolean().optional(),
    isActive: z.boolean().optional(),
    isDiscoverable: z.boolean().optional(),
    internalNotes: z.string().max(500).optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.minGuests && data.maxGuests) {
        return data.minGuests <= data.maxGuests;
      }
      return true;
    },
    {
      message: "Minimum guests cannot exceed maximum guests",
      path: ["minGuests"],
    },
  );

export const updateAvailabilityMetadataSchema = z.object({
  venueId: z.number().int().positive(),
  requiresManualConfirmation: z.boolean().default(true),
  operatingDaysNotes: z.string().max(500).optional().nullable(),
  leadTimeHours: z.number().int().min(1).max(168).default(24),
  availabilityNotes: z.string().max(1000).optional().nullable(),
  internalNotes: z.string().max(500).optional().nullable(),
});

export const updateCancellationPolicySchema = z.object({
  venueId: z.number().int().positive(),
  summary: z.string().min(5, "Cancellation policy summary is required").max(500),
  cutoffHours: z.number().int().min(0).max(336).default(48),
  cutoffNotes: z.string().max(500).optional().nullable(),
  depositRequired: z.boolean().default(false),
  depositPercent: z.number().int().min(0).max(100).default(0),
  internalNotes: z.string().max(500).optional().nullable(),
});

export const recordVerificationSchema = z.object({
  providerOrgId: z.number().int().positive().optional().nullable(),
  venueId: z.number().int().positive().optional().nullable(),
  status: verificationStatusEnum,
  verifiedBy: z.string().min(2, "Verifier identifier is required"),
  verificationSource: z.string().max(100).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
});
