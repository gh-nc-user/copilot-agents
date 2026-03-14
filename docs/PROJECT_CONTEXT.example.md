# Project Context

> **Purpose**: Single source of truth for project state. Maintained by implementers, verified by PM.
> **Location**: `./docs/PROJECT_CONTEXT.md` (per-project)

---

## Project Overview

**Project Name**: Task Manager App
**Project Type**: [x] Code/Infra  [ ] Marketing  [ ] Policy/SOP  [ ] Business Docs
**Status**: [ ] Planning  [x] In Progress  [ ] Complete  [ ] On Hold
**Owner**: @lead-dev
**Started**: 2026-03-01
**Last Updated**: 2026-03-12

---

## Problem Statement

Small teams need a simple way to track tasks without the complexity of enterprise tools like Jira. They want something lightweight that integrates with their existing workflow (Slack, email notifications).

---

## Goals

- [x] MVP: Basic task CRUD operations
- [x] MVP: User authentication
- [ ] Slack integration for notifications
- [ ] Email digest for daily summaries
- [ ] Mobile-responsive design

---

## Scope

**In Scope**:
- Web application (React + Node.js)
- PostgreSQL database
- Slack integration
- Email notifications via SendGrid

**Out of Scope**:
- Native mobile apps (PWA only)
- Advanced reporting/analytics
- SSO integration (Phase 2)

---

## Current State

### What's Built/Complete
| Component | Status | Notes |
|-----------|--------|-------|
| User authentication | ✅ Complete | JWT-based, bcrypt passwords |
| Task CRUD API | ✅ Complete | RESTful endpoints |
| Frontend task list | ✅ Complete | React with TypeScript |
| Database schema | ✅ Complete | PostgreSQL with migrations |

### What's In Progress
| Component | Owner | Status | Notes |
|-----------|-------|--------|-------|
| Slack integration | @lead-dev | 70% | Webhook working, need UI |
| Email notifications | @lead-dev | 0% | Blocked by Slack work |

### What's Planned
| Component | Priority | Dependencies | Notes |
|-----------|----------|--------------|-------|
| Email digest | Medium | SendGrid account | Daily at 9 AM |
| PWA support | Low | None | Service worker, manifest |

---

## Architecture / Structure

### Components
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   React SPA     │────▶│   Node.js API   │────▶│   PostgreSQL    │
│   (TypeScript)  │     │   (Express)     │     │   Database      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   Slack API     │
                        │   (Webhooks)    │
                        └─────────────────┘
```

### Data Flow
1. User creates task in React SPA
2. SPA calls REST API
3. API validates, stores in PostgreSQL
4. API sends webhook to Slack (if configured)
5. Task appears in user's task list

### Integrations
- **Slack**: Incoming webhooks for task notifications
- **SendGrid**: (Planned) Email notifications

---

## Configuration

### Environment Variables
| Variable | Purpose | Location |
|----------|---------|----------|
| `DATABASE_URL` | PostgreSQL connection string | `.env` (local), Azure App Settings (prod) |
| `JWT_SECRET` | Token signing key | Azure Key Vault |
| `SLACK_WEBHOOK_URL` | Slack incoming webhook | `.env` (local), Azure App Settings (prod) |
| `SENDGRID_API_KEY` | Email service | Azure Key Vault (when implemented) |

### Resources (Azure)
| Resource | Type | Purpose |
|----------|------|---------|
| taskmanager-prod-rg | Resource Group | Production resources |
| taskmanager-prod-app | App Service | Node.js API hosting |
| taskmanager-prod-db | PostgreSQL | Database |
| taskmanager-prod-kv | Key Vault | Secrets management |

---

## Documentation Links

| Doc Type | Location | Last Updated |
|----------|----------|--------------|
| Decision Log | ./docs/DECISION_LOG.md | 2026-03-10 |
| Implementation Log | ./docs/IMPLEMENTATION_LOG.md | 2026-03-12 |
| API Docs | ./docs/api/README.md | 2026-03-05 |
| User Guide | ./docs/user-guide.md | Not started |

---

## Open Items

| Item | Priority | Owner | Status |
|------|----------|-------|--------|
| SendGrid account setup | Medium | @ops | Blocked |
| Mobile responsiveness audit | Low | @lead-dev | Pending |
| Performance testing | Low | @qa | Not started |

---

## Change History

| Date | Change | Author |
|------|--------|--------|
| 2026-03-12 | Added Slack integration progress | @lead-dev |
| 2026-03-10 | Documented ADR-003 for auth choice | @architect |
| 2026-03-05 | Initial project context | @lead-dev |
