# Relatia — Future Commercial Packages

> **Document Classification:** Internal Commercial Strategy — Future Packaging Direction
> **Status:** Active Working Draft — Day 13 Step 4
> **Repository Context:** Grounded in codebase truth (commit `e3dc24c` on branch `develop`), [`docs/commercial/pilot-design.md`](../commercial/pilot-design.md), [`docs/commercial/pilot-pricing-hypothesis.md`](../commercial/pilot-pricing-hypothesis.md), [`docs/commercial/commercial-pilot-agreement.md`](../commercial/commercial-pilot-agreement.md), [`docs/business-foundation.md`](../business-foundation.md), [`docs/customer-segmentation-and-icp.md`](../customer-segmentation-and-icp.md), and [`docs/buyer-and-user-personas.md`](../buyer-and-user-personas.md).
> **Customer Discovery Note:** Customer interviews are intentionally deferred. All package descriptions, billing structures, price ranges, and capability timelines represent **working hypotheses to be tested**, not final commercial decisions or validated offerings.
> **Classification Key:** All capabilities and parameters are labeled as: `proposed`, `live`, `manual`, `planned`, `excluded`, or `to be validated`.

---

## Table of Contents

1. [Purpose of This Document](#1-purpose-of-this-document)
2. [Package 1 — Pilot](#2-package-1--pilot)
3. [Package 2 — Core Platform](#3-package-2--core-platform)
4. [Package 3 — Enterprise](#4-package-3--enterprise)
5. [Package 4 — Managed Concierge](#5-package-4--managed-concierge)
6. [Package 5 — Hospitality Provider](#6-package-5--hospitality-provider)
7. [Billing Basis Comparison](#7-billing-basis-comparison)
8. [Package-Boundary Matrix](#8-package-boundary-matrix)
9. [Packaging Principles](#9-packaging-principles)
10. [Future Pricing-Learning Plan](#10-future-pricing-learning-plan)
11. [Recommended Next Package](#11-recommended-next-package)

---

## 1. Purpose of This Document

This document describes possible future commercial packages for Relatia, based on the current
product state, the approved pilot design, and reasonable extrapolation of what a growing
corporate entertainment operating system might offer.

### What this document is

- A planning tool for understanding possible future packaging directions.
- A framework for identifying which capabilities must be built before each package can be launched.
- A guide for recognizing the billing model options available to each package.

### What this document is not

- A final price list. No prices described here are final or validated.
- A product roadmap. Package descriptions do not commit to any feature delivery timeline.
- A validated commercial offering. No customer has confirmed willingness to pay for any post-pilot package.
- A competitive claim. No package capability is described as superior to any other product.

---

## 2. Package 1 — Pilot

### Purpose

The Pilot package is Relatia's first controlled commercial validation. It tests the
core workflow with one enterprise customer in one geography with bounded scope, bounded
events, and high-touch founder support.

### Target customer

One Gurugram-based enterprise in B2B SaaS/technology, management consulting, or financial
advisory with a recurring need for executive corporate dining and client entertainment.

### Problem addressed

Enterprise organizers spend significant time coordinating corporate dining events through
unstructured channels (phone, WhatsApp, email) with no pre-spend approval and no structured
invoice data for finance. The Pilot tests whether a structured software workflow and curated
venue directory reduce that friction.

### Included capabilities

| Capability | Status |
|---|:---:|
| Responsive web application | live |
| Multi-tenant auth (Clerk roles) | live |
| Tenant and company setup | live |
| User provisioning (up to 6 seats) | live |
| Event request creation | live |
| Policy-based spend validation | live |
| In-app approval routing | live |
| Curated venue directory (Gurugram) | live |
| Venue selection and linking | live |
| Finance dashboard | live |
| GST calculation engine | live |
| Invoice view and browser-print flow | live |
| Manual venue confirmation | manual |
| Manual dietary/menu coordination | manual |
| Dedicated WhatsApp support channel | manual |
| Founder-led onboarding (up to 5 days) | manual |
| Post-pilot review session | manual |

### Excluded capabilities

| Excluded Item | Status |
|---|:---:|
| Production payment settlement | excluded |
| Merchant of Record services | excluded |
| ERP integrations | excluded |
| Slack/Teams approval bots | excluded |
| Native PDF generation | excluded |
| Autonomous AI negotiation | excluded |
| Guaranteed venue availability | excluded |
| Multi-city support | excluded |
| Unlimited support | excluded |

### Possible billing basis

- One-time pilot fee: ₹25,000 (hypothesis, not validated)
- Duration: 30 calendar days
- Event cap: Up to 3 completed events

### Operational burden

- High relative to revenue. Founder-led concierge operations require meaningful time per event.
- Modeled at approximately 17 hours total in the expected scenario (see `pilot-pricing-hypothesis.md`).

### Risks

- Manual support burden may exceed modeled hours.
- Customer may treat Relatia as a traditional event agency rather than a software platform.
- Low event volume reduces commercial learning.

### Evidence required before launch

- Pilot agreement accepted by one customer.
- Accountant confirmation of GST SAC code for the pilot fee.
- Legal review of short-form pilot agreement if required by the customer.

### Maturity required

- Current codebase is ready. Pilot is the immediate next commercial step.

---

## 3. Package 2 — Core Platform

### Purpose

The Core Platform package enables recurring use by one business team within a single
enterprise organization. It converts the pilot's time-bounded test into an ongoing
software subscription for a defined team.

### Target customer

A Gurugram-based enterprise team (department-level) that has already validated workflow
value through the Pilot package and wishes to continue on a recurring basis.

### Problem addressed

After the pilot, the team has experienced a structured pre-spend approval and invoice
workflow and wants to maintain that discipline for ongoing executive dining and
client entertainment without reverting to manual methods.

### Included capabilities

| Capability | Status |
|---|:---:|
| All Pilot capabilities | live |
| Recurring event requests (no event cap) | proposed |
| Role-based approvals | live |
| Venue discovery | live |
| Finance visibility | live |
| Invoice view and browser-print | live |
| Basic spend reporting | live |
| Defined support channel | manual |
| Standard onboarding | manual |

### Manual operations

- Venue confirmation for each event remains manual until a direct venue API or calendar
  integration is built.
- Menu and dietary coordination remains manual.

### Excluded capabilities

| Excluded Item | Status |
|---|:---:|
| Multi-department support | planned |
| ERP integrations | excluded |
| Slack/Teams bots | planned |
| Native PDF generation | planned |
| Production payment settlement | excluded |
| Autonomous AI | excluded |
| Unlimited support | excluded |
| Custom workflows | excluded |

### Possible billing basis

Options to evaluate (all hypothetical, none validated):

- Monthly platform fee: estimated range ₹25,000 to ₹40,000/month `[to be validated]`
- Annual subscription: estimated range ₹3.0L to ₹4.8L/year billed upfront `[to be validated]`
- Per-event fee: estimated range ₹6,000 to ₹10,000 per completed event `[to be validated]`

### Likely buyer

VP of Sales, Practice Head, or Managing Director who approved the pilot.

### Likely users

Executive Assistants, Field Marketing, Finance Controller.

### Operational burden

Moderate. Manual venue confirmation per event is required. Support volume depends on
event frequency and onboarding quality.

### Risks

- Customer expects ERP integration or Slack bots before committing to a subscription.
- Monthly SaaS pricing may trigger formal procurement if above discretionary thresholds.
- High-frequency event customers may generate more support hours than the subscription covers.

### Evidence required

- At least one pilot customer completing 3 events and expressing willingness to pay for
  ongoing access.
- Validated support-hours-per-event data from Pilot #1 to price the subscription correctly.

### Maturity required

- Core product is ready for single-team use.
- Remove event cap from the platform or raise it to a higher limit.
- Confirm recurring billing mechanics (NEFT invoice cycle or Razorpay production activation).

---

## 4. Package 3 — Enterprise

### Purpose

The Enterprise package serves larger organizations with multiple teams or departments
that each host executive corporate dining events and require a unified governance layer
across the organization.

### Target customer

A mid-to-large enterprise (500+ employees in India) in BFSI, management consulting,
B2B technology, or legal services with multiple departments that each independently
host client entertainment and leadership events.

### Problem addressed

Multiple departments within the same organization use different methods for booking
corporate dining, resulting in inconsistent invoice quality, fragmented spend visibility,
and no organization-wide reporting for the CFO or procurement team.

### Possible characteristics

- Multiple departments using the platform simultaneously.
- More users (10 to 50+) across multiple teams.
- Configurable approval policies per department.
- Organization-level finance reporting and consolidated spend view.
- Possible procurement support (vendor empanelment documentation, security questionnaire).
- Possible implementation support (dedicated onboarding engagement).
- Possible annual agreement with defined service terms.

### Included capabilities (possible)

| Capability | Status |
|---|:---:|
| All Core Platform capabilities | proposed |
| Multi-department tenant configuration | planned |
| Organization-level reporting | planned |
| Per-department approval policies | planned |
| Consolidated finance dashboard | planned |
| Dedicated account management | manual |
| Implementation support | manual |
| Security review documentation | to be validated |

### Excluded capabilities

| Excluded Item | Status |
|---|:---:|
| Enterprise security certifications (SOC 2, ISO 27001) | excluded — not certified |
| SSO/SAML integration | excluded — not built |
| ERP API integrations | excluded — not built |
| Guaranteed SLA uptime | excluded — no SLA committed |
| Autonomous AI | excluded |
| Production payment escrow | excluded |

> **Important:** Enterprise security certifications, SSO integration, and ERP connectors
> are not available and must not be represented as included until they exist in the
> production codebase.

### Possible billing basis

- Annual contract: estimated range ₹5.0L to ₹15.0L+ per year `[to be validated — no evidence]`
- Implementation fee: separate from annual subscription `[decision required]`
- Per-department module: possible tiered pricing `[to be validated]`

### Likely buyer

CFO, VP Operations, or Chief Procurement Officer.

### Likely users

All department-level EAs, field marketing, finance, and compliance teams.

### Operational burden

High. Dedicated account management, enterprise onboarding, security review processes,
and organization-level configuration are required before this package is viable.

### Risks

- Enterprise procurement timelines are long. Formal vendor empanelment, security reviews,
  and legal/DPA review may add weeks or months to the sales cycle.
- Customers may require integrations (SSO, ERP) as a condition of enterprise adoption.
- Organization-level reporting requires additional product development.

### Evidence required

- At least one Core Platform customer requesting multi-department access.
- Validated support-hours data from Core Platform cohort.
- Legal and compliance review of enterprise service terms and data processing.

### Maturity required

- Multi-department configuration and consolidated reporting must be built and tested.
- Security review documentation must be prepared.
- Enterprise service terms (DPA, liability limits, SLA) must be drafted by legal advisers.

---

## 5. Package 4 — Managed Concierge

### Purpose

The Managed Concierge package serves customers who need more operational assistance
than the software platform alone provides. It combines the software workflow with a
higher-touch event coordination service layer.

### Target customer

An enterprise with recurring high-stakes executive dining needs but limited internal
bandwidth to coordinate events themselves. The customer values the outcome (executed
event, structured invoice) more than operating the software independently.

### Problem addressed

Some enterprise accounts — particularly C-suite-adjacent EA functions or lean sales
teams — need end-to-end event coordination, not just a workflow tool. They want Relatia
to handle venue shortlisting, dietary confirmation, pre-event checks, and event-night
point of contact, in addition to the software workflow.

### Possible characteristics

- Higher-touch onboarding and ongoing operational relationship.
- Relatia-led venue shortlisting based on the customer's brief.
- Manual dietary and set-menu coordination handled by Relatia.
- Pre-event confirmation call with venue banquet manager.
- Defined escalation contact for event-night issues.
- Dedicated account process (not just a shared WhatsApp channel).

### Included capabilities (possible)

| Capability | Status |
|---|:---:|
| All Core Platform capabilities | proposed |
| Relatia-led venue shortlisting per event | manual |
| Dietary and set-menu coordination | manual |
| Pre-event confirmation process | manual |
| Higher-touch support channel | manual |
| Event-night contact process | manual |

### Excluded capabilities

| Excluded Item | Status |
|---|:---:|
| On-site event staffing | excluded |
| Audiovisual production | excluded |
| Invitation design | excluded |
| Menu printing | excluded |
| Floral or decor coordination | excluded |
| Legal or tax advice | excluded |

### Possible billing basis

- Monthly managed service fee: estimated range ₹50,000 to ₹1,00,000+/month `[to be validated — no evidence]`
- Per-event coordination fee in addition to platform fee: estimated range ₹5,000 to ₹15,000/event `[to be validated]`

### Risk: Services-business risk

> **Important:** The Managed Concierge model risks anchoring Relatia as a services business
> rather than a software platform. Unit economics must be modeled carefully. If coordination
> hours per event exceed the modeled 4–7 hours, the package may be margin-negative without
> a substantially higher fee. Separate unit economics modeling is required before this package
> is priced or launched.

### Evidence required

- Data on actual coordination hours per event from Pilot #1.
- Customer evidence that they are willing to pay for the concierge layer specifically.
- Financial model confirming that Managed Concierge is profitable at the proposed fee.

### Maturity required

- Pilot #1 operational hours data is the prerequisite.
- Clear written scope of what "concierge" includes and excludes.
- Hiring or contractor plan for concierge capacity beyond founder time.

---

## 6. Package 5 — Hospitality Provider

### Purpose

The Hospitality Provider package creates a possible future revenue stream from the supply
side of the marketplace — venue operators who wish to be discoverable by Relatia's
enterprise customer base.

### Target participant

Gurugram-based fine-dining restaurants, hotel banquet operations, and private dining
venues that host corporate executive dining and seek a structured, pre-qualified corporate
inquiry channel.

### Problem addressed (from venue perspective)

Venue banquet managers receive unstructured corporate inquiries over the phone with
incomplete briefs, unclear budget parameters, and uncertain GSTIN availability. A
structured inquiry channel with pre-qualified enterprise customers could improve conversion
quality and reduce administrative overhead.

### Possible characteristics

- Venue profile in the Relatia directory (name, capacity, menu types, minimum spend ranges,
  GST registration status).
- Private dining room information (room capacity, setup options, AV availability).
- Menu and package information.
- Inquiry handling through the platform.
- Availability confirmation process.
- Possible commercial participation model (listing fee, per-inquiry fee, or revenue share).

### Excluded until reviewed

| Item | Reason |
|---|---|
| Provider monetization | Not decided. Commercial model requires legal and operating review before activation. |
| Venue payment settlement | Not built. Relatia does not currently hold or process venue funds. |
| Real-time availability calendar | Not built. Venue availability is currently confirmed manually. |
| Venue ratings or reviews | Not built and not planned for Pilot #1. |

> **Important:** Provider monetization has not been decided. The Hospitality Provider package
> is a directional hypothesis only. No provider has been charged a listing fee or transaction
> fee. Any provider commercial model requires separate legal, tax, and operating review before
> activation.

### Evidence required

- Venue appetite for a structured corporate inquiry channel (requires outreach or discovery).
- Legal review of any revenue-share or listing-fee arrangement.
- Regulatory review of whether any provider arrangement creates a marketplace or aggregator
  obligation.

### Maturity required

- Venue-facing product features (provider login, availability calendar, inquiry management)
  must be designed and built.
- Provider commercial terms must be drafted and reviewed by legal advisers.
- At least one enterprise customer cohort must be operational before venues have an audience.

---

## 7. Billing Basis Comparison

The following billing models are evaluated for suitability across Relatia's possible packages.
None are final. All are hypotheses until tested.

| Billing Model | Description | Advantages | Disadvantages | Best Fit |
|---|---|---|---|---|
| **Monthly platform fee** | Fixed recurring monthly software fee | Predictable revenue; standard SaaS model | May trigger procurement above discretionary threshold | Core Platform, Enterprise |
| **Annual contract** | Upfront annual subscription | Committed ARR; lower support overhead; enables enterprise trust | Longer sales cycle; requires demonstrable value | Enterprise |
| **Per-event fee** | Fixed fee per completed event | Low initial barrier; natural alignment with usage | Unpredictable revenue; customer hesitates before each booking | Core Platform (infrequent users) |
| **Usage tier** | Flat fee covers events up to a cap; higher tiers for more volume | Rewards committed usage; simple to communicate | Complex to administer; edge cases at tier boundaries | Core Platform, Enterprise |
| **Managed-service fee** | Monthly fee covering software plus defined coordination services | Covers concierge labor; captures value of operational work | Anchors Relatia as services business; margin risk if hours exceed model | Managed Concierge |
| **Provider listing fee** | One-time or recurring fee for venue profile inclusion | New revenue stream; scalable | Requires minimum enterprise volume to be attractive to venues | Hospitality Provider |
| **Transaction fee** | Percentage of event spend or per-booking fee | Scales with customer volume | Incentivizes overspending; complex reconciliation; finance resistance | Rejected for Pilot; possible future consideration |
| **Hybrid model** | Platform fee + per-event fee above a threshold | Covers fixed costs and scales with volume | More complex to communicate and invoice | Enterprise (larger cohort) |

---

## 8. Package-Boundary Matrix

The following matrix shows which capabilities are available, planned, or excluded across
each proposed package. Statuses reflect the current codebase state and commercial decisions.

| Capability | Pilot | Core Platform | Enterprise | Managed Concierge | Hospitality Provider |
|---|:---:|:---:|:---:|:---:|:---:|
| **Users** | Up to 6 | Proposed up to 10 | Proposed 10–50+ | Proposed up to 10 | Provider team (TBD) |
| **Departments** | 1 | 1 | Planned multi-dept | 1 | N/A |
| **Events** | Up to 3 | Proposed unlimited | Proposed unlimited | Proposed unlimited | N/A |
| **Cities** | Gurugram (+ Aerocity exception) | Gurugram (proposed) | To be validated | Gurugram (proposed) | Gurugram (proposed) |
| **Venue support** | 5–8 curated | Proposed 8–15 | Proposed 15+ | Proposed Relatia-led shortlisting | Venue self-listing (planned) |
| **Approvals** | live | live | planned multi-dept | live | N/A |
| **Finance reporting** | live | live | planned consolidated | live | N/A |
| **Invoice support** | live (browser print) | live (browser print) | planned (native PDF) | live (browser print) | N/A |
| **ERP integrations** | excluded | excluded | excluded | excluded | excluded |
| **Slack/Teams bots** | excluded | planned | planned | planned | N/A |
| **AI** | demo only | demo only | demo only | demo only | demo only |
| **Support level** | Founder WhatsApp (manual) | Defined channel (manual) | Dedicated account (manual) | Higher-touch (manual) | TBD |
| **Onboarding** | Founder-led (up to 5 days) | Standard (2–3 days) | Implementation engagement | Higher-touch | TBD |
| **Provider participation** | Not applicable | Not applicable | Not applicable | Not applicable | Planned — not launched |
| **Production payments** | excluded (test mode only) | excluded | excluded | excluded | excluded |

---

## 9. Packaging Principles

The following principles govern how Relatia designs and communicates its commercial packages.

1. **Do not package unavailable capabilities as live.** If a feature is not in the
   production codebase, it must not be described as included in any current package.

2. **Do not promise production integrations.** ERP, SSO, Slack, and Teams integrations
   are not available. They must not be listed as included in any package until they are
   built and tested.

3. **Do not promise autonomous AI.** The current AI status in the codebase is `demo only`
   (database filter queries, no LLM). AI must not be described as a production capability.

4. **Do not hide manual work.** Every package that relies on manual venue confirmation,
   manual dietary coordination, or manual concierge operations must describe those as
   manual operations, not automated software features.

5. **Do not bundle venue money custody into software pricing.** Venue food, beverage,
   and event charges are paid directly by the enterprise to the venue. Relatia does not
   hold or intermediate these funds in any current package.

6. **Separate software from managed services.** The Core Platform and Enterprise packages
   are software products. The Managed Concierge package is a services product with
   different economics. Mixing them without clear separation creates billing confusion
   and margin risk.

7. **Keep early packages narrow.** Early packages should be deliberately limited in scope
   to ensure operational reliability and prevent support burnout. Scope should expand
   only as evidence accumulates.

8. **Price according to support burden.** A package that requires significantly more
   founder or coordinator time per customer must carry a higher fee to remain economically
   viable. Support-hours-per-event data from the pilot is the critical input.

9. **Avoid unlimited commitments.** No current package should promise unlimited events,
   unlimited support, or unlimited venue sourcing. Event caps and support boundaries
   must be defined in writing.

10. **Review package economics after pilot evidence.** No post-pilot package price should
    be finalized before Pilot #1 yields real data on support hours, customer effort, and
    willingness to pay.

---

## 10. Future Pricing-Learning Plan

The following questions must be answered through real commercial experience before
post-pilot packages can be priced with confidence.

### From Pilot #1

| Question | How to Learn It |
|---|---|
| Will an enterprise pay ₹25,000 for a 30-day pilot without hesitation, or will there be consistent objections? | Track the proposal-to-signature journey for each pilot prospect |
| At what fee level does procurement friction increase materially? | Note whether any prospect required formal vendor empanelment at the proposed fee level |
| How many founder hours does one pilot actually require? | Time-log every coordination activity across the pilot window |
| What does the customer value most — venue curation, approval workflow, or invoice data? | Ask directly at the midpoint and final reviews |
| Does the customer revert to manual methods between events? | Track whether requesters use the platform consistently for all three events |

### From repeat usage

| Question | How to Learn It |
|---|---|
| Is the platform sticky beyond the pilot? | Track whether customers renew or request a subscription |
| What is the minimum event cadence for a subscription to feel worthwhile to the customer? | Observe which customers renew and which do not |
| Does the finance user find the invoice data valuable enough to advocate for renewal? | Include finance user in the final review conversation |

### From support hours

| Question | How to Learn It |
|---|---|
| What is the actual support-hours-per-event figure across multiple pilots? | Time-log every pilot; compare against the modeled 4 hours per event |
| Does support volume decrease as customers become more familiar with the platform? | Compare support requests in weeks 1–2 vs. weeks 3–4 of each pilot |
| At what subscription price level is the support burden covered with positive margin? | Model after real hours data is available |

### From venue coordination

| Question | How to Learn It |
|---|---|
| How long does manual venue confirmation actually take per event? | Log venue inquiry-to-confirmation time for each event |
| Are any venues reliably faster to confirm than others? | Track per-venue turnaround across events |
| What percentage of events require a venue alternative (first choice unavailable)? | Log availability outcome for each inquiry |

### From finance workflows

| Question | How to Learn It |
|---|---|
| Does the finance user successfully use the invoice view without assistance? | Observe or ask during the pilot |
| Does the invoice data actually reduce month-end reconciliation effort? | Ask the finance user at the final review |
| Is browser-print-to-PDF sufficient, or is a native PDF download required for renewal? | Note any specific requests for PDF download |

### From renewal discussions

| Question | How to Learn It |
|---|---|
| What post-pilot pricing is acceptable? | Present three options (monthly fee, annual fee, per-event fee) at the final review |
| Does the customer prefer a fixed monthly fee or a usage-based model? | Note the customer's response to each option |
| What objections arise when a monthly SaaS subscription is proposed? | Track every objection and classify it (price, procurement, value, feature gap) |

---

## 11. Recommended Next Package

After Pilot #1, the recommended next commercial package to develop is the **Core Platform
(Package 2)**.

### Rationale

- The Core Platform is a natural continuation of the pilot workflow for customers who
  complete the 30-day window and wish to continue.
- It requires minimal new product development — the primary changes are removing or
  raising the event cap and establishing a recurring billing mechanism.
- It tests whether the pilot customer's willingness to continue translates into a
  willingness to pay a monthly or annual fee.
- It provides the support-hours-per-event data needed to price the Enterprise and
  Managed Concierge packages correctly.

### What must be true before the Core Platform launches

1. At least one pilot customer has completed 3 events and expressed interest in continuing.
2. Support-hours-per-event data from Pilot #1 has been recorded.
3. A recurring billing mechanism has been confirmed (Razorpay production activation or
   NEFT invoice cycle) with accountant and legal review.
4. A final price for the Core Platform monthly or annual subscription has been approved
   by the lead founder.

> No price for the Core Platform is proposed in this document. The price must be decided
> after Pilot #1 evidence is available.
