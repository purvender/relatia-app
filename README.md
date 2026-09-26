# Relatia — Enterprise Dining & Relationship Spend Operating System

Relatia is an India-first enterprise platform engineered to streamline corporate dining, private events, multi-tier approvals, Indian GST-compliant invoicing, Razorpay payments, and relationship spend management.

---

## 📅 35-Day Implementation Roadmap Status

* **Day 1–4**: Project initialization, database schemas, Clerk authentication, multi-tenant company isolation, role-based access control. — **COMPLETE**
* **Day 5**: Event lifecycle management (`DRAFT` → `REQUESTED` → `APPROVED` → `VENUE_SELECTED` → `BOOKED` → `COMPLETED`), venue discovery, and multi-tier approval flows. — **COMPLETE**
* **Day 6**: Finance dashboard, automated GST B2B invoice calculation, SAC 996331 codes, and invoice detail views. — **COMPLETE**
* **Day 7**: End-to-end Razorpay Checkout integration, client verification callback, and idempotent webhook reconciliation (`/api/webhooks/razorpay`). — **COMPLETE**
* **Day 8**: Public-facing marketing website inspired by editorial luxury and enterprise craft (Home, Platform, Partners, Contact). — **COMPLETE**
* **Day 9**: Website verification, full audit, responsive QA, zero-error linting/build, repository documentation, and LinkedIn launch foundation. — **COMPLETE**
* **Day 10–35 (Upcoming Roadmap)**:
  * Slack & Microsoft Teams interactive approval bots
  * Live reservation management POS integrations (SevenRooms / TableCheck)
  * Automated GSTR-2B API matching and TallyPrime / SAP ERP ledger export
  * AI-powered venue recommendation engine & CRM deal velocity analytics
  * SOC 2 Type II compliance audit preparation

---

## ⚖️ Live vs. Planned Capabilities

| Domain | Live Now (In Repository) | Live in Test Mode | Planned Roadmap (Days 10–35) |
| :--- | :--- | :--- | :--- |
| **Authentication** | Multi-tenant Clerk auth, company isolation | — | Enterprise SAML 2.0 / Okta SSO direct sync |
| **Event Lifecycle** | 6-stage atomic state machine in PostgreSQL | — | Recurring events & multi-city roadshow batches |
| **Approvals** | In-app approvals queue with budget context | — | Native Slack & Microsoft Teams interactive bot cards |
| **Venues** | Curated catalog with PDR capacity & minimums | — | 2-way live calendar sync with SevenRooms/TableCheck |
| **Payments** | Webhook verification (`/api/webhooks/razorpay`) | Dynamic Razorpay Checkout (`rzp_test_`) | Corporate credit lines & multi-party escrow splits |
| **Finance & Tax** | B2B GST calculation (SAC 996331, CGST, SGST) | — | Direct GSTR-2B portal API filing & SAP/Tally export |
| **Public Site** | Full 4-page responsive luxury marketing website | — | Interactive ROI savings calculator |
| **AI Intelligence** | Analytics UI representations & deal velocity specs | — | Real-time GenAI venue recommendation inference |

---

## 🗺️ Route Map

### Public Marketing Website
| Route | Page File Path | Description | Access Level |
| :--- | :--- | :--- | :--- |
| **`/`** | `app/page.tsx` | Editorial homepage (Hero, floating cards, workflow map, finance narrative, roles bento, CTA) | Public |
| **`/platform`** | `app/platform/page.tsx` | Platform Architecture (5 Core Pillars, Interactive persona switcher, ERP connectors) | Public |
| **`/partners`** | `app/partners/page.tsx` | Hospitality Partner Network (Partner economics, room curation standards, application form) | Public |
| **`/contact`** | `app/contact/page.tsx` | Executive Consultation & Demo (Tailored consultation request form, 30-min audit, FAQ) | Public |

### Core Application & Protected Routes
| Route | Page File Path | Description | Access Control |
| :--- | :--- | :--- | :--- |
| **`/sign-in`** | `app/(auth)/sign-in/[[...sign-in]]/page.tsx` | Clerk authentication sign-in | Public |
| **`/sign-up`** | `app/(auth)/sign-up/[[...sign-up]]/page.tsx` | Clerk authentication sign-up | Public |
| **`/onboarding`** | `app/onboarding/page.tsx` | Company tenant initialization wizard | Authenticated |
| **`/dashboard`** | `app/dashboard/page.tsx` | Enterprise KPI overview | Authenticated |
| **`/dashboard/approvals`** | `app/dashboard/approvals/page.tsx` | Manager & Finance multi-tier approvals queue | APPROVER, ADMIN |
| **`/dashboard/finance`** | `app/dashboard/finance/page.tsx` | Finance ledger, invoices table & payment actions | FINANCE, ADMIN |
| **`/dashboard/finance/invoices/[id]`** | `app/dashboard/finance/invoices/[id]/page.tsx` | B2B tax invoice detail (SAC 996331, CGST, SGST) | FINANCE, ADMIN |
| **`/events`** | `app/events/page.tsx` | Corporate dining & events directory | Authenticated |
| **`/events/new`** | `app/events/new/page.tsx` | Event creation wizard (headcount, tier, budget) | EVENT_PLANNER, ADMIN |
| **`/events/[id]`** | `app/events/[id]/page.tsx` | Event detail, venue lock, and booking lifecycle tracker | Authenticated |
| **`/venues`** | `app/venues/page.tsx` | Curated venue directory with capacity & cuisine filters | Authenticated |
| **`/venues/[id]`** | `app/venues/[id]/page.tsx` | Venue profile, private room specs, and minimum spends | Authenticated |
| **`/api/webhooks/razorpay`** | `app/api/webhooks/razorpay/route.ts` | Razorpay webhook route handler (HMAC-SHA256 verified) | Webhook Service |

---

## 🛠️ Architecture & Tech Stack

* **Framework**: Next.js 16 (App Router, Turbopack, React 19, Server Actions)
* **Language & Styling**: TypeScript (Strict), Tailwind CSS, Vanilla CSS design tokens (`app/marketing.css`), Lucide React
* **Motion & Animation**: Framer Motion with custom cubic bezier curves and strict `prefers-reduced-motion` compliance
* **Database & ORM**: PostgreSQL via Prisma 8 (`@prisma/orm-postgres`) with contract schema emission
* **Authentication**: Clerk Authentication with multi-tenant company mapping
* **Payments & Billing**: Razorpay Payment Gateway, Webhook HMAC signatures, and automated Indian GST calculation

---

## 🚀 Quickstart & Local Setup

### 1. Clone & Install
```bash
git clone https://github.com/your-org/relatia-app.git
cd relatia-app
git checkout develop
npm install
```

### 2. Environment Variables Setup
Copy `.env.example` to `.env.local` and add your development keys:
```bash
cp .env.example .env.local
```

Required keys in `.env.local`:
* `DATABASE_URL`: PostgreSQL connection string (e.g. `postgresql://postgres:postgres@localhost:5432/relatia_app?schema=public`)
* `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk test publishable key (`pk_test_...`)
* `CLERK_SECRET_KEY`: Clerk secret key (`sk_test_...`)
* `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: `"/sign-in"`
* `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: `"/sign-up"`
* `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`: `"/dashboard"`
* `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`: `"/onboarding"`
* `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Razorpay key ID (`rzp_test_...`)
* `RAZORPAY_KEY_SECRET`: Razorpay secret key
* `RAZORPAY_WEBHOOK_SECRET`: Webhook verification secret

### 3. Database Migration
```bash
npx prisma contract emit
npx prisma migrate dev
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the marketing website, or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the app.

---

## 🧪 Verification & Code Quality

Always verify your changes with these commands:

```bash
# Strict TypeScript Type Check (Must pass with 0 errors)
npx tsc --noEmit

# ESLint Verification (Must pass with 0 errors)
npm run lint

# Production Next.js Build
npm run build
```

---

## 🌿 Branching & Contribution Workflow

Relatia enforces a structured GitFlow strategy. Direct pushes to `main` are blocked.

* **`main`**: Production-ready releases only.
* **`develop`**: Integration branch for active feature development.
* **`feature/<name>`**: Feature branches branching from `develop` and merging back via Pull Request.
* **`fix/<name>`**: Bug fixes branching from `develop`.

See [`docs/repository-guide.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/repository-guide.md) for full branch conventions, Conventional Commit standards, and review checklists.

---

## 📁 Key Documentation References

* **Developer Setup Guide**: [`docs/developer-setup.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/developer-setup.md) — Step-by-step installation, troubleshooting, and credentials guide.
* **Technical Architecture**: [`docs/architecture.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/architecture.md) — Multi-tenant data model, state machines, GST math, and Razorpay flow.
* **Website & Route Map**: [`docs/website-and-route-map.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/website-and-route-map.md) — Component breakdown, interactive behaviors, and form specifications.
* **Repository Guide**: [`docs/repository-guide.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/repository-guide.md) — Branch workflow, Conventional Commits, PR template, and code review rules.
* **Enterprise Demo Narrative**: [`docs/demo-narrative.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/demo-narrative.md) — 5-act customer demo script and FAQ objection handling.
* **Launch & Business Foundation**: [`docs/launch-and-business-foundation.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/launch-and-business-foundation.md) — Pitch decks, LinkedIn launch drafts, and category definition.
* **MVP Implementation Status**: [`docs/relatia-mvp-status.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/relatia-mvp-status.md) — Technical lifecycle log and security validation rules.

---

## 📸 Screenshots & Visual Assets Index

| Asset | Path | Usage |
| :--- | :--- | :--- |
| **Product UI Mockup** | `public/images/marketing/hero-product.png` | Marketing Hero section previewing executive event bookings, approvals, and Razorpay payment status. |
| **Hospitality Partner** | `public/images/marketing/partners-hospitality.png` | Partners Network section showcasing fine dining culinary plating and private dining standards. |
| **Dining Atmosphere** | `public/images/marketing/venue-dining.png` | Homepage & Platform venue showcase highlighting private dining rooms and acoustics. |
