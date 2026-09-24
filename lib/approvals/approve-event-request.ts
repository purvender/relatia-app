import "server-only";

import { revalidatePath } from "next/cache";
import { db } from "@/prisma/db";
import type { AppUserWithCompany } from "@/lib/auth";

export type ApproveResult = {
  success: true;
  approvalId: number;
  eventId: number;
  eventStatus: string;
};

type ApproveParams = {
  approvalId: number;
  user: AppUserWithCompany;
};

/**
 * Server-side domain logic to approve an event request.
 * Enforces company scoping, approver authorization, PENDING status validation,
 * and updates both Approval and Event statuses cleanly.
 */
export async function approveEventRequest({
  approvalId,
  user,
}: ApproveParams): Promise<ApproveResult> {
  if (user.role !== "APPROVER" && user.role !== "ADMIN") {
    throw new Error("Unauthorized: Only approvers or admins can approve event requests.");
  }

  const approval = await db.orm.public.Approval.where({ id: approvalId }).first();

  if (!approval) {
    throw new Error("Approval record not found.");
  }

  if (approval.status !== "PENDING") {
    throw new Error(
      `Cannot approve request: Approval is currently in '${approval.status}' status.`,
    );
  }

  const event = await db.orm.public.Event.where({ id: approval.eventId }).first();

  if (!event || event.companyId !== user.companyId) {
    throw new Error("Event not found or access denied.");
  }

  // Non-ADMIN approver can only act on approvals assigned to them
  if (user.role !== "ADMIN" && approval.approverId !== user.id) {
    throw new Error("Unauthorized: You are not assigned to approve this request.");
  }

  // Update approval status to APPROVED
  await db.orm.public.Approval.where({ id: approvalId }).update({
    status: "APPROVED",
  });

  // Check all approvals for this event to determine if event can transition to APPROVED
  const allApprovals = await db.orm.public.Approval.where({
    eventId: event.id,
  }).all();

  const allApproved = allApprovals.every((appr) =>
    appr.id === approvalId ? true : appr.status === "APPROVED",
  );

  let newEventStatus = event.status;
  if (allApproved) {
    newEventStatus = "APPROVED";
    await db.orm.public.Event.where({ id: event.id }).update({
      status: "APPROVED",
    });
  }

  revalidatePath(`/events/${event.id}`);
  revalidatePath("/events");
  revalidatePath("/dashboard/approvals");
  revalidatePath("/dashboard");

  return {
    success: true,
    approvalId,
    eventId: event.id,
    eventStatus: newEventStatus,
  };
}
