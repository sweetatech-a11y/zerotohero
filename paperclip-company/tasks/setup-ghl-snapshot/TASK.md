---
name: Set Up GHL Master Snapshot
assignee: onboarding-specialist
project: client-onboarding
---

# Set Up GHL Master Snapshot

Configure the standard GoHighLevel sub-account snapshot for a new client onboarding. This task runs as part of every new client onboarding project.

## Context

The master snapshot is the agency's pre-built GHL template containing all standard pipelines, automations, workflows, forms, and templates. The Onboarding Specialist deploys this snapshot onto a fresh client sub-account and then customizes it for the specific client.

## Steps

1. **Create the new sub-account** in the agency GHL dashboard using the client's business name, address, phone, and timezone.

2. **Deploy the master snapshot** onto the new sub-account. Confirm all 6 standard workflows are present:
   - New Lead Speed-to-Lead
   - Lead Nurture — No Response
   - Appointment Confirmation
   - Appointment Completed → Review Request
   - Won Client Onboarding
   - Re-Engagement (90-day cold)

3. **Customize all templates** with the client's details:
   - Replace `{{agency_placeholder_name}}` with client's business name
   - Replace `{{owner_first_name}}` with the client owner's first name
   - Replace `{{google_review_link}}` with the client's actual Google Review link
   - Replace `{{primary_phone}}` with the client's main phone number

4. **Configure pipeline stages** for the client's industry (see `ghl-automation` skill Section 4).

5. **Test the Speed-to-Lead workflow** with a test contact. Confirm:
   - First SMS fires within 60 seconds of contact creation
   - SMS content is correct (client's name, not placeholder text)
   - Test contact is deleted after verification

6. **Produce the GHL setup confirmation checklist** (format from `client-onboarding` skill Pillar 1).

7. **Queue the confirmation** for CRM Director review. Do not mark the sub-account as live until the full onboarding completion report is board-approved.

## Deliverable

A completed GHL setup confirmation checklist delivered to the CRM Director, covering all pipeline stages, workflow deployment, template customization, and Speed-to-Lead test result.

## Approval Gate

This task's output feeds the onboarding completion report. The sub-account only goes live after board approval of the full report.
