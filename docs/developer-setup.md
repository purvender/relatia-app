# Relatia Developer Setup Guide

This guide walks through cloning, installing, configuring, running, and testing Relatia locally.

---

## 1. Prerequisites

Before setting up Relatia, ensure your local development environment meets the following requirements:

* **Node.js**: v20.10.0 or higher (v22 LTS recommended). Verify with `node -v`.
* **Package Manager**: `npm` (v10+). Verify with `npm -v`.
* **Database**: PostgreSQL (v15 or higher). Can be local PostgreSQL or cloud instances (Supabase, Neon, AWS RDS, Docker).
* **Git**: v2.30 or higher.
* **Accounts (Free Test Tiers)**:
  * [Clerk](https://clerk.com) account for user authentication.
  * [Razorpay](https://dashboard.razorpay.com) account in Test Mode for sandbox payment processing.

---

## 2. Clone & Install

### Step 1: Clone Repository
```bash
git clone https://github.com/your-org/relatia-app.git
cd relatia-app
git checkout develop
```

### Step 2: Install Dependencies
```bash
npm install
```

---

## 3. Environment Variable Configuration

Relatia uses `.env.local` for local environment configuration. `.gitignore` strictly blocks all `.env*` files except `.env.example`.

### Step 1: Create `.env.local`
```bash
cp .env.example .env.local
```

### Step 2: Fill Required Variables

```env
# 1. PostgreSQL Database Connection
# Points to your local or hosted PostgreSQL instance
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/relatia_app?schema=public"

# 2. Clerk Authentication Keys
# Obtain from Clerk Dashboard -> API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk Redirect Routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/dashboard"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"

# 3. Razorpay Payment Gateway (Test Mode)
# Obtain from Razorpay Dashboard -> Settings -> API Keys (Test Mode)
NEXT_PUBLIC_RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="your_razorpay_secret_here"

# Webhook Secret — set this to any string for local testing or configure in Razorpay Webhooks
RAZORPAY_WEBHOOK_SECRET="your_razorpay_webhook_secret_here"
```

> [!IMPORTANT]
> Never commit `.env.local`, API keys, or database credentials. The repository configuration blocks `.env.local` by default.

---

## 4. Database Setup & Prisma ORM

Relatia uses **Prisma 8** (`@prisma/orm-postgres`).

### Step 1: Verify PostgreSQL is Running
Ensure your local PostgreSQL instance is running and the database specified in `DATABASE_URL` exists:
```bash
# If using psql
createdb relatia_app
```

### Step 2: Emit Prisma Contract Schema
Whenever database contracts or models change:
```bash
npx prisma contract emit
```

### Step 3: Run Database Migrations
Apply existing migrations to your database:
```bash
npx prisma migrate dev
```

---

## 5. Running the Application

### Start Development Server
```bash
npm run dev
```

By default, the server runs on [http://localhost:3000](http://localhost:3000).

---

## 6. Accessing Routes & Testing Flows

### A. Public Marketing Website (No Login Required)
Open your browser and navigate directly to:
* **Homepage**: [http://localhost:3000](http://localhost:3000)
* **Platform Architecture**: [http://localhost:3000/platform](http://localhost:3000/platform)
* **Hospitality Partners**: [http://localhost:3000/partners](http://localhost:3000/partners)
* **Contact & Demo Booking**: [http://localhost:3000/contact](http://localhost:3000/contact)

### B. Testing Authenticated Flows (Clerk & Multi-Tenant App)
1. Go to [http://localhost:3000/sign-in](http://localhost:3000/sign-in).
2. Sign in with your Clerk test credentials (or sign up via `/sign-up`).
3. If this is a new test account without an assigned company tenant, you will be automatically routed to `/onboarding`.
4. Enter your test company name (e.g. `Acme India Private Limited`) to initialize company tenancy.
5. You are redirected to `/dashboard`.
6. Test event creation at `/events/new`:
   * Fill out the form: Title, Headcount, Client Tier, and Budget (e.g. ₹60,000).
   * Click **Submit for Approval** (Event moves to `REQUESTED`).
7. Review approvals at `/dashboard/approvals`:
   * Click **Approve Event** (Event moves to `APPROVED`).
8. Select a venue at `/events/[id]`:
   * Click **Select Venue**, choose a private dining room (Event moves to `VENUE_SELECTED`, `Booking` row created).
9. Settle payment at `/dashboard/finance`:
   * Open the generated GST invoice at `/dashboard/finance/invoices/[id]`.
   * Click **Pay via Razorpay**. In test mode with dummy keys, Relatia uses a seamless test simulation order.

---

## 7. Verification & Build Commands

Always run these three commands before committing code:

```bash
# 1. Type Verification (Strict TypeScript)
npx tsc --noEmit

# 2. Code Quality & Linting
npm run lint

# 3. Production Build Validation
npm run build
```

---

## 8. Common Troubleshooting

### Port 3000 Already in Use
If another Next.js server is running:
```bash
# Find and terminate the process holding port 3000
lsof -i :3000
kill -9 <PID>
```

### Clerk "Publishable Key Missing" Warning
* Check that `.env.local` contains `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` starting with `pk_test_`.
* Restart Next.js dev server after editing `.env.local`.

### Razorpay "Payment Error in Dev Mode"
* Relatia includes a safe fallback for local development if `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set to placeholder keys (`rzp_test_...`).
* To test live Razorpay Checkout modal, obtain real test keys from [dashboard.razorpay.com](https://dashboard.razorpay.com).

### Database Connection Refused
* Ensure PostgreSQL service is active:
  ```bash
  # macOS Homebrew
  brew services restart postgresql@15
  ```
