# Relatia Website & Application Route Map

This document provides an exhaustive, component-level mapping of all public marketing pages and internal application routes in Relatia.

---

## 1. Public Marketing Website

The marketing website lives at the root of the application and serves external prospective enterprise buyers, event planners, finance leads, and hospitality partners.

### A. Route Index

| Route | Page File Path | Major Components | Layout Shell |
| :--- | :--- | :--- | :--- |
| **`/`** | `app/page.tsx` | `AnnouncementBar`, `HeroSection`, `TrustSection`, `WorkflowSection`, `FinanceSection`, `RolesSection`, `AISection`, `VenueSection`, `ReportingSection`, `TestimonialsSection`, `CtaSection` | `MarketingLayout` (`components/marketing/marketing-layout.tsx`) |
| **`/platform`** | `app/platform/page.tsx` | `PlatformHero`, `PlatformPillars`, `PlatformArchitecture`, `PlatformIntegrations`, `PlatformSecurity`, `PlatformCta` | `MarketingLayout` |
| **`/partners`** | `app/partners/page.tsx` | `PartnersHero`, `PartnersValue`, `PartnersTiers`, `PartnersOperations`, `PartnersTestimonials`, `PartnersApplication` | `MarketingLayout` |
| **`/contact`** | `app/contact/page.tsx` | `ContactHero`, `ContactFormSection`, `ContactFaq` | `MarketingLayout` |

---

### B. Public Page Deep Dives

#### 1. Homepage (`/`)
* **Purpose**: Primary brand landing page establishing Relatia as the enterprise operating system for dining and relationship spend.
* **Header Announcement**: "Announcing Relatia FY26: The Enterprise Relationship Spend Operating System".
* **Hero Section**:
  * Editorial headline: *"The AI-native operating system for enterprise dining & events"*.
  * Floating live visual cards: Live Reservation Status, 1-Click Approval, and GST Tax Recapture breakdown.
  * Product Screenshot: High-resolution preview of the event management interface (`public/images/marketing/hero-product.png`).
  * Primary Button: **"Book a Demo"** → Routes to `/contact`.
  * Secondary Button: **"Explore Platform"** → Routes to `/platform`.
* **Trust Wall**: Subtle marquee of India's leading enterprises, framed authentically as *"Architected for the operational standards of India's leading enterprises"*.
* **5-Stage Workflow**: Interactive step-by-step lifecycle breakdown (`DRAFT` → `REQUESTED` → `APPROVED` → `VENUE_SELECTED` → `BOOKED` → `COMPLETED`).
* **Finance Section**: Narrative comparing unmonitored employee corporate card leakage against Relatia's automated GST tax credit recapture.
* **Role-Based Bento Grid**: Tailored value propositions for Executive Assistants, Approvers, and Finance Controllers.
* **Curated Venues & Testimonials**: Venue photography (`public/images/marketing/venue-dining.png`) and early enterprise design partner perspectives.
* **Final CTA**: Full-width dark surface banner with **"Book a Demo"** and **"Explore Platform"** buttons.

#### 2. Platform Architecture (`/platform`)
* **Purpose**: Technical deep dive into the platform's 5 core pillars and enterprise ecosystem compatibility.
* **Interactive State Machine Map**: Visual horizontal flow with state tags, descriptions, and deterministic validation indicators.
* **5 Core Pillars**:
  1. *Hospitality Network*: Private dining rooms, acoustic ratings, and pre-negotiated minimums.
  2. *Governance & Compliance*: Contextual approvals, escalation timers, and audit logs.
  3. *Concierge & Operations*: Dietary profiles, calendar sync, and banquet director messaging.
  4. *Finance Automation*: B2B GST tax invoices, Razorpay settlement, and ERP journal syncing.
  5. *Predictive Analytics*: Relationship spend velocity and deal progression benchmarks.
* **Interactive Stakeholder Persona Switcher**:
  * 3 interactive tabs: *Executive Assistants*, *Approvers & Leadership*, *Finance & Tax Controllers*.
  * Switching tabs updates the mockup card showing what that persona sees.
* **Integrations Grid**: Native connector representations for SAP S/4HANA, Oracle NetSuite, TallyPrime, Zoho Books, Razorpay, and Okta.
* **Security & Compliance**: DPDP Indian data localization, TLS 1.3 / AES-256 encryption, and SOC 2 Type II / ISO 27001 architectural roadmap alignment.

#### 3. Hospitality Partners (`/partners`)
* **Purpose**: Partner recruitment portal for luxury hotel banquet directors and fine dining restaurateurs.
* **Hero Visual**: Overhead fine dining culinary plating (`public/images/marketing/partners-hospitality.png`).
* **Partner Economics Grid**:
  * 4.8x higher Average Order Value (AOV).
  * 0% no-show rate backed by pre-authorized escrow.
  * 72% weekday private dining room utilization (Tue–Thu corporate dining peak).
  * 24h automated B2B settlement.
* **3-Tier Curation Standards**: Luxury Flagship Hotels (The Leela, Taj, Oberoi, ITC), Chef-Driven Standalone Fine Dining, and Private Members' Clubs.
* **Partner Operations Portal Mockup**: UI preview of live reservations, banquet manager coordination, and guest allergen briefs.
* **Interactive Partner Application Form**:
  * Fields: Establishment Name, City (Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Goa), PDR Capacity, Contact Name, Email, Phone.
  * Submitting switches to an instant confirmation card: *"Application Received — Our Hospitality Curation Committee will reach out within 48 hours."*

#### 4. Executive Consultation & Demo (`/contact`)
* **Purpose**: High-converting enterprise inbound consultation request page.
* **Interactive Consultation Form**:
  * Captures: First Name, Last Name, Work Email, Company Name, Role, Annual Spend tier (e.g. ₹25L–₹1Cr), and Event Notes.
  * Submitting displays an immediate confirmation card with review timeframes.
* **"What to Expect in 30 Minutes"**:
  * 1. Tailored Workflow Audit.
  * 2. GST Recapture Model calculation.
  * 3. Curated Network Preview in primary operating cities.
* **Enterprise FAQ Accordion**:
  * Addresses rollout speed (<48h), Indian GST compliance, granular spend caps, and corporate card compatibility.

---

### C. Shared Marketing Layout & Navigation Behavior

#### Marketing Navigation (`components/marketing/marketing-nav.tsx`)
* **Sticky Positioning**: Fixed top navigation.
* **Scroll-Aware Transition**:
  * At top of page: Transparent background.
  * On scroll (>40px): Transitions smoothly to `var(--m-bg)` (95% opacity) with `backdrop-blur-xl` and subtle bottom border.
* **Route Indicators**: Active route indicator highlights current page (`/`, `/platform`, `/partners`, `/contact`).
* **Header Actions**:
  * **"Sign In"** button → Directs to `/sign-in`.
  * **"Launch App"** button → Directs to `/dashboard`.
* **Mobile Drawer**:
  * Hamburger menu opens a full-screen animated drawer for touchscreens.
  * Automatically locks body scroll (`overflow: hidden`).
  * Features accessible **Escape key** event listener to dismiss the menu.
  * Closes automatically when any navigation link is clicked.

#### Marketing Footer (`components/marketing/marketing-footer.tsx`)
* **Visual Contrast**: Dark luxury surface (`var(--m-bg-dark)`) with cream text.
* **4-Column Directory**: Platform links, Company links, Resources links, and Legal disclosures.
* **Brand Signature**: Custom SVG logo, copyright, and platform status indicator.

---

### D. Motion & Reduced-Motion Handling (`components/marketing/animations.tsx`)

* **Technology**: Framer Motion client components.
* **Easing Curve**: Custom cubic-bezier curve `[0.25, 0.46, 0.45, 0.94]`.
* **Reduced-Motion Compliance**:
  * Every wrapper (`FadeIn`, `FadeInUp`, `FadeInScale`, `FadeInLeft`, `FadeInRight`) inspects `useReducedMotion()`.
  * If a user has `prefers-reduced-motion: reduce` enabled on macOS/Windows/iOS/Android, initial transform and opacity offsets are set to `undefined`. Elements render statically in place without triggering motion sickness.

---

## 2. Core Internal Application Routes

These routes represent the authenticated enterprise operating system.

| Route | File Path | Access Level | Primary Components | Server Actions & Logic |
| :--- | :--- | :--- | :--- | :--- |
| **`/sign-in`** | `app/(auth)/sign-in/[[...sign-in]]/page.tsx` | Public | Clerk `<SignIn />` component | Session creation, redirects to `/dashboard` or `/onboarding`. |
| **`/sign-up`** | `app/(auth)/sign-up/[[...sign-up]]/page.tsx` | Public | Clerk `<SignUp />` component | New user registration. |
| **`/onboarding`** | `app/onboarding/page.tsx` | Authenticated | Company tenant wizard form | `completeCompanyOnboarding` (`app/onboarding/actions.ts`). |
| **`/dashboard`** | `app/dashboard/page.tsx` | Authenticated | `DashboardShell`, KPI cards | Fetches company metrics (Active events, YTD spend). |
| **`/dashboard/approvals`** | `app/dashboard/approvals/page.tsx` | Approver, Admin | `ApprovalsList`, `ApprovalListItem`, `ApprovalActionButtons` | `approveEvent`, `rejectEvent` (`app/dashboard/approvals/actions.ts`). |
| **`/dashboard/finance`** | `app/dashboard/finance/page.tsx` | Finance, Admin | `FinanceKpiCards`, `FinanceRecordsTable`, `RazorpayPayButton` | `getFinanceDashboardData`, `createPaymentOrder`, `verifyPayment`. |
| **`/dashboard/finance/invoices/[id]`** | `app/dashboard/finance/invoices/[id]/page.tsx` | Finance, Admin | `InvoiceDetailCard`, `PrintInvoiceButton` | `getInvoiceById`, renders B2B tax breakdown (SAC 996331, CGST, SGST). |
| **`/events`** | `app/events/page.tsx` | Authenticated | `EventsPageHeader`, `EventListItem`, `EventsEmptyState` | Lists tenant corporate events across all lifecycle states. |
| **`/events/new`** | `app/events/new/page.tsx` | Event Planner, Admin | `EventForm`, `EventPolicyBanner` | `createEvent` (`app/events/actions.ts`). Validates budget caps. |
| **`/events/[id]`** | `app/events/[id]/page.tsx` | Authenticated | `EventDetailsCard`, `EventBookingSummaryCard`, `EventVenueDiscoveryCard` | Displays real-time booking state machine, venue lock, and payment status. |
| **`/venues`** | `app/venues/page.tsx` | Authenticated | `VenuesPageHeader`, `VenueFilters`, `VenuesList`, `VenueCard` | `getVenues` (`lib/venues/get-venues.ts`). Search by city, capacity, cuisine. |
| **`/venues/[id]`** | `app/venues/[id]/page.tsx` | Authenticated | `VenueDetailsCard`, `SelectVenueForEventCard` | `selectVenueForEvent` (`app/venues/actions.ts`). Locks venue to event. |
| **`/api/webhooks/razorpay`** | `app/api/webhooks/razorpay/route.ts` | Razorpay Webhook | Route Handler (POST) | HMAC-SHA256 signature verification, updates `Booking` and `Invoice` to `PAID`. |

---

## 3. Real Implementation vs. Illustrative/Planned Capabilities

| Feature / Capability | Real Implementation (In Code Now) | Illustrative / Planned (On Roadmap) |
| :--- | :--- | :--- |
| **Event State Machine** | 6-stage atomic lifecycle transitions in PostgreSQL. | Recurring events and multi-city roadshow batches. |
| **Approvals** | In-app queue with budget and deal context cards. | Native Slack and Microsoft Teams bot integrations. |
| **Venues** | Curated catalog with PDR capacity and minimum spends. | Live two-way calendar sync with SevenRooms/TableCheck POS. |
| **Payments** | Dynamic Razorpay Checkout SDK + webhook verification. | Multi-vendor escrow payouts and automated credit lines. |
| **GST Invoices** | Automated integer-paise calculations (SAC 996331, CGST, SGST). | Direct automated GSTR-2B API matching with GST portal. |
| **ERP Sync** | Ledger tables formatted for standard corporate GL accounts. | Real-time bi-directional sync with SAP S/4HANA & NetSuite. |
| **AI Intelligence** | UI mockups of relationship ROI and deal acceleration metrics. | Live GenAI inference predicting venue deal close rates. |
| **Compliance** | Tier-4 Indian data residency architecture & RBAC isolation. | Third-party SOC 2 Type II and ISO 27001 audit certifications. |
