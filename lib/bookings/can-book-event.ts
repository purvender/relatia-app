import "server-only";

export type EventForBookingCheck = {
  id: number;
  companyId: number;
  status: string;
  // Presence of a booking relation means a booking row already exists.
  booking?: { id: number } | null;
};

export type UserForBookingCheck = {
  id: number;
  companyId: number;
  role: string;
};

export type BookingCheckResult =
  | { canBook: true }
  | { canBook: false; reason: string };

/**
 * Validates whether a booking can be created for an event.
 *
 * Rules:
 *   1. Event must belong to the user's company (tenant safety).
 *   2. Event status must be "APPROVED" — the only valid pre-booking state.
 *   3. Event must not already have a booking row (eventId is @unique in schema).
 *   4. User role must be REQUESTER or ADMIN (same roles that can submit events).
 *
 * Mirrors the canSubmitEvent pattern used in Day 3.
 */
export function canBookEvent(
  event: EventForBookingCheck,
  user: UserForBookingCheck,
): BookingCheckResult {
  // Rule 1: Tenant isolation
  if (event.companyId !== user.companyId) {
    return {
      canBook: false,
      reason: "Unauthorized: Event belongs to a different company.",
    };
  }

  // Rule 2: Status gate — only APPROVED events can be booked
  if (event.status !== "APPROVED") {
    return {
      canBook: false,
      reason: `Cannot book an event in status '${event.status}'. Only APPROVED events can be booked.`,
    };
  }

  // Rule 3: Duplicate prevention — booking already exists
  if (event.booking != null) {
    return {
      canBook: false,
      reason: "This event already has a venue booking.",
    };
  }

  // Rule 4: Role authorization
  const allowedRoles = ["REQUESTER", "ADMIN"];
  if (!allowedRoles.includes(user.role)) {
    return {
      canBook: false,
      reason: `Users with role '${user.role}' cannot create venue bookings.`,
    };
  }

  return { canBook: true };
}
