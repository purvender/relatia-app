# Relatia Technical Architecture

This document provides a comprehensive, plain-English overview of the technical architecture, data models, state machines, and integrations powering Relatia.

---

## 1. System Overview

Relatia is an **enterprise relationship-spend and hospitality orchestration platform**. It replaces fragmented corporate dining workflows (emails, phone calls, unapproved corporate card swipes, lost paper receipts) with an integrated digital operating system.

### Core Architecture Layers:

```
┌────────────────────────────────────────────────────────┐
│                   Next.js 16 App Router                │
│       (Public Marketing Site + Protected Core App)     │
└───────────┬────────────────────────────────┬───────────┘
            │                                │
            ▼                                ▼
┌───────────────────────┐        ┌───────────────────────┐
│  Clerk Authentication │        │  Tailwind + Tokens    │
│  & Role Authorization │        │  (app/marketing.css)  │
└───────────┬───────────┘        └───────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│              Multi-Tenant Data Access Layer            │
│                 (Company Tenant Isolation)             │
└───────────┬────────────────────────────────┬───────────┘
            │                                │
            ▼                                ▼
┌───────────────────────┐        ┌───────────────────────┐
│       Prisma 8        │        │   Razorpay Gateway    │
│  PostgreSQL Database  │        │   & Webhook Handler   │
└───────────────────────┘        └───────────────────────┘
```

---

## 2. Next.js 16 App Router Structure

The application is structured into two complementary domains within the Next.js App Router:

1. **Public Marketing Surface**:
   * Root: `/` (`app/page.tsx`)
   * Platform Architecture: `/platform` (`app/platform/page.tsx`)
   * Hospitality Partner Network: `/partners` (`app/partners/page.tsx`)
   * Executive Consultation & Demo: `/contact` (`app/contact/page.tsx`)
   * Wrapped in `MarketingLayout` (`components/marketing/marketing-layout.tsx`) which scopes the editorial design system (`app/marketing.css`) and loads Google's Playfair Display font without bleeding into the dashboard.

2. **Authenticated Core Application Surface**:
   * Authentication: `app/(auth)/sign-in` and `app/(auth)/sign-up`
   * Onboarding: `app/onboarding`
   * Executive Dashboard: `app/dashboard`
   * Approvals Queue: `app/dashboard/approvals`
   * Finance & GST Ledger: `app/dashboard/finance`
   * Invoice Detail: `app/dashboard/finance/invoices/[id]`
   * Corporate Events: `app/events`, `app/events/new`, `app/events/[id]`
   * Venue Discovery: `app/venues`, `app/venues/[id]`
   * Webhook API: `app/api/webhooks/razorpay/route.ts`

---

## 3. Authentication & Tenant Isolation Model

### Authentication via Clerk
* Clerk handles identity management, sessions, and sign-in/sign-up components.
* User identity is resolved server-side via `lib/auth.ts`:
  * `currentUserId()`: Extracts verified Clerk user ID.
  * `currentCompany()`: Queries the database `User` table to resolve the associated `companyId` and `role`.

### Multi-Tenant Isolation
* Every enterprise customer is represented by a `Company` tenant row.
* Every business entity in the database (`Event`, `Booking`, `Invoice`, `Policy`, `User`) is scoped with a mandatory `companyId`.
* All queries and mutations in `lib/` enforce tenant scoping:
  ```ts
  // Example tenant-safe query pattern:
  const company = await currentCompany();
  const events = await db.orm.public.Event.findMany({
    where: { companyId: company.id }
  });
  ```
* Cross-tenant access is structurally prevented at the database query level.

---

## 4. The Event & Booking Lifecycle State Machine

Relatia coordinates corporate dining through an atomic 6-stage deterministic state machine:

```
[ DRAFT ]
   │
   │ (Event Planner submits brief, headcount & budget cap)
   ▼
[ REQUESTED ]
   │
   │ (Manager / Finance Approver clears policy threshold)
   ▼
[ APPROVED ]
   │
   │ (Host selects curated private dining room)
   ▼
[ VENUE_SELECTED ]  <--- Exactly 1 Booking row created (paymentStatus = PENDING)
   │
   │ (Razorpay escrow payment verified via checkout callback or webhook)
   ▼
[ BOOKED ]          <--- Booking.paymentStatus = PAID, Invoice.status = PAID
   │
   │ (Event takes place, GSTR-2B settlement finalized)
   ▼
[ COMPLETED ] / [ CANCELLED ]
```

### State-by-State Rules:
* **`DRAFT`**: Host is assembling event details (date, headcount, budget, client tier). Editable by creator.
* **`REQUESTED`**: Locked for editing. Dispatched to the approvals queue.
* **`APPROVED`**: Approval threshold passed. Venue selection is unlocked.
* **`VENUE_SELECTED`**: Host selects a venue. Exactly **one `Booking` record** is created atomically in PostgreSQL. `paymentStatus` is initialized to `PENDING`.
* **`BOOKED`**: Razorpay payment signature is verified (via client callback or server webhook). Payment status updates to `PAID`, invoice status updates to `PAID`.
* **`COMPLETED`**: Event fulfilled successfully.

---

## 5. Indian GST & Financial Invoicing Architecture

Corporate dining in India is subject to statutory Goods and Services Tax (GST). Relatia eliminates tax credit leakage through automated calculation and invoice generation:

* **Service Accounting Code (SAC)**: `996331` (Restaurant and outdoor catering services).
* **Tax Splitting (`lib/finance/gst.ts`)**:
  * **Intra-State**: 9% CGST + 9% SGST = 18% Total GST.
  * **Inter-State**: 18% IGST.
* **Precision Mathematics**: All financial values are calculated in **integer paise** (e.g., ₹50,000 = `5000000` paise) to prevent floating-point rounding errors across line-items.
* **Invoice Record**: Generated automatically when a booking is created or invoice is viewed, capturing `vendorGstin`, `clientGstin`, taxable amount, tax components, and payment status.

---

## 6. Razorpay Payment & Webhook Architecture

Payment processing is built to support both instant client-side checkout and asynchronous server-side reconciliation:

```
[User Clicks "Pay via Razorpay"]
           │
           ▼
[Server Action: createPaymentOrder()] ──→ Creates Razorpay Order (Paise)
           │
           ▼
[Client: Razorpay Checkout JS Modal]
           │
           ├───────────────────────────────┐
           ▼                               ▼
[Browser Callback Verification]   [Webhook: /api/webhooks/razorpay]
   verifyPayment()                   HMAC-SHA256 Signature Verification
           │                               │
           ▼                               ▼
     [Database: Booking.paymentStatus = PAID, Event.status = BOOKED]
```

### Key Security & Reliability Guards:
1. **Dynamic SDK Loading**: `RazorpayPayButton` dynamically injects `https://checkout.razorpay.com/v1/checkout.js` on demand.
2. **Double Verification**:
   * Fast-path: Client-side payment handler calls `verifyPayment` server action upon modal completion.
   * Resilient-path: Asynchronous server-side webhook handler at `/api/webhooks/razorpay` captures `payment.captured` events independently.
3. **Idempotency**: Webhook events are logged in the database (`WebhookEventLog`) to ensure duplicate delivery of the same webhook payload does not double-process state updates.
4. **Development Fallback**: In local development with placeholder keys, the payment action provides a safe test order simulation without failing.

---

## 7. Public Marketing Site Architecture

The marketing site was designed with luxury enterprise restraint:
* **Color System**: Forest Green (`#1C2E24`), Warm Cream (`#FDFCFA`), Warm Ochre (`#C89B3C`), and Dark Surface (`#0F1813`).
* **Typography Pairing**: Playfair Display (editorial serif) for grand headlines, Inter (sans) for technical clarity, JetBrains Mono for system tags.
* **Motion Design (`components/marketing/animations.tsx`)**:
  * Powered by Framer Motion using a custom cubic-bezier curve (`[0.25, 0.46, 0.45, 0.94]`).
  * Every animated component incorporates `useReducedMotion()`. If a user enables reduced motion at the OS level, motion transitions are disabled to prevent vestibular discomfort.

---

## 8. Integration Architecture: Live vs. Planned

| Integration | Type | Status | Technical Implementation |
| :--- | :--- | :--- | :--- |
| **Clerk Auth** | Identity & SSO | **Live Now** | `@clerk/nextjs`, middleware session validation, multi-tenant resolution. |
| **PostgreSQL / Prisma** | Database / ORM | **Live Now** | Prisma 8 with `@prisma/orm-postgres` contract schema emission. |
| **Razorpay Checkout** | Payments | **Live in Test Mode** | Razorpay Node SDK, dynamic client modal, order creation, HMAC signatures. |
| **Razorpay Webhooks** | Payments Reconciliation | **Live Now** | Idempotent endpoint with HMAC-SHA256 signature verification. |
| **Slack / Teams Bot** | Approvals | **Planned Roadmap** | Scheduled for Days 10–14. Webhook handlers ready for bot event subscriptions. |
| **SevenRooms / TableCheck** | Venue Reservation POS | **Planned Roadmap** | Currently managed via Relatia's internal database; live two-way sync on roadmap. |
| **GSTR-2B Portal API** | Tax Filing | **Planned Roadmap** | Invoice schemas conform to statutory format; direct government API filing on roadmap. |
| **SAP / Oracle / Tally** | Accounting ERP | **Planned Roadmap** | Ledger vouchers formatted for standard GL accounts; direct connector APIs planned. |
