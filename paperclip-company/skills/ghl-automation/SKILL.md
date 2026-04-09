---
name: ghl-automation
description: >
  GoHighLevel workflow automation skill: building pipelines, configuring automations,
  auditing workflows, and monitoring pipeline health for the Lead Automation Specialist.
---

# GHL Automation

This skill covers how the Lead Automation Specialist builds, configures, audits, and optimizes GoHighLevel automation workflows and pipelines for all active clients. All workflow changes affecting client-facing communications require board approval before activation.

---

## 1. Standard Agency Workflow Library

Every client sub-account should have these core automations deployed from the master snapshot. Verify each is present and functioning during onboarding and monthly audits.

| Workflow Name | Trigger | Actions | Purpose |
|---------------|---------|---------|---------|
| **New Lead Speed-to-Lead** | New contact created / form submission | Immediate: SMS + email (within 5 min) | First contact while lead is hot |
| **Lead Nurture — No Response** | No reply after initial contact (24h) | Day 1: SMS reminder; Day 3: Email; Day 7: Final SMS | Re-engage non-responsive leads |
| **Appointment Confirmation** | Appointment booked | Instant: Confirmation SMS; -24h: Reminder SMS; -2h: Reminder SMS | Reduce no-shows |
| **Appointment Completed → Review Request** | Appointment status = "Completed" | +2h: Review request SMS | Generate Google reviews post-service |
| **Won Client Onboarding** | Opportunity moved to "Won" | Email sequence: welcome → service checklist → check-in | Client experience |
| **Re-Engagement (90-day cold)** | No activity in 90 days | SMS + Email: "Are you still looking for [service]?" | Revive cold leads |

---

## 2. Workflow Audit Protocol

**Trigger:** Weekly heartbeat (Wednesday).  
**Goal:** Verify all active automations are running without errors.

### Steps

1. **Pull workflow execution logs** from GHL API for each client sub-account. Check the last 7 days.

2. **Flag any of the following issues:**
   - Workflows with 0 executions in the last 7 days when they should have fired (e.g., New Lead Speed-to-Lead hasn't fired but there are new leads in the pipeline)
   - Contacts stuck in a workflow step for more than 48 hours (suggests an action failure)
   - SMS or email delivery failures (check GHL message log for bounces, undeliverable)
   - Trigger conditions that no longer match (e.g., pipeline stage name was renamed but workflow still references old name)

3. **Compile the audit report:**
   ```
   WORKFLOW AUDIT REPORT — [Week of Date]
   CLIENT: [Name]
   
   ISSUES FOUND:
   - [Workflow name]: [Issue description] | [Affected contacts: X] | Recommended fix: [action]
   
   WORKFLOWS HEALTHY: [X of Y total workflows running clean]
   
   STUCK CONTACTS:
   - [Contact ID] | [Workflow] | [Step stuck at] | [Days stuck]
   
   RECOMMENDED ACTIONS (pending approval):
   [List fixes, each with urgency level]
   ```

4. **Deliver** to CRM Director.

---

## 3. New Workflow Build Spec

When directed to build a new automation (e.g., a new follow-up sequence or a seasonal campaign workflow):

### Spec Format
Produce a complete workflow specification **before** building anything in GHL. Queue the spec for CRM Director and board approval.

```
WORKFLOW SPEC — [Workflow Name]
CLIENT: [Name]
PURPOSE: [What problem this solves / what outcome it drives]

TRIGGER:
- Event: [e.g., Form submitted, Tag added, Appointment status changed]
- Conditions: [Any filters — e.g., "only if source = Facebook Lead Ad"]

STEPS:
Step 1 | Timing: [Immediate / +Xh / +Xd] | Action: [SMS / Email / Internal notification / Wait] 
  - If SMS: [Full message text — 160 chars max]
  - If Email: Subject: [X] | Body: [full copy or outline]
  - If Internal: [Tag added / Pipeline stage moved / Notification to team]

Step 2 | Timing: [X] | Action: [...]
  [Continue for all steps]

EXIT CONDITIONS:
- [e.g., Contact replies → exit sequence]
- [e.g., Appointment booked → exit sequence]
- [e.g., Contact opts out → exit sequence and add DNC tag]

EXPECTED OUTCOME:
[What success looks like — a KPI to track]

ACTION REQUIRED: Approve to build in GHL
```

---

## 4. Pipeline Configuration

Each client needs a properly configured sales/service pipeline. Standard pipeline stages for local service businesses:

```
New Lead → Contacted → Appointment Booked → Appointment Confirmed → Job Complete → Invoice Sent → Won → Lost
```

**Custom stages by industry:**
- **HVAC/Plumbing:** Add "Estimate Sent" between Contacted and Appointment Booked
- **Dental:** Add "Insurance Verified" before Appointment Confirmed
- **General Contractor:** Add "Site Visit Scheduled" and "Proposal Sent"

**Rules for pipeline configuration:**
- Never delete a stage that has active contacts — move contacts to an adjacent stage first, then archive.
- Pipeline stage names must match exactly what is referenced in workflow triggers.
- Each stage should have a clear definition of what it means (document this in the client notes section).

---

## 5. Pipeline Performance Reporting

**Trigger:** Weekly heartbeat (Wednesday, alongside audit).  
**Goal:** Track lead conversion rates through each pipeline stage.

### Metrics to Pull (via GHL API)

For each client, for the past 30 days:
- New leads added
- Leads per stage (snapshot of current pipeline)
- Conversion rate: New Lead → Contacted (target: >70% within 5 min)
- Conversion rate: Contacted → Appointment Booked (target: >30%)
- Conversion rate: Appointment Booked → Won (this is largely on the client)

### Report Format
```
PIPELINE PERFORMANCE — [Date]
CLIENT: [Name]

New Leads (last 30 days): [X]
Speed-to-Contact (<5 min): [X]% (target: >70%)
Lead → Appointment: [X]% (target: >30%)

PIPELINE SNAPSHOT:
New Lead: [X contacts]
Contacted: [X]
Appointment Booked: [X]
Won: [X]
Lost: [X]
Stale (>14 days no activity): [X] ← FLAG

RECOMMENDED ACTIONS: [e.g., "15 contacts stale >14 days — recommend re-engagement workflow trigger"]
```

Deliver to CRM Director for inclusion in the weekly CRM summary.
