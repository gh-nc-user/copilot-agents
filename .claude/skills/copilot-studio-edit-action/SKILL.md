---
name: copilot-studio-edit-action
description: Edit an existing connector action in a Copilot Studio agent. Modify inputs, descriptions, connection mode, and other properties.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Edit Connector Action

Edit an existing connector action (TaskDialog) to customize its behavior.

## What You Can Edit

| Property | Description |
|----------|-------------|
| `description` | Action description shown in orchestrator |
| `inputs` | Input parameters and their descriptions |
| `outputs` | Output configuration |
| `connectionMode` | Automatic vs manual connection |
| `isTrigger` | Whether action can start conversations |

## Instructions

1. **Auto-discover the agent directory**:
   ```
   glob pattern: **/agent.mcs.yml
   ```

2. **Find the action file**:
   ```
   glob pattern: **/actions/*.mcs.yml
   ```
   If multiple actions, ask which one to edit.

3. **Read the action file** to understand current configuration.

4. **Make the requested edits**:

### Edit Input Descriptions

```yaml
inputs:
  - kind: AutomaticTaskInput
    propertyName: RecipientEmail
    description: "The email address of the recipient"  # Edit this
    entity: StringPrebuiltEntity
    shouldPromptUser: true
```

### Switch Between Automatic/Manual Inputs

```yaml
# Automatic (orchestrator collects)
- kind: AutomaticTaskInput
  propertyName: Subject
  description: "Email subject line"
  entity: StringPrebuiltEntity
  shouldPromptUser: true

# Manual (topic provides)
- kind: ManualTaskInput
  propertyName: Subject
  value: "=Topic.EmailSubject"
```

### Edit Connection Mode

```yaml
connectionMode:
  kind: Automatic  # or Manual
```

### Edit Description (for Orchestrator)

```yaml
description: "Send an email to a recipient with a subject and body"
```

5. **Validate the modified file** using the validate skill.

## Common Edits

| Task | What to Change |
|------|-----------------|
| Make input required | Set `shouldPromptUser: true` |
| Make input optional | Set `shouldPromptUser: false` |
| Change input description | Edit `description` field |
| Use topic variable | Change to `ManualTaskInput` with `value` |
| Improve orchestrator hints | Edit `description` for clarity |

## Workflow

1. Find action file
2. Read current configuration
3. Make edits
4. Validate
5. User pushes and publishes