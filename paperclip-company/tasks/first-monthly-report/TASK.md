---
name: Generate First Monthly Performance Report
assignee: reporting-director
project: monthly-operations
schedule:
  timezone: America/New_York
  recurrence:
    frequency: monthly
    interval: 1
---

# Generate First Monthly Performance Report

Compile and deliver the baseline Month 1 performance report for each active client. This report establishes starting benchmarks across all four pillars and sets the foundation for measuring future progress.

## Context

The first monthly report is different from subsequent reports: it is primarily a **baseline report** rather than a trend report. There is no "last month" to compare against. The goal is to document the starting state clearly — this is Month 1, and every future report will show movement from here.

## Steps

1. **Confirm baselines from onboarding** are available:
   - BrightLocal Day 1 rank baseline (from `brightlocal-rank-baseline` task)
   - Awario reputation baseline (from `awario-brand-streams` task)
   - GHL pipeline starting state (from `setup-ghl-snapshot` task)
   - Ad account audit findings (from `meta-ads-audit` task, if ads are running)

2. **Pull Month 1 data** from each tool API for the active portion of the first month (even if not a full 30 days — note the start date):
   - GHL: new leads, first contact rate, appointments booked, appointments completed
   - BrightLocal: current rankings vs. Day 1 baseline, citation accuracy score, new reviews
   - Madgicx / Google Ads: spend, leads from paid, CPL, CTR (if ads are running)
   - Awario: mention volume, sentiment breakdown, share of voice vs. competitors

3. **Draft the report** following the structure in the `client-reporting` skill Section 2.

4. **Frame Section 1 (Executive Summary) as a "starting point" narrative:**
   - "Month 1 is your starting baseline. These numbers are where we begin — every future report will show you how far we've moved."
   - Highlight the most positive starting signal and the biggest opportunity for improvement.

5. **In the Rankings section**, show Day 1 baseline vs. end-of-Month-1. Even if movement is small, this demonstrates the tracking is live and working.

6. **In the Next Month Goals section**, be specific and realistic:
   - One rank goal (a specific keyword and target position)
   - One lead generation goal (based on what Month 1 produced)
   - One reputation goal (review count target or rating target)

7. **Queue the completed report** for COO review → board approval → client delivery via GHL.

## Deliverable

A completed Month 1 baseline performance report for each active client, formatted as per the `client-reporting` skill, queued for board approval before delivery.

## Approval Gate

**Board must approve the report before it is sent to the client.** Even a baseline report — the first thing a client sees about their results — represents the agency and must be reviewed by the owner before delivery.
