---
name: meta-ads-management
description: >
  Meta Ads (Facebook/Instagram) specific management skill: account structure,
  campaign architecture, pixel verification, retargeting setup, and Madgicx integration.
---

# Meta Ads Management

This skill covers Meta Ads-specific knowledge and workflows. It complements `paid-ads-execution` (which handles daily monitoring across all platforms) with Meta-specific account architecture, Madgicx integration, and best practices for local service businesses.

---

## 1. Recommended Campaign Architecture for Local Service Businesses

Use a 3-layer funnel structure for each client:

### Layer 1: Prospecting (Cold Traffic)
- **Objective:** Lead Generation or Conversions
- **Audiences:**
  - Broad (no interest targeting) + Location targeting within service area radius (typically 15–30 miles)
  - 1–3% Lookalike based on customer list or lead form completions (minimum 1,000 seed contacts)
- **Budget allocation:** 60–70% of total Meta budget
- **Creative:** Problem/solution angle. Example: "Is your AC making that noise? Here's what it means." → Lead form.

### Layer 2: Warm Retargeting
- **Objective:** Lead Generation or Conversions
- **Audiences:**
  - Website visitors (last 30 days) — exclude purchasers/leads
  - Video viewers (50%+ watch time, last 14 days)
  - Lead form openers who didn't submit (last 7 days)
- **Budget allocation:** 20–25% of total Meta budget
- **Creative:** Urgency, social proof, specific offer. Example: "Still looking for a [service]? We have same-day availability."

### Layer 3: Re-Engagement (Past Leads / Customers)
- **Objective:** Lead Generation or Reach
- **Audiences:**
  - Past leads (from CRM/GHL customer list upload)
  - Past customers (if seasonal relevance — e.g., HVAC tune-up reminders)
- **Budget allocation:** 10–15% of total Meta budget
- **Creative:** Loyalty/referral angle, seasonal offer.

---

## 2. Meta Pixel Verification Checklist

Run this check during client onboarding and monthly thereafter.

- [ ] Pixel is installed on all key pages: homepage, service pages, thank-you/confirmation page
- [ ] `PageView` event fires on all pages
- [ ] `Lead` standard event fires on form submission / call conversion
- [ ] Events are verified in Events Manager (green checkmarks, not red warnings)
- [ ] Pixel is connected to the correct Meta Business Manager
- [ ] Conversions API (CAPI) is set up for server-side deduplication (prioritize if the client has a web developer)
- [ ] No duplicate pixel fires on the same page

**Tool:** Use Meta's Pixel Helper Chrome extension to verify (or check Events Manager → Test Events).

If any issue is found, draft a fix instruction for the CRM Director / developer and queue for approval before flagging to the client.

---

## 3. Madgicx Integration and Usage

Madgicx is used for: AI-driven bid optimization, creative analytics, and audience exploration for Meta campaigns.

### Daily Usage (in `paid-ads-execution` Workflow 1)
- Pull performance data from Madgicx dashboard
- Check Madgicx's "Autopilot" recommendations — do not auto-apply without review
- All Madgicx-suggested bid adjustments go to the approval queue before implementation

### Weekly Usage
- Pull Madgicx Creative Cockpit report: which ads are in "scaling" vs. "declining" vs. "testing" phase
- Use Madgicx Audience Explorer to identify new high-potential audience suggestions for prospecting
- Export the weekly creative performance matrix for the creative review (Workflow 2 in `paid-ads-execution`)

### What Madgicx Does NOT Do Automatically
- Madgicx Autopilot settings must be reviewed and adjusted. Never leave default Autopilot settings running without the Ads Specialist reviewing the parameters.
- Madgicx budget recommendations are advisory — all budget changes go through the human approval queue.

---

## 4. Lead Quality Monitoring

Meta Leads ≠ converted customers. Monitor lead quality monthly.

### Steps

1. **Pull lead data from Meta Lead Center or GHL** (GHL syncs Meta leads via integration).
2. **Cross-reference with GHL pipeline:** Of X leads from Meta this month, how many:
   - Were contacted (first touch within 5 minutes)?
   - Booked an appointment?
   - Became a paying customer?

3. **Calculate lead quality metrics:**
   - Contact rate: leads contacted ÷ total leads (target: >70%)
   - Appointment rate: appointments booked ÷ leads contacted (target: >30%)
   - Close rate: customers ÷ appointments booked (this is on the client)

4. **Flag to the Marketing Director if:**
   - Contact rate is below 50% (CRM follow-up speed issue — coordinate with CRM Director)
   - Appointment rate is below 20% (lead quality issue — likely audience or creative problem)
   - Leads are coming from a specific ad set at high volume but with 0% contact rate (fraud/bot leads — investigate targeting)

---

## 5. Campaign Launch Checklist

Before any new Meta campaign is proposed for launch, verify:

- [ ] Campaign objective matches the goal (Lead Gen for local services — not Traffic or Awareness)
- [ ] Budget is within the client's approved monthly cap
- [ ] Pixel events are firing correctly (see Section 2)
- [ ] Ad creative has been approved by the board
- [ ] Audience size is sufficient (cold: >100,000 in service area; retargeting: >1,000)
- [ ] Landing page (if used) loads under 3 seconds and has a clear CTA
- [ ] Lead form (if used) has pre-fill enabled, asks only essential questions (name, phone, service needed)
- [ ] UTM parameters are in place on all URLs

**Queue the completed checklist + campaign brief for board approval. Do not launch until approved.**
