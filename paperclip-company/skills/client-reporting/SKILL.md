---
name: client-reporting
description: >
  Monthly client performance report production for the Reporting Director:
  data gathering from all four tools, report structure, plain-English translation,
  and delivery workflow.
---

# Client Reporting

This skill defines how the Reporting Director compiles, writes, and delivers monthly performance reports for all active clients. Reports are written in plain English — no metric dumps. Every report is queued for board approval before it is sent to a client.

---

## 1. Data Gathering Checklist

Run this on the 28th of each month to pull the previous month's data from all four tool APIs (read-only access only).

### GoHighLevel (CRM & Lead Data)

Pull via GHL API for the reporting period (1st–last day of prior month):

- [ ] Total new leads (by source: organic, paid, referral, GBP)
- [ ] Speed-to-contact rate: % of leads contacted within 5 minutes
- [ ] Lead-to-appointment conversion rate
- [ ] Total appointments booked
- [ ] Total appointments completed ("Won" pipeline stage)
- [ ] Review requests sent and review link clicks

### BrightLocal (SEO Data)

Pull via BrightLocal API:

- [ ] Keyword rankings: current month vs. prior month for all tracked keywords (Maps + Organic)
- [ ] Number of keywords in Maps Pack (top 3)
- [ ] Number of keywords on page 1 organic
- [ ] New citations added this month
- [ ] Citation accuracy score (current vs. prior month)
- [ ] New reviews this month (Google + Facebook)
- [ ] Current overall star rating (Google + Facebook)
- [ ] Review response rate

### Madgicx / Google Ads (Paid Ads Data)

Pull via Madgicx API and Google Ads API:

- [ ] Total ad spend (Meta + Google)
- [ ] Total leads from paid (Meta lead form submissions + Google conversion actions)
- [ ] Cost per lead (CPL) by platform
- [ ] ROAS (if applicable)
- [ ] CTR by platform
- [ ] Best-performing ad creative (highest CTR or most conversions)
- [ ] Any campaigns paused or launched this month (with reason)

### Awario (Reputation Data)

Pull via Awario API:

- [ ] Total brand mention volume (vs. prior month)
- [ ] Sentiment breakdown: % positive, neutral, negative
- [ ] Share of voice vs. top 3 competitors (from Brand Monitor Specialist's monthly report)
- [ ] Notable mentions: any significant positive press, partnerships, or negative events

---

## 2. Report Structure

Every monthly client report follows this structure. Keep each section to 1 page or less. Total report length: 4–6 pages.

---

### Cover Page
```
[Client Business Name]
Monthly Marketing Performance Report
[Month] [Year]
Prepared by: Agency Zero to Hero
```

---

### Section 1: Executive Summary (1/2 page)

3–5 bullet points summarizing the month's most important results. Write for a business owner who will read only this section. Format:

- **[Win]:** [What happened + why it matters in plain English]
- **[Challenge]:** [What underperformed + what we're doing about it]
- **Next month focus:** [Top 1–2 priorities for the coming month]

Example:
- **Local SEO win:** Your ranking for "emergency plumber [City]" moved from #5 to #3 — you're now in the top 3 local results, which means more people see your business before they click.
- **Leads:** You received 34 new leads this month — 22 from Google (SEO + GBP), 12 from Meta Ads.
- **Challenge:** Two negative reviews this month brought your rating from 4.6 to 4.4 — we've drafted responses and are increasing review requests to recover.
- **Next month:** Push the top 3 keyword to #1 with a new GBP post campaign; review ad creative rotation.

---

### Section 2: Lead Conversion (GHL Data)

| Metric | This Month | Last Month | Change |
|--------|-----------|-----------|--------|
| New Leads | [X] | [X] | [+/-X] |
| Speed-to-Contact (<5 min) | [X]% | [X]% | [+/-X]% |
| Lead → Appointment | [X]% | [X]% | [+/-X]% |
| Appointments Completed | [X] | [X] | [+/-X] |

**Plain-English Insight (2–3 sentences):** Translate the table. Example: "You received X new leads this month — that's up Y% from last month. Your team is contacting Z% of leads within 5 minutes, which is [above/below] our target of 70%. We'll [action] to improve the follow-up rate."

---

### Section 3: Local SEO (BrightLocal Data)

**Rankings Summary**

| Keyword | Maps (This Month) | Maps (Last Month) | Organic (This Month) | Organic (Last Month) |
|---------|------------------|------------------|---------------------|---------------------|
| [keyword] | #[X] | #[X] | #[X] | #[X] |
| [repeat] | | | | |

**Highlight:** "[Keyword] moved from #X to #Y — [plain English: "you're now showing in the top 3 local results for people searching this in [city]"]"

**Citations:** [X] total citations. Accuracy score: [X]% (up/down from [X]% last month). [X] corrections submitted this month.

**Reviews:** [X] new reviews ([X] on Google, [X] on Facebook). Current rating: [X] stars. We responded to [X]% of new reviews this month.

---

### Section 4: Paid Ads (Madgicx + Google Ads Data)

| Metric | Meta | Google | Total |
|--------|------|--------|-------|
| Spend | $[X] | $[X] | $[X] |
| Leads | [X] | [X] | [X] |
| Cost per Lead | $[X] | $[X] | $[X] |
| CTR | [X]% | [X]% | — |

**Plain-English Insight:** "Your Meta Ads generated X leads at $Y per lead this month — [above/below] our target of $Z. [Best-performing ad summary]. [What we're testing next month]."

---

### Section 5: Reputation (Awario Data)

| Metric | This Month | Last Month |
|--------|-----------|-----------|
| Brand Mentions | [X] | [X] |
| Positive Sentiment | [X]% | [X]% |
| Share of Voice | [X]% | [X]% |

**Notable mentions:** [1–2 sentence summary of anything significant]

---

### Section 6: Next Month Goals

3–5 specific, measurable goals for the next month. Example:

1. Rank "[keyword]" in the Google Maps 3-pack (currently #4)
2. Reduce Meta CPL from $[X] to under $[Y] by rotating new creative
3. Recover Google rating from [X] to [target] through increased review requests
4. Improve lead-to-appointment rate from [X]% to [Y]% by optimizing the follow-up sequence

---

## 3. Language Guidelines

**Translate every metric into a business outcome.** The client doesn't know what CTR means. They know what "more people clicking to call you" means.

| Instead of | Say |
|-----------|-----|
| "CTR improved from 1.2% to 1.8%" | "More people are clicking your ads — 50% improvement in click rate" |
| "Ranking improved 3 positions on keyword X" | "You moved from #5 to #3 on Google for '[keyword]' — you're now in the top 3 results in [City]" |
| "CPA decreased by 22%" | "Each new lead from paid ads now costs $X less than last month — your ads are working harder" |
| "Sentiment score 74%" | "74% of online mentions about your business are positive — your reputation is healthy" |

**Be honest about challenges.** Do not spin underperformance as positive. Use this framing: "Here's what happened, here's why, and here's what we're doing about it."

---

## 4. Delivery Workflow

1. Complete draft report by the 1st of the month.
2. Queue for COO review via the approval queue.
3. COO reviews and forwards to board.
4. Board approves (or requests edits).
5. After approval, trigger the GHL email automation to send the report to the client contact as a PDF attachment.
6. Log delivery date and client name in the tracking sheet.

**Report format:** PDF, generated from the draft. Filename format: `[client-slug]-monthly-report-[YYYY-MM].pdf`
