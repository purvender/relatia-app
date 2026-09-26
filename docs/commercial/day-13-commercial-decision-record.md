# Relatia — Day 13 Commercial Decision Record and Handoff

> **Document Classification:** Internal Commercial Planning — Decision Record and Handoff
> **Status:** Active Working Draft — Day 13 Step 5
> **Repository Context:** Grounded in codebase truth (commit `e3dc24c` on branch `develop`).
> **Customer Discovery Note:** Customer interviews are intentionally deferred. All pricing,
> commercial terms, package assumptions, and conversion expectations are clearly labeled as
> hypotheses. No validated customer evidence is cited.

---

## Table of Contents

1. [Day 13 Objective](#1-day-13-objective)
2. [Completed Artifacts](#2-completed-artifacts)
3. [Current Recommended Commercial Model](#3-current-recommended-commercial-model)
4. [Decision Classification](#4-decision-classification)
5. [Financial Model Summary](#5-financial-model-summary)
6. [Risk Register](#6-risk-register)
7. [Readiness Checklist](#7-readiness-checklist)
8. [Next-Day Handoff](#8-next-day-handoff)
9. [Day 13 Completion Statement](#9-day-13-completion-statement)

---

## 1. Day 13 Objective

Day 13 establishes the initial commercial foundation for Relatia's first paid pilot.
The work done on Day 13 is entirely commercial and documentation-focused. No application
code, database schemas, payment infrastructure, or production configuration was changed.

Day 13 establishes:

1. **The initial pilot shape** — the scope, geography, duration, event volume, user
   structure, and operational model for Pilot #1.

2. **The first pricing hypothesis** — a proposed pilot fee of ₹25,000 (hypothesis, not
   validated) with modeled unit economics, a discount policy, and post-pilot options.

3. **The proposed pilot agreement** — a plain-English term sheet describing the commercial
   understanding between Relatia and one pilot customer, explicitly labeled as not a
   legal contract.

4. **Future packaging direction** — a structured description of five possible future
   packages (Pilot, Core Platform, Enterprise, Managed Concierge, Hospitality Provider),
   with capability statuses, billing model comparisons, packaging principles, and a
   pricing-learning plan.

5. **Open commercial decisions** — a clear record of which commercial questions have been
   decided, which are proposed, which require professional review, and which remain deferred.

---

## 2. Completed Artifacts

### Day 13 commercial documents

| Document | Path | Status |
|---|---|:---:|
| Commercial Pilot Design | `docs/commercial/pilot-design.md` | Complete — committed |
| Commercial Pilot-Pricing Hypothesis | `docs/commercial/pilot-pricing-hypothesis.md` | Complete — committed |
| Commercial Pilot Agreement (Term Sheet) | `docs/commercial/commercial-pilot-agreement.md` | Complete — this commit |
| Future Commercial Packages | `docs/commercial/future-commercial-packages.md` | Complete — this commit |
| Day 13 Commercial Decision Record | `docs/commercial/day-13-commercial-decision-record.md` | Complete — this commit |

### Earlier supporting documents

| Document | Path | Relevance to Day 13 |
|---|---|---|
| Business Foundation | `docs/business-foundation.md` | Strategic anchor; defines category, wedge, and beachhead geography |
| Customer Segmentation and ICP | `docs/customer-segmentation-and-icp.md` | Defines which customer segments are targeted and why |
| Buyer and User Personas | `docs/buyer-and-user-personas.md` | Defines who within the enterprise buys, approves, and uses the product |
| Discovery Outreach Playbook | `docs/customer-discovery/discovery-outreach-playbook.md` | Defines the outreach and interview process for pre-sales discovery |
| Interview Calendar | `docs/customer-discovery/interview-calendar.md` | Tracks discovery interview scheduling |
| Repository Truth Export | `docs/repository-truth-export.md` | Ground truth on which product capabilities are live vs. demo vs. manual |

---

## 3. Current Recommended Commercial Model

The following summarizes the current working hypothesis for Relatia's first commercial engagement.
All items are labeled with their classification.

| Parameter | Current Position | Classification |
|---|---|:---:|
| Pilot customer count | One (1) enterprise organization | Proposed |
| Geography | Gurugram Core Corridor | Proposed |
| Pilot duration | 30 calendar days | Proposed |
| Event limit | Up to 3 live corporate dining events | Proposed |
| User structure | 2–3 requesters, 1–2 approvers, 1 finance user | Proposed |
| Pilot fee | ₹25,000 one-time fee | Pricing hypothesis — not validated |
| Tax on fee | +18% GST (SAC subject to accountant review) | Requires accountant review |
| Venue and event spend | Excluded — paid directly by enterprise to venue | Decided |
| Venue invoicing flow | Venue invoices enterprise directly | Decided |
| Relatia's fee invoicing flow | Relatia invoices enterprise for software/pilot fee only | Decided |
| Merchant of Record role | Not assumed; Relatia is not the MoR for dining | Decided |
| Payment collection for Relatia fee | Direct bank transfer (NEFT/RTGS) | Proposed |
| Razorpay status | Test mode only; not activated for production in Pilot #1 | Decided |
| Operations model | Founder-supported manual concierge | Decided |
| ERP integrations | Not available; excluded from Pilot #1 | Decided |
| Slack/Teams bots | Not available; excluded from Pilot #1 | Decided |
| Autonomous AI | Not available; database filters only | Decided |
| Savings guarantee | Not made; no guarantee of savings, bookings, or GST recovery | Decided |

---

## 4. Decision Classification

The following table records each open commercial decision, its current position, classification,
owner, the evidence needed to resolve it, and when it should be revisited.

| Decision | Current Position | Classification | Owner | Evidence Needed | Revisit Point |
|---|---|:---:|:---:|---|:---:|
| Pilot fee (₹25,000) | ₹25,000 + GST as proposed baseline | Proposed | Lead Founder | Customer reaction on proposal delivery | Day 14 |
| Pilot duration (30 days) | 30 calendar days | Proposed | Lead Founder | Operational bandwidth review | Kickoff |
| Event limit (up to 3) | 3 completed live events | Proposed | Lead Founder | Operational bandwidth review | Kickoff |
| Pilot customer count (1) | Exactly one enterprise customer | Proposed | Lead Founder | Founder capacity assessment | Kickoff |
| Geography (Gurugram) | Gurugram Core Corridor; Aerocity by exception | Proposed | Lead Founder | Venue supply confirmation | Kickoff |
| Fee tax treatment | 18% GST, SAC 998313 or 998559 | Requires accountant/legal review | Chartered Accountant | Formal tax opinion | Day 14 |
| Payment method | NEFT/RTGS bank transfer | Proposed | Lead Founder | Customer accounts payable acceptance | Kickoff |
| Venue money flow | Zero custody; direct venue billing | Decided | Lead Founder | Documented in pilot agreement | N/A |
| Merchant of Record | Relatia is not the MoR | Decided | Lead Founder | Documented in pilot agreement | N/A |
| Razorpay production activation | Remain in test mode for Pilot #1 | Decided | Engineering Lead | Merchant KYC and banking partner setup | Day 35+ |
| Cancellation liability | Customer bears venue cancellation risk | Proposed | Legal / Lead Founder | Pilot terms agreement sign-off | Kickoff |
| Discount policy | Max 20% discount; floor ₹20,000; ₹0 requires written approval | Proposed | Lead Founder | Prospect negotiation feedback | Day 15 |
| Renewal model | Annual SaaS or per-event — discussed post-pilot | Roadmap | Lead Founder | Post-pilot CFO review data | Day 30 |
| Future package prices | Not proposed; to be determined after Pilot #1 evidence | Deferred | Lead Founder | Support-hours data and WTP signals from pilot | After Pilot #1 |

---

## 5. Financial Model Summary

The following figures are drawn directly from `docs/commercial/pilot-pricing-hypothesis.md`.
No new numbers are invented here. All figures are labeled per the original document.

### Pilot #1 unit economics (modeled, not validated)

| Parameter | Low-Touch Scenario | Expected Scenario | High-Touch Scenario |
|---|---|---|---|
| Completed events | 2 events | 3 events | 3 events |
| Total operating hours (Relatia) | 8.0 hours | 17.0 hours | 29.0 hours |
| Direct third-party tooling costs | ₹1,500 `[Estimated]` | ₹2,000 `[Estimated]` | ₹3,500 `[Estimated]` |
| Pilot revenue (excl. tax) | ₹25,000 `[Hypothesis]` | ₹25,000 `[Hypothesis]` | ₹25,000 `[Hypothesis]` |
| Gross cash contribution | ₹23,500 | ₹23,000 | ₹21,500 |
| Cash contribution margin | 94.0% | 92.0% | 86.0% |
| Fully-loaded net contribution | +₹15,500 | +₹6,000 | -₹7,500 |
| Effective revenue per founder hour | ₹3,125/hr | ₹1,470/hr | ₹862/hr |

### Key economic observations

- At the expected scenario (17 hours, 3 events), the pilot is **cash-positive** with a
  ₹6,000 net contribution and a 92% gross cash margin. `[Modeled]`
- In the high-touch scenario (29 hours), the pilot is **fully-loaded loss-making** at
  -₹7,500. This is the primary operational risk.
- Break-even pilot fee in the expected scenario is approximately ₹19,000 when founder
  time is valued at ₹1,000/hour. The proposed ₹25,000 fee provides a ₹6,000 buffer above
  break-even. `[Modeled]`
- All figures are modeled assumptions. Actual hours will be recorded during Pilot #1
  and compared against the model.

### Sensitivity to support hours

The most significant variable in the unit economics is founder operating hours.
Every additional 5 hours beyond the 17-hour expected model reduces the fully-loaded
net contribution by approximately ₹5,000 (at the ₹1,000/hour labor benchmark).

If actual hours reach 30+, the pilot becomes economically marginal at ₹25,000. This is
the primary reason for the strict 3-event cap and the 48-hour advance-notice requirement.

---

## 6. Risk Register

| Risk | Impact | Mitigation | Owner | Trigger |
|---|---|---|:---:|---|
| **Willingness to pay** — Enterprise prospects refuse to pay ₹25,000 for an unproven pilot | No commercial revenue from Pilot #1; forces free-pilot fallback | Use the discount policy (floor ₹20,000); offer a free pilot only with written concession trade | Lead Founder | Consistent price objection across 3+ prospects |
| **Procurement delay** — A paid pilot triggers formal vendor empanelment or a 90-day procurement process | Pilot cannot begin within the desired timeframe | Qualify the economic buyer's discretionary signing authority before presenting the commercial offer | Lead Founder | Any prospect requiring IT/legal/procurement review for a ₹25,000 fee |
| **Manual support burden** — Actual coordination hours exceed 17 per pilot | Fully-loaded loss at ₹25,000; founder burnout risk | Enforce 3-event cap; enforce 48-hour advance notice; log all hours from Day 1 | Lead Founder + Ops | Hours exceed 17 before all 3 events complete |
| **Venue availability** — Pre-vetted venues are unavailable on the requested date | Event must be rescheduled or moved; customer frustration | Build venue directory with 5–8 options; set 48-hour advance notice as standard | Lead Founder | Any event with no available venue within 4 hours of inquiry |
| **Venue cancellation** — A confirmed venue cancels a booking | Customer event disrupted; relationship risk | Confirm alternative venues before first event; document cancellation terms in the pilot agreement | Lead Founder | Any confirmed room cancellation by a venue |
| **Payment and tax ambiguity** — Correct SAC code or IGST/CGST treatment unclear at invoicing | Invoice rejected by customer AP; delayed payment | Obtain chartered accountant opinion on SAC code before issuing any invoice | Chartered Accountant | Before any invoice is issued |
| **Alcohol billing confusion** — Customer expects Relatia to handle bar charges or excise compliance | Billing dispute; legal exposure | Require venues to issue separate itemized invoices splitting food GST from bar charges; state clearly in pilot agreement | Lead Founder | Any event including alcohol |
| **Customer expecting unlimited service** — Customer interprets pilot as all-inclusive concierge | Support burnout; scope disputes | Communicate exclusions at kickoff; have customer sign off on the scope boundary document | Lead Founder | Any out-of-scope service request in the first week |
| **Customer expecting integrations** — Customer requires ERP, Slack, or SSO before committing | Pilot blocked on missing features | Qualify integration requirements before the commercial proposal; present the exclusions list proactively | Lead Founder | Any integration requirement raised during the proposal stage |
| **Pilot viewed as consulting** — Customer treats Relatia as a project consultant rather than a software platform | Incorrect commercial framing; pricing pressure | Insist that all event requests and approvals go through the web application; reinforce software-first positioning | Lead Founder | Any request for bespoke configuration or advisory work outside product scope |
| **Data and privacy risk** — Customer enters confidential client GSTINs or personal data into the platform | Privacy exposure; legal risk | Communicate data boundaries at kickoff; ensure the pilot agreement includes data-handling obligations | Lead Founder + Legal | Any sensitive data entered into the platform |
| **Unclear conversion trigger** — Neither party knows when to discuss renewal | Pilot ends without a commercial outcome | Set a formal final review date at kickoff; present post-pilot options at the midpoint review | Lead Founder | If the midpoint review does not include a commercial discussion |

---

## 7. Readiness Checklist

| Item | Status | Notes |
|---|---|---|
| Pilot design document complete | Complete | `docs/commercial/pilot-design.md` committed |
| Pilot pricing hypothesis document complete | Complete | `docs/commercial/pilot-pricing-hypothesis.md` committed |
| Commercial pilot agreement term sheet complete | Complete | This commit |
| Future commercial packages document complete | Complete | This commit |
| Day 13 decision record complete | Complete | This commit |
| Pilot customer identified | Not yet | Customer identification is the next step after Day 14 |
| Pilot owner identified | Not yet | Requires customer identification |
| Pilot fee internally approved | Proposed — not yet formally approved | Lead founder to confirm ₹25,000 as the starting position |
| Tax and accounting review | Not yet obtained | Chartered accountant review required before any invoice is issued |
| Payment method approved | Proposed — not yet confirmed | NEFT/RTGS confirmed as the method; bank details and invoice format required |
| Venue money flow approved | Decided | Zero custody; direct venue billing |
| Support capacity approved | Modeled — not yet stress-tested | Dependent on actual hours from Pilot #1 |
| Data handling confirmed | Partially — repo privacy rules exist | Formal data handling agreement with the pilot customer is required |
| Pilot success metrics agreed | Proposed | To be agreed with the pilot customer at kickoff |
| Customer-facing proposal ready | Partially — term sheet exists | Needs legal/accountant review and formatting for external sharing |
| Legal review completed | Not yet | Required if the pilot customer's procurement policy demands it |

---

## 8. Next-Day Handoff

### Recommended next commercial work: Day 14 — Enterprise Sales and Positioning

Day 14 should create the enterprise sales and positioning layer that enables Relatia to
identify, qualify, approach, and present a commercial pilot proposal to the right
prospective customer.

Day 14 should produce:

1. **Enterprise positioning statement** — a concise, plain-English statement of what
   Relatia is, who it is for, and what problem it solves. Must not use superlatives,
   unsupported savings claims, or autonomous AI language.

2. **Value proposition** — a short, specific description of the value delivered by the
   pilot, grounded in the known product capabilities (workflow speed, structured invoice
   data, pre-spend governance) rather than assumed outcomes (guaranteed savings, guaranteed
   GST recovery).

3. **Target-account qualification criteria** — a short list of observable signals that
   indicate a prospect is likely to be a good fit for Pilot #1 (geography, industry,
   event cadence, GSTIN registration, decision-maker accessibility).

4. **Sales narrative** — a structured conversation guide for the first outreach call or
   meeting, including an explanation of what the pilot includes, what it costs, and what
   the customer is asked to commit to.

5. **Non-promotional messaging** — language that is honest about the product's current
   state (manual operations, no ERP integration, test-mode payments, bounded geography)
   and positions these boundaries as deliberate rather than deficiencies.

6. **Procurement and trust answers** — responses to the questions that enterprise
   procurement, IT, and legal teams are likely to ask (vendor security posture, data
   handling, GSTIN and invoicing, liability, cancellation).

7. **Pilot proposal structure** — a short one-page or two-page external document
   describing the pilot offer that can be shared with a prospective pilot customer for
   internal review.

> **Important:** Day 14 must not begin live outreach to named companies unless explicitly
> instructed. Day 14 produces the tools and materials that would be used for outreach,
> not the outreach itself.

---

## 9. Day 13 Completion Statement

| Item | Status |
|---|:---:|
| Step 1 — Commercial Pilot Design | Complete |
| Step 2 — Commercial Pilot-Pricing Hypothesis | Complete |
| Step 3 — Commercial Pilot Agreement (Term Sheet) | Complete |
| Step 4 — Future Commercial Packages | Complete |
| Step 5 — Day 13 Commercial Decision Record and Handoff | Complete |
| Application code modified | No |
| Database schema modified | No |
| Environment files modified | No |
| Secrets added or modified | No |
| Personal data included | No |
| Real GSTINs included | No |
| Validated customer evidence cited | No |
| Unsupported savings guarantees made | No |
| Autonomous AI claimed | No |
| Production payment described as active | No |
| Merchant of Record role assumed | No |
| All pricing clearly labeled as hypothesis where unvalidated | Yes |

> All commercial numbers, pricing hypotheses, package designs, and future capability
> timelines in all Day 13 documents represent working hypotheses to be tested through
> real commercial engagement. No customer has validated any pricing, package, or
> willingness-to-pay assumption described in these documents.
