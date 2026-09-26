# Relatia Discovery — Consent, Privacy, and Data Handling Protocol

> **Document Classification:** Internal Research Compliance Protocol & Operational Security Standard  
> **Status:** Active Standard — Day 10 Step 4  
> **Scope:** Applies to all customer discovery interviews, notes, outreach logs, and stakeholder correspondence for Relatia.  
> **Related Documents:**
> - [Discovery Outreach Playbook](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-discovery/discovery-outreach-playbook.md)
> - [Interview Notes Template](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-discovery/interview-notes-template.md)
> - [Evidence Register](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-discovery/evidence-register.md)

---

## 1. Principles of Responsible Customer Discovery

Relatia conducts customer research to understand operational workflows, budget governance, and tax reconciliation friction. Customer discovery is strictly an investigative effort, not a data-harvesting or sales prospecting engine.

To ensure compliance with Indian data privacy standards (including the Digital Personal Data Protection Act, 2023) and protect respondent confidentiality, all interviewers must observe four mandatory rules:

1. **Explicit Prior Consent:** Never record audio or video without affirmative verbal or written consent at the beginning of the call.
2. **Zero Sensitive Commercial Data:** Do not request, collect, or record customer corporate secrets, client names, active deal values, confidential guest lists, or proprietary financial statements.
3. **Zero Sensitive Tax Artifacts:** Do not collect or store actual corporate GSTINs, supplier PANs, real tax invoice numbers, or employee personal credit card numbers.
4. **Strict Repository Hygiene:** The Git repository is an engineering and documentation asset. Identifiable private emails, personal phone numbers, call recordings, and raw verbatim customer files must **never** be committed to Git.

---

## 2. Audio & Video Recording Consent Protocol

### Verbal Consent Script
Before enabling recording on Zoom, Google Meet, or Microsoft Teams, the interviewer must state:

> *"Before we begin, do I have your permission to record this 20-minute conversation solely for our internal research notes? We do not share or publish recordings externally, and we keep all company details completely anonymous."*

### Rules for Handling Consent
- **If Consent is Granted (`YES`):** Turn on recording. Explicitly note `consent_status: GRANTED_RECORDING` in the interview notes.
- **If Consent is Declined (`NO`):** Proceed without recording. Rely entirely on manual note-taking. Explicitly note `consent_status: MANUAL_NOTES_ONLY`. Under no circumstances should the respondent be pressured or made uncomfortable.
- **Revocation:** If at any point the respondent asks to speak "off the record," immediately pause the recording and stop typing until they instruct you to resume.

---

## 3. Data Sanitization & Anonymization Guidelines

All notes committed to the repository must be systematically anonymized. Use the following replacement standards:

| Data Type | Prohibited in Git | Anonymized Standard for Git Notes |
|---|---|---|
| **Company Name** | "Acme Technologies India Pvt Ltd" | "Enterprise B2B SaaS Co (Gurugram, ~250 employees)" |
| **Respondent Name** | "Priya Sharma" | "Contact EA-01" or "Respondent Mktg-02" |
| **Individual Contact** | Personal phone number or direct work email | Stored in private local CRM/offline CSV outside Git |
| **Real Corporate GSTIN** | "06AAACA1234A1Z5" | "Valid Haryana GSTIN (06)" |
| **Specific Client Names** | "Hosting the CXOs of Bank X and Firm Y" | "Hosting 12 enterprise banking prospect CXOs" |
| **Specific Invoice ID** | "INV-2026-DEL-094821" | "Vendor Tax Invoice #REF-SAMPLE" |
| **Transaction Spend** | Exact credit card transaction amounts | Rounded ranges (e.g., "~₹1.2 Lakhs for 15 guests") |

---

## 4. Storage of Private Research Data (Outside Repository)

1. **Private Tracker Storage:**
   - Completed `outreach-tracker.csv` files with real respondent emails, phone numbers, and LinkedIn URLs must be kept in a secure, private cloud folder (e.g., restricted Google Drive / Notion workspace) or local encrypted scratch directory not tracked by Git.
   - The repository must only contain [`outreach-tracker-template.csv`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-discovery/outreach-tracker-template.csv).
2. **Recordings Storage:**
   - Audio and video recordings must **never** be saved into the repository tree.
   - Recordings must be retained only as long as necessary to transcribe key operational insights (maximum retention: 60 days), after which they must be deleted.
3. **Repository Commit Audit:**
   - Before executing `git commit`, run `git diff --staged` to verify no personal phone numbers, raw email addresses, or un-anonymized company documents have been staged.

---

## 5. Right to Erasure and Data Restriction

If any interview participant requests that their feedback, notes, or contact details be removed:
1. Immediately delete their entry from the private offline outreach tracker.
2. Remove any attributed qualitative quotes from working discovery notes.
3. If an anonymized summary has been aggregated into [`docs/customer-discovery/evidence-register.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-discovery/evidence-register.md), verify that the entry contains zero identifying characteristics that could be traced back to the individual or company.
