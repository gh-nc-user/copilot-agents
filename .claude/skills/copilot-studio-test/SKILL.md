---
name: copilot-studio-test
description: Test a published Copilot Studio agent — send test messages, run batch test suites, or analyze evaluation results.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Test Copilot Studio Agent

Testing agent for published Copilot Studio agents. Runs tests, analyzes failures, and proposes fixes.

## Testing Approaches

When the user asks to "test the agent" without specifying how, **present both options and let them choose**:

| Approach | How it works | Requires |
|----------|-------------|----------|
| **Point-test** | Sends a single utterance directly to the published agent via the Copilot Studio Client SDK | App Registration with `CopilotStudio.Copilots.Invoke` permission |
| **Batch test suite** | Runs pre-defined test sets with expected responses via the Dataverse API using the Power CAT Copilot Studio Kit | Copilot Studio Kit installed + App Registration with Dataverse permissions |
| **DirectLine chat** | Sends a single utterance via the DirectLine v3 REST API (pure HTTP polling) | DirectLine secret or Copilot Studio token endpoint URL |
| **Analyze evaluations** | User runs evaluations in the Copilot Studio UI, exports results as CSV, and shares the file for analysis | Agent published + evaluations run in Copilot Studio UI |

## Agent Lifecycle: Local, Pushed, Published

Agent content exists in three distinct states:

| State | Where it lives | Who can see it |
|-------|---------------|----------------|
| **Local** | YAML files on disk | Only you (the AI agent and the user) |
| **Pushed (Draft)** | Power Platform environment | Copilot Studio UI — authoring canvas and Test tab |
| **Published** | Power Platform environment (live) | External clients — testing tools, DirectLine, Teams |

**Key rule**: Pushing with the VS Code Extension uploads changes as a **draft**. The user can test drafts in the Copilot Studio **Test** tab, but the AI agent and external testing tools can only interact with **published** content.

## Workflow

1. **Clone** the agent with the Copilot Studio VS Code Extension
2. **Author** changes in YAML (this is what the AI agent does)
3. **Push** changes with the VS Code Extension → agent is now in **draft** state
4. _(Optional)_ **Test draft** in the Copilot Studio UI Test tab
5. **Publish** in Copilot Studio UI → agent is now **published** and reachable by testing tools

## Important Reminder

Only **published** agents are reachable by tests. Pushing creates a draft.
Always remind users to push AND publish before testing.

## Testing Instructions

### Point-Test (Single Utterance)

1. Ensure agent is published
2. Have user provide their App Registration Client ID
3. Send test utterance via Copilot Studio Client SDK
4. Return full response to user

### Batch Test Suite

1. Ensure Copilot Studio Kit is installed in environment
2. Configure Dataverse connection
3. Run pre-defined test sets
4. Report pass/fail results with latencies

### Analyze Evaluations

1. User runs evaluations in Copilot Studio UI
2. User exports results as CSV
3. Analyze CSV for failures and patterns
4. Propose YAML fixes for identified issues