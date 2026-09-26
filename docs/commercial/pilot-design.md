# Relatia — Commercial Pilot Design

> **Document Classification:** Internal Commercial Planning Specification  
> **Status:** Active Working Draft — Day 13 Step 1  
> **Repository Context:** Grounded in codebase truth (commit `c0a1025` on branch `develop`), [`docs/business-foundation.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/business-foundation.md), [`docs/customer-segmentation-and-icp.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-segmentation-and-icp.md), and [`docs/buyer-and-user-personas.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/buyer-and-user-personas.md).  
> **Customer Discovery Note:** Live customer interviews are intentionally deferred. All market sizes, spend ranges, event frequencies, and stakeholder reaction assumptions are treated strictly as **hypotheses to be tested**, not verified empirical facts.  
> **Category Positioning:** India-first corporate entertainment operating system. Initial product wedge: corporate dining, executive hospitality, client dinners, team events, and private dining room (PDR) governance. *(Ande is an external category and business-model reference only; no claims, text, metrics, customer names, or testimonials are copied).*

---

## Table of Contents

1. [Pilot Objective](#1-pilot-objective)
2. [Recommended Pilot Customer](#2-recommended-pilot-customer)
3. [Pilot Use Cases & Prioritization](#3-pilot-use-cases--prioritization)
4. [Pilot Duration & Evaluation](#4-pilot-duration--evaluation)
5. [Pilot Event Volume & Operational Sizing](#5-pilot-event-volume--operational-sizing)
6. [Pilot Geography & Supply Boundary](#6-pilot-geography--supply-boundary)
7. [Pilot Capabilities Included (Truth Matrix)](#7-pilot-capabilities-included-truth-matrix)
8. [Pilot Onboarding Process](#8-pilot-onboarding-process)
9. [Pilot Support Model & Service Boundaries](#9-pilot-support-model--service-boundaries)
10. [Pilot Success Criteria](#10-pilot-success-criteria)
11. [Pilot Exclusions & Anti-Promises](#11-pilot-exclusions--anti-promises)
12. [Risks & Open Commercial Decisions](#12-risks--open-commercial-decisions)
13. [Final Recommendation & Executive Summary](#13-final-recommendation--executive-summary)

---

## 1. Pilot Objective

The primary objective of the first Relatia commercial pilot is to validate the core operating workflow in a real enterprise environment with minimum operational risk and zero dependency on custom enterprise IT integrations.

### What the Pilot is Intended to Prove:
1. **Workflow Usability:** Can an enterprise organizer (Executive Assistant or Field Marketer) submit an event request, select an appropriate curated venue, and receive internal manager approval faster and with less administrative friction than their existing phone, email, and WhatsApp routine?
2. **Pre-Spend Governance:** Can automated policy validation (budget caps, per-head limits, mandatory business justification) prevent unauthorized spend and provide upfront financial clarity before reservations are locked?
3. **Structured Invoicing & Tax Data Utility:** Does generating structured B2B GST tax invoice data (CGST/SGST/IGST, state-matching, valid SAC codes 996331/996332) eliminate missing receipt friction and provide finance controllers with clean documentation for internal tax review?
4. **Provider Operational Feasibility:** Will premier luxury dining venues and hotel banquet managers accept pre-locked corporate briefs with guaranteed minimum spends, honors corporate packages, and execute smooth, discrete tableside service without billing drama?
5. **Commercial Willingness:** Is the time saved by organizers and the tax/governance visibility gained by finance sufficient to justify transitioning to an ongoing paid software subscription or commercial transaction model?

### What the Pilot is NOT Intended to Prove:
- It is **not** intended to prove automated, multi-city marketplace liquidity across all of India.
- It is **not** intended to prove autonomous AI booking, voice bot negotiations, or algorithmic dynamic pricing.
- It is **not** intended to prove automated ERP synchronization (SAP, Oracle, NetSuite) or production banking escrow.
- It is **not** intended to guarantee 100% statutory GST Input Tax Credit recovery (which remains subject to tax laws, supplier filing compliance, and the customer's professional tax counsel).
- It is **not** intended to test unconstrained, massive public event catering or nationwide concert/sports ticketing.

---

## 2. Recommended Pilot Customer

The recommended pilot customer profile is drawn directly from the beachhead customer segmentation analysis in [`docs/customer-segmentation-and-icp.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-segmentation-and-icp.md):

```
+-----------------------------------------------------------------------------------+
|                        RECOMMENDED PILOT CUSTOMER PROFILE                         |
+-----------------------------------------------------------------------------------+
| TARGET INDUSTRY:  Mid-market B2B SaaS / Enterprise Technology, Management          |
|                   Consulting, or Financial Advisory / Private Equity Boutique     |
| OFFICE LOCATION:  Gurugram (Cyber City, Golf Course Road, DLF Horizon, or         |
|                   Udyog Vihar corridors)                                          |
| HEADCOUNT:        50 to 500 employees in India (or regional Gurugram office)     |
| EVENT CADENCE:    Hosts 2 to 6 qualified executive dining events per month        |
| TAX PROFILE:      Active GSTIN registration in Haryana (06) or Delhi (07)         |
| BUYING DYNAMICS:  Autonomous departmental entertainment budget (Sales or Practice)|
+-----------------------------------------------------------------------------------+
```

### Key Stakeholder Hypotheses:

| Role | Probable Job Title | Role in Pilot | Key Motivation / Pain Point |
|---|---|---|---|
| **Internal Champion** | Senior Executive Assistant (EA) to MD/VP or Field Marketing Lead | Initiates requests; operates app day-to-day | Wasting 4–8 hours playing WhatsApp tag with banquets; losing receipts |
| **Economic Buyer** | VP of Sales, Senior Practice Partner, or Managing Director | Authorizes pilot participation & budget | Accelerating deals; avoiding embarrassing tableside bill scenes with CXOs |
| **Approver** | Department VP, Practice Head, or Business Unit Director | Approves event requests within app | Ensuring spend aligns with project budget and corporate policy |
| **Finance Stakeholder** | Finance Controller or Accounts Payable Lead | Reviews post-event invoice data & tax | Eliminating lost GST credits; eliminating month-end receipt chasing |

> **Hypothesis Label:** All assumptions regarding persona receptivity, event frequency, and budget autonomy represent working hypotheses to be confirmed during initial kickoff.

---

## 3. Pilot Use Cases & Prioritization

To prevent scope creep and maintain operational control, the pilot evaluates four specific dining use cases, ranked by strategic priority:

```
+-----------------------------------------------------------------------------------+
|                              PILOT USE CASE HIERARCHY                             |
+-----------------------------------------------------------------------------------+
|  [PRIORITY 1: CLIENT & PROSPECT DINNERS]       | High stakes, acute privacy need, |
|  - 10 to 20 guests; ₹5,000–₹12,000/head       | immediate sales pipeline impact  |
+------------------------------------------------+----------------------------------+
|  [PRIORITY 2: EXECUTIVE & BOARD DINNERS]       | Visiting global leadership, CXOs;|
|  - 8 to 15 guests; ₹8,000–₹15,000/head        | maximum demand for sound isolation|
+------------------------------------------------+----------------------------------+
|  [PRIORITY 3: LEADERSHIP MILESTONE DINNERS]    | Team celebration, closed group;  |
|  - 15 to 30 guests; ₹3,500–₹7,000/head        | tests fixed group menu packages  |
+------------------------------------------------+----------------------------------+
|  [EXCLUDED: LARGE CASUAL SOCIALS / OFFSITES]   | Deprioritized in initial pilot;  |
|  - >50 guests, casual buffet, low budget       | dilutes luxury PDR wedge focus   |
+-----------------------------------------------------------------------------------+
```

### Rationale for Prioritization:
1. **Client & Prospect Dinners (Priority 1):** Highest willingness to pay and highest urgency. When a VP of Sales invites 12 enterprise prospect CXOs to dinner, a failure in acoustics, privacy, or billing directly threatens a multi-crore sales opportunity.
2. **Executive & Board Dinners (Priority 2):** Highest per-head spend and strictest demand for Private Dining Room (PDR) exclusivity. EAs spend significant time negotiating minimum spends for these events.
3. **Leadership Milestone Dinners (Priority 3):** Ideal for testing larger group fixed menus (15–30 guests) and internal multi-department approval routing.

---

## 4. Pilot Duration & Evaluation

Selecting the right pilot window balances sufficient transaction frequency against customer momentum:

| Option | Pros | Cons | Recommendation |
|---|---|---|---|
| **30 Days** | Fast decision cycle; tight operational focus; minimal fatigue. | Risk of low event sample if client dinners slip or are rescheduled. | **Recommended for Initial Validation (Phase 1)** |
| **60 Days** | Accommodates 6–10 events across 2 monthly billing cycles; tests month-end finance close twice. | Requires sustained stakeholder attention; risks momentum loss without strict check-ins. | **Recommended for Expanded Pilot (Phase 2)** |
| **90 Days** | High statistical data; tests enterprise quarterly budget cycle. | Paralyzingly slow for early-stage startup learning; feels like free usage rather than a pilot. | **Rejected** |

### Staged Progression Recommendation:
1. **Initial Validation Pilot (30 Days / 3 Events):** Focused strictly on 1 department (e.g., Enterprise Sales). Validates request creation, manager approval, venue booking, and structured B2B invoice generation.
2. **Expanded Commercial Pilot (60 Days / Up to 10 Events):** Unlocks 2–3 departments, tests cross-functional billing, and evaluates month-end accounting reconciliation before converting to an annual agreement.

---

## 5. Pilot Event Volume & Operational Sizing

To ensure high-touch quality without overwhelming founder operational capacity, the pilot is sized within strict operational boundaries:

```
+-------------------------------------------------------------------------------+
|                       PILOT OPERATIONAL SIZING (PER COHORT)                   |
+-------------------------------------------------------------------------------+
| PARAMETER                         | INITIAL VALIDATION (30D) | EXPANDED (60D) |
+-----------------------------------+--------------------------+----------------+
| Minimum Events Required           | 3 live events            | 6 live events  |
| Target Events Supported           | 3 to 5 events            | 8 to 10 events |
| Maximum Events Cap                | 5 events                 | 12 events      |
| Active Requesters (Organizers)    | 2 to 3 users             | 4 to 6 users   |
| Designated Approvers              | 1 to 2 managers          | 2 to 4 managers|
| Finance Reviewers                 | 1 controller / AP lead   | 1 to 2 users   |
| Active Venue Partners Engaged     | 5 to 8 curated venues    | 12 to 15 venues|
+-------------------------------------------------------------------------------+
```

---

## 6. Pilot Geography & Supply Boundary

The physical delivery of hospitality requires strict geographical boundaries:

### Target Geography:
- **Primary Operating Zone:** **Gurugram** (Cyber City, DLF Phase 1–5, Golf Course Road, Golf Course Extension, Horizon Centre, and Udyog Vihar).
- **Secondary Adjacency (By Exception):** **Aerocity Hospitality District** (for airport transit executive dinners).
- **Excluded Regions:** South Delhi, Central Delhi, Noida, Greater Noida, Mumbai, Bengaluru, and all other Indian metros are excluded from initial pilot fulfillment.

### Venue Supply Boundary:
- **Included Venue Classes:**
  - 5-Star Luxury Hotel fine-dining outlets with dedicated Private Dining Rooms (e.g., The Oberoi Gurugram, Trident Gurugram, The Leela Ambience Gurugram).
  - Premium Standalone Chef-Driven restaurants with private rooms or secluded zones (e.g., Cyber Hub, Horizon Centre, 32nd Avenue).
  - Capacity: Private dining rooms accommodating 10 to 30 seated guests.
  - Compliance: Must possess active GST registration and demonstrate capability to issue formal B2B tax invoices showing client corporate GSTIN and SAC code 996331.
- **Excluded Venue Classes:**
  - Casual dining chains, loud bars, open food courts, nightclubs, or unvetted banquet halls.
  - Venues with unpartitioned communal seating unsuited for confidential commercial conversations.
  - Informal restaurants that only issue retail POS slips and refuse B2B tax invoicing.

### Supply Reality & Availability Disclaimers:
- **Manual Operational Confirmation:** Booking availability is **not instantaneous**. All reservations are manually verified and confirmed with venue banquet management.
- **Manual Venue Onboarding:** Venue profiles and package menus are manually audited and configured by the Relatia operations team.
- **No Availability Guarantees:** Relatia does **not** guarantee room availability on high-demand peak nights without reasonable advance notice (minimum 48–72 hours recommended).

---

## 7. Pilot Capabilities Included (Truth Matrix)

To preserve absolute truthfulness, every platform capability is classified according to its actual technical status in the codebase:

```
+----------------------------------------------------------------------------------------------------+
|                                    CAPABILITY TRUTH MATRIX                                         |
+----------------------------------------------------------------------------------------------------+
| CAPABILITY                         | STATUS           | PILOT IMPLEMENTATION DETAILS               |
+------------------------------------+------------------+--------------------------------------------+
| Multi-tenant Auth (Clerk)          | LIVE             | Role-based access (ORGANIZER, APPROVER,    |
|                                    |                  | FINANCE, ADMIN) backed by PostgreSQL       |
| Company Onboarding & Policy Setup  | LIVE             | Sets budget caps, approval limits in DB    |
| Event Request Creation (DRAFT)     | LIVE             | Captures city, date, headcount, budget     |
| Approval Routing (REQUESTED)       | LIVE             | In-app approval queue with approve/reject  |
| Venue Discovery & Filters          | LIVE             | Filter by city, capacity, price band       |
| Venue Selection (VENUE_SELECTED)   | LIVE             | Links selected venue to event record       |
| GST Calculation Engine             | LIVE             | Computes CGST/SGST vs IGST (SAC 996331)    |
| B2B Invoice Generation & View      | LIVE             | Detailed tax breakdown; browser print CSS  |
| Finance Dashboard                  | LIVE             | Role-gated KPIs, spend tracking, summaries |
+------------------------------------+------------------+--------------------------------------------+
| Razorpay Payment Modal             | TEST MODE        | Functional in sandbox with rzp_test_* keys |
| Razorpay Webhook Handler           | TEST MODE        | Verified signature capture in test mode    |
+------------------------------------+------------------+--------------------------------------------+
| Contact & Partner Website Forms    | DEMO ONLY        | UI fixtures; data discarded on submit      |
| Marketing Testimonials & Metrics   | DEMO ONLY        | Illustrative design partner mockups        |
| AI Venue Recommendation            | DEMO ONLY        | Database filter queries only (no LLM)      |
+------------------------------------+------------------+--------------------------------------------+
| Venue Booking Confirmation         | MANUAL OPERATOR  | Relatia team verifies room with hotel GM   |
| Dietary & Menu Customization       | MANUAL OPERATOR  | Relatia team coordinates bespoke menus     |
| Real-time Support & Concierge      | MANUAL OPERATOR  | Dedicated WhatsApp/phone support line      |
+------------------------------------+------------------+--------------------------------------------+
| Production Banking Settlement      | EXCLUDED         | No live payment escrow or escrow splits    |
| Direct Venue Invoicing Portal      | EXCLUDED         | Venues do not have independent logins      |
| Automated Slack/Teams Webhooks     | EXCLUDED         | In-app approvals only                      |
| Native PDF Invoice Generator       | EXCLUDED         | Browser print-to-PDF supported; no pdfkit  |
| ERP Connectors (SAP, Oracle, Tally)| EXCLUDED         | Manual CSV export provided for accounting  |
| Autonomous AI Agent Negotiation    | EXCLUDED         | Strictly human-in-the-loop coordination    |
+----------------------------------------------------------------------------------------------------+
```

---

## 8. Pilot Onboarding Process

The customer onboarding process is structured into 9 deterministic steps across 5 business days:

```
[Day 1: Kickoff] -> [Day 2: Tenant & Roles] -> [Day 3: Policies & Venues] -> [Day 4: Test Event] -> [Day 5: Live Pilot]
```

1. **Customer Kickoff (Day 1):** 45-minute alignment call with the Champion (EA/Field Marketing), Economic Buyer (VP Sales), and Finance Controller. Review pilot boundaries, timeline, and use cases.
2. **Tenant Provisioning (Day 2):** Setup company record in Relatia database; configure legal entity name, corporate office address, and registered state GSTINs (Haryana `06` and/or Delhi `07`).
3. **User Setup & Invitations (Day 2):** Provision user accounts via Clerk for designated Organizers (`ORGANIZER`), Approvers (`APPROVER`), and Finance leads (`FINANCE`).
4. **Approval Policy Configuration (Day 3):** Configure corporate spend limits (e.g., require secondary manager approval for dinners exceeding ₹50,000 or per-head spend exceeding ₹5,000).
5. **Venue & Package Curation (Day 3):** Ensure 5–8 pre-vetted Gurugram fine-dining and luxury hotel PDR venues are active in the tenant's directory with pre-agreed menu packages.
6. **Finance & Invoice Alignment (Day 4):** Verify invoice legal details with the Accounts Payable lead; confirm SAC codes (996331) and state tax breakdown expectations.
7. **End-to-End Simulation Test (Day 4):** The Organizer creates a simulated test event (`[TEST] Q3 Sales Dinner`); Approver executes approval in-app; system transitions through `VENUE_SELECTED`; generate test invoice and verify print layout with Finance.
8. **First Live Pilot Event Execution (Day 5+):** Organizer submits first live corporate dining request; system triggers real-world coordination workflow.
9. **Ongoing Operational Support:** Daily operational oversight by Relatia founders throughout the active pilot window.

---

## 9. Pilot Support Model & Service Boundaries

To set clear expectations and prevent burnout, the pilot operates under a transparent, human-supported service model:

- **Support Provider:** Dedicated founder-led operational support team (Purvender Hooda + operations coordinator).
- **Communication Channels:**
  - Dedicated Shared WhatsApp Channel (`Relatia <> [Customer Name] Pilot Operations`) for organizers and approvers.
  - Direct email support for Finance and Accounts Payable inquiries (`support@relatia.in` / direct founder email).
- **Supported Operating Hours:** Monday through Saturday, 09:00 to 21:00 IST (covering evening dinner service coordination).
- **Target Response Time Approach:**
  - Venue booking inquiries: Initial operational response within **30 minutes** during business hours.
  - Venue confirmation: Final confirmation within **4 to 6 hours** (dependent on venue banquet desk turnaround).
  - Emergency evening service issues: Immediate phone support during dinner hours.
- **Escalation Path:** Direct mobile escalation to Founder / CEO for urgent tableside or room access issues.
- **What is Outside Support:**
  - Providing on-site physical event staffing or event hosts.
  - Designing marketing collateral, invitations, or audiovisual stage production.
  - Providing statutory legal or tax advice on GST filing positions.
  - Handling cash payments or off-book disbursements.

---

## 10. Pilot Success Criteria

At the end of the pilot, Relatia and enterprise leadership evaluate performance against 10 objective criteria:

| Metric Category | Specific Success Criterion | Target Benchmark | Classification |
|---|---|:---:|---|
| **Completed Events** | Successfully executed corporate dining events | ≥3 events (30D) / ≥8 events (60D) | Proposed Benchmark |
| **Approval Velocity** | Turnaround time from request submission to manager approval | <4 business hours | To Be Validated |
| **Venue Turnaround** | Time to confirm private dining room reservation with venue | <6 business hours | Dependent on Manual Ops |
| **Payment Workflow** | Booking and settlement status successfully logged without error | 100% of events | Proposed Benchmark |
| **Invoice Quality** | B2B tax invoices generated with correct legal entity name, GSTIN, and SAC | 100% compliant | Proposed Benchmark |
| **Finance Acceptance** | Accounts Payable lead confirms invoice data satisfies internal tax review | Formal sign-off | To Be Validated |
| **Organizer Usability** | EA/Organizer confirms coordination time reduced compared to manual methods | ≥50% time saved | To Be Validated |
| **Operational Reliability**| Events executed with zero room cancellation or billing disputes at the table | 100% dispute-free | Dependent on Manual Ops |
| **Executive Satisfaction**| Economic buyer (VP Sales) expresses satisfaction with client dining ambiance | ≥4.5 / 5 rating | To Be Validated |
| **Commercial Transition** | Enterprise requests commercial proposal for ongoing annual subscription | Positive conversion signal | Proposed Benchmark |

---

## 11. Pilot Exclusions & Anti-Promises

To protect Relatia’s operational integrity and legal posture, the following boundaries are strictly enforced:

- ❌ **No Production Payment Settlement:** Relatia does **not** intermediate funds or act as an escrow payment agent during the pilot. Events are settled either via direct corporate billing from the venue or pre-authorized corporate credit cards, with Relatia providing the orchestration and invoice compliance data layer.
- ❌ **No Instant Guaranteed Room Availability:** Relatia does **not** promise instant algorithmic room allocation. All bookings are subject to venue operational confirmation.
- ❌ **No Autonomous AI Negotiation:** Venue sourcing and menu adjustments are handled deterministically by software and verified by human coordinators. No speculative LLMs are used.
- ❌ **No Live Production ERP Integrations:** Relatia does **not** provide direct API synchronization with SAP, Oracle, NetSuite, or Tally on Day 1. Month-end data is delivered via structured CSV/PDF reports.
- ❌ **No Slack / Microsoft Teams Bot Approvals:** Approvals occur inside the responsive web dashboard. Chat-based approval bots are roadmap items.
- ❌ **No Guaranteed Tax Recovery:** Relatia does **not** guarantee that tax authorities will approve 100% of GST Input Tax Credit claims. Structured data is provided to assist internal finance review, subject to statutory provisions and independent tax advice.
- ❌ **No Guaranteed Venue Turnover:** Relatia does **not** promise participating hospitality providers guaranteed corporate revenue or booking minimums.
- ❌ **No Automatic Refunds:** Cancellations and refunds are governed strictly by the written terms established with each venue for each specific event brief.

---

## 12. Risks & Open Commercial Decisions

The following key decisions must be resolved by the founder prior to signing the first pilot agreement:

```
+-----------------------------------------------------------------------------------+
|                        OPEN COMMERCIAL PILOT DECISIONS                            |
+-----------------------------------------------------------------------------------+
| 1. PILOT PRICING: Free trial vs. Nominal Setup Fee (₹25k) vs. Transaction Fee     |
| 2. INVOICE MODEL: Pure SaaS (Venue invoices Client) vs. Merchant of Record        |
| 3. ALCOHOL PROTOCOL: Unified billing vs. Direct tableside settlement              |
| 4. CANCELLATION LIABILITY: Customer liability vs. Venue deposit absorption        |
| 5. CAPACITY CONSTRAINTS: How many simultaneous pilot customers can founders run?  |
+-----------------------------------------------------------------------------------+
```

### Detailed Decision Log:

1. **Commercial Pricing for Pilot:**
   - *Option A (Free):* Waive all platform and transaction fees for the initial 3 events to eliminate procurement friction and maximize onboarding speed.
   - *Option B (Fee-Bearing):* Charge a nominal pilot fee (e.g., ₹25,000 flat) to test real enterprise willingness to pay from Day 1.
   - *Status:* Unresolved founder decision (Recommend Option A for Customer #1, transitioning to Option B for Customers #2–#3).
2. **Invoicing Architecture & Legal Entity Flow:**
   - Does Relatia act as a pure software facilitator (Venue issues B2B tax invoice directly to Enterprise Client; Relatia bills software fee)?
   - Or does Relatia act as the master service provider (Relatia bills Enterprise Client; Relatia sub-contracts Venue)?
   - *Status:* Recommending pure software facilitator for pilot to avoid liquor licensing and tax intermediary complications.
3. **Alcohol Billing Separation:**
   - Because state excise laws in Haryana and Delhi regulate alcohol separately from GST (5%/18%), venues frequently issue separate bar bills.
   - *Decision:* Pilot briefs will require venues to issue itemized billing that clearly separates food catering GST from beverage excise.
4. **Cancellation Terms & Deposit Absorption:**
   - If an enterprise client cancels a private dining room within 24 hours, who bears the venue's minimum spend charge?
   - *Policy:* The enterprise customer must formally agree to the venue's documented cancellation policy prior to booking confirmation.

---

## 13. Final Recommendation & Executive Summary

### Recommended Pilot Shape:
- **Customer Cohort:** Exactly **ONE** Gurugram-based B2B SaaS or Consulting firm (50–500 employees).
- **Geography:** Gurugram core corridor (Cyber City / Golf Course Road).
- **Duration:** **30-Day Initial Validation Pilot**, expandable to 60 days upon mutual agreement.
- **Volume:** **3 live corporate dining events** (10 to 25 guests in Private Dining Rooms).
- **Core Value Delivered:** Curated PDR discovery, 2-minute request creation, in-app manager approval, structured B2B GST tax invoice data generation, and downloadable finance reporting.
- **Operating Model:** Standalone web application with high-touch founder concierge coordination. Zero ERP integration required.

### What Must Be Decided Before Kickoff:
1. Final selection of the specific pilot customer account and primary executive champion.
2. Written alignment on whether the 3-event pilot is free or carries a nominal trial fee.
3. Bilateral sign-off on venue cancellation liability terms.
4. Finalizing the curated directory of 5–8 active Gurugram luxury venues with pre-negotiated corporate packages.
