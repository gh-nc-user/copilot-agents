---
name: copilot-studio-add-node
description: Add or modify a node in a Copilot Studio topic. Use when the user asks to add a question, condition, action, or other node to an existing topic.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Add Node to Topic

Add or modify a node in a Copilot Studio topic YAML file.

## Node Types

| Kind | Description | Use Case |
|------|-------------|----------|
| `SendActivity` | Send a message | Display text to user |
| `Question` | Ask user a question | Collect user input |
| `ConditionGroup` | Conditional branching | If/then/else logic |
| `BeginDialog` | Call another dialog | Navigate to topic |
| `EndDialog` | End current dialog | Return from topic |
| `SetVariable` | Set a variable | Store data |
| `SetTextVariable` | Set text with interpolation | Format strings |
| `HttpRequest` | HTTP API call | Call external APIs |
| `SearchAndSummarizeContent` | Knowledge search | Query knowledge sources |
| `AnswerQuestionWithAI` | AI-generated answer | Generative responses |

## Instructions

1. **Auto-discover the agent directory**:
   ```
   glob pattern: **/agent.mcs.yml
   ```

2. **Identify the target topic**:
   - Ask which topic to modify
   - Use `copilot-studio-list-topics` to show available topics

3. **Read the topic file** to understand current structure.

4. **Determine the node type** from user's request.

5. **Generate the node YAML** with unique ID:
   ```yaml
   - kind: <NodeKind>
     id: <NodeType>_<random>
     # ... node properties
   ```

6. **Insert the node** at the appropriate location in the actions array.

7. **Validate the modified file** using the validate skill.

## Common Node Examples

### SendActivity (Message)

```yaml
- kind: SendActivity
  id: SendActivity_abc123
  activity: "Hello, {Topic.UserName}!"
```

### Question

```yaml
- kind: Question
  id: Question_def456
  variable: Topic.UserChoice
  prompt: "What would you like to do?"
  options:
    - "Option A"
    - "Option B"
    - "Option C"
```

### ConditionGroup

```yaml
- kind: ConditionGroup
  id: ConditionGroup_ghi789
  conditions:
    - kind: Condition
      expression: "=Topic.UserChoice = \"Option A\""
      actions:
        - kind: SendActivity
          id: SendActivity_jkl012
          activity: "You chose Option A"
```

### SetVariable

```yaml
- kind: SetVariable
  id: SetVariable_mno345
  variable: init:Topic.Counter
  value: "=0"
```

## Workflow

1. Identify target topic
2. Read current topic structure
3. Determine node type
4. Generate node YAML with unique ID
5. Insert at correct location
6. Validate the file