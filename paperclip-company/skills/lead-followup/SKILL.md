---
name: lead-followup
description: >
  Lead follow-up strategy and sequence design for the Lead Automation Specialist:
  speed-to-lead principles, multi-touch sequence design, and re-engagement playbooks.
---

# Lead Follow-Up

This skill covers the strategy and tactics for lead follow-up sequencing. It complements `ghl-automation` (which handles GHL technical configuration) with the underlying logic of what to say, when to say it, and how to optimize for conversion.

---

## 1. Speed-to-Lead: The Golden Rule

**The most important variable in local service lead conversion is response time.**

Research benchmark: leads contacted within 5 minutes convert at 9x the rate of leads contacted after 30 minutes. For local services (plumber, HVAC, dentist), most leads have an immediate need — they are calling 3–5 businesses simultaneously. First responder wins.

### Implementation in GHL

Every client must have a **New Lead Speed-to-Lead workflow** that fires within 60 seconds of a new lead entering the system. The sequence:

1. **Immediate (0–60 seconds):** Automated SMS + Internal notification to the business owner/team.
2. **+5 minutes:** If no reply from the lead, second SMS.
3. **+15 minutes:** If still no reply, automated call from GHL AI Voice (if enabled) OR internal notification escalation.

**SMS copy principles for the first touch:**
- Use the lead's first name
- Reference their service request (from form field or tag)
- Be direct — don't sell, just initiate a conversation
- Keep it under 160 characters
- Include a clear next step

Example: "Hi [Name], this is [Business]. We got your request for [service] in [City] — are you available for a quick call? We can often get out same-day."

---

## 2. Multi-Touch Nurture Sequence Design

For leads who don't respond immediately or don't book on first contact, a structured nurture sequence keeps the business top-of-mind without being spammy.

### Standard 14-Day No-Response Sequence

| Day | Channel | Message Angle | Goal |
|-----|---------|--------------|------|
| 0 (immediate) | SMS | "Got your request — available for a quick call?" | First contact |
| 0 (+5 min) | Email | Welcome + service overview + CTA | Backup channel |
| 1 | SMS | "Still looking for [service]? We're scheduling for [tomorrow]" | Urgency nudge |
| 3 | Email | Social proof angle ("150+ 5-star reviews in [City]") | Trust building |
| 5 | SMS | "Last thing — do you still need help with [service]? Happy to give a free estimate." | Low-commitment ask |
| 7 | Email | Educational content ("5 signs your [system] needs service") | Value / stay top-of-mind |
| 14 | SMS | Final check-in: "We'll close out your inquiry — but if you still need [service], we're here." | Graceful exit or re-engagement |

**Exit conditions (always include):**
- Lead replies at any point → exit the sequence immediately and notify the team
- Lead books an appointment → exit immediately
- Lead requests opt-out → exit and add DNC tag

### Sequence Copy Principles
- Each message should be **one channel / one message / one ask**
- Rotate between SMS and email so neither feels repetitive
- Keep SMS under 160 characters
- Email subject lines should be conversational, not promotional ("Quick question about your [service] request" not "LIMITED TIME OFFER")
- Never threaten to remove them from the list — just acknowledge and move on

---

## 3. Re-Engagement Playbook (Cold Leads, 90+ Days)

Leads who went cold (no activity in 90+ days) are not lost — they may have deferred the project, used a competitor who didn't satisfy them, or simply forgotten. A well-timed re-engagement sequence recovers 10–20% of cold leads for most local service businesses.

### 90-Day Re-Engagement Sequence

| Step | Timing | Channel | Angle |
|------|--------|---------|-------|
| 1 | Day 0 | SMS | "Hi [Name], it's [Business]. A while back you were looking into [service] — is that still something you need help with?" |
| 2 | +3 days (if no reply) | Email | "We noticed we haven't connected in a while. If you still need [service], we're running a [seasonal offer / no mention of offer if none]. Happy to get you a free quote." |
| 3 | +7 days (if no reply) | SMS | "Last check-in from us — if the [service] project is still on the radar, we'd love to earn your business. Otherwise, no worries!" |

After step 3, no more contact unless they re-engage. Archive the lead as "Cold — Re-engaged attempt Q[X] [Year]."

---

## 4. Segmentation and Tagging Strategy

Good follow-up depends on sending the right message to the right person. Use GHL tags to segment leads by:

| Tag | Meaning | Follow-up adjustment |
|-----|---------|---------------------|
| `urgent-need` | Lead mentioned emergency or same-day need | Compress sequence — contact every 30 min for 2 hours |
| `price-shopping` | Lead asked "how much does it cost" without context | Lead with value and trust signals, not discounts |
| `already-quoted` | Lead received an estimate but hasn't booked | Sequence focuses on removing objections |
| `no-service-area` | Lead is outside the service area | Exit all sequences, log as lost |
| `referral` | Came from a past client referral | Warmer tone, acknowledge the referral by name |
| `seasonal-interest` | Not ready now but interested for a future project | Low-touch long-term nurture (monthly email only) |

### Tagging Workflow
The Lead Automation Specialist should review new leads weekly and apply tags based on:
- Form fill answers
- Any replies to automated messages
- Notes from the business owner's team

Queue the tag application as part of the weekly pipeline review — bulk tag suggestions delivered to the CRM Director for review before applying.
