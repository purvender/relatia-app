# Relatia — Buyer and User Personas

> **Document Classification:** Internal Single Source of Truth for Enterprise & Hospitality Buyer and User Personas  
> **Status:** Working Draft — Day 10 Step 3  
> **Repository Context:** Verified against codebase at commit `6caf037` on branch `develop`  
> **Relationship to Business Foundation:** Direct elaboration of the business model, wedge strategy, and boundary conditions defined in [`docs/business-foundation.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/business-foundation.md).  
> **Relationship to Customer Segmentation & ICP:** Deep stakeholder drilldown grounded in the market segments, scoring, and Gurugram beachhead wedge established in [`docs/customer-segmentation-and-icp.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-segmentation-and-icp.md).  
> **Validation Note:** All persona characteristics, pain points, budget authorities, event frequencies, conversion behaviors, and communication responses detailed herein represent **working hypotheses requiring rigorous customer discovery and pilot validation**. They are operational frameworks to guide discovery interviews, not verified empirical facts.  
> **Category Context:** India-first corporate entertainment operating system. Initial product wedge: corporate dining, executive hospitality, client dinners, team events, and private dining room (PDR) governance. *(Ande is an external category and business-model reference only; no claims, text, metrics, customer names, or testimonials are copied).*

---

## Table of Contents

1. [Executive Summary & Persona Framework](#1-executive-summary--persona-framework)
2. [Buying-Process Role Classification](#2-buying-process-role-classification)
3. [Enterprise Personas](#3-enterprise-personas)
   - [Persona 1: Executive Assistant to Founder / MD / VP](#persona-1-executive-assistant-to-founder--md--vp)
   - [Persona 2: Field Marketing or Demand Generation Lead](#persona-2-field-marketing-or-demand-generation-lead)
   - [Persona 3: Sales Operations or Revenue Operations Lead](#persona-3-sales-operations-or-revenue-operations-lead)
   - [Persona 4: Event or Office Operations Manager](#persona-4-event-or-office-operations-manager)
   - [Persona 5: VP Sales, Practice Head, or Business Unit Leader](#persona-5-vp-sales-practice-head-or-business-unit-leader)
   - [Persona 6: Finance Controller](#persona-6-finance-controller)
   - [Persona 7: Head of Tax or Accounts Payable Lead](#persona-7-head-of-tax-or-accounts-payable-lead)
   - [Persona 8: Procurement or Vendor Management Lead](#persona-8-procurement-or-vendor-management-lead)
   - [Persona 9: CFO, COO, Country Head, or GCC Leader](#persona-9-cfo-coo-country-head-or-gcc-leader)
   - [Persona 10: Legal, Compliance, or Risk Stakeholder](#persona-10-legal-compliance-or-risk-stakeholder)
4. [Hospitality Provider-Side Personas](#4-hospitality-provider-side-personas)
   - [Persona 11: Hotel Director of Sales or Banquet Manager](#persona-11-hotel-director-of-sales-or-banquet-manager)
   - [Persona 12: Restaurant General Manager or Corporate Events Manager](#persona-12-restaurant-general-manager-or-corporate-events-manager)
   - [Persona 13: Finance or Accounts Lead at Hospitality Provider](#persona-13-finance-or-accounts-lead-at-hospitality-provider)
5. [Enterprise Buying Committee Map & Paths](#5-enterprise-buying-committee-map--paths)
6. [Persona Prioritization & Starting Interview Group](#6-persona-prioritization--starting-interview-group)
7. [Provider-Side Buying Map & Adoption Sequence](#7-provider-side-buying-map--adoption-sequence)
8. [Pilot Persona Requirements (3-Event vs. 60-Day Expanded)](#8-pilot-persona-requirements-3-event-vs-60-day-expanded)
9. [Truthful Messaging Matrix](#9-truthful-messaging-matrix)
10. [Objection Handling Framework](#10-objection-handling-framework)
11. [Discovery Interview Guide](#11-discovery-interview-guide)
12. [Persona Validation Register](#12-persona-validation-register)
13. [Anti-Personas (Who We Do Not Prioritize)](#13-anti-personas-who-we-do-not-prioritize)
14. [Decisions Still Requiring Founder Validation](#14-decisions-still-requiring-founder-validation)

---

## 1. Executive Summary & Persona Framework

Relatia operates in a high-stakes, multi-stakeholder corporate environment. Unlike simple single-seat B2B SaaS tools or consumer table-reservation apps, corporate entertainment touches executive reputation, sales pipeline velocity, budget authorization, statutory tax compliance, and vendor management.

To navigate this complexity effectively, Relatia distinguishes between:
- **Who experiences the daily operational friction:** Executive Assistants, Field Marketers, and Accounts Payable accountants who lose hours to unstructured phone calls, rogue card charges, and missing B2B invoices.
- **Who uses the software:** Organizers creating event requests, managers reviewing spend policies, and finance teams reviewing tax invoices.
- **Who controls the budget:** VP of Sales, Managing Directors, Practice Leaders, and CFOs who care about relationship ROI, cost predictability, and audit safety.
- **Who can stall or block adoption:** Procurement teams enforcing vendor empanelment hurdles, Legal evaluating liability, or conservative Finance Controllers wary of introducing new billing intermediaries.

Every persona profile in this document maps these tensions into actionable discovery scripts, truthful value messages, and clear pilot gates.

---

## 2. Buying-Process Role Classification

In enterprise software evaluation, stakeholders rarely occupy a single static bucket. A single individual may act as an internal champion while also holding approval power, or an economic buyer may delegate gatekeeping authority to finance.

Relatia categorizes stakeholder functions across the following standard enterprise roles:

| Classification | Definition in Relatia Context | Typical Stakeholder Roles |
|---|---|---|
| **Economic Buyer** | Owns the commercial budget; has authority to authorize corporate entertainment expenditure and approve pilot software or transaction fees. | VP Sales, Business Unit Head, Senior Practice Partner, CFO |
| **Budget Owner** | The specific cost-center manager against whose departmental budget the event spend is charged. | VP Sales, Head of Marketing, Practice Leader, Country MD |
| **Internal Champion** | The stakeholder who experiences intense friction and actively advocates for Relatia internally to solve their problem. | Executive Assistant, Field Marketing Lead, Sales Operations Lead |
| **Primary User** | Operates the software directly on a weekly or event-by-event basis to submit, coordinate, or review events. | Executive Assistant, Office Manager, Field Marketer, AP Accountant |
| **Approver** | Reviews and signs off on individual event requests, budget caps, and venue selections within company policy. | Department Manager, VP, Finance Controller |
| **Finance Gatekeeper** | Validates tax compliance, GSTIN details, payment mechanisms, accounting workflows, and audit safety. | Finance Controller, Head of Tax, AP Lead |
| **Procurement Gatekeeper** | Reviews vendor onboarding, master service agreements (MSAs), commercial terms, and competitive parity. | Procurement Lead, Vendor Manager, Sourcing Specialist |
| **Legal/Compliance Gatekeeper** | Assesses contract terms, data privacy, liability, anti-bribery (FCPA/commercial compliance), and employee conduct policies. | Legal Counsel, Head of Risk & Compliance |
| **Executive Sponsor** | High-level executive who provides strategic backing and mandates trial across business units. | COO, CFO, Country Managing Director |
| **Influencer** | Shapes opinion through feedback or technical/operational review without final veto power. | Sales Operations, Corporate Communications, Senior Partners |
| **Blocker** | Any stakeholder whose incentives are threatened by the platform (e.g., concerns over losing personal perks, fear of audit scrutiny, fear of administrative burden). | Risk-averse procurement officers, assistants protective of offline personal arrangements |
| **Affected Stakeholder** | Does not buy or configure the platform, but experiences its output (e.g., attending guests, finance auditors). | Entertained CXO Clients, Internal Team Attendees, External Auditors |

---

## 3. Enterprise Personas

---

### Persona 1: Executive Assistant to Founder / MD / VP

- **Persona Name:** Executive Assistant ("The Stressed Coordinator")
- **Representative Job Titles:** Executive Assistant (EA), Senior Executive Assistant to MD, Executive Coordinator, Personal Assistant to CXO, Chief of Staff Associate
- **Side:** Enterprise
- **Primary Role in Buying Process:** Primary User / Internal Champion / Influencer
- **Primary Responsibilities:** High-touch executive calendar management, travel bookings, executive board meeting arrangements, private dining room reservations for CXO prospect and client dinners, gathering post-event receipts.
- **Current Workflow:** Receives vague instruction via WhatsApp ("Find a private room for 12 guests next Thursday near Golf Course Road; top-tier wine and privacy needed"). Calls 4–6 hotel banquets and standalone restaurants; chases managers over WhatsApp for menus and minimum spends; gets manager approval over email; pays with executive card; chases venue for missing tax invoice; collates receipts for expense filing.
- **Trigger Events:**
  - Double-booking or loss of private room reservation for a critical client dinner.
  - Awkward billing interruption at the table in front of key executive guests.
  - Expense claim rejected by finance due to missing corporate GSTIN on a retail card slip.
  - Spending 6+ working hours trying to lock in a private dining room for a visiting global executive.
- **Top 5 Pain Points:**
  1. Wasting 4–8 hours per event playing phone and WhatsApp tag with unresponsive restaurant banquet staff.
  2. Uncertainty around whether a venue is truly acoustically isolated and private for confidential board or deal talks.
  3. Having to negotiate minimum spend and set-menu pricing from scratch for every single dinner.
  4. Bearing the personal anxiety of coordinating dietary restrictions (vegan, Jain, allergies) across unstructured email threads.
  5. Chasing venues days after the event for itemized B2B tax bills to satisfy accounting requirements.
- **Desired Outcomes:** One-stop search of vetted private dining venues with transparent pricing, instant package confirmation, discrete billing, and zero post-event receipt hunting.
- **Biggest Fears & Objections:**
  - *Fear:* Relatia fails to confirm a venue, leaving the EA stranded with an executive client arriving in 24 hours.
  - *Objection:* *"I already have direct WhatsApp relationships with 5 banquet managers at Oberoi and Leela; why do I need a software tool?"*
- **Current Tools & Workarounds:** WhatsApp, Apple Notes, personal phone contacts, Google Maps, Excel tracking sheets, physical credit card slips.
- **What Success Looks Like:** Booking a confirmed, curated private dining room in under 10 minutes with menu and budget locked, receiving zero complaints from the executive, and having the invoice automatically delivered to finance.
- **Relatia Features Relevant:** Curated venue directory with capacity/PDR filters, structured event request flow, pre-formatted dietary preferences, automated invoice capture.
- **Evidence Needed Before Pilot:** Live walk-through of the venue directory; confirmation that top Gurugram venues (e.g., Cyber Hub, Horizon Centre, luxury hotels) are accessible; reassurance that dedicated operational backup exists if a venue glitches.
- **Likely Decision Authority:** Can recommend and pilot internally; cannot authorize enterprise SaaS spend or commercial contracts independently.
- **Likely Influence Level:** Extremely High on usability and venue selection; Moderate on commercial contract.
- **Pilot Participation:** Initiates event requests; tests venue selection; coordinates attendee details.
- **Adoption Risk:** If the UI is clunky, or if venue confirmation is slower than a direct WhatsApp message, the EA will revert immediately to personal workarounds.
- **Recommended Message:** *"Stop spending 6 hours on WhatsApp negotiating banquet minimum spends. Relatia lets you book vetted private dining rooms in Gurugram with pre-agreed corporate packages and zero receipt chasing."*
- **Message to Avoid:** *"We use autonomous AI to negotiate with restaurants on your behalf."* (Sounds untrustworthy and risky).
- **Discovery Questions:**
  1. *"When was the last time you organized a private executive dinner for your leadership team, and what exact steps did you take?"*
  2. *"How many different people or venues did you have to contact before confirming that reservation?"*
  3. *"What is the most stressful part of coordinating corporate dinners for your executives?"*
  4. *"What happens after the dinner when you submit the bill to finance?"*
- **Validation Status:** Working Hypothesis (Requires 5+ discovery interviews with Gurugram EAs).

---

### Persona 2: Field Marketing or Demand Generation Lead

- **Persona Name:** Field Marketing Lead ("The Pipeline Accelerator")
- **Representative Job Titles:** Head of Field Marketing, Demand Generation Manager, Regional Marketing Lead, Corporate Event Specialist
- **Side:** Enterprise
- **Primary Role in Buying Process:** Internal Champion / Budget Co-Owner / Primary User
- **Primary Responsibilities:** Executing Account-Based Marketing (ABM) roundtables, executive customer advisory boards, VIP prospect dinners (10–25 attendees) designed to accelerate enterprise sales pipelines.
- **Current Workflow:** Plans quarterly field calendar; identifies target account accounts with sales; struggles to find unique, non-cliché private dining spaces in Gurugram/Aerocity; negotiates contracts and advance deposits manually; tracks RSVPs in spreadsheets; manually files marketing expense vouchers.
- **Trigger Events:**
  - Launch of a major quarterly pipeline acceleration campaign.
  - Budget audit revealing massive variance in spend per lead across regional events.
  - Sales team complaining that the last prospect dinner venue was too noisy or lacked executive prestige.
- **Top 5 Pain Points:**
  1. Difficulty finding venues that balance executive prestige, acoustic privacy, and budget policy caps.
  2. Lengthy payment processes (demands for advance wire transfers by hotels when marketing needs agility).
  3. Inability to track total spend and ROI per prospect dinner across different cost centers.
  4. Dealing with venue cancellation penalties when prospective CXO attendees reschedule at the last minute.
  5. Administrative burden of coordinating multiple vendor payments and collecting compliant tax invoices for marketing budget reconciliation.
- **Desired Outcomes:** Rapid turnaround for curated 15–25 person executive dinners, transparent budget allocation, clean corporate invoicing, and high-impact prospect experience that impresses sales leaders.
- **Biggest Fears & Objections:**
  - *Fear:* Relatia offers low-tier, mass-market venues that harm the brand's premium enterprise perception.
  - *Objection:* *"We work with an external corporate event agency; why should we switch to software?"*
- **Current Tools & Workarounds:** Event agencies, Google Sheets, personal contacts, corporate Amex, Marketo/HubSpot (for invitations).
- **What Success Looks Like:** Flawlessly executing 3 executive prospect dinners a quarter with half the planning time, staying strictly within budget, and generating clean tax invoices for marketing finance.
- **Relatia Features Relevant:** Curated venue collection, multi-guest event request forms, budget cap enforcement, downloadable B2B invoice records.
- **Evidence Needed Before Pilot:** Portfolio of verified enterprise-ready private dining rooms in Gurugram/Aerocity; transparent cancellation and minimum-spend terms.
- **Likely Decision Authority:** Can authorize pilot usage within allocated field marketing campaign budget (₹1L–₹5L discretionary event budget).
- **Likely Influence Level:** High — strong cross-functional leverage between Marketing, Sales, and Finance.
- **Pilot Participation:** Manages and submits real prospect dinner requests during the 3-event pilot.
- **Adoption Risk:** If available venues lack prestige or culinary standards, marketing will immediately disengage.
- **Recommended Message:** *"Accelerate your enterprise deal pipeline with curated, private executive dining in Gurugram without agency markups or payment hassle."*
- **Message to Avoid:** *"Our AI predicts the best dining experience for your clients."*
- **Discovery Questions:**
  1. *"How often do you host small, high-touch executive prospect dinners (10–25 CXOs) in Delhi–NCR?"*
  2. *"How do you currently source and vet venues for acoustic privacy and brand prestige?"*
  3. *"How are advance venue deposits and final bills settled internally?"*
  4. *"What is your typical budget per attendee for these dinners?"*
- **Validation Status:** Working Hypothesis.

---

### Persona 3: Sales Operations or Revenue Operations Lead

- **Persona Name:** Sales Operations Lead ("The Governance Enforcer")
- **Representative Job Titles:** Director of Sales Operations, Revenue Operations (RevOps) Lead, Commercial Operations Manager
- **Side:** Enterprise
- **Primary Role in Buying Process:** Influencer / Governance Gatekeeper
- **Primary Responsibilities:** Managing sales enablement budgets, tracking customer acquisition costs (CAC), enforcing sales policy guidelines, standardizing commercial approval workflows.
- **Current Workflow:** Reviews expense submissions categorized under "Client Entertainment"; identifies widespread policy violations (unapproved dinners, over-budget spend per head, lack of opportunity association in CRM); manually audits entertainment claims against closed-won deals.
- **Trigger Events:**
  - End-of-quarter budget review showing uncontrolled spike in sales entertainment spend.
  - CFO demanding stricter governance over enterprise client entertainment expenses.
  - Sales reps complaining about slow reimbursement times for client dinners.
- **Top 5 Pain Points:**
  1. Zero pre-spend visibility: finding out about a ₹1.5 Lakh dinner only when the expense report is submitted 4 weeks later.
  2. No correlation between corporate entertainment expenditure and CRM opportunity value.
  3. Inconsistent per-head spend across sales teams (some reps spend ₹3,000/head, others spend ₹12,000/head with no policy check).
  4. High administrative friction in verifying whether an event was authorized before booking.
  5. Constant disputes between sales reps and finance controllers over disallowed expenses.
- **Desired Outcomes:** Standardized, mandatory pre-approval workflow that enforces per-head budget caps before reservations occur, giving complete visibility into sales entertainment spend.
- **Biggest Fears & Objections:**
  - *Fear:* The tool introduces friction that causes sales reps to bypass it and revert to personal cards.
  - *Objection:* *"Our reps hate entering data into new tools; they will never log in to book a dinner."*
- **Current Tools & Workarounds:** Salesforce/HubSpot, Concur/Zoho Expense, Excel audit logs.
- **What Success Looks Like:** 100% of commercial dining spend passes through transparent pre-spend approval with zero rogue overspends.
- **Relatia Features Relevant:** Policy limit validation, multi-tier approval routing, role-gated organizer/approver interfaces, centralized event history.
- **Evidence Needed Before Pilot:** Demonstration of rapid 2-minute request creation that does not overburden sales reps or their assistants.
- **Likely Decision Authority:** Influences sales budget policies; recommends tooling to VP Sales and Finance Controller.
- **Likely Influence Level:** Moderate to High on policy and governance workflows.
- **Pilot Participation:** Configures initial event approval rules and monitors pilot usage across sales reps.
- **Adoption Risk:** If the approval workflow is slow, sales leaders will demand exceptions and bypass the system.
- **Recommended Message:** *"Gain complete pre-spend control over client entertainment budgets without slowing down sales deal velocity."*
- **Message to Avoid:** *"Completely automate your sales entertainment with predictive AI."*
- **Discovery Questions:**
  1. *"How does your organization currently ensure that client entertainment dinners are pre-approved before money is spent?"*
  2. *"How do you currently track how much your enterprise sales reps spend on prospect hospitality?"*
  3. *"What is your policy regarding maximum spend per head for client dining in Delhi–NCR?"*
- **Validation Status:** Working Hypothesis.

---

### Persona 4: Event or Office Operations Manager

- **Persona Name:** Office Operations Manager ("The Workplace Organizer")
- **Representative Job Titles:** Head of Administration, Workplace Experience Manager, Facilities & Office Operations Lead
- **Side:** Enterprise
- **Primary Role in Buying Process:** Primary User / Internal Champion / Operational Gatekeeper
- **Primary Responsibilities:** Managing company all-hands, department milestone dinners, visiting executive hospitality, office social gatherings, vendor empanelment for facility services.
- **Current Workflow:** Receives internal requests for quarterly team celebration dinners or board dinners; maintains an ad-hoc spreadsheet of local restaurants; negotiates group packages; struggles to get formal corporate invoices with correct tax details.
- **Trigger Events:**
  - Sudden executive visit requiring a 20-person private dinner with 48 hours' notice.
  - Finance audit flagging repeated non-compliant vendor receipts from local venues.
  - Office administration overwhelmed by manual paperwork and vendor coordination.
- **Top 5 Pain Points:**
  1. Constant interruption from multiple departments asking for venue recommendations.
  2. Handling complex dietary preferences, venue AV requirements, and seating arrangements manually.
  3. Dealing with erratic venue cancellation and refund policies.
  4. Reconciling advance deposits paid to hotels against final settlement bills.
  5. Receiving retail POS thermal slips that fade, tear, and lack company GSTIN details.
- **Desired Outcomes:** A reliable, centralized platform to book vetted corporate dining venues with standardized corporate packages and automated tax invoice delivery.
- **Biggest Fears & Objections:**
  - *Fear:* Being blamed if a booked venue underperforms on food quality or service during a critical leadership dinner.
  - *Objection:* *"We already have negotiated rates with a few hotels near Cyber City."*
- **Current Tools & Workarounds:** Google Sheets, personal phone contacts, WhatsApp, physical files.
- **What Success Looks Like:** Delegating venue booking to a self-serve platform where teams book within approved budgets while administration maintains complete visibility.
- **Relatia Features Relevant:** Curated venue directory, dietary and capacity specification, automated invoice generation.
- **Evidence Needed Before Pilot:** Evidence that venues on Relatia are pre-vetted for corporate standards and have responsive event managers.
- **Likely Decision Authority:** Can authorize internal department bookings; influences office administration procurement.
- **Likely Influence Level:** High for internal team events; Moderate for client-facing dinners.
- **Pilot Participation:** Books 1–2 internal leadership or team milestone events during the pilot.
- **Adoption Risk:** Inertia; sticking to known local contacts even if manual and inefficient.
- **Recommended Message:** *"Streamline executive and team dining in Gurugram with pre-vetted venues, clear corporate packages, and automated GST billing."*
- **Message to Avoid:** *"Replace your admin team with automated booking software."*
- **Discovery Questions:**
  1. *"How does your office handle reservations when an executive asks for a private dinner venue?"*
  2. *"What issues have you faced with hotel deposits and final tax invoices?"*
  3. *"How much time does your team spend each month managing dining and hospitality requests?"*
- **Validation Status:** Working Hypothesis.

---

### Persona 5: VP Sales, Practice Head, or Business Unit Leader

- **Persona Name:** Commercial Leader ("The Deal Closer")
- **Representative Job Titles:** VP of Sales, Chief Commercial Officer (CCO), Senior Partner / Practice Leader (Consulting), Managing Director (PE/Advisory)
- **Side:** Enterprise
- **Primary Role in Buying Process:** Economic Buyer / Budget Owner / Executive Sponsor
- **Primary Responsibilities:** Driving enterprise revenue, closing multi-crore consulting or software contracts, building senior executive client relationships, managing departmental P&L.
- **Current Workflow:** Mandates client dinners to deepen executive ties; delegates booking logistics to EA; hosts dinners at premier venues; pays with personal or corporate credit card; signs off on expense claims after the fact.
- **Trigger Events:**
  - An embarrassing operational or billing mishap during a dinner with a Fortune 500 prospect CXO.
  - Internal finance clash over disallowed entertainment expense claims.
  - Corporate mandate to tighten sales entertainment governance without impacting deal closing rates.
- **Top 5 Pain Points:**
  1. Risk of client embarrassment from poor venue acoustics, service blunders, or table-side bill presentation.
  2. Time wasted by senior sales reps and assistants dealing with logistical booking chaos instead of selling.
  3. Friction with Finance over post-event expense approvals and missing tax documentation.
  4. Lack of private dining room availability at peak executive dining times (Tuesday–Thursday).
  5. Unpredictable total cost per dinner with unexpected minimum spend surcharges or beverage markups.
- **Desired Outcomes:** Flawless executive hospitality that impresses clients, seamless discrete billing, zero post-event administrative friction, and happy finance controllers.
- **Biggest Fears & Objections:**
  - *Fear:* Bureaucracy and software friction that slows down client courting or restricts flexibility.
  - *Objection:* *"I don't care about software or GST; I just want my assistant to make sure my client has an extraordinary dinner."*
- **Current Tools & Workarounds:** Direct delegation to EA, personal credit card, luxury concierge.
- **What Success Looks Like:** High-touch, private executive dinners executed without a hitch, zero billing awkwardness in front of clients, and instant expense sign-off.
- **Relatia Features Relevant:** Vetted private dining room standards, discreet pre-approved billing workflow, mobile-friendly manager approval.
- **Evidence Needed Before Pilot:** Reassurance that venues represent tier-1 luxury (e.g., Oberoi, Leela, high-end fine dining) and that the booking process is frictionless for their EA.
- **Likely Decision Authority:** Full authority to approve departmental pilot participation and discretionary entertainment spend.
- **Likely Influence Level:** Maximum — if VP Sales demands Relatia, Finance and Procurement will accommodate.
- **Pilot Participation:** Acts as executive sponsor; approves event requests submitted by their team.
- **Adoption Risk:** If the platform feels rigid or limits their choice of luxury venues, they will abandon it immediately.
- **Recommended Message:** *"Give your team access to Gurugram's finest private dining rooms for client entertaining with pre-approved corporate billing and zero table-side card friction."*
- **Message to Avoid:** *"Strictly monitor and restrict your sales team's dining expenses."*
- **Discovery Questions:**
  1. *"How important are private client dinners to closing enterprise deals in your business?"*
  2. *"Have you ever experienced an awkward moment with venue service or billing in front of a key client?"*
  3. *"How much administrative time does your team waste managing dining logistics and expense claims?"*
- **Validation Status:** Working Hypothesis (High Priority for discovery).

---

### Persona 6: Finance Controller

- **Persona Name:** Finance Controller ("The Tax & Compliance Guardian")
- **Representative Job Titles:** Financial Controller, VP of Finance, Head of Commercial Finance, Associate Director Finance
- **Side:** Enterprise
- **Primary Role in Buying Process:** Finance Gatekeeper / Approver / Co-Economic Buyer
- **Primary Responsibilities:** Managing corporate working capital, ensuring statutory GST compliance, overseeing month-end accounts close, auditing employee expense reports, preventing corporate spend leakage.
- **Current Workflow:** Reviews monthly expense claims; finds hundreds of thousands of rupees in dining bills submitted as credit card slips without valid corporate GSTIN; argues with employees over rejected claims; spends days chasing vendors for revised B2B invoices; worries about GST audit disallowances.
- **Trigger Events:**
  - Statutory tax audit disallowing unverified hospitality expenses or disputed input tax credits.
  - Month-end close delayed by 5 days due to missing hospitality receipts.
  - Unbudgeted quarterly entertainment spend exceeding departmental allocations by 25%.
- **Top 5 Pain Points:**
  1. Substantial GST Input Tax Credit leakage caused by employees submitting retail POS slips lacking company GSTIN or valid SAC codes (996331/996332).
  2. Retrospective spend control: finding out money was spent weeks after the event has occurred.
  3. Excessive staff hours spent chasing venues for revised B2B tax invoices at month-end.
  4. Manual data entry and reconciliation between credit card statements, expense software, and bank accounts.
  5. Audit risk from inconsistent entertainment expense classification under Indian Income Tax and GST laws.
- **Desired Outcomes:** 100% of corporate dining spend pre-authorized within budget, accompanied by valid B2B GST tax invoices, and structured digital data for automated reconciliation.
- **Biggest Fears & Objections:**
  - *Fear:* Introducing an unproven intermediary that complicates billing, holds funds, or creates GST compliance ambiguity.
  - *Objection:* *"We already have Concur / Zoho Expense; we don't want another software tool for dining."*
- **Current Tools & Workarounds:** ERP (SAP, Oracle NetSuite, Tally), Concur, Zoho Expense, Excel reconciliation sheets, manual physical invoice filing.
- **What Success Looks Like:** Clean B2B tax invoice data delivered digitally for every single event with verified GSTIN matching, zero rogue expense overspends, and seamless month-end close.
- **Relatia Features Relevant:** State-specific GST computation (CGST+SGST vs. IGST), valid SAC code assignment, automated B2B invoice generation, role-gated finance dashboard with CSV exports.
- **Evidence Needed Before Pilot:** Sample Relatia-generated B2B tax invoice; explanation of tax and billing flow; confirmation of zero ERP disruption during 3-event validation pilot.
- **Likely Decision Authority:** Can veto or approve any pilot involving corporate invoicing or payments; co-authorizes software procurement.
- **Likely Influence Level:** Maximum veto power; Moderate origination power.
- **Pilot Participation:** Reviews invoice data and spend analytics post-event during the pilot.
- **Adoption Risk:** If tax calculations or legal invoice entities appear non-compliant, finance will shut down the pilot immediately.
- **Recommended Message:** *"Capture structured B2B GST invoice data on every corporate dinner, enforce pre-spend budget caps, and eliminate month-end reconciliation headaches."*
- **Message to Avoid:** *"We guarantee 100% GST input tax credit recovery."* (Legally inaccurate and triggers immediate professional skepticism).
- **Discovery Questions:**
  1. *"What percentage of corporate dining expense claims come in with proper B2B GST invoices versus retail card slips?"*
  2. *"How does your team currently handle hospitality expenses that lack company GSTIN details?"*
  3. *"How many days does it take your accounting team to reconcile dining expenses during month-end close?"*
  4. *"What invoice and tax data must a platform provide for your team to approve a 3-event pilot?"*
- **Validation Status:** Working Hypothesis (Mandatory starting interview group).

---

### Persona 7: Head of Tax or Accounts Payable Lead

- **Persona Name:** Accounts Payable Lead ("The Ledger Reconciler")
- **Representative Job Titles:** Head of Tax, Accounts Payable Manager, Senior Manager Taxation, Direct & Indirect Tax Lead
- **Side:** Enterprise
- **Primary Role in Buying Process:** Operational Gatekeeper / Evaluator / Primary User
- **Primary Responsibilities:** Processing vendor payments, verifying GSTR-2B matching, filing monthly GST returns (GSTR-3B), auditing tax invoices against corporate procurement guidelines.
- **Current Workflow:** Receives stacks of dining bills from employees; manually checks whether the supplier filed their GSTR-1; matches supplier GSTIN against invoice details; flags discrepancies to employees; enters manual journal vouchers into ERP.
- **Trigger Events:**
  - GST reconciliation failure during GSTR-2B matching at tax filing deadline.
  - Notice from tax authorities regarding mismatched Input Tax Credit claims on hospitality expenses.
  - Backlog of hundreds of unprocessed expense receipts before financial year-end.
- **Top 5 Pain Points:**
  1. Dealing with thermal POS slips that are illegible, missing vendor GSTIN, or lack SAC codes.
  2. Inability to claim eligible ITC because invoices show the wrong state GSTIN (e.g., Delhi GSTIN used for a Gurugram Haryana dinner).
  3. Chasing employees for missing itemized bills when only credit card summary charge slips are submitted.
  4. Discrepancies between food service tax (5% without ITC or 18% with ITC in certain hotel settings) and alcohol taxation.
  5. High manual effort verifying vendor filing status and GST compliance manually.
- **Desired Outcomes:** Clean, legible, pre-verified digital tax invoices with correct legal entity name, GSTIN, SAC codes, and clear breakdown of tax components.
- **Biggest Fears & Objections:**
  - *Fear:* Relatia generates invoices that fail GSTR-2B reconciliation or trigger tax authority inquiries.
  - *Objection:* *"Our current process is painful, but at least we know our auditors accept our paper filing workarounds."*
- **Current Tools & Workarounds:** ClearTax, Tally, SAP, GSTN Portal, Excel spreadsheets.
- **What Success Looks Like:** Every dinner invoice automatically populated with correct corporate GSTIN, matching state tax rules, and ready for immediate one-click tax filing review.
- **Relatia Features Relevant:** Automated GST calculation logic, SAC code classification, digital invoice storage, downloadable tax reports.
- **Evidence Needed Before Pilot:** Inspection of sample invoice structure and SAC code mapping.
- **Likely Decision Authority:** Cannot authorize contracts independently; strong technical input to Finance Controller.
- **Likely Influence Level:** High technical influence on invoice and tax acceptance.
- **Pilot Participation:** Inspects invoices generated during the 3-event validation pilot.
- **Adoption Risk:** If tax data fields are inaccurate, AP will advise the Controller against adoption.
- **Recommended Message:** *"Structured B2B tax invoice data designed to streamline GSTR-2B reconciliation and eliminate missing-receipt inquiries."*
- **Message to Avoid:** *"Our system eliminates tax risk entirely."*
- **Discovery Questions:**
  1. *"What are the most frequent tax invoice errors you encounter on employee dining submissions?"*
  2. *"How do you handle interstate GST allocation when an employee from your Mumbai office hosts a dinner in Gurugram?"*
  3. *"What specific data fields do you need on an invoice to accept it without manual review?"*
- **Validation Status:** Working Hypothesis.

---

### Persona 8: Procurement or Vendor Management Lead

- **Persona Name:** Procurement Lead ("The Contract & Risk Sifter")
- **Representative Job Titles:** Head of Procurement, Sourcing Manager, Vendor Management Lead, Category Manager (Corporate Services)
- **Side:** Enterprise
- **Primary Role in Buying Process:** Procurement Gatekeeper / Contract Negotiator
- **Primary Responsibilities:** Managing vendor empanelment, negotiating master service agreements (MSAs), ensuring cost competitiveness, enforcing corporate governance guidelines.
- **Current Workflow:** Manages formal vendor onboarding; reviews vendor financial stability, GST certificates, and bank details; negotiates payment credit terms (Net 30/60); monitors vendor compliance.
- **Trigger Events:**
  - Executive leadership demanding a platform to streamline corporate hospitality.
  - Audit flagging proliferation of unvetted, one-off hospitality vendors across the company.
  - Periodic procurement review of travel and entertainment spend categories.
- **Top 5 Pain Points:**
  1. Too many ad-hoc, unvetted hospitality vendors being used across different corporate departments.
  2. Lack of transparent, negotiated pricing benchmarks for private dining and corporate events.
  3. Managing individual vendor empanelment for dozens of separate restaurants and hotels.
  4. Vendor contracts with aggressive cancellation terms or hidden minimum spend charges.
  5. Inability to negotiate volume discounts due to fragmented departmental spending.
- **Desired Outcomes:** A single empanelled platform partner that aggregates curated corporate venues under standardized commercial terms and transparent pricing.
- **Biggest Fears & Objections:**
  - *Fear:* Relatia adds hidden markups or acts as an unvetted broker that increases company liability.
  - *Objection:* *"We have strict 90-day vendor onboarding and require SOC 2 certification before any software deployment."*
- **Current Tools & Workarounds:** SAP Ariba, Coupa, manual vendor onboarding checklists, legal NDA templates.
- **What Success Looks Like:** Consolidating hundreds of fragmented hospitality transactions into one empanelled vendor relationship with transparent pass-through pricing and strict SLA governance.
- **Relatia Features Relevant:** Centralized vendor management, transparent pass-through pricing, structured SLA compliance, auditable digital records.
- **Evidence Needed Before Pilot:** Clear commercial terms; evidence of proper entity registration and GST compliance; simple pilot agreement that bypasses full 6-month enterprise empanelment.
- **Likely Decision Authority:** Can block enterprise-wide rollout; can approve low-value pilot under discretionary thresholds.
- **Likely Influence Level:** Gatekeeper — critical for expansion beyond initial pilot.
- **Pilot Participation:** Reviews and approves light pilot engagement terms.
- **Adoption Risk:** Demanding full enterprise vendor empanelment processes during an early 3-event validation pilot.
- **Recommended Message:** *"Consolidate corporate dining and entertainment spend into a transparent, compliant platform with pre-negotiated corporate rates and single-vendor billing."*
- **Message to Avoid:** *"Bypass your procurement team entirely."*
- **Discovery Questions:**
  1. *"What is your threshold for running an exploratory 3-event pilot without requiring full 6-month vendor empanelment?"*
  2. *"How do you currently manage corporate rates with hotels and premium dining venues in Delhi–NCR?"*
  3. *"What are your mandatory commercial and compliance requirements for a software pilot?"*
- **Validation Status:** Working Hypothesis (Later-stage enterprise stakeholder).

---

### Persona 9: CFO, COO, Country Head, or GCC Leader

- **Persona Name:** Executive Sponsor ("The Capital & Brand Steward")
- **Representative Job Titles:** Chief Financial Officer (CFO), Chief Operating Officer (COO), Country Managing Director, GCC Site Head
- **Side:** Enterprise
- **Primary Role in Buying Process:** Executive Sponsor / Final Economic Buyer
- **Primary Responsibilities:** Corporate governance, P&L stewardship, operational efficiency, regulatory risk management, brand reputation.
- **Current Workflow:** Receives high-level financial reports; signs off on major software contracts; approves company-wide operational policies; arbitrates major cross-departmental budget disputes.
- **Trigger Events:**
  - Board scrutiny over rising administrative and sales enablement overheads.
  - Material tax penalties or disallowances resulting from unvetted expense practices.
  - Strategic company-wide initiative to digitize internal procurement and operational workflows.
- **Top 5 Pain Points:**
  1. Total lack of high-level visibility into multi-crore corporate entertainment expenditure across business units.
  2. Direct financial leakage from unrecovered GST input tax credits across millions of rupees of hospitality spend.
  3. Executive time drain: senior leaders and assistants wasting productive hours on logistical coordination.
  4. Brand risk from rogue employee spending or improper venue arrangements during client entertainment.
  5. Audit vulnerabilities under corporate governance standards and statutory tax assessments.
- **Desired Outcomes:** Complete enterprise-wide visibility and governance over relationship spend, measurable administrative time savings, and bulletproof statutory audit compliance.
- **Biggest Fears & Objections:**
  - *Fear:* Implementing a niche solution that creates administrative complexity without delivering measurable financial or operational ROI.
  - *Objection:* *"Why do we need specialized software for dining? Our managers should just use corporate credit cards."*
- **Current Tools & Workarounds:** High-level ERP executive dashboards, board reports, periodic internal audit reviews.
- **What Success Looks Like:** Clear executive dashboard showing corporate entertainment spend by department, 100% policy compliance, zero tax leakage, and streamlined operations.
- **Relatia Features Relevant:** Executive spend visibility, policy enforcement engine, comprehensive audit trails, structured B2B tax invoice data.
- **Evidence Needed Before Pilot:** Clear business case demonstrating administrative time reallocation and tax review readiness; zero disruption to core operations during pilot.
- **Likely Decision Authority:** Ultimate signatory for company-wide SaaS agreements and enterprise policies.
- **Likely Influence Level:** Absolute veto and mandate power.
- **Pilot Participation:** Does not participate in day-to-day pilot; receives executive summary and tax report at the end of the pilot.
- **Adoption Risk:** Disinterest if the problem is framed merely as "restaurant reservations" rather than an operational governance and spend compliance system.
- **Recommended Message:** *"Transform corporate relationship entertainment from an unmanaged, tax-leaking expense into a governed, auditable, and tax-efficient operating workflow."*
- **Message to Avoid:** *"We use cutting-edge AI to automate your executive lifestyle."*
- **Discovery Questions:**
  1. *"What is your total annual expenditure across client entertainment, executive hospitality, and corporate dining in India?"*
  2. *"How confident are you that 100% of that spend complies with internal policy and captures eligible GST tax credits?"*
  3. *"What level of operational proof would your leadership team need to see from a 60-day pilot before rolling out a solution company-wide?"*
- **Validation Status:** Working Hypothesis.

---

### Persona 10: Legal, Compliance, or Risk Stakeholder

- **Persona Name:** Legal & Compliance Counsel ("The Risk Assessor")
- **Representative Job Titles:** General Counsel, Head of Legal, Compliance Officer, Risk & Ethics Lead
- **Side:** Enterprise
- **Primary Role in Buying Process:** Legal/Compliance Gatekeeper
- **Primary Responsibilities:** Mitigating corporate legal liabilities, ensuring compliance with anti-corruption/anti-bribery laws (e.g., Prevention of Corruption Act in India, US FCPA for MNCs), safeguarding corporate data privacy.
- **Current Workflow:** Reviews software vendor contracts; evaluates employee entertainment gift/hospitality thresholds; ensures clear records of who attended client entertainment events.
- **Trigger Events:**
  - Vendor contract review for new software tool.
  - Internal compliance investigation into hospitality given to public officials or regulated clients.
  - Annual compliance audit of entertainment expenses.
- **Top 5 Pain Points:**
  1. Undocumented corporate entertainment expenses lacking attendee lists or clear commercial justification.
  2. Exposure to anti-bribery / ethics violations if sales reps entertain clients without transparent pre-approval.
  3. Data privacy concerns regarding guest lists and executive attendee details stored on third-party servers.
  4. Complex vendor contract terms with ambiguous liability or indemnity clauses.
  5. Regulatory scrutiny over hospitality provided during sensitive procurement or licensing periods.
- **Desired Outcomes:** Standardized, auditable digital records showing exact date, venue, cost, attendee list, and commercial business purpose for every corporate event.
- **Biggest Fears & Objections:**
  - *Fear:* Platform stores confidential executive client guest lists insecurely or creates legal exposure around anti-bribery regulations.
  - *Objection:* *"We cannot approve software that handles confidential client interaction data without extensive security review."*
- **Current Tools & Workarounds:** Internal compliance portals, manual ethics declaration forms, legal contract repositories.
- **What Success Looks Like:** Complete, searchable audit trails for every entertainment event with documented attendee logs and pre-approved policy justifications.
- **Relatia Features Relevant:** Structured event request forms with attendee specification, tamper-evident audit history, tenant-isolated data storage.
- **Evidence Needed Before Pilot:** Standard, balanced pilot agreement; clear data privacy and confidentiality terms; confirmation that attendee data is tenant-isolated.
- **Likely Decision Authority:** Can block deployment on legal or compliance grounds.
- **Likely Influence Level:** Gatekeeper — essential for formal pilot contracts.
- **Pilot Participation:** Reviews pilot terms and confidentiality provisions.
- **Adoption Risk:** Excessive legal review delaying an exploratory 3-event validation pilot.
- **Recommended Message:** *"Maintain auditable, transparent records of all corporate client entertainment with documented business purpose and attendee compliance."*
- **Message to Avoid:** *"Our platform lets you entertain clients discreetly off the record."* (Completely toxic for legal/compliance).
- **Discovery Questions:**
  1. *"What documentation does your compliance policy require when sales teams host clients or external stakeholders for dinner?"*
  2. *"What are your primary data privacy and confidentiality requirements when evaluating a cloud-based operational tool?"*
  3. *"What is the standard contract review procedure for a low-risk, 30-day software pilot?"*
- **Validation Status:** Working Hypothesis.

---

## 4. Hospitality Provider-Side Personas

---

### Persona 11: Hotel Director of Sales or Banquet Manager

- **Persona Name:** Luxury Hotel Banquet Director ("The Yield Maximizer")
- **Representative Job Titles:** Director of Sales & Marketing (DOSM), Director of Events, Banquet Sales Manager, F&B Sales Lead
- **Side:** Hospitality Provider
- **Primary Role in Buying Process:** Provider Decision Maker / Primary Partner Contact
- **Primary Responsibilities:** Maximizing food and beverage (F&B) revenue, driving banquet and Private Dining Room (PDR) occupancy, hitting aggressive monthly corporate sales targets.
- **Current Workflow:** Relies on inbound corporate phone calls, direct relationships with enterprise EAs, and travel management companies; negotiates corporate rates; chases corporate bookers for credit vouchers or advance wire payments; deals with last-minute cancellations.
- **Trigger Events:**
  - Midweek (Tuesday–Wednesday) PDR occupancy lagging behind weekend leisure dining.
  - Monthly F&B revenue shortfall against quarterly hotel targets.
  - Corporate clients disputing bills post-event due to billing miscommunication.
- **Top 5 Pain Points:**
  1. Low PDR occupancy on Monday through Wednesday evenings when leisure walk-in traffic is minimal.
  2. Chasing corporate accounts for delayed payment vouchers and outstanding balances (DSO friction).
  3. Last-minute corporate cancellations or guest drop-offs that leave kitchen prep and reserved rooms unmonetized.
  4. Excessive time spent by banquet sales teams fielding ad-hoc WhatsApp inquiries from assistants who never convert.
  5. Complexities in generating customized B2B tax bills showing specific client GSTINs during busy evening restaurant shifts.
- **Desired Outcomes:** High-margin corporate bookings on weekday evenings with guaranteed minimum spends, pre-approved corporate billing, and zero payment disputes.
- **Biggest Fears & Objections:**
  - *Fear:* Relatia demands high commissions, discounts hotel rates, or damages the property's luxury exclusivity.
  - *Objection:* *"We already have direct relationships with all major corporates in Gurugram; why should we pay commission to a platform?"*
- **Current Tools & Workarounds:** Opera PMS, Delphi sales software, WhatsApp Business, Excel reservation sheets.
- **What Success Looks Like:** Consistent, incremental corporate bookings for 10–30 guest private dinners on Tuesday–Thursday evenings with guaranteed spend and immediate payment settlement.
- **Relatia Features Relevant:** Direct enterprise booking requests, guaranteed attendee numbers, structured corporate packages, automated B2B invoicing data.
- **Evidence Needed Before Pilot:** Assurance of enterprise client caliber; transparent commission/commercial terms; confirmation that hotel luxury brand guidelines are strictly respected.
- **Likely Decision Authority:** Can authorize listing and pilot participation for PDRs; major contract terms require General Manager / Financial Controller sign-off.
- **Likely Influence Level:** High — primary decision maker for hotel F&B corporate partnerships.
- **Pilot Participation:** Accepts and fulfills corporate event requests during the pilot.
- **Adoption Risk:** If bookings are low-spend or clash with high-paying retail diners, the hotel will deprioritize the platform.
- **Recommended Message:** *"Fill your luxury private dining rooms on Tuesday through Thursday evenings with verified corporate bookings, pre-agreed minimum spends, and zero payment chasing."*
- **Message to Avoid:** *"Discount your luxury dining rates to attract startup bookings."*
- **Discovery Questions:**
  1. *"What percentage of your Private Dining Room revenue comes from corporate dinners versus retail leisure guests?"*
  2. *"On which days of the week do your fine-dining PDRs have the lowest occupancy?"*
  3. *"What is your standard minimum spend requirement for a 15-guest executive dinner in your private dining room?"*
  4. *"What are the biggest headaches your team experiences when dealing with corporate billing and payment vouchers?"*
- **Validation Status:** Working Hypothesis.

---

### Persona 12: Restaurant General Manager or Corporate Events Manager

- **Persona Name:** Fine Dining General Manager ("The Floor Operator")
- **Representative Job Titles:** General Manager (GM), Restaurant Manager, Corporate Sales Manager, Head of Guest Relations
- **Side:** Hospitality Provider
- **Primary Role in Buying Process:** Provider Champion / Primary Operator
- **Primary Responsibilities:** Day-to-day floor operations, guest satisfaction, table turnover, maintaining culinary and service standards, managing floor staff.
- **Current Workflow:** Manages reservations via phone and WhatsApp; balances retail walk-in tables with private corporate dining bookings; coordinates customized menus with the executive chef; handles tableside billing and credit card swipes.
- **Trigger Events:**
  - Awkward billing scene at a corporate table when an executive's card fails or corporate billing details are missing.
  - Disgruntled corporate organizer complaining about noise levels or slow service.
  - Empty private dining room on a Wednesday evening while main dining room is only half full.
- **Top 5 Pain Points:**
  1. Last-minute corporate cancellations after custom ingredients and prep have been committed.
  2. Guests arriving with unannounced dietary restrictions (Jain, gluten-free, vegan) that disrupt kitchen service.
  3. Awkward bill presentation at the table causing embarrassment to the corporate host.
  4. Service staff making errors when manually entering 15-digit corporate GSTIN numbers on POS machines during midnight closing rush.
  5. Disorganized event organizers who change attendee counts or menu requirements hours before the event.
- **Desired Outcomes:** Seamless corporate bookings with attendee numbers, pre-set menus, dietary requirements, and billing details locked 48 hours in advance.
- **Biggest Fears & Objections:**
  - *Fear:* Platform sends demanding corporate clients who expect unreasonable discounts or create operational friction on the floor.
  - *Objection:* *"We don't need an app; our regular corporate guests just text me directly."*
- **Current Tools & Workarounds:** POS systems (Petpooja, Posist), WhatsApp, physical reservation diary.
- **What Success Looks Like:** Smooth, predictable private corporate dinners where the kitchen is pre-notified, guests arrive and dine without logistical friction, and the bill is settled automatically off-table.
- **Relatia Features Relevant:** Structured event brief (attendee count, budget, dietary needs), discrete billing workflow, verified B2B GSTIN data capture.
- **Evidence Needed Before Pilot:** Clear operational workflow that does not burden floor managers with complicated software during service hours.
- **Likely Decision Authority:** Can accept pilot bookings; commercial terms require restaurant owner / group F&B director approval.
- **Likely Influence Level:** High operational influence on venue onboarding.
- **Pilot Participation:** Coordinates kitchen and floor execution for pilot bookings.
- **Adoption Risk:** If the platform requires complex floor staff interactions during peak dinner rush, they will resist using it.
- **Recommended Message:** *"Receive fully locked corporate event briefs with pre-set menus, dietary preferences, and pre-approved billing—no tableside bill drama."*
- **Message to Avoid:** *"Our app manages your restaurant floor operations."*
- **Discovery Questions:**
  1. *"What causes the biggest service disruptions when hosting a 15–20 person corporate client dinner?"*
  2. *"How do your floor managers currently handle corporate guests who demand a customized GST tax invoice at the table?"*
  3. *"How do you handle minimum spend commitments and cancellations for corporate private dining?"*
- **Validation Status:** Working Hypothesis.

---

### Persona 13: Finance or Accounts Lead at Hospitality Provider

- **Persona Name:** Hospitality Financial Controller ("The Hospitality Accountant")
- **Representative Job Titles:** Director of Finance (Hotel), Accounts Manager (Restaurant Group), Chief Accountant, Financial Controller
- **Side:** Hospitality Provider
- **Primary Role in Buying Process:** Provider Finance Gatekeeper
- **Primary Responsibilities:** Revenue recognition, credit management, issuing B2B tax invoices, collecting accounts receivable from corporate clients, GST return filing.
- **Current Workflow:** Audits daily night audit reports; matches POS dining bills against corporate billing vouchers; chases corporate finance departments for payments on 30/60-day credit; deals with disputed tax invoices.
- **Trigger Events:**
  - Outstanding corporate receivables crossing 60+ days aging threshold.
  - Corporate client withholding payment because a tax invoice lacked their specific legal entity name or state GSTIN.
  - Discrepancies between food GST (5% / 18%) and liquor state excise accounting.
- **Top 5 Pain Points:**
  1. Chasing corporate accounts for unpaid dining vouchers weeks after the event.
  2. Incomplete or incorrect corporate billing information provided by dining guests at the time of service.
  3. Corporate clients disputing service charges or minimum spend calculations after dining.
  4. Managing credit risks for corporate clients who do not have formal empanelled credit agreements.
  5. Accounting complexity when splitting food, non-alcoholic beverages, and alcoholic beverages under Indian tax statutes.
- **Desired Outcomes:** Guaranteed, timely settlement of corporate dining bills with complete, verified corporate tax details provided before the event occurs.
- **Biggest Fears & Objections:**
  - *Fear:* Relatia delays settlement, disputes agreed commission deductions, or complicates hotel tax accounting.
  - *Objection:* *"We only accept direct corporate payments via bank transfer or credit card on the day of dining."*
- **Current Tools & Workarounds:** Opera PMS, SAP, Tally, bank merchant portals.
- **What Success Looks Like:** Complete corporate billing and GSTIN details delivered in advance, clear commission deductions, and direct, prompt payment settlement without chasing.
- **Relatia Features Relevant:** Pre-event B2B tax detail validation, automated billing state-machine, clear commercial breakdown.
- **Evidence Needed Before Pilot:** Clear settlement schedule; transparent commission billing; sample tax invoice format.
- **Likely Decision Authority:** Approves credit terms and payment flow; reports to GM / Owner.
- **Likely Influence Level:** Absolute veto on non-standard payment or credit arrangements.
- **Pilot Participation:** Validates commercial settlement and invoice processing for pilot events.
- **Adoption Risk:** If payment settlement is delayed or creates reconciliation confusion, provider finance will block future participation.
- **Recommended Message:** *"Eliminate outstanding corporate receivables with pre-verified corporate billing details and guaranteed settlement terms."*
- **Message to Avoid:** *"We handle all accounting and tax filing for your restaurant."*
- **Discovery Questions:**
  1. *"What is your standard credit policy for corporate events, and what percentage of corporate receivables end up delayed past 30 days?"*
  2. *"What information do you require from a corporate client before you can issue a compliant B2B tax invoice?"*
  3. *"How do you handle commercial commission agreements with third-party corporate booking partners?"*
- **Validation Status:** Working Hypothesis.

---

## 5. Enterprise Buying Committee Map & Paths

Corporate entertainment affects multiple enterprise departments with competing priorities. The following committee map outlines the typical stakeholder dynamics:

```
+----------------------------------------------------------------------------------------------------+
|                                    ENTERPRISE BUYING COMMITTEE                                     |
+----------------------------------------------------------------------------------------------------+
| STAKEHOLDER          | PRIMARY PROBLEM            | PURCHASE ROLE    | PRIMARY PROOF REQUIRED      |
+----------------------+----------------------------+------------------+-----------------------------+
| Executive Assistant  | Booking chaos, time drain  | User / Champion  | Live venue demo & reliability|
| Field Marketing      | Pipeline ROI, venue prestige| Champion / Buyer | High-tier venue portfolio   |
| VP Sales / Partner   | Deal velocity, client face | Economic Buyer   | Frictionless executive CX   |
| Finance Controller   | GST leakage, rogue spend   | Gatekeeper / Buy | Compliant B2B tax invoices  |
| Head of Tax / AP     | Month-end reconciliation   | Operational Gate | GSTR-2B matching readiness  |
| Procurement          | Vendor proliferation, terms| Contract Gate    | Transparent pass-through fee|
| CFO / Country Head   | Governance, spend visibility| Exec Sponsor    | Measurable time & tax ROI   |
| Legal & Compliance   | Liability, anti-bribery    | Legal Gatekeeper | Clean pilot terms & privacy |
+----------------------------------------------------------------------------------------------------+
```

### Buying Committee Dynamic Table

| Persona | Job Titles | Problem Owned | Purchase Role | Influence Level | Typical Objection | Proof Required | Pilot Role | Likely Next Step |
|---|---|---|---|:---:|---|---|---|---|
| **Executive Assistant** | EA to MD / VP, Exec Coordinator | 6+ hours wasted booking venues; lost receipts | Primary User / Champion | High (Operational) | *"I already use WhatsApp with venues."* | Live demo of curated Gurugram venues | Submits event requests | Recommends pilot to VP Sales / MD |
| **Field Marketing Lead** | Head of Field Mktg, Demand Gen | Finding premium venues for prospect dinners | Champion / Co-Buyer | High (Budget) | *"Our agency handles events."* | Proven private dining options without markup | Runs 1–2 prospect dinners | Allocates campaign budget |
| **Sales Ops / RevOps** | Director RevOps, Sales Enablement | Rogue entertainment spend; no CRM attribution | Influencer / Policy Gate | Moderate | *"Sales reps won't use another tool."* | 2-minute request creation demo | Tests approval rules | Integrates policy into sales handbook |
| **Office Operations** | Facilities Lead, Admin Manager | Fragmented team event inquiries | Primary User / Champion | Moderate | *"We already have hotel corporate rates."* | Transparent corporate package options | Books internal milestone dinner | Standardizes internal booking process |
| **VP Sales / Practice Head** | VP Sales, Senior Partner, MD | Client relationship risk; awkward table billing | Economic Buyer / Sponsor | Maximum | *"I don't need software, just good dinners."* | Pre-approved discrete billing flow | Approves event budget | Sponsors 3-event validation pilot |
| **Finance Controller** | Financial Controller, VP Finance | Lost GST tax credits; delayed month-end close | Gatekeeper / Co-Buyer | Maximum (Veto) | *"We already use Concur; no new systems."* | Sample B2B tax invoice with SAC codes | Reviews post-event tax data | Approves company-wide billing |
| **Head of Tax / AP** | Head of Tax, AP Lead | GSTR-2B mismatch; chasing missing invoices | Operational Gatekeeper | High (Technical) | *"Vendor invoices fail tax audits."* | Verified GSTIN matching protocol | Inspects pilot invoices | Validates accounting integration |
| **Procurement Lead** | Sourcing Manager, Category Head | Too many unvetted vendors; hidden fees | Contract Gatekeeper | High (Commercial) | *"Requires 6-month vendor onboarding."* | Low-risk, light pilot agreement | Approves pilot terms | Negotiates master enterprise contract |
| **CFO / Country Head** | CFO, COO, Country MD | Lack of spend governance; compliance exposure | Executive Sponsor | Maximum (Mandate) | *"Is this a meaningful spend category?"* | Spend audit and tax data business case | Receives pilot summary report | Mandates platform across all BUs |
| **Legal / Compliance** | General Counsel, Risk Officer | Liability, anti-corruption, data privacy | Legal Gatekeeper | High (Risk) | *"Need extensive data security review."* | Balanced pilot NDA and terms | Reviews pilot contract | Clears enterprise SaaS agreement |

---

### Three Operational Buying Paths

In real enterprise sales, opportunities originate through three distinct organizational motions:

```
+-----------------------------------------------------------------------------------+
|                            THREE ENTERPRISE BUYING PATHS                          |
+-----------------------------------------------------------------------------------+
|  PATH A: SALES-LED            |  PATH B: OPERATIONS-LED      |  PATH C: FINANCE-LED       |
|  - Driver: Deal velocity      |  - Driver: Admin relief      |  - Driver: Tax & audit     |
|  - Champion: Field Mktg / EA  |  - Champion: EA / Admin Mgr  |  - Champion: Finance Ctrl  |
|  - Buyer: VP Sales / Partner  |  - Buyer: COO / BU Head      |  - Buyer: CFO / Controller |
|  - Fastest Pilot: Client dinner| - Fastest Pilot: Team dinner|  - Fastest Pilot: Spend aud|
+-----------------------------------------------------------------------------------+
```

#### Path A — Sales-Led (Fastest Commercial Path)
- **Origin / Entry Point:** Field Marketing Lead or VP of Sales facing high friction booking high-stakes client prospect dinners.
- **Champion:** Field Marketing Lead or Senior EA to VP Sales.
- **Economic Buyer:** VP Sales or Practice Leader (using discretionary departmental entertainment budget).
- **Gatekeepers:** Finance Controller (verifies basic invoicing).
- **Fastest Pilot Type:** 3-event validation pilot focused entirely on executive prospect dinners (10–20 pax).
- **Major Risk:** Sales leadership treats Relatia as a one-off concierge and does not embed it into ongoing operational policy.
- **Recommended Relatia Message:** *"Accelerate deal cycles with curated, private executive dining in Gurugram featuring pre-approved corporate billing and zero tableside awkwardness."*

#### Path B — Operations-Led (Highest User Adoption Path)
- **Origin / Entry Point:** Executive Assistant or Head of Office Administration overwhelmed by chaotic venue inquiries and lost receipts.
- **Champion:** Executive Assistant to Founder/MD or Office Operations Manager.
- **Economic Buyer:** Chief Operating Officer (COO), Chief of Staff, or Business Unit Leader.
- **Gatekeepers:** Finance Controller (tax review) and Procurement (basic vendor terms).
- **Fastest Pilot Type:** 3-event validation pilot covering upcoming leadership team dinners, visiting executive hospitality, and one client dinner.
- **Major Risk:** Executive Assistants love the tool, but lack political leverage to convince Finance to approve ongoing platform fees.
- **Recommended Relatia Message:** *"Eliminate 6+ hours of venue phone tag and receipt chasing with a centralized booking platform for pre-vetted corporate dining in Gurugram."*

#### Path C — Finance-Led (Highest Long-Term Contract Value)
- **Origin / Entry Point:** Finance Controller or Head of Tax struggling with month-end expense reconciliation and severe GST tax credit leakage.
- **Champion:** Finance Controller or Accounts Payable Lead.
- **Economic Buyer:** CFO or VP Finance.
- **Gatekeepers:** Procurement (formal onboarding) and Legal (data privacy review).
- **Fastest Pilot Type:** 3-event validation pilot with a single commercial team to test invoice delivery, SAC code compliance, and GSTR-2B matching.
- **Major Risk:** Slow, deliberate procurement review cycles that delay pilot kickoff by 60–90 days.
- **Recommended Relatia Message:** *"Enforce pre-spend policy limits and capture verified B2B GST tax invoice data on every corporate dinner without changing your core ERP."*

---

## 6. Persona Prioritization & Starting Interview Group

To prioritize outreach during Day 10–14 customer discovery, enterprise personas are scored across 7 operational criteria on a 1-to-5 scale (5 = highest attractiveness, 1 = lowest):

- **Pain Intensity:** Depth of frustration with current manual processes.
- **Frequency of Use:** Regularity of interaction with corporate dining workflows.
- **Purchase Influence:** Power to initiate, approve, or champion a pilot.
- **Pilot Accessibility:** Ease of engaging the persona for a low-friction pilot.
- **Urgency:** Immediate pressure to fix the problem this quarter.
- **Outreach Responsiveness:** Likelihood of responding to founder-led LinkedIn/email outreach.
- **Expansion Value:** Strategic importance for long-term contract renewal and expansion.

### Persona Prioritization Matrix

| Rank | Persona | Pain Intensity | Frequency | Purchase Influence | Pilot Access | Urgency | Outreach Response | Expansion Value | **Total (/35)** | Category |
|:---:|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| **#1** | **Executive Assistant (EA)** | 5 | 5 | 4 | 5 | 5 | 4 | 4 | **32** | Primary Outreach |
| **#2** | **Finance Controller** | 5 | 4 | 5 | 3 | 4 | 4 | 5 | **30** | Primary Outreach |
| **#3** | **Field Marketing Lead** | 4 | 4 | 4 | 4 | 4 | 5 | 4 | **29** | Primary Outreach |
| **#4** | **VP Sales / Practice Head** | 4 | 4 | 5 | 3 | 4 | 3 | 5 | **28** | Secondary Stakeholder |
| **#5** | **Office Operations Manager** | 4 | 4 | 3 | 4 | 4 | 4 | 3 | **26** | Secondary Stakeholder |
| **#6** | **Accounts Payable Lead** | 4 | 4 | 3 | 3 | 4 | 4 | 3 | **25** | Secondary Stakeholder |
| **#7** | **Sales Operations Lead** | 3 | 3 | 3 | 3 | 3 | 3 | 4 | **22** | Later-Stage Enterprise |
| **#8** | **Procurement Lead** | 3 | 2 | 4 | 2 | 2 | 2 | 4 | **19** | Later-Stage Enterprise |
| **#9** | **CFO / Country Head** | 4 | 2 | 5 | 1 | 3 | 1 | 5 | **21** | Later-Stage Enterprise |
| **#10**| **Legal / Compliance Counsel** | 2 | 1 | 4 | 2 | 2 | 2 | 3 | **16** | Later-Stage Enterprise |

---

### Top Three Recommended Interview Personas

For initial customer discovery in Gurugram, Relatia should interview these three personas first:

1. **Executive Assistant or Event/Office Operations Manager (Operational Champion):**
   - *Why first:* They execute the actual bookings today. They provide unvarnished truth about how venues are chosen, how many hours are wasted, what goes wrong on the floor, and how receipts are handled. They are easily accessible via LinkedIn and executive networks.
2. **Field Marketing Lead or Practice Lead (Commercial Budget Owner):**
   - *Why second:* They own the commercial outcome and event budget. They can validate event frequency, attendee numbers, willingness to pay, and whether client entertainment directly influences enterprise deal pipeline.
3. **Finance Controller or Accounts Payable Lead (Compliance & Invoicing Gatekeeper):**
   - *Why third:* They define the non-negotiable invoice, GST, and audit requirements. If Finance rejects the invoice flow, no pilot can survive. They validate whether GST tax data and reconciliation time savings are genuinely compelling value drivers.

---

## 7. Provider-Side Buying Map & Adoption Sequence

Hospitality providers represent the supply half of Relatia’s operating system. Their engagement requires understanding their distinct commercial and operational concerns:

| Provider Persona | Business Responsibility | Current Booking Workflow | Corporate Booking Pain | Revenue Concern | Operational Concern | Relatia Value | Primary Objection | Proof Required | Decision Authority | Adoption Risk |
|---|---|---|---|---|---|---|---|---|---|---|
| **Hotel Director of Sales / Banquet Mgr** | PDR & Banquet Revenue | Inbound calls, corporate emails, manual proposals | Low midweek PDR occupancy; payment chasing | Missing monthly F&B budget | Last-minute cancellations | High-margin corporate bookings on Tue–Thu | *"Why pay commission when we have direct accounts?"* | High-tier corporate client profile | Can approve PDR listing & rates | Deprioritizes app if guest spend is low |
| **Restaurant General Manager** | Floor operations & guest experience | Phone reservations, WhatsApp, floor diary | Chaotic table billing; last-minute menu changes | Unmet PDR minimum spend | Tableside credit card failures in front of VIPs | Pre-locked event briefs with discrete billing | *"My regular corporate guests already text me directly."* | Seamless floor workflow with zero extra admin | Can accept pilot bookings | Ignores platform if it complicates floor service |
| **Hospitality Financial Controller** | AR collection & tax invoicing | Manual billing against vouchers, 30-day invoices | Overdue corporate receivables (60+ days) | Bad debt from unverified corporate clients | Splitting food GST from liquor state excise | Guaranteed, pre-verified corporate billing data | *"We require direct bank transfer or credit card on the day."* | Clear settlement schedule & transparent fee terms | Full veto on payment/credit terms | Rejects if payment reconciliation is messy |

---

### Provider-Side Adoption Sequence

To onboard premium Gurugram and Aerocity venues without friction, Relatia follows an 8-step sequence:

```
[1. Outreach] -> [2. Qualification] -> [3. Venue Audit] -> [4. Commercials] -> [5. Tax Check] -> [6. Pilot Event] -> [7. Feedback] -> [8. Agreement]
```

1. **Initial Outreach:** Contact Corporate Events / Banquet Director highlighting curated enterprise demand for weekday PDRs.
2. **Operational Qualification:** Confirm dedicated private dining room capacity (10–30 seated pax) with acoustic isolation.
3. **Venue & Capacity Verification:** Physical walk-through to audit privacy, ambiance, and executive business suitability.
4. **Commercial & Cancellation Discussion:** Establish clear corporate set-menu pricing, minimum spend thresholds, and reasonable cancellation terms.
5. **Invoice & GST Capability Check:** Verify active GSTIN, capability to issue itemized B2B tax invoices showing client GSTIN, and correct SAC code (996331/996332) assignment.
6. **Pilot Booking:** Route an initial live corporate dinner request with pre-locked guest count, menu, and pre-approved billing.
7. **Post-Event Feedback:** Gather immediate debrief from restaurant manager and enterprise host regarding food quality, service, and billing execution.
8. **Decision on Continued Participation:** Formalize ongoing preferred partner listing based on mutual performance.

---

## 8. Pilot Persona Requirements (3-Event vs. 60-Day Expanded)

To align internal engineering benchmarks with enterprise sales reality, Relatia defines exact persona responsibilities across two pilot stages:

### Tier 1: Initial Three-Event Validation Pilot
- **Duration:** 14 to 30 days.
- **Scope:** 3 live corporate dining events (10–30 guests) hosted within a single commercial department in Gurugram.
- **System Integration:** Zero ERP integration required; operates as a secure, standalone web app with downloadable CSV/PDF tax records.
- **What is Tested:** Event request creation, manager approval routing, curated venue selection, booking coordination, test-mode payment/billing status, B2B tax invoice data generation, and post-event finance review.

### Tier 2: Expanded Sixty-Day Pilot
- **Duration:** 60 days.
- **Scope:** Up to 10 live events across 2–3 departments (e.g., Strategic Accounts Sales, Field Marketing, Executive Office).
- **What is Tested:** Cross-department user adoption, repeat booking velocity, month-end accounting reconciliation, provider operational consistency across multiple bookings, and enterprise willingness to transition to ongoing commercial terms.

---

### Persona Pilot Participation Matrix

| Persona | Role in 3-Event Validation Pilot | Role in Expanded 60-Day Pilot | Evidence Needed to Start | Success Signal | Failure Signal |
|---|---|---|---|---|---|
| **Executive Assistant** | Creates and submits event requests in web app; reviews venue options; coordinates guest dietary needs. | Primary ongoing user; submits all departmental hospitality requests. | Walkthrough of 5+ verified Gurugram PDR venues in app. | Confirms venue in <15 mins; zero post-event receipt hunting. | Reverts to WhatsApp booking because app lacks preferred venue. |
| **Field Marketing Lead** | Submits 1–2 prospect dinner requests; validates attendee experience. | Plans quarterly executive dinner series through platform. | Proof of curated luxury venues with transparent pricing. | Prospect dinner executed flawlessly; stays within budget. | Venue food/ambiance feels cheap or unsuited for CXOs. |
| **VP Sales / Practice Head** | Sponsors pilot; approves event budget requests within app. | Monitors team hospitality spend against quarterly pipeline goals. | Frictionless booking for their EA; zero client billing drama. | High praise from client guests; instant one-click approval. | Rep reports booking delay or client experienced venue service issue. |
| **Finance Controller** | Inspects generated B2B tax invoice data post-event. | Audits monthly corporate entertainment spend report and tax review data. | Sample invoice with correct GSTIN, SAC codes, and tax breakdown. | Invoices match company tax review requirements cleanly. | Invoices contain incorrect tax data or lack vendor GST compliance. |
| **Accounts Payable Lead** | Audits generated B2B invoices against GSTR-2B filing criteria. | Integrates monthly CSV data export into standard accounting entries. | Inspection of invoice fields and SAC code mapping. | Month-end reconciliation completed with zero missing receipts. | Manual corrections required on every single invoice. |
| **Hotel / Venue GM** | Fulfills pilot bookings; honors agreed minimum spend and menu. | Serves as preferred partner for recurring corporate bookings. | Confirmation of enterprise client profile and guaranteed spend. | Clean execution, positive guest feedback, timely settlement. | Corporate guests dispute agreed minimum spend or cancel late. |

---

## 9. Truthful Messaging Matrix

Every commercial statement made to prospects must reflect current operational reality. Relatia prohibits unverified claims:

| Persona | Main Concern | One-Sentence Value Message | Proof Point Relatia Can Support Today | Forbidden Claim to Avoid | Suggested Call to Action (CTA) |
|---|---|---|---|---|---|
| **Executive Assistant** | Wasting hours booking venues on phone/WhatsApp | *"Book vetted private dining rooms in Gurugram in minutes with pre-set corporate packages and zero receipt chasing."* | Working web directory of vetted venues with capacity, PDR, and price filters. | *"Our autonomous AI books your dinners automatically."* | *"Let's do a 10-minute demo to see our Gurugram private dining directory."* |
| **Field Marketing Lead** | Sourcing prestigious, private venues for prospect dinners | *"Host high-impact executive prospect dinners at top Gurugram venues with guaranteed privacy and transparent corporate billing."* | Curated luxury venue directory; pre-formatted corporate packages; budget tracking. | *"Guaranteed 30% increase in pipeline conversion."* | *"Review our curated venue collection for your next executive dinner."* |
| **VP Sales / Partner** | Embarrassing client moments and table-side billing | *"Entertain key enterprise clients with complete confidence—vetted private rooms, discreet billing, and zero expense report friction."* | Role-gated approvals; pre-approved budget workflows; structured billing state-machine. | *"Guaranteed venue availability at peak hours anywhere in India."* | *"Run a 3-event pilot with your team's upcoming client dinners."* |
| **Finance Controller** | Uncontrolled spend and GST tax credit leakage | *"Enforce pre-spend budget limits and capture verified B2B GST tax invoice data on every corporate dinner."* | Automated GST computation (CGST+SGST/IGST); valid SAC code (996331) assignment; exportable finance reports. | *"We guarantee 100% GST input tax credit recovery."* | *"Inspect a sample of our structured B2B tax invoice data."* |
| **Head of Tax / AP** | Missing receipts and GSTR-2B reconciliation headaches | *"Standardize dining expenses with itemized digital B2B tax invoices carrying your exact legal entity GSTIN."* | Deterministic GST state-matching logic; verified vendor tax data capture; downloadable PDF/CSV. | *"Our software eliminates all corporate tax audit risk."* | *"Review our tax data format against your monthly GSTR-2B requirements."* |
| **Procurement Lead** | Unvetted vendor proliferation and hidden markups | *"Consolidate corporate dining and entertainment spend into a single governed platform with transparent pass-through pricing."* | Single tenant-isolated software workflow; transparent pricing structures; auditable event logs. | *"We replace your entire travel and entertainment procurement system."* | *"Review our light 3-event validation pilot agreement."* |
| **Hotel Banquet Director** | Low midweek PDR occupancy and payment chasing | *"Fill your luxury private dining rooms on Tuesday through Thursday evenings with verified corporate accounts and pre-approved billing."* | Pre-approved corporate event briefs; guaranteed guest counts; structured billing records. | *"We guarantee 50 corporate bookings every month."* | *"Let's list your private dining rooms for our Gurugram enterprise cohort."* |

---

## 10. Objection Handling Framework

The following framework equips founder-led discovery with grounded, respectful responses:

### Enterprise Objections

#### 1. “We already use corporate credit cards.”
- **What it really means:** *"Our employees swipe their cards, and we deal with the paperwork later. Why add a software layer?"*
- **Respectful Response:** *"Corporate cards are great for paying, but they don't solve three operational problems: your assistants still waste hours playing phone tag to find private rooms, cards provide zero pre-spend budget control before the bill is swiped, and retail card slips frequently miss your company's GSTIN, leaving your finance team with tax reconciliation headaches."*
- **Proof / Next Step:** Show how Relatia captures pre-spend approval and delivers structured B2B tax invoice data before the event occurs.
- **When to stop pushing:** If the company has fewer than 20 employees and the CEO personally reviews every card charge.

#### 2. “Our assistants already have direct venue relationships.”
- **What it really means:** *"My EA has favorite restaurants and feels comfortable texting managers on WhatsApp. We don't want to disrupt that."*
- **Respectful Response:** *"We don't replace your assistants' judgment—we give them superpowers. Instead of calling 5 hotels and waiting hours for banquet quotes, Relatia lets them compare verified private dining availability in minutes, while automatically ensuring that finance gets a compliant tax invoice with zero receipt chasing."*
- **Proof / Next Step:** Offer a 10-minute side-by-side test: have the EA search for a 15-pax PDR on Relatia versus manual calling.
- **When to stop pushing:** If the EA is fiercely protective of personal relationship perks and refuses to look at a software interface.

#### 3. “Finance does not want another software tool.”
- **What it really means:** *"We have SaaS fatigue and don't want another disconnected subscription."*
- **Respectful Response:** *"We completely agree—Finance shouldn't have to manage another complex system. That's why during our 3-event pilot, there is zero software integration required. Finance simply receives clean, downloadable B2B tax invoice data with correct GSTIN and SAC codes that drop directly into their existing month-end spreadsheet."*
- **Proof / Next Step:** Share a 1-page sample of Relatia’s downloadable invoice and tax summary report.
- **When to stop pushing:** If the CFO has instituted an absolute freeze on all new vendor onboarding.

#### 4. “We need SAP / Oracle / NetSuite integration first.”
- **What it really means:** *"We won't adopt this company-wide unless it connects directly to our enterprise ERP."*
- **Respectful Response:** *"Deep ERP connectors are on our production roadmap for enterprise scale. However, fast-moving teams run our 3-event pilot as a standalone workflow using clean CSV data exports for month-end journal entries, allowing you to validate the operational and tax benefits before committing IT resources to custom integrations."*
- **Proof / Next Step:** Demonstrate the one-click CSV export format formatted for standard ERP journal entry mapping.
- **When to stop pushing:** If corporate IT policy strictly prohibits any operational spending without pre-existing API-level ERP integration.

#### 5. “We cannot change our procurement process.”
- **What it really means:** *"Our procurement process takes 6 months, and I don't want to initiate an RFP for a test."*
- **Respectful Response:** *"Our 3-event validation pilot is specifically designed to operate under discretionary departmental spending thresholds without requiring full enterprise vendor empanelment. It lets you test the workflow across 3 events with zero long-term commitment."*
- **Proof / Next Step:** Provide a lightweight, short-form pilot agreement with clear boundaries and zero auto-renewal.
- **When to stop pushing:** If procurement mandates a public tender or formal RFP even for a 3-event pilot.

#### 6. “We do not organize enough events to justify software.”
- **What it really means:** *"We only host occasional dinners; the pain isn't acute enough."*
- **Respectful Response:** *"That is helpful context. If your company hosts fewer than one or two executive dinners a month, a dedicated operating system may not be necessary right now. How often do your sales or leadership teams entertain external clients across all departments?"*
- **Proof / Next Step:** Ask if other departments (e.g., Marketing or Consulting practice groups) host dinners independently.
- **When to stop pushing:** If confirmed event volume across the entire entity is under 1 event per quarter. Disqualify account immediately.

#### 7. “We do not want Relatia handling payments.”
- **What it really means:** *"We don't trust a new startup to handle escrow or intermediate large corporate cash flows."*
- **Respectful Response:** *"That is completely understandable. Relatia's core value is workflow governance, venue discovery, and tax invoice data capture. Payment processing can be structured via direct corporate billing from the venue or your existing corporate card, with Relatia providing the orchestration and invoice compliance layer."*
- **Proof / Next Step:** Clarify that Relatia supports direct payment models during pilot validation.
- **When to stop pushing:** Never an objection that kills a deal—accommodate their preferred payment flow.

#### 8. “Our vendors already invoice us directly.”
- **What it really means:** *"We receive bills from hotels; what is the difference?"*
- **Respectful Response:** *"Hotels do issue bills, but when employees dine across multiple independent restaurants, invoices frequently come back with missing corporate GSTINs, incorrect state tax splits, or illegible thermal slips. Relatia ensures pre-verified corporate tax details are locked before dining, so every bill is audit-ready on day one."*
- **Proof / Next Step:** Review 5 of their historical restaurant bills from employee expense claims to identify tax errors.
- **When to stop pushing:** If the company already has a centralized, flawless direct-billing master contract with every venue they visit.

#### 9. “GST recovery is not our priority.”
- **What it really means:** *"Our finance team writes off dining GST anyway; we care about other things."*
- **Respectful Response:** *"Understood. Many high-growth firms focus primarily on the 15+ hours their executive assistants waste on phone coordination, or the risk of client embarrassment from poor venue acoustics and awkward tableside bill payments. If tax reconciliation isn't your bottleneck, does saving your team 6 hours per event matter?"*
- **Proof / Next Step:** Pivot discovery focus entirely to executive time savings and venue privacy standards.
- **When to stop pushing:** If neither tax, time savings, nor venue curation resonate. Disqualify account.

#### 10. “We need proof of customer references.”
- **What it really means:** *"You are an early-stage company, and I don't want to be your guinea pig."*
- **Respectful Response:** *"That is a fair concern. That is exactly why we run a structured 3-event validation pilot. We don't ask for an annual enterprise commitment upfront. We invite you to test the workflow on 3 real events in Gurugram, evaluate the attendee feedback and tax data firsthand, and decide based on your own experience."*
- **Proof / Next Step:** Offer founder-level operational oversight for all 3 pilot events.
- **When to stop pushing:** If company policy strictly forbids partnering with software vendors younger than 3 years.

#### 11. “We cannot involve legal for a small pilot.”
- **What it really means:** *"Our legal team takes 8 weeks to review anything; involving them kills this initiative."*
- **Respectful Response:** *"Understood. Our 3-event pilot is framed as a simple, non-exclusive trial letter that operates within standard departmental entertainment guidelines without altering your existing master corporate policies."*
- **Proof / Next Step:** Provide a simple 1-page pilot confirmation letter.
- **When to stop pushing:** If internal policy requires legal sign-off even for discretionary restaurant bookings.

#### 12. “This sounds like a concierge service, not software.”
- **What it really means:** *"Are you just an event agency disguised as a tech startup?"*
- **Respectful Response:** *"Relatia is an operating system with software-enforced policy limits, role-gated approval workflows, state-machine event tracking, and deterministic GST calculation logic. While our founders provide high-touch operational support during early pilot onboarding, the entire workflow—from request to invoice generation—runs on verified code."*
- **Proof / Next Step:** Give the buyer a direct interactive walkthrough of the internal software dashboard.
- **When to stop pushing:** If the buyer genuinely wants an offline event agency to handle decor, staging, and entertainment production.

---

### Hospitality Provider Objections

#### 1. “We already receive corporate bookings directly.”
- **What it really means:** *"We don't need another channel taking a cut of our existing regular diners."*
- **Respectful Response:** *"We don't target your regular weekend leisure diners. Relatia specifically drives incremental corporate client dinners on Tuesday through Thursday evenings—filling high-minimum-spend Private Dining Rooms when retail walk-in demand is lowest."*
- **Proof / Next Step:** Propose listing only underutilized private rooms for weekday corporate bookings.
- **When to stop pushing:** If the venue's PDRs are consistently 100% booked on Tuesday through Thursday evenings.

#### 2. “We do not want to pay commission.”
- **What it really means:** *"Our F&B margins are tight; we refuse to give up 15–20% like food delivery apps."*
- **Respectful Response:** *"We are not a consumer discount app. Our enterprise bookings feature guaranteed minimum spends and high average order values. Our commercial fee is modest, performance-based, and applies only to verified completed corporate events that we bring to your room."*
- **Proof / Next Step:** Share transparent commercial terms with no fixed listing or monthly subscription fees.
- **When to stop pushing:** If venue policy strictly prohibits third-party partner commissions under any circumstances.

#### 3. “We cannot guarantee private room availability.”
- **What it really means:** *"We might get a high-paying VIP walk-in or private party, and we don't want to be locked in."*
- **Respectful Response:** *"Relatia does not force instant, automated room confirmation. Every event request routed through our platform requires your explicit operational confirmation. You retain full control over your room inventory at all times."*
- **Proof / Next Step:** Demonstrate the venue acceptance and confirmation workflow.
- **When to stop pushing:** If the venue refuses to hold reservations even after accepting a corporate booking request.

#### 4. “We do not want complex invoice requirements.”
- **What it really means:** *"Our night audit staff cannot deal with custom accounting systems."*
- **Respectful Response:** *"You don't need any new software at your front desk. Relatia delivers the client's verified corporate legal entity name, GSTIN, and billing address before the dinner begins, making it easier for your cashier to generate the standard B2B tax invoice you already produce."*
- **Proof / Next Step:** Show a sample corporate billing brief that is delivered to the venue before the event.
- **When to stop pushing:** If the venue is an informal restaurant that operates exclusively on cash/retail receipts and cannot issue B2B tax invoices. Disqualify immediately.

#### 5. “Our payment terms are different.”
- **What it really means:** *"We require 100% advance deposit or credit card swipe at the end of the evening; we do not offer 60-day credit."*
- **Respectful Response:** *"Relatia supports immediate corporate payment settlement and pre-authorized card holds. We do not ask venues to extend uncollateralized 60-day credit to unknown corporate accounts."*
- **Proof / Next Step:** Align on mutually acceptable pre-payment or day-of-event settlement terms.
- **When to stop pushing:** If the venue insists on non-standard cash-only settlement.

#### 6. “We do not want another platform or tablet on our counter.”
- **What it really means:** *"Our staff already juggles Zomato, Swiggy, and POS terminals; we don't want another tablet."*
- **Respectful Response:** *"Relatia requires zero hardware or tablets at your restaurant. All booking requests and event briefs are delivered directly via email and WhatsApp to your dedicated banquet sales manager."*
- **Proof / Next Step:** Confirm communication runs through existing email and phone channels.
- **When to stop pushing:** Never an issue once no-hardware workflow is explained.

#### 7. “We need minimum spend protection.”
- **What it really means:** *"If a corporate booking doesn't spend their promised amount, who pays the difference?"*
- **Respectful Response:** *"Relatia strictly enforces documented minimum spend agreements. If a corporate client reserves a private dining room with a ₹75,000 minimum spend, that commitment is locked in the event brief and billed accordingly, regardless of whether their final consumption falls short."*
- **Proof / Next Step:** Show minimum spend clause in the standard event booking agreement.
- **When to stop pushing:** Never an issue—this aligns directly with Relatia's structured policy workflow.

#### 8. “We cannot support last-minute menu changes.”
- **What it really means:** *"Guests change their minds at the table, creating chaos in the kitchen."*
- **Respectful Response:** *"Relatia captures all dietary requirements, guest numbers, and menu package selections at least 48 hours prior to the event, giving your chef complete predictability before service begins."*
- **Proof / Next Step:** Show structured dietary preference intake fields in the event request form.
- **When to stop pushing:** Standard operational alignment.

---

## 11. Discovery Interview Guide

To ensure interviews yield empirical behavioral data rather than polite opinions, interviewers must adhere to two golden rules:
1. **Never lead with the solution:** Do not pitch Relatia in the first 20 minutes.
2. **Anchor on past behavior:** Ask about the *last real event*, not hypothetical preferences.

---

### Guide 1: Operational Users (Executive Assistants & Office Operations)

```
[Opening Script]
"Thank you so much for taking 20 minutes today. We are conducting research on how mid-market and enterprise companies in Delhi–NCR coordinate executive client dining and corporate hospitality. We are not selling any services or software today. We want to understand the real day-to-day workflow, where the headaches are, and what actually happens from the moment someone asks for a dinner until the final receipt is cleared."
```

#### Core Questions
1. *"Think back to the last private client or executive dinner you organized for your leadership team. When was it, how many people attended, and where was it held?"*
2. *"Walk me through the exact steps you took from the moment your executive said 'book a dinner' to when the venue was confirmed."*
3. *"How many different venues did you call or message on WhatsApp before locking in that booking?"*
4. *"How did you ensure that the room was acoustically private and appropriate for confidential conversations?"*
5. *"How did you handle dietary preferences or custom menu selections for that dinner?"*
6. *"How was payment handled on the night of the dinner? Did an executive use a personal card, a corporate card, or did the hotel invoice you?"*
7. *"What happened after the dinner when you had to submit the bill to finance? Were there any missing details or rejected receipts?"*
8. *"Roughly how many hours of your working time did that entire coordination take across the week?"*
9. *"What was the most stressful or frustrating part of that entire process?"*
10. *"If you had a trusted dashboard where you could see pre-vetted private dining rooms in Gurugram with clear corporate packages and automatic tax invoice delivery, would that be something you would want to test on your next dinner?"*
11. *"Who in your organization would need to approve trying that on a single dinner?"*

---

### Guide 2: Sales and Field Marketing Leaders (Commercial Budget Owners)

```
[Opening Script]
"Thanks for your time today. We're researching how B2B technology, consulting, and advisory firms in Delhi–NCR use executive dining and client entertainment to accelerate deal pipelines. We are not pitching software today. We want to understand how client hospitality is budgeted, executed, and measured in high-stakes commercial motions."
```

#### Core Questions
1. *"How important is face-to-face executive dining or private prospect dinners to your enterprise sales and deal closing motion?"*
2. *"On average, how many client dinners, partner dinners, or executive prospect roundtables does your team host each month?"*
3. *"Think about a recent client dinner that went exceptionally well—what made that venue and experience work?"*
4. *"Have you ever experienced an awkward or embarrassing situation at a client dinner regarding service, privacy, acoustics, or billing at the table?"*
5. *"How are budgets for client entertainment approved before the dinner happens? Is there a strict per-head cap, or does the lead executive have discretion?"*
6. *"What is your typical spend range per head for an executive client dinner in Gurugram or Delhi?"*
7. *"How do your sales reps or field marketers currently source venues? Do they use agencies, personal contacts, or do assistants handle it?"*
8. *"How does client entertainment spend get attributed back to commercial pipeline or revenue in your reporting?"*
9. *"What friction do your teams experience with Finance when submitting entertainment expense claims?"*
10. *"If we could give your team access to vetted private dining rooms with pre-approved corporate billing so your sales reps never have to swipe a personal card or handle a bill in front of a client, would you sponsor a 3-event test?"*
11. *"What proof would you need to see before letting us coordinate your next executive dinner?"*

---

### Guide 3: Finance Controllers and Tax Leads (Compliance & Accounting Gatekeepers)

```
[Opening Script]
"Thank you for speaking with us. We are researching corporate spend governance, expense reconciliation, and GST tax credit compliance around corporate dining and entertainment in Indian mid-market enterprises. We want to understand the real accounting bottlenecks during month-end close."
```

#### Core Questions
1. *"Roughly how much does your organization spend annually on corporate dining, client entertainment, and executive hospitality in India?"*
2. *"When employees submit expense claims for restaurant dining, what percentage of the bills come in as proper B2B GST tax invoices versus retail credit card POS slips?"*
3. *"How does your team currently handle dining expenses where the invoice is missing your company's exact legal entity name or state GSTIN?"*
4. *"Do you actively claim GST Input Tax Credit on qualifying corporate dining and banquet expenses, or do you find yourself writing off significant tax amounts due to non-compliant vendor receipts?"*
5. *"How does your accounting team handle interstate versus intrastate dining GST when an employee from your Mumbai office entertains in Gurugram?"*
6. *"How many days does it take your Accounts Payable team to reconcile dining expenses and corporate card charges during month-end close?"*
7. *"How are entertainment budgets enforced today? Does your system stop an employee from booking over-budget before the spend happens, or do you only find out post-facto?"*
8. *"What specific data fields must a platform capture on a dining transaction for your team to accept it without manual auditing?"*
9. *"If Relatia provided pre-spend budget enforcement and delivered structured B2B GST tax invoice data for every corporate dinner, what would that save your team in time and audit risk?"*
10. *"What financial or statutory reporting would your team need to see to approve a 3-event validation pilot?"*

---

### Guide 4: Procurement and Legal Stakeholders (Contract Gatekeepers)

```
[Opening Script]
"Thanks for taking the time. We are investigating how corporate procurement and legal teams evaluate vendor consolidation and risk governance for corporate hospitality and event services."
```

#### Core Questions
1. *"How does your organization currently manage vendor empanelment for corporate hospitality, hotels, and restaurants?"*
2. *"What are your standard threshold limits for running a low-risk, 30-day software pilot without triggering a mandatory 6-month RFP or procurement audit?"*
3. *"What are your mandatory compliance, data privacy, and legal requirements for onboarding a cloud-based operational workflow tool?"*
4. *"How do you currently ensure that client entertainment spending complies with corporate ethics and anti-bribery policies?"*
5. *"What contract terms or liability clauses would be deal-breakers for a pilot agreement?"*
6. *"What is the fastest way for a business unit leader to get approval for an exploratory 3-event software pilot?"*

---

### Guide 5: Executive Sponsors (CFO / COO / Country Head)

```
[Opening Script]
"Thank you for your time. We are conducting executive research with C-suite leaders on how Indian enterprises govern relationship-driven entertainment spend and operational overhead."
```

#### Core Questions
1. *"From a high level, how do you view corporate dining and client entertainment—as an unavoidable sales enablement cost, an unmanaged leak, or a strategic relationship driver?"*
2. *"Are you satisfied with the level of visibility you have into entertainment spending across different business units?"*
3. *"How concerned is your leadership team about tax audit exposure and GST compliance around undocumented hospitality expenses?"*
4. *"If an operational platform could deliver complete spend governance, eliminate administrative coordination waste, and capture structured tax data across all corporate hospitality, is that a strategic priority for your leadership team this year?"*
5. *"What milestone results would you expect to see from a 60-day pilot before considering a company-wide operational rollout?"*

---

### Guide 6: Hospitality Providers (Banquet Directors & General Managers)

```
[Opening Script]
"Thank you for meeting with us. We are researching corporate dining demand patterns in Gurugram and Delhi–NCR. We are exploring how premier venues manage corporate private dining room bookings and B2B billing."
```

#### Core Questions
1. *"What percentage of your private dining room revenue comes from corporate client entertaining versus retail family dining?"*
2. *"Which days of the week are your private dining rooms underutilized, and what is your typical occupancy on Tuesday and Wednesday evenings?"*
3. *"What is your standard minimum spend threshold for booking a 15–20 guest private dining room on a weekday evening?"*
4. *"What are the biggest operational headaches your team encounters when dealing with corporate bookings (e.g., cancellations, dietary changes, payment vouchers)?"*
5. *"How do you currently handle corporate guests who demand a customized B2B tax invoice with specific corporate GSTIN numbers during a busy dinner shift?"*
6. *"What percentage of corporate receivables end up delayed beyond 30 days when companies pay on credit vouchers?"*
7. *"If Relatia brought you pre-verified corporate bookings with locked guest counts, pre-set menus, guaranteed minimum spends, and automated billing, would you welcome those bookings on a performance-fee basis?"*
8. *"What would prevent you from listing your private dining rooms for an initial cohort of Gurugram enterprise clients?"*

---

## 12. Persona Validation Register

All persona assumptions are tracked dynamically in the following register. A persona is only considered **Provisionally Validated** once at least 5 independent interviews confirm the core pain, buying authority, and pilot willingness.

| Persona ID | Persona Name | Core Assumption to Validate | Evidence Required | Target Interviews | Current Evidence | Validation Status | Next Immediate Action |
|---|---|---|---|:---:|---|:---:|---|
| **PER-01** | Executive Assistant | EAs spend 4–8 hours per event playing phone tag; acute pain around PDR acoustics and lost receipts. | 5 independent interviews confirming manual coordination waste and enthusiasm for a curated PDR tool. | 5 | Codebase workflows implemented; market desk analysis. | **Unvalidated** | Conduct 5 interviews with Gurugram tech/consulting EAs. |
| **PER-02** | Field Marketing Lead | Field marketers have discretionary budgets for ABM dinners; struggle with venue curation and advance deposits. | 5 interviews confirming quarterly dinner frequency and willingness to use a standalone booking platform. | 5 | Desk research; segment scoring. | **Unvalidated** | Interview 5 B2B SaaS field marketers in Gurugram. |
| **PER-03** | Sales Operations Lead | Sales Ops actively seeks pre-spend governance to stop rogue card swipes and attribute entertainment to CRM deals. | 5 interviews confirming demand for pre-approval workflows over client dining. | 5 | Policy limit rules in app code. | **Unvalidated** | Interview 3 RevOps leaders in mid-market SaaS. |
| **PER-04** | Office Operations Mgr | Admin teams want to delegate venue booking while maintaining visibility over team dinner budgets. | 5 interviews validating that office managers manage ad-hoc dining requests manually. | 5 | Desk research. | **Unvalidated** | Interview 3 facilities/admin managers. |
| **PER-05** | VP Sales / Practice Head | Commercial leaders will sponsor a pilot to avoid client embarrassment and tableside card swipes. | 5 interviews confirming client dining importance and pilot sponsorship authority. | 5 | Wedge strategy analysis. | **Unvalidated** | Interview 5 commercial leaders in consulting/tech. |
| **PER-06** | Finance Controller | Finance views GST tax credit leakage and manual invoice chasing as a major month-end bottleneck. | 5 interviews confirming that missing GSTIN on dining bills causes material friction and audit concern. | 5 | Tax calculation engine in app code. | **Unvalidated** | Interview 5 Finance Controllers in Gurugram. |
| **PER-07** | Head of Tax / AP Lead | AP teams spend hours reconciling food vs. alcohol taxes and chasing revised B2B invoices. | 5 interviews confirming GSTR-2B matching failures on employee hospitality claims. | 5 | B2B invoice generation in app code. | **Unvalidated** | Interview 3 AP/Tax managers. |
| **PER-08** | Procurement Lead | Procurement will permit a 3-event validation pilot under discretionary spending thresholds. | 3 interviews confirming lightweight pilot onboarding paths. | 3 | Segment barrier analysis. | **Unvalidated** | Schedule 3 enterprise procurement discovery calls. |
| **PER-09** | CFO / Country Head | C-suite views corporate entertainment as an unmanaged spend category needing executive governance. | 3 executive interviews confirming interest in enterprise spend analytics. | 3 | Business foundation analysis. | **Unvalidated** | Engage 3 CFOs via founder network. |
| **PER-10** | Legal & Compliance | Compliance requires documented attendee logs and business justifications to satisfy anti-bribery policies. | 3 interviews reviewing Relatia's event audit trail structure. | 3 | Audit trail features in app code. | **Unvalidated** | Review compliance questions with corporate counsel. |
| **PER-11** | Hotel Banquet Director | Luxury hotels will welcome weekday corporate PDR bookings and accept performance-based commercial terms. | 5 interviews with Gurugram/Aerocity hotel banquet directors. | 5 | Partner onboarding mockups in codebase. | **Unvalidated** | Walk in to 5 hotel sales offices in Gurugram/Aerocity. |
| **PER-12** | Restaurant General Mgr | Fine-dining GMs want pre-locked corporate briefs to eliminate floor service and tableside billing friction. | 5 interviews with standalone fine-dining GMs. | 5 | Curated venue directory in app code. | **Unvalidated** | Interview 5 GMs in Cyber Hub and Horizon Centre. |
| **PER-13** | Hospitality Finance Lead | Venue finance will accept pre-verified corporate billing details and prompt settlement terms. | 3 interviews with hotel/restaurant finance controllers. | 3 | Razorpay webhook architecture in app code. | **Unvalidated** | Interview 3 hospitality finance leads. |

> **Validation Note:** Five interviews do not prove the entire market. They provide the minimum necessary qualitative signal to decide whether to proceed with, adjust, or abandon an operational hypothesis before committing engineering and sales capital.

---

## 13. Anti-Personas (Who We Do Not Prioritize)

To maintain disciplined focus and prevent capital misallocation, Relatia explicitly disqualifies the following profiles during Phase 1:

1. **The Casual Startup Organizer (Budget <₹1,500/head):**
   - *Profile:* Early-stage startup office manager organizing ad-hoc Friday beer-and-pizza outings.
   - *Why Disqualified:* Highly price-sensitive, zero private dining room demand, negligible GST tax recovery upside, zero willingness to pay platform or SaaS fees.
2. **The Infrequent Diner (<1 event per quarter):**
   - *Profile:* Companies that only host an annual Diwali party and one off-site per year.
   - *Why Disqualified:* Inability to generate recurring usage, learn the software, or justify operational onboarding.
3. **The Bureaucratic Giant (Mandatory 9-Month RFP for Pilots):**
   - *Profile:* Ultra-large public sector undertakings (PSUs) or rigid legacy conglomerates requiring formal government tenders and mandatory on-premise deployments.
   - *Why Disqualified:* Paralyzing sales cycles that burn early-stage startup runway before a single transaction occurs.
4. **The "ERP Integration Day 1" Hardliner:**
   - *Profile:* IT-dominated enterprise that forbids any software trial unless bi-directional SAP/Oracle API synchronization is already live.
   - *Why Disqualified:* Relatia’s ERP connectors are on the future production roadmap; fighting for custom enterprise IT integration on Day 1 stalls pilot velocity.
5. **The Magic AI Seeker:**
   - *Profile:* Enterprise buyers expecting autonomous voice AI agents that negotiate room rates and plan events with zero human review.
   - *Why Disqualified:* Relatia provides deterministic, reliable policy governance and structured workflows, not speculative autonomous LLM agents.
6. **The Uncooperative Venue (Refuses B2B Invoicing):**
   - *Profile:* Popular informal restaurants that operate exclusively on retail cash/card POS slips and refuse to issue formal B2B tax invoices with customer GSTIN.
   - *Why Disqualified:* Destroys Relatia’s core tax compliance value proposition for enterprise finance teams.
7. **The Account with No Pilot Owner:**
   - *Profile:* Enterprise where everyone agrees the problem exists, but no single individual has the budget or operational authority to run a 3-event test.
   - *Why Disqualified:* Endless politely stalling meetings with zero path to commercial contract.

---

## 14. Decisions Still Requiring Founder Validation

The following fundamental commercial and operational questions remain unresolved and must be answered through upcoming Day 10–14 customer discovery:

1. **Who is the True First Buyer?**
   - *Hypothesis A:* Sales/Field Marketing (driven by deal closing velocity and luxury venue prestige).
   - *Hypothesis B:* Operations/Executive Assistants (driven by acute daily administrative relief).
   - *Hypothesis C:* Finance Controllers (driven by GST tax credit leakage and audit risk).
   - *Validation Plan:* Assess which persona converts fastest to a 3-event validation pilot agreement.
2. **Software SaaS vs. Managed Coordination vs. Hybrid?**
   - Does the initial enterprise customer view Relatia purely as self-serve software, or do they expect white-glove concierge coordination behind the platform during early pilots?
3. **Is Finance a True Co-Buyer or Merely a Passive Gatekeeper?**
   - Does Finance actively allocate budget to purchase Relatia to stop tax leakage, or do they only approve spend when Sales or Operations brings the request to them?
4. **Monetization Mechanics (Who Pays?):**
   - *Model 1:* Enterprise pays a recurring SaaS subscription or per-event platform convenience fee; venues pay zero commission.
   - *Model 2:* Enterprise uses software for free; hospitality providers pay a 5%–10% performance commission on completed corporate bookings.
   - *Model 3 (Hybrid):* Enterprise pays a nominal platform fee for tax governance software; venues pay a standard performance commission for incremental weekday corporate demand.
5. **Initial Pilot Pricing:**
   - Should the 3-event validation pilot be completely free for the corporate client (to minimize friction and maximize operational learning), or should we charge a nominal fee (e.g., ₹10,000–₹25,000) to immediately validate commercial willingness-to-pay?
6. **Alcohol Billing Separation:**
   - Because state excise laws in Delhi and Haryana regulate alcohol outside the GST regime, will enterprise finance teams accept unified platform invoicing, or must alcohol spend be settled directly with the venue via a dedicated billing protocol?
