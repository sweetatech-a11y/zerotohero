# Agency Zero to Hero

A complete [Paperclip](https://github.com/paperclipai/paperclip) agent company package for running a full-service local marketing agency. Eleven agents across four departments handle Local SEO, paid ads, CRM automation, and reputation management — while the human owner retains full approval authority over every outward-facing action.

---

## What This Company Does

Agency Zero to Hero delivers local marketing for small businesses — plumbers, HVAC companies, dentists, and similar local service providers. The agents handle the daily execution work (drafting GBP posts, monitoring ad performance, tracking keyword rankings, responding to reviews) so the agency owner can focus on client relationships and strategic decisions.

**The core principle: agents draft, humans approve.** Nothing gets published, posted, sent to a client, or changed in a live ad account without the owner signing off first.

---

## The Four-Department Structure

The company runs as a hierarchical hub-and-spoke organization. The COO coordinates four departments, each led by a director who manages specialist agents below them.

### Org Chart

```
Board (Human Owner)
└── COO
    ├── Marketing Director
    │   ├── Local SEO Specialist
    │   └── Paid Ads Specialist
    ├── CRM & Automation Director
    │   ├── Lead Automation Specialist
    │   └── Client Onboarding Specialist
    ├── Reputation & Brand Director
    │   ├── Review Management Specialist
    │   └── Brand Monitoring Specialist
    └── Reporting Director
```

### Agent Roster

| Agent | Title | Reports To | Key Skills |
|-------|-------|-----------|-----------|
| `coo` | Chief of Operations | Board (null) | agency-strategy, client-reporting |
| `marketing-director` | Director of Marketing | coo | marketing-strategy |
| `crm-director` | Director of CRM & Automation | coo | crm-automation |
| `reputation-director` | Director of Reputation & Brand | coo | reputation-monitoring |
| `reporting-director` | Director of Reporting | coo | client-reporting |
| `seo-specialist` | Local SEO Specialist | marketing-director | local-seo-execution, gbp-management |
| `ads-specialist` | Paid Ads Specialist | marketing-director | paid-ads-execution, meta-ads-management |
| `lead-automation-specialist` | Lead Automation Specialist | crm-director | ghl-automation, lead-followup |
| `onboarding-specialist` | Client Onboarding Specialist | crm-director | client-onboarding |
| `review-specialist` | Review Management Specialist | reputation-director | review-management |
| `brand-monitor-specialist` | Brand Monitoring Specialist | reputation-director | reputation-monitoring |

---

## How Goals Flow Through the Company

1. **Board → COO:** Owner sets company-level goals (e.g., "Improve lead flow for Client A")
2. **COO → Directors:** COO breaks goals into department-level assignments
3. **Directors → Specialists:** Directors decompose into specific tasks for their specialist agents
4. **Specialists execute:** Run skill workflows — draft posts, pull rank data, monitor mentions, build automations
5. **Outputs bubble up:** Specialists deliver results/drafts to directors → directors report to COO → COO produces the weekly board digest
6. **Board approves outward actions:** Any action affecting the outside world (publishing, sending, launching) hits the approval queue before execution

---

## Approval-First Philosophy

Every agent that can affect the outside world operates in **draft-then-approve** mode:

| Agent | What They Draft | Approval Required Before |
|-------|----------------|--------------------------|
| SEO Specialist | GBP posts, citation corrections | Publishing to Google Business Profile |
| Ads Specialist | Budget changes, campaign actions, creative briefs | Any change in Meta or Google Ads |
| Review Specialist | Review responses | Posting any response on Google or Facebook |
| Brand Monitor Specialist | Public response recommendations | Any public engagement |
| Lead Automation Specialist | New workflow specs, template changes | Activating any client-facing automation |
| Onboarding Specialist | Onboarding completion reports | Marking client as "active," enabling live automations |
| Reporting Director | Monthly client reports | Sending reports to clients |

The board (owner) also approves: new client onboarding, budget increases over $500/month, new campaign launches, and any change to live GHL workflows.

---

## Tool Stack

| Tool | Department | Purpose |
|------|-----------|---------|
| **GoHighLevel (GHL)** | CRM & Marketing | Lead pipelines, automations, review requests, client sub-accounts |
| **BrightLocal** | Marketing & Reporting | Rank tracking, citation audits, review monitoring |
| **Madgicx** | Marketing | Meta Ads optimization, creative analytics |
| **Awario** | Reputation | Brand monitoring, competitor intelligence, share-of-voice |
| **Google Ads API** | Marketing | Google Search and Local Services ad monitoring |

---

## Skill Library

This package includes 12 custom skills:

| Skill | Used By | What It Covers |
|-------|---------|---------------|
| `local-seo-execution` | SEO Specialist | Daily GBP post drafting, rank monitoring, citation audits, review request triggers |
| `gbp-management` | SEO Specialist | GBP audit checklist, post schedule, Q&A management, photo cadence, insights |
| `paid-ads-execution` | Ads Specialist | Daily performance checks, budget pacing, creative review, audience health |
| `meta-ads-management` | Ads Specialist | Meta campaign architecture, pixel verification, Madgicx integration, lead quality |
| `ghl-automation` | Lead Automation Specialist | Workflow library, audit protocol, new workflow build specs, pipeline configuration |
| `lead-followup` | Lead Automation Specialist | Speed-to-lead principles, nurture sequences, re-engagement, segmentation |
| `client-onboarding` | Onboarding Specialist | Four-pillar setup: GHL, BrightLocal, Awario, Madgicx/ad accounts |
| `review-management` | Review Specialist | Response drafting, review request campaigns, rating recovery |
| `reputation-monitoring` | Brand Monitor Specialist | Daily Awario sweeps, sentiment scoring, competitor intelligence, share-of-voice |
| `client-reporting` | Reporting Director | Data gathering, report structure, plain-English translation, delivery workflow |
| `marketing-strategy` | Marketing Director | Goal decomposition, channel strategy by situation, sprint planning |
| `crm-automation` | CRM Director | CRM health standards, goal decomposition, snapshot governance, cross-dept coordination |

---

## Projects & Tasks

### Projects
- **`client-onboarding`** — End-to-end new client setup across all four tool pillars
- **`monthly-operations`** — Recurring monthly cycle: reporting, sprint planning, strategy review

### Starter Tasks
- **`setup-ghl-snapshot`** — Deploy GHL sub-account from master snapshot (Onboarding Specialist)
- **`brightlocal-rank-baseline`** — Configure rank tracking and capture Day 1 baselines (SEO Specialist)
- **`awario-brand-streams`** — Set up brand and competitor monitoring streams (Brand Monitor Specialist)
- **`meta-ads-audit`** — Audit existing Meta Ads account before active management (Ads Specialist)
- **`first-monthly-report`** — Generate Month 1 baseline performance report (Reporting Director)

---

## Getting Started

### Import the Company

```bash
paperclipai company import --from agency-zero-to-hero/
```

### Configure API Keys

After importing, set the required secrets in Paperclip for the agents that need them:

| Secret | Required By |
|--------|------------|
| `BRIGHTLOCAL_API_KEY` | seo-specialist, onboarding-specialist, review-specialist, reporting-director |
| `GHL_API_KEY` | seo-specialist, lead-automation-specialist, onboarding-specialist, review-specialist, reporting-director |
| `MADGICX_API_KEY` | ads-specialist, reporting-director |
| `AWARIO_API_KEY` | brand-monitor-specialist, onboarding-specialist, reporting-director |
| `GOOGLE_ADS_DEVELOPER_TOKEN` | ads-specialist (optional) |

### Onboard Your First Client

1. Get your client's signed contract and complete the kickoff call
2. Prepare the client brief (business info, target keywords, service area, ad budget)
3. Board-approve the new client in Paperclip
4. Assign the `client-onboarding` project — the Onboarding Specialist takes it from there
5. Once the onboarding completion report is board-approved, all four departments go live

---

## References

- [Agent Companies Specification](https://agentcompanies.io/specification)
- [Paperclip](https://github.com/paperclipai/paperclip)

---

## License

MIT — see [LICENSE](LICENSE)
