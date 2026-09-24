import "server-only";

import { revalidatePath } from "next/cache";
import { requireAppUser } from "@/lib/auth";
import { db } from "@/prisma/db";
import { canSubmitEvent } from "@/lib/events/can-submit-event";
import { createEventApprovals } from "@/lib/events/create-event-approvals";

export type SubmitEventResult = {
  success: true;
  eventId: number;
  newStatus: "REQUESTED";
  approverCount: number;
};

/**
 * Server-side domain orchestrator to submit a DRAFT event for approval.
 * Enforces company scoping, authorization, policy validation, approval creation, and status transition.
 */
export async function submitEventForApproval(
  eventId: number,
): Promise<SubmitEventResult> {
  const user = await requireAppUser();

  const event = await db.orm.public.Event.where({ id: eventId }).first();

  if (!event || event.companyId !== user.companyId) {
    throw new Error("Event not found or access denied.");
  }

  const check = canSubmitEvent(event, user);
  if (!check.canSubmit) {
    throw new Error(check.reason);
  }

  // Create approval records based on company policy
  const { approverIds } = await createEventApprovals(eventId, user.companyId);

  // Transition event status from DRAFT -> REQUESTED
  await db.orm.public.Event.where({ id: eventId }).update({
    status: "REQUESTED",
  });

  revalidatePath(`/events/${eventId}`);
  revalidatePath("/events");
  revalidatePath("/dashboard");

  return {
    success: true,
    eventId,
    newStatus: "REQUESTED",
    approverCount: approverIds.length,
  };
}
