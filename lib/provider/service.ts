import "server-only";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import { calculateGst, isIntraState } from "@/lib/finance/gst";
import type {
  ProviderOrganizationRecord,
  ProviderContactRecord,
  ProviderDocumentRecord,
  ProviderVenueRecord,
  BookableSpaceRecord,
  OfferingRecord,
  AvailabilityMetadataRecord,
  CancellationPolicyRecord,
  VerificationRecordItem,
  PublicSafeVenueDetail,
  PublicSafeBookableSpace,
  PublicSafeOffering,
  PublicSafeAvailabilitySummary,
  PublicSafeCancellationSummary,
  ProviderRequestStatus,
  ProviderBookingRequestRecord,
  ProviderBookingRequestDetail,
} from "./types";
import {
  evaluateDiscoveryReadiness,
  filterDiscoverableBookableSpaces,
  filterDiscoverableOfferings,
  type DiscoveryReadinessEvaluation,
} from "./readiness";

export type ProviderDetailHierarchy = {
  provider: ProviderOrganizationRecord;
  contacts: ProviderContactRecord[];
  documents: ProviderDocumentRecord[];
  venues: Array<{
    venue: ProviderVenueRecord;
    readiness: DiscoveryReadinessEvaluation;
    bookableSpaces: BookableSpaceRecord[];
    offerings: OfferingRecord[];
    availability: AvailabilityMetadataRecord | null;
    cancellation: CancellationPolicyRecord | null;
  }>;
  verificationRecords: VerificationRecordItem[];
};

export async function getProviderOrganizations(): Promise<
  Array<
    ProviderOrganizationRecord & {
      venueCount: number;
      contactCount: number;
      spaceCount: number;
    }
  >
> {
  const orgs = await db.orm.public.ProviderOrganization.all();
  const venues = await db.orm.public.Venue.all();
  const contacts = await db.orm.public.ProviderContact.all();
  const spaces = await db.orm.public.BookableSpace.all();

  return orgs.map((org) => {
    const orgVenues = venues.filter((v) => v.providerOrgId === org.id);
    const orgVenueIds = new Set(orgVenues.map((v) => v.id));
    const orgContacts = contacts.filter((c) => c.providerOrgId === org.id);
    const orgSpaces = spaces.filter((s) => orgVenueIds.has(s.venueId));

    return {
      id: org.id,
      name: org.name,
      legalName: org.legalName ?? null,
      providerType: org.providerType as ProviderOrganizationRecord["providerType"],
      city: org.city,
      status: org.status as ProviderOrganizationRecord["status"],
      onboardingStatus: org.onboardingStatus as ProviderOrganizationRecord["onboardingStatus"],
      internalNotes: org.internalNotes ?? null,
      createdAt: org.createdAt,
      updatedAt: org.updatedAt ?? null,
      venueCount: orgVenues.length,
      contactCount: orgContacts.length,
      spaceCount: orgSpaces.length,
    };
  });
}

export async function getProviderOrganizationById(
  id: number,
): Promise<ProviderDetailHierarchy | null> {
  const org = await db.orm.public.ProviderOrganization.where({ id }).first();
  if (!org) return null;

  const providerRecord: ProviderOrganizationRecord = {
    id: org.id,
    name: org.name,
    legalName: org.legalName ?? null,
    providerType: org.providerType as ProviderOrganizationRecord["providerType"],
    city: org.city,
    status: org.status as ProviderOrganizationRecord["status"],
    onboardingStatus: org.onboardingStatus as ProviderOrganizationRecord["onboardingStatus"],
    internalNotes: org.internalNotes ?? null,
    createdAt: org.createdAt,
    updatedAt: org.updatedAt ?? null,
  };

  const rawContacts = await db.orm.public.ProviderContact.where({ providerOrgId: id }).all();
  const contacts: ProviderContactRecord[] = rawContacts.map((c) => ({
    id: c.id,
    providerOrgId: c.providerOrgId,
    name: c.name,
    role: c.role,
    email: c.email,
    phone: c.phone ?? null,
    preferredContactMethod: c.preferredContactMethod,
    category: c.category as ProviderContactRecord["category"],
    isActive: c.isActive,
    internalNotes: c.internalNotes ?? null,
    createdAt: c.createdAt,
  }));

  const rawDocs = await db.orm.public.ProviderDocument.where({ providerOrgId: id }).all();
  const documents: ProviderDocumentRecord[] = rawDocs.map((d) => ({
    id: d.id,
    providerOrgId: d.providerOrgId,
    docType: d.docType as ProviderDocumentRecord["docType"],
    title: d.title,
    fileReference: d.fileReference,
    reviewStatus: d.reviewStatus as ProviderDocumentRecord["reviewStatus"],
    isInternalOnly: d.isInternalOnly,
    internalNotes: d.internalNotes ?? null,
    createdAt: d.createdAt,
  }));

  const rawVerifications = await db.orm.public.VerificationRecord.where({ providerOrgId: id }).all();
  const verificationRecords: VerificationRecordItem[] = rawVerifications.map((v) => ({
    id: v.id,
    providerOrgId: v.providerOrgId ?? null,
    venueId: v.venueId ?? null,
    status: v.status as VerificationRecordItem["status"],
    verifiedAt: v.verifiedAt ?? null,
    verifiedBy: v.verifiedBy ?? null,
    verificationSource: v.verificationSource ?? null,
    notes: v.notes ?? null,
    createdAt: v.createdAt,
  }));

  const rawVenues = await db.orm.public.Venue.where({ providerOrgId: id }).all();

  const venuesWithDetails = await Promise.all(
    rawVenues.map(async (v) => {
      const venueRecord: ProviderVenueRecord = {
        id: v.id,
        companyId: v.companyId ?? null,
        providerOrgId: v.providerOrgId ?? null,
        name: v.name,
        city: v.city,
        address: v.address ?? null,
        capacity: v.capacity,
        cuisine: v.cuisine,
        priceBand: v.priceBand,
        tags: [...v.tags],
        rating: v.rating,
        active: v.active,
        venueType: v.venueType ?? "RESTAURANT",
        locality: v.locality ?? null,
        publicDescription: v.publicDescription ?? null,
        visibility: v.visibility as ProviderVenueRecord["visibility"],
        isDiscoverable: v.isDiscoverable,
        verificationStatus: v.verificationStatus as ProviderVenueRecord["verificationStatus"],
        lastVerifiedAt: v.lastVerifiedAt ?? null,
        internalNotes: v.internalNotes ?? null,
      };

      const rawSpaces = await db.orm.public.BookableSpace.where({ venueId: v.id }).all();
      const bookableSpaces: BookableSpaceRecord[] = rawSpaces.map((s) => ({
        id: s.id,
        venueId: s.venueId,
        name: s.name,
        spaceType: s.spaceType as BookableSpaceRecord["spaceType"],
        minCapacity: s.minCapacity,
        maxCapacity: s.maxCapacity,
        privacyLevel: s.privacyLevel ?? null,
        seatedCapacity: s.seatedCapacity ?? null,
        standingCapacity: s.standingCapacity ?? null,
        publicDescription: s.publicDescription ?? null,
        status: s.status as BookableSpaceRecord["status"],
        isActive: s.isActive,
        internalNotes: s.internalNotes ?? null,
        createdAt: s.createdAt,
      }));

      const rawOfferings = await db.orm.public.Offering.where({ venueId: v.id }).all();
      const offerings: OfferingRecord[] = rawOfferings.map((o) => ({
        id: o.id,
        providerOrgId: o.providerOrgId ?? null,
        venueId: o.venueId ?? null,
        bookableSpaceId: o.bookableSpaceId ?? null,
        name: o.name,
        offeringType: o.offeringType as OfferingRecord["offeringType"],
        pricingBasis: o.pricingBasis as OfferingRecord["pricingBasis"],
        baseAmount: o.baseAmount,
        currency: o.currency,
        minimumSpend: o.minimumSpend,
        minGuests: o.minGuests ?? null,
        maxGuests: o.maxGuests ?? null,
        description: o.description ?? null,
        dietaryNotes: o.dietaryNotes ?? null,
        pricingNotes: o.pricingNotes ?? null,
        isCustomQuote: o.isCustomQuote,
        taxIncluded: o.taxIncluded,
        isActive: o.isActive,
        isDiscoverable: o.isDiscoverable,
        internalNotes: o.internalNotes ?? null,
        createdAt: o.createdAt,
      }));

      const rawAvail = await db.orm.public.AvailabilityMetadata.where({ venueId: v.id }).first();
      const availability: AvailabilityMetadataRecord | null = rawAvail
        ? {
            id: rawAvail.id,
            venueId: rawAvail.venueId,
            requiresManualConfirmation: rawAvail.requiresManualConfirmation,
            lastVerifiedAt: rawAvail.lastVerifiedAt ?? null,
            operatingDaysNotes: rawAvail.operatingDaysNotes ?? null,
            leadTimeHours: rawAvail.leadTimeHours,
            availabilityNotes: rawAvail.availabilityNotes ?? null,
            internalNotes: rawAvail.internalNotes ?? null,
            createdAt: rawAvail.createdAt,
          }
        : null;

      const rawCancel = await db.orm.public.CancellationPolicy.where({ venueId: v.id }).first();
      const cancellation: CancellationPolicyRecord | null = rawCancel
        ? {
            id: rawCancel.id,
            venueId: rawCancel.venueId,
            summary: rawCancel.summary,
            cutoffHours: rawCancel.cutoffHours,
            cutoffNotes: rawCancel.cutoffNotes ?? null,
            depositRequired: rawCancel.depositRequired,
            depositPercent: rawCancel.depositPercent,
            internalNotes: rawCancel.internalNotes ?? null,
            createdAt: rawCancel.createdAt,
          }
        : null;

      const readiness = evaluateDiscoveryReadiness({
        provider: providerRecord,
        venue: venueRecord,
        bookableSpaces,
        offerings,
      });

      return {
        venue: venueRecord,
        readiness,
        bookableSpaces,
        offerings,
        availability,
        cancellation,
      };
    }),
  );

  return {
    provider: providerRecord,
    contacts,
    documents,
    venues: venuesWithDetails,
    verificationRecords,
  };
}

export async function createProviderOrganization(data: {
  name: string;
  legalName?: string | null;
  providerType: ProviderOrganizationRecord["providerType"];
  city: string;
  internalNotes?: string | null;
}) {
  return await db.orm.public.ProviderOrganization.create({
    name: data.name,
    legalName: data.legalName ?? null,
    providerType: data.providerType,
    city: data.city,
    status: "DRAFT",
    onboardingStatus: "IN_PROGRESS",
    internalNotes: data.internalNotes ?? null,
  });
}

export async function updateProviderOrganization(
  id: number,
  data: Partial<{
    name: string;
    legalName: string | null;
    providerType: ProviderOrganizationRecord["providerType"];
    city: string;
    status: ProviderOrganizationRecord["status"];
    onboardingStatus: ProviderOrganizationRecord["onboardingStatus"];
    internalNotes: string | null;
  }>,
) {
  const existing = await db.orm.public.ProviderOrganization.where({ id }).first();
  if (!existing) throw new Error(`Provider organization #${id} not found`);

  const updated = await db.orm.public.ProviderOrganization.where({ id }).update({
    name: data.name ?? existing.name,
    legalName: data.legalName !== undefined ? data.legalName : existing.legalName,
    providerType: data.providerType ?? existing.providerType,
    city: data.city ?? existing.city,
    status: data.status ?? existing.status,
    onboardingStatus: data.onboardingStatus ?? existing.onboardingStatus,
    internalNotes: data.internalNotes !== undefined ? data.internalNotes : existing.internalNotes,
    updatedAt: new Date().toISOString(),
  });

  if (data.status === "VERIFIED") {
    const now = new Date().toISOString();
    const partners = await db.orm.public.PartnerUser.where({ providerOrgId: id }).all();
    for (const p of partners) {
      if (!p.acceptedAt) {
        await db.orm.public.PartnerUser.where({ id: p.id }).update({
          acceptedAt: now,
          updatedAt: now,
        });
      }
    }
  }

  return updated;
}

export async function createProviderContact(data: {
  providerOrgId: number;
  name: string;
  role: string;
  email: string;
  phone?: string | null;
  preferredContactMethod?: string;
  category?: ProviderContactRecord["category"];
  internalNotes?: string | null;
}) {
  return await db.orm.public.ProviderContact.create({
    providerOrgId: data.providerOrgId,
    name: data.name,
    role: data.role,
    email: data.email,
    phone: data.phone ?? null,
    preferredContactMethod: data.preferredContactMethod ?? "EMAIL",
    category: data.category ?? "GENERAL",
    isActive: true,
    internalNotes: data.internalNotes ?? null,
  });
}

export async function updateProviderContact(
  id: number,
  data: Partial<{
    name: string;
    role: string;
    email: string;
    phone: string | null;
    preferredContactMethod: string;
    category: ProviderContactRecord["category"];
    isActive: boolean;
    internalNotes: string | null;
  }>,
) {
  const existing = await db.orm.public.ProviderContact.where({ id }).first();
  if (!existing) throw new Error(`Provider contact #${id} not found`);

  return await db.orm.public.ProviderContact.where({ id }).update({
    name: data.name ?? existing.name,
    role: data.role ?? existing.role,
    email: data.email ?? existing.email,
    phone: data.phone !== undefined ? data.phone : existing.phone,
    preferredContactMethod: data.preferredContactMethod ?? existing.preferredContactMethod,
    category: data.category ?? existing.category,
    isActive: data.isActive !== undefined ? data.isActive : existing.isActive,
    internalNotes: data.internalNotes !== undefined ? data.internalNotes : existing.internalNotes,
  });
}

export async function toggleProviderContact(id: number, isActive: boolean) {
  const existing = await db.orm.public.ProviderContact.where({ id }).first();
  if (!existing) throw new Error(`Provider contact #${id} not found`);

  return await db.orm.public.ProviderContact.where({ id }).update({
    isActive,
  });
}

export async function createProviderDocument(data: {
  providerOrgId: number;
  docType: ProviderDocumentRecord["docType"];
  title: string;
  fileReference: string;
  isInternalOnly?: boolean;
  internalNotes?: string | null;
}) {
  return await db.orm.public.ProviderDocument.create({
    providerOrgId: data.providerOrgId,
    docType: data.docType,
    title: data.title,
    fileReference: data.fileReference,
    reviewStatus: "PENDING_REVIEW",
    isInternalOnly: data.isInternalOnly ?? true,
    internalNotes: data.internalNotes ?? null,
  });
}

export async function createProviderVenue(data: {
  providerOrgId: number;
  companyId?: number | null;
  name: string;
  city: string;
  locality?: string | null;
  address?: string | null;
  capacity: number;
  cuisine: string;
  priceBand?: string;
  tags?: string[];
  rating?: number;
  venueType?: string;
  publicDescription?: string | null;
  internalNotes?: string | null;
}) {
  const created = await db.orm.public.Venue.create({
    providerOrgId: data.providerOrgId,
    companyId: data.companyId ?? null,
    name: data.name,
    city: data.city,
    locality: data.locality ?? null,
    address: data.address ?? null,
    capacity: data.capacity,
    cuisine: data.cuisine,
    priceBand: data.priceBand ?? "PREMIUM",
    tags: data.tags ?? [],
    rating: data.rating ?? 4.8,
    active: true,
    venueType: data.venueType ?? "RESTAURANT",
    publicDescription: data.publicDescription ?? null,
    visibility: "DRAFT",
    isDiscoverable: false,
    verificationStatus: "UNVERIFIED",
    internalNotes: data.internalNotes ?? null,
  });

  // Seed default baseline availability and cancellation policies for the new venue
  await db.orm.public.AvailabilityMetadata.create({
    venueId: created.id,
    requiresManualConfirmation: true,
    leadTimeHours: 24,
    availabilityNotes: "Requires manual host confirmation before reservation lock.",
  });

  await db.orm.public.CancellationPolicy.create({
    venueId: created.id,
    summary: "Standard corporate dining terms: 48-hour complimentary cancellation window prior to event seating.",
    cutoffHours: 48,
    depositRequired: false,
    depositPercent: 0,
  });

  return created;
}

export async function updateProviderVenue(
  id: number,
  data: Partial<{
    name: string;
    city: string;
    locality: string | null;
    address: string | null;
    capacity: number;
    cuisine: string;
    priceBand: string;
    tags: string[];
    rating: number;
    venueType: string;
    active: boolean;
    visibility: ProviderVenueRecord["visibility"];
    verificationStatus: ProviderVenueRecord["verificationStatus"];
    publicDescription: string | null;
    internalNotes: string | null;
  }>,
) {
  const existing = await db.orm.public.Venue.where({ id }).first();
  if (!existing) throw new Error(`Venue #${id} not found`);

  return await db.orm.public.Venue.where({ id }).update({
    name: data.name ?? existing.name,
    city: data.city ?? existing.city,
    locality: data.locality !== undefined ? data.locality : existing.locality,
    address: data.address !== undefined ? data.address : existing.address,
    capacity: data.capacity ?? existing.capacity,
    cuisine: data.cuisine ?? existing.cuisine,
    priceBand: data.priceBand ?? existing.priceBand,
    tags: data.tags ?? existing.tags,
    rating: data.rating ?? existing.rating,
    venueType: data.venueType ?? existing.venueType,
    active: data.active !== undefined ? data.active : existing.active,
    visibility: data.visibility ?? existing.visibility,
    verificationStatus: data.verificationStatus ?? existing.verificationStatus,
    publicDescription: data.publicDescription !== undefined ? data.publicDescription : existing.publicDescription,
    internalNotes: data.internalNotes !== undefined ? data.internalNotes : existing.internalNotes,
  });
}

export async function createBookableSpace(data: {
  venueId: number;
  name: string;
  spaceType: BookableSpaceRecord["spaceType"];
  minCapacity: number;
  maxCapacity: number;
  privacyLevel?: string | null;
  seatedCapacity?: number | null;
  standingCapacity?: number | null;
  publicDescription?: string | null;
  status?: BookableSpaceRecord["status"];
  internalNotes?: string | null;
}) {
  return await db.orm.public.BookableSpace.create({
    venueId: data.venueId,
    name: data.name,
    spaceType: data.spaceType,
    minCapacity: data.minCapacity,
    maxCapacity: data.maxCapacity,
    privacyLevel: data.privacyLevel ?? "EXCLUSIVE",
    seatedCapacity: data.seatedCapacity ?? null,
    standingCapacity: data.standingCapacity ?? null,
    publicDescription: data.publicDescription ?? null,
    status: data.status ?? "ACTIVE",
    isActive: true,
    internalNotes: data.internalNotes ?? null,
  });
}

export async function updateBookableSpace(
  id: number,
  data: Partial<{
    name: string;
    spaceType: BookableSpaceRecord["spaceType"];
    minCapacity: number;
    maxCapacity: number;
    privacyLevel: string | null;
    seatedCapacity: number | null;
    standingCapacity: number | null;
    publicDescription: string | null;
    status: BookableSpaceRecord["status"];
    isActive: boolean;
    internalNotes: string | null;
  }>,
) {
  const existing = await db.orm.public.BookableSpace.where({ id }).first();
  if (!existing) throw new Error(`Bookable space #${id} not found`);

  return await db.orm.public.BookableSpace.where({ id }).update({
    name: data.name ?? existing.name,
    spaceType: data.spaceType ?? existing.spaceType,
    minCapacity: data.minCapacity ?? existing.minCapacity,
    maxCapacity: data.maxCapacity ?? existing.maxCapacity,
    privacyLevel: data.privacyLevel !== undefined ? data.privacyLevel : existing.privacyLevel,
    seatedCapacity: data.seatedCapacity !== undefined ? data.seatedCapacity : existing.seatedCapacity,
    standingCapacity: data.standingCapacity !== undefined ? data.standingCapacity : existing.standingCapacity,
    publicDescription: data.publicDescription !== undefined ? data.publicDescription : existing.publicDescription,
    status: data.status ?? existing.status,
    isActive: data.isActive !== undefined ? data.isActive : existing.isActive,
    internalNotes: data.internalNotes !== undefined ? data.internalNotes : existing.internalNotes,
  });
}

export async function toggleBookableSpace(id: number, isActive: boolean) {
  const existing = await db.orm.public.BookableSpace.where({ id }).first();
  if (!existing) throw new Error(`Bookable space #${id} not found`);

  return await db.orm.public.BookableSpace.where({ id }).update({
    isActive,
    status: isActive ? "ACTIVE" : "PAUSED",
  });
}

export async function createOffering(data: {
  providerOrgId?: number | null;
  venueId?: number | null;
  bookableSpaceId?: number | null;
  name: string;
  offeringType: OfferingRecord["offeringType"];
  pricingBasis: OfferingRecord["pricingBasis"];
  baseAmountPaise: number;
  currency?: string;
  minimumSpendPaise?: number;
  minGuests?: number | null;
  maxGuests?: number | null;
  description?: string | null;
  dietaryNotes?: string | null;
  pricingNotes?: string | null;
  isCustomQuote?: boolean;
  taxIncluded?: boolean;
  isActive?: boolean;
  isDiscoverable?: boolean;
  internalNotes?: string | null;
}) {
  return await db.orm.public.Offering.create({
    providerOrgId: data.providerOrgId ?? null,
    venueId: data.venueId ?? null,
    bookableSpaceId: data.bookableSpaceId ?? null,
    name: data.name,
    offeringType: data.offeringType,
    pricingBasis: data.pricingBasis,
    baseAmount: data.baseAmountPaise,
    currency: data.currency ?? "INR",
    minimumSpend: data.minimumSpendPaise ?? 0,
    minGuests: data.minGuests ?? null,
    maxGuests: data.maxGuests ?? null,
    description: data.description ?? null,
    dietaryNotes: data.dietaryNotes ?? null,
    pricingNotes: data.pricingNotes ?? null,
    isCustomQuote: data.isCustomQuote ?? false,
    taxIncluded: data.taxIncluded ?? false,
    isActive: data.isActive ?? true,
    isDiscoverable: data.isDiscoverable ?? true,
    internalNotes: data.internalNotes ?? null,
  });
}

export async function updateOffering(
  id: number,
  data: Partial<{
    bookableSpaceId: number | null;
    name: string;
    offeringType: OfferingRecord["offeringType"];
    pricingBasis: OfferingRecord["pricingBasis"];
    baseAmountPaise: number;
    currency: string;
    minimumSpendPaise: number;
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
  }>,
) {
  const existing = await db.orm.public.Offering.where({ id }).first();
  if (!existing) throw new Error(`Offering #${id} not found`);

  return await db.orm.public.Offering.where({ id }).update({
    bookableSpaceId: data.bookableSpaceId !== undefined ? data.bookableSpaceId : existing.bookableSpaceId,
    name: data.name ?? existing.name,
    offeringType: data.offeringType ?? existing.offeringType,
    pricingBasis: data.pricingBasis ?? existing.pricingBasis,
    baseAmount: data.baseAmountPaise !== undefined ? data.baseAmountPaise : existing.baseAmount,
    currency: data.currency ?? existing.currency,
    minimumSpend: data.minimumSpendPaise !== undefined ? data.minimumSpendPaise : existing.minimumSpend,
    minGuests: data.minGuests !== undefined ? data.minGuests : existing.minGuests,
    maxGuests: data.maxGuests !== undefined ? data.maxGuests : existing.maxGuests,
    description: data.description !== undefined ? data.description : existing.description,
    dietaryNotes: data.dietaryNotes !== undefined ? data.dietaryNotes : existing.dietaryNotes,
    pricingNotes: data.pricingNotes !== undefined ? data.pricingNotes : existing.pricingNotes,
    isCustomQuote: data.isCustomQuote !== undefined ? data.isCustomQuote : existing.isCustomQuote,
    taxIncluded: data.taxIncluded !== undefined ? data.taxIncluded : existing.taxIncluded,
    isActive: data.isActive !== undefined ? data.isActive : existing.isActive,
    isDiscoverable: data.isDiscoverable !== undefined ? data.isDiscoverable : existing.isDiscoverable,
    internalNotes: data.internalNotes !== undefined ? data.internalNotes : existing.internalNotes,
  });
}

export async function toggleOffering(id: number, isActive: boolean) {
  const existing = await db.orm.public.Offering.where({ id }).first();
  if (!existing) throw new Error(`Offering #${id} not found`);

  return await db.orm.public.Offering.where({ id }).update({
    isActive,
    isDiscoverable: isActive,
  });
}

export async function saveAvailabilityMetadata(
  venueId: number,
  data: {
    requiresManualConfirmation?: boolean;
    operatingDaysNotes?: string | null;
    leadTimeHours?: number;
    availabilityNotes?: string | null;
    internalNotes?: string | null;
  },
) {
  const existing = await db.orm.public.AvailabilityMetadata.where({ venueId }).first();

  if (existing) {
    return await db.orm.public.AvailabilityMetadata.where({ id: existing.id }).update({
      requiresManualConfirmation: data.requiresManualConfirmation ?? existing.requiresManualConfirmation,
      operatingDaysNotes: data.operatingDaysNotes ?? existing.operatingDaysNotes,
      leadTimeHours: data.leadTimeHours ?? existing.leadTimeHours,
      availabilityNotes: data.availabilityNotes ?? existing.availabilityNotes,
      internalNotes: data.internalNotes ?? existing.internalNotes,
    });
  } else {
    return await db.orm.public.AvailabilityMetadata.create({
      venueId,
      requiresManualConfirmation: data.requiresManualConfirmation ?? true,
      operatingDaysNotes: data.operatingDaysNotes ?? null,
      leadTimeHours: data.leadTimeHours ?? 24,
      availabilityNotes: data.availabilityNotes ?? null,
      internalNotes: data.internalNotes ?? null,
    });
  }
}

export async function saveCancellationPolicy(
  venueId: number,
  data: {
    summary: string;
    cutoffHours?: number;
    cutoffNotes?: string | null;
    depositRequired?: boolean;
    depositPercent?: number;
    internalNotes?: string | null;
  },
) {
  const existing = await db.orm.public.CancellationPolicy.where({ venueId }).first();

  if (existing) {
    return await db.orm.public.CancellationPolicy.where({ id: existing.id }).update({
      summary: data.summary,
      cutoffHours: data.cutoffHours ?? existing.cutoffHours,
      cutoffNotes: data.cutoffNotes ?? existing.cutoffNotes,
      depositRequired: data.depositRequired ?? existing.depositRequired,
      depositPercent: data.depositPercent ?? existing.depositPercent,
      internalNotes: data.internalNotes ?? existing.internalNotes,
    });
  } else {
    return await db.orm.public.CancellationPolicy.create({
      venueId,
      summary: data.summary,
      cutoffHours: data.cutoffHours ?? 48,
      cutoffNotes: data.cutoffNotes ?? null,
      depositRequired: data.depositRequired ?? false,
      depositPercent: data.depositPercent ?? 0,
      internalNotes: data.internalNotes ?? null,
    });
  }
}

export async function recordVerification(data: {
  providerOrgId?: number | null;
  venueId?: number | null;
  status: VerificationRecordItem["status"];
  verifiedBy: string;
  verificationSource?: string | null;
  notes?: string | null;
}) {
  const now = new Date().toISOString();

  const record = await db.orm.public.VerificationRecord.create({
    providerOrgId: data.providerOrgId ?? null,
    venueId: data.venueId ?? null,
    status: data.status,
    verifiedAt: now,
    verifiedBy: data.verifiedBy,
    verificationSource: data.verificationSource ?? "INTERNAL_OPERATIONS_AUDIT",
    notes: data.notes ?? null,
  });

  // If verifying a venue, update venue record
  if (data.venueId) {
    await db.orm.public.Venue.where({ id: data.venueId }).update({
      verificationStatus: data.status,
      lastVerifiedAt: now,
    });
  }

  // If verifying a provider organization, update provider record
  if (data.providerOrgId) {
    const orgStatus =
      data.status === "VERIFIED"
        ? "VERIFIED"
        : data.status === "PENDING_REVIEW"
        ? "PENDING_VERIFICATION"
        : "DRAFT";

    await db.orm.public.ProviderOrganization.where({ id: data.providerOrgId }).update({
      status: orgStatus,
      updatedAt: now,
    });

    if (data.status === "VERIFIED") {
      const partners = await db.orm.public.PartnerUser.where({ providerOrgId: data.providerOrgId }).all();
      for (const p of partners) {
        if (!p.acceptedAt) {
          await db.orm.public.PartnerUser.where({ id: p.id }).update({
            acceptedAt: now,
            updatedAt: now,
          });
        }
      }
    }
  }

  return record;
}

export async function evaluateAndSyncVenueReadiness(
  venueId: number,
): Promise<DiscoveryReadinessEvaluation> {
  const venue = await db.orm.public.Venue.where({ id: venueId }).first();
  if (!venue) {
    throw new Error(`Venue #${venueId} does not exist`);
  }

  let provider: ProviderOrganizationRecord | null = null;
  if (venue.providerOrgId) {
    const rawProvider = await db.orm.public.ProviderOrganization.where({
      id: venue.providerOrgId,
    }).first();
    if (rawProvider) {
      provider = {
        id: rawProvider.id,
        name: rawProvider.name,
        legalName: rawProvider.legalName ?? null,
        providerType: rawProvider.providerType as ProviderOrganizationRecord["providerType"],
        city: rawProvider.city,
        status: rawProvider.status as ProviderOrganizationRecord["status"],
        onboardingStatus: rawProvider.onboardingStatus as ProviderOrganizationRecord["onboardingStatus"],
        internalNotes: rawProvider.internalNotes ?? null,
        createdAt: rawProvider.createdAt,
        updatedAt: rawProvider.updatedAt ?? null,
      };
    }
  }

  const rawSpaces = await db.orm.public.BookableSpace.where({ venueId }).all();
  const bookableSpaces: BookableSpaceRecord[] = rawSpaces.map((s) => ({
    id: s.id,
    venueId: s.venueId,
    name: s.name,
    spaceType: s.spaceType as BookableSpaceRecord["spaceType"],
    minCapacity: s.minCapacity,
    maxCapacity: s.maxCapacity,
    privacyLevel: s.privacyLevel ?? null,
    seatedCapacity: s.seatedCapacity ?? null,
    standingCapacity: s.standingCapacity ?? null,
    publicDescription: s.publicDescription ?? null,
    status: s.status as BookableSpaceRecord["status"],
    isActive: s.isActive,
    internalNotes: s.internalNotes ?? null,
    createdAt: s.createdAt,
  }));

  const rawOfferings = await db.orm.public.Offering.where({ venueId }).all();
  const offerings: OfferingRecord[] = rawOfferings.map((o) => ({
    id: o.id,
    providerOrgId: o.providerOrgId ?? null,
    venueId: o.venueId ?? null,
    bookableSpaceId: o.bookableSpaceId ?? null,
    name: o.name,
    offeringType: o.offeringType as OfferingRecord["offeringType"],
    pricingBasis: o.pricingBasis as OfferingRecord["pricingBasis"],
    baseAmount: o.baseAmount,
    currency: o.currency,
    minimumSpend: o.minimumSpend,
    minGuests: o.minGuests ?? null,
    maxGuests: o.maxGuests ?? null,
    description: o.description ?? null,
    dietaryNotes: o.dietaryNotes ?? null,
    pricingNotes: o.pricingNotes ?? null,
    isCustomQuote: o.isCustomQuote,
    taxIncluded: o.taxIncluded,
    isActive: o.isActive,
    isDiscoverable: o.isDiscoverable,
    internalNotes: o.internalNotes ?? null,
    createdAt: o.createdAt,
  }));

  const venueRecord: ProviderVenueRecord = {
    id: venue.id,
    companyId: venue.companyId ?? null,
    providerOrgId: venue.providerOrgId ?? null,
    name: venue.name,
    city: venue.city,
    address: venue.address ?? null,
    capacity: venue.capacity,
    cuisine: venue.cuisine,
    priceBand: venue.priceBand,
    tags: [...venue.tags],
    rating: venue.rating,
    active: venue.active,
    venueType: venue.venueType ?? "RESTAURANT",
    locality: venue.locality ?? null,
    publicDescription: venue.publicDescription ?? null,
    visibility: venue.visibility as ProviderVenueRecord["visibility"],
    isDiscoverable: venue.isDiscoverable,
    verificationStatus: venue.verificationStatus as ProviderVenueRecord["verificationStatus"],
    lastVerifiedAt: venue.lastVerifiedAt ?? null,
    internalNotes: venue.internalNotes ?? null,
  };

  const evaluation = evaluateDiscoveryReadiness({
    provider,
    venue: venueRecord,
    bookableSpaces,
    offerings,
  });

  const isDiscoverable = venue.visibility === "DISCOVERABLE" && evaluation.isEligible;

  await db.orm.public.Venue.where({ id: venueId }).update({
    isDiscoverable,
  });

  if (venue.providerOrgId) {
    const allOrgVenues = await db.orm.public.Venue.where({ providerOrgId: venue.providerOrgId }).all();
    const anyDiscoverable = allOrgVenues.some((v) => v.id === venueId ? isDiscoverable : v.isDiscoverable);
    const orgOnboardingStatus = anyDiscoverable ? "READY_FOR_DISCOVERY" : "IN_PROGRESS";

    await db.orm.public.ProviderOrganization.where({ id: venue.providerOrgId }).update({
      onboardingStatus: orgOnboardingStatus,
    });
  }

  return evaluation;
}

/**
 * Public-safe mapper: strips all internal notes, unverified operational flags,
 * and sensitive provider documents, returning structured discovery DTO.
 */
export async function getPublicSafeVenueDetail(
  venueId: number,
): Promise<PublicSafeVenueDetail | null> {
  const venue = await db.orm.public.Venue.where({ id: venueId }).first();
  if (!venue || !venue.active) return null;

  const rawSpaces = await db.orm.public.BookableSpace.where({ venueId }).all();
  const spaces = rawSpaces.map((s) => ({
    id: s.id,
    venueId: s.venueId,
    name: s.name,
    spaceType: s.spaceType as BookableSpaceRecord["spaceType"],
    minCapacity: s.minCapacity,
    maxCapacity: s.maxCapacity,
    privacyLevel: s.privacyLevel ?? null,
    seatedCapacity: s.seatedCapacity ?? null,
    standingCapacity: s.standingCapacity ?? null,
    publicDescription: s.publicDescription ?? null,
    status: s.status as BookableSpaceRecord["status"],
    isActive: s.isActive,
    internalNotes: null,
    createdAt: s.createdAt,
  }));
  const discoverableSpaces = filterDiscoverableBookableSpaces(spaces);

  const rawOfferings = await db.orm.public.Offering.where({ venueId }).all();
  const offerings = rawOfferings.map((o) => ({
    id: o.id,
    providerOrgId: o.providerOrgId ?? null,
    venueId: o.venueId ?? null,
    bookableSpaceId: o.bookableSpaceId ?? null,
    name: o.name,
    offeringType: o.offeringType as OfferingRecord["offeringType"],
    pricingBasis: o.pricingBasis as OfferingRecord["pricingBasis"],
    baseAmount: o.baseAmount,
    currency: o.currency,
    minimumSpend: o.minimumSpend,
    minGuests: o.minGuests ?? null,
    maxGuests: o.maxGuests ?? null,
    description: o.description ?? null,
    dietaryNotes: o.dietaryNotes ?? null,
    pricingNotes: o.pricingNotes ?? null,
    isCustomQuote: o.isCustomQuote,
    taxIncluded: o.taxIncluded,
    isActive: o.isActive,
    isDiscoverable: o.isDiscoverable,
    internalNotes: null,
    createdAt: o.createdAt,
  }));
  const discoverableOfferings = filterDiscoverableOfferings(offerings);

  const rawAvail = await db.orm.public.AvailabilityMetadata.where({ venueId }).first();
  const rawCancel = await db.orm.public.CancellationPolicy.where({ venueId }).first();

  const publicSpaces: PublicSafeBookableSpace[] = discoverableSpaces.map((space) => {
    const spaceOfferings = discoverableOfferings
      .filter((o) => o.bookableSpaceId === space.id)
      .map((o): PublicSafeOffering => ({
        id: o.id,
        name: o.name,
        offeringType: o.offeringType,
        pricingBasis: o.pricingBasis,
        baseAmount: o.baseAmount,
        currency: o.currency,
        minimumSpend: o.minimumSpend,
        minGuests: o.minGuests,
        maxGuests: o.maxGuests,
        description: o.description,
        dietaryNotes: o.dietaryNotes,
        pricingNotes: o.pricingNotes,
        isCustomQuote: o.isCustomQuote,
        taxIncluded: o.taxIncluded,
      }));

    return {
      id: space.id,
      name: space.name,
      spaceType: space.spaceType,
      minCapacity: space.minCapacity,
      maxCapacity: space.maxCapacity,
      privacyLevel: space.privacyLevel,
      seatedCapacity: space.seatedCapacity,
      standingCapacity: space.standingCapacity,
      publicDescription: space.publicDescription,
      offerings: spaceOfferings,
    };
  });

  const venueWideOfferings: PublicSafeOffering[] = discoverableOfferings
    .filter((o) => o.bookableSpaceId === null)
    .map((o) => ({
      id: o.id,
      name: o.name,
      offeringType: o.offeringType,
      pricingBasis: o.pricingBasis,
      baseAmount: o.baseAmount,
      currency: o.currency,
      minimumSpend: o.minimumSpend,
      minGuests: o.minGuests,
      maxGuests: o.maxGuests,
      description: o.description,
      dietaryNotes: o.dietaryNotes,
      pricingNotes: o.pricingNotes,
      isCustomQuote: o.isCustomQuote,
      taxIncluded: o.taxIncluded,
    }));

  const availability: PublicSafeAvailabilitySummary | null = rawAvail
    ? {
        requiresManualConfirmation: rawAvail.requiresManualConfirmation,
        operatingDaysNotes: rawAvail.operatingDaysNotes ?? null,
        leadTimeHours: rawAvail.leadTimeHours,
        availabilityNotes: rawAvail.availabilityNotes ?? null,
      }
    : null;

  const cancellation: PublicSafeCancellationSummary | null = rawCancel
    ? {
        summary: rawCancel.summary,
        cutoffHours: rawCancel.cutoffHours,
        cutoffNotes: rawCancel.cutoffNotes ?? null,
        depositRequired: rawCancel.depositRequired,
      }
    : null;

  return {
    id: venue.id,
    name: venue.name,
    city: venue.city,
    locality: venue.locality ?? null,
    address: venue.address ?? null,
    cuisine: venue.cuisine,
    priceBand: venue.priceBand,
    tags: [...venue.tags],
    rating: venue.rating,
    venueType: venue.venueType ?? "RESTAURANT",
    publicDescription: venue.publicDescription ?? null,
    bookableSpaces: publicSpaces,
    offerings: venueWideOfferings,
    availability,
    cancellation,
  };
}

/**
 * Explicit operator-controlled venue visibility update.
 * This is separate from the automated readiness sync so that operators
 * can promote venues to DISCOVERABLE only when explicitly authorized —
 * verification alone does not auto-publish.
 */
export async function updateVenueVisibility(
  venueId: number,
  visibility: ProviderVenueRecord["visibility"],
): Promise<void> {
  const venue = await db.orm.public.Venue.where({ id: venueId }).first();
  if (!venue) {
    throw new Error(`Venue #${venueId} does not exist`);
  }

  const isDiscoverable = visibility === "DISCOVERABLE";
  await db.orm.public.Venue.where({ id: venueId }).update({
    visibility,
    isDiscoverable,
  });

  if (venue.providerOrgId) {
    const allOrgVenues = await db.orm.public.Venue.where({ providerOrgId: venue.providerOrgId }).all();
    const anyDiscoverable = allOrgVenues.some((v) =>
      v.id === venueId ? isDiscoverable : v.isDiscoverable,
    );
    const orgOnboardingStatus = anyDiscoverable ? "READY_FOR_DISCOVERY" : "IN_PROGRESS";
    await db.orm.public.ProviderOrganization.where({ id: venue.providerOrgId }).update({
      onboardingStatus: orgOnboardingStatus,
    });
  }
}

// ---------------------------------------------------------------------------
// Provider Booking Request Service Foundation (Day 20 Step 1)
// ---------------------------------------------------------------------------

export async function createProviderBookingRequestRecord(
  input: {
    eventId: number;
    venueId: number;
    bookableSpaceId?: number | null;
    offeringId?: number | null;
    requestedDateTime: string;
    attendees: number;
    estimatedAmountPaise?: number | null;
    dietaryNotes?: string | null;
    operationalNotes?: string | null;
  },
  user: {
    id: number;
    companyId: number;
    role?: string;
  },
): Promise<ProviderBookingRequestRecord> {
  // 1. Validate enterprise event context and tenant boundary
  const event = await db.orm.public.Event.where({ id: input.eventId }).first();
  if (!event || event.companyId !== user.companyId) {
    throw new Error("Event not found or does not belong to your company.");
  }

  // 2. Validate venue and provider organization
  const venue = await db.orm.public.Venue.where({ id: input.venueId }).first();
  if (!venue || !venue.active) {
    throw new Error("The selected venue is unavailable or does not exist.");
  }

  if (!venue.providerOrgId) {
    throw new Error("The selected venue is not linked to a registered hospitality partner.");
  }

  const providerOrg = await db.orm.public.ProviderOrganization.where({
    id: venue.providerOrgId,
  }).first();

  if (!providerOrg || providerOrg.status !== "VERIFIED") {
    throw new Error("The partner organization is not yet verified to accept corporate bookings.");
  }

  if (venue.visibility !== "DISCOVERABLE" && venue.verificationStatus !== "VERIFIED") {
    throw new Error("This venue is not currently eligible to receive booking requests.");
  }

  // 3. Validate optional bookable space
  if (input.bookableSpaceId) {
    const space = await db.orm.public.BookableSpace.where({
      id: input.bookableSpaceId,
    }).first();

    if (!space || space.venueId !== venue.id || !space.isActive) {
      throw new Error("The selected bookable space does not belong to this venue or is inactive.");
    }

    if (input.attendees > space.maxCapacity) {
      throw new Error(
        `Requested guest count (${input.attendees}) exceeds space capacity (${space.maxCapacity}).`,
      );
    }
  } else if (input.attendees > venue.capacity) {
    throw new Error(
      `Requested guest count (${input.attendees}) exceeds venue capacity (${venue.capacity}).`,
    );
  }

  // 4. Validate optional offering
  if (input.offeringId) {
    const offering = await db.orm.public.Offering.where({
      id: input.offeringId,
    }).first();

    if (!offering || !offering.isActive) {
      throw new Error("The selected package or offering is inactive or not found.");
    }

    if (
      offering.venueId !== venue.id &&
      offering.providerOrgId !== providerOrg.id
    ) {
      throw new Error("The selected package does not belong to this venue or provider.");
    }
  }

  // 5. Create the provider booking request in PENDING_PROVIDER_REVIEW state
  const created = await db.orm.public.ProviderBookingRequest.create({
    eventId: event.id,
    companyId: user.companyId,
    createdById: user.id,
    providerOrgId: providerOrg.id,
    venueId: venue.id,
    bookableSpaceId: input.bookableSpaceId ?? null,
    offeringId: input.offeringId ?? null,
    requestedDateTime: input.requestedDateTime,
    attendees: input.attendees,
    estimatedAmountPaise: input.estimatedAmountPaise ?? null,
    dietaryNotes: input.dietaryNotes ?? null,
    operationalNotes: input.operationalNotes ?? null,
    status: "PENDING_PROVIDER_REVIEW",
  });

  return {
    id: created.id,
    eventId: created.eventId,
    companyId: created.companyId,
    createdById: created.createdById,
    providerOrgId: created.providerOrgId,
    venueId: created.venueId,
    bookableSpaceId: created.bookableSpaceId ?? null,
    offeringId: created.offeringId ?? null,
    requestedDateTime: created.requestedDateTime,
    attendees: created.attendees,
    estimatedAmountPaise: created.estimatedAmountPaise ?? null,
    dietaryNotes: created.dietaryNotes ?? null,
    operationalNotes: created.operationalNotes ?? null,
    status: created.status as ProviderRequestStatus,
    providerResponseNote: created.providerResponseNote ?? null,
    rejectionReason: created.rejectionReason ?? null,
    respondedByPartnerUserId: created.respondedByPartnerUserId ?? null,
    respondedAt: created.respondedAt ?? null,
    createdAt: created.createdAt,
    updatedAt: created.updatedAt ?? null,
  };
}

export async function getProviderBookingRequests(
  providerOrgId: number,
  filter?: { status?: ProviderRequestStatus },
): Promise<ProviderBookingRequestDetail[]> {
  const allRequests = await db.orm.public.ProviderBookingRequest.where({
    providerOrgId,
  }).all();

  const filtered = filter?.status
    ? allRequests.filter((r) => r.status === filter.status)
    : allRequests;

  // Order newest first
  filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const [events, companies, users, venues, spaces, offerings, orgs] = await Promise.all([
    db.orm.public.Event.all(),
    db.orm.public.Company.all(),
    db.orm.public.User.all(),
    db.orm.public.Venue.all(),
    db.orm.public.BookableSpace.all(),
    db.orm.public.Offering.all(),
    db.orm.public.ProviderOrganization.all(),
  ]);

  const eventMap = new Map(events.map((e) => [e.id, e]));
  const companyMap = new Map(companies.map((c) => [c.id, c]));
  const userMap = new Map(users.map((u) => [u.id, u]));
  const venueMap = new Map(venues.map((v) => [v.id, v]));
  const spaceMap = new Map(spaces.map((s) => [s.id, s]));
  const offeringMap = new Map(offerings.map((o) => [o.id, o]));
  const orgMap = new Map(orgs.map((o) => [o.id, o]));

  return filtered.map((r) => {
    const event = eventMap.get(r.eventId);
    const company = companyMap.get(r.companyId);
    const requester = userMap.get(r.createdById);
    const venue = venueMap.get(r.venueId);
    const space = r.bookableSpaceId ? spaceMap.get(r.bookableSpaceId) : null;
    const offering = r.offeringId ? offeringMap.get(r.offeringId) : null;
    const org = orgMap.get(r.providerOrgId);

    return {
      id: r.id,
      eventId: r.eventId,
      companyId: r.companyId,
      createdById: r.createdById,
      providerOrgId: r.providerOrgId,
      venueId: r.venueId,
      bookableSpaceId: r.bookableSpaceId ?? null,
      offeringId: r.offeringId ?? null,
      requestedDateTime: r.requestedDateTime,
      attendees: r.attendees,
      estimatedAmountPaise: r.estimatedAmountPaise ?? null,
      dietaryNotes: r.dietaryNotes ?? null,
      operationalNotes: r.operationalNotes ?? null,
      status: r.status as ProviderRequestStatus,
      providerResponseNote: r.providerResponseNote ?? null,
      rejectionReason: r.rejectionReason ?? null,
      respondedByPartnerUserId: r.respondedByPartnerUserId ?? null,
      respondedAt: r.respondedAt ?? null,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt ?? null,
      eventTitle: event?.title ?? `Event #${r.eventId}`,
      companyName: company?.name ?? "Enterprise Client",
      requesterName: requester?.name ?? "Corporate Requester",
      requesterEmail: requester?.email ?? "",
      venueName: venue?.name ?? "Venue",
      venueCity: venue?.city ?? "",
      spaceName: space?.name ?? null,
      offeringName: offering?.name ?? null,
      providerOrgName: org?.name ?? "Partner",
    };
  });
}

export async function getProviderBookingRequestById(
  requestId: number,
  providerOrgId: number,
): Promise<ProviderBookingRequestDetail | null> {
  const request = await db.orm.public.ProviderBookingRequest.where({
    id: requestId,
  }).first();

  if (!request || request.providerOrgId !== providerOrgId) {
    return null;
  }

  const [event, company, requester, venue, space, offering, org] = await Promise.all([
    db.orm.public.Event.where({ id: request.eventId }).first(),
    db.orm.public.Company.where({ id: request.companyId }).first(),
    db.orm.public.User.where({ id: request.createdById }).first(),
    db.orm.public.Venue.where({ id: request.venueId }).first(),
    request.bookableSpaceId
      ? db.orm.public.BookableSpace.where({ id: request.bookableSpaceId }).first()
      : null,
    request.offeringId
      ? db.orm.public.Offering.where({ id: request.offeringId }).first()
      : null,
    db.orm.public.ProviderOrganization.where({ id: request.providerOrgId }).first(),
  ]);

  return {
    id: request.id,
    eventId: request.eventId,
    companyId: request.companyId,
    createdById: request.createdById,
    providerOrgId: request.providerOrgId,
    venueId: request.venueId,
    bookableSpaceId: request.bookableSpaceId ?? null,
    offeringId: request.offeringId ?? null,
    requestedDateTime: request.requestedDateTime,
    attendees: request.attendees,
    estimatedAmountPaise: request.estimatedAmountPaise ?? null,
    dietaryNotes: request.dietaryNotes ?? null,
    operationalNotes: request.operationalNotes ?? null,
    status: request.status as ProviderRequestStatus,
    providerResponseNote: request.providerResponseNote ?? null,
    rejectionReason: request.rejectionReason ?? null,
    respondedByPartnerUserId: request.respondedByPartnerUserId ?? null,
    respondedAt: request.respondedAt ?? null,
    createdAt: request.createdAt,
    updatedAt: request.updatedAt ?? null,
    eventTitle: event?.title ?? `Event #${request.eventId}`,
    companyName: company?.name ?? "Enterprise Client",
    requesterName: requester?.name ?? "Corporate Requester",
    requesterEmail: requester?.email ?? "",
    venueName: venue?.name ?? "Venue",
    venueCity: venue?.city ?? "",
    spaceName: space?.name ?? null,
    offeringName: offering?.name ?? null,
    providerOrgName: org?.name ?? "Partner",
  };
}

export async function getProviderPendingRequestsCount(
  providerOrgId: number,
): Promise<number> {
  const requests = await db.orm.public.ProviderBookingRequest.where({
    providerOrgId,
  }).all();

  return requests.filter((r) => r.status === "PENDING_PROVIDER_REVIEW").length;
}

export async function getEventBookingRequests(
  eventId: number,
  companyId: number,
): Promise<ProviderBookingRequestDetail[]> {
  const event = await db.orm.public.Event.where({ id: eventId }).first();
  if (!event || event.companyId !== companyId) {
    return [];
  }

  const allRequests = await db.orm.public.ProviderBookingRequest.where({
    eventId,
  }).all();

  const scoped = allRequests.filter((r) => r.companyId === companyId);
  scoped.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const [company, requester, venues, spaces, offerings, orgs] = await Promise.all([
    db.orm.public.Company.where({ id: companyId }).first(),
    db.orm.public.User.where({ id: event.createdById }).first(),
    db.orm.public.Venue.all(),
    db.orm.public.BookableSpace.all(),
    db.orm.public.Offering.all(),
    db.orm.public.ProviderOrganization.all(),
  ]);

  const venueMap = new Map(venues.map((v) => [v.id, v]));
  const spaceMap = new Map(spaces.map((s) => [s.id, s]));
  const offeringMap = new Map(offerings.map((o) => [o.id, o]));
  const orgMap = new Map(orgs.map((o) => [o.id, o]));

  return scoped.map((r) => {
    const venue = venueMap.get(r.venueId);
    const space = r.bookableSpaceId ? spaceMap.get(r.bookableSpaceId) : null;
    const offering = r.offeringId ? offeringMap.get(r.offeringId) : null;
    const org = orgMap.get(r.providerOrgId);

    return {
      id: r.id,
      eventId: r.eventId,
      companyId: r.companyId,
      createdById: r.createdById,
      providerOrgId: r.providerOrgId,
      venueId: r.venueId,
      bookableSpaceId: r.bookableSpaceId ?? null,
      offeringId: r.offeringId ?? null,
      requestedDateTime: r.requestedDateTime,
      attendees: r.attendees,
      estimatedAmountPaise: r.estimatedAmountPaise ?? null,
      dietaryNotes: r.dietaryNotes ?? null,
      operationalNotes: r.operationalNotes ?? null,
      status: r.status as ProviderRequestStatus,
      providerResponseNote: r.providerResponseNote ?? null,
      rejectionReason: r.rejectionReason ?? null,
      respondedByPartnerUserId: r.respondedByPartnerUserId ?? null,
      respondedAt: r.respondedAt ?? null,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt ?? null,
      eventTitle: event.title,
      companyName: company?.name ?? "Company",
      requesterName: requester?.name ?? "Requester",
      requesterEmail: requester?.email ?? "",
      venueName: venue?.name ?? "Venue",
      venueCity: venue?.city ?? "",
      spaceName: space?.name ?? null,
      offeringName: offering?.name ?? null,
      providerOrgName: org?.name ?? "Partner",
    };
  });
}

export async function acceptProviderBookingRequestRecord(
  requestId: number,
  partner: { id: number; providerOrgId: number },
  providerResponseNote?: string | null,
): Promise<ProviderBookingRequestRecord> {
  const request = await db.orm.public.ProviderBookingRequest.where({
    id: requestId,
  }).first();

  if (!request) {
    throw new Error("Booking request not found.");
  }

  if (request.providerOrgId !== partner.providerOrgId) {
    throw new Error("Access denied: You cannot act on a request for another provider organization.");
  }

  const providerOrg = await db.orm.public.ProviderOrganization.where({
    id: partner.providerOrgId,
  }).first();

  if (!providerOrg || providerOrg.status !== "VERIFIED") {
    throw new Error("Your partner organization must be fully verified before accepting requests.");
  }

  if (request.status !== "PENDING_PROVIDER_REVIEW") {
    throw new Error(
      `Cannot accept request: current status is ${request.status}. Only pending requests can be accepted.`,
    );
  }

  const now = new Date().toISOString();
  await db.orm.public.ProviderBookingRequest.where({ id: requestId }).update({
    status: "ACCEPTED",
    respondedByPartnerUserId: partner.id,
    respondedAt: now,
    providerResponseNote: providerResponseNote?.trim() || null,
    updatedAt: now,
  });

  return {
    id: request.id,
    eventId: request.eventId,
    companyId: request.companyId,
    createdById: request.createdById,
    providerOrgId: request.providerOrgId,
    venueId: request.venueId,
    bookableSpaceId: request.bookableSpaceId ?? null,
    offeringId: request.offeringId ?? null,
    requestedDateTime: request.requestedDateTime,
    attendees: request.attendees,
    estimatedAmountPaise: request.estimatedAmountPaise ?? null,
    dietaryNotes: request.dietaryNotes ?? null,
    operationalNotes: request.operationalNotes ?? null,
    status: "ACCEPTED",
    providerResponseNote: providerResponseNote?.trim() || null,
    rejectionReason: null,
    respondedByPartnerUserId: partner.id,
    respondedAt: now,
    createdAt: request.createdAt,
    updatedAt: now,
  };
}

export async function rejectProviderBookingRequestRecord(
  requestId: number,
  partner: { id: number; providerOrgId: number },
  rejectionReason: string,
): Promise<ProviderBookingRequestRecord> {
  const request = await db.orm.public.ProviderBookingRequest.where({
    id: requestId,
  }).first();

  if (!request) {
    throw new Error("Booking request not found.");
  }

  if (request.providerOrgId !== partner.providerOrgId) {
    throw new Error("Access denied: You cannot act on a request for another provider organization.");
  }

  const providerOrg = await db.orm.public.ProviderOrganization.where({
    id: partner.providerOrgId,
  }).first();

  if (!providerOrg || providerOrg.status !== "VERIFIED") {
    throw new Error("Your partner organization must be verified before acting on requests.");
  }

  if (request.status !== "PENDING_PROVIDER_REVIEW") {
    throw new Error(
      `Cannot decline request: current status is ${request.status}. Only pending requests can be declined.`,
    );
  }

  if (!rejectionReason || rejectionReason.trim().length < 3) {
    throw new Error("A valid reason for declining this booking request is required.");
  }

  const now = new Date().toISOString();
  await db.orm.public.ProviderBookingRequest.where({ id: requestId }).update({
    status: "REJECTED",
    respondedByPartnerUserId: partner.id,
    respondedAt: now,
    rejectionReason: rejectionReason.trim(),
    updatedAt: now,
  });

  return {
    id: request.id,
    eventId: request.eventId,
    companyId: request.companyId,
    createdById: request.createdById,
    providerOrgId: request.providerOrgId,
    venueId: request.venueId,
    bookableSpaceId: request.bookableSpaceId ?? null,
    offeringId: request.offeringId ?? null,
    requestedDateTime: request.requestedDateTime,
    attendees: request.attendees,
    estimatedAmountPaise: request.estimatedAmountPaise ?? null,
    dietaryNotes: request.dietaryNotes ?? null,
    operationalNotes: request.operationalNotes ?? null,
    status: "REJECTED",
    providerResponseNote: null,
    rejectionReason: rejectionReason.trim(),
    respondedByPartnerUserId: partner.id,
    respondedAt: now,
    createdAt: request.createdAt,
    updatedAt: now,
  };
}

export async function cancelProviderBookingRequestRecord(
  requestId: number,
  user: { id: number; companyId: number },
): Promise<ProviderBookingRequestRecord> {
  const request = await db.orm.public.ProviderBookingRequest.where({
    id: requestId,
  }).first();

  if (!request || request.companyId !== user.companyId) {
    throw new Error("Booking request not found or access denied.");
  }

  if (request.status !== "PENDING_PROVIDER_REVIEW") {
    throw new Error(
      `Cannot cancel request: current status is ${request.status}. Only pending requests can be cancelled.`,
    );
  }

  const now = new Date().toISOString();
  await db.orm.public.ProviderBookingRequest.where({ id: requestId }).update({
    status: "CANCELLED",
    updatedAt: now,
  });

  return {
    id: request.id,
    eventId: request.eventId,
    companyId: request.companyId,
    createdById: request.createdById,
    providerOrgId: request.providerOrgId,
    venueId: request.venueId,
    bookableSpaceId: request.bookableSpaceId ?? null,
    offeringId: request.offeringId ?? null,
    requestedDateTime: request.requestedDateTime,
    attendees: request.attendees,
    estimatedAmountPaise: request.estimatedAmountPaise ?? null,
    dietaryNotes: request.dietaryNotes ?? null,
    operationalNotes: request.operationalNotes ?? null,
    status: "CANCELLED",
    providerResponseNote: request.providerResponseNote ?? null,
    rejectionReason: request.rejectionReason ?? null,
    respondedByPartnerUserId: request.respondedByPartnerUserId ?? null,
    respondedAt: request.respondedAt ?? null,
    createdAt: request.createdAt,
    updatedAt: now,
  };
}

export type ConfirmProviderBookingRequestResult = {
  bookingId: number;
  eventId: number;
  venueId: number;
  invoiceId: number;
  invoiceNumber: string;
  totalAmount: number; // in paise
  isExisting?: boolean;
};

/**
 * Enterprise Requester Confirmation:
 * Transitions an ACCEPTED ProviderBookingRequest into a confirmed commercial Booking
 * and generates the official GST Tax Invoice atomically.
 *
 * Safety & Invariant Guarantees:
 *   - Authenticated enterprise user check (REQUESTER or ADMIN).
 *   - Tenant isolation: verifies request and event belong to the caller's companyId.
 *   - Status gate: request must be in ACCEPTED status (rejects REJECTED, CANCELLED, PENDING).
 *   - Idempotency / Duplicate safety: returns existing booking/invoice if already confirmed.
 *   - Atomic transaction: Booking creation, Invoice creation, and Event status update to BOOKING_REQUESTED.
 *   - GST calculation: strictly delegates to calculateGst engine with intra/inter-state rules.
 */
export async function confirmProviderBookingRequestRecord(
  requestId: number,
  user: { id: number; companyId: number; role: string },
): Promise<ConfirmProviderBookingRequestResult> {
  // 1. Role Authorization
  const allowedRoles = ["REQUESTER", "COMPANY_ADMIN", "ADMIN"];
  if (!allowedRoles.includes(user.role)) {
    throw new Error(`Users with role '${user.role}' cannot confirm commercial bookings.`);
  }

  // 2. Fetch Provider Booking Request
  const request = await db.orm.public.ProviderBookingRequest.where({
    id: requestId,
  }).first();

  if (!request) {
    throw new Error("Booking request not found.");
  }

  // 3. Tenant Isolation Check
  if (request.companyId !== user.companyId) {
    throw new Error("Access denied: You cannot confirm a request for another company.");
  }

  // 4. Status Validation
  if (request.status !== "ACCEPTED") {
    if (request.status === "REJECTED") {
      throw new Error("Cannot confirm booking: provider has declined this request.");
    }
    if (request.status === "CANCELLED") {
      throw new Error("Cannot confirm booking: request has been cancelled.");
    }
    if (request.status === "PENDING_PROVIDER_REVIEW") {
      throw new Error("Cannot confirm booking: waiting for provider response.");
    }
    throw new Error(`Cannot confirm booking: current request status is ${request.status}.`);
  }

  // 5. Fetch Event — Tenant Isolated
  const event = await db.orm.public.Event.where({ id: request.eventId }).first();
  if (!event || event.companyId !== user.companyId) {
    throw new Error("Event not found or access denied.");
  }

  // 6. Idempotency / Duplicate Check
  const existingBooking = await db.orm.public.Booking.where({
    eventId: event.id,
  }).first();

  if (existingBooking) {
    const existingInvoice = await db.orm.public.Invoice.where({
      bookingId: existingBooking.id,
    }).first();

    if (existingInvoice) {
      return {
        bookingId: existingBooking.id,
        eventId: event.id,
        venueId: existingBooking.venueId,
        invoiceId: existingInvoice.id,
        invoiceNumber: existingInvoice.invoiceNumber,
        totalAmount: existingInvoice.totalAmount,
        isExisting: true,
      };
    }
  }

  // 7. Fetch Venue
  const venue = await db.orm.public.Venue.where({ id: request.venueId }).first();
  if (!venue) {
    throw new Error("Selected venue not found.");
  }

  // 8. Amount Calculation
  const baseAmount = request.estimatedAmountPaise ?? event.budget;
  if (!Number.isInteger(baseAmount) || baseAmount <= 0) {
    throw new Error("Invalid booking amount. Amount must be a positive integer in paise.");
  }

  // 9. GST Calculation
  const venueCity = venue.city || "";
  const eventCity = event.city || "";
  const intraState = isIntraState(venueCity, eventCity);
  const gst = calculateGst(baseAmount, intraState);

  // 10. Atomic Mutation: Booking + Invoice + Event Status
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");

  let createdBookingId: number | undefined;
  let createdInvoiceId: number | undefined;
  let createdInvoiceNumber: string | undefined;

  try {
    await db.transaction(async (tx) => {
      // Create Booking row
      const booking = await tx.orm.public.Booking.create({
        eventId: event.id,
        venueId: request.venueId,
        amount: gst.baseAmount,
        taxAmount: gst.cgstAmount + gst.sgstAmount + gst.igstAmount,
        currency: "INR",
        paymentStatus: "PENDING",
      });

      createdBookingId = booking.id;
      createdInvoiceNumber = `INV-${y}${m}${d}-${booking.id}`;

      // Create Invoice row
      const invoice = await tx.orm.public.Invoice.create({
        invoiceNumber: createdInvoiceNumber,
        bookingId: booking.id,
        baseAmount: gst.baseAmount,
        cgstAmount: gst.cgstAmount,
        sgstAmount: gst.sgstAmount,
        igstAmount: gst.igstAmount,
        totalAmount: gst.totalAmount,
        supplierGstin: `GSTIN-VENUE-${venue.id}`,
        recipientGstin: `GSTIN-COMPANY-${user.companyId}`,
        status: "ISSUED",
        pdfUrl: null,
      });

      createdInvoiceId = invoice.id;

      // Update Event status to BOOKING_REQUESTED
      await tx.orm.public.Event.where({ id: event.id }).update({
        status: "BOOKING_REQUESTED",
      });
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("unique") || msg.includes("duplicate") || msg.includes("Booking_eventId")) {
      const dupBooking = await db.orm.public.Booking.where({ eventId: event.id }).first();
      if (dupBooking) {
        const dupInvoice = await db.orm.public.Invoice.where({ bookingId: dupBooking.id }).first();
        if (dupInvoice) {
          return {
            bookingId: dupBooking.id,
            eventId: event.id,
            venueId: dupBooking.venueId,
            invoiceId: dupInvoice.id,
            invoiceNumber: dupInvoice.invoiceNumber,
            totalAmount: dupInvoice.totalAmount,
            isExisting: true,
          };
        }
      }
    }
    throw err;
  }

  if (!createdBookingId || !createdInvoiceId || !createdInvoiceNumber) {
    throw new Error("Commercial booking confirmation failed unexpectedly.");
  }

  // 11. Revalidate Affected Routes
  revalidatePath(`/events/${event.id}`);
  revalidatePath("/events");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/finance");
  revalidatePath(`/dashboard/finance/invoices/${createdInvoiceId}`);

  return {
    bookingId: createdBookingId,
    eventId: event.id,
    venueId: request.venueId,
    invoiceId: createdInvoiceId,
    invoiceNumber: createdInvoiceNumber,
    totalAmount: gst.totalAmount,
  };
}

