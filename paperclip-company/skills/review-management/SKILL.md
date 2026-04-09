---
name: review-management
description: >
  Review response drafting, review request campaigns, and rating recovery
  playbooks for the Review Management Specialist.
---

# Review Management

This skill covers how the Review Management Specialist monitors reviews, drafts responses, runs review request campaigns, and builds rating recovery plans. No response is ever posted without human approval.

---

## Workflow 1: Daily Review Check

**Trigger:** Daily heartbeat.  
**Goal:** Detect new reviews on Google and Facebook for all active clients.

### Steps

1. **Check for new reviews** via BrightLocal Review Monitoring API and/or GHL Review integration for each client across Google Business Profile and Facebook.

2. **Log each new review:**
   ```
   CLIENT: [Name]
   PLATFORM: Google / Facebook
   DATE: [review date]
   RATING: [1–5 stars]
   REVIEWER: [first name only or "Anonymous"]
   CONTENT: [full review text]
   ```

3. **Triage by star rating:**
   - 5-star: Queue for a warm, appreciative response.
   - 4-star: Queue for a warm response, acknowledge any minor note they left.
   - 3-star: Queue for an empathetic, improvement-focused response. Flag to Reputation Director.
   - 1–2 star: Queue for an empathetic, solution-focused response. Flag immediately to Reputation Director.

4. **Draft the response** (see Workflow 2 below).

5. **Compile batch** — all drafted responses for the day across all clients — and deliver to the Reputation Director for approval queue submission.

---

## Workflow 2: Review Response Drafting

**Goal:** Draft a response that sounds authentically human, matches the client's brand voice, and serves a dual purpose — thanking the reviewer and signaling to future readers that the business is attentive and professional.

### Response Framework

**For Positive Reviews (4–5 stars)**
```
Structure: Thank + Personalize + Reinforce + Invite back
Length: 2–4 sentences
Tone: Warm, genuine, not robotic

Template:
"[Personalized opener — reference something specific from their review if possible]. 
[Reinforcement — briefly echo the value they mentioned]. 
[Invite back / forward-looking CTA]. 
– [Owner first name or Team name]"

Example (5-star, plumber):
"Thanks so much, [Reviewer Name]! We're really glad the emergency repair went smoothly — we know a burst pipe is stressful and our team always aims to get there fast and leave things better than we found them. We appreciate you trusting us and hope to be your go-to plumber in [City] for years to come. – Mike at Acme Plumbing"
```

**For Neutral / Mixed Reviews (3-star)**
```
Structure: Thank + Acknowledge + Empathize + Commit to improvement + Invite direct contact
Length: 3–5 sentences
Tone: Warm, professional, solution-focused

Template:
"Thank you for taking the time to share this, [Name]. [Acknowledge what went well if anything]. 
[Acknowledge the concern directly — do not be defensive]. 
[Commit to improvement or offer to make it right]. 
We'd love the chance to earn that 5th star — please reach out directly at [phone/email]. – [Owner name]"
```

**For Negative Reviews (1–2 star)**
```
Structure: Thank + Empathize + Take responsibility (without admitting liability) + Offer direct resolution + Do NOT argue publicly
Length: 3–5 sentences
Tone: Empathetic, calm, professional — never defensive or dismissive

Template:
"Thank you for your feedback, [Name]. We're sorry to hear your experience didn't meet the standard we hold ourselves to. 
[Briefly acknowledge the issue — don't repeat it at length; don't escalate it publicly]. 
We'd like to make this right — please contact us directly at [phone/email] so we can address this personally. – [Owner name]"

NEVER: Don't argue the facts of the review publicly. Don't offer discounts or refunds in the public response (take it offline). Don't name-call or question the reviewer's credibility.

ESCALATION: If the review contains allegations of negligence, injury, fraud, or legal action — flag to Reputation Director and COO. Do NOT draft a response. This requires board-level review.
```

### Brand Voice Matching
Before drafting, check the client's brand voice guidelines on file:
- Formal or casual tone?
- Does the owner sign off with first name, full name, or "The [Business] Team"?
- Any words or phrases to avoid?
- Preferred contact method (phone or email)?

---

## Workflow 3: Review Request Campaign Setup

**Goal:** Systematically generate new reviews by triggering requests after completed appointments.

### Process

This workflow works in coordination with the Lead Automation Specialist in the CRM department.

1. **Identify the trigger:** The most effective trigger is "appointment completed" status in GHL. Confirm this event is firing correctly (coordinate with Lead Automation Specialist).

2. **Timing:** The review request should go out 2–4 hours after appointment completion — when the service is fresh but the customer has had a moment to settle.

3. **Draft the review request SMS template:**
   ```
   Hi [First Name], thanks so much for choosing [Business Name] today! 
   We'd love to hear how it went — if you have 60 seconds, your review would mean a lot to us: [Google Review Link]
   Thanks! – [Owner First Name]
   ```

4. **Queue the template** for board approval as part of a CRM automation proposal (routed through CRM Director → board).

5. **Monitor results:** Track weekly: how many requests sent, how many reviews generated (compare BrightLocal review count week-over-week). Report conversion rate to Reputation Director.

---

## Workflow 4: Rating Recovery Plan

**Trigger:** Client's Google rating falls below 4.0, or is trending downward over 30+ days.

### Plan Structure

1. **Assess root cause:**
   - Are the negative reviews legitimate complaints about a specific issue (e.g., response time, pricing, communication)?
   - Are any reviews suspicious (competitor activity, fake reviews)?

2. **Fake review investigation:**
   - Check if reviewers have review history across many businesses (fake review farms).
   - Flag suspicious reviews to the Reputation Director for a Google removal request (via Google's review policy violation process — this takes 1–4 weeks and is not guaranteed).

3. **Increase legitimate review volume:**
   - Increase review request frequency (coordinate with Lead Automation Specialist to optimize the trigger timing).
   - Propose a "review ask" follow-up at the 30-day and 90-day mark for past customers who haven't reviewed.
   - Suggest the owner personally ask their most satisfied customers to leave a review (provide a script).

4. **Response quality improvement:**
   - All negative reviews get a warm, solution-focused response (see Workflow 2).
   - Reach out to 1–2-star reviewers offline to resolve the issue. If resolved, politely ask them to update their review.

5. **Compile the recovery plan** and queue for Reputation Director and board approval before implementing any changes.
