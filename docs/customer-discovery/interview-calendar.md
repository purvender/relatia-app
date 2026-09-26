# Relatia Discovery — Interview Calendar and Scheduling Workflow

> **Document Classification:** Internal Operational Protocol for Discovery Interview Scheduling  
> **Status:** Active Workflow — Day 10 Step 4  
> **Target:** 20-minute focused discovery interviews across enterprise buyers and hospitality providers in Gurugram/Delhi–NCR.

---

## 1. Interview Status Definitions

Every discovery prospect tracked in [`outreach-tracker-template.csv`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-discovery/outreach-tracker-template.csv) moves through deterministic statuses:

```
[IDENTIFIED] -> [CONTACTED] -> [REPLIED] -> [SCHEDULED] -> [COMPLETED] -> [NOTES_RECORDED]
       |             |             |             |
       v             v             v             v
  [UNQUALIFIED] [UNRESPONSIVE] [DECLINED]    [NO_SHOW] -> [RESCHEDULED]
```

- `IDENTIFIED`: Persona qualified against ICP criteria; contact channel verified.
- `CONTACTED`: First outreach message sent via LinkedIn or email.
- `FOLLOW_UP_SENT`: Follow-up 1 or 2 delivered per the cadence.
- `REPLIED`: Prospect responded affirmatively to research request.
- `SCHEDULED`: Exact calendar date, time, and meeting link locked.
- `COMPLETED`: 20-minute interview conducted.
- `NOTES_RECORDED`: Anonymized notes documented using [`interview-notes-template.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-discovery/interview-notes-template.md) and aggregated in [`evidence-register.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-discovery/evidence-register.md).
- `NO_SHOW`: Prospect missed scheduled call without prior notice.
- `RESCHEDULED`: New calendar invite issued following a missed or moved call.
- `DECLINED`: Prospect explicitly declined participation.
- `UNQUALIFIED`: Disqualified during pre-call qualification (e.g., zero event activity).

---

## 2. Standard Calendar Invite Configuration

To maintain professional credibility and minimize friction, all calendar invitations must follow this exact format:

- **Calendar Event Title:**  
  `Relatia Research: Corporate Dining & Hospitality Workflows (20 min) // [Respondent First Name] + Purvender`
- **Duration:** 20 minutes (strictly respected).
- **Meeting Platform:** Google Meet or Microsoft Teams link auto-generated.
- **Calendar Event Description:**
  ```text
  Hi [First Name],

  Thank you for agreeing to share your experience with us!

  As mentioned, this is purely an exploratory research conversation to understand how organizations in Delhi–NCR manage corporate dining, executive hospitality, and expense reconciliation. 

  - No preparation is needed on your part.
  - We are not pitching any services or software.
  - We will focus on one recent real event or workflow.

  Looking forward to speaking!

  Best regards,
  Purvender Hooda
  Relatia | Founder Research
  ```

---

## 3. Strict 20-Minute Interview Time Allocation

Discovery calls must be tightly managed so they never spill over the promised 20-minute commitment:

```
+-------------------------------------------------------------------------------+
|                        20-MINUTE DISCOVERY INTERVIEW TIMEBOX                  |
+-------------------------------------------------------------------------------+
| Minutes 00–02: Greeting, research framing, verbal consent to notes/recording  |
| Minutes 02–07: Anchoring on the LAST real event (who, where, guest count, why)|
| Minutes 07–13: Deep dive on workflow friction (venues called, hours, booking) |
| Minutes 13–17: Approval, billing, payment, invoice GST & finance review pain  |
| Minutes 17–19: Hypothesis probe (what a 3-event pilot would need to prove)     |
| Minutes 19–20: Wrap-up, referral request to other stakeholder, sincere thanks |
+-------------------------------------------------------------------------------+
```

---

## 4. Interviewer Preparation Checklist

Before dialing in, the interviewer must complete this 3-minute pre-call check:

- [ ] Reviewed respondent's LinkedIn profile, company category, and estimated employee headcount.
- [ ] Confirmed whether the company has an office in Gurugram, Aerocity, New Delhi, or Noida.
- [ ] Opened a fresh instance of [`interview-notes-template.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-discovery/interview-notes-template.md).
- [ ] Assigned a clean `contact_id` (e.g., `CON-0105`).
- [ ] Confirmed Google Meet / Teams link is active and functioning.
- [ ] Audio recording tool ready with verbal consent script highlighted.
- [ ] Reminder set: **Do not pitch software or make promises during the call.**

---

## 5. No-Show, Cancellation & Rescheduling Workflow

If a respondent does not join within 5 minutes of the scheduled time:

1. **At Minute 5 (Polite Ping):** Send a short email or LinkedIn message:
   > *"Hi [First Name], I'm on our Google Meet for our research chat. No worries at all if something urgent came up! Let me know if you need to reschedule or if a different time works better today."*
2. **At Minute 10 (Drop & Log):** Exit the meeting room. Update tracker status to `NO_SHOW`.
3. **At Hour 2 (Rescheduling Offer):** Send a courteous follow-up:
   > *"Hi [First Name], completely understand that executive schedules shift unexpectedly. Whenever you have a spare 20 minutes later this week or next, feel free to pick a time here [Calendar Link] or let me know what day suits you. Thanks again!"*
4. **Rule:** Maximum of ONE rescheduling attempt. If the prospect misses twice, mark `DISQUALIFIED_UNRESPONSIVE`. Never badger respondents.

---

## 6. Post-Interview Follow-Up Process (Within 2 Hours)

1. **Send Sincere Thank-You Message:** Send a brief thank-you email or LinkedIn message within 2 hours:
   > *"Hi [First Name], thank you so much for the generous time and candid insights today regarding your team's dining coordination! Your perspective on [specific topic mentioned, e.g., PDR acoustics on Golf Course Road] was immensely helpful for our research. Wishing you a great rest of the week!"*
2. **Complete Interview Notes:** Finalize the anonymized markdown note file in `docs/customer-discovery/` within 4 hours while details are fresh.
3. **Update Evidence Register:** If new quantifiable signals or contradictory points emerged, update [`evidence-register.md`](file:///Users/purvenderhooda/Documents/hooda/relatia-app/docs/customer-discovery/evidence-register.md).
4. **Log Referral Action:** If a referral to a Finance Controller or VP Sales was promised, trigger the referral outreach within 24 hours.
