export type ProviderType =
  | "RESTAURANT"
  | "HOTEL"
  | "CLUB"
  | "CATERING_COMPANY"
  | "EXPERIENCE_PROVIDER"
  | "ACTIVITY_PROVIDER"
  | "LIVE_ENTERTAINMENT"
  | "GIFTING_PROVIDER"
  | "MERCHANDISE_PROVIDER";

export type ProviderStatus =
  | "DRAFT"
  | "PENDING_VERIFICATION"
  | "VERIFIED"
  | "PAUSED"
  | "ARCHIVED";

export type OnboardingStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "REVIEW_REQUIRED"
  | "READY_FOR_DISCOVERY"
  | "BLOCKED"
  | "COMPLETE";

export type VenueVisibility =
  | "DRAFT"
  | "INTERNAL_ONLY"
  | "DISCOVERABLE"
  | "PAUSED"
  | "ARCHIVED";

export type BookableSpaceType =
  | "PRIVATE_DINING"
  | "SEMI_PRIVATE_DINING"
  | "LOUNGE"
  | "TERRACE"
  | "ROOFTOP"
  | "BALLROOM"
  | "BOARDROOM"
  | "MAIN_DINING_SECTION"
  | "CLUB_EVENT_SPACE";

export type BookableSpaceStatus =
  | "DRAFT"
  | "ACTIVE"
  | "PAUSED"
  | "ARCHIVED";

export type VerificationStatus =
  | "UNVERIFIED"
  | "PENDING_REVIEW"
  | "VERIFIED"
  | "REJECTED";

export type OfferingType =
  | "SET_MENU"
  | "PER_PERSON_PACKAGE"
  | "FIXED_EVENT_PACKAGE"
  | "CUSTOM_EXPERIENCE"
  | "A_LA_CARTE_MIN_SPEND"
  | "BEVERAGE_PACKAGE";

export type PricingBasis =
  | "PER_PERSON"
  | "FIXED_TOTAL"
  | "MINIMUM_SPEND_ONLY"
  | "CUSTOM_QUOTE";

export type DocumentType =
  | "FSSAI_LICENSE"
  | "GSTIN_CERTIFICATE"
  | "LIQUOR_LICENSE"
  | "BANK_MANDATE"
  | "PAN_CARD"
  | "RATE_CARD"
  | "VENUE_FLOOR_PLAN"
  | "OTHER";

export type DocumentReviewStatus =
  | "PENDING_REVIEW"
  | "VERIFIED"
  | "REJECTED"
  | "EXPIRED";

export type ContactRoleCategory =
  | "OPERATIONS"
  | "SALES"
  | "FINANCE"
  | "MANAGEMENT"
  | "GENERAL";

// Internal-rich domain representations
export type ProviderOrganizationRecord = {
  id: number;
  name: string;
  legalName: string | null;
  providerType: ProviderType;
  city: string;
  status: ProviderStatus;
  onboardingStatus: OnboardingStatus;
  internalNotes: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export type ProviderContactRecord = {
  id: number;
  providerOrgId: number;
  name: string;
  role: string;
  email: string;
  phone: string | null;
  preferredContactMethod: string;
  category: ContactRoleCategory;
  isActive: boolean;
  internalNotes: string | null;
  createdAt: string;
};

export type ProviderDocumentRecord = {
  id: number;
  providerOrgId: number;
  docType: DocumentType;
  title: string;
  fileReference: string;
  reviewStatus: DocumentReviewStatus;
  isInternalOnly: boolean;
  internalNotes: string | null;
  createdAt: string;
};

export type VerificationRecordItem = {
  id: number;
  providerOrgId: number | null;
  venueId: number | null;
  status: VerificationStatus;
  verifiedAt: string | null;
  verifiedBy: string | null;
  verificationSource: string | null;
  notes: string | null;
  createdAt: string;
};

export type BookableSpaceRecord = {
  id: number;
  venueId: number;
  name: string;
  spaceType: BookableSpaceType;
  minCapacity: number;
  maxCapacity: number;
  privacyLevel: string | null;
  seatedCapacity: number | null;
  standingCapacity: number | null;
  publicDescription: string | null;
  status: BookableSpaceStatus;
  isActive: boolean;
  internalNotes: string | null;
  createdAt: string;
};

export type OfferingRecord = {
  id: number;
  providerOrgId: number | null;
  venueId: number | null;
  bookableSpaceId: number | null;
  name: string;
  offeringType: OfferingType;
  pricingBasis: PricingBasis;
  baseAmount: number; // in paise
  currency: string;
  minimumSpend: number; // in paise
  minGuests: number | null;
  maxGuests: number | null;
  description: string | null;
  dietaryNotes: string | null;
  pricingNotes: string | null;
  isCustomQuote: boolean;
  taxIncluded: boolean;
  isActive: boolean;
  isDiscoverable: boolean;
  internalNotes: string | null;
  createdAt: string;
};

export type AvailabilityMetadataRecord = {
  id: number;
  venueId: number;
  requiresManualConfirmation: boolean;
  lastVerifiedAt: string | null;
  operatingDaysNotes: string | null;
  leadTimeHours: number;
  availabilityNotes: string | null;
  internalNotes: string | null;
  createdAt: string;
};

export type CancellationPolicyRecord = {
  id: number;
  venueId: number;
  summary: string;
  cutoffHours: number;
  cutoffNotes: string | null;
  depositRequired: boolean;
  depositPercent: number;
  internalNotes: string | null;
  createdAt: string;
};

export type BlackoutDateRangeRecord = {
  id: number;
  bookableSpaceId: number;
  startDate: string;
  endDate: string;
  reason: string | null;
  internalNotes: string | null;
  createdAt: string;
};

export type ProviderVenueRecord = {
  id: number;
  companyId: number | null;
  providerOrgId: number | null;
  name: string;
  city: string;
  address: string | null;
  capacity: number;
  cuisine: string;
  priceBand: string;
  tags: string[];
  rating: number;
  active: boolean;
  venueType: string | null;
  locality: string | null;
  publicDescription: string | null;
  visibility: VenueVisibility;
  isDiscoverable: boolean;
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string | null;
  internalNotes: string | null;
};

// Public-safe DTOs for enterprise-facing discovery
export type PublicSafeOffering = {
  id: number;
  name: string;
  offeringType: OfferingType;
  pricingBasis: PricingBasis;
  baseAmount: number; // paise
  currency: string;
  minimumSpend: number; // paise
  minGuests: number | null;
  maxGuests: number | null;
  description: string | null;
  dietaryNotes: string | null;
  pricingNotes: string | null;
  isCustomQuote: boolean;
  taxIncluded: boolean;
};

export type PublicSafeBookableSpace = {
  id: number;
  name: string;
  spaceType: BookableSpaceType;
  minCapacity: number;
  maxCapacity: number;
  privacyLevel: string | null;
  seatedCapacity: number | null;
  standingCapacity: number | null;
  publicDescription: string | null;
  offerings: PublicSafeOffering[];
};

export type PublicSafeAvailabilitySummary = {
  requiresManualConfirmation: boolean;
  operatingDaysNotes: string | null;
  leadTimeHours: number;
  availabilityNotes: string | null;
};

export type PublicSafeCancellationSummary = {
  summary: string;
  cutoffHours: number;
  cutoffNotes: string | null;
  depositRequired: boolean;
};

export type PublicSafeVenueDetail = {
  id: number;
  name: string;
  city: string;
  locality: string | null;
  address: string | null;
  cuisine: string;
  priceBand: string;
  tags: string[];
  rating: number;
  venueType: string | null;
  publicDescription: string | null;
  bookableSpaces: PublicSafeBookableSpace[];
  offerings: PublicSafeOffering[];
  availability: PublicSafeAvailabilitySummary | null;
  cancellation: PublicSafeCancellationSummary | null;
};

// Provider Booking Request lifecycle & domain representations
export type ProviderRequestStatus =
  | "PENDING_PROVIDER_REVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELLED";

export type ProviderBookingRequestRecord = {
  id: number;
  eventId: number;
  companyId: number;
  createdById: number;
  providerOrgId: number;
  venueId: number;
  bookableSpaceId: number | null;
  offeringId: number | null;
  requestedDateTime: string;
  attendees: number;
  estimatedAmountPaise: number | null;
  dietaryNotes: string | null;
  operationalNotes: string | null;
  status: ProviderRequestStatus;
  providerResponseNote: string | null;
  rejectionReason: string | null;
  respondedByPartnerUserId: number | null;
  respondedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
};

export type ProviderBookingRequestDetail = ProviderBookingRequestRecord & {
  eventTitle: string;
  companyName: string;
  requesterName: string;
  requesterEmail: string;
  venueName: string;
  venueCity: string;
  spaceName: string | null;
  offeringName: string | null;
  providerOrgName: string;
};

export const PROVIDER_REQUEST_STATUS_LABELS: Record<ProviderRequestStatus, string> = {
  PENDING_PROVIDER_REVIEW: "Waiting for provider response",
  ACCEPTED: "Provider accepted the request",
  REJECTED: "Provider declined the request",
  CANCELLED: "Request cancelled",
};

export function getProviderRequestStatusLabel(status: ProviderRequestStatus): string {
  return PROVIDER_REQUEST_STATUS_LABELS[status] ?? "Unknown status";
}

