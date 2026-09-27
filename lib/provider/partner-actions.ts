"use server";

import { revalidatePath } from "next/cache";
import {
  requirePartnerUser,
  assertPartnerOwnsOrg,
  advancePartnerStep,
  linkPartnerToOrg,
  submitPartnerForReview,
} from "@/lib/partner-auth";
import {
  createProviderSchema,
  createProviderContactSchema,
  createProviderVenueSchema,
  createBookableSpaceSchema,
  createOfferingSchema,
  updateAvailabilityMetadataSchema,
  updateCancellationPolicySchema,
  acceptProviderBookingRequestSchema,
  rejectProviderBookingRequestSchema,
} from "./validation";
import {
  createProviderOrganization,
  updateProviderOrganization,
  createProviderContact,
  createProviderVenue,
  createBookableSpace,
  createOffering,
  saveAvailabilityMetadata,
  saveCancellationPolicy,
  evaluateAndSyncVenueReadiness,
  acceptProviderBookingRequestRecord,
  rejectProviderBookingRequestRecord,
} from "./service";

export type ActionResult<T = unknown> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

// ─── Step 1: Create provider organisation ───────────────────────────────────

export async function partnerCreateProviderOrgAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult<{ orgId: number }>> {
  const partner = await requirePartnerUser();

  // If partner already has an org, don't allow creating another
  if (partner.providerOrgId) {
    return {
      success: false,
      error: "You already have a provider organisation linked to your account.",
    };
  }

  const rawData = {
    name: formData.get("name"),
    legalName: formData.get("legalName") || null,
    providerType: formData.get("providerType"),
    city: formData.get("city"),
    internalNotes: null, // Partners cannot set internal notes
  };

  const parsed = createProviderSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the form fields below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const org = await createProviderOrganization({
      ...parsed.data,
      // Partners start in DRAFT / NOT_STARTED — Relatia controls verification
    });

    await linkPartnerToOrg(partner.id, org.id, "ORG_ADDED");

    revalidatePath("/partners/portal");
    return {
      success: true,
      data: { orgId: org.id },
      message: `Organisation "${org.name}" created. Continue to add your first contact.`,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create organisation";
    return { success: false, error: message };
  }
}

// ─── Step 2: Add primary contact ────────────────────────────────────────────

export async function partnerCreateContactAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult<{ contactId: number }>> {
  const partner = await requirePartnerUser();

  const providerOrgId = Number(formData.get("providerOrgId"));
  assertPartnerOwnsOrg(partner, providerOrgId);

  const rawData = {
    providerOrgId,
    name: formData.get("name"),
    role: formData.get("role"),
    email: formData.get("email"),
    phone: formData.get("phone") || null,
    preferredContactMethod: formData.get("preferredContactMethod") || "EMAIL",
    category: formData.get("category") || "MANAGEMENT",
    internalNotes: null,
  };

  const parsed = createProviderContactSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the contact details below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const contact = await createProviderContact(parsed.data);

    await advancePartnerStep(partner.id, "CONTACT_ADDED");
    revalidatePath("/partners/portal");

    return {
      success: true,
      data: { contactId: contact.id },
      message: `Contact "${contact.name}" added successfully.`,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to add contact";
    return { success: false, error: message };
  }
}

// ─── Step 3: Add venue ───────────────────────────────────────────────────────

export async function partnerCreateVenueAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult<{ venueId: number }>> {
  const partner = await requirePartnerUser();

  const providerOrgId = Number(formData.get("providerOrgId"));
  assertPartnerOwnsOrg(partner, providerOrgId);

  const tagsString = formData.get("tags");
  const tags =
    typeof tagsString === "string" && tagsString.trim().length > 0
      ? tagsString
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

  const rawData = {
    providerOrgId,
    companyId: null,
    name: formData.get("name"),
    city: formData.get("city"),
    locality: formData.get("locality") || null,
    address: formData.get("address") || null,
    capacity: Number(formData.get("capacity")),
    cuisine: formData.get("cuisine"),
    priceBand: formData.get("priceBand") || "PREMIUM",
    tags,
    rating: 4.5, // Partners cannot self-assign rating
    venueType: formData.get("venueType") || "RESTAURANT",
    publicDescription: formData.get("publicDescription") || null,
    internalNotes: null,
  };

  const parsed = createProviderVenueSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the venue details below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const venue = await createProviderVenue(parsed.data);

    await advancePartnerStep(partner.id, "VENUE_ADDED");
    revalidatePath("/partners/portal");

    return {
      success: true,
      data: { venueId: venue.id },
      message: `Venue "${venue.name}" added. Your venue is in Draft — Relatia will verify it before it appears in discovery.`,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to add venue";
    return { success: false, error: message };
  }
}

// ─── Step 4: Add bookable space ──────────────────────────────────────────────

export async function partnerCreateSpaceAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult<{ spaceId: number }>> {
  const partner = await requirePartnerUser();

  const providerOrgId = Number(formData.get("providerOrgId"));
  assertPartnerOwnsOrg(partner, providerOrgId);

  const rawData = {
    venueId: Number(formData.get("venueId")),
    name: formData.get("name"),
    spaceType: formData.get("spaceType") || "PRIVATE_DINING",
    minCapacity: Number(formData.get("minCapacity")),
    maxCapacity: Number(formData.get("maxCapacity")),
    privacyLevel: formData.get("privacyLevel") || "EXCLUSIVE",
    seatedCapacity: formData.get("seatedCapacity")
      ? Number(formData.get("seatedCapacity"))
      : null,
    standingCapacity: formData.get("standingCapacity")
      ? Number(formData.get("standingCapacity"))
      : null,
    publicDescription: formData.get("publicDescription") || null,
    status: "DRAFT" as const,
    isActive: true,
    internalNotes: null,
  };

  const parsed = createBookableSpaceSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the space details below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const space = await createBookableSpace(parsed.data);
    await evaluateAndSyncVenueReadiness(parsed.data.venueId);

    await advancePartnerStep(partner.id, "SPACE_ADDED");
    revalidatePath("/partners/portal");

    return {
      success: true,
      data: { spaceId: space.id },
      message: `Space "${space.name}" added (${space.minCapacity}–${space.maxCapacity} guests).`,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to add bookable space";
    return { success: false, error: message };
  }
}

// ─── Step 5: Add offering / package ─────────────────────────────────────────

export async function partnerCreateOfferingAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult<{ offeringId: number }>> {
  const partner = await requirePartnerUser();

  const providerOrgId = Number(formData.get("providerOrgId"));
  assertPartnerOwnsOrg(partner, providerOrgId);

  const baseRupees = Number(formData.get("baseAmountRupees") || 0);
  const minSpendRupees = Number(formData.get("minimumSpendRupees") || 0);

  const rawData = {
    providerOrgId,
    venueId: formData.get("venueId") ? Number(formData.get("venueId")) : null,
    bookableSpaceId: formData.get("bookableSpaceId")
      ? Number(formData.get("bookableSpaceId"))
      : null,
    name: formData.get("name"),
    offeringType: formData.get("offeringType") || "SET_MENU",
    pricingBasis: formData.get("pricingBasis") || "PER_PERSON",
    baseAmountPaise: Math.round(baseRupees * 100),
    currency: "INR" as const,
    minimumSpendPaise: Math.round(minSpendRupees * 100),
    minGuests: formData.get("minGuests")
      ? Number(formData.get("minGuests"))
      : null,
    maxGuests: formData.get("maxGuests")
      ? Number(formData.get("maxGuests"))
      : null,
    description: formData.get("description") || null,
    dietaryNotes: formData.get("dietaryNotes") || null,
    pricingNotes: formData.get("pricingNotes") || null,
    isCustomQuote: formData.get("isCustomQuote") === "true",
    taxIncluded: formData.get("taxIncluded") === "true",
    isActive: true,
    // Partners cannot self-publish — Relatia controls discoverability
    isDiscoverable: false,
    internalNotes: null,
  };

  const parsed = createOfferingSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the package/offering details below.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const offering = await createOffering(parsed.data);
    if (parsed.data.venueId) {
      await evaluateAndSyncVenueReadiness(parsed.data.venueId);
    }

    await advancePartnerStep(partner.id, "OFFERING_ADDED");
    revalidatePath("/partners/portal");

    return {
      success: true,
      data: { offeringId: offering.id },
      message: `Package "${offering.name}" added.`,
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to add package";
    return { success: false, error: message };
  }
}

// ─── Step 6: Availability notes ─────────────────────────────────────────────

export async function partnerUpdateAvailabilityAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const partner = await requirePartnerUser();

  const providerOrgId = Number(formData.get("providerOrgId"));
  assertPartnerOwnsOrg(partner, providerOrgId);

  const rawData = {
    venueId: Number(formData.get("venueId")),
    requiresManualConfirmation:
      formData.get("requiresManualConfirmation") !== "false",
    operatingDaysNotes: formData.get("operatingDaysNotes") || null,
    leadTimeHours: Number(formData.get("leadTimeHours") || 48),
    availabilityNotes: formData.get("availabilityNotes") || null,
    internalNotes: null,
  };

  const parsed = updateAvailabilityMetadataSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the availability fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await saveAvailabilityMetadata(parsed.data.venueId, parsed.data);
    await evaluateAndSyncVenueReadiness(parsed.data.venueId);
    revalidatePath("/partners/portal");

    return {
      success: true,
      data: null,
      message: "Availability information updated.",
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to update availability";
    return { success: false, error: message };
  }
}

// ─── Step 7: Cancellation policy ────────────────────────────────────────────

export async function partnerUpdateCancellationAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const partner = await requirePartnerUser();

  const providerOrgId = Number(formData.get("providerOrgId"));
  assertPartnerOwnsOrg(partner, providerOrgId);

  const rawData = {
    venueId: Number(formData.get("venueId")),
    summary: formData.get("summary"),
    cutoffHours: Number(formData.get("cutoffHours") || 48),
    cutoffNotes: formData.get("cutoffNotes") || null,
    depositRequired: formData.get("depositRequired") === "true",
    depositPercent: Number(formData.get("depositPercent") || 0),
    internalNotes: null,
  };

  const parsed = updateCancellationPolicySchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the cancellation policy fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await saveCancellationPolicy(parsed.data.venueId, parsed.data);
    revalidatePath("/partners/portal");

    return {
      success: true,
      data: null,
      message: "Cancellation policy saved.",
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to save cancellation policy";
    return { success: false, error: message };
  }
}

// ─── Final: Submit profile for Relatia review ────────────────────────────────

export async function partnerSubmitForReviewAction(): Promise<ActionResult> {
  const partner = await requirePartnerUser();

  if (!partner.providerOrgId) {
    return {
      success: false,
      error:
        "You must complete your organisation profile before submitting for review.",
    };
  }

  if (partner.submittedAt) {
    return {
      success: false,
      error: "Your profile has already been submitted for review.",
    };
  }

  // Partner must have at least reached OFFERING_ADDED
  const stepOrder: Array<typeof partner.onboardingStep> = [
    "ACCOUNT_CREATED",
    "ORG_ADDED",
    "CONTACT_ADDED",
    "VENUE_ADDED",
    "SPACE_ADDED",
    "OFFERING_ADDED",
    "SUBMITTED",
  ];

  const currentIndex = stepOrder.indexOf(partner.onboardingStep);
  if (currentIndex < stepOrder.indexOf("OFFERING_ADDED")) {
    return {
      success: false,
      error:
        "Please complete all required profile steps before submitting for review.",
    };
  }

  try {
    // Update the ProviderOrganization status to PENDING_VERIFICATION
    await updateProviderOrganization(partner.providerOrgId, {
      status: "PENDING_VERIFICATION",
      onboardingStatus: "REVIEW_REQUIRED",
    });

    await submitPartnerForReview(partner.id);
    revalidatePath("/partners/portal");

    return {
      success: true,
      data: null,
      message:
        "Your profile has been submitted for Relatia review. We will be in touch within 2–3 business days.",
    };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to submit for review";
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Partner Booking Request Actions (Day 20 Step 1)
// ---------------------------------------------------------------------------

export async function partnerAcceptBookingRequestAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult<{ requestId: number }>> {
  const partner = await requirePartnerUser();

  if (!partner.providerOrgId) {
    return {
      success: false,
      error: "You must be linked to a verified provider organization to accept booking requests.",
    };
  }

  const rawData = {
    requestId: Number(formData.get("requestId")),
    providerResponseNote: formData.get("providerResponseNote")
      ? String(formData.get("providerResponseNote")).trim()
      : null,
  };

  const parsed = acceptProviderBookingRequestSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid request parameters.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const record = await acceptProviderBookingRequestRecord(
      parsed.data.requestId,
      {
        id: partner.id,
        providerOrgId: partner.providerOrgId,
      },
      parsed.data.providerResponseNote,
    );

    revalidatePath("/partners/portal");
    revalidatePath("/partners/portal/inbox");
    revalidatePath(`/partners/portal/inbox/${record.id}`);
    revalidatePath(`/events/${record.eventId}`);

    return {
      success: true,
      data: { requestId: record.id },
      message: "Booking request accepted successfully.",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to accept booking request.";
    return { success: false, error: message };
  }
}

export async function partnerRejectBookingRequestAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult<{ requestId: number }>> {
  const partner = await requirePartnerUser();

  if (!partner.providerOrgId) {
    return {
      success: false,
      error: "You must be linked to a verified provider organization to decline booking requests.",
    };
  }

  const rawData = {
    requestId: Number(formData.get("requestId")),
    rejectionReason: String(formData.get("rejectionReason") || "").trim(),
  };

  const parsed = rejectProviderBookingRequestSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please provide a reason for declining this request.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const record = await rejectProviderBookingRequestRecord(
      parsed.data.requestId,
      {
        id: partner.id,
        providerOrgId: partner.providerOrgId,
      },
      parsed.data.rejectionReason,
    );

    revalidatePath("/partners/portal");
    revalidatePath("/partners/portal/inbox");
    revalidatePath(`/partners/portal/inbox/${record.id}`);
    revalidatePath(`/events/${record.eventId}`);

    return {
      success: true,
      data: { requestId: record.id },
      message: "Booking request declined.",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to decline booking request.";
    return { success: false, error: message };
  }
}


