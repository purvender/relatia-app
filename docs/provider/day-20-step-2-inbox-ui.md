# Day 20 Step 2 — Provider Booking-Request Inbox UI

## Overview
Day 20 Step 2 builds the provider-facing inbox UI on top of the Step 1 request foundation. No new data model, no new lifecycle states, no enterprise creation-flow changes. All data access reuses existing Step 1 loaders; all mutations reuse existing Step 1 server actions.

The inbox routes already existed in the working tree as untracked scaffolding and were completed/verified in this step rather than created from scratch.

---

## 1. Inbox Pages & Components

| Route / File | Purpose |
| :--- | :--- |
| `app/partners/portal/inbox/page.tsx` | Inbox list with Pending / Accepted / Declined / All tabs, counts, empty states, verification notice |
| `app/partners/portal/inbox/[id]/page.tsx` | Request detail: scoped fetch, `notFound()` on cross-org or missing record, unverified-org action lock, final-state cards |
| `app/partners/portal/inbox/[id]/request-action-client.tsx` | Client accept/decline form wired to existing server actions via `useActionState`; pending states + inline errors |

Each list card shows: request ID + company name, event title, venue + city + optional space/package, requested date/time, attendee count, estimated budget, plain-language status badge, received time, and a Review link. Detail adds: requester name/email, dietary + operational notes, response note / rejection reason, responded timestamp.

## 2. Reused Loaders & Actions (no duplicates)

- `getProviderBookingRequests(providerOrgId)` — inbox list (org-scoped, newest-first)
- `getProviderBookingRequestById(requestId, providerOrgId)` — detail (returns `null` on org mismatch → `notFound()`)
- `getProviderPendingRequestsCount(providerOrgId)` — portal dashboard badge (already wired in `app/partners/portal/page.tsx`)
- `partnerAcceptBookingRequestAction` / `partnerRejectBookingRequestAction` (`lib/provider/partner-actions.ts`) — pending-only, verified-org-gated, rejection reason required by `rejectProviderBookingRequestSchema`
- Status wording reuses Step 1 conventions; no raw enums rendered (default badge branch is unreachable for known statuses)

## 3. Authorization Boundaries

- Every inbox page calls `requirePartnerUser()`; detail additionally requires `partner.providerOrgId` and fetches strictly via the org-scoped loader — changing URL IDs cannot reveal another provider's data.
- Pending actions render only when `status === "PENDING_PROVIDER_REVIEW"` **and** org is `VERIFIED`; otherwise an "Action Locked" card shows. Final states (ACCEPTED / REJECTED / CANCELLED) render summary cards with no action controls.
- No client-side DB mutation; no enterprise creation-flow changes; `proxy.ts` already protects `/partners/portal(.*)`.

## 4. Tests

Reused existing suites (no prior tests weakened):
- `tests/provider-domain.test.ts` Tests 27–40: inbox loading, cross-org isolation, pending/accepted/rejected filters, authorized vs unauthorized detail access, action gating, accept/reject transitions incl. double-accept/double-reject rejection, reason validation, friendly labels, empty states.
- `tests/commercial-flow.test.ts` (22 tests) and `tests/admin-roles.test.ts` (8 tests) confirm confirm-flow gates and tenant isolation remain intact.

## 5. Verification Results

- `npm run test`: pass (provider-domain 26 + 14 inbox + 2 bugfix; commercial-flow 22; admin-roles 8/8)
- `npx tsc --noEmit`: pass, 0 errors
- `npm run lint`: pass, 0 errors/warnings
- `npm run build`: pass (incl. `/partners/portal/inbox`, `/partners/portal/inbox/[id]`)

## 6. Known Limitations Before Step 3

- No dedicated Cancelled tab (cancelled requests visible via All tab + detail card).
- No availability automation, AI negotiation, payments, Slack/Teams, or finance integrations (explicitly out of scope).
- Step 3 scope: enterprise request-tracking polish + end-to-end QA.
