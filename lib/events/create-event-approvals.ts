import "server-only";

import { db } from "@/prisma/db";

export type CreateApprovalsResult = {
  createdCount: number;
  approverIds: number[];
};

/**
 * Resolves eligible approvers based on company policy and creates Approval records for an event.
 * Ensures idempotency by checking existing approval records to prevent duplicate creation.
 */
export async function createEventApprovals(
  eventId: number,
  companyId: number,
): Promise<CreateApprovalsResult> {
  const policy = await db.orm.public.Policy.where({ companyId }).first();

  if (!policy) {
    throw new Error(
      "No company policy found. Please configure policy before submitting events for approval.",
    );
  }

  const approverRole = policy.approverRole;

  // Find all active users in the company matching the policy's approver role
  const approverUsers = await db.orm.public.User.where({
    companyId,
    role: approverRole,
  }).all();

  if (approverUsers.length === 0) {
    throw new Error(
      `No company users found with the required approver role '${approverRole}'. Please assign an approver user in company settings before submitting.`,
    );
  }

  // Fetch existing approval rows for idempotency
  const existingApprovals = await db.orm.public.Approval.where({
    eventId,
  }).all();

  const existingApproverIds = new Set(
    existingApprovals.map((approval) => approval.approverId),
  );

  const newApproverIds: number[] = [];

  for (const approver of approverUsers) {
    if (!existingApproverIds.has(approver.id)) {
      await db.orm.public.Approval.create({
        eventId,
        approverId: approver.id,
        status: "PENDING",
        reason: null,
      });
      newApproverIds.push(approver.id);
    }
  }

  return {
    createdCount: newApproverIds.length,
    approverIds: approverUsers.map((u) => u.id),
  };
}
