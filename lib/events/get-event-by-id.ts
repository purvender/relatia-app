import "server-only";

import { db } from "@/prisma/db";

export type ApprovalDetail = {
  id: number;
  approverId: number;
  status: string;
  reason: string | null;
  approver: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
};

export type EventWithCreator = {
  id: number;
  companyId: number;
  createdById: number;
  title: string;
  eventType: string;
  purpose: string | null;
  city: string;
  dateTime: string;
  attendees: number;
  budget: number;
  diet: string;
  status: string;
  createdAt: string;
  createdBy: {
    id: number;
    name: string;
    email: string;
    role: string;
  } | null;
  approvals: ApprovalDetail[];
};

/**
 * Fetches a single event by ID and validates it belongs to the given company.
 * Returns null if the event does not exist or belongs to a different company.
 */
export async function getEventById(
  eventId: number,
  companyId: number,
): Promise<EventWithCreator | null> {
  const event = await db.orm.public.Event.where({ id: eventId }).first();

  // Not found or cross-company access — treat identically to prevent enumeration.
  if (!event || event.companyId !== companyId) {
    return null;
  }

  let createdBy: EventWithCreator["createdBy"] = null;

  if (event.createdById) {
    const user = await db.orm.public.User.where({
      id: event.createdById,
    }).first();
    if (user) {
      createdBy = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    }
  }

  const approvalsRaw = await db.orm.public.Approval.where({
    eventId: event.id,
  }).all();

  const approvals: ApprovalDetail[] = [];
  for (const appr of approvalsRaw) {
    const approverUser = await db.orm.public.User.where({
      id: appr.approverId,
    }).first();

    approvals.push({
      id: appr.id,
      approverId: appr.approverId,
      status: appr.status,
      reason: appr.reason ?? null,
      approver: approverUser
        ? {
            id: approverUser.id,
            name: approverUser.name,
            email: approverUser.email,
            role: approverUser.role,
          }
        : null,
    });
  }

  return {
    id: event.id,
    companyId: event.companyId,
    createdById: event.createdById,
    title: event.title,
    eventType: event.eventType,
    purpose: event.purpose ?? null,
    city: event.city,
    dateTime: event.dateTime,
    attendees: event.attendees,
    budget: event.budget,
    diet: event.diet,
    status: event.status,
    createdAt: event.createdAt,
    createdBy,
    approvals,
  };
}
