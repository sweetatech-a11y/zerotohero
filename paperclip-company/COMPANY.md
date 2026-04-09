---
name: Agency Zero to Hero
description: >
  A semi-autonomous local marketing agency with a full departmental hierarchy.
  A COO agent oversees four department directors who each manage specialist agents.
  Every outward-facing action is queued for human (board) approval before it goes live.
slug: agency-zero-to-hero
schema: agentcompanies/v1
version: 0.1.0
license: MIT
goals:
  - Rank local business clients in the Google Maps 3-pack and top organic results
  - Generate consistent lead flow through paid ads and Local SEO
  - Automate lead follow-up and appointment booking via GoHighLevel
  - Protect and grow client reputation through proactive monitoring and review management
  - Deliver clear monthly performance reports that clients can actually understand
  - Keep the agency owner (board) in full control — no agent publishes anything without approval
---

Agency Zero to Hero is a semi-autonomous marketing agency operating company built for a solo agency owner learning the space. Eleven agents across four departments handle execution across four tool pillars — BrightLocal, GoHighLevel (GHL), Madgicx, and Awario — while the human operator retains full decision authority over every published action.

## How It Works

The company runs on a **hierarchical hub-and-spoke + heartbeat** model. The COO sits at the top of the agent org, reporting directly to the board (the human owner). Four department directors report to the COO: Marketing, CRM & Automation, Reputation & Brand, and Reporting. Each director manages one or two specialist agents below them.

Goals flow **down** the hierarchy: the board sets company-level goals → COO breaks them into department goals → directors break department goals into task assignments → specialists execute. Results and status flow **up**: specialists report to directors → directors report to COO → COO produces a weekly digest for the board.

Nothing gets published. Nothing gets posted. Nothing gets sent to a client. Every outward-facing action sits in an **approval queue** until the human operator reviews and approves it.

## Org Chart

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

## Tool Pillars

| Pillar | Tool | Department |
|--------|------|------------|
| Local SEO & GBP | BrightLocal + GoHighLevel | Marketing |
| Paid Ads | Madgicx + Google Ads API | Marketing |
| CRM & Automation | GoHighLevel | CRM & Automation |
| Reputation | Awario + GoHighLevel | Reputation & Brand |
| Reporting | All APIs (read-only) | Reporting |

## Approval-First Philosophy

Every agent that can affect the outside world — posting to Google Business Profile, changing ad budgets, responding to reviews, triggering client-facing automations, sending reports — operates in **draft-then-approve** mode:

1. Specialist executes its skill and produces a recommended action or draft
2. Draft is queued for human approval with full context (what, why, expected outcome)
3. Human operator reviews and approves, rejects, or edits
4. Only after approval does the action execute

The board (owner) also approves any new client onboarding, any budget changes over $100, and any change to automated workflows that affect client communications.
