# Project Documentation

This directory contains living documentation for the project. These files are maintained throughout the project lifecycle, not just at the end.

## Required Files

| File | Purpose | When to Update |
|------|---------|----------------|
| `PROJECT_CONTEXT.md` | Current state, architecture, config | After any structural change |
| `DECISION_LOG.md` | All decisions with rationale (ADRs) | When making architectural decisions |
| `IMPLEMENTATION_LOG.md` | Timestamped record of work done | During/after any implementation |

## Getting Started

### Option 1: Copy from Examples (Recommended)

```bash
cp PROJECT_CONTEXT.example.md PROJECT_CONTEXT.md
cp DECISION_LOG.example.md DECISION_LOG.md
cp IMPLEMENTATION_LOG.example.md IMPLEMENTATION_LOG.md
```

Then edit `PROJECT_CONTEXT.md` with your project details.

### Option 2: Copy from Global Templates

```bash
cp ~/.config/opencode/templates/TEMPLATE_PROJECT_CONTEXT.md PROJECT_CONTEXT.md
cp ~/.config/opencode/templates/TEMPLATE_DECISION_LOG.md DECISION_LOG.md
cp ~/.config/opencode/templates/TEMPLATE_IMPLEMENTATION_LOG.md IMPLEMENTATION_LOG.md
```

## Documentation Discipline

### Core Principle

**All work produces documentation. No exceptions.**

### Who Updates What

| Role | Updates |
|------|---------|
| **Implementers** | IMPLEMENTATION_LOG.md, PROJECT_CONTEXT.md |
| **Decision Makers** | DECISION_LOG.md (ADRs) |
| **Project Manager** | Verifies docs exist and are complete |

### Definition of Done

Work is NOT complete until:

- [ ] Implementation Log has entry for this task
- [ ] Project Context reflects current state
- [ ] Any decisions recorded in Decision Log
- [ ] Documentation has been reviewed

## Example Files

The `*.example.md` files show filled-in examples for a hypothetical "Task Manager App" project. Use these as references for expected content and format.

- `PROJECT_CONTEXT.example.md` - Example project state and architecture
- `DECISION_LOG.example.md` - Example architecture decision records
- `IMPLEMENTATION_LOG.example.md` - Example implementation entries
