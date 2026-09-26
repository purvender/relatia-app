# Relatia — Repository Truth Export

> **Generated from actual codebase** on `develop` branch (HEAD: `209c651`).
> All section-level content verified against source files.
> Do not treat this as aspirational — it is a snapshot of what is literally in the code.

---

## A. Repo Summary

| Field | Value |
|---|---|
| **Repository URL** | https://github.com/purvender/relatia-app |
| **Visibility** | Public (no GitHub Secrets or Actions configured yet) |
| **Default branch** | `develop` (GitHub default may still be `main`) |
| **Active working branch** | `develop` |
| **Release branch** | `main` (same commit as develop; not yet diverged) |
| **Branch protection** | None configured yet |
| **Local clone path** | `/Users/purvenderhooda/Documents/hooda/relatia-app` |

### Latest Key Commits (develop)

| Hash | Message |
|---|---|
| `209c651` | chore(phase0): professional repository setup, cleanup, developer guides, architecture docs, github templates |
| `51f8d5f` | docs: add enterprise demo narrative and screenshots index |
| `1458658` | feat(day9): website verification, lint hardening, documentation, launch foundation |
| `0641892` | feat(day8): public marketing website (home, platform, partners, contact) |
| `dc5fa0b` | feat(day7): idempotent Razorpay webhook API route |
| `5a1048c` | fix(finance): fresh Razorpay API order on real rzp_test_ keys |
| `663b822` | fix(finance): dev mode payment testing without 401 errors |

---

## B. Top-Level Folder Map

```
relatia-app/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx                     # Centered slate-50 layout for auth pages
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── api/webhooks/razorpay/route.ts     # POST — Razorpay webhook handler
│   ├── contact/page.tsx
│   ├── dashboard/
│   │   ├── layout.tsx                     # requireAppUser → DashboardShell
│   │   ├── page.tsx                       # Overview: KPIs + recent events
│   │   ├── approvals/page.tsx + actions.ts
│   │   ├── finance/page.tsx + actions.ts
│   │   ├── finance/invoices/[id]/page.tsx
│   │   └── settings/page.tsx              # Stub
│   ├── events/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── new/page.tsx
│   │   ├── [id]/page.tsx
│   │   └── actions.ts
│   ├── onboarding/page.tsx + actions.ts
│   ├── partners/page.tsx
│   ├── platform/page.tsx
│   ├── venues/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── [id]/page.tsx
│   │   └── actions.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx                         # Root: ClerkProvider + Geist fonts
│   ├── marketing.css                      # Marketing design tokens + animations
│   └── page.tsx                           # / = marketing home
│
├── components/
│   ├── approvals/                         # ApprovalsList, ListItem, ActionButtons, StatusBadge
│   ├── dashboard-shell.tsx               # Sidebar nav for all protected pages
│   ├── events/                            # EventForm, ListItem, DetailsCard, PolicyBanner, StatusBadge, etc.
│   ├── finance/                           # KpiCards, RecordsTable, InvoiceDetailCard, RazorpayPayButton, PrintInvoiceButton
│   ├── marketing/
│   │   ├── animations.tsx                 # FadeIn, FadeInUp, FadeInScale, FadeInLeft, FadeInRight, StaggerContainer, StaggerItem, ParallaxFloat
│   │   ├── contact-sections.tsx          # ContactHero, ContactFormSection, ContactFaq
│   │   ├── hero-section.tsx              # AnnouncementBar, HeroSection
│   │   ├── home-sections.tsx             # TrustSection, WorkflowSection, FinanceSection, RolesSection, AISection, VenueSection, ReportingSection, TestimonialsSection, CtaSection
│   │   ├── marketing-footer.tsx          # Footer: 4 link columns, social icons, copyright
│   │   ├── marketing-layout.tsx          # Wrapper: Playfair Display font, MarketingNav, MarketingFooter
│   │   ├── marketing-nav.tsx             # Sticky nav, glassmorphism, mobile hamburger + AnimatePresence
│   │   ├── partners-sections.tsx         # PartnersHero, Value, Tiers, Operations, Testimonials, Application
│   │   ├── platform-sections.tsx         # PlatformHero, Pillars, Architecture, Integrations, Security, Cta
│   │   └── relatia-logo.tsx              # RelatiaLogo (SVG mark + wordmark), RelatiaLogoMark
│   ├── ui/                               # Shadcn primitives: button, card, input
│   └── venues/                           # VenueCard, DetailsCard, Filters, VenuesList, SelectVenueForEventCard
│
├── lib/
│   ├── auth.ts                           # requireAppUser, requireUserRole, requireOnboardingUser, ensureAppUser
│   ├── approvals/                        # approve, reject, list-pending
│   ├── bookings/                         # can-book, create, get-by-event, request
│   ├── events/                           # create-approvals, helpers, get-by-id, venue-discovery-query, submit, can-submit
│   ├── finance/                          # create-invoice, dashboard-data, get-by-booking, get-by-id, gst.ts
│   ├── payments/                         # create-payment-order, razorpay.ts, verify-payment, verify-webhook
│   ├── utils.ts
│   └── venues/                           # get-by-id, get-venues
│
├── prisma/
│   ├── schema.prisma                     # Prisma 8 schema
│   ├── db.ts                             # DB client export
│   ├── schema.d.ts + schema.json         # Generated types and contract
│   └── seed.ts                           # Seed: companies, users, venues, policies
│
├── migrations/app/                       # 6 sequential Prisma 8 migrations
│   ├── 20260923T1453_init_schema/
│   ├── 20260923T1904_harden_mvp_schema/
│   ├── 20260925T0949_add_venue_selected_event_status/
│   ├── 20260925T1117_expand_invoice_and_event_status/
│   ├── 20260925T1621_add_razorpay_payment_fields/
│   └── 20260925T1715_add_webhook_event_log/
│
├── docs/
│   ├── architecture.md
│   ├── demo-narrative.md
│   ├── developer-setup.md
│   ├── launch-and-business-foundation.md
│   ├── relatia-mvp-status.md
│   ├── repository-guide.md
│   ├── repository-truth-export.md        # This file
│   └── website-and-route-map.md
│
├── public/images/marketing/
│   ├── hero-product.png                  # AI-generated mockup (illustrative)
│   ├── partners-hospitality.png
│   └── venue-dining.png
│
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/bug_report.md + feature_request.md
│
├── .env.example                          # Zero-secret env template (committed)
├── .gitignore                            # Blocks .env.local, .env, *.db, .next/, node_modules/
├── AGENTS.md                             # Next.js agent rules (auto-managed)
├── README.md                             # Master documentation hub
├── next.config.ts
├── package.json
├── prisma.config.ts
├── tsconfig.json
└── components.json                       # Shadcn config
```

---

## C. Route Map (from actual code)

| Route | File | Auth | Role Required | Purpose |
|---|---|---|---|---|
| `/` | `app/page.tsx` | Public | None | Marketing home |
| `/platform` | `app/platform/page.tsx` | Public | None | Platform architecture |
| `/partners` | `app/partners/page.tsx` | Public | None | Hospitality partner page |
| `/contact` | `app/contact/page.tsx` | Public | None | Demo request / contact |
| `/sign-in` | `app/(auth)/sign-in/[[...sign-in]]/page.tsx` | Public | None | Clerk sign-in |
| `/sign-up` | `app/(auth)/sign-up/[[...sign-up]]/page.tsx` | Public | None | Clerk sign-up |
| `/onboarding` | `app/onboarding/page.tsx` | Clerk | Logged in, no company | Company creation |
| `/dashboard` | `app/dashboard/page.tsx` | Protected | Any role + company | Overview KPIs |
| `/dashboard/approvals` | `app/dashboard/approvals/page.tsx` | Protected | APPROVER, ADMIN | Approval queue |
| `/dashboard/finance` | `app/dashboard/finance/page.tsx` | Protected | FINANCE, ADMIN | Finance KPIs + table |
| `/dashboard/finance/invoices/[id]` | `app/dashboard/finance/invoices/[id]/page.tsx` | Protected | FINANCE, ADMIN | GST invoice + pay |
| `/dashboard/settings` | `app/dashboard/settings/page.tsx` | Protected | Any | Settings (stub) |
| `/events` | `app/events/page.tsx` | Protected | Any | Event list |
| `/events/new` | `app/events/new/page.tsx` | Protected | Any | Create event |
| `/events/[id]` | `app/events/[id]/page.tsx` | Protected | Any | Event detail + actions |
| `/venues` | `app/venues/page.tsx` | Protected | Any | Venue discovery |
| `/venues/[id]` | `app/venues/[id]/page.tsx` | Protected | Any | Venue detail + book |
| `/api/webhooks/razorpay` | `app/api/webhooks/razorpay/route.ts` | Server | HMAC-SHA256 | Payment webhook |

---

## D. Public Website Deep Map

### Shared Infrastructure

**MarketingLayout** (`components/marketing/marketing-layout.tsx`):
- Loads **Playfair Display** (Google Fonts, `--font-serif`) for display headings
- Base font: **Geist Sans** (`--font-sans`) from root layout
- Imports `app/marketing.css` for design tokens and custom animations
- Renders: `MarketingNav` → `{children}` → `MarketingFooter`

**Design Tokens** (`app/marketing.css`):

| Token | Value | Usage |
|---|---|---|
| `--m-bg` | `#FDFCFA` | Page background (warm off-white) |
| `--m-bg-alt` | `#F5F2EC` | Section alternate bg |
| `--m-bg-dark` | `#1A1714` | Dark sections, footer, final CTA |
| `--m-text` | `#1A1714` | Primary text |
| `--m-accent` | `#C17F3E` | Amber gold — CTAs, active states, highlights |
| `--m-border` | `#E8E3DA` | Dividers and card borders |

**CSS Animations** (with reduced-motion support):
- `marquee` — trust logo scroll (40s linear infinite) → paused on hover
- `shimmer` — CTA gradient shimmer (3s ease-in-out infinite)
- `float` — subtle vertical float (6s ease-in-out infinite)
- `@media (prefers-reduced-motion: reduce)` disables ALL three

**Framer Motion (animations.tsx):**

| Component | Behavior | Reduced Motion |
|---|---|---|
| `FadeIn` | `opacity: 0→1` on `whileInView` | Skips `initial` entirely |
| `FadeInUp` | `opacity+y: 0+40→1+0` on `whileInView` | Skips `initial` entirely |
| `FadeInScale` | `opacity+scale: 0+0.96→1+1` on `whileInView` | Skips `initial` entirely |
| `FadeInLeft` | `opacity+x: 0-40→1+0` on `whileInView` | Skips `initial` entirely |
| `FadeInRight` | `opacity+x: 0+40→1+0` on `whileInView` | Skips `initial` entirely |
| `StaggerContainer` | Staggered child entrance (default 80ms) | Normal |
| `StaggerItem` | `opacity+y: 0+24→1+0` (600ms) | Normal |
| `ParallaxFloat` | `y: +20 → -20` on scroll | Not reduced-motion aware |

All `whileInView` uses `viewport={{ once: true, margin: "-60px" }}` (fires once on entry).

---

### MarketingNav (`components/marketing/marketing-nav.tsx`)

- **Position:** Fixed/sticky top, `z-50`, `backdrop-blur-md`, `bg-[var(--m-bg)]/90`
- **Left:** `RelatiaLogo` (SVG embrace arcs + Playfair "Relatia" wordmark)
- **Center (desktop):** Home (`/`), Platform (`/platform`), Partners (`/partners`), Contact (`/contact`) — active route gets 2px amber underline
- **Right (desktop):** "Sign In" text link (`/sign-in`) + "Book a Demo" pill button (`/contact`)
- **Mobile:** Hamburger (2 bars → X on open) → `AnimatePresence` full-screen overlay with staggered nav links + CTA buttons

---

### `/` — Home Page

**File:** `app/page.tsx`

| Section | Component | Content |
|---|---|---|
| Announcement bar | `AnnouncementBar` | "Introducing AI-Native Workflow" chip → `/platform` |
| Hero | `HeroSection` | H1, tagline, 2 CTAs, product image, 2 floating badge cards |
| Trust logos | `TrustSection` | 8 placeholder enterprise logos in marquee |
| Workflow | `WorkflowSection` | 4-step: Request → Approve → Book → Invoice |
| Finance | `FinanceSection` | GST + ITC narrative with illustrative metrics |
| Roles | `RolesSection` | 4 personas: Requester, Approver, Finance, Venue Partner |
| AI | `AISection` | AI venue discovery + illustrative chat card |
| Venue | `VenueSection` | `/images/marketing/venue-dining.png` + fixture card ("500+ venues") |
| Reporting | `ReportingSection` | 42% savings / 18 hrs / 100% compliance / 4.9/5 rating |
| Testimonials | `TestimonialsSection` | 3 fictional "design partner" quotes |
| Final CTA | `CtaSection` | Dark bg, "Book a Demo" + "Explore Platform" buttons |

**Hero buttons:**
- **Book a Demo** → `/contact` (dark pill)
- **See Platform** → `/platform` (outlined pill)

**Hero product image:** `/images/marketing/hero-product.png`
> ⚠️ AI-generated mockup — **not a real screenshot of the app**

**Hero floating badges (hardcoded):**
- Bottom-left: "Payment Verified — GST Invoice INV-2024-0047" (green icon)
- Top-right: "AI Recommendation — 3 venues match your criteria" (amber icon)
> ⚠️ Decorative fixtures — not live data

**Social proof row:** 4 avatar circles (TM/IQ/RK/NS) + "Trusted by finance teams at leading Indian enterprises"
> ⚠️ Fixture — no real customers

**Testimonials:** Priya Mehta (VP Finance), Arjun Kapoor (Head of Operations), Chef Sandeep Rawat
> ⚠️ Fictional design-partner personas — labeled "Design Partner Feedback" in the section header

**ROI stats:** 42%, 18 hrs, 100%, 4.9/5
> ⚠️ Illustrative targets — not measured production data

**Hero motion (on mount):**
- Badge chip: `opacity 0→1, y 30→0` at 0ms
- H1: same at 100ms delay
- Paragraph: same at 200ms delay
- CTA buttons: `opacity 0→1, y 20→0` at 350ms delay
- Social proof: `opacity 0→1` at 600ms delay
- Product image: `opacity 0→1, y 50→0, scale 0.97→1` at 300ms delay
- Floating badge (bottom-left): `opacity 0→1, x -20→0` at 800ms delay
- Floating badge (top-right): `opacity 0→1, x 20→0` at 1000ms delay

---

### `/platform` — Platform Architecture Page

**File:** `app/platform/page.tsx`

| Section | Component | Key Content |
|---|---|---|
| Hero | `PlatformHero` | Headline, sub, "Request Architecture Briefing" → `/contact` |
| 5 Pillars | `PlatformPillars` | Venue Discovery, Approval Routing, Finance & GST, Payments, AI Intelligence |
| Architecture | `PlatformArchitecture` | Technical stack diagram (illustrative) |
| Integrations | `PlatformIntegrations` | Slack, Zendesk, Razorpay, Tally ERP, SAP HR, GSTN |
| Security | `PlatformSecurity` | SOC 2 Type II, ISO 27001, RBI data residency |
| CTA | `PlatformCta` | "Request Architecture Briefing" → `/contact` |

> ⚠️ **Integrations (Slack, Zendesk, Tally, SAP, GSTN) are NOT implemented** — roadmap positioning only.
> ⚠️ **Security certifications (SOC 2, ISO 27001) are NOT obtained** — aspirational claims.

---

### `/partners` — Hospitality Partners Page

**File:** `app/partners/page.tsx`

| Section | Component | Key Content |
|---|---|---|
| Hero | `PartnersHero` | `/images/marketing/partners-hospitality.png` as bg |
| Value | `PartnersValue` | Guaranteed spend, zero commission, verified payments |
| Tiers | `PartnersTiers` | Bronze / Silver / Gold with fixture perks |
| Operations | `PartnersOperations` | Booking operations explainer |
| Testimonials | `PartnersTestimonials` | 2 fictional venue partner quotes |
| Application | `PartnersApplication` | Partner application form (React state, UI only) |

**Application form fields:** Restaurant/Hotel Name, City, Capacity, Annual Corporate F&B Revenue, Contact Name, Designation, Email, Phone

> ⚠️ **Form is UI-only.** On submit, `submitted` state toggles to show a thank-you message. **No data is stored, sent, or emailed.**

> ⚠️ Gold tier claim "₹50L+ guaranteed monthly pipeline" is **illustrative and not contractual**.

---

### `/contact` — Contact & Demo Request Page

**File:** `app/contact/page.tsx`

**Sections:** `ContactHero`, `ContactFormSection`, `ContactFaq`

**ContactFormSection fields:**
- Full Name
- Company Name
- Designation / Role
- Annual Corporate Dining & Events Spend (dropdown: Under ₹25L / ₹25L–₹1Cr / ₹1Cr–₹5Cr / ₹5Cr+)
- Specific Requirements / Upcoming Events (textarea)
- Submit button: "Schedule Executive Briefing"

> ⚠️ **Form is UI-only.** On submit, shows thank-you message. **No backend, no email, no CRM integration.**

**Contact details shown:**
- `sales@relatia.in` (Enterprise Sales)
- `partners@relatia.in` (Hospitality Partnerships)
- "Bandra Kurla Complex (BKC), Mumbai" (Corporate HQ)

> ⚠️ Email addresses may not be active. Address is illustrative.

**FAQ topics:** Rollout timeline (48h), GST compliance, exec tier limits, Razorpay vs corporate cards
> ⚠️ Answers are positioning copy, not verified SLA commitments.

---

### MarketingFooter (`components/marketing/marketing-footer.tsx`)

4 link columns:

| Column | Links |
|---|---|
| Platform | How It Works (`/platform`), Venue Discovery (`/platform#venues`), Approvals (`/platform#approvals`), Finance & GST (`/platform#finance`), AI Assistant (`/platform#ai`) |
| Company | About (`/contact`), Partners (`/partners`), Careers (`/contact`), Blog (`/contact`) |
| Resources | Book a Demo (`/contact`), Documentation (`/contact`), Help Center (`/contact`), API (`/contact`) |
| Legal | Privacy Policy (`/contact`), Terms of Service (`/contact`), Security (`/contact`) |

> ⚠️ About, Blog, Careers, Privacy Policy, Terms of Service, API docs, Help Center — **none of these pages exist.** All redirect to `/contact`.

Social icons: LinkedIn and Twitter/X — both `href="#"` — **not linked to real accounts.**

Copyright: `© 2026 Relatia Technologies Pvt. Ltd.` — **fictional legal entity, not registered.**

---

## E. Internal Product Deep Map

### Authentication (Clerk)

Auth provider: **Clerk** (`@clerk/nextjs`)

- Sign-up → `/onboarding` redirect
- Sign-in → `/dashboard` redirect
- Sign-out → `/` redirect

`lib/auth.ts` functions:

| Function | Behavior |
|---|---|
| `ensureAppUser()` | Syncs Clerk user to DB user (upsert by email); creates if new |
| `requireAppUser()` | Calls `ensureAppUser`; redirects to `/onboarding` if no company |
| `requireOnboardingUser()` | Calls `ensureAppUser`; redirects to `/dashboard` if company exists |
| `requireUserRole(roles[])` | Calls `requireAppUser`; redirects to `/dashboard` if role not in list |
| `getSessionUserId()` | Returns Clerk `userId` string; redirects to `/sign-in` if not logged in |

---

### `/onboarding`

- Guard: `requireOnboardingUser()`
- Form: Company name (required, 2–80 chars) → Server Action `createCompanyAction`
- Action: Creates `Company` record + default `Policy` + seeds venues for the company
- On success: redirects to `/dashboard`

---

### `/dashboard`

- Guard: `requireAppUser()` (via `DashboardShell` in layout)
- `DashboardShell` renders sidebar nav: Dashboard, Events, Venues, Approvals, Finance, Settings
- Data: all company events, all company venues, company policy
- KPI cards: My Events (count), Pending Approvals (count), Available Venues (count), Max Event Cap (paise → ₹)
- Recent Events table: last 5, with title / city / type / attendees / budget / status badge
- Links: "View all" → `/events`, "Create Event" → `/events/new`

---

### `/dashboard/approvals`

- Guard: `requireUserRole(["APPROVER", "ADMIN"])`
- Data: `listPendingApprovals(user)` scoped to company
- Components: `ApprovalsList` → `ApprovalListItem` → `ApprovalActionButtons`
- Actions: **Approve** / **Reject** via Server Actions → atomically updates `Approval.status` + `Event.status`

---

### `/dashboard/finance`

- Guard: `requireUserRole(["FINANCE", "ADMIN"])`
- Data: `getFinanceDashboardData(companyId)` → KPI metrics + invoice records
- KPI cards: Total Spend, GST Saved (ITC), Invoices Issued, Pending Payments
- Records table: each row links to `/dashboard/finance/invoices/[id]`

---

### `/dashboard/finance/invoices/[id]`

- Guard: `requireUserRole(["FINANCE", "ADMIN"])`
- Validates: `id` must be positive integer; `notFound()` otherwise
- Tenant isolation: `getInvoiceById(id, companyId)` — always scoped to company
- Components: `InvoiceDetailCard`, `PrintInvoiceButton`, `RazorpayPayButton`
- **Print:** `window.print()` triggered by `PrintInvoiceButton`; invoice card uses `print:hidden` / `print:block` Tailwind classes for print-optimized layout
- **Pay:** `RazorpayPayButton` shown only if `paymentStatus !== "PAID"`; opens Razorpay Checkout JS modal; server creates order via `create-payment-order.ts`; client verifies via `verify-payment.ts`

---

### `/events`

- Guard: `requireAppUser()`
- Data: all events for `companyId`, `orderBy dateTime desc`
- Components: `EventsPageHeader`, `EventsEmptyState`, `EventListItem`
- Each row: links to `/events/[id]`

---

### `/events/new`

- Guard: `requireAppUser()`
- Pre-condition: policy must exist for company (throws if not found)
- Components: `EventPolicyBanner`, `EventForm`
- Form fields: Title, Event Type (6 types), Purpose (optional), City (dropdown from `policy.allowedCities`), Date & Time, Attendees, Budget (₹, stored in paise), Dietary Requirements
- Action: `createEventAction` → creates `Event` with `status: DRAFT` → redirects to `/events/[id]`

---

### `/events/[id]`

- Guard: `requireAppUser()`
- Data: `getEventById(id, companyId)` (tenant-scoped)
- Components: `EventDetailsCard`, `EventStatusBadge`, `RequestBookingButton`, `EventBookingSummaryCard`, `EventVenueDiscoveryCard`
- State machine buttons shown:
  - `DRAFT` → "Submit for Approval" (if `canSubmitEvent`)
  - `APPROVED` → "Discover Venues" link (`/venues?eventId=...`)
  - `VENUE_SELECTED` → booking confirmation flow
  - `BOOKED` → link to invoice

---

### `/venues`

- Guard: `requireAppUser()`
- Query params: `city`, `priceBand`, `minCapacity`, `eventId` (optional context from event detail)
- Data: `getVenues(companyId, filters)`
- Components: `VenuesPageHeader`, `VenueFilters`, `VenuesList`
- Filters: City (from `policy.allowedCities`), Price Band (BUDGET / MID / PREMIUM / LUXURY), Min Capacity — client-side `useRouter` push on change

---

### `/venues/[id]`

- Guard: `requireAppUser()`
- Data: `getVenueById(id, companyId)`
- Components: `VenueDetailsCard`, `SelectVenueForEventCard`
- "Select venue" button: only shown if `?eventId=` is present and event is in `APPROVED` or `VENUE_SELECTED` status

---

### `/api/webhooks/razorpay`

- Method: `POST` only
- Security: HMAC-SHA256 signature verified via `lib/payments/verify-webhook.ts` against `RAZORPAY_WEBHOOK_SECRET`
- Idempotency: deduplicates via `WebhookEventLog` (checks `eventId` before processing)
- Handles: `payment.captured` → sets `Booking.paymentStatus = PAID`, `Booking.razorpayPaymentId`, `Booking.paidAt`, `Invoice.status = PAID`
- Returns: 400 bad signature, 200 duplicate, 500 unexpected error

---

## F. Capability Truth Table

| Feature | Status | Notes |
|---|---|---|
| Public website (4 pages) | LIVE | /, /platform, /partners, /contact |
| User sign-up / sign-in (Clerk) | LIVE | Requires Clerk keys in .env.local |
| Company onboarding | LIVE | Creates company + policy in DB |
| Event creation (DRAFT) | LIVE | Full form to DB |
| Submit event for approval | LIVE | REQUESTED state + Approval records created |
| Approval queue (Approve/Reject) | LIVE | Role-gated APPROVER/ADMIN |
| Venue discovery with filters | LIVE | City, price band, capacity |
| Venue selection for event | LIVE | VENUE_SELECTED transition |
| Booking creation | LIVE | Creates Booking record |
| GST invoice generation | LIVE | CGST/SGST/IGST computed in lib/finance/gst.ts |
| Invoice detail + print | LIVE | window.print() + print-safe CSS |
| Finance dashboard (KPIs) | LIVE | Role-gated FINANCE/ADMIN |
| Razorpay payment modal | TEST-MODE ONLY | Requires rzp_test_* keys |
| Razorpay webhook handler | TEST-MODE ONLY | Signature verified; payment.captured only |
| Contact / Demo form | DEMO FIXTURE | UI only — no backend, no email, no CRM |
| Partners application form | DEMO FIXTURE | UI only — data discarded on submit |
| Homepage testimonials | DEMO FIXTURE | Fictional "design partner" personas |
| Homepage social proof avatars | DEMO FIXTURE | Hardcoded TM/IQ/RK/NS |
| ROI stats (42%, 18hrs, 100%, 4.9/5) | DEMO FIXTURE | Illustrative targets, not measured |
| AI venue recommendations | DEMO FIXTURE | DB filter query only — no LLM |
| Footer links (About, Blog, Careers, Legal) | PARTIALLY IMPLEMENTED | All point to /contact as placeholder |
| Social media links (LinkedIn, Twitter) | PARTIALLY IMPLEMENTED | href="#" — no real accounts |
| Slack integration | PLANNED | Listed on /platform page only |
| Zendesk integration | PLANNED | Listed on /platform page only |
| Tally ERP integration | PLANNED | Listed on /platform page only |
| SAP HR integration | PLANNED | Listed on /platform page only |
| GSTN integration | PLANNED | Listed on /platform page only |
| SOC 2 / ISO 27001 | PLANNED | Aspirational claims on /platform — not certified |
| AI spend intelligence (LLM) | PLANNED | Day 10+ roadmap |
| Email notifications | PLANNED | Not implemented |
| Dashboard settings page | PLANNED | Page exists but is a stub |
| Multi-company admin | PLANNED | Single company per user only |
| PDF invoice download | PLANNED | pdfUrl field in schema; generation not built |

---

## G. Developer Onboarding Truth

### Clone

```bash
git clone https://github.com/purvender/relatia-app.git
cd relatia-app
git checkout develop
```

### Install

```bash
npm install
# postinstall runs: prisma skills sync
```

### Environment

```bash
cp .env.example .env.local
# Then edit .env.local with your actual values
```

Required variables:

| Variable | Source |
|---|---|
| `DATABASE_URL` | Local Postgres or Supabase/Neon/Railway |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | dashboard.clerk.com → API Keys |
| `CLERK_SECRET_KEY` | dashboard.clerk.com → API Keys |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | dashboard.razorpay.com → Settings → API Keys |
| `RAZORPAY_KEY_SECRET` | Same |
| `RAZORPAY_WEBHOOK_SECRET` | Razorpay → Webhooks → secret |

### Database

```bash
npx prisma migrate deploy    # Apply all 6 migrations
npm run db:seed              # Seed companies, users, venues, policies
```

### Run

```bash
npm run dev        # http://localhost:3000
npx tsc --noEmit   # TypeScript check (must exit 0)
npm run lint       # ESLint check (must exit 0)
```

### Branch Workflow

```
main        protected release branch — never commit directly
develop     active working branch
feature/*   off develop
fix/*       off develop
```

---

## H. Risks / Mismatches

### 1. Contact and Partners forms are UI-only (HIGHEST RISK)
Forms look complete but discard all submitted data. No CRM, email, or DB write.
**Action:** Add `// TODO: wire to CRM / Resend email` before next developer touches these files.

### 2. Platform page claims unbuilt integrations
`/platform` lists Slack, Zendesk, Tally, SAP, GSTN as integration partners. None exist in `lib/`.
**Action:** Add developer comment in `platform-sections.tsx` marking these as PLANNED.

### 3. "AI" is a DB filter query, not LLM
`lib/events/get-venue-discovery-query.ts` runs a structured Prisma filter. No Gemini/GPT/embedding API calls.
**Action:** Avoid calling this "AI" in internal docs until Day 10+ LLM integration is built.

### 4. Homepage stats and testimonials are hardcoded fiction
42%/18hrs/100%/4.9/5 and all three testimonial quotes are static JavaScript arrays. No analytics backing them.

### 5. Social links and emails are placeholders
Footer LinkedIn/Twitter: `href="#"`. Contact page emails (`sales@relatia.in`, `partners@relatia.in`) may not be live inboxes. BKC address is illustrative.

### 6. Razorpay is test-mode only
Production keys not configured. Webhook not registered on Razorpay Dashboard for production. Payments will fail if keys are missing.

### 7. No GitHub branch protection rules
Anyone can force-push to `main`. Configure protection before sharing repo with additional contributors.

### 8. .env files are safe but must be verified locally
`.env` and `.env.local` are blocked by `.gitignore` and not committed. New developer must populate `.env.local` from `.env.example` before running the app.

### 9. CLAUDE.md is a stub
`CLAUDE.md` at root contains only "# Relatia". Cosmetic clutter — no impact on app.

---

## Summary

| Dimension | Status |
|---|---|
| Safe to clone and run | YES — .env.example complete, seed script works, no secrets committed |
| Safe for public GitHub | YES — secrets blocked by .gitignore |
| Branch protection | NO — configure before onboarding contributors |
| Marketing forms wired | NO — UI-only, highest confusion risk |
| AI claims accurate | PARTIAL — marketing language; no LLM yet |
| Payments production-ready | NO — test mode only |

### Single Next Action

Configure branch protection on `main`:
1. Go to https://github.com/purvender/relatia-app/settings/branches
2. Add rule for `main`: require PR + 1 approval + disallow force pushes

Then start Day 10 (AI intelligence layer).

---

*Generated 2026-09-26 from actual source code — not from prior documentation or memory.*
