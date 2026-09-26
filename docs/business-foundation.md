# Relatia — Business Foundation Document

> **Document Classification:** Internal Single Source of Truth for Business Model & Strategy  
> **Status:** Working Draft (Restart of Day 10, Step 1)  
> **Repository Context:** Verified against codebase at commit `7326ec9` on branch `develop`  
> **Note on Terminology:** Terms such as *proposed*, *pilot*, *subject to validation*, *test mode*, *roadmap*, *illustrative*, and *subject to legal, tax, and accounting review* reflect that while core operational workflows are implemented in code, business pricing, tax legalities, and commercial terms remain under active validation.

---

## Table of Contents

1. [What is Relatia?](#1-what-is-relatia)
2. [What Problem Does Relatia Solve?](#2-what-problem-does-relatia-solve)
3. [Who Experiences This Problem?](#3-who-experiences-this-problem)
4. [Why is the Problem Important?](#4-why-is-the-problem-important)
5. [How Does Relatia Solve It Today?](#5-how-does-relatia-solve-it-today)
6. [What Works in the Current Product Now?](#6-what-works-in-the-current-product-now)
7. [What is Test-Mode Only?](#7-what-is-test-mode-only)
8. [What is Demo-Only?](#8-what-is-demo-only)
9. [What is Planned for Later?](#9-what-is-planned-for-later)
10. [Who Pays Relatia?](#10-who-pays-relatia)
11. [How Can Relatia Earn Money?](#11-how-can-relatia-earn-money)
12. [Why Would an Enterprise Pay?](#12-why-would-an-enterprise-pay)
13. [Why Would a Hospitality Provider Participate?](#13-why-would-a-hospitality-provider-participate)
14. [What is the First Target Market?](#14-what-is-the-first-target-market)
15. [What is the First City?](#15-what-is-the-first-city)
16. [What is the First Customer Segment?](#16-what-is-the-first-customer-segment)
17. [What is the First Hospitality-Provider Segment?](#17-what-is-the-first-hospitality-provider-segment)
18. [What is the Simplest Pilot Offer?](#18-what-is-the-simplest-pilot-offer)
19. [What Must Relatia Not Promise Yet?](#19-what-must-relatia-not-promise-yet)
20. [What Assumptions Still Need Customer Validation?](#20-what-assumptions-still-need-customer-validation)
21. [What Would Make the Pilot Successful?](#21-what-would-make-the-pilot-successful)
22. [What Decisions Remain Unresolved?](#22-what-decisions-remain-unresolved)

---

## 1. What is Relatia?

**Relatia** is a specialized B2B software platform designed to govern, streamline, and account for corporate dining, executive hospitality, and relationship-driven client entertainment in India.

Relatia replaces fragmented email chains, manual corporate credit card swipes, lost paper receipts, and unverified expense claims with a structured, tenant-isolated internal workflow that connects enterprise organizers, internal approvers, finance controllers, and curated luxury venues.

---

## 2. What Problem Does Relatia Solve?

Corporate hospitality (client dinners, CXO roundtables, board meetings, team milestone dinners) in Indian mid-to-large enterprises suffers from four major operational breakdowns:

1. **Venue Discovery & Booking Chaos:** Executive assistants and team leads spend days calling banquet managers, negotiating private dining room (PDR) minimum spends, and coordinating dietary constraints via unstructured WhatsApp and email threads.
2. **Lack of Pre-Spend Policy Governance:** Employees book venues without transparent budget caps or policy validation. Approvals happen informally or retrospectively after expenses are already incurred.
3. **Severe GST Tax Credit Leakage:** Restaurant dining and banquet services in India attract Goods and Services Tax (GST) between 5% and 18%. When employees pay using individual credit cards or receive retail POS receipts without the company’s exact legal entity name and GSTIN, the enterprise may be unable to support an ITC claim, leading to potential unrecovered tax leakage. Actual ITC eligibility depends on applicable GST provisions, the nature of the expense, supplier compliance, and professional tax advice.
4. **Finance Reconciliation Friction:** Finance and accounting teams spend dozens of hours at month-end matching paper credit card charge slips against employee expense submissions, chasing missing bills, and manually booking journal entries.

---

## 3. Who Experiences This Problem?

This problem spans four distinct personas across the enterprise and hospitality ecosystem:

| Persona | Primary Friction Point |
|---|---|
| **Executive Assistants & Event Organizers** | Wasted time coordinating venues, dietary preferences, AV setup, and booking confirmations across multiple venues. |
| **Business Leaders & Approvers (VPs, Directors)** | Blindly approving expense claims with no context on client relationship value, remaining budget, or per-head policy caps. |
| **CFOs, Finance Controllers & Tax Leads** | Forfeited GST Input Tax Credits, delayed month-end close, missing tax invoices, and inability to audit corporate entertainment spend. |
| **Hospitality & Venue Banquet Managers** | Difficulty forecasting corporate weekday PDR demand, dealing with last-minute no-shows, and chasing corporate payment vouchers. |

---

## 4. Why is the Problem Important?

1. **Direct Financial Impact:** Corporate entertainment and dining represent a significant percentage of general and administrative (G&A) and sales enablement budgets. The loss of 18% Input Tax Credit on multi-lakh rupee dining bills is a direct, avoidable bottom-line drain.
2. **Operational Efficiency:** An estimated 15–20 hours per event cycle are wasted across organizers, approvers, and accounts payable teams managing manual logistics and receipts.
3. **Audit and Statutory Compliance:** Indian corporate tax authorities scrutinize undocumented or misclassified entertainment expenses. Having verifiable digital audit trails with itemized B2B tax invoices protects enterprises during statutory tax audits.
4. **Strategic Relationship Value:** In high-stakes B2B industries (banking, technology, professional services), client dining directly influences multi-crore deal pipelines. Mismanaged logistics or acoustic/privacy issues at venues damage executive relationships.

---

## 5. How Does Relatia Solve It Today?

Relatia establishes a single, continuous, deterministic state-machine workflow:

```
[DRAFT] -> [REQUESTED] -> [APPROVED] -> [VENUE_SELECTED] -> [BOOKED] -> [COMPLETED]
```

1. **Request Creation:** An organizer inputs event date, city, estimated headcount, and allocated budget with policy validation.
2. **In-App Approval Routing:** The event routes to company approvers (managers/finance) with full policy and spend context.
3. **Curated Venue Selection:** The organizer selects from a pre-vetted directory of enterprise-ready venues matching capacity, pricing band, and location.
4. **GST-Compliant Tax Invoicing:** The platform automatically computes CGST, SGST, or IGST based on intra-state vs. inter-state vendor and client GSTIN states, assigning proper SAC codes (e.g., SAC 996331).
5. **Digital Payment Verification:** Payments can be initiated via an integrated Razorpay payment gateway (currently in test mode) with automated status updates.
6. **Audit Trail & Reporting:** Finance teams access role-gated dashboards displaying real-time spend, invoice statuses, and printable B2B tax invoices.

---

## 6. What Works in the Current Product Now?

The following features are fully implemented, functional, and backed by verified source code and database migrations:

- **Authentication & Tenant Isolation:** Multi-tenant architecture with Clerk authentication, role-based access control (`ORGANIZER`, `APPROVER`, `FINANCE`, `ADMIN`), and company profile onboarding.
- **Event Lifecycle State Machine:** Strict database-level state validation transitioning events across `DRAFT`, `REQUESTED`, `APPROVED`, `VENUE_SELECTED`, `BOOKED`, `COMPLETED`, and `REJECTED`.
- **In-App Approvals Queue:** Dedicated approval interface allowing designated approvers to review budget details and approve/reject with logged timestamps.
- **Venue Discovery & Filtering:** Database-backed directory of curated luxury and fine-dining venues filterable by city, capacity, and price tier.
- **Venue Selection:** Direct linkage of a venue to an approved event, transitioning state to `VENUE_SELECTED`.
- **Booking Creation:** Formal booking record creation linking events, venues, dates, and payment states.
- **Automated GST Invoice Engine:** Automatic generation of structured B2B tax invoices with vendor/buyer GSTINs, HSN/SAC codes, and breakdown of taxable value, CGST, SGST, and IGST.
- **Printable Invoices:** Client-side invoice view with print-safe styling and complete statutory metadata.
- **Finance KPI Dashboard:** Role-gated finance overview displaying total spend, total GST captured, pending invoices, and historical invoice records.
- **Public Marketing Website:** Responsive 4-page website (`/`, `/platform`, `/partners`, `/contact`) communicating the platform value proposition.

---

## 7. What is Test-Mode Only?

The following components are functionally integrated into the codebase but currently operate exclusively in sandbox/test environments:

- **Razorpay Payment Gateway Checkout:** The frontend checkout modal loads the official Razorpay JS SDK and initiates orders created securely by the server, but relies on `rzp_test_*` credentials.
- **Razorpay Webhook Ingestion:** The `/api/webhooks/razorpay` endpoint verifies cryptographic webhook signatures and processes `payment.captured` events, tested in local and test-key environments.
- **Production Settlement / Escrow:** Live automated funds capture, direct corporate credit line settlement, and payment escrow mechanisms are not operating in live production.

---

## 8. What is Demo-Only?

The following elements on the public marketing website are interactive fixtures and demonstration previews:

- **Contact Form (`/contact`):** An interactive UI form labeled as a demo preview. Submitted inquiries demonstrate confirmation states but do not yet write to a CRM or dispatch automated notification emails.
- **Partner Intake Form (`/partners`):** An interactive partner application form labeled as a demo preview.
- **Marketing ROI Metrics:** Figures on the homepage (e.g., *42% cost savings*, *18 hours saved*, *4.9/5 satisfaction*) represent modeled operational benchmarks and target design partner metrics.
- **Marketing Testimonials:** Quotes and personas on marketing pages represent design partner pilot concepts rather than post-launch customer testimonials.

---

## 9. What is Planned for Later?

The following features are on the development roadmap and are not yet built into the codebase:

- **Real LLM / AI Intelligence Layer:** Predictive client deal velocity scoring, conversational NLP booking assistants, and natural language spend anomaly detection (scheduled for subsequent phases).
- **Automated CRM Capture:** Backend pipeline routing public form submissions into tools like HubSpot, Salesforce, or automated transactional email services (e.g., Resend).
- **Communication Integrations:** Contextual one-click approval bots inside Slack and Microsoft Teams.
- **Live ERP & Accounting Sync:** Automated journal voucher exports and bi-directional ledger syncing with SAP S/4HANA, Oracle NetSuite, TallyPrime, and Zoho Books.
- **Government GSTN / GSTR-2B API Integration:** Real-time programmatic validation of vendor GSTIN status against the official GST portal.
- **Hospitality Partner Management Portal:** Self-service portal for venue banquet managers to update live private dining room availability, menus, and booking requests (to be built within the 35-day rollout plan).
- **Certified Compliance Audits:** Formal SOC 2 Type II and ISO 27001 certifications.
- **Automated PDF Invoice Generation:** Server-side PDF generation (e.g., via `@react-pdf/renderer` or Puppeteer) for downloadable offline archiving.

---

## 10. Who Pays Relatia?

Relatia’s primary proposed commercial model is a **B2B Enterprise SaaS & Transaction Platform**, where revenue is generated from two potential sides:

1. **The Enterprise Client (Primary Buyer):** Mid-market and large enterprises that license Relatia software to govern employee spending, enforce policy compliance, and recover GST tax credits.
2. **The Hospitality Partner (Secondary / Marketplace Side):** Luxury restaurants, hotel banquets, and dining groups that receive verified corporate private dining bookings through the Relatia network.

---

## 11. How Can Relatia Earn Money?

*Note: All pricing and revenue models are proposed and subject to legal, tax, and accounting validation during customer pilots.*

1. **Enterprise Platform Subscription (SaaS Fee):**
   - Monthly or annual recurring licensing fee tiered by headcount, active event organizers, or corporate entities.
2. **Transaction / Usage Convenience Fee:**
   - A percentage-based or flat transaction fee per confirmed booking processed through the platform (e.g., 1.5% to 3.0% of event value, or covered within software licensing).
3. **Hospitality Partner Channel Commission (Proposed Pilot Model):**
   - A performance-based demand generation fee (e.g., 5% to 10%) paid by venue partners on corporate private dining revenue delivered via Relatia.
4. **Enterprise Setup & Custom Integration Retainer:**
   - One-time professional services fee for custom ERP integration mapping, single sign-on (SSO) configuration, and custom policy workflow rules.

---

## 12. Why Would an Enterprise Pay?

Enterprises derive measurable economic return and administrative relief from Relatia:

- **Structured Tax Data for Finance Review:** *(Illustrative scenario — actual results depend on applicable GST provisions, the nature of each expense, supplier GST compliance, and professional tax advice.)* A company that annually spends ₹50 Lakh on qualifying corporate dining and successfully claims eligible Input Tax Credit at the applicable GST rate could recover a significant portion of that tax outlay. Relatia provides the structured B2B invoice and vendor-tax data needed to support that internal finance review and eligible claims — it does not guarantee any specific ITC recovery amount or outcome.
- **Preventing Spend Leakage:** Automated pre-approval limits eliminate unbudgeted overspending and unauthorized luxury premiums.
- **Time Reallocation:** Saving 15+ hours per executive assistant each month across multi-department corporate hospitality coordination.
- **Statutory Audit Defense:** Eliminates exposure to corporate tax disallowances during tax assessments by maintaining complete B2B invoice records.

---

## 13. Why Would a Hospitality Provider Participate?

Luxury hotels and premier restaurants have strong commercial incentives to join the Relatia hospitality collection:

- **High Average Order Value (AOV):** Enterprise client dinners feature multi-course tasting menus, wine pairings, and guaranteed private room minimum spends significantly higher than retail leisure diners.
- **Weekday Demand Generation:** Corporate dining peaks Tuesday through Thursday evenings, filling high-margin private dining rooms on days when retail walk-in traffic is lowest.
- **Verified Corporate Backing:** Bookings are associated with pre-approved corporate events rather than individual walk-in reservations, reducing unplanned no-shows and supporting structured payment follow-through. Actual payment reliability is subject to the enterprise's payment process and commercial terms agreed bilaterally.
- **Zero Expense Report Friction:** Digital B2B invoicing ensures banquet teams do not spend hours manually emailing individual bills to corporate guests after dining.

---

## 14. What is the First Target Market?

The first target market is **India-headquartered mid-market and enterprise companies with high-touch B2B sales cycles, executive leadership teams, and substantial client relationship entertainment spend.**

Key characteristics:
- Annual corporate hospitality/event spend exceeding ₹25 Lakhs.
- Active GST registration in India.
- Dedicated finance/accounting controllers managing employee expense reimbursements.

---

## 15. What is the First City?

**Mumbai (specifically Bandra Kurla Complex [BKC], Lower Parel, South Mumbai, and Nariman Point).**

**Rationale:**
- Mumbai is India’s financial and corporate capital, housing headquarters for major investment banks, private equity firms, conglomerates, law firms, and tech leaders.
- High concentration of luxury dining institutions and private dining rooms (The Leela, Taj, Oberoi, ITC, and premier standalone culinary groups) in close proximity to corporate hubs.

---

## 16. What is the First Customer Segment?

The primary beachhead customer segment:
**Tier-1 B2B Professional Services, Financial Services, and High-Growth Tech Enterprises:**
- Investment banking and private equity advisory firms.
- Tier-1 corporate law firms.
- Enterprise B2B SaaS and technology consulting companies (50–500 employees).

**Why this segment?**
These firms frequently host high-stakes prospect and client dinners, have strict per-head budgets, maintain dedicated executive assistants, and demand strict tax and billing compliance.

---

## 17. What is the First Hospitality-Provider Segment?

**Premier Private Dining Rooms (PDRs) and Luxury Business Dining Rooms (10–30 guest capacity):**
1. **5-Star Luxury Hotel PDRs:** Flagship dining rooms within established luxury chains (e.g., Taj Mahal Palace, The Oberoi, The Leela).
2. **Top-Tier Standalone Chef-Driven Fine Dining:** High-reputation contemporary Indian, Japanese omakase, and modern European restaurants in BKC and Lower Parel known for private corporate dining.

---

## 18. What is the Simplest Pilot Offer?

**"The Zero-Friction Enterprise Hospitality Pilot"**

- **Duration:** 60-day pilot cohort.
- **Scope:** 1–2 corporate departments (e.g., Strategic Accounts Sales or Executive Leadership).
- **Commitment:** Up to 10 corporate dining events hosted through Relatia.
- **What Relatia Delivers:**
  1. Full access to Relatia’s internal event request, approval, and venue discovery app.
  2. Structured B2B invoice and vendor-tax data designed to support internal finance review and eligible tax claims, subject to customer and professional-advisor validation. Relatia does not guarantee any specific ITC recovery amount or outcome.
  3. Pre-negotiated private dining availability and dedicated coordination assistance (subject to venue and pilot scope).
  4. End-of-pilot spend audit and structured GST invoice report delivered to the CFO for their finance and tax review.
- **Pilot Commercial Terms:** Waived platform SaaS setup fee during pilot; simple performance or flat trial fee subject to bilateral agreement.

---

## 19. What Must Relatia Not Promise Yet?

To maintain absolute truthfulness and operational credibility, Relatia must **not** promise:

1. **No Live Autonomous AI Agent:** Do not promise an LLM that autonomously negotiates with venues or negotiates contracts without human/system validation.
2. **No Instant Direct Bank Escrow:** Do not promise banking escrow or multi-party payment splitting until production financial partner agreements are finalized.
3. **No Turnkey ERP Sync:** Do not promise out-of-the-box real-time automated synchronization with SAP, Oracle, or Tally until custom API connectors are engineered for the specific client.
4. **No Direct GSTN Government Portal Live Filing:** Do not claim automated direct filing into the government portal; Relatia produces compliant invoice data for the client’s accountants.
5. **No Certified SOC 2 / ISO Accreditation:** Do not represent the platform as holding formal audit certificates; state that architectural controls are aligned with these frameworks for future certification.

---

## 20. What Assumptions Still Need Customer Validation?

The following business and operational assumptions must be tested and verified during initial pilot conversations:

1. **Buyer Persona Alignment:** Will the primary software purchase decision be owned by the CFO / Head of Finance (for tax and spend control) or the Head of Sales / Operations (for convenience and venue access)?
2. **Billing Preferences:** Do enterprises prefer centralized monthly corporate invoicing, virtual credit card authorization, or direct gateway checkout per event?
3. **Venue Commission Willingness:** Will luxury venue partners agree to a 5–10% demand fee, or do they insist on standard corporate group contracts without revenue sharing?
4. **Approval Workflow Thresholds:** Are multi-tier in-app approvals sufficient, or is Slack/Teams integration an absolute prerequisite for executive adoption?
5. **GST Invoicing Model:** Does the client require Relatia to act as a pure technology intermediary (venue bills client directly) or as a merchant of record (Relatia bills client and reconciles vendor)? *(Subject to formal Indian GST, TCS, and legal structuring — see also Section 22, Decision 1.)*

---

## 21. What Would Make the Pilot Successful?

A pilot engagement will be deemed successful if it achieves the following quantitative and qualitative milestones:

1. **Event Completion Rate:** At least 5 corporate dining events successfully run from `DRAFT` to `COMPLETED` on the platform without operational breakdown.
2. **GST Invoice Completeness:** Zero rejected or non-compliant B2B invoices produced by the platform, enabling the client’s accounting team to submit complete and structured tax invoice data for their internal review and eligible ITC claims. Actual ITC capture is subject to the client’s tax position, supplier compliance, and professional advice.
3. **Approval Turnaround Time:** Average approval cycle time under 4 hours within the app (down from multi-day email loops).
4. **User Satisfaction:** Positive qualitative feedback from both the executive assistant (organizer) and the finance controller.
5. **Commercial Conversion:** The enterprise agrees to convert from the free/trial pilot into an annual paid SaaS contract or ongoing managed spending tier.

---

## 22. What Decisions Remain Unresolved?

The following structural decisions require founder resolution prior to full commercial rollout:

1. **Merchant of Record vs. SaaS Technology Intermediary:**
   - *Model A (Intermediary):* Venue issues GST invoice directly to the corporate client; Relatia charges a software licensing / booking facilitation fee.
   - *Model B (Merchant of Record):* Relatia contracts with venues, bills the enterprise centrally as a single vendor, and handles downstream reconciliation. *(Requires thorough Indian GST, TCS, and legal structuring).*
2. **Exact SaaS Pricing Tiers:**
   - Determination of fixed monthly pricing (e.g., ₹25,000/mo vs. ₹50,000/mo) versus percentage-of-spend pricing (e.g., 2.5% platform fee).
3. **Hospitality Partner Onboarding Velocity:**
   - Execution strategy for physically onboarding the first 25 luxury venues in Mumbai within the 35-day rollout plan.
4. **Integration Roadmap Prioritization:**
   - Deciding whether Slack/Teams notification webhooks or automated Resend transactional emails take priority immediately following Day 10.
5. **Legal Terms of Service & Data Privacy Policy:**
   - Finalizing standard enterprise customer agreements, venue partner terms, and formal DPDP Act privacy disclosures.

---

*This document serves as the foundational business specification for Relatia and will guide all subsequent Day 10 steps, including persona definition, pricing formulation, and outreach strategy.*
