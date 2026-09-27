# Day 20 Step 1 — Provider Booking-Request Inbox: Request Foundation

## Overview
Day 20 Step 1 establishes the auditable, secure domain model, authorization boundaries, server actions, and query loaders for corporate booking requests submitted to hospitality partners.

---

## 1. Request Lifecycle & States

The request lifecycle is managed via canonical `ProviderRequestStatus` states:
- `PENDING_PROVIDER_REVIEW`: Initial state when an enterprise client submits a booking request for a verified partner venue.
- `ACCEPTED`: Set when an authenticated, verified partner accepts the request with an optional operational note.
- `REJECTED`: Set when an authenticated, verified partner declines the request with a mandatory reason.
- `CANCELLED`: Set when an enterprise user cancels a pending booking request before partner action.

### Plain-Language Status Display
Raw database and enum keys are never exposed to end users:
- `PENDING_PROVIDER_REVIEW` → *"Waiting for provider response"*
- `ACCEPTED` → *"Provider accepted the request"*
- `REJECTED` → *"Provider declined the request"*
- `CANCELLED` → *"Request cancelled"*

---

## 2. Data Model (`ProviderBookingRequest`)

Added model `ProviderBookingRequest` to `prisma/schema.prisma` with exact relational foreign keys:
- `id`: Int @id @default(autoincrement())
- `eventId`: Int (relation to `Event`)
- `companyId`: Int (relation to `Company`)
- `createdById`: Int (relation to `User`)
- `providerOrgId`: Int (relation to `ProviderOrganization`)
- `venueId`: Int (relation to `Venue`)
- `bookableSpaceId`: Int? (optional relation to `BookableSpace`)
- `offeringId`: Int? (optional relation to `Offering`)
- `requestedDateTime`: TimestamptzString
- `attendees`: Int
- `estimatedAmountPaise`: Int?
- `dietaryNotes`: String?
- `operationalNotes`: String?
- `status`: ProviderRequestStatus @default(PENDING_PROVIDER_REVIEW)
- `providerResponseNote`: String?
- `rejectionReason`: String?
- `respondedByPartnerUserId`: Int? (relation to `PartnerUser`)
- `respondedAt`: TimestamptzString?
- `createdAt`: TimestamptzString @default(now())
- `updatedAt`: TimestamptzString?

---

## 3. Security & Authorization Boundaries

### Enterprise Side
- **Tenant Scoping**: Enterprise users can create booking requests only for events belonging to their authenticated company.
- **Cross-Company Isolation**: Enterprise users can only inspect requests tied to their company.
- **Provider Status Validation**: Requests can only target venues belonging to a `VERIFIED` partner organization and a discoverable/verified venue.
- **Immutability of Partner Decision**: Enterprise users cannot override or tamper with partner acceptance or decline states.

### Partner Side
- **Provider Org Ownership**: Partner users can access and act upon requests only for their linked `providerOrgId` (`partner.providerOrgId === request.providerOrgId`).
- **Verification Gate**: Unverified or pending partner profiles cannot accept or decline booking requests.
- **Decision Invariants**:
  - `ACCEPTED` requests cannot subsequently be declined.
  - `REJECTED` requests cannot subsequently be accepted.
  - Declining a request strictly mandates a reason.
  - Cancelled or finalized requests cannot be modified.

---

## 4. Server Actions & Query Loaders

### Data Access Loaders (`lib/provider/service.ts`)
- `createProviderBookingRequestRecord(input, user)`
- `getProviderBookingRequests(providerOrgId, filter)`
- `getProviderBookingRequestById(requestId, providerOrgId)`
- `getProviderPendingRequestsCount(providerOrgId)`
- `getEventBookingRequests(eventId, companyId)`
- `acceptProviderBookingRequestRecord(requestId, partner, note)`
- `rejectProviderBookingRequestRecord(requestId, partner, reason)`
- `cancelProviderBookingRequestRecord(requestId, user)`

### Server Actions
- Enterprise:
  - `createProviderBookingRequestAction` (`lib/provider/actions.ts`)
  - `cancelProviderBookingRequestAction` (`lib/provider/actions.ts`)
- Partner Portal:
  - `partnerAcceptBookingRequestAction` (`lib/provider/partner-actions.ts`)
  - `partnerRejectBookingRequestAction` (`lib/provider/partner-actions.ts`)

---

## 5. Verification & Test Results
- **Provider Domain Test Suite**: 26/26 tests passed (`npm run test`).
- **TypeScript**: 0 errors (`npx tsc --noEmit`).
- **ESLint**: 0 errors, 0 warnings (`npm run lint`).
- **Production Build**: Succeeded (`npm run build`).

---

## 6. Known Scope Boundaries for Next Steps
- **Step 2**: Interactive Provider Inbox UI (`/partners/portal/inbox`), tab filters (Pending, Accepted, Declined), and request action modals.
- **Step 3**: Enterprise request tracking polish & complete end-to-end QA.
