# Relatia Technical & Operational Status

## Day 5 Booking Workflow

### Current Lifecycle

```
DRAFT
 → REQUESTED
 → APPROVED
 → VENUE_SELECTED
 → BOOKED
 → COMPLETED / CANCELLED
```

### Current Behavior

- Authorized users (`REQUESTER` or `ADMIN`) can select an eligible partner venue for an `APPROVED` event.
- Venue selection creates exactly **one `Booking` row**.
- The event status transitions atomically from `APPROVED` → `VENUE_SELECTED`.
- `paymentStatus` remains `PENDING`.
- Financial amounts are calculated in integer paise: `amount = event.budget` and `taxAmount = floor(event.budget * 0.18)` (GST placeholder).
- The event detail page (`/events/[id]`) renders an `EventBookingSummaryCard` displaying confirmed venue assignment, financial breakdown, and payment status.
- State-aware venue action cards prevent misleading repeat selection prompts for events that already have a venue selected or confirmed.

### Operational Partner Note

> Relatia now supports the first operational booking step. After an event is approved, an authorized user can select an eligible venue. The system records the venue assignment, changes the event to Venue Selected, and shows the venue and estimated financial breakdown on the event page. Payment is still pending, and final booking confirmation will be implemented separately.

### Explicitly Excluded / Future Scope

The following items are explicitly **not implemented** in Day 5 and remain future scope:
- Invoice generation
- Payment collection & payment gateway integration
- Razorpay integration
- Final venue booking confirmation (`BOOKED` status transition)
- Automated partner notification
- `BOOKING_REQUESTED` transition
- `CONFIRMED` transition

### Safety & Validation Rules

1. **Tenant Isolation**: Event and Venue queries are strictly scoped by `companyId`. Cross-company access is blocked server-side.
2. **Role Authorization**: Venue selection is restricted to `REQUESTER` and `ADMIN` roles via `canBookEvent`.
3. **Capacity Validation**: Server-side guard enforces `venue.capacity >= event.attendees`. Low-capacity venues are blocked.
4. **Duplicate Prevention**: Database `@unique` constraint on `Booking.eventId` and `canBookEvent` check prevent duplicate booking creation.
5. **Database Migration**: Planned and applied migration `20260925T0949_add_venue_selected_event_status` updating PostgreSQL check constraint `event_status_check_59f4e26b`.

### Verification Commands

```bash
npx tsc --noEmit
npm run build
npm run lint
```
