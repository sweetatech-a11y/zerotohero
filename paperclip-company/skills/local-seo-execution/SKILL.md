---
name: local-seo-execution
description: >
  Step-by-step Local SEO execution workflows for the SEO Specialist:
  daily GBP post drafting, rank monitoring, citation audits, and review request triggers.
---

# Local SEO Execution

This skill defines the exact workflows the Local SEO Specialist follows to execute local SEO tasks across all active clients. Every step that produces client-facing output ends with a queue action — never a publish action.

---

## Workflow 1: Daily GBP Post Drafting

**Trigger:** Daily heartbeat.  
**Goal:** Produce one ready-to-approve GBP post draft per active client.

### Steps

1. **Load client context.** For each active client, retrieve from the client brief:
   - Primary service category (e.g., "emergency plumbing")
   - Service area (city/neighborhood)
   - Any seasonal event, local news, or holiday in the next 7 days

2. **Choose a post angle.** Select from the weekly schedule defined in the `gbp-management` skill (service highlight, offer/promotion, team/trust, local event/community). Track which type was last used to rotate correctly.

3. **Draft the post body.** Write a 130–160 word post following this structure:
   - **Opening hook (1 sentence):** Reference a local context, season, or common problem. Example: "Miami summers mean your AC works harder than ever — and so do we."
   - **Service body (2–3 sentences):** Describe the relevant service with specifics (what you do, how fast, why it matters).
   - **Social proof signal (1 sentence):** A generic trust signal ("Our techs are licensed, background-checked, and have served [City] homeowners since [year]").
   - **Call to action (1 sentence):** Direct and specific. "Call us today or book online — same-day appointments available."
   - **Closing hashtags (3–5):** Local + service. Example: `#MiamiPlumber #EmergencyPlumbing #MiamiFL`

4. **Draft the image prompt.** Write a DALL-E or Midjourney-style prompt for an image to accompany the post. Format: `"Photorealistic image of [service worker] [action] in a [location type] setting, professional uniform, natural lighting, no text overlays."`

5. **Queue for approval.** Package the draft as:
   ```
   CLIENT: [Client Name]
   POST TYPE: [Service Highlight / Offer / Trust / Community]
   ---
   [Post body]
   ---
   SUGGESTED IMAGE PROMPT: [prompt]
   PUBLISH WINDOW: [today's date + 1 day range]
   ACTION REQUIRED: Approve to publish / Edit / Reject
   ```

6. **Do not publish.** The post goes to the approval queue. No GBP API call is made until approval is received.

---

## Workflow 2: Daily Rank Monitoring

**Trigger:** Daily heartbeat (after BrightLocal's overnight rank update is available, typically 6–8 AM local time).  
**Goal:** Identify any keyword position changes and flag drops of 3+ positions.

### Steps

1. **Pull rank data.** For each active client, call the BrightLocal Rank Checker API to retrieve the latest keyword positions for all tracked keywords. Pull both Google Maps Pack and Organic positions.

2. **Compare to previous day.** Diff the new positions against yesterday's stored positions.

3. **Categorize changes:**
   - **No change:** Log only.
   - **Improvement (any):** Log and include in the weekly SEO summary as a win.
   - **Drop of 1–2 positions:** Log and monitor.
   - **Drop of 3+ positions:** Flag for action (see step 4).
   - **Drop out of top 20 or out of Maps Pack:** Flag as urgent.

4. **For each flagged keyword, draft a recommended action:**
   - *Maps Pack drop:* "GBP has not been posted to in [X days] — schedule a post" OR "Citation count for this keyword's geo-area is below average — run citation audit."
   - *Organic drop:* "Consider publishing a new service page or blog post targeting [keyword]" OR "Check for any recent site changes or technical issues."
   - *Multiple keywords dropping simultaneously:* "Possible algorithm update or site-level issue — escalate to Marketing Director."

5. **Compile the daily rank report:**
   ```
   RANK MONITORING REPORT — [Date]
   CLIENT: [Name]
   
   FLAGGED DROPS (action required):
   - "[keyword]": #[old] → #[new] | Recommended: [action]
   
   IMPROVEMENTS:
   - "[keyword]": #[old] → #[new]
   
   NO CHANGE: [count] keywords stable
   ```

6. **Deliver** to the Marketing Director. Flagged items are also added to the pending task queue.

---

## Workflow 3: Weekly Citation Audit

**Trigger:** Weekly heartbeat (Monday).  
**Goal:** Identify NAP (Name, Address, Phone) inconsistencies across citation sources.

### Steps

1. **Pull citation data.** For each client, call the BrightLocal Citation Tracker API to retrieve the current citation list and NAP data on file for each source.

2. **Compare against master NAP.** Each client has a master NAP record in the client brief. Compare every citation's Name, Address, and Phone against the master.

3. **Flag inconsistencies.** Common issues:
   - Wrong phone number (old number, tracking number vs. main number)
   - Address formatting inconsistency ("St" vs "Street", missing suite number)
   - Business name variation ("Joe's Plumbing" vs "Joe's Plumbing LLC")
   - Missing citations on high-DA sources (Yelp, Yellow Pages, BBB, Angi)

4. **Draft correction submissions.** For each inconsistency, prepare a correction record:
   ```
   SOURCE: [directory name] | URL: [listing URL]
   CURRENT: [incorrect data]
   CORRECT: [master NAP data]
   ACTION: Update listing
   ```

5. **Queue for approval.** Compile all correction submissions into a citation audit report. Queue for human approval before any submission is made.

6. **After approval,** execute the corrections via BrightLocal's Citation Builder or manually as instructed.

---

## Workflow 4: Review Request Trigger

**Trigger:** GHL appointment marked as "Completed."  
**Goal:** Fire the post-appointment review request SMS via GHL automation.

### Steps

1. **Detect completion event.** Listen for the GHL webhook or poll the GHL API for appointments updated to "Completed" status since the last check.

2. **Check eligibility.** The contact must:
   - Have a valid mobile phone number on file
   - Not have received a review request in the last 90 days
   - Not have already left a review (check BrightLocal review count — flag for manual verification if uncertain)

3. **Trigger the GHL automation.** Fire the "Post-Appointment Review Request" workflow for the contact. This sends a pre-approved SMS template (e.g., "Hi [First Name], thanks for choosing [Business Name]! We'd love your feedback: [Google Review Link]").

4. **Log the trigger.** Record in the tracking sheet:
   ```
   CLIENT: [name] | CONTACT ID: [GHL ID] | DATE: [today] | TRIGGER: Review Request SMS | STATUS: Sent
   ```

5. **Never send a custom or non-approved SMS.** Only trigger pre-approved GHL automation workflows. If the standard workflow doesn't exist yet, flag to the CRM Director.
