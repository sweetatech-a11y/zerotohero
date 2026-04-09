---
name: gbp-management
description: >
  Comprehensive Google Business Profile management skill: GBP auditing,
  post scheduling, Q&A monitoring, photo cadence, and insights interpretation.
---

# Google Business Profile Management

This skill defines how the Local SEO Specialist audits, optimizes, and maintains Google Business Profiles for all active clients. All content actions require human approval before execution.

---

## 1. GBP Audit Checklist

Run a full GBP audit for each new client and quarterly for all active clients.

### Categories to Audit

**Business Information**
- [ ] Business name matches master NAP exactly (no keyword stuffing)
- [ ] Primary category is the most specific and relevant available (e.g., "Emergency Plumber" not just "Plumber")
- [ ] Secondary categories cover all service lines (max 9 additional categories)
- [ ] Address matches master NAP exactly — format, suite number, no P.O. boxes
- [ ] Phone is primary local number (not a call tracking number for GBP)
- [ ] Website URL is correct and resolves without redirect loops
- [ ] Business hours are accurate including holiday hours
- [ ] Service area is configured (for service-area businesses, hide address, list all served zip codes/cities)

**Description**
- [ ] Description is 750 characters, written naturally (no keyword stuffing)
- [ ] Covers primary services, service area, and a trust signal
- [ ] Does not include URLs, promotional language ("best", "#1"), or misleading claims

**Services**
- [ ] All service lines are listed under the Services tab with descriptions
- [ ] Service names match the language customers search for

**Photos**
- [ ] Has at least 10 photos
- [ ] Cover photo is professional and on-brand
- [ ] Logo is uploaded and current
- [ ] Photos include: exterior, interior (if applicable), team, work examples, before/after
- [ ] No stock photos — all should be authentic business photos

**Posts**
- [ ] At least 1 post in the last 7 days (posts older than 7 days show as "older post")
- [ ] Post cadence is on schedule (see Section 2)

**Q&A**
- [ ] No unanswered questions in the Q&A section
- [ ] Common questions are seeded as owner Q&As (see Section 3)

**Reviews**
- [ ] All reviews have a response (see `review-management` skill)
- [ ] Star rating is above 4.0

**Score the audit:** Count checkmarks. Report results as [X/total] per category to the Marketing Director.

---

## 2. Monthly GBP Post Schedule

Publish **4 posts per month** per client, rotating through these types. Track last post type to ensure rotation.

| Week | Post Type | Goal |
|------|-----------|------|
| Week 1 | Service Highlight | Feature a specific service, explain the problem it solves, CTA |
| Week 2 | Offer / Promotion | Current deal or seasonal offer — include start/end date |
| Week 3 | Team / Trust | Introduce a team member, certifications, awards, years in business |
| Week 4 | Local Event / Community | Local tie-in (school fundraiser, community event, seasonal local context) |

### Post Draft Format (from `local-seo-execution` Workflow 1)
- 130–160 words
- Hook → Service/Value → Trust signal → CTA → 3–5 hashtags
- Include a suggested image prompt
- Queue for approval — never publish directly

### Post Types Available in GBP
- **Update** (standard post) — use for service highlights and community posts
- **Offer** — use for promotions (requires a title, start date, end date; optional: coupon code, terms)
- **Event** — use for real events the business is hosting or attending

---

## 3. Q&A Monitoring and Response Drafting

**Weekly check:** Scan the GBP Q&A section for new questions from the public.

### Handling New Questions
1. Draft a helpful, accurate answer in the business's voice.
2. Queue the draft for human approval — do not post directly.
3. After approval, post using the GBP API or GHL integration.

### Seeding Owner Q&As (do once during onboarding, refresh quarterly)
Identify the top 5–10 questions customers commonly ask and create them as owner Q&As. Pull from:
- FAQ page on the website
- Common questions in reviews ("Do you offer free estimates?")
- Service-area questions ("Do you serve [City]?")

Format: Post the question from the owner account, then post the answer. Queue for approval.

---

## 4. Photo Update Cadence

**Goal:** Keep the GBP photo library fresh and above 20 photos.

| Cadence | Action |
|---------|--------|
| Monthly | Add 2–3 new photos (job photos, team photos, seasonal content) |
| Quarterly | Audit: remove blurry, outdated, or off-brand photos |
| On milestone | Add award/certification photos, new team member photo, new vehicle/equipment |

**Photo sourcing:** Request photos from the client via GHL form or email. Flag to the Marketing Director if the client is not providing photos — this is a recurring issue that affects GBP performance.

**What makes a good GBP photo:**
- Real people, real jobs — not stock
- Good lighting, in focus
- No text overlays or logos watermarked over the image
- Shows the work being done or the result

---

## 5. GBP Insights Interpretation

Pull GBP Insights monthly from the GBP API or Google Search Console. Interpret the following metrics:

| Metric | What "Good" Looks Like | Flag If |
|--------|------------------------|---------|
| **Search impressions (discovery)** | Growing month-over-month | Drops >20% MoM |
| **Search impressions (direct)** | Stable — people searching the business name | Sharp drop could indicate brand awareness issue |
| **Map views** | Growing, correlates with post frequency | Drops >20% MoM |
| **Website clicks** | Benchmark: 5–15% of total views | Below 3% suggests weak CTA or UX issue |
| **Call clicks** | Benchmark: 3–8% of total views | Below 2% on a service business is a concern |
| **Direction requests** | Relevant for brick-and-mortar; for service-area businesses, deprioritize | N/A |

**Monthly insight summary format:**
```
GBP INSIGHTS — [Client Name] — [Month]

Search Impressions (Discovery): [X] ([+/-]% vs last month)
Map Views: [X] ([+/-]% vs last month)
Website Clicks: [X] ([rate]% of views)
Call Clicks: [X] ([rate]% of views)

Notable: [1–2 sentences interpreting the numbers in plain English]
Action: [Any recommended change based on the data]
```

Include in the monthly client report via the `client-reporting` skill.
