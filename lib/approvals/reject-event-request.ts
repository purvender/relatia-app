import "server-only";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import type { AppUserWithCompany } from "@/lib/auth";

export type RejectResult = {
  success: true;
  approvalId: number;
  eventId: number;
  eventStatus: "REJECTED";
};

type RejectParams = {
  approvalId: number;
  reason?: string;
  user: AppUserWithCompany;
};

/**
 * Server-side domain logic to reject an event request.
 * Enforces company scoping, approver authorization, PENDING status validation,
 * and updates both Approval and Event statuses to REJECTED.
 */
export async function rejectEventRequest({
  approvalId,
  reason,
  user,
}: RejectParams): Promise<RejectResult> {
  if (user.role !== "APPROVER" && user.role !== "COMPANY_ADMIN" && user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only approvers or admins can reject event requests.");
  }

  const approval = await db.orm.public.Approval.where({ id: approvalId }).first();

  if (!approval) {
    throw new Error("Approval record not found.");
  }

  if (approval.status !== "PENDING") {
    throw new Error(
      `Cannot reject request: Approval is currently in '${approval.status}' status.`,
    );
  }

  const event = await db.orm.public.Event.where({ id: approval.eventId }).first();

  if (!event || event.companyId !== user.companyId) {
    throw new Error("Event not found or access denied.");
  }

  // Non-admin approver can only act on approvals assigned to them
  const isAdmin = user.role === "COMPANY_ADMIN" || user.role === "ADMIN";
  if (!isAdmin && approval.approverId !== user.id) {
    throw new Error("Unauthorized: You are not assigned to reject this request.");
  }

  const rejectionReason = reason?.trim() || "Request rejected by approver.";

  // Update approval status to REJECTED with reason
  await db.orm.public.Approval.where({ id: approvalId }).update({
    status: "REJECTED",
    reason: rejectionReason,
  });

  // Update event status to REJECTED
  await db.orm.public.Event.where({ id: event.id }).update({
    status: "REJECTED",
  });

  revalidatePath(`/events/${event.id}`);
  revalidatePath("/events");
  revalidatePath("/dashboard/approvals");
  revalidatePath("/dashboard");

  return {
    success: true,
    approvalId,
    eventId: event.id,
    eventStatus: "REJECTED",
  };
}
