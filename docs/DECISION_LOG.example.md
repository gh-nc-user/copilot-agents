# Decision Log (ADRs)

> **Purpose**: Record all decisions with rationale. This is institutional memory.
> **Location**: `./docs/DECISION_LOG.md` (per-project)

---

## How to Use This File

Every decision that affects the project should be recorded here using the ADR (Architecture Decision Record) format. This includes:
- Technical choices (frameworks, libraries, patterns)
- Business decisions (scope changes, priorities)
- Process decisions (workflow changes, tooling)
- Any decision that future you might question

---

## Decision Index

| ADR # | Title | Date | Status |
|-------|-------|------|--------|
| 001 | Use JWT for Authentication | 2026-03-02 | [x] Accepted |
| 002 | Use PostgreSQL over MongoDB | 2026-03-02 | [x] Accepted |
| 003 | React with TypeScript | 2026-03-03 | [x] Accepted |
| 004 | Slack-first notifications | 2026-03-05 | [x] Accepted |

---

## ADR-001: Use JWT for Authentication

**Date**: 2026-03-02
**Status**: [x] Accepted
**Decision Maker**: @architect, @lead-dev

**Context**: 

We need a way to authenticate users. Options include:
- Session-based auth with cookies
- JWT tokens
- OAuth/SSO integration

The app needs to be stateless for horizontal scaling, and we don't have an existing SSO system.

**Decision**: 

Use JWT (JSON Web Tokens) for authentication with bcrypt password hashing.

**Rationale**: 

- Stateless: No server-side sessions needed
- Scalable: Works with horizontal scaling
- Simple: No external dependencies for basic auth
- Future-proof: Can integrate with OAuth later

**Alternatives Considered**:

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| Session cookies | Simple, well-understood | Requires sticky sessions or session store | Adds complexity for scaling |
| OAuth-only | Leverages existing providers | Requires users to have OAuth account | Barrier to entry for small teams |
| API Keys | Simple for service-to-service | Not suitable for user authentication | Wrong use case |

**Consequences**:

- Positive: Stateless, scalable, simple implementation
- Negative: Tokens can't be easily revoked without additional infrastructure
- Risks: Token expiration strategy needed for security

**Related Decisions**: ADR-003 (TypeScript for type safety)

---

## ADR-002: Use PostgreSQL over MongoDB

**Date**: 2026-03-02
**Status**: [x] Accepted
**Decision Maker**: @architect

**Context**: 

We need a database for storing tasks and user data. The data model is relational (users have tasks, tasks have assignments).

**Decision**: 

Use PostgreSQL as the primary database.

**Rationale**: 

- Relational data model fits our use case
- Strong consistency guarantees
- JSON support for flexible metadata
- Mature ecosystem and tooling
- Team familiarity

**Alternatives Considered**:

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| MongoDB | Flexible schema, easy start | No transactions, consistency issues | Overkill for simple relational data |
| SQLite | Zero-config, embedded | Can't scale horizontally | Not suitable for production |
| DynamoDB | Managed, auto-scaling | Vendor lock-in, complex queries | Overkill for MVP |

**Consequences**:

- Positive: ACID compliance, mature tooling, team familiarity
- Negative: Requires migration strategy for schema changes
- Risks: Connection pool management needed

**Related Decisions**: None

---

## ADR-003: React with TypeScript

**Date**: 2026-03-03
**Status**: [x] Accepted
**Decision Maker**: @architect, @lead-dev

**Context**: 

We need a frontend framework. The team has React experience but no strong preference.

**Decision**: 

Use React with TypeScript for the frontend.

**Rationale**: 

- Type safety catches errors at compile time
- Better IDE support and autocomplete
- Team is familiar with React ecosystem
- TypeScript is industry standard now

**Alternatives Considered**:

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| React (JavaScript) | Faster start, less learning | No type safety | Error-prone at scale |
| Vue.js | Simpler learning curve | Smaller ecosystem | Less team familiarity |
| Svelte | Compile-time optimization | Less mature ecosystem | Higher risk |

**Consequences**:

- Positive: Type safety, better maintainability, team productivity
- Negative: Slightly slower initial development
- Risks: TypeScript configuration complexity

**Related Decisions**: ADR-001 (JWT auth - type-safe token handling)

---

## ADR-004: Slack-first Notifications

**Date**: 2026-03-05
**Status**: [x] Accepted
**Decision Maker**: @architect, Product Owner

**Context**: 

Users need notifications when tasks are assigned or completed. Email and Slack are the primary options.

**Decision**: 

Implement Slack notifications first, add email later.

**Rationale**: 

- Target users already use Slack for team communication
- Instant notifications vs. delayed email
- Simpler integration (webhooks vs. SMTP setup)
- Email can be added as a secondary channel

**Alternatives Considered**:

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| Email only | Universal, no Slack dependency | Delayed, gets buried | Poor UX for urgent tasks |
| Both simultaneously | Maximum reach | More complex implementation | Scope creep for MVP |
| In-app only | No external dependency | Users miss notifications when away | Poor UX |

**Consequences**:

- Positive: Fast iteration, simple integration
- Negative: Requires Slack workspace for team
- Risks: Slack API changes could break integration

**Related Decisions**: None

---

## ADR Template (Copy for each decision)

### ADR-NNN: [Decision Title]

**Date**: YYYY-MM-DD
**Status**: [ ] Proposed  [ ] Accepted  [ ] Superseded by ADR-XXX  [ ] Deprecated
**Decision Maker**: 

**Context**: 

[What is the issue or question being addressed?]

**Decision**: 

[What is the change or choice being made?]

**Rationale**: 

[Why this approach?]

**Alternatives Considered**:

| Option | Pros | Cons | Why Rejected |
|--------|------|------|--------------|
| | | | |

**Consequences**:

- Positive:
- Negative:
- Risks:

**Related Decisions**: ADR-XXX