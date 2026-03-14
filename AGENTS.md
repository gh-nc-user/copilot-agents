# AGENTS.md - For AI Agents

> ⚠️ **IMPORTANT**: This file provides context for AI agents working with this repository.

This file provides context for AI agents working with this repository.

## Project Purpose

**Copilot Agents** - A project for developing Microsoft Copilot Studio agents using YAML-based authoring with Opencode.

### Core Philosophy

1. **YAML-First Development** - Author agents as code for version control and collaboration
2. **Validation Before Push** - Always validate YAML before pushing to Copilot Studio
3. **Skill-Based Workflow** - Use specialized skills for specific tasks (author, validate, test)

## Why This Exists

- Enable rapid development of Copilot Studio agents
- Provide AI-assisted authoring with schema validation
- Support testing and troubleshooting workflows
- Maintain best practices for agent development

## Architecture

```
copilot-agents/
├── .claude/skills/              # Copilot Studio skills for Opencode (21 skills)
│   ├── copilot-studio-orchestrator/    # Meta-skill for routing
│   ├── copilot-studio-author/          # Main authoring agent
│   ├── copilot-studio-new-topic/       # Create topics
│   ├── copilot-studio-add-*/           # Add various components
│   ├── copilot-studio-edit-*/          # Edit components
│   ├── copilot-studio-validate/        # Validate YAML
│   ├── copilot-studio-lookup-schema/   # Schema reference
│   ├── copilot-studio-list-topics/     # List topics
│   ├── copilot-studio-best-practices/  # Best practices
│   ├── copilot-studio-test/            # Testing
│   ├── copilot-studio-troubleshoot/    # Debugging
│   └── ... (other skills)
├── .opencode/
│   ├── opencode.json           # Main config with skill permissions
│   ├── tools/
│   │   └── copilot-studio-schema.ts  # Schema validation tool
│   └── templates/
│       └── topics/             # Topic templates
├── docs/                        # Living documentation
│   ├── PROJECT_CONTEXT.md
│   ├── DECISION_LOG.md
│   └── IMPLEMENTATION_LOG.md
└── AGENTS.md                    # This file
```

## Technology Stack

- **Microsoft Copilot Studio** - Agent platform
- **YAML** - Agent definition format
- **VS Code Copilot Studio Extension** - For cloning/pushing agents
- **Opencode** - AI coding agent with specialized skills

## Copilot Studio Skills (21 Total)

### Authoring Skills (11)

| Skill | Purpose |
|-------|---------|
| `copilot-studio-author` | Main authoring agent |
| `copilot-studio-new-topic` | Create new topics |
| `copilot-studio-add-node` | Add nodes to topics |
| `copilot-studio-add-action` | Add connector actions |
| `copilot-studio-add-knowledge` | Add knowledge sources |
| `copilot-studio-add-generative-answers` | Add SearchAndSummarizeContent |
| `copilot-studio-add-other-agents` | Add child/connected agents |
| `copilot-studio-add-global-variable` | Add global variables |
| `copilot-studio-add-adaptive-card` | Add Adaptive Cards |
| `copilot-studio-edit-action` | Edit connector actions |
| `copilot-studio-edit-agent` | Edit agent settings |
| `copilot-studio-edit-triggers` | Edit trigger phrases |

### Validation Skills (4)

| Skill | Purpose |
|-------|---------|
| `copilot-studio-validate` | Validate YAML files |
| `copilot-studio-lookup-schema` | Look up schema definitions |
| `copilot-studio-list-topics` | List all topics |
| `copilot-studio-best-practices` | Best practices guidance |

### Testing Skills (3)

| Skill | Purpose |
|-------|---------|
| `copilot-studio-test` | Test published agents |
| `copilot-studio-chat-with-agent` | Point-test via SDK |
| `copilot-studio-run-tests` | Batch test suites |
| `copilot-studio-directline-chat` | Chat via DirectLine |

### Troubleshooting Skills (1)

| Skill | Purpose |
|-------|---------|
| `copilot-studio-troubleshoot` | Debug and fix issues |

### Meta Skill (1)

| Skill | Purpose |
|-------|---------|
| `copilot-studio-orchestrator` | Route to appropriate skill |

### Using Skills

Invoke skills using the `skill` tool:

```
skill with name: "copilot-studio-author"
```

Or ask naturally:
```
"Use the copilot-studio-new-topic skill to create a topic for handling customer inquiries"
```

## Notes for Agents

- **Always validate YAML** after creating or editing files using the validate skill
- **Never hardcode agent names** - Always use glob to discover the agent directory
- **Check GenerativeActionsEnabled** in settings.mcs.yml before using AutomaticTaskInput
- **Use unique IDs** for all nodes - Format: `<nodeType>_<random>`
- **Power Fx expressions** must start with `=` prefix
- **Variable scope matters** - Use `Topic.`, `System.`, or `Global.` prefixes

## Agent Lifecycle

| State | Description | Who Can Access |
|-------|-------------|----------------|
| **Local** | YAML files on disk | Only you |
| **Pushed (Draft)** | In Power Platform | Copilot Studio UI |
| **Published** | Live in environment | External tools, testing |

**Important**: Pushing creates a draft. You must also publish to make changes live.

## Development Workflow

1. **Clone** agent using VS Code Copilot Studio Extension
2. **Author** changes using Opencode skills
3. **Validate** using the validate skill
4. **Push** using VS Code Extension
5. **Publish** in Copilot Studio UI
6. **Test** using the test skill or Copilot Studio Test tab

## Common Trigger Types

| Kind | Use Case |
|------|----------|
| `OnRecognizedIntent` | User phrases trigger topic |
| `OnConversationStart` | Welcome/greeting |
| `OnUnknownIntent` | Fallback |
| `OnEscalate` | Transfer to human |
| `OnError` | Error handling |

## Common Action Types

| Kind | Description |
|------|-------------|
| `SendActivity` | Send message to user |
| `Question` | Ask user a question |
| `ConditionGroup` | Conditional branching |
| `BeginDialog` | Call another dialog |
| `SetVariable` | Set a variable |
| `SearchAndSummarizeContent` | Knowledge search |
| `AnswerQuestionWithAI` | AI-generated answer |

## Templates

Topic templates are available in `.opencode/templates/topics/`:

- `greeting.topic.mcs.yml` - OnConversationStart greeting
- `fallback.topic.mcs.yml` - OnUnknownIntent fallback
- `conversation-init.topic.mcs.yml` - JIT initialization
- `question-topic.topic.mcs.yml` - Question with branching
- `search-topic.topic.mcs.yml` - Knowledge search
- `error-handler.topic.mcs.yml` - Error handling
- `disambiguation.topic.mcs.yml` - Multiple topics matched

## Custom Tool

A schema validation tool is available at `.opencode/tools/copilot-studio-schema.ts`:

- `kinds` - List all valid kind values
- `resolve <kind>` - Get schema definition
- `search <term>` - Search for matching kinds

## Resources

- [Microsoft Copilot Studio Documentation](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
- [Original Skills Repository](https://github.com/microsoft/skills-for-copilot-studio)
- [VS Code Copilot Studio Extension](https://github.com/microsoft/vscode-copilotstudio)

---

*This AGENTS.md was created from a template and updated with Copilot Studio context.*