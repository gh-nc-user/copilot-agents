# Copilot Studio Skills for Opencode

This directory contains skills adapted from [microsoft/skills-for-copilot-studio](https://github.com/microsoft/skills-for-copilot-studio) for use with Opencode.

## Overview

These skills enable Opencode to author, validate, and troubleshoot Microsoft Copilot Studio agents using YAML files. They provide specialized knowledge for working with Copilot Studio's YAML schema, best practices, and common patterns.

## Available Skills (21 total)

### Authoring Skills

| Skill | Description |
|-------|-------------|
| `copilot-studio-author` | Main authoring agent - creates and edits topics, actions, knowledge sources |
| `copilot-studio-new-topic` | Create new topic YAML files |
| `copilot-studio-add-node` | Add/modify nodes in topics |
| `copilot-studio-add-action` | Guide for adding connector actions |
| `copilot-studio-add-knowledge` | Add knowledge sources |
| `copilot-studio-add-generative-answers` | Add SearchAndSummarizeContent nodes |
| `copilot-studio-add-other-agents` | Add child/connected agents |
| `copilot-studio-add-global-variable` | Add global variables |
| `copilot-studio-add-adaptive-card` | Add Adaptive Cards |
| `copilot-studio-edit-action` | Edit connector actions |
| `copilot-studio-edit-agent` | Edit agent settings and instructions |
| `copilot-studio-edit-triggers` | Edit trigger phrases and model description |

### Validation & Information Skills

| Skill | Description |
|-------|-------------|
| `copilot-studio-validate` | Validate YAML files against schema and best practices |
| `copilot-studio-lookup-schema` | Look up schema definitions and valid kind values |
| `copilot-studio-list-topics` | List all topics in an agent |
| `copilot-studio-best-practices` | Best practices for glossary, user context, dynamic redirects |

### Testing Skills

| Skill | Description |
|-------|-------------|
| `copilot-studio-test` | Test published agents (presents testing options) |
| `copilot-studio-chat-with-agent` | Send test messages via Copilot Studio Client SDK |
| `copilot-studio-run-tests` | Run batch test suites with Power CAT Kit |
| `copilot-studio-directline-chat` | Chat via DirectLine v3 REST API |

### Troubleshooting Skills

| Skill | Description |
|-------|-------------|
| `copilot-studio-troubleshoot` | Debug and fix agent issues |

### Meta Skill

| Skill | Description |
|-------|-------------|
| `copilot-studio-orchestrator` | Routes to the appropriate skill based on user request |

## Usage

### Invoking Skills

In Opencode, use the `skill` tool to load a skill:

```
skill with name: "copilot-studio-author"
```

Or ask naturally:
```
"Use the copilot-studio-new-topic skill to create a topic for handling product inquiries"
```

### Using the Orchestrator

For any Copilot Studio request, you can start with the orchestrator:

```
skill with name: "copilot-studio-orchestrator"
```

The orchestrator will analyze your request and route to the appropriate skill.

## Workflow

1. **Clone your agent** using the VS Code Copilot Studio Extension
2. **Author changes** using the skills in Opencode
3. **Validate** using the validate skill
4. **Push** using the VS Code Extension
5. **Publish** in Copilot Studio UI
6. **Test** using the test skill or Copilot Studio Test tab

## Prerequisites

1. **VS Code** with the [Copilot Studio Extension](https://github.com/microsoft/vscode-copilotstudio)
2. **Access to a Power Platform environment** with Copilot Studio
3. **An existing agent** (create one in Copilot Studio first)

## Custom Tool

A custom tool for schema validation is available:

```
.opencode/tools/copilot-studio-schema.ts
```

This tool provides:
- `kinds` - List all valid kind values
- `resolve <kind>` - Get schema definition for a kind
- `search <term>` - Search for matching kinds

## Templates

Topic templates are available in:

```
.opencode/templates/topics/
├── greeting.topic.mcs.yml
├── fallback.topic.mcs.yml
├── conversation-init.topic.mcs.yml
├── question-topic.topic.mcs.yml
├── search-topic.topic.mcs.yml
├── error-handler.topic.mcs.yml
└── disambiguation.topic.mcs.yml
```

## Key Concepts

### Agent Lifecycle

| State | Description |
|-------|-------------|
| **Local** | YAML files on disk |
| **Pushed (Draft)** | In Power Platform, visible in Copilot Studio UI |
| **Published** | Live, reachable by external tools |

### Trigger Types

| Kind | Use Case |
|------|----------|
| `OnRecognizedIntent` | User phrases trigger topic |
| `OnConversationStart` | Welcome/greeting |
| `OnUnknownIntent` | Fallback |
| `OnEscalate` | Transfer to human |
| `OnError` | Error handling |

### Common Actions

| Kind | Description |
|------|-------------|
| `SendActivity` | Send message to user |
| `Question` | Ask user a question |
| `ConditionGroup` | Conditional branching |
| `BeginDialog` | Call another dialog |
| `SetVariable` | Set a variable |
| `SearchAndSummarizeContent` | Knowledge search |
| `AnswerQuestionWithAI` | AI-generated answer |

## Differences from Claude Code Plugin

This Opencode adaptation:

1. **Uses Opencode's tool names**: `bash`, `read`, `write`, `glob` instead of `Bash()`, `Read`, `Write`, `Glob`
2. **Invokes skills directly**: Uses Opencode's `skill` tool instead of slash commands
3. **Includes custom tool**: Schema validation tool for kind lookups
4. **Includes templates**: Topic templates for common patterns
5. **Includes orchestrator**: Meta-skill for routing to appropriate skills

## Contributing

To update skills from the upstream repository:

1. Visit https://github.com/microsoft/skills-for-copilot-studio
2. Check for updates to SKILL.md files
3. Adapt tool references for Opencode
4. Update this directory

## License

These skills are adapted from Microsoft's skills-for-copilot-studio repository under the MIT License.

## Resources

- [Microsoft Copilot Studio Documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
- [Original Plugin Repository](https://github.com/microsoft/skills-for-copilot-studio)
- [VS Code Copilot Studio Extension](https://github.com/microsoft/vscode-copilotstudio)