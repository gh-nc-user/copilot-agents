---
name: copilot-studio-orchestrator
description: Meta-skill that routes to the appropriate Copilot Studio skill based on the user's request. Use this as the main entry point for all Copilot Studio operations.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Copilot Studio Orchestrator

This is the main entry point for all Copilot Studio operations. It analyzes the user's request and routes to the appropriate skill.

## How to Use

When you receive a request related to Copilot Studio, analyze the intent and invoke the matching skill:

### Authoring Tasks

| User Request | Skill to Invoke |
|--------------|-----------------|
| "Create a new topic" | `copilot-studio-new-topic` |
| "Add a node to a topic" | `copilot-studio-add-node` |
| "Add a connector action" | `copilot-studio-add-action` |
| "Add a knowledge source" | `copilot-studio-add-knowledge` |
| "Add generative answers" | `copilot-studio-add-generative-answers` |
| "Add a child/connected agent" | `copilot-studio-add-other-agents` |
| "Add a global variable" | `copilot-studio-add-global-variable` |
| "Add an adaptive card" | `copilot-studio-add-adaptive-card` |
| "Edit an action" | `copilot-studio-edit-action` |
| "Edit agent settings" | `copilot-studio-edit-agent` |
| "Edit trigger phrases" | `copilot-studio-edit-triggers` |

### Validation & Information Tasks

| User Request | Skill to Invoke |
|--------------|-----------------|
| "Validate this YAML" | `copilot-studio-validate` |
| "Look up a schema definition" | `copilot-studio-lookup-schema` |
| "List all topics" | `copilot-studio-list-topics` |
| "Best practices" | `copilot-studio-best-practices` |

### Testing Tasks

| User Request | Skill to Invoke |
|--------------|-----------------|
| "Test the agent" | `copilot-studio-test` (presents options) |
| "Send a test message" | `copilot-studio-chat-with-agent` |
| "Run test suite" | `copilot-studio-run-tests` |
| "Chat via DirectLine" | `copilot-studio-directline-chat` |

### Troubleshooting Tasks

| User Request | Skill to Invoke |
|--------------|-----------------|
| "Debug an issue" | `copilot-studio-troubleshoot` |
| "Fix wrong topic routing" | `copilot-studio-troubleshoot` |
| "Agent is hallucinating" | `copilot-studio-troubleshoot` |

## Workflow

1. **Analyze the user's request** to determine the category:
   - Authoring (create/edit)
   - Validation (check/verify)
   - Testing (test/verify)
   - Troubleshooting (debug/fix)

2. **Match to the appropriate skill** using the tables above.

3. **Invoke the skill**:
   ```
   skill with name: "copilot-studio-<skill-name>"
   ```

4. **If unsure**, ask clarifying questions:
   - What type of content? (topic, action, knowledge, etc.)
   - What operation? (create, edit, validate, test)
   - What's the goal?

## Example Routing

**User**: "I want to create a topic that handles product inquiries"

**Analysis**: Authoring task → Create topic → `copilot-studio-new-topic`

**User**: "The agent is giving wrong answers about products"

**Analysis**: Troubleshooting task → Debug issue → `copilot-studio-troubleshoot`

**User**: "Add a knowledge source for our product catalog"

**Analysis**: Authoring task → Add knowledge → `copilot-studio-add-knowledge`

**User**: "Validate all my topic files"

**Analysis**: Validation task → Validate YAML → `copilot-studio-validate`

## Important Rules

1. **Always use skills** — Never write YAML manually when a skill exists
2. **Validate after editing** — Always validate after creating or editing files
3. **Auto-discover agent** — Never hardcode agent names; use glob to find
4. **Check GenerativeActionsEnabled** — Before using AutomaticTaskInput
5. **Use unique IDs** — Format: `<nodeType>_<random>`