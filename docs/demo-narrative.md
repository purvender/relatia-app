# Relatia — End-to-End Enterprise Demo Narrative

> **Target Audience**: CFOs, VPs of Sales / Strategic Accounts, Heads of Administration, Executive Assistants, and Venue Directors.  
> **Duration**: 15–20 minutes  
> **Objective**: Demonstrate how Relatia transforms chaotic corporate dining and entertainment into a governed, high-ROI, GST-compliant relationship driver.

---

## 🎬 Narrative Arc Overview

```
[Act 1: The Problem & Event Creation] ──→ [Act 2: 1-Click Governance & Approval]
                     │
                     ▼
[Act 3: Curated Venue Selection] ───────→ [Act 4: Payment Escrow & GST Invoice]
                     │
                     ▼
[Act 5: Spend Intelligence & Strategic Close]
```

---

## Act 1: The Pain Point & Event Creation (Minutes 0–4)
**Speaker Persona**: Executive Assistant / Enterprise Event Planner  
**Primary Screen**: `/events/new`

### Script & Walkthrough:
1. **The Context**:
   > *"Every month, our enterprise hosts critical client dinners—welcoming key accounts, closing quarterly renewals, or hosting board members. Today, this process is broken. It involves 15 WhatsApp messages, 3 banquet phone calls, forgotten dietary restrictions, and zero upfront budget visibility."*

2. **The In-Product Action**:
   * Navigate to `http://localhost:3000/events/new`.
   * Create an event: **"Q3 Strategic CXO Dinner — Tata Consultancy Services"**.
   * Set Date & Time: Upcoming Thursday, 7:30 PM.
   * Headcount: 8 guests.
   * Client Tier: **Tier 1 (Strategic Enterprise Account)**.
   * Enter Budget: ₹72,000 (INR).
   * Dietary Notes: *"2 Jain guests (strictly separate preparation), 1 Nut allergy"*.
   * Click **"Submit for Approval"**.

3. **Key Takeaway**:
   * Event state immediately transitions to `REQUESTED`.
   * The budget cap is locked and policy validation is triggered before any money is committed.

---

## Act 2: Contextual Multi-Tier Approval (Minutes 4–7)
**Speaker Persona**: VP of Strategic Sales / Approver  
**Primary Screen**: `/dashboard/approvals`

### Script & Walkthrough:
1. **The Context**:
   > *"Usually, business leaders rubber-stamp expenses weeks later when credit card statements arrive. Relatia shifts approval upstream—giving the leader instant context before the reservation is made."*

2. **The In-Product Action**:
   * Navigate to `http://localhost:3000/dashboard/approvals`.
   * Open the newly submitted request **#REQ-8821**.
   * Highlight the context card:
     * **Host**: Ananya Sharma (VP Strategic Sales)
     * **Account Value**: ₹4.8 Cr active pipeline
     * **Per-Head Cost**: ₹9,000 / head (Compliant with Tier-1 ceiling of ₹12,000)
     * **Department Budget Remaining**: ₹3,40,000
   * Click **"Approve Event"**.

3. **Key Takeaway**:
   * State updates atomically to `APPROVED`.
   * An immutable audit log records the approver, timestamp, and policy threshold check.

---

## Act 3: Curated Venue Discovery & Lock (Minutes 7–10)
**Speaker Persona**: Host / Event Planner  
**Primary Screen**: `/venues` & `/events/[id]`

### Script & Walkthrough:
1. **The Context**:
   > *"Now that the budget is approved, where do we go? We need a private room with certified acoustics for confidential discussions and guaranteed minimum spends without awkward negotiation."*

2. **The In-Product Action**:
   * Navigate to `http://localhost:3000/venues`.
   * Filter by city (**Mumbai — BKC / South Mumbai**) and private dining room availability.
   * Select **"The Library Bar & Private Salon — The Leela Palace"**.
   * Note the pre-negotiated corporate terms:
     * Capacity: 12 pax private salon
     * Minimum Spend: ₹65,000 (Within our approved ₹72,000 budget)
     * Dietary certification: Dedicated Jain preparation protocols active
   * Click **"Confirm Venue Selection"** on the event page.

3. **Key Takeaway**:
   * Atomic transition from `APPROVED` → `VENUE_SELECTED`.
   * Exactly one `Booking` record is created, locking in the venue assignment.

---

## Act 4: Payment Escrow, GST Invoicing & Reconciliation (Minutes 10–15)
**Speaker Persona**: Finance Controller & Tax Lead  
**Primary Screen**: `/dashboard/finance` & `/dashboard/finance/invoices/[id]`

### Script & Walkthrough:
1. **The Context**:
   > *"This is where CFOs fall in love with Relatia. Typically, an employee swipes a credit card, loses the receipt, and the company leaves 18% GST tax credit on the table. With Relatia, every rupee is reconciled."*

2. **The In-Product Action**:
   * Navigate to `http://localhost:3000/dashboard/finance`.
   * Show the real-time financial ledger table:
     * Event Title & Date
     * Invoice Number (`REL-2026-INV-XXXX`)
     * Vendor GSTIN & Client GSTIN
     * Taxable Amount, CGST (9%), SGST (9%), Total Amount
   * Open the detailed invoice view: `/dashboard/finance/invoices/[id]`.
   * Point out the **SAC Code 996331** (Restaurant and catering services) ensuring 100% GSTR-2B compliance.
   * Trigger payment via the **Razorpay Pay Button**:
     * In test/demo mode: Instant mock or live `rzp_test_` checkout modal.
     * Webhook automatically receives `payment.captured` signature.
     * Status updates: `paymentStatus = PAID`, `invoiceStatus = PAID`, `eventStatus = BOOKED`.

3. **Key Takeaway**:
   * Zero expense reports filed.
   * Instant tax credit capture saving up to 18% directly on bottom-line event spend.
   * Single-point Razorpay virtual card or centralized corporate escrow settlement.

---

## Act 5: Spend Intelligence & Closing Pitch (Minutes 15–18)
**Speaker Persona**: Founder / Solutions Director  
**Primary Screen**: `/` (Public Platform & Analytics Showcase)

### Script & Walkthrough:
1. **The Closing Value**:
   > *"Relatia isn't just an administrative tool; it turns relationship spend into a strategic competitive weapon. You know exactly what you spend per client, which venues accelerate deal closing, and your finance team operates with zero manual reconciliations."*

2. **Next Steps for Enterprise Pilot**:
   * 48-hour pilot onboarding.
   * Upload current travel & entertainment policy thresholds.
   * Single Sign-On (SSO) directory provisioning.

---

## 💡 Quick Reference: Frequently Asked Questions During Demos

| Question | Recommended Answer |
| :--- | :--- |
| **"Can we connect this to SAP or Oracle NetSuite?"** | Yes. Relatia's finance data model exports clean ledger vouchers with standard GL account mapping and matching GST tax codes. |
| **"What if our executives already use corporate Amex cards?"** | Relatia supports dual-mode: central billing through Razorpay escrow, or corporate card tracking with automated invoice reconciliation. |
| **"Are dietary restrictions communicated to the kitchen directly?"** | Yes. The partner portal provides banquet and kitchen teams with a structured guest profile card highlighting allergies and prep protocols. |
| **"Is our company data stored in India?"** | Yes. Relatia stores all company, financial, and attendee data in Tier-4 Indian data centers in full compliance with the Digital Personal Data Protection (DPDP) Act. |
