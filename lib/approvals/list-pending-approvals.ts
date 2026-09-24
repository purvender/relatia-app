import "server-only";

import { db } from "@/prisma/db";
import type { AppUserWithCompany } from "@/lib/auth";

export type PendingApprovalWithDetails = {
  id: number;
  eventId: number;
  approverId: number;
  status: string;
  reason: string | null;
  event: {
    id: number;
    title: string;
    eventType: string;
    city: string;
    dateTime: string;
    attendees: number;
    budget: number;
    status: string;
    createdBy: {
      id: number;
      name: string;
      email: string;
    } | null;
  };
  approver: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
};

/**
 * Fetches pending approval requests relevant to the signed-in user and company.
 * - APPROVER: sees pending approvals assigned to their user ID within their company.
 * - ADMIN: sees all pending approvals within their company.
 */
export async function listPendingApprovals(
  user: AppUserWithCompany,
): Promise<PendingApprovalWithDetails[]> {
  // Fetch pending approvals
  const rawApprovals =
    user.role === "ADMIN"
      ? await db.orm.public.Approval.where({ status: "PENDING" }).all()
      : await db.orm.public.Approval.where({
          approverId: user.id,
          status: "PENDING",
        }).all();

  const results: PendingApprovalWithDetails[] = [];

  for (const appr of rawApprovals) {
    const event = await db.orm.public.Event.where({
      id: appr.eventId,
    }).first();

    // Verify event exists and belongs to the user's company (strict tenant isolation)
    if (!event || event.companyId !== user.companyId) {
      continue;
    }

    let createdBy: PendingApprovalWithDetails["event"]["createdBy"] = null;
    if (event.createdById) {
      const creatorUser = await db.orm.public.User.where({
        id: event.createdById,
      }).first();
      if (creatorUser) {
        createdBy = {
          id: creatorUser.id,
          name: creatorUser.name,
          email: creatorUser.email,
        };
      }
    }

    let approverUser: PendingApprovalWithDetails["approver"] = null;
    if (appr.approverId) {
      const apprUser = await db.orm.public.User.where({
        id: appr.approverId,
      }).first();
      if (apprUser) {
        approverUser = {
          id: apprUser.id,
          name: apprUser.name,
          email: apprUser.email,
          role: apprUser.role,
        };
      }
    }

    results.push({
      id: appr.id,
      eventId: appr.eventId,
      approverId: appr.approverId,
      status: appr.status,
      reason: appr.reason ?? null,
      event: {
        id: event.id,
        title: event.title,
        eventType: event.eventType,
        city: event.city,
        dateTime: event.dateTime,
        attendees: event.attendees,
        budget: event.budget,
        status: event.status,
        createdBy,
      },
      approver: approverUser,
    });
  }

  // Sort by event date descending
  results.sort((a, b) => (a.event.dateTime < b.event.dateTime ? 1 : -1));

  return results;
}
