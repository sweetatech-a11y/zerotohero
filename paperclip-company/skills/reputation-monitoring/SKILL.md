---
name: reputation-monitoring
description: >
  Awario-powered brand and reputation monitoring: daily mention sweeps,
  sentiment categorization, competitor intelligence, and share-of-voice tracking.
---

# Reputation Monitoring

This skill defines the Brand Monitoring Specialist's workflows using Awario for daily mention sweeps, competitor tracking, and share-of-voice analysis. All data is internal — no raw mention data is shared externally.

---

## Workflow 1: Daily Awario Mention Sweep

**Trigger:** Daily heartbeat.  
**Goal:** Categorize all new brand mentions since the last sweep, flag negatives.

### Steps

1. **Pull new mentions** from Awario API for each client's brand stream. Filter to mentions since the previous sweep timestamp. Sources include: Google (reviews), Facebook, Instagram, Twitter/X, Reddit, news sites, forums, blogs.

2. **Categorize each mention** using this scoring rubric:

   | Category | Criteria |
   |----------|----------|
   | **Positive** | Recommends the business, compliments service, shares good experience, 4–5 star review language |
   | **Neutral** | Informational mention, directory listing, no sentiment, branded search result |
   | **Negative — Low** | Minor complaint, isolated negative comment, low-reach source (<1,000 followers), 3-star or below |
   | **Negative — Medium** | Public complaint with engagement (replies, likes), mentions by mid-reach accounts (1k–10k followers) |
   | **Negative — High** | Viral post, news article, verified/high-follower account, multiple negative mentions in 24h from same issue |

3. **For Negative — High mentions:** Alert the Reputation Director immediately. Do not wait for the daily digest. Include: source URL, reach estimate, content summary, suggested urgency level.

4. **Compile the daily digest:**
   ```
   DAILY REPUTATION DIGEST — [Date]
   CLIENT: [Name]
   
   NEW MENTIONS: [X total]
   - Positive: [X]
   - Neutral: [X]
   - Negative (Low): [X]
   - Negative (Medium): [X]
   - Negative (High): [X] ← REQUIRES ATTENTION
   
   FLAGGED ITEMS:
   [Source] | [Reach] | [Category] | [Summary] | [URL]
   
   NOTABLE POSITIVE:
   [Summary of best positive mention, if any]
   ```

5. **Deliver** to the Reputation Director.

---

## Workflow 2: Awario Stream Configuration

**Trigger:** New client onboarding or when directed by Reputation Director.  
**Goal:** Create comprehensive monitoring streams that catch all relevant mentions.

### Stream Types to Create Per Client

**Brand streams (create all of these):**
- Primary business name (exact match)
- Business name variations (abbreviations, common misspellings)
- Owner's name (if they are the face of the business)
- Key staff names (if notable or public-facing)
- Business phone number (catches directory spam and complaints)
- Business address (catches location-tagged complaints)

**Competitor streams (3 per client, based on top local competitors):**
- Competitor business name
- Owner name (if known)

**Industry keyword streams (2–3 per client):**
- "[Service] + [City]" (e.g., "plumber miami")
- "[Service] + [City] + review/complaint" (to catch untagged complaints)
- Industry-specific terms (e.g., "drain clog" for a plumber — to catch problem-aware mentions)

**Configuration settings per stream:**
- Language: English
- Geo: Set to client's service area radius + 20%
- Exclude: Own agency's social accounts (to avoid internal noise)
- Exclude: Irrelevant homonyms if business name is ambiguous (e.g., "Diamond" → exclude "Diamond ring," "diamond mining")

After setup, deliver a stream configuration report to the Reputation Director confirming all streams are live and receiving data.

---

## Workflow 3: Weekly Competitor Intelligence Report

**Trigger:** Weekly heartbeat (Thursday).  
**Goal:** Summarize competitor mention trends for strategic intelligence.

### Steps

1. **Pull last 7 days of mentions** from each client's competitor streams in Awario.

2. **For each competitor, summarize:**
   - Total mention volume vs. previous week
   - Sentiment breakdown (% positive / neutral / negative)
   - Top 2–3 notable mentions (new promotions, press coverage, complaints)
   - Any keywords or topics spiking in competitor mentions

3. **Identify strategic signals:**
   - Is a competitor getting a surge of complaints? (Opportunity: your client can capitalize with better service marketing)
   - Is a competitor running a new promotion? (Alert Marketing Director)
   - Is a competitor getting positive press? (Note for client strategy discussion)

4. **Compile the report:**
   ```
   COMPETITOR INTELLIGENCE REPORT — [Week of Date]
   CLIENT: [Name]
   
   COMPETITOR: [Name]
   Mention Volume: [X] this week vs. [Y] last week ([+/-]%)
   Sentiment: [X]% positive, [X]% neutral, [X]% negative
   Notable: [1–2 sentence summary]
   
   [Repeat for each competitor]
   
   STRATEGIC SIGNALS:
   [Any actionable observations — 2–3 bullets max]
   ```

5. **Deliver** to Reputation Director for inclusion in COO's weekly digest.

---

## Workflow 4: Monthly Share-of-Voice Report

**Trigger:** Monthly heartbeat (25th of each month).  
**Goal:** Quantify the client's brand presence relative to top 3 competitors.

### Steps

1. **Pull last 30 days of mention volume and sentiment** for the client and each of their top 3 competitors from Awario.

2. **Calculate Share of Voice:**
   - Total mentions in the pool = client mentions + competitor 1 + competitor 2 + competitor 3
   - Client SoV = client mentions ÷ total × 100

3. **Calculate Sentiment Share:**
   - For the client: % of their mentions that are positive
   - For each competitor: same calculation

4. **Trend over time:** Compare to last month and the month before. Is SoV growing, shrinking, or stable?

5. **Compile the report section** (for handoff to Reporting Director):
   ```
   SHARE OF VOICE — [Month]
   CLIENT: [Name]
   
   Brand Mention Volume: [X] ([+/-]% vs last month)
   Share of Voice: [X]% (vs. [X]% last month)
   Positive Sentiment Rate: [X]%
   
   COMPETITOR COMPARISON:
   | Brand | Mentions | SoV | Positive % |
   |-------|----------|-----|------------|
   | [Client] | [X] | [X]% | [X]% |
   | [Comp 1] | [X] | [X]% | [X]% |
   | [Comp 2] | [X] | [X]% | [X]% |
   | [Comp 3] | [X] | [X]% | [X]% |
   
   INSIGHT: [1–2 plain-English sentences interpreting the data]
   ```

6. **Deliver** to Reporting Director for the monthly client report, and to Reputation Director for strategic review.
