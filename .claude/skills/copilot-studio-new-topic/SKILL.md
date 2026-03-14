---
name: copilot-studio-new-topic
description: Create a new Copilot Studio topic YAML file. Use when the user asks to create a new topic, conversation flow, or dialog for their agent.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Create New Topic

Generate a new Copilot Studio topic YAML file based on user requirements.

## Instructions

1. **Auto-discover the agent directory**:
   Use the glob tool to find the agent configuration:
   ```
   glob pattern: **/agent.mcs.yml
   ```
   If multiple agents found, ask which one. NEVER hardcode an agent name.

2. **Determine the trigger type** from the user's description:
   - `OnRecognizedIntent` — For topics triggered by user phrases (most common)
   - `OnConversationStart` — For welcome/greeting topics
   - `OnUnknownIntent` — For fallback topics
   - `OnEscalate` — For escalation to human agent
   - `OnError` — For error handling

3. **Generate unique IDs** for ALL nodes:
   - Format: `<nodeType>_<6-8 random alphanumeric>`
   - Example: `SendActivity_a1b2c3d4`

4. **Create the topic YAML** with:
   - A `# Name:` comment at the top
   - `kind: AdaptiveDialog`
   - Appropriate `beginDialog` with correct trigger
   - All nodes with unique IDs

5. **Check settings.mcs.yml** for `GenerativeActionsEnabled`:
   - Read the agent's `settings.mcs.yml` to check this setting

6. **Save** to the agent's `topics/<topic-name>.topic.mcs.yml` directory

7. **Validate** the generated file using the validate skill

## Topic Template Structure

```yaml
# Name: <Topic Name>
kind: AdaptiveDialog
beginDialog:
  kind: OnRecognizedIntent
  intent:
    triggerQueries:
      - <trigger phrase 1>
      - <trigger phrase 2>
  actions:
    - kind: <ActionKind>
      id: <unique_id>
      <additional properties>
```

## Generative Orchestration Guidelines

When the agent has `GenerativeActionsEnabled: true` in settings:

**Use Topic Inputs** (AutomaticTaskInput) instead of Question nodes to auto-collect user info:
```yaml
inputs:
  - kind: AutomaticTaskInput
    propertyName: userName
    description: "The user's name"
    entity: StringPrebuiltEntity
    shouldPromptUser: true
```

**Use Topic Outputs** instead of SendActivity for final results:
```yaml
outputType:
  properties:
    result:
      displayName: result
      description: The computed result
      type: String
```

## Power Fx Quick Reference

- Expressions start with `=`: `value: =Text(Topic.num1 + Topic.num2)`
- String interpolation uses `{}`: `activity: "Hello {Topic.UserName}"`
- Common functions: `Text()`, `Now()`, `IsBlank()`, `!IsBlank()`, `DateTimeFormat.UTC`
- Variable init: `variable: init:Topic.MyVar` (first assignment uses `init:`)

## Common Trigger Types

| Trigger | Use Case | Example |
|---------|----------|---------|
| `OnRecognizedIntent` | User phrases trigger topic | "I want to book a flight" |
| `OnConversationStart` | Welcome/greeting | First message when conversation starts |
| `OnUnknownIntent` | Fallback | When no topic matches |
| `OnEscalate` | Escalation | Transfer to human agent |
| `OnError` | Error handling | Catch and handle errors |

## Workflow

1. Ask user for topic description
2. Determine trigger type
3. Generate YAML with unique IDs
4. Save to topics directory
5. Validate using validate skill
6. Report success or issues