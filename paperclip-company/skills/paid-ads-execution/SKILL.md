---
name: paid-ads-execution
description: >
  Daily and weekly paid ads monitoring and optimization workflows for the Ads Specialist:
  performance monitoring, budget pacing, audience health, and creative review.
---

# Paid Ads Execution

This skill defines the monitoring and optimization workflows the Paid Ads Specialist follows across Google Ads and Meta Ads for all active clients. All recommended actions require human approval — the Ads Specialist never changes ad settings unilaterally.

---

## Workflow 1: Daily Performance Check

**Trigger:** Daily heartbeat.  
**Goal:** Compare actual performance against client targets. Flag any metric off by >20%.

### Steps

1. **Pull yesterday's performance data** from Madgicx (Meta) and Google Ads API for each active client:
   - Spend
   - Impressions
   - Clicks / CTR
   - Conversions (leads, calls, form fills)
   - Cost Per Lead / CPA
   - ROAS (if e-commerce or trackable revenue)

2. **Compare to target benchmarks** from the client's KPI sheet:
   - Is CPA within target range?
   - Is ROAS at or above the target floor?
   - Is CTR healthy? (Meta: >1.5% cold traffic; Google Search: >5%)
   - Is daily spend on pace with the monthly budget cap? (see Workflow 3)

3. **Flag any metric off by >20% from target.** For each flagged metric, determine the likely cause:

   | Issue | Likely Cause | Recommended Action |
   |-------|-------------|-------------------|
   | CPA up >20% | Audience fatigue, poor creative, landing page issue | Check frequency; flag for creative review |
   | ROAS down >20% | Low-quality traffic, attribution gap | Check campaign targeting; review conversion tracking |
   | CTR down >20% | Ad fatigue, irrelevant audience, creative wearing out | Flag for creative replacement |
   | Spend underdelivering | Budget set too low, bid strategy too conservative | Recommend bid strategy review |
   | Spend overdelivering | Dayparting issue, audience too broad | Recommend budget cap or bid adjustment |

4. **Compile the daily ads report:**
   ```
   DAILY ADS REPORT — [Date]
   CLIENT: [Name]
   
   FLAGGED ISSUES:
   - [Metric]: [actual] vs. target [target] | Recommended: [action]
   
   PERFORMANCE SUMMARY:
   - Spend: $[X] (target: $[Y/day])
   - CPA: $[X] (target: $[Y])
   - CTR: [X]% (target: [Y]%)
   - Conversions: [X]
   
   RECOMMENDED ACTIONS (pending approval):
   1. [Action] — [expected outcome] — [urgency: low/medium/high]
   ```

5. **Queue recommended actions** for human approval. Do not execute any change until approved.

---

## Workflow 2: Weekly Creative Review

**Trigger:** Weekly heartbeat (Friday).  
**Goal:** Identify the lowest-performing ads by CTR and initiate creative replacement.

### Steps

1. **Pull last 7 days of ad-level data** from Madgicx (Meta) and Google Ads for all clients.

2. **Sort ads by CTR (ascending).** Flag any ad with:
   - CTR below 1% on Meta cold traffic
   - CTR below 3% on Google Search
   - Frequency above 3.0 on Meta (ad fatigue threshold)
   - The ad has been running more than 14 days (enough data to judge)

3. **For each flagged ad, draft a creative brief:**
   ```
   CREATIVE BRIEF — REPLACEMENT AD
   CLIENT: [Name]
   PLATFORM: Meta / Google
   CAMPAIGN: [Campaign name]
   AD SET/GROUP: [Ad set name]
   
   WHY REPLACING: CTR = [X]% (below [threshold]%) / Frequency = [X] (above 3.0)
   
   OBJECTIVE: [Awareness / Lead gen / Retargeting]
   FORMAT: [Single image / Video / Carousel / Responsive Search Ad]
   
   SUGGESTED ANGLE: [1–2 sentence creative concept]
   HEADLINE OPTIONS (3):
   1. [Headline 1]
   2. [Headline 2]
   3. [Headline 3]
   
   BODY COPY DIRECTION: [Key message, tone, CTA]
   VISUAL DIRECTION: [Description of ideal image/video]
   
   ACTION REQUIRED: Approve brief → brief designer/copywriter → produce → queue ad for launch approval
   ```

4. **Queue all creative briefs** for Marketing Director and board review.

---

## Workflow 3: Budget Pacing Check

**Trigger:** Daily heartbeat (run alongside Workflow 1).  
**Goal:** Ensure monthly spend is on track — neither over- nor under-pacing.

### Steps

1. **Calculate expected spend to date:**
   - Monthly budget cap ÷ days in month × days elapsed = expected spend to date

2. **Compare to actual spend to date** (pulled from Madgicx / Google Ads).

3. **Flag if actual spend is:**
   - **Over-pacing by >10%:** Recommend daily budget reduction to avoid overage. Queue for approval immediately.
   - **Under-pacing by >10%:** Investigate why (low bids, narrow targeting, disapproved ads). Recommend corrective action. Queue for approval.
   - **On track (within ±10%):** Log only.

4. **Budget pacing alert format:**
   ```
   BUDGET PACING ALERT — [Date]
   CLIENT: [Name] | PLATFORM: [Meta/Google]
   
   Monthly Budget: $[X]
   Expected Spend to Date: $[X]
   Actual Spend to Date: $[X]
   Variance: [+/-X]%
   
   Status: OVER-PACING / UNDER-PACING / ON TRACK
   Recommended Action: [specific action]
   ACTION REQUIRED: Approve to implement
   ```

---

## Workflow 4: Audience Health Check

**Trigger:** Weekly heartbeat (Wednesday).  
**Goal:** Identify audience fatigue and targeting quality issues before they erode performance.

### Steps

1. **Pull frequency data** for all Meta cold-traffic and prospecting ad sets. Flag any with frequency >3.0 over the last 7 days.

2. **Pull audience size** for all active ad sets. Flag:
   - Cold audiences below 50,000 (too narrow, will fatigue fast)
   - Lookalike audiences if source is below 1,000 customers (insufficient seed data)

3. **Check audience overlap** (available in Meta Audience Insights). Flag any two active ad sets with >30% overlap — this causes internal competition and inflates CPMs.

4. **Draft recommendations:**
   - High frequency → "Rotate new creative" or "Broaden targeting" or "Pause and refresh in 7 days"
   - Small audience → "Expand geo or interest targeting" or "Move to broad targeting with strong creative signal"
   - High overlap → "Exclude audience A from ad set B" or "Consolidate ad sets"

5. **Queue recommendations** for Ads Specialist weekly summary → Marketing Director → approval queue.
