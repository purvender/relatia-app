"use server";

import { requireAppUser } from "@/lib/auth";
import { approveEventRequest } from "@/lib/approvals/approve-event-request";
import { rejectEventRequest } from "@/lib/approvals/reject-event-request";

export async function approveEventAction(approvalId: number) {
  if (!Number.isInteger(approvalId) || approvalId <= 0) {
    throw new Error("Invalid approval ID.");
  }
  const user = await requireAppUser();
  return await approveEventRequest({ approvalId, user });
}

export async function rejectEventAction(approvalId: number, reason?: string) {
  if (!Number.isInteger(approvalId) || approvalId <= 0) {
    throw new Error("Invalid approval ID.");
  }
  const user = await requireAppUser();
  return await rejectEventRequest({ approvalId, reason, user });
}
