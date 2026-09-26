# Day 18 — Step 2: Internal Provider Onboarding Workflow

## 1. Purpose

This specification documents the end-to-end internal operator onboarding workflow for Relatia. Building upon the Step 1 data foundation, this workflow enables Relatia operators and platform administrators to onboard, inspect, edit, verify, and govern hospitality providers, physical venues, bookable spaces, fixed packages/menus, availability metadata, and cancellation terms directly through a secure administrative UI without direct database intervention.

---

## 2. Admin & Operator Journey

The complete operator onboarding lifecycle follows a structured sequence:

```text
[ Admin Providers List ]
        │
        ▼ (Open or Create Provider)
[ Provider Detail View ] ──► Edit Provider Information (Name, legal entity, city, type, notes)
        │
        ├──► Contacts & Operations Tab ──► Add / Edit Key Contacts (GM, sales, concierge, billing)
        │                                  └──► Toggle Active / Inactive status
        │
        ├──► Verification & Compliance Tab ──► View Statutory Documents & Audit History
        │                                      └──► Record Provider-Level Verification Audit
        │
        └──► Venues & Bookable Spaces Tab
                 │
                 ├──► Add / Edit Venue (Identity, capacity, cuisine, price band, tags, notes)
                 │
                 ├──► Configure Bookable Spaces (PDRs, rooftops, ballrooms, terraces)
                 │         ├──► Edit Capacity (min/max, seated/standing) & Privacy
                 │         └──► Toggle Active / Paused Status
                 │
                 ├──► Configure Offerings & Packages (Set menus, per-person rates, min spend)
                 │         ├──► Associate to specific space or venue-wide
                 │         └──► Toggle Active / Discoverable Status
                 │
                 ├──► Configure Governance Terms
                 │         ├──► Availability Metadata (Manual confirmation, lead times)
                 │         └──► Cancellation Policy (Complimentary cutoff window, deposits)
                 │
                 ├──► Discovery Readiness Scorecard (Live deterministic rules evaluation)
                 │         └──► Direct inline action buttons to resolve blockers
                 │
                 ├──► Record Venue Verification Audit (Site visit, food safety, compliance)
                 │
                 └──► Intentional Visibility Promotion (DRAFT ──► INTERNAL_ONLY ──► DISCOVERABLE)
```

---

## 3. Workflow Sub-Systems

### 3.1 Provider Overview & Management
* **Overview Summary**: Displays brand name, legal entity name, provider type, city, provider status, onboarding status, aggregate counts (venues, active bookable spaces, active offerings), discoverable venue count, primary contact badge, and restricted operator notes.
* **Editing Provider**: `EditProviderDialog` allows administrators to modify brand name, registered legal entity, provider type, primary city, provider status (`DRAFT`, `PENDING_VERIFICATION`, `VERIFIED`, `PAUSED`, `ARCHIVED`), onboarding status (`NOT_STARTED`, `IN_PROGRESS`, `REVIEW_REQUIRED`, `READY_FOR_DISCOVERY`, `BLOCKED`, `COMPLETE`), and internal notes.

### 3.2 Provider Contacts Flow
* **Role Categories**: `OPERATIONS` (concierges, maitre d'), `SALES` (banqueting managers), `MANAGEMENT` (general managers, owners), `FINANCE` (billing teams), `GENERAL`.
* **Add Contact**: `AddContactDialog` captures name, role title, email, phone, category, preferred contact method (`EMAIL`, `PHONE`, `WHATSAPP`), and internal operational notes.
* **Edit Contact**: `EditContactDialog` allows modifying any contact attribute with pre-filled form state.
* **Status Toggle**: `ToggleContactButton` enables instant activation/deactivation of partner contacts.

### 3.3 Venue Onboarding & Editing Flow
* **Add Venue**: `AddVenueDialog` creates a new physical establishment under the provider organization, automatically provisioning default baseline availability (manual confirmation required, 24h lead time) and cancellation policies (48h complimentary window).
* **Edit Venue**: `EditVenueDialog` updates venue name, venue type, city, micro-locality, street address, capacity, cuisine, price band (`MODERATE`, `PREMIUM`, `LUXURY`), tags, rating, public-safe description, internal notes, active status, and visibility.
* **Readiness Integration**: Editing venue fields automatically re-evaluates and synchronizes discovery readiness.

### 3.4 Bookable-Space Flow
* **Space Types**: `PRIVATE_DINING` (PDR), `SEMI_PRIVATE_DINING`, `LOUNGE`, `TERRACE`, `ROOFTOP`, `BALLROOM`, `BOARDROOM`, `MAIN_DINING_SECTION`, `CLUB_EVENT_SPACE`.
* **Privacy Levels**: `EXCLUSIVE` (enclosed room), `SEMI_PRIVATE` (screened/curtained), `OPEN` (dedicated floor section).
* **Add Bookable Space**: `AddBookableSpaceDialog` enforces the invariant `minCapacity <= maxCapacity` and positive non-zero capacities.
* **Edit Bookable Space**: `EditBookableSpaceDialog` updates space name, type, capacities, privacy, seated/standing breakdown, public-safe description, and internal notes.
* **Status Toggle**: `ToggleBookableSpaceButton` enables activating or pausing spaces. Paused spaces are automatically excluded from discovery readiness.

### 3.5 Offering / Package Flow
* **Offering Types**: `SET_MENU`, `PER_PERSON_PACKAGE`, `FIXED_EVENT_PACKAGE`, `CUSTOM_EXPERIENCE`, `A_LA_CARTE_MIN_SPEND`, `BEVERAGE_PACKAGE`.
* **Pricing Bases**: `PER_PERSON`, `FIXED_TOTAL`, `MINIMUM_SPEND_ONLY`, `CUSTOM_QUOTE`.
* **Integer Paise Storage**: All base amounts and minimum spends are entered in ₹ Rupees in the UI and converted to integer paise (`baseAmountRupees * 100`) before persistent storage.
* **Space Linking**: Packages can be linked to a specific `BookableSpace` or marked venue-wide.
* **Add & Edit Package**: `AddOfferingDialog` and `EditOfferingDialog` support comprehensive package configuration including dietary notes, guest count limits, tax inclusion toggles, and internal notes.
* **Status Toggle**: `ToggleOfferingButton` allows activating or pausing offerings.

### 3.6 Availability & Cancellation Governance Flow
* **Availability Governance**: `EditAvailabilityDialog` configures `requiresManualConfirmation` (safe concierge workflow), `leadTimeHours` (1–168 hours), operating schedule notes, and availability guidance.
* **Cancellation Governance**: `EditCancellationPolicyDialog` configures complimentary cancellation cutoff window (`cutoffHours`), deposit requirements, deposit percentages, and guidance notes.

### 3.7 Verification Workflow & Visibility Independence
* **Audit Submission**: `RecordVerificationDialog` allows administrators to record operational verification audits (`VERIFIED`, `PENDING_REVIEW`, `REJECTED`, `UNVERIFIED`) with verification source/method and audit notes.
* **Visibility Independence Principle**:
  1. Verification confirms operational and legal compliance.
  2. Visibility (`DRAFT`, `INTERNAL_ONLY`, `DISCOVERABLE`, `PAUSED`, `ARCHIVED`) governs public enterprise exposure.
  3. Verifying a venue does **not** auto-publish it to enterprise discovery. Moving a venue to `DISCOVERABLE` requires an explicit, authorized operator action via `UpdateVenueVisibilityControl`.

### 3.8 Discovery Readiness Engine & Actionable Blockers
* **Deterministic Rules Engine**: Evaluates provider status, venue active state, identity completeness, location info, verification status, active bookable spaces, and pricing integrity.
* **Direct Actionable Buttons**: When a check fails or a blocker is identified, the UI provides direct button triggers:
  - Identity / location / description deficiency ──► **"Fix"** or **"Add Area"** (`EditVenueDialog`)
  - Missing active bookable spaces ──► **"+ Space"** (`AddBookableSpaceDialog`)
  - Missing active packages ──► **"+ Package"** (`AddOfferingDialog`)
  - Unverified venue ──► **"Record Verification"** (`RecordVerificationDialog`)

---

## 4. Authorization & Security Boundaries

1. **Internal Operator Restriction**: All mutation actions are guarded with `await requireUserRole(["ADMIN"])`. Requester, Approver, and Finance roles cannot mutate provider records.
2. **Field-Level Data Isolation**: Internal operator notes (`internalNotes`), statutory document storage keys, and private manager phone numbers are stripped from enterprise discovery DTOs (`getPublicSafeVenueDetail`).
3. **Multi-Tenant Scoping**: Multi-tenant company isolation remains intact while eligible discoverable provider venues are safely accessible across tenants.

---

## 5. Validation Rules Matrix

| Entity | Field | Rule | Error Message / Handling |
| :--- | :--- | :--- | :--- |
| **Provider** | `name` | Min 2, max 100 chars | "Provider name must be at least 2 characters" |
| **Provider** | `city` | Min 2, max 60 chars | "City is required" |
| **Contact** | `email` | Valid email format | "Valid email is required" |
| **Venue** | `capacity` | Integer >= 1 | "Capacity must be at least 1 guest" |
| **Space** | `minCapacity` / `maxCapacity` | `min <= max` and `min >= 1` | "Minimum capacity must be less than or equal to maximum capacity" |
| **Offering** | `baseAmountPaise` | Integer >= 0 | "Base amount cannot be negative" |
| **Offering** | `minimumSpendPaise`| Integer >= 0 | "Minimum spend cannot be negative" |
| **Offering** | `minGuests` / `maxGuests` | `min <= max` | "Minimum guests cannot exceed maximum guests" |
| **Offering** | `currency` | Literal `"INR"` | Stored strictly in INR |
| **Availability**| `leadTimeHours` | Integer between 1 and 168 | Bounded advance lead time |
| **Cancellation**| `cutoffHours` | Integer between 0 and 336 | Bounded cancellation window |

---

## 6. Known Limitations

1. **Document Upload Storage**: The document manager stores secure storage references/keys; binary cloud object upload is mocked with file references in the current Phase 1 foundation.
2. **Single Primary Currency**: Currently restricted to `INR` integer paise.
3. **No External Provider Login**: Providers cannot self-manage or log in directly (deferred to Day 19 Partner Portal).

---

## 7. What Remains for Day 18 Step 3

* **Provider Onboarding Review & Readiness Auditing**: Detailed end-to-end review tools and bulk readiness reporting across the entire provider network.
* **Edge Case Verification & Audit Log Filtering**: Filtering and searching audit logs across historical inspections.
* **Public Discovery Integration Validation**: Comprehensive integration tests confirming full end-to-end sync between internal operator edits and enterprise search filters.
