# Relatia — Commercial Pilot-Pricing Hypothesis

> **Document Classification:** Internal Commercial Strategy & Pricing Specification
> **Status:** Active Working Draft — Day 13 Step 2
> **Repository Context:** Grounded in codebase truth (commit `cf8c35d` on branch `develop`), [`docs/business-foundation.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/business-foundation.md), [`docs/customer-segmentation-and-icp.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-segmentation-and-icp.md), [`docs/buyer-and-user-personas.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/buyer-and-user-personas.md), and [`docs/commercial/pilot-design.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/commercial/pilot-design.md).
> **Customer Discovery Context:** Customer interviews are intentionally deferred. All commercial pricing numbers, event budgets, conversion expectations, and cost structures represent **structured hypotheses to be tested**, not verified empirical facts.
> **Classification Key:** Numbers and parameters are labeled as: `[Observed]`, `[Estimated]`, `[Modeled]`, `[To be validated]`, or `[Decision required]`.
> **Category Context:** India-first corporate entertainment operating system. Initial product wedge: corporate dining, executive hospitality, client dinners, team events, and private dining room (PDR) governance. *(Ande is an external category and business-model reference only; no claims, text, metrics, customer names, or testimonials are copied).*

---

## Table of Contents

1. [Executive Pricing Recommendation](#1-executive-pricing-recommendation)
2. [Pricing Principles](#2-pricing-principles)
3. [Pricing-Option Comparison](#3-pricing-option-comparison)
4. [Selected Pricing Hypothesis (Pilot #1)](#4-selected-pricing-hypothesis-pilot-1)
5. [Included Items](#5-included-items)
6. [Excluded Items](#6-excluded-items)
7. [Payment and Invoicing Flow](#7-payment-and-invoicing-flow)
8. [Pricing Sensitivity Scenarios & Economics](#8-pricing-sensitivity-scenarios--economics)
9. [Willingness-to-Pay Learning Plan](#9-willingness-to-pay-learning-plan)
10. [Discount Policy](#10-discount-policy)
11. [Renewal and Post-Pilot Pricing Options](#11-renewal-and-post-pilot-pricing-options)
12. [Commercial Risks](#12-commercial-risks)
13. [Customer-Facing Pricing Language](#13-customer-facing-pricing-language)
14. [Commercial Decision Log](#14-commercial-decision-log)
15. [Final Decision Required](#15-final-decision-required)

---

## 1. Executive Pricing Recommendation

For Relatia Pilot #1, we recommend testing a **one-time, upfront commercial pilot fee of ₹25,000 + applicable taxes** `[To be validated]`.

```
+-----------------------------------------------------------------------------------+
|                        PILOT #1 PRICING HYPOTHESIS SUMMARY                        |
+-----------------------------------------------------------------------------------+
| HEADLINE PRICE:      ₹25,000 (INR) + applicable GST (18% SAC 998313 / SaaS)      |
|                      [Subject to accountant and GST review]                       |
| DURATION:            30 calendar days [Modeled]                                   |
| INCLUDED USAGE:      Up to 3 live corporate dining events (10–25 guests per event)|
| INCLUDED SEATS:      Up to 3 Requesters (EAs/Marketers), 2 Approvers, 1 Finance   |
| INCLUDED SUPPORT:    Founder-led onboarding, dedicated WhatsApp channel,          |
|                      manual venue confirmation & dietary coordination             |
| NATURE OF OFFER:     Pure Software Facilitator & Coordination Workflow            |
| EXCLUDED:            Venue bills, food, beverages, alcohol, venue deposits,       |
|                      cancellation charges, and payment gateway fees               |
| STATUS:              Working Commercial Hypothesis (Unvalidated)                  |
+-----------------------------------------------------------------------------------+
```

### Strategic Evaluation of ₹25,000:
- **Why not ₹0 (Free)?** A free pilot fails to test willingness to pay, attracts uncommitted stakeholders, leads to casual cancellations, and signals a low-value consulting experiment rather than serious B2B software.
- **Why not ₹50,000+?** Exceeds the standard discretionary signing authority of most Sales VPs or practice leaders without triggering formal multi-committee procurement review.
- **Why ₹25,000 is the optimal learning price:** For an enterprise spending ₹75,000–₹1,50,000 per executive client dinner, ₹25,000 represents less than 10%–12% of their total event outlay across 3 dinners. It falls comfortably within single-signoff discretionary expense limits while demanding enough skin-in-the-game to validate commercial interest.

---

## 2. Pricing Principles

Relatia’s commercial pilot structure adheres to eight explicit pricing principles:

1. **Keep the First Commercial Transaction Radically Simple:** One invoice, one fixed fee, one 30-day window, one commercial team.
2. **Never Take Custody of Venue Money:** Relatia does not intermediate dining bills, handle escrow, or collect guest food and beverage payments during Pilot #1.
3. **Zero Hidden Markups in Venue Pricing:** Relatia passes through venue minimum spends and curated packages with 100% pricing transparency. We do not inflate menu rates.
4. **Charge for Relatia’s Software & Defined Support Only:** Revenue is generated purely for workflow software, governance rules, structured tax data generation, and defined coordinator assistance.
5. **Avoid Percentage Commissions for Pilot #1:** Commission-on-spend creates misaligned incentives (rewarding overspending), complicates accounting, and alarms budget-conscious finance controllers.
6. **Ensure Strict Comprehension of Exclusions:** Customers must explicitly sign off that venue dining costs and cancellation liabilities remain their direct responsibility.
7. **Strict Caps on Event Usage:** Capping usage at 3 events prevents unbounded concierge exploitation and forces a natural renewal/expansion conversation.
8. **No Promissory Savings Claims:** Never pitch Relatia as *"guaranteed 20% savings"* or *"guaranteed 100% GST recovery."* Price on workflow clarity, time reallocation, and tax compliance readiness.

---

## 3. Pricing-Option Comparison

Seven commercial pricing models were evaluated for Relatia Pilot #1:

| Pricing Model | Description | Advantages | Disadvantages | Operational Complexity | Procurement Friction | Fit for Pilot #1 | Recommendation |
|---|---|---|---|:---:|:---:|:---:|:---:|
| **1. Free Pilot** | 30 days / 3 events at ₹0 software fee | Zero budget objection; fastest signature | No skin-in-the-game; zero willingness-to-pay signal; high abandonment | Low | Lowest | Poor | **Rejected** (Reserve only as emergency fallback) |
| **2. Fixed Pilot Fee (₹25,000)** | One-time flat fee for 30 days & 3 events | Clear budget cap; tests commercial intent; single invoice | Requires budget sign-off; customer expects high support | Low | Low (under discretionary threshold) | **Excellent** | **Selected Hypothesis for Pilot #1** |
| **3. Monthly SaaS Subscription** | ₹30,000/month recurring software license | Predictable MRR; standard SaaS model | Unnatural for a 30-day test; forces auto-renewal questions upfront | Moderate | Moderate | Moderate | **Post-Pilot Model** |
| **4. Flat Per-Event Fee** | ₹8,000 to ₹10,000 per completed event | Pay-as-you-go; low initial barrier | Unpredictable revenue; customer hesitates before each booking | Moderate | Moderate | Moderate | **Alternative Post-Pilot** |
| **5. Percentage of Spend (Take-Rate)** | 5% to 8% of total gross venue bill | Familiar event agency model; aligns with scale | Incentivizes higher spend; difficult reconciliation; legal/tax friction | High | High (Finance resists percentage) | Poor | **Rejected for Pilot** |
| **6. Base Fee + Usage Fee** | ₹15,000 base + ₹5,000 per event | Covers setup + scales with volume | Confusing for a 30-day trial; two billing components | Moderate | Moderate | Fair | **Later Stage (60D Pilot)** |
| **7. Managed Concierge Retainer** | ₹50,000+ full-service event coordination | High revenue per account | Anchors customer on agency service rather than software | High | High | Poor | **Rejected** (Distorts SaaS identity) |

---

## 4. Selected Pricing Hypothesis (Pilot #1)

```
+-----------------------------------------------------------------------------------+
|                        OFFICIAL PILOT #1 COMMERCIAL OFFER                         |
+-----------------------------------------------------------------------------------+
| PARAMETER                         | SPECIFICATION                                 |
+-----------------------------------+-----------------------------------------------+
| Headline Commercial Fee           | ₹25,000 (Rupees Twenty-Five Thousand Only)     |
| Applicable Taxes                  | + 18% GST (SAC 998313 - Information Tech)     |
|                                   | [Subject to accountant and GST review]        |
| Total Invoice Amount              | ₹29,500 inclusive of tax [Estimated]          |
| Invoicing Timing                  | Issued on agreement signature (Day 0)         |
| Payment Due Terms                 | Net 7 days from invoice receipt               |
| Pilot Duration                    | Exactly 30 calendar days from Kickoff Date    |
| Maximum Included Events           | 3 completed live corporate dining events      |
| Maximum Included User Seats       | Up to 6 active users (3 Requesters,           |
|                                   | 2 Approvers, 1 Finance lead)                  |
| Operating Geography               | Gurugram core corridor (Cyber City / GCR)     |
| Onboarding & Policy Setup         | Included at zero additional charge            |
| Treatment of Unused Events        | Expire at Day 30; non-refundable              |
| Extension Option                  | ₹10,000 for an additional 15-day window       |
| Cancellation by Customer          | 100% refundable if cancelled prior to Day 1;  |
|                                   | non-refundable once first event is initiated  |
+-----------------------------------------------------------------------------------+
```

---

## 5. Included Items

The ₹25,000 pilot fee covers the following technical, operational, and founder deliverables:

| Deliverable | Technical Classification | Description |
|---|:---:|---|
| **Tenant & Policy Setup** | Product Capability (LIVE) | Creation of isolated company workspace, entity GSTIN, and budget limits |
| **User & Role Provisioning** | Product Capability (LIVE) | Setup of up to 6 user accounts across Clerk roles (`ORGANIZER`, `APPROVER`, `FINANCE`) |
| **Event Request Workflow** | Product Capability (LIVE) | In-app creation of event requests capturing date, budget, guest count, and purpose |
| **Policy Validation Engine** | Product Capability (LIVE) | Automatic checking of per-head caps and total spend limits against company rules |
| **In-App Approval Routing** | Product Capability (LIVE) | Manager approval queue with full context, budget status, and approve/reject actions |
| **Curated Venue Directory** | Product Capability (LIVE) | Access to vetted 5-star hotel PDRs and chef-driven dining venues in Gurugram |
| **B2B Tax Invoicing Engine** | Product Capability (LIVE) | Deterministic state GST computation (CGST+SGST/IGST), SAC 996331, and print CSS |
| **Finance Spend Dashboard** | Product Capability (LIVE) | Role-gated finance visibility, KPI tracking, and downloadable CSV spend reports |
| **Manual Room Confirmation** | Manual Operation | Relatia team physically confirms room reservation and minimum spend with hotel GM |
| **Dietary & Package Coordination**| Manual Operation | Relatia team pre-locks set-menu packages and dietary restrictions with venue chef |
| **Dedicated WhatsApp Channel** | Founder Support | Shared operational channel (Mon–Sat 09:00–21:00 IST) for real-time coordinator help |
| **Kickoff & Executive Review** | Founder Support | 45-min kickoff alignment + 45-min post-pilot spend audit presentation to CFO/VP |

---

## 6. Excluded Items

To prevent scope creep, the following items are **explicitly excluded** from the ₹25,000 fee:

1. **Venue Food & Beverage Bills:** All food, dining, and beverage costs charged by the venue are paid directly by the enterprise to the venue.
2. **Alcohol & Bar Charges:** All alcoholic beverage consumption, state excise charges, and corkage fees.
3. **Venue Minimum Spend Deposits:** Any advance guarantee deposits required by luxury hotel banquets.
4. **GST Billed by Venues:** Venue GST (5% catering without ITC or 18% hotel banquet with ITC) is separate and paid directly to the venue.
5. **Venue Cancellation Charges:** Fees incurred due to client cancellation or failure to meet agreed minimum spends.
6. **Production Payment Settlement:** Relatia does not provide bank escrow, funds pooling, or automated merchant payout splitting.
7. **Merchant of Record (MoR) Liabilities:** Relatia is not the seller of the food; it does not issue the restaurant bill.
8. **ERP API Integrations:** No custom API connectors for SAP, Oracle, NetSuite, or Tally (CSV export provided).
9. **Slack / Microsoft Teams Bots:** Approvals take place within the responsive web dashboard.
10. **Custom Feature Engineering:** No bespoke software development during the 30-day pilot window.
11. **Guaranteed Room Availability:** Room bookings are subject to venue operational confirmation.
12. **Statutory Tax Guarantees:** Relatia provides structured data for finance review; it does not guarantee tax authority recovery.

---

## 7. Payment and Invoicing Flow

The commercial pilot operates under a **pure software-facilitator model** with two independent payment streams:

```
[STREAM 1: RELATIA PILOT FEE]
Enterprise Client ------(Pays ₹25,000 + GST via NEFT/RTGS)------> Relatia Platform
Relatia ----------------(Issues B2B Tax Invoice: SAC 998313)-----> Enterprise Client

[STREAM 2: VENUE HOSPITALITY BILL]
Enterprise Client ------(Pays Venue Bill via Corp Card / Direct)--> Luxury Dining Venue
Venue ------------------(Issues B2B Dining Bill: SAC 996331)-----> Enterprise Client
```

### Step-by-Step Payment Protocol:
1. **Pilot Agreement Signed:** Relatia issues a formal pro-forma / tax invoice for **₹25,000 + 18% GST (₹29,500 total)** `[Subject to accountant and GST review]`.
2. **Fee Settlement:** Enterprise accounts payable transfers the fee to Relatia’s bank account via NEFT / RTGS within 7 days.
3. **Event Booking Executed:** Organizer submits request on Relatia; Approver signs off; Relatia confirms venue reservation with pre-locked minimum spend.
4. **Venue Hospitality Invoicing:** On the night of dining, the venue issues its direct B2B tax invoice (reflecting the enterprise’s legal entity name and GSTIN) directly to the enterprise host.
5. **Venue Settlement:** The enterprise host settles the venue bill directly using an approved corporate credit card or pre-arranged direct billing credit line.
6. **No Escrow / Custody:** At no point does Relatia touch, hold, or escrow venue funds.

### Payment Gateway Status (Razorpay):
- **Sandbox Test Mode:** The codebase contains a functional Razorpay modal and webhook signature handler operating on `rzp_test_*` sandbox keys. This is used for product demonstration and state-machine verification only.
- **Production Payment Processing:** **Disabled for Pilot #1.** Production card checkout is not activated to avoid merchant-of-record liability, payment aggregator onboarding delays, and refund disputes.
- **Commercial Method:** Direct bank transfer (NEFT/RTGS) against invoice for Relatia’s fee; direct corporate credit card / hotel direct billing for venue charges.

---

## 8. Pricing Sensitivity Scenarios & Economics

To evaluate whether ₹25,000 represents a sound commercial hypothesis, we model three operational delivery scenarios across a 30-day window:

```
+-------------------------------------------------------------------------------+
|                       PILOT #1 UNIT ECONOMICS MODEL                           |
+-------------------------------------------------------------------------------+
| SCENARIO ASSUMPTIONS              | LOW-TOUCH      | EXPECTED      | HIGH-TOUCH   |
+-----------------------------------+----------------+---------------+--------------+
| Completed Events                  | 2 events       | 3 events      | 3 events     |
| Founder/Operator Hours per Event  | 2.5 hours      | 4.0 hours     | 7.0 hours    |
| Setup & Kickoff Hours             | 2.0 hours      | 3.0 hours     | 5.0 hours    |
| Review & Reporting Hours          | 1.0 hours      | 2.0 hours     | 3.0 hours    |
| Total Operating Hours             | 8.0 hours      | 17.0 hours    | 29.0 hours   |
| Direct Third-Party Tooling Costs  | ₹1,500         | ₹2,000        | ₹3,500       |
| Modeled Labor Value (@₹1,000/hr)  | ₹8,000         | ₹17,000       | ₹29,000      |
+-----------------------------------+----------------+---------------+--------------+
| FINANCIAL OUTPUTS                 |                |               |              |
+-----------------------------------+----------------+---------------+--------------+
| Pilot Revenue (excl. tax)         | ₹25,000        | ₹25,000       | ₹25,000      |
| Direct Cash Expenses              | ₹1,500         | ₹2,000        | ₹3,500       |
| Gross Cash Contribution           | ₹23,500        | ₹23,000       | ₹21,500      |
| Cash Contribution Margin          | 94.0%          | 92.0%         | 86.0%        |
| Fully-Loaded Net Contribution     | +₹15,500       | +₹6,000       | -₹7,500      |
| Effective Revenue / Founder Hour  | ₹3,125 / hr    | ₹1,470 / hr   | ₹862 / hr    |
+-----------------------------------+----------------+---------------+--------------+
```

### Economic Formulas (Plain English & LaTeX):

1. **Gross Cash Contribution:**
   $$\text{Gross Contribution} = \text{Pilot Revenue} - \text{Direct Third-Party Cash Costs}$$
   *In Expected Scenario:* $\text{Gross Contribution} = ₹25,000 - ₹2,000 = ₹23,000$ (92% margin).

2. **Effective Revenue per Operator Hour:**
   $$\text{Effective Hourly Rate} = \frac{\text{Pilot Revenue} - \text{Direct Costs}}{\text{Total Dedicated Operator Hours}}$$
   *In Expected Scenario:* $\frac{₹23,000}{17.0\text{ hours}} = ₹1,470.58\text{ per hour}$.

3. **Break-Even Pilot Fee (Fully Loaded):**
   $$\text{Break-Even Fee} = \text{Direct Cash Costs} + (\text{Total Hours} \times \text{Target Hourly Cost Benchmark})$$
   At a modeled internal labor benchmark of ₹1,000/hour for founder time:
   *In Expected Scenario:* $₹2,000 + (17 \times ₹1,000) = ₹19,000$.
   *Conclusion:* ₹25,000 comfortably covers expected operational time with a positive net margin of ₹6,000.

---

## 9. Willingness-to-Pay Learning Plan

Even with customer discovery interviews deferred, Pilot #1 generates rich commercial feedback through observable customer actions during the commercial proposal stage:

1. **Initial Reaction to Headline Fee:** Does the prospective buyer accept ₹25,000 without hesitation, request a discount, or state that pilots must be free?
2. **Objection Classification:**
   - *Budget Objection:* *"We don't have discretionary funds for software pilots."* (Signals wrong economic buyer).
   - *Value Objection:* *"Why pay before seeing results?"* (Signals need for clearer risk mitigation or performance guarantees).
   - *Procurement Friction:* *"A paid pilot triggers a 90-day vendor onboarding process."* (Signals institutional empanelment hurdles).
3. **Scope Item Valuations:** When reviewing the offer, does the customer prioritize the **curated venue directory**, the **in-app policy approval**, or the **B2B tax invoice data**?
4. **Renewal Transition Signal:** At Day 25, does the economic buyer request an annual SaaS proposal, ask for a paid extension, or indicate they will revert to manual WhatsApp bookings?

---

## 10. Discount Policy

To prevent undisciplined price erosion while granting founders tactical flexibility during closing, the following discount boundaries are established:

```
+-----------------------------------------------------------------------------------+
|                        PILOT DISCOUNT & CONCESSION POLICY                         |
+-----------------------------------------------------------------------------------+
| LIST PRICE:                  ₹25,000 + GST                                        |
| STANDARD CLOSING BAND:       ₹20,000 to ₹25,000 (Maximum 20% discount)            |
| HARD FLOOR (EMERGENCY):      ₹15,000 (Requires approval by Lead Founder)          |
| FREE PILOT (₹0):             Permitted ONLY with formal written concession trade  |
+-----------------------------------------------------------------------------------+
```

### Mandatory Customer Concessions for Discounts:
If a customer requests a fee reduction from ₹25,000 to ₹15,000–₹20,000, they must agree to at least two reciprocal commitments:
1. **Named Case Study / Reference:** Written agreement to provide a named customer reference call or co-branded case study upon successful completion of 3 events.
2. **CFO Spend Audit Presentation:** Guaranteed 30-minute post-pilot debrief with their Chief Financial Officer or Finance Controller.
3. **Shortened Decision Window:** Commitment to evaluate a formal annual SaaS contract within 14 days of pilot completion.

> **Rule:** Any concession granted for Pilot #1 is explicitly labeled as a *"Founding Cohort Pilot Subsidy"* and does not set a precedent for renewal list pricing.

---

## 11. Renewal and Post-Pilot Pricing Options

At the conclusion of the 30-day pilot, Relatia presents three expansion pricing options based on the customer’s observed event cadence:

```
+-----------------------------------------------------------------------------------+
|                           POST-PILOT EXPANSION OPTIONS                            |
+-----------------------------------------------------------------------------------+
| OPTION 1: ANNUAL ENTERPRISE SAAS (RECOMMENDED)                                    |
| - Pricing: ₹25,000 to ₹40,000 / month (billed annually: ₹3.0L–₹4.8L / year)      |
| - Scope: Unlimited events across all commercial departments, full GST engine,     |
|   unlimited users, priority venue coordination, dedicated account manager.        |
+-----------------------------------------------------------------------------------+
| OPTION 2: MULTI-DEPARTMENT EXPANDED PILOT (60 DAYS)                               |
| - Pricing: ₹50,000 flat for 60 days (up to 10 events across 3 departments)        |
| - Scope: For accounts needing broader consensus before an annual commitment.      |
+-----------------------------------------------------------------------------------+
| OPTION 3: PER-EVENT USAGE FEE (FOR INFREQUENT HOSTS)                              |
| - Pricing: ₹8,000 flat per completed event (zero recurring monthly software fee)  |
| - Scope: For firms hosting <1 event per month that refuse annual subscriptions.   |
+-----------------------------------------------------------------------------------+
```

---

## 12. Commercial Risks

The following commercial risks must be actively monitored and mitigated:

1. **Perceived as an Event Agency:** Customer treats Relatia as a traditional offline catering agency rather than a software platform.
   *Mitigation:* Insist that all event requests and approvals are entered directly through the web application by the customer's team.
2. **Unbounded Concierge Demands:** Customer expects founders to manage custom floral decor, printed menus, or complex event staging.
   *Mitigation:* Reiterate that Relatia's scope is private dining room reservation, menu package lock-in, and B2B tax billing governance.
3. **Venue Minimum Spend Disagreements:** A client table fails to reach the ₹75,000 room minimum spend and blames Relatia.
   *Mitigation:* Document minimum spend commitments prominently in the pre-event brief signed off by the approver.
4. **Alcohol Tax Confusion:** In Delhi and Haryana, alcohol is governed by state excise, while food is under GST.
   *Mitigation:* Require venues to provide itemized tax invoices splitting food catering GST from bar charges.
5. **Support Burnout:** Manual venue coordination exceeds the modeled 17 hours, driving hourly revenue below break-even.
   *Mitigation:* Strictly cap pilot usage at 3 events and enforce standard 48-hour advance notice for bookings.

---

## 13. Customer-Facing Pricing Language

### Short Proposal Paragraph:
> *"Relatia provides a 30-day commercial validation pilot for [Company Name] covering up to 3 executive client or leadership dining events in Gurugram. For a one-time pilot fee of ₹25,000 (+ applicable GST), Relatia delivers dedicated tenant onboarding, internal pre-spend policy controls, access to curated luxury private dining rooms, discrete corporate billing coordination, and structured B2B GST tax invoice data delivered directly to your finance team."*

### One-Line Price Statement:
> **"₹25,000 + GST for a 30-day corporate dining governance pilot covering up to 3 executive events."**

### Included / Excluded Summary Statement:
> *"The pilot fee covers full platform access, role-based user onboarding, and dedicated booking coordination. Venue food, beverage, and dining charges are billed separately and transparently by the host venue directly to [Company Name] with zero platform markup."*

---

### Customer Objection Handling Scripts:

#### Q1: "Why should we pay ₹25,000 before seeing results?"
> *"We understand your perspective. The ₹25,000 fee covers dedicated tenant onboarding, custom budget policy configuration, and white-glove coordination across 3 live executive dinners. For an organization hosting high-stakes client dinners, it represents less than 10% of your total dining outlay, while ensuring your executives have guaranteed room privacy, discrete billing, and full GST tax compliance data for your finance controller."*

#### Q2: "Can you make the pilot free for our team?"
> *"To ensure our engineering and operations team can provide dedicated, high-touch support for every single dinner, we intentionally limit our pilot cohort to committed partners. While we do not offer open-ended free pilots, we can discuss a subsidized founding-partner fee of ₹20,000 in exchange for a structured executive feedback session and case study upon successful completion."*

#### Q3: "Can you charge us only when an event happens (e.g., ₹8,000/event)?"
> *"A per-event model works well for ongoing operations, and we offer that option as a post-pilot commercial path. However, the initial pilot requires upfront tenant provisioning, compliance setup, and venue package curation. The flat ₹25,000 structure covers that entire foundation and gives your team the freedom to execute up to 3 events within the month without friction."*

---

## 14. Commercial Decision Log

| Decision Item | Recommended Position | Status | Owner | Evidence Needed | Target Date |
|---|---|:---:|:---:|---|:---:|
| **Pilot Headline Fee** | ₹25,000 + GST flat fee | Proposed | Founder (Purvender) | Customer reaction on proposal delivery | Day 14 |
| **Tax Classification** | SAC 998313 (IT/Software SaaS) @ 18% | To Be Confirmed | Chartered Accountant | Formal tax opinion / accountant review | Day 14 |
| **Payment Terms** | 100% upfront (Net 7 days) via NEFT | Proposed | Founder | Accounts Payable acceptance | Kickoff |
| **Payment Method** | Direct Bank Transfer (NEFT/RTGS) | Recommended | Founder | Commercial agreement signature | Kickoff |
| **Venue Money Custody** | Zero custody; direct venue billing | Locked | Founder | Venue commercial terms alignment | Day 14 |
| **Event Limit** | 3 completed live events | Proposed | Founder | Operational bandwidth review | Kickoff |
| **Cancellation Liability**| Customer bears venue cancellation fees | Proposed | Legal / Founder | Pilot terms agreement sign-off | Kickoff |
| **Discount Authority** | Max 20% discount (floor: ₹20,000) | Proposed | Lead Founder | Prospect negotiation feedback | Day 15 |
| **Post-Pilot Model** | Annual SaaS @ ₹30k/mo or ₹8k/event | Roadmap | Founder | Post-pilot CFO review data | Day 30 |
| **Razorpay Prod Activation**| Remain in test mode for Pilot #1 | Locked | Engineering Lead | Merchant KYC & banking partner setup | Day 35+ |

---

## 15. Final Decision Required

### Summary of Selected Position:
- **Commercial Pilot #1 Price:** **₹25,000 + 18% GST** for 30 calendar days and up to 3 corporate dining events.
- **Model:** Pure Software Facilitator + Dedicated Founder Concierge Operations.
- **Custody:** Zero custody of venue money; direct venue-to-enterprise billing.
- **Payment Collection for Relatia Fee:** Direct bank transfer (NEFT/RTGS) against tax invoice. Razorpay remains in sandbox test mode.

### What Can Be Decided Now:
- Establish ₹25,000 as our primary commercial proposal baseline for Day 13–14 pilot agreements.
- Enforce the 3-event usage cap and 30-day duration across all pilot communications.
- Maintain zero custody over venue funds and zero markups on food and beverage bills.

### What Requires Professional Accountant / Legal Confirmation:
1. Formal GST SAC code confirmation (SAC 998313 for software/SaaS vs. SAC 998559 for event support) and interstate tax invoicing rules.
2. Review of the short-form pilot agreement liability and cancellation clauses.

### Next Step for Day 13 Step 3:
Draft the formal, customer-facing **Commercial Pilot Agreement / Proposal Term Sheet** incorporating these exact boundaries and payment flows.
