---
name: crm-automation
description: >
  CRM strategy and oversight skill for the CRM Director: pipeline governance,
  automation health standards, cross-department coordination, and GHL platform management.
---

# CRM & Automation Strategy

This skill guides the CRM Director in managing the agency's GoHighLevel platform, overseeing the automation and onboarding specialists, and ensuring all client CRM systems are performing at standard. All client-facing workflow activations require board approval.

---

## 1. CRM Health Standards

Every active client sub-account should meet these minimum health standards. The CRM Director reviews these monthly using specialist reports.

### Pipeline Health

| Standard | Target | Flag If |
|----------|--------|---------|
| Speed-to-contact (<5 min) | >70% | <50% for 2+ consecutive weeks |
| Lead → Appointment rate | >25% | <15% for 2+ consecutive weeks |
| Stale leads (no activity >14 days) | <10% of pipeline | >20% of pipeline stale |
| Automation error rate | <2% of executions | >5% of executions failing |
| Missed appointment rate (no-shows) | <20% | >30% |

When any metric falls below the "flag" threshold, the CRM Director:
1. Diagnoses the root cause using specialist reports
2. Proposes a corrective action
3. Queues the action for board approval if it involves workflow changes

### Automation Quality Standards

All GHL workflows across all clients must:
- Have at least one exit condition (reply from lead exits the sequence)
- Include an opt-out mechanism in every SMS ("Reply STOP to unsubscribe")
- Never send more than 2 SMS messages per day to any single contact
- Never send messages between 9 PM and 8 AM local time (configure quiet hours in GHL)
- Use the client's approved business name in all outgoing messages — no agency branding in client-facing SMS/email

---

## 2. Goal Decomposition for CRM Department

When the COO assigns a CRM goal, decompose it using this framework.

### Classify the Goal

| Goal Type | Definition | Assign To |
|-----------|-----------|-----------|
| Pipeline performance improvement | Conversion rates are off target | Lead Automation Specialist |
| New automation build | A new workflow sequence needed | Lead Automation Specialist |
| Automation audit / fix | Broken or underperforming workflows | Lead Automation Specialist |
| New client setup | Onboard a new client across all pillars | Onboarding Specialist |
| Template update | Revise SMS/email copy in existing workflows | Lead Automation Specialist |
| Integration setup | Connect a new tool or webhook to GHL | Lead Automation Specialist + coordination with Marketing Director if ad platform |

### Decompose into Sub-Tasks

For each goal, produce a task assignment for the relevant specialist:
```
TASK ASSIGNMENT — [Date]
ASSIGNED TO: [Lead Automation Specialist / Onboarding Specialist]
CLIENT: [Name]
GOAL: [Plain-English description]
SUCCESS CRITERION: [Measurable outcome]
DELIVERABLE: [What to produce — a spec, a report, a completed setup]
DEADLINE: [Date]
CONSTRAINTS: [Any approval gates, budget limits, or dependencies]
```

---

## 3. Master GHL Snapshot Governance

The agency maintains one master GHL snapshot that is deployed to every new client. The CRM Director owns this snapshot.

### What Goes in the Master Snapshot

- All 6 standard workflows (see `ghl-automation` skill Section 1) with placeholder variables (not client-specific copy)
- Standard pipeline stages (generic — specialist customizes for each client's industry)
- Email and SMS templates using `{{contact.first_name}}` and `{{business_name}}` variables
- Lead capture forms (contact form, quote request form)
- Calendar booking widget configuration

### Snapshot Update Process

When an improvement to the master snapshot is identified:
1. Lead Automation Specialist drafts the change (new workflow, improved template copy, etc.)
2. CRM Director reviews
3. Changes that affect client-facing messaging are queued for board approval
4. After approval, update the master snapshot
5. Document the change in the snapshot changelog

The snapshot changelog format:
```
[Date] | Version [X.Y] | Change: [description] | Approved by: Board/CRM Director | Author: Lead Automation Specialist
```

---

## 4. Cross-Department Coordination

The CRM Director is the integration point between the CRM/automation systems and the other three departments. Watch for these coordination needs:

| Trigger | Action |
|---------|--------|
| Ads Specialist reports high lead volume from a new campaign | Verify the GHL speed-to-lead workflow is active and firing for the lead source |
| SEO Specialist wants to trigger review requests after GBP appointments | Coordinate with Lead Automation Specialist to set up the GHL trigger |
| Reputation Director wants to run a review request re-engagement campaign | Lead Automation Specialist builds the workflow spec; CRM Director approves before board review |
| Reporting Director needs GHL data for the monthly report | Pull and share the data via API or GHL export in read-only format |
| New client is being onboarded | Assign the Onboarding Specialist immediately upon board sign-off |

### Coordination Log

Keep a running log of cross-department requests received and their status:
```
[Date] | From: [Department] | Request: [brief description] | Status: [In progress / Completed / Blocked] | Notes: [any context]
```

---

## 5. Monthly CRM Department Review

On the last Friday of each month, compile the CRM Department Monthly Review for the COO:

```
CRM DEPARTMENT MONTHLY REVIEW — [Month]

PIPELINE HEALTH (all clients):
| Client | Speed-to-Contact | Lead→Appt Rate | Stale Leads | Automation Errors |
|--------|-----------------|----------------|------------|-------------------|
| [Name] | [X]% | [X]% | [X]% | [X]% |

AUTOMATIONS STATUS:
- Total active workflows across all clients: [X]
- Executions this month: [X]
- Errors / failed executions: [X] ([X]%)

ONBOARDING STATUS:
- Clients in onboarding: [list]
- Stage reached per client: [GHL / BrightLocal / Awario / Ads]

ISSUES ESCALATED TO BOARD:
- [Any workflow changes, new automation activations, or onboarding approvals pending]

NEXT MONTH PRIORITIES:
1. [Priority 1]
2. [Priority 2]
```
