---
name: Configure Awario Brand Monitoring Streams
assignee: brand-monitor-specialist
project: client-onboarding
---

# Configure Awario Brand Monitoring Streams

Set up Awario monitoring streams for a new client: brand streams, competitor streams, and industry keyword streams. Run the first sweep to establish the reputation baseline.

## Context

The Brand Monitoring Specialist needs Awario streams configured before they can begin their daily mention sweeps. This task creates the full monitoring setup for a new client and produces the starting reputation baseline.

## Steps

1. **Create brand streams** in Awario for the client:
   - Primary business name (exact match)
   - Business name variations (common abbreviations, misspellings)
   - Owner's name (if they are public-facing)

2. **Create competitor streams** (3 competitors):
   - Use the top 3 local competitors provided in the client brief, or identify them via Google Maps search for "[primary service] [city]"
   - One stream per competitor (business name)

3. **Create industry keyword streams** (2–3 streams):
   - "[primary service] + [city]"
   - "[primary service] review + [city]" (catches untagged complaints)
   - One additional relevant industry term from the client brief

4. **Configure stream settings for all streams:**
   - Language: English
   - Geo: client's service area + 20% radius
   - Exclude: the agency's own accounts (to prevent internal noise)
   - Exclude: any irrelevant homonyms if the business name is ambiguous

5. **Run the first sweep.** Pull all mentions from the last 30 days across all streams.

6. **Categorize the initial mentions** using the sentiment rubric in the `reputation-monitoring` skill.

7. **Produce the Awario setup confirmation** (format from `client-onboarding` skill Pillar 3) including:
   - All stream names and IDs
   - First sweep results: mention count and sentiment baseline
   - Any immediate high-urgency items found in the 30-day lookback

8. **Deliver** to the Reputation Director. Copy to the Reporting Director (for the first monthly report baseline).

## Deliverable

Awario setup confirmation including all stream configurations and the 30-day reputation baseline (mention volume + sentiment breakdown).

## Approval Gate

This is a read/setup task. No client-facing action is required. The output feeds the onboarding completion report.
