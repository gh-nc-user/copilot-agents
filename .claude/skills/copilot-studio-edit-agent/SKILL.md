---
name: copilot-studio-edit-agent
description: Edit agent settings, instructions, and configuration. Modify the agent's behavior, orchestrator instructions, and global settings.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Edit Agent Settings

Edit the agent's configuration, instructions, and settings.

## What You Can Edit

| File | What It Contains |
|------|-------------------|
| `agent.mcs.yml` | Agent metadata, instructions |
| `settings.mcs.yml` | Global settings, variables, features |

## Instructions

1. **Auto-discover the agent directory**:
   ```
   glob pattern: **/agent.mcs.yml
   ```

2. **Read the agent file**:
   ```
   read: agent.mcs.yml
   ```

3. **Read the settings file**:
   ```
   read: settings.mcs.yml
   ```

4. **Make the requested edits**:

### Edit Agent Instructions

```yaml
# In agent.mcs.yml
instructions:
  - "You are a helpful assistant for Contoso Bank."
  - "Always be polite and professional."
  - "If you don't know something, say so honestly."
```

### Edit Generative Actions Setting

```yaml
# In settings.mcs.yml
GenerativeActionsEnabled: true  # or false
```

### Edit Agent Name and Description

```yaml
# In agent.mcs.yml
displayName: "Customer Service Agent"
description: "Handles customer inquiries for Contoso Bank"
```

### Add Date Context (Best Practice)

```yaml
# In agent.mcs.yml instructions
- "Today's date is {Text(Today(), DateTimeFormat.LongDate)}. Use this for any date-relative questions."
```

5. **Validate the modified files**.

## Common Edits

| Task | File | What to Change |
|------|------|-----------------|
| Change agent personality | `agent.mcs.yml` | Edit `instructions` |
| Enable/disable generative mode | `settings.mcs.yml` | `GenerativeActionsEnabled` |
| Add global variable | `settings.mcs.yml` | Add to `globalVariables` |
| Improve orchestrator hints | `agent.mcs.yml` | Edit `instructions` |
| Add date context | `agent.mcs.yml` | Add date instruction |

## Best Practices

1. **Clear instructions** — Be specific about agent behavior
2. **Date context** — Add today's date for time-relative queries
3. **Glossary integration** — Reference global glossary variables
4. **User context** — Reference global user profile variables
5. **Scope limits** — Define what the agent should NOT do

## Workflow

1. Read agent and settings files
2. Make edits
3. Validate
4. User pushes and publishes