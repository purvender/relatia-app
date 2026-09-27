"use server";

import { revalidatePath } from "next/cache";
import { requirePlatformAdmin, requireAppUser } from "@/lib/auth";
import {
  createProviderSchema,
  updateProviderSchema,
  createProviderContactSchema,
  updateProviderContactSchema,
  createProviderDocumentSchema,
  createProviderVenueSchema,
  updateProviderVenueSchema,
  createBookableSpaceSchema,
  updateBookableSpaceSchema,
  createOfferingSchema,
  updateOfferingSchema,
  updateAvailabilityMetadataSchema,
  updateCancellationPolicySchema,
  recordVerificationSchema,
  venueVisibilityEnum,
  createProviderBookingRequestSchema,
  cancelProviderBookingRequestSchema,
} from "./validation";
import {
  createProviderOrganization,
  updateProviderOrganization,
  createProviderContact,
  updateProviderContact,
  toggleProviderContact,
  createProviderDocument,
  createProviderVenue,
  updateProviderVenue,
  createBookableSpace,
  updateBookableSpace,
  toggleBookableSpace,
  createOffering,
  updateOffering,
  toggleOffering,
  saveAvailabilityMetadata,
  saveCancellationPolicy,
  recordVerification,
  evaluateAndSyncVenueReadiness,
  updateVenueVisibility,
  createProviderBookingRequestRecord,
  cancelProviderBookingRequestRecord,
} from "./service";

export type ActionResult<T = unknown> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function createProviderAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const rawData = {
    name: formData.get("name"),
    legalName: formData.get("legalName") || null,
    providerType: formData.get("providerType"),
    city: formData.get("city"),
    internalNotes: formData.get("internalNotes") || null,
  };

  const parsed = createProviderSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed. Please check the form fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const org = await createProviderOrganization(parsed.data);
    revalidatePath("/dashboard/admin/providers");
    return {
      success: true,
      data: org,
      message: `Created provider organization "${org.name}"`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create provider organization";
    return { success: false, error: message };
  }
}

export async function updateProviderAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const rawData = {
    id: Number(formData.get("id")),
    name: formData.get("name") || undefined,
    legalName: formData.get("legalName") !== null ? (formData.get("legalName") as string) : undefined,
    providerType: formData.get("providerType") || undefined,
    city: formData.get("city") || undefined,
    status: formData.get("status") || undefined,
    onboardingStatus: formData.get("onboardingStatus") || undefined,
    internalNotes: formData.get("internalNotes") !== null ? (formData.get("internalNotes") as string) : undefined,
  };

  const parsed = updateProviderSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on provider fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const updated = await updateProviderOrganization(parsed.data.id, parsed.data);
    revalidatePath(`/dashboard/admin/providers/${parsed.data.id}`);
    revalidatePath("/dashboard/admin/providers");
    return {
      success: true,
      data: updated,
      message: `Updated provider organization "${updated?.name ?? ""}"`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update provider organization";
    return { success: false, error: message };
  }
}

export async function createProviderContactAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const rawData = {
    providerOrgId: Number(formData.get("providerOrgId")),
    name: formData.get("name"),
    role: formData.get("role"),
    email: formData.get("email"),
    phone: formData.get("phone") || null,
    preferredContactMethod: formData.get("preferredContactMethod") || "EMAIL",
    category: formData.get("category") || "GENERAL",
    internalNotes: formData.get("internalNotes") || null,
  };

  const parsed = createProviderContactSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on contact fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const contact = await createProviderContact(parsed.data);
    revalidatePath(`/dashboard/admin/providers/${parsed.data.providerOrgId}`);
    return {
      success: true,
      data: contact,
      message: `Added contact ${contact.name} (${contact.role})`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create provider contact";
    return { success: false, error: message };
  }
}

export async function updateProviderContactAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const providerOrgId = formData.get("providerOrgId") ? Number(formData.get("providerOrgId")) : undefined;
  const rawData = {
    id: Number(formData.get("id")),
    providerOrgId,
    name: formData.get("name") || undefined,
    role: formData.get("role") || undefined,
    email: formData.get("email") || undefined,
    phone: formData.get("phone") !== null ? (formData.get("phone") as string) : undefined,
    preferredContactMethod: formData.get("preferredContactMethod") || undefined,
    category: formData.get("category") || undefined,
    isActive: formData.get("isActive") !== null ? formData.get("isActive") === "true" : undefined,
    internalNotes: formData.get("internalNotes") !== null ? (formData.get("internalNotes") as string) : undefined,
  };

  const parsed = updateProviderContactSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on contact fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const updated = await updateProviderContact(parsed.data.id, parsed.data);
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    return {
      success: true,
      data: updated,
      message: `Updated contact ${updated?.name ?? ""}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update provider contact";
    return { success: false, error: message };
  }
}

export async function toggleProviderContactAction(
  contactId: number,
  isActive: boolean,
  providerOrgId?: number,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  try {
    const updated = await toggleProviderContact(contactId, isActive);
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    return {
      success: true,
      data: updated,
      message: `Contact ${isActive ? "activated" : "deactivated"} successfully.`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle contact status";
    return { success: false, error: message };
  }
}

export async function createProviderDocumentAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const rawData = {
    providerOrgId: Number(formData.get("providerOrgId")),
    docType: formData.get("docType"),
    title: formData.get("title"),
    fileReference: formData.get("fileReference"),
    isInternalOnly: formData.get("isInternalOnly") !== "false",
    internalNotes: formData.get("internalNotes") || null,
  };

  const parsed = createProviderDocumentSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on document fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const doc = await createProviderDocument(parsed.data);
    revalidatePath(`/dashboard/admin/providers/${parsed.data.providerOrgId}`);
    return {
      success: true,
      data: doc,
      message: `Uploaded document metadata "${doc.title}"`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save document metadata";
    return { success: false, error: message };
  }
}

export async function createProviderVenueAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const tagsString = formData.get("tags");
  const tags = typeof tagsString === "string" && tagsString.trim().length > 0
    ? tagsString.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const rawData = {
    providerOrgId: Number(formData.get("providerOrgId")),
    companyId: formData.get("companyId") ? Number(formData.get("companyId")) : null,
    name: formData.get("name"),
    city: formData.get("city"),
    locality: formData.get("locality") || null,
    address: formData.get("address") || null,
    capacity: Number(formData.get("capacity")),
    cuisine: formData.get("cuisine"),
    priceBand: formData.get("priceBand") || "PREMIUM",
    tags,
    rating: formData.get("rating") ? Number(formData.get("rating")) : 4.8,
    venueType: formData.get("venueType") || "RESTAURANT",
    publicDescription: formData.get("publicDescription") || null,
    internalNotes: formData.get("internalNotes") || null,
  };

  const parsed = createProviderVenueSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on venue fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const venue = await createProviderVenue(parsed.data);
    revalidatePath(`/dashboard/admin/providers/${parsed.data.providerOrgId}`);
    revalidatePath("/venues");
    return {
      success: true,
      data: venue,
      message: `Created venue "${venue.name}" in ${venue.city}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create venue";
    return { success: false, error: message };
  }
}

export async function updateProviderVenueAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const providerOrgId = formData.get("providerOrgId") ? Number(formData.get("providerOrgId")) : undefined;
  const tagsString = formData.get("tags");
  const tags = typeof tagsString === "string" && tagsString.trim().length > 0
    ? tagsString.split(",").map((t) => t.trim()).filter(Boolean)
    : undefined;

  const rawData = {
    id: Number(formData.get("id")),
    providerOrgId,
    name: formData.get("name") || undefined,
    city: formData.get("city") || undefined,
    locality: formData.get("locality") !== null ? (formData.get("locality") as string) : undefined,
    address: formData.get("address") !== null ? (formData.get("address") as string) : undefined,
    capacity: formData.get("capacity") ? Number(formData.get("capacity")) : undefined,
    cuisine: formData.get("cuisine") || undefined,
    priceBand: formData.get("priceBand") || undefined,
    tags,
    rating: formData.get("rating") ? Number(formData.get("rating")) : undefined,
    venueType: formData.get("venueType") || undefined,
    active: formData.get("active") !== null ? formData.get("active") === "true" : undefined,
    visibility: formData.get("visibility") || undefined,
    verificationStatus: formData.get("verificationStatus") || undefined,
    publicDescription: formData.get("publicDescription") !== null ? (formData.get("publicDescription") as string) : undefined,
    internalNotes: formData.get("internalNotes") !== null ? (formData.get("internalNotes") as string) : undefined,
  };

  const parsed = updateProviderVenueSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on venue fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const venue = await updateProviderVenue(parsed.data.id, parsed.data);
    await evaluateAndSyncVenueReadiness(parsed.data.id);
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    revalidatePath("/venues");
    return {
      success: true,
      data: venue,
      message: `Updated venue "${venue?.name ?? ""}"`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update venue";
    return { success: false, error: message };
  }
}

export async function createBookableSpaceAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const providerOrgId = formData.get("providerOrgId") ? Number(formData.get("providerOrgId")) : null;

  const rawData = {
    venueId: Number(formData.get("venueId")),
    name: formData.get("name"),
    spaceType: formData.get("spaceType") || "PRIVATE_DINING",
    minCapacity: Number(formData.get("minCapacity")),
    maxCapacity: Number(formData.get("maxCapacity")),
    privacyLevel: formData.get("privacyLevel") || "EXCLUSIVE",
    seatedCapacity: formData.get("seatedCapacity") ? Number(formData.get("seatedCapacity")) : null,
    standingCapacity: formData.get("standingCapacity") ? Number(formData.get("standingCapacity")) : null,
    publicDescription: formData.get("publicDescription") || null,
    status: formData.get("status") || "ACTIVE",
    isActive: true,
    internalNotes: formData.get("internalNotes") || null,
  };

  const parsed = createBookableSpaceSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on BookableSpace fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const space = await createBookableSpace(parsed.data);
    await evaluateAndSyncVenueReadiness(parsed.data.venueId);
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    revalidatePath("/venues");
    return {
      success: true,
      data: space,
      message: `Added bookable space "${space.name}" (${space.minCapacity}–${space.maxCapacity} guests)`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create bookable space";
    return { success: false, error: message };
  }
}

export async function updateBookableSpaceAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const providerOrgId = formData.get("providerOrgId") ? Number(formData.get("providerOrgId")) : null;
  const venueId = Number(formData.get("venueId"));

  const rawData = {
    id: Number(formData.get("id")),
    name: formData.get("name") || undefined,
    spaceType: formData.get("spaceType") || undefined,
    minCapacity: formData.get("minCapacity") ? Number(formData.get("minCapacity")) : undefined,
    maxCapacity: formData.get("maxCapacity") ? Number(formData.get("maxCapacity")) : undefined,
    privacyLevel: formData.get("privacyLevel") !== null ? (formData.get("privacyLevel") as string) : undefined,
    seatedCapacity: formData.get("seatedCapacity") ? Number(formData.get("seatedCapacity")) : undefined,
    standingCapacity: formData.get("standingCapacity") ? Number(formData.get("standingCapacity")) : undefined,
    publicDescription: formData.get("publicDescription") !== null ? (formData.get("publicDescription") as string) : undefined,
    status: formData.get("status") || undefined,
    isActive: formData.get("isActive") !== null ? formData.get("isActive") === "true" : undefined,
    internalNotes: formData.get("internalNotes") !== null ? (formData.get("internalNotes") as string) : undefined,
  };

  const parsed = updateBookableSpaceSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on bookable space fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const updated = await updateBookableSpace(parsed.data.id, parsed.data);
    if (venueId) {
      await evaluateAndSyncVenueReadiness(venueId);
    }
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    revalidatePath("/venues");
    return {
      success: true,
      data: updated,
      message: `Updated bookable space "${updated?.name ?? ""}"`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update bookable space";
    return { success: false, error: message };
  }
}

export async function toggleBookableSpaceAction(
  spaceId: number,
  isActive: boolean,
  venueId: number,
  providerOrgId?: number,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  try {
    const updated = await toggleBookableSpace(spaceId, isActive);
    if (venueId) {
      await evaluateAndSyncVenueReadiness(venueId);
    }
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    revalidatePath("/venues");
    return {
      success: true,
      data: updated,
      message: `Bookable space ${isActive ? "activated" : "deactivated"} successfully.`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle bookable space status";
    return { success: false, error: message };
  }
}

export async function createOfferingAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const providerOrgId = formData.get("providerOrgId") ? Number(formData.get("providerOrgId")) : null;
  const baseRupees = Number(formData.get("baseAmountRupees") || 0);
  const minSpendRupees = Number(formData.get("minimumSpendRupees") || 0);

  const rawData = {
    providerOrgId,
    venueId: formData.get("venueId") ? Number(formData.get("venueId")) : null,
    bookableSpaceId: formData.get("bookableSpaceId") ? Number(formData.get("bookableSpaceId")) : null,
    name: formData.get("name"),
    offeringType: formData.get("offeringType") || "SET_MENU",
    pricingBasis: formData.get("pricingBasis") || "PER_PERSON",
    baseAmountPaise: Math.round(baseRupees * 100),
    currency: "INR" as const,
    minimumSpendPaise: Math.round(minSpendRupees * 100),
    minGuests: formData.get("minGuests") ? Number(formData.get("minGuests")) : null,
    maxGuests: formData.get("maxGuests") ? Number(formData.get("maxGuests")) : null,
    description: formData.get("description") || null,
    dietaryNotes: formData.get("dietaryNotes") || null,
    pricingNotes: formData.get("pricingNotes") || null,
    isCustomQuote: formData.get("isCustomQuote") === "true",
    taxIncluded: formData.get("taxIncluded") === "true",
    isActive: true,
    isDiscoverable: true,
    internalNotes: formData.get("internalNotes") || null,
  };

  const parsed = createOfferingSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on offering fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const offering = await createOffering(parsed.data);
    if (parsed.data.venueId) {
      await evaluateAndSyncVenueReadiness(parsed.data.venueId);
    }
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    revalidatePath("/venues");
    return {
      success: true,
      data: offering,
      message: `Added offering / package "${offering.name}"`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create offering";
    return { success: false, error: message };
  }
}

export async function updateOfferingAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const providerOrgId = formData.get("providerOrgId") ? Number(formData.get("providerOrgId")) : null;
  const venueId = formData.get("venueId") ? Number(formData.get("venueId")) : null;

  const baseRupeesStr = formData.get("baseAmountRupees");
  const minSpendRupeesStr = formData.get("minimumSpendRupees");

  const rawData = {
    id: Number(formData.get("id")),
    bookableSpaceId: formData.get("bookableSpaceId") ? Number(formData.get("bookableSpaceId")) : null,
    name: formData.get("name") || undefined,
    offeringType: formData.get("offeringType") || undefined,
    pricingBasis: formData.get("pricingBasis") || undefined,
    baseAmountPaise: baseRupeesStr !== null && baseRupeesStr !== "" ? Math.round(Number(baseRupeesStr) * 100) : undefined,
    currency: "INR" as const,
    minimumSpendPaise: minSpendRupeesStr !== null && minSpendRupeesStr !== "" ? Math.round(Number(minSpendRupeesStr) * 100) : undefined,
    minGuests: formData.get("minGuests") ? Number(formData.get("minGuests")) : undefined,
    maxGuests: formData.get("maxGuests") ? Number(formData.get("maxGuests")) : undefined,
    description: formData.get("description") !== null ? (formData.get("description") as string) : undefined,
    dietaryNotes: formData.get("dietaryNotes") !== null ? (formData.get("dietaryNotes") as string) : undefined,
    pricingNotes: formData.get("pricingNotes") !== null ? (formData.get("pricingNotes") as string) : undefined,
    isCustomQuote: formData.get("isCustomQuote") !== null ? formData.get("isCustomQuote") === "true" : undefined,
    taxIncluded: formData.get("taxIncluded") !== null ? formData.get("taxIncluded") === "true" : undefined,
    isActive: formData.get("isActive") !== null ? formData.get("isActive") === "true" : undefined,
    isDiscoverable: formData.get("isDiscoverable") !== null ? formData.get("isDiscoverable") === "true" : undefined,
    internalNotes: formData.get("internalNotes") !== null ? (formData.get("internalNotes") as string) : undefined,
  };

  const parsed = updateOfferingSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on offering fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const updated = await updateOffering(parsed.data.id, parsed.data);
    if (venueId) {
      await evaluateAndSyncVenueReadiness(venueId);
    }
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    revalidatePath("/venues");
    return {
      success: true,
      data: updated,
      message: `Updated offering "${updated?.name ?? ""}"`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update offering";
    return { success: false, error: message };
  }
}

export async function toggleOfferingAction(
  offeringId: number,
  isActive: boolean,
  venueId?: number,
  providerOrgId?: number,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  try {
    const updated = await toggleOffering(offeringId, isActive);
    if (venueId) {
      await evaluateAndSyncVenueReadiness(venueId);
    }
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    revalidatePath("/venues");
    return {
      success: true,
      data: updated,
      message: `Offering ${isActive ? "activated" : "deactivated"} successfully.`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to toggle offering status";
    return { success: false, error: message };
  }
}

export async function updateAvailabilityAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const providerOrgId = formData.get("providerOrgId") ? Number(formData.get("providerOrgId")) : null;
  const rawData = {
    venueId: Number(formData.get("venueId")),
    requiresManualConfirmation: formData.get("requiresManualConfirmation") !== "false",
    operatingDaysNotes: formData.get("operatingDaysNotes") || null,
    leadTimeHours: Number(formData.get("leadTimeHours") || 24),
    availabilityNotes: formData.get("availabilityNotes") || null,
    internalNotes: formData.get("internalNotes") || null,
  };

  const parsed = updateAvailabilityMetadataSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on availability fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const avail = await saveAvailabilityMetadata(parsed.data.venueId, parsed.data);
    await evaluateAndSyncVenueReadiness(parsed.data.venueId);
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    return {
      success: true,
      data: avail,
      message: "Availability terms updated successfully.",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update availability metadata";
    return { success: false, error: message };
  }
}

export async function updateCancellationPolicyAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const providerOrgId = formData.get("providerOrgId") ? Number(formData.get("providerOrgId")) : null;
  const rawData = {
    venueId: Number(formData.get("venueId")),
    summary: formData.get("summary"),
    cutoffHours: Number(formData.get("cutoffHours") || 48),
    cutoffNotes: formData.get("cutoffNotes") || null,
    depositRequired: formData.get("depositRequired") === "true",
    depositPercent: Number(formData.get("depositPercent") || 0),
    internalNotes: formData.get("internalNotes") || null,
  };

  const parsed = updateCancellationPolicySchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on cancellation policy fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const policy = await saveCancellationPolicy(parsed.data.venueId, parsed.data);
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    return {
      success: true,
      data: policy,
      message: "Cancellation policy updated successfully.",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update cancellation policy";
    return { success: false, error: message };
  }
}

export async function recordVerificationAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  const user = await requirePlatformAdmin();

  const providerOrgId = formData.get("providerOrgId") ? Number(formData.get("providerOrgId")) : null;
  const venueId = formData.get("venueId") ? Number(formData.get("venueId")) : null;

  const rawData = {
    providerOrgId,
    venueId,
    status: formData.get("status"),
    verifiedBy: user.email,
    verificationSource: formData.get("verificationSource") || "INTERNAL_OPERATIONS_AUDIT",
    notes: formData.get("notes") || null,
  };

  const parsed = recordVerificationSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed on verification fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const record = await recordVerification(parsed.data);
    if (venueId) {
      await evaluateAndSyncVenueReadiness(venueId);
    }
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    revalidatePath("/venues");
    return {
      success: true,
      data: record,
      message: `Recorded verification status as ${record.status}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to record verification";
    return { success: false, error: message };
  }
}

export async function syncVenueReadinessAction(
  venueId: number,
  providerOrgId?: number,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  try {
    const evaluation = await evaluateAndSyncVenueReadiness(venueId);
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    revalidatePath("/venues");
    return {
      success: true,
      data: evaluation,
      message: evaluation.isEligible
        ? "Venue is verified and eligible for enterprise discovery."
        : `Discovery readiness score: ${evaluation.score}%. Blockers: ${evaluation.blockers.join(", ")}`,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to evaluate readiness";
    return { success: false, error: message };
  }
}

export async function updateVenueVisibilityAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult> {
  await requirePlatformAdmin();

  const rawVenueId = Number(formData.get("venueId"));
  const rawVisibility = formData.get("visibility");
  const providerOrgId = formData.get("providerOrgId")
    ? Number(formData.get("providerOrgId"))
    : null;

  const venueIdParsed = rawVenueId > 0 ? rawVenueId : null;
  if (!venueIdParsed) {
    return { success: false, error: "A valid venue ID is required." };
  }

  const visibilityParsed = venueVisibilityEnum.safeParse(rawVisibility);
  if (!visibilityParsed.success) {
    return {
      success: false,
      error: `Invalid visibility value. Must be one of: DRAFT, INTERNAL_ONLY, DISCOVERABLE, PAUSED, ARCHIVED.`,
    };
  }

  try {
    await updateVenueVisibility(venueIdParsed, visibilityParsed.data);
    const evaluation = await evaluateAndSyncVenueReadiness(venueIdParsed);
    if (providerOrgId) {
      revalidatePath(`/dashboard/admin/providers/${providerOrgId}`);
    }
    revalidatePath("/venues");
    revalidatePath(`/venues/${venueIdParsed}`);

    const feedbackMsg =
      visibilityParsed.data === "DISCOVERABLE"
        ? evaluation.isEligible
          ? "Venue is now Published & Live in Enterprise Discovery."
          : "Visibility set to Discoverable, but discovery is blocked until setup steps are resolved."
        : visibilityParsed.data === "INTERNAL_ONLY"
        ? "Venue visibility set to Internal Only (hidden from discovery)."
        : visibilityParsed.data === "PAUSED"
        ? "Venue is now Paused (hidden from discovery)."
        : visibilityParsed.data === "ARCHIVED"
        ? "Venue is now Archived."
        : "Venue visibility set to Draft.";

    return {
      success: true,
      data: { venueId: venueIdParsed, visibility: visibilityParsed.data, isEligible: evaluation.isEligible },
      message: feedbackMsg,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update venue visibility";
    return { success: false, error: message };
  }
}

// ---------------------------------------------------------------------------
// Enterprise Provider Booking Request Actions (Day 20 Step 1)
// ---------------------------------------------------------------------------

export async function createProviderBookingRequestAction(
  prevState: unknown,
  formData: FormData,
): Promise<ActionResult<{ requestId: number }>> {
  const user = await requireAppUser();

  const rawData = {
    eventId: Number(formData.get("eventId")),
    venueId: Number(formData.get("venueId")),
    bookableSpaceId: formData.get("bookableSpaceId")
      ? Number(formData.get("bookableSpaceId"))
      : null,
    offeringId: formData.get("offeringId")
      ? Number(formData.get("offeringId"))
      : null,
    requestedDateTime: String(formData.get("requestedDateTime") || "").trim(),
    attendees: Number(formData.get("attendees")),
    estimatedAmountPaise: formData.get("estimatedAmountPaise")
      ? Number(formData.get("estimatedAmountPaise"))
      : null,
    dietaryNotes: formData.get("dietaryNotes")
      ? String(formData.get("dietaryNotes")).trim()
      : null,
    operationalNotes: formData.get("operationalNotes")
      ? String(formData.get("operationalNotes")).trim()
      : null,
  };

  const parsed = createProviderBookingRequestSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the booking request details.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const record = await createProviderBookingRequestRecord(parsed.data, {
      id: user.id,
      companyId: user.companyId,
      role: user.role,
    });

    revalidatePath(`/events/${parsed.data.eventId}`);
    revalidatePath("/events");
    revalidatePath("/partners/portal");

    return {
      success: true,
      data: { requestId: record.id },
      message: "Your booking request has been submitted to the partner.",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to submit booking request.";
    return { success: false, error: message };
  }
}

export async function cancelProviderBookingRequestAction(
  requestId: number,
): Promise<ActionResult<{ requestId: number }>> {
  const user = await requireAppUser();

  const parsed = cancelProviderBookingRequestSchema.safeParse({ requestId });
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid request ID.",
    };
  }

  try {
    const record = await cancelProviderBookingRequestRecord(parsed.data.requestId, {
      id: user.id,
      companyId: user.companyId,
    });

    revalidatePath(`/events/${record.eventId}`);
    revalidatePath("/events");
    revalidatePath("/partners/portal");

    return {
      success: true,
      data: { requestId: record.id },
      message: "The booking request has been cancelled.",
    };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to cancel booking request.";
    return { success: false, error: message };
  }
}

