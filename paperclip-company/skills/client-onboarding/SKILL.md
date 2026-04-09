---
name: client-onboarding
description: >
  New client onboarding workflow for the Client Onboarding Specialist:
  GHL sub-account setup, BrightLocal configuration, Awario streams,
  and Madgicx/ad account connection — across all four tool pillars.
---

# Client Onboarding

This skill defines the step-by-step onboarding process for bringing a new client onto all four agency tool pillars. No live system is activated until the board has approved the onboarding completion report.

---

## Prerequisites

Before beginning onboarding, confirm you have the following from the client brief (provided by the CRM Director after board sign-off):

- [ ] Business legal name
- [ ] DBA / trade name (if different)
- [ ] Physical address (or "service area only" with list of zip codes/cities)
- [ ] Primary phone number (the one on GBP and main citations)
- [ ] Website URL
- [ ] Primary service category (e.g., "Emergency Plumbing")
- [ ] All service lines offered
- [ ] Service area (city + radius, or specific zip codes)
- [ ] Target keywords (minimum 5, provided by Marketing Director)
- [ ] Google Business Profile email login OR agency request to become a manager
- [ ] Ad account access: Meta Business Manager ID and Google Ads Customer ID (if running ads)
- [ ] Monthly ad budget per platform
- [ ] Client's Google Review link
- [ ] Client contact for onboarding coordination (name, email, phone)

If any of these are missing, flag to the CRM Director before proceeding. Do not begin setup with incomplete information.

---

## Pillar 1: GoHighLevel Sub-Account Setup

**Goal:** Deploy a configured GHL sub-account using the master agency snapshot.

### Steps

1. **Create new sub-account** in the agency GHL account. Use the client's legal business name and primary contact details.

2. **Deploy the master snapshot** onto the new sub-account. The snapshot should include:
   - All 6 standard workflows (see `ghl-automation` skill Section 1)
   - Standard pipeline stages for the client's industry
   - Email and SMS templates for all workflows
   - Lead forms (if applicable)
   - Reporting dashboards

3. **Configure client-specific settings:**
   - Update all SMS/email templates with the client's business name, owner name, and Google Review link
   - Set the pipeline stages to match the client's industry (see `ghl-automation` skill Section 4)
   - Configure the sub-account's business address, phone, timezone, and logo
   - Connect the client's domain (if sending emails from their domain)

4. **Test the Speed-to-Lead workflow:** Create a test contact and verify the first SMS fires within 60 seconds.

5. **Produce setup confirmation checklist:**
   ```
   GHL SETUP — [Client Name]
   
   ✓ Sub-account created
   ✓ Snapshot deployed
   ✓ Templates updated with client branding
   ✓ Pipeline configured for [industry]
   ✓ Speed-to-Lead workflow tested: fired in [X] seconds
   ✗ [Any item not yet complete — reason and ETA]
   ```

6. **Do not activate** the sub-account for live lead intake until the board approves the full onboarding completion report.

---

## Pillar 2: BrightLocal Setup

**Goal:** Configure rank tracking and citation monitoring so the SEO Specialist has a baseline from day one.

### Steps

1. **Create a new client profile** in BrightLocal. Enter: business name (master NAP), address, phone, website, primary category.

2. **Set up Rank Tracking:**
   - Add all target keywords from the client brief (minimum 5, ideally 10–20)
   - Set tracking locations: primary city + any secondary service cities
   - Track both Google Maps Pack and Organic positions for each keyword
   - Set tracking frequency: daily

3. **Run initial Citation Audit:**
   - Trigger a full citation audit in BrightLocal's Citation Tracker
   - Pull the initial NAP accuracy score and citation count
   - Export the inconsistency list for the SEO Specialist

4. **Configure Review Monitoring:**
   - Connect BrightLocal to the client's Google Business Profile and Facebook Page
   - Enable daily review monitoring

5. **Run the first rank check** and save the results as the baseline. This is the "Day 1" benchmark used in all future reporting.

6. **Produce setup confirmation:**
   ```
   BRIGHTLOCAL SETUP — [Client Name]
   
   ✓ Client profile created
   ✓ Rank tracking configured: [X] keywords, [Y] locations
   ✓ Initial ranks pulled: baseline saved
   ✓ Citation audit completed: [X citations found, Y inconsistencies flagged]
   ✓ Review monitoring active
   
   BASELINE RANKS (top 5 keywords):
   [keyword] — Maps: #[X] | Organic: #[X]
   [repeat for all target keywords]
   ```

---

## Pillar 3: Awario Stream Setup

**Goal:** Configure brand monitoring so the Reputation team can begin their first sweep immediately.

### Steps

1. **Create brand streams** (follow the stream configuration guide in `reputation-monitoring` skill Workflow 2):
   - Primary business name (exact)
   - Business name variations
   - Owner name (if applicable)

2. **Create competitor streams:**
   - Identify top 3 local competitors (ask the client or use Google Maps search for the primary service + city)
   - Create one stream per competitor

3. **Create industry keyword streams** (2–3):
   - "[primary service] + [city]"
   - "[service] review/complaint [city]"

4. **Configure settings:** Language = English, Geo = service area + 20% radius.

5. **Run first sweep** and save the results as the reputation baseline.

6. **Produce setup confirmation:**
   ```
   AWARIO SETUP — [Client Name]
   
   ✓ Brand streams created: [X streams]
   ✓ Competitor streams created: [X streams — list competitor names]
   ✓ Industry keyword streams created: [X streams]
   ✓ First sweep complete: [X mentions found in last 30 days]
   Sentiment baseline: [X]% positive, [X]% neutral, [X]% negative
   ```

---

## Pillar 4: Ad Account Connection (if running ads)

**Goal:** Connect the client's Meta and Google ad accounts to the agency management accounts.

### Steps

1. **Meta:**
   - Request access to the client's Meta Business Manager via the agency's Business Manager (Partner request)
   - Once accepted, confirm the pixel is installed (see `meta-ads-management` skill Section 2)
   - Verify the ad account is in active status (not disabled or payment issue)

2. **Google Ads:**
   - Request MCC access to the client's Google Ads account
   - Verify conversion tracking is set up (Google Ads conversion action for calls + form fills)
   - Run an initial account audit (see task `meta-ads-audit` for the audit format)

3. **Produce setup confirmation:**
   ```
   AD ACCOUNT SETUP — [Client Name]
   
   META:
   ✓ Business Manager access granted
   ✓ Pixel verified: [X events firing]
   ✓ Ad account status: Active
   
   GOOGLE ADS:
   ✓ MCC access granted
   ✓ Conversion tracking verified
   ✓ Account audit complete — see attached
   ```

---

## Onboarding Completion Report

After all four pillars are configured, compile the **Onboarding Completion Report** and queue it for CRM Director review → board approval → client kickoff confirmation.

```
ONBOARDING COMPLETION REPORT — [Client Name]
Date: [today]

GHL: [✓ Complete / ✗ Pending — reason]
BrightLocal: [✓ Complete / ✗ Pending — reason]
Awario: [✓ Complete / ✗ Pending — reason]
Ad Accounts: [✓ Complete / ✗ Pending / N/A]

BASELINE SUMMARY:
- Starting Google rank for "[top keyword]": #[X]
- Citation accuracy score: [X]%
- Current Google rating: [X] ([X] reviews)
- Reputation baseline: [X]% positive sentiment (last 30 days)

PENDING ITEMS BEFORE GO-LIVE:
[Any outstanding access, approvals, or setup tasks]

RECOMMENDED NEXT STEPS FOR EACH DEPARTMENT:
- Marketing: Begin GBP posting schedule, run citation corrections
- CRM: Activate lead intake workflows after board approval
- Reputation: First full reputation sweep complete — Brand Monitor Specialist has baseline
- Reporting: Baseline set — first monthly report due [date]

ACTION REQUIRED: Board approval to mark client as ACTIVE and begin live operations.
```
