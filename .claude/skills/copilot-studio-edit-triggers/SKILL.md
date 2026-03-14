---
name: copilot-studio-edit-triggers
description: Edit trigger phrases and model description for a topic. Modify how topics are triggered by user input.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Edit Triggers

Edit trigger phrases and model description for topic recognition.

## What You Can Edit

| Property | Description |
|----------|-------------|
| `triggerQueries` | Phrases that trigger the topic |
| `triggerQueriesCondensed` | Condensed trigger phrases |
| Model description | How the orchestrator understands the topic |

## Instructions

1. **Auto-discover the agent directory**:
   ```
   glob pattern: **/agent.mcs.yml
   ```

2. **Find the topic file**:
   ```
   glob pattern: **/topics/*.topic.mcs.yml
   ```
   If multiple topics, ask which one to edit.

3. **Read the topic file** to see current triggers.

4. **Edit the trigger configuration**:

### Edit Trigger Phrases

```yaml
beginDialog:
  kind: OnRecognizedIntent
  intent:
    triggerQueries:
      - "I want to check my order status"
      - "Where is my order"
      - "Order status"
      - "Track my package"
    triggerQueriesCondensed:
      - "check order status"
      - "track order"
      - "order status"
```

### Edit Model Description

The model description helps the orchestrator understand when to route to this topic:

```yaml
# In agent.mcs.yml, under model description for this topic
# Or in the topic's intent configuration
intent:
  description: "Use this topic when the user asks about order status, tracking, or delivery information"
```

5. **Validate the modified file**.

## Best Practices

### Trigger Phrases

1. **Variety** — Include different ways users might ask
2. **Specificity** — Be specific enough to avoid overlap
3. **Natural language** — Use phrases users actually say
4. **Keywords** — Include key terms

### Avoiding Overlap

If topics have similar triggers, consider:
- Making triggers more specific
- Adding disambiguation topic
- Using negative triggers (in model description)

### Model Description

Write clear descriptions that help the orchestrator:
- What the topic handles
- When to route to it
- What it does NOT handle

## Common Issues

| Issue | Solution |
|-------|----------|
| Wrong topic triggers | Make triggers more specific |
| Multiple topics match | Add disambiguation or refine triggers |
| Topic doesn't trigger | Add more trigger variations |
| Ambiguous routing | Improve model description |

## Workflow

1. Find topic file
2. Read current triggers
3. Edit trigger phrases and/or model description
4. Validate
5. User pushes and publishes