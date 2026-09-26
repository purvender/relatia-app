# Day 18 — Step 1: Provider Data Foundation & Internal Onboarding

## 1. Purpose

This document establishes the provider-side data foundation and internal operator onboarding base for Relatia. It transitions the supply side of the platform from a flat tenant-owned venue catalog into a structured, first-class provider domain capable of supporting multi-space hospitality venues, flexible package pricing, manual confirmation workflows, and discovery governance.

---

## 2. Scope

### In-Scope (Phase 1 — Core Provider Foundation):
* **Domain Hierarchy**: `ProviderOrganization` → `Venue` → `BookableSpace` → `Offering / Package` → `Pricing`.
* **Hospitality Terminology**: Canonical adoption of `BookableSpace` for reservable hospitality areas (e.g. private dining rooms, terraces, ballrooms, boardrooms) rather than generic or hotel-bedroom terms.
* **Pricing & Minimum Spend**: Structured per-person, fixed-total, and minimum-spend pricing stored in integer paise.
* **Availability & Governance**: Explicit manual confirmation flags, operational lead times, and cancellation policy metadata.
* **Verification & Audit**: Operational verification logging (`UNVERIFIED`, `PENDING_REVIEW`, `VERIFIED`, `REJECTED`).
* **Discovery Readiness Engine**: Deterministic rules engine evaluating whether a venue and its bookable spaces meet quality, identity, capacity, and verification thresholds before being surfaced for enterprise discovery.
* **Protected Internal Operator Surface**: Admin management interface (`/dashboard/admin/providers` and `/dashboard/admin/providers/[id]`) for onboarding organizations, contacts, documents, venues, spaces, packages, and recording verification audits.

### Explicit Non-Goals (Deferred to Later Steps):
* Provider self-service portal (Day 19).
* Provider booking-request inbox and accept/decline flows (Day 20).
* Live availability calendar synchronization and external POS integrations (Day 21).
* Automated provider economics and reconciliation settlement (Day 22).
* Autonomous AI booking agents and unsupported commercial claims.

---

## 3. Terminology Decision: Why `BookableSpace` is Used

### The Decision:
Relatia models the discrete reservable units within a venue as **`BookableSpace`** rather than generic "rooms".

### Rationale:
1. **Prevents Hotel Bedroom Confusion**: Relatia is an enterprise dining and executive relationship-hospitality platform. Generic terms like "room" imply overnight accommodation, creating confusion with enterprise buyers, hotel partners, and corporate travel booking engines.
2. **Accurately Represents Diverse Hospitality Layouts**: Executive hospitality spans private dining suites, semi-private screened areas, rooftop lounges, garden terraces, grand ballrooms, and executive boardroom salons. `BookableSpace` cleanly encapsulates all of these under a single, well-typed domain primitive (`spaceType`).
3. **Structured Capacity & Privacy**: Each `BookableSpace` carries independent minimum/maximum capacity thresholds, seated vs standing specifications, and privacy levels (`EXCLUSIVE`, `SEMI_PRIVATE`, `OPEN`).

---

## 4. Domain Model & Hierarchy

```text
ProviderOrganization
├── ProviderContacts (Operations, Sales, Management, Finance)
├── ProviderDocuments (FSSAI, GSTIN, Liquor, Floor Plans, Mandates)
├── VerificationRecords (Internal Audit & Site Visits)
└── Venue
    ├── AvailabilityMetadata (Manual confirmation, lead times, operating notes)
    ├── CancellationPolicy (Complimentary cutoff window, deposit rules)
    └── BookableSpace
        ├── BlackoutDateRanges
        └── Offering / Package (Set menus, per-person rates, min spend)
```

### Models Added / Extended:

| Model | Purpose | Key Attributes |
| :--- | :--- | :--- |
| `ProviderOrganization` | Hospitality supply entity / brand | `name`, `legalName`, `providerType`, `city`, `status`, `onboardingStatus`, `internalNotes` |
| `ProviderContact` | Authorized partner contacts | `name`, `role`, `email`, `phone`, `preferredContactMethod`, `category`, `isActive` |
| `ProviderDocument` | Statutory and commercial records | `docType`, `title`, `fileReference`, `reviewStatus`, `isInternalOnly` |
| `Venue` *(Extended)* | Physical venue establishment | `providerOrgId`, `venueType`, `locality`, `publicDescription`, `visibility`, `isDiscoverable`, `verificationStatus` |
| `BookableSpace` | Reservable space in a venue | `venueId`, `name`, `spaceType`, `minCapacity`, `maxCapacity`, `privacyLevel`, `seatedCapacity`, `status`, `isActive` |
| `Offering` | Structured package / menu | `venueId`, `bookableSpaceId`, `name`, `offeringType`, `pricingBasis`, `baseAmount`, `minimumSpend`, `minGuests`, `maxGuests` |
| `AvailabilityMetadata`| Confirmation and lead time rules | `venueId`, `requiresManualConfirmation`, `leadTimeHours`, `operatingDaysNotes`, `availabilityNotes` |
| `CancellationPolicy` | Cancellation terms & cutoff | `venueId`, `summary`, `cutoffHours`, `depositRequired`, `depositPercent` |
| `VerificationRecord` | Operational compliance log | `providerOrgId`, `venueId`, `status`, `verifiedBy`, `verificationSource`, `verifiedAt` |

---

## 5. Statuses and Enums

* **`ProviderType`**: `RESTAURANT`, `HOTEL`, `CLUB`, `CATERING_COMPANY`, `EXPERIENCE_PROVIDER`, `ACTIVITY_PROVIDER`, `LIVE_ENTERTAINMENT`, `GIFTING_PROVIDER`, `MERCHANDISE_PROVIDER`.
* **`ProviderStatus`**: `DRAFT`, `PENDING_VERIFICATION`, `VERIFIED`, `PAUSED`, `ARCHIVED`.
* **`OnboardingStatus`**: `NOT_STARTED`, `IN_PROGRESS`, `REVIEW_REQUIRED`, `READY_FOR_DISCOVERY`, `BLOCKED`, `COMPLETE`.
* **`VenueVisibility`**: `DRAFT`, `INTERNAL_ONLY`, `DISCOVERABLE`, `PAUSED`, `ARCHIVED`.
* **`BookableSpaceType`**: `PRIVATE_DINING`, `SEMI_PRIVATE_DINING`, `LOUNGE`, `TERRACE`, `ROOFTOP`, `BALLROOM`, `BOARDROOM`, `MAIN_DINING_SECTION`, `CLUB_EVENT_SPACE`.
* **`BookableSpaceStatus`**: `DRAFT`, `ACTIVE`, `PAUSED`, `ARCHIVED`.
* **`VerificationStatus`**: `UNVERIFIED`, `PENDING_REVIEW`, `VERIFIED`, `REJECTED`.
* **`OfferingType`**: `SET_MENU`, `PER_PERSON_PACKAGE`, `FIXED_EVENT_PACKAGE`, `CUSTOM_EXPERIENCE`, `A_LA_CARTE_MIN_SPEND`, `BEVERAGE_PACKAGE`.
* **`PricingBasis`**: `PER_PERSON`, `FIXED_TOTAL`, `MINIMUM_SPEND_ONLY`, `CUSTOM_QUOTE`.
* **`DocumentType`**: `FSSAI_LICENSE`, `GSTIN_CERTIFICATE`, `LIQUOR_LICENSE`, `BANK_MANDATE`, `PAN_CARD`, `RATE_CARD`, `VENUE_FLOOR_PLAN`, `OTHER`.
* **`DocumentReviewStatus`**: `PENDING_REVIEW`, `VERIFIED`, `REJECTED`, `EXPIRED`.
* **`ContactRoleCategory`**: `OPERATIONS`, `SALES`, `FINANCE`, `MANAGEMENT`, `GENERAL`.

---

## 6. Internal Onboarding Sequence

The internal operator onboarding workflow operates in the following strict order:

```text
1. Create Provider Organization (Brand name, legal name, provider type, city)
   └── 2. Add Provider Key Contacts (GM, sales manager, operations concierge)
       └── 3. Add Physical Venue (Address, micro-locality, cuisine, overall capacity)
           └── 4. Configure Bookable Spaces (PDRs, terraces, boardrooms with capacities)
               └── 5. Attach Offerings & Packages (Set menus, per-person rates, min spend in paise)
                   └── 6. Configure Availability & Cancellation Metadata
                       └── 7. Record Operations Verification Audit
                           └── 8. Run Discovery Readiness Engine
                               └── 9. Activate for Discovery (Only when eligible)
```

---

## 7. Discovery Readiness & Governance Rules

The readiness engine (`lib/provider/readiness.ts`) executes a deterministic check before any venue or space can be surfaced to enterprise clients:

1. **Provider Status**: Must be `VERIFIED` or `PENDING_VERIFICATION` (blocked if `ARCHIVED` or `PAUSED`).
2. **Venue Active**: Venue must have `active === true` and visibility not set to `PAUSED` or `ARCHIVED`.
3. **Identity Completeness**: Name, city, and cuisine must be populated.
4. **Locality / Address**: Specific area or address must be recorded.
5. **Verification State**: Must be `VERIFIED` or `PENDING_REVIEW` (blocked if `UNVERIFIED` or `REJECTED`).
6. **Bookable Spaces Configured**: At least one active `BookableSpace` with valid capacity (`minCapacity > 0` and `maxCapacity >= minCapacity`).
7. **Pricing Integrity**: All active offerings must have non-negative `baseAmount`, non-negative `minimumSpend`, and `INR` currency.
8. **Public-Safe Description**: Curated description provided for enterprise hosts.

---

## 8. Authorization Boundaries & Data Isolation

* **Internal Operator Boundary**: Provider management actions and pages are strictly restricted via `requireUserRole(["ADMIN"])`. Requester, Approver, and Finance roles cannot create or modify provider records.
* **Field-Level Public-Safe Protection**: Enterprise discovery endpoints and components consume only `PublicSafeVenueDetail`, `PublicSafeBookableSpace`, and `PublicSafeOffering`. Sensitive fields (`internalNotes`, internal commission rates, compliance document storage references, and private phone numbers) are stripped server-side.
* **Multi-Tenant Scoping**: Existing enterprise tenant isolation remains completely intact. Venues linked to specific client company catalogs remain accessible to their respective tenants, while provider-managed discoverable venues are safely shared across eligible enterprise tenants.

---

## 9. Assumptions and Future Extension Points

### Initial MVP Assumptions:
* **Initial Wedge**: Venue-based corporate dining and executive hospitality in Gurugram / Delhi-NCR.
* **Manual Confirmation**: Live inventory is not assumed. Relatia uses safe manual concierge and host confirmation workflows.
* **Integer Paise Accounting**: All package amounts and minimum spends are calculated and stored in integer paise (₹1 = 100 paise).

### Future Extension Points:
* **Provider-Direct Offerings**: The `Offering` model supports nullable `bookableSpaceId` and direct `providerOrgId` linkage, enabling future direct catering, experience, and gifting products.
* **Multi-Location Groups**: A single `ProviderOrganization` cleanly owns multiple physical `Venues`.
* **Day 19 Partner Portal**: Foundations laid for provider self-service logins and profile management.
* **Days 20–22 Operational Inbox & Reconciliation**: Schema is pre-wired with contact categories, manual confirmation flags, and structured pricing for upcoming inbox and reconciliation modules.
