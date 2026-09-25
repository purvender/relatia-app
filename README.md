# Relatia — The AI-Native Operating System for Enterprise Dining & Relationship Spend

Relatia is an enterprise platform engineered to streamline corporate dining, private events, executive approvals, Indian GST-ready invoicing, Razorpay payments, and relationship spend management.

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

## 🗺️ Route Map

### Public Marketing Website (New)
| Route | Description | Status |
| :--- | :--- | :--- |
| `/` | Homepage (Hero, Trust indicators, 5-Stage Workflow, Finance narrative, AI spend intelligence, Testimonials, CTA) | Active (200 OK) |
| `/platform` | Platform Architecture (5 Core Pillars, Interactive Persona switcher, ERP integrations, Security standards) | Active (200 OK) |
| `/partners` | Hospitality Partners (Partner economics, 3-tier curation standards, operations portal, interactive partner application) | Active (200 OK) |
| `/contact` | Executive Consultation & Demo (Tailored consultation request form, 30-min audit breakdown, enterprise FAQ) | Active (200 OK) |

### Core Application & Protected Routes (Preserved)
| Route | Description | Access Control |
| :--- | :--- | :--- |
| `/dashboard` | Main Enterprise Dashboard | Authenticated |
| `/dashboard/approvals` | Multi-tier Manager & Finance Approvals Queue | APPROVER, ADMIN |
| `/dashboard/finance` | Finance Dashboard, Ledger & Invoices Table | FINANCE, ADMIN |
| `/dashboard/finance/invoices/[id]` | Detailed GST B2B Invoice & Payment Status | FINANCE, ADMIN |
| `/events` | Corporate Events & Dinners Directory | Authenticated |
| `/events/new` | Event Creation Wizard (Headcount, budget, client tier) | EVENT_PLANNER, ADMIN |
| `/events/[id]` | Event Detail & Booking Lifecycle Tracker | Authenticated |
| `/venues` | Curated Venue Directory & PDR Search | Authenticated |
| `/venues/[id]` | Venue Detail, Private Rooms & Minimum Spends | Authenticated |
| `/onboarding` | Company Tenant & Policy Setup Wizard | Authenticated |
| `/sign-in` | Clerk Enterprise Authentication / Sign In | Public |
| `/sign-up` | Clerk Enterprise Registration / Sign Up | Public |
| `/api/webhooks/razorpay` | Razorpay Webhook Handler (HMAC-SHA256 verified) | Razorpay Webhooks |

---

## 🛠️ Architecture & Tech Stack

* **Framework**: Next.js 16 (App Router, Turbopack, React 19, Server Actions)
* **Language & Styling**: TypeScript, Tailwind CSS, Vanilla CSS design tokens (`app/marketing.css`), Lucide React
* **Motion & Animation**: Framer Motion with custom cubic bezier curves and strict `prefers-reduced-motion` compliance
* **Database & ORM**: PostgreSQL via Prisma 8 (`@prisma/orm-postgres`) with contract schema emission
* **Authentication**: Clerk Authentication with multi-tenant company mapping
* **Payments & Billing**: Razorpay Payment Gateway, Webhook HMAC signatures, and automated Indian GST calculation

---

## ⚙️ Environment Variables

Ensure your `.env` or `.env.local` contains the following keys:

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/relatia?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# Razorpay Payments
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
RAZORPAY_WEBHOOK_SECRET="your_razorpay_webhook_secret"
```

---

## 🚀 Local Development & Verification

### Run Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the marketing site or [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the app.

### Type Verification
```bash
npx tsc --noEmit
```

### Linting (Must pass with 0 errors)
```bash
npm run lint
```

### Full Production Build
```bash
npm run build
```

---

## 📁 Key Documentation References

* **Launch & Business Foundation**: [`docs/launch-and-business-foundation.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/launch-and-business-foundation.md) — Pitch decks, LinkedIn launch drafts, and category definition.
