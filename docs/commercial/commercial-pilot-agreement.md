# Relatia — Commercial Pilot Agreement (Proposed Term Sheet)

> **Document Classification:** Internal Commercial Planning — Proposed Pilot Term Sheet
> **Status:** Active Working Draft — Day 13 Step 3
> **Repository Context:** Grounded in codebase truth (commit `e3dc24c` on branch `develop`), [`docs/commercial/pilot-design.md`](../commercial/pilot-design.md), [`docs/commercial/pilot-pricing-hypothesis.md`](../commercial/pilot-pricing-hypothesis.md), [`docs/business-foundation.md`](../business-foundation.md), [`docs/customer-segmentation-and-icp.md`](../customer-segmentation-and-icp.md), and [`docs/buyer-and-user-personas.md`](../buyer-and-user-personas.md).
> **Customer Discovery Note:** Customer interviews are intentionally deferred. All commercial terms, pricing figures, scope limits, and operational assumptions represent **working hypotheses to be tested**, not validated facts.
> **Legal Notice:** This document is **NOT a legal contract.** It describes a proposed commercial understanding only. Legal, tax, privacy, and accounting review may be required before any commercial engagement begins. A final signed agreement may be needed before commercial operation commences.

---

## Table of Contents

1. [Purpose of This Document](#1-purpose-of-this-document)
2. [Pilot Parties](#2-pilot-parties)
3. [Pilot Objective](#3-pilot-objective)
4. [Pilot Scope](#4-pilot-scope)
5. [What the Pilot Customer Receives](#5-what-the-pilot-customer-receives)
6. [What Relatia Commits to](#6-what-relatia-commits-to)
7. [What the Pilot Customer Commits to](#7-what-the-pilot-customer-commits-to)
8. [Pilot Fee and Payment](#8-pilot-fee-and-payment)
9. [Money Flow](#9-money-flow)
10. [Out of Scope](#10-out-of-scope)
11. [Success Measurement](#11-success-measurement)
12. [Pilot Review and Conversion Trigger](#12-pilot-review-and-conversion-trigger)
13. [Extension and Termination](#13-extension-and-termination)
14. [Data and Privacy Boundaries](#14-data-and-privacy-boundaries)
15. [Customer-Facing Objections](#15-customer-facing-objections)
16. [Approval Checklist](#16-approval-checklist)

---

## 1. Purpose of This Document

This document describes the proposed commercial understanding between Relatia and a single
pilot customer for the first Relatia commercial pilot.

### Why this document exists

Before a commercial pilot begins, both parties need a shared, plain-English record of what
is included, what is excluded, how money flows, and how success will be measured.

### What this document is

- A proposed term sheet describing the intended pilot scope, fee, responsibilities, and measurements.
- A working draft subject to revision before any agreement is signed.
- A planning tool for internal commercial preparation.

### What this document is not

- **Not a legal contract.** It does not create binding legal obligations.
- **Not a service-level agreement.** It does not guarantee specific performance outcomes.
- **Not financial or tax advice.** Tax treatment must be confirmed by a qualified chartered accountant before invoicing.
- **Not a validated commercial offer.** The pricing and scope described here are hypotheses to be tested, not confirmed market-standard terms.

### Before commercial operation begins

Relatia and the pilot customer should:

1. Confirm that both parties have reviewed and agreed to the proposed terms in writing.
2. Obtain any required internal approvals (budget, procurement, legal, or compliance).
3. Obtain independent legal, tax, privacy, and accounting review where required.
4. Sign a final agreement if either party or their advisors require one.

---

## 2. Pilot Parties

This section uses role descriptions only. No names, addresses, GSTINs, phone numbers,
email addresses, or personal data are recorded in this planning document.

| Role | Description |
|---|---|
| **Relatia** | The provider of the software platform, workflow tooling, and founder-led coordination operations. |
| **Pilot Customer** | One Gurugram-based enterprise organization that has agreed to participate in the pilot. Legal entity name, GSTIN, registered address, and authorized signatory must be confirmed in the final written agreement. |
| **Participating Venues** | Pre-vetted private dining venues in the Gurugram Core Corridor. Venues are independent third-party operators and are not parties to any agreement between Relatia and the pilot customer. |

---

## 3. Pilot Objective

The pilot is intended to evaluate whether the Relatia platform and workflow can provide
meaningful operational value to an enterprise corporate dining workflow in a real environment.

### The pilot is intended to evaluate

1. **Event-request creation:** Whether requesters can submit a corporate dining event request through the web application without requiring training beyond an initial onboarding session.
2. **Internal approval workflow:** Whether in-app approval routing enables an approver to review and act on an event request faster than an equivalent email or WhatsApp process.
3. **Venue discovery:** Whether the curated venue directory provides sufficient relevant options for the pilot customer's event types.
4. **Manual venue confirmation:** Whether Relatia's manual venue coordination process can reliably confirm a private dining room within a reasonable timeframe.
5. **Finance and invoice visibility:** Whether the finance dashboard and invoice view provide useful structured data to the finance user.
6. **Operational effort:** How many hours of Relatia founder time are required to support the pilot, and whether that is commercially reasonable.
7. **User adoption:** Whether requesters, approvers, and the finance user continue using the product across all three events without reverting to manual methods.
8. **Willingness to continue:** Whether the pilot customer expresses interest in continued use after the pilot ends.

### The pilot is not intended to prove

- Guaranteed savings on hospitality spend.
- Guaranteed venue availability on any date or at any time.
- Guaranteed GST Input Tax Credit recovery (subject to statutory provisions and independent tax counsel).
- Autonomous AI booking, negotiation, or algorithmic venue pricing.
- Production ERP, Slack, or Microsoft Teams integrations.
- Nationwide or multi-city marketplace coverage.
- Full production-scale merchant payment settlement.

---

## 4. Pilot Scope

All parameters below are `[Hypothesis — subject to confirmation before kickoff]`.

| Parameter | Proposed Value | Status |
|---|---|:---:|
| Pilot customers | One (1) enterprise organization | Hypothesis |
| Geography | Gurugram Core Corridor (Cyber City, Golf Course Road, DLF corridors, Horizon Centre, Udyog Vihar) | Hypothesis |
| Duration | 30 calendar days from kickoff date | Hypothesis |
| Live events included | Up to 3 completed corporate dining events | Hypothesis |
| Requesters | 2 to 3 users | Hypothesis |
| Approvers | 1 to 2 users | Hypothesis |
| Finance users | 1 user | Hypothesis |
| Venue options | 5 to 8 pre-vetted venues where available | Hypothesis |
| Operations model | Founder-supported manual concierge | Hypothesis |
| Product delivery | Responsive web application | Live |
| Secondary geography | Aerocity by exception only | Hypothesis |
| Excluded geographies | South Delhi, Noida, Greater Noida, Mumbai, Bengaluru, all other cities | Decided |

---

## 5. What the Pilot Customer Receives

### 5a. Product Capabilities (Live in Codebase)

| Capability | Description |
|---|---|
| Tenant setup | Company workspace created with entity details and budget configuration. |
| User and role configuration | Up to 6 user accounts provisioned across Requester, Approver, and Finance roles. |
| Approval-policy configuration | Per-head and total-budget caps configured; approval routing established. |
| Event request creation | In-app event request creation capturing date, headcount, budget, and purpose. |
| Policy validation | Automatic checking of event requests against configured spend limits. |
| Venue discovery | Access to curated venue directory filtered by capacity, city, and price band. |
| Venue selection | Ability to link a selected venue to an approved event record. |
| Approval workflow | In-app approval queue with full event context and approve/reject actions. |
| Finance visibility | Role-gated finance dashboard with spend tracking and CSV export. |
| Invoice view | Structured invoice view with GST breakdown (CGST/SGST or IGST) and browser-print flow. |

### 5b. Manual Operations (Founder-Led)

| Operation | Description |
|---|---|
| Manual venue confirmation | Relatia team contacts venue banquet desk to verify room availability and minimum spend. |
| Dietary and menu coordination | Relatia team coordinates pre-set menu packages and dietary requirements with venue staff. |

### 5c. Founder Support Included

| Support | Description |
|---|---|
| Pilot onboarding | Up to 5 business days of onboarding, including kickoff call, tenant setup, and simulation test. |
| Dedicated support channel | Shared WhatsApp channel or equivalent for pilot-period communications (Mon–Sat, 09:00–21:00 IST). |
| Post-pilot review | Review session covering completed events, operational issues, and finance outcomes. |

> **Truth statement:** All capabilities marked "Live" exist in the production codebase.
> Manual operations are performed by Relatia founders, not by automated systems.
> No excluded or unavailable features are described as production-ready.

---

## 6. What Relatia Commits to

Relatia proposes to:

1. Provide access to the agreed pilot scope as described in Section 4.
2. Explain the workflow during onboarding so that requesters, approvers, and the finance user can operate the platform with minimal friction.
3. Configure the agreed users and roles as confirmed by the pilot customer before kickoff.
4. Coordinate venue confirmation within reasonable manual operating limits (advance notice of at least 48 hours is recommended; confirmation is subject to venue availability).
5. Record operational issues encountered during the pilot for the post-pilot review.
6. Review pilot outcomes at the agreed review points.
7. Communicate known limitations proactively. If a venue is unavailable or a capability does not function as expected, Relatia will notify the pilot customer promptly.
8. Protect pilot data in accordance with the repository's data-handling and privacy principles (see Section 14).

### What Relatia does not commit to

- Response-time SLAs beyond the general operating hours described above. No contractual SLA has been approved for Pilot #1. `[Decision required]`
- Guaranteed venue availability.
- Guaranteed tax outcomes. Relatia provides structured tax data; it does not guarantee that the customer's tax authority will approve any claim.
- Guaranteed savings, guaranteed bookings, or any other outcome guarantee.

---

## 7. What the Pilot Customer Commits to

The pilot customer is proposed to accept the following responsibilities, subject to final written agreement.

1. Provide accurate company and user setup information before kickoff.
2. Nominate requesters, approvers, and the finance user before the onboarding session.
3. Provide approval-policy information (budget caps, per-head limits, routing rules) to be configured in the platform.
4. Use the product for agreed events rather than reverting to phone, email, or WhatsApp.
5. Provide timely feedback and respond to operational questions within a reasonable timeframe.
6. Identify a pilot owner — one person responsible for internal pilot coordination.
7. Pay the agreed pilot fee if the proposal is accepted. `[Subject to final agreement]`
8. Pay venues directly for all venue food, beverage, and event charges.
9. Review and accept venue terms, cancellation rules, minimum spend requirements, and billing terms before confirming any booking.
10. Avoid entering real client GSTINs, confidential client information, or unnecessary personal data into research or test records.
11. Report operational issues promptly.

> Items marked `[Subject to final agreement]` require a final signed written agreement before they create any legal or commercial obligation.

---

## 8. Pilot Fee and Payment

### Proposed fee structure

| Parameter | Proposed Value | Status |
|---|---|:---:|
| Pilot fee | ₹25,000 (Rupees Twenty-Five Thousand) | Pricing hypothesis — not validated market pricing |
| Applicable taxes | +18% GST (SAC classification subject to accountant review) | Requires accountant and GST confirmation |
| Indicative total | ₹29,500 inclusive of tax | Estimated, subject to tax review |
| Payment timing | On agreement signature (Day 0) | Proposed — requires commercial approval |
| Payment terms | Net 7 days from invoice receipt | Proposed — requires commercial approval |
| Payment method | Direct bank transfer (NEFT/RTGS) | Proposed |
| Currency | Indian Rupee (INR) | Proposed |

> **Important:** ₹25,000 is a **pricing hypothesis**, not a validated or market-confirmed price. The final fee and payment terms are subject to written commercial agreement.

### What the fee explicitly does not cover

| Excluded Item | Notes |
|---|---|
| Venue food and beverage charges | Paid directly by the customer to the venue |
| Alcohol and bar charges | Paid directly by the customer to the venue |
| Venue minimum spend deposits | Customer's responsibility |
| Venue taxes billed by venues | Separate from Relatia's fee |
| Venue cancellation charges | Customer bears cancellation liability per venue terms |
| Payment-gateway fees | Razorpay remains in test mode; no live gateway in Pilot #1 |
| Custom software development | No bespoke feature engineering during the pilot |
| ERP, Slack, or Teams integrations | Not available for Pilot #1 |
| Unlimited support | Support is bounded by defined operating hours and scope |
| Legal, tax, or accounting advice | Customer must obtain independent professional advice |

### Refund and cancellation

- Unused events do not automatically create a right to a refund unless explicitly agreed in writing. `[Subject to final agreement]`
- Free or discounted pilots require written approval by the lead founder and are subject to reciprocal commitments per the discount policy in `pilot-pricing-hypothesis.md`.

---

## 9. Money Flow

The proposed Pilot #1 money flow operates under a **pure software-facilitator model**
with two independent and separate payment streams.

### Stream 1 — Relatia Pilot Fee

```
Enterprise (Pilot Customer)  -- pays Rs 25,000 + GST via NEFT/RTGS --> Relatia
Relatia                      -- issues B2B tax invoice               --> Enterprise
```

### Stream 2 — Venue Hospitality Bill

```
Enterprise (Pilot Customer)  -- pays venue bill via corporate card   --> Venue
Venue                        -- issues B2B dining invoice (SAC 996331)--> Enterprise
```

### Key money-flow principles

1. Relatia invoices only the pilot software and coordination fee.
2. The enterprise pays Relatia for the agreed software and pilot service only.
3. The venue invoices the enterprise directly for all venue and event charges.
4. The enterprise pays the venue directly unless a separately approved arrangement exists in writing.
5. Relatia does not hold venue money at any point.
6. Relatia is not automatically the Merchant of Record for dining or hospitality services.
7. Relatia does not guarantee venue refunds, settlement outcomes, or cancellation resolutions.

### Questions requiring professional review before the pilot begins

- Correct GST SAC code for Relatia's pilot fee (software/SaaS vs. event support)
- Interstate tax treatment (IGST vs. CGST/SGST) depending on the registered state of the pilot customer
- Whether any Merchant of Record exposure arises from the coordination role
- Payment collection mechanics (NEFT instructions, bank details, GST invoice format)
- Alcohol tax treatment if any event includes an alcoholic beverage component

---

## 10. Out of Scope

| Out-of-Scope Item | Reason |
|---|---|
| Production payment escrow | Not built; Razorpay is in test mode only |
| Production payment settlement | Payment activation requires separate merchant KYC |
| Merchant of Record services | Venue bills enterprise directly |
| Guaranteed venue availability | Manual confirmation; no inventory guarantee |
| Guaranteed bookings | Subject to venue operational response |
| Guaranteed savings on hospitality spend | No such claim is made |
| Guaranteed GST recovery | Subject to statutory provisions and customer's tax counsel |
| Autonomous AI negotiation | Database filters only; no LLM negotiation |
| Production Slack/Teams approval bots | In-app approvals only; chat bots are roadmap |
| ERP integrations (SAP, Oracle, NetSuite, Tally) | Not available; CSV export provided |
| Direct venue portal access | Venues do not have independent logins in the platform |
| Unlimited venue sourcing | Bounded to 5–8 pre-vetted venues in Gurugram |
| Events outside Gurugram and Aerocity | Not supported in Pilot #1 |
| Custom integrations | No bespoke API development during the pilot |
| Custom workflows beyond agreed scope | No custom approval chains beyond configured policy |
| Native PDF invoice generation | Browser print-to-PDF supported; no dedicated PDF library |
| Automatic refunds | Subject to venue terms and written agreement |
| Automatic cancellation negotiation | Handled manually with the venue |
| Unlimited concierge support | Bounded by defined hours and event caps |
| Legal, tax, or accounting advice | Must be obtained independently by both parties |

---

## 11. Success Measurement

All metrics below are proposed hypotheses. No target results are presented as guaranteed outcomes.

### Event metrics

| Metric | What It Measures | How It May Be Recorded | Status | Limitations |
|---|---|---|:---:|---|
| Events created | Event requests submitted in the platform | Platform database | Proposed | Requires at least 1 request to be meaningful |
| Events completed | Events that reached the venue on the scheduled date | Operational log | Proposed | Depends on venue availability and customer commitment |
| Approval completion rate | Share of submitted events that completed the approval workflow | Platform database | Proposed | Does not measure approval quality |

### Workflow metrics

| Metric | What It Measures | How It May Be Recorded | Status | Limitations |
|---|---|---|:---:|---|
| Time from request to approval | Hours between submission and final approval | Platform timestamps | Proposed | Depends on approver responsiveness |
| Venue response time | Hours between venue inquiry and room confirmation | Manual operational log | Proposed | Highly variable; depends on venue desk |
| Venue options considered | Number of venue options presented per event | Platform records or founder log | Proposed | Limited by directory size |

### Finance metrics

| Metric | What It Measures | How It May Be Recorded | Status | Limitations |
|---|---|---|:---:|---|
| Invoice data completeness | Whether invoice records contain entity name, GSTIN, SAC code, and tax split | Finance user review | Proposed | Finance user judgment required |
| Finance user usability | Whether the finance user finds the dashboard useful | Post-pilot interview | To be validated | Qualitative; single user sample |

### Usability metrics

| Metric | What It Measures | How It May Be Recorded | Status | Limitations |
|---|---|---|:---:|---|
| Requester usability | Whether requesters found the request workflow clear | Post-pilot survey or interview | To be validated | Self-reported; small sample |
| Approver usability | Whether approvers found the approval workflow clear | Post-pilot survey or interview | To be validated | Self-reported; small sample |

### Operational metrics

| Metric | What It Measures | How It May Be Recorded | Status | Limitations |
|---|---|---|:---:|---|
| Manual operating hours | Actual Relatia founder hours spent on coordination | Founder time log | Proposed | Affects unit economics |
| Support requests | Number of questions or issues raised via the support channel | WhatsApp or email log | Proposed | High volume may indicate onboarding gaps |
| Repeated usage | Whether requesters used the platform for a second or third event | Platform records | Proposed | Early signal of habit formation |

### Commercial metrics

| Metric | What It Measures | How It May Be Recorded | Status | Limitations |
|---|---|---|:---:|---|
| Customer willingness to continue | Whether the pilot customer expresses interest in continued paid use | Post-pilot conversation | To be validated | Qualitative signal only |
| Unresolved issues | Open operational, billing, or product issues at pilot end | Issue log | Proposed | Must be cleared before any renewal discussion |

---

## 12. Pilot Review and Conversion Trigger

### Review schedule

| Review | Timing | Purpose |
|---|---|---|
| First-event review | After the first completed event | Confirm workflow ran as expected; record issues; decide whether to continue |
| Midpoint check-in | Around Day 14 or after the second event | Review adoption, support volume, and any operational friction |
| Final review | After the third event or at Day 30, whichever comes first | Record all evidence; discuss open issues; decide next step |

### Proposed conversion trigger

A paid continuation or renewal discussion may be opened if all of the following conditions
are met at the final review:

1. The pilot customer has completed at least one meaningful end-to-end workflow.
2. The pilot customer has identified at least one recurring use case.
3. The pilot customer accepts the operational boundaries described in Section 10.
4. The pilot customer expresses willingness to pay for continued access.
5. The required ongoing support burden is commercially reasonable for Relatia.
6. No unresolved legal, tax, privacy, or payment blocker remains.

> Conversion is not automatic. No right to a renewal at any specific price is created by completing the pilot. All post-pilot commercial terms require a separate written agreement.

---

## 13. Extension and Termination

All items in this section are `[Subject to final agreement]`.

| Scenario | Proposed Handling |
|---|---|
| Early termination by customer | Pilot fee is non-refundable once the first event has been initiated. Full refund is possible if termination occurs before any platform access is granted, subject to written agreement. |
| Early termination by Relatia | Relatia may terminate the pilot if the customer materially breaches agreed boundaries. Refund terms to be agreed in writing. |
| Pilot extension | A 15-day extension at an additional ₹10,000 fee is proposed (hypothesis). Extension must be requested before Day 25. |
| Unused event capacity | Unused events expire at Day 30 and do not automatically create a refund right. |
| Venue cancellation | Relatia will work to source an alternative venue where possible. No alternative is guaranteed. Venue cancellation costs are governed by the venue's own terms. |
| Customer cancellation of a booked event | Venue cancellation charges are the customer's responsibility. Relatia is not liable for venue minimum spend shortfalls arising from customer cancellation. |
| Technical interruption | Relatia will record the issue and discuss a fair resolution. No automatic refund or credit is guaranteed. |
| Force majeure or venue unavailability | Relatia will communicate promptly and attempt to offer alternatives. No refund is automatic. |
| Customer refund requests | Reviewed in good faith. No refund is automatic. Refund decisions require written agreement. |

---

## 14. Data and Privacy Boundaries

| Boundary | Description |
|---|---|
| No real GSTINs in research records | Research, planning, and discovery documents must not contain actual customer or third-party GSTINs. |
| No unnecessary personal contact information | Names, phone numbers, and email addresses should be limited to what is operationally required. |
| No confidential client data | Pilot customer must not enter their clients' confidential information into Relatia's platform during the pilot. |
| Anonymized notes | Notes taken during the pilot should use role labels rather than personal names where possible. |
| Access limitation | Pilot tenant data is accessible only to provisioned users and Relatia platform administrators. |
| Retention and deletion | Data retention and deletion timelines must be agreed before the pilot begins. `[Decision required]` |
| Recording consent | Any calls, review sessions, or interviews are recorded only with the explicit consent of all participants. |
| No recordings committed to Git | No audio, video, or transcript of any call or session is committed to the Git repository. |

---

## 15. Customer-Facing Objections

**"Why should we pay before seeing results?"**

> The proposed fee covers dedicated onboarding, user setup, approval-policy configuration, and coordination effort for up to three executive dining events. A nominal fee ensures both parties are committed to making the pilot work. The pilot does not guarantee specific savings or tax outcomes; it is a structured test of a new workflow.

---

**"Can the pilot be free?"**

> A free pilot is possible in exceptional circumstances with written approval from the lead founder and a reciprocal commitment from the customer (such as a structured feedback session or named reference call). A free pilot also does not test the customer's willingness to pay, which is one of the key hypotheses Relatia needs to validate at this stage.

---

**"What happens if a venue cancels?"**

> Relatia will make every reasonable effort to source an alternative within the same geography and timeframe. However, Relatia cannot guarantee replacement availability. Cancellation charges are governed by the venue's own cancellation policy, not by Relatia.

---

**"Can you guarantee a venue?"**

> No. All venue bookings are confirmed manually with the venue's banquet team and are subject to the venue's operational availability. The proposed minimum advance notice is 48 hours. Relatia will always communicate if a venue is unavailable.

---

**"Can you collect and settle the venue payment?"**

> Not in Pilot #1. The enterprise pays the venue directly. Relatia invoices only the pilot software and coordination fee. Merchant of Record services and payment settlement are not included in the pilot scope.

---

**"Can you integrate with our ERP?"**

> ERP integrations (SAP, Oracle, NetSuite, Tally, or similar) are not available in Pilot #1. The platform provides a structured invoice view and downloadable CSV data to support manual reconciliation. Native ERP connectors are a planned future capability.

---

**"Can you guarantee GST recovery?"**

> No. Relatia generates structured B2B GST invoice data intended to support the customer's internal tax review. Whether any Input Tax Credit is actually recoverable depends on statutory provisions, vendor filing compliance, and the customer's own tax position. The customer should obtain independent tax advice.

---

**"Can we use this in another city?"**

> Pilot #1 is scoped to the Gurugram Core Corridor, with Aerocity as a secondary option by exception. Events in other cities are outside Pilot #1 scope. City expansion is planned for later phases, but no timeline is committed.

---

**"What happens after 30 days?"**

> After the pilot ends, Relatia and the pilot customer will conduct a final review. If the customer wishes to continue, Relatia will present post-pilot options (monthly subscription or per-event fee). Continued use after Day 30 requires a separate written commercial agreement.

---

## 16. Approval Checklist

| Checklist Item | Status | Notes |
|---|---|---|
| Pilot customer legal entity confirmed | To be confirmed | Name and GSTIN required for invoicing |
| Pilot owner nominated | To be confirmed | One internal owner required |
| Requesters confirmed (2–3 users) | To be confirmed | Names and email addresses for Clerk onboarding |
| Approvers confirmed (1–2 users) | To be confirmed | Approval authority level to be documented |
| Finance user confirmed (1 user) | To be confirmed | AP lead or Finance Controller |
| Pilot geography confirmed | To be confirmed | Gurugram Core Corridor |
| Event limit agreed (up to 3) | To be confirmed | Cap applies across the 30-day window |
| Venue scope agreed (5–8 Gurugram venues) | To be confirmed | Subject to venue availability |
| Pilot fee agreed (₹25,000 hypothesis) | To be confirmed | Subject to accountant and GST review |
| Tax treatment confirmed | Requires accountant review | SAC code and applicable GST rate |
| Invoice timing confirmed | To be confirmed | Day 0 on agreement signature |
| Payment method confirmed | To be confirmed | NEFT/RTGS bank transfer proposed |
| Cancellation responsibility confirmed | To be confirmed | Customer bears venue cancellation risk |
| Data handling agreed | To be confirmed | Retention and deletion to be documented |
| Support channel established | To be confirmed | WhatsApp channel or equivalent |
| First review date set | To be confirmed | After first completed event |
| Midpoint review date set | To be confirmed | Around Day 14 |
| Final review date set | To be confirmed | Day 30 or after third event |
| Legal review completed if required | Decision required | Depends on customer procurement policy |
| Internal approvals obtained by customer | To be confirmed | Budget, procurement, and compliance |
| Final written acceptance received | Required before kickoff | Must precede any commercial operation |

---

## Document Status

| Item | Status |
|---|---|
| Document type | Proposed term sheet — working draft |
| Legal contract | No — this is not a legal contract |
| Ready for internal review | Yes |
| Ready for customer-facing use | Not yet — requires final written agreement and legal/tax review |
| Open legal decisions | SAC code, IGST/CGST applicability, liability clauses, refund terms |
| Open commercial decisions | Final fee approval, payment terms, data retention |
| Recommended next action | Obtain accountant review of tax treatment; draft final written agreement before any commercial engagement |
