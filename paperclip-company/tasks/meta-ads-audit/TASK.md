---
name: Run Initial Meta Ads Account Audit
assignee: ads-specialist
project: client-onboarding
---

# Run Initial Meta Ads Account Audit

Audit an existing client Meta Ads account (or prepare a new account setup spec) to assess the starting state before the Paid Ads Specialist begins active management.

## Context

Before the Ads Specialist can manage a client's Meta Ads account, they need to understand what they're working with: account structure, pixel health, audience quality, campaign performance, and any immediate issues to fix. This audit produces an honest assessment and a prioritized action list — which then goes to the Marketing Director and board for approval before any changes are made.

## Steps

### If the client has an existing Meta Ads account:

1. **Account structure review:**
   - How many campaigns are active? What objectives are they using?
   - Are campaigns structured correctly (Prospecting / Retargeting / Re-engagement)?
   - Are ad sets overly fragmented (too many small ad sets competing with each other)?

2. **Pixel health check** (see `meta-ads-management` skill Section 2):
   - Is the pixel installed and firing on all key pages?
   - Are standard events (`PageView`, `Lead`) tracking correctly?
   - Any duplicate pixel fires or missing conversion events?

3. **Audience quality review:**
   - What audiences are in use? Are cold audiences broad enough (>100,000)?
   - What is the current frequency on cold audiences?
   - Any custom audiences in the account (customer list, website visitors)?

4. **Performance review (last 90 days if available):**
   - Total spend, total leads, cost per lead
   - Compare CPL to local service benchmarks (Meta CPL for local services: $20–$80 depending on category)
   - CTR per ad (flag anything below 1%)
   - ROAS if applicable

5. **Identify top 3 issues and recommended fixes.** Prioritize by impact.

### If the client has no existing Meta Ads account:

1. Verify Meta Business Manager has been created and the agency has partner access.
2. Verify the pixel is installed (coordinate with CRM Director if a web developer is needed).
3. Draft a campaign launch brief using the 3-layer funnel structure from `meta-ads-management` skill Section 1.
4. Queue the launch brief for board approval before building anything.

## Deliverable

A Meta Ads audit report containing:
- Account structure assessment (current state)
- Pixel health status
- Audience quality summary
- Last 90-day performance summary (if available)
- Top 3 prioritized issues
- Recommended action plan (queued for board approval — no changes made until approved)

## Approval Gate

The audit report is informational — no approval required to deliver it. However, every **recommended action** in the report is queued for Marketing Director review and board approval before the Ads Specialist implements any change.
