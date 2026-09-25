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
npm run lint
npm run build
```

---

## Day 6 Finance & GST Invoices (COMPLETE)

- Automated Indian B2B GST tax invoice generation (`Invoice` model).
- GST breakdown: CGST (9%) + SGST (9%) or IGST (18%) with SAC code `996331`.
- Finance dashboard at `/dashboard/finance` with status filtering and reconciliation view.
- Detailed invoice view at `/dashboard/finance/invoices/[id]`.

---

## Day 7 Razorpay Payments & Webhooks (COMPLETE)

- Dynamic Razorpay Checkout integration with client-side verification callback.
- Idempotent webhook API endpoint at `/api/webhooks/razorpay` with HMAC-SHA256 signature verification.
- Atomic state update upon verified payment: `Booking.paymentStatus = PAID`, `Invoice.status = PAID`, `Event.status = BOOKED`.
- Support for dev mode testing and live `rzp_test_` keys.

---

## Day 8 Public Marketing Website (COMPLETE)

- Designed and built a world-class public marketing website inspired by editorial luxury and enterprise craft.
- 4 public routes delivered:
  - `/`: Public Homepage with announcement bar, hero, floating cards, 5-stage workflow, finance & GST narrative, role bento, AI intelligence, and CTA.
  - `/platform`: Platform Architecture with 5 deep-dive pillars, interactive persona tabs, ERP connectors, and security framework.
  - `/partners`: Hospitality Partner Network with partner economics (4.8x AOV), 3-tier curation standards, and interactive partner application form.
  - `/contact`: Executive Consultation & Demo booking form, 30-minute audit breakdown, and enterprise FAQ.
- Custom brand assets and tokens in `app/marketing.css` and SVG brand mark in `components/marketing/relatia-logo.tsx`.

---

## Day 9 Website Polish, QA Hardening & Launch Foundation (COMPLETE)

- Comprehensive multi-route audit verifying both marketing and internal protected routes.
- Zero-error code hygiene: TypeScript strict (`tsc --noEmit`), ESLint (`npm run lint`), and Next.js production build (`npm run build`).
- Responsive QA across mobile (375px), tablet, and desktop breakpoints with accessible touch targets.
- Motion safety: `prefers-reduced-motion` compliance across all Framer Motion components.
- Brand integrity: Authentic claims, design partner feedback framing, and roadmap scoping for SOC 2 / ISO 27001.
- Updated repository documentation in `README.md`.
- Completed business positioning, category definition, and LinkedIn launch drafts in `docs/launch-and-business-foundation.md`.

