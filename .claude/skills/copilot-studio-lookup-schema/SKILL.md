---
name: copilot-studio-lookup-schema
description: Look up Copilot Studio YAML schema definitions. Use when the user asks about schema structure, element properties, or how to use a specific YAML kind.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Lookup Schema Definition

Look up and explain a Copilot Studio YAML schema definition.

## Common Schema Elements

### Dialog Types

| Kind | Description |
|------|-------------|
| `AdaptiveDialog` | Main topic container |
| `TaskDialog` | Connector action |
| `AgentDialog` | Child/connected agent |

### Trigger Types

| Kind | Description | Use Case |
|------|-------------|----------|
| `OnRecognizedIntent` | Intent-based trigger | User phrases |
| `OnConversationStart` | Conversation start | Welcome/greeting |
| `OnUnknownIntent` | Unknown intent | Fallback |
| `OnEscalate` | Escalation trigger | Transfer to human |
| `OnError` | Error trigger | Error handling |

### Action Types

| Kind | Description |
|------|-------------|
| `SendActivity` | Send a message to user |
| `Question` | Ask user a question |
| `ConditionGroup` | Conditional branching |
| `BeginDialog` | Call another dialog |
| `EndDialog` | End current dialog |
| `SetVariable` | Set a variable |
| `SetTextVariable` | Set text variable with interpolation |
| `HttpRequest` | HTTP API call |
| `SearchAndSummarizeContent` | Knowledge search |
| `AnswerQuestionWithAI` | AI-generated answer |

### Input Types

| Kind | Description |
|------|-------------|
| `AutomaticTaskInput` | Auto-collect input via orchestrator |
| `TextInput` | Text input |
| `NumberInput` | Number input |
| `ChoiceInput` | Choice/selection input |
| `BooleanInput` | Yes/no input |

## Schema Structure

### AdaptiveDialog (Topic)

```yaml
kind: AdaptiveDialog
id: <unique_id>
beginDialog:
  kind: <TriggerType>
  intent:
    triggerQueries:
      - <phrase 1>
      - <phrase 2>
  actions:
    - kind: <ActionKind>
      id: <unique_id>
      # ... action properties
```

### TaskDialog (Action)

```yaml
kind: TaskDialog
id: <unique_id>
description: <action description>
entryPoint:
  kind: OnInvoke
  # ... entry point configuration
inputs:
  - kind: <InputKind>
    # ... input configuration
outputs:
  # ... output configuration
```

## Validation Rules

1. **All `kind:` values must be valid** - Use this skill to verify
2. **All nodes must have unique IDs** - Format: `<type>_<random>`
3. **Power Fx expressions start with `=`** - Always prefix expressions
4. **Variable scope matters** - Use `Topic.`, `System.`, or `Global.` prefixes

## How to Use

When you need to verify a `kind:` value or understand a schema element:

1. Check the tables above for common elements
2. Verify the exact spelling and case
3. Ensure required properties are present
4. Use the validate skill for full validation

## Common Mistakes

| Mistake | Correct | Incorrect |
|---------|---------|-----------|
| Wrong case | `AdaptiveDialog` | `adaptivedialog` |
| Missing prefix | `Topic.MyVar` | `MyVar` |
| Missing `=` | `=Text(Now())` | `Text(Now())` |
| Invalid kind | `SendActivity` | `SendMessage` |