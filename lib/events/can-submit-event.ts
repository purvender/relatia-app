import "server-only";

export type EventForSubmitCheck = {
  id: number;
  companyId: number;
  status: string;
  createdById?: number;
};

export type UserForSubmitCheck = {
  id: number;
  companyId: number;
  role: string;
};

export type SubmitCheckResult =
  | { canSubmit: true }
  | { canSubmit: false; reason: string };

/**
 * Validates whether a user can submit an event for approval.
 * - Event must belong to the user's company
 * - Event status must be DRAFT
 * - User must have an authorized role (REQUESTER or ADMIN)
 */
export function canSubmitEvent(
  event: EventForSubmitCheck,
  user: UserForSubmitCheck,
): SubmitCheckResult {
  if (event.companyId !== user.companyId) {
    return {
      canSubmit: false,
      reason: "Unauthorized: Event belongs to a different company.",
    };
  }

  if (event.status !== "DRAFT") {
    return {
      canSubmit: false,
      reason: `Cannot submit event in status '${event.status}'. Only DRAFT events can be submitted for approval.`,
    };
  }

  const allowedRoles = ["REQUESTER", "COMPANY_ADMIN", "ADMIN"];
  if (!allowedRoles.includes(user.role)) {
    return {
      canSubmit: false,
      reason: `Users with role '${user.role}' cannot submit events for approval.`,
    };
  }

  return { canSubmit: true };
}
