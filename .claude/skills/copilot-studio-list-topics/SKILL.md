---
name: copilot-studio-list-topics
description: List all topics in a Copilot Studio agent. Use when the user wants to see an overview of all topics or find specific topics.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# List Topics

List all topics in a Copilot Studio agent.

## Instructions

1. **Auto-discover the agent directory**:
   Use the glob tool to find the agent configuration:
   ```
   glob pattern: **/agent.mcs.yml
   ```
   If multiple agents found, ask which one.

2. **Find all topic files**:
   Use the glob tool to find topic files:
   ```
   glob pattern: **/topics/*.topic.mcs.yml
   ```

3. **Read each topic file** to extract:
   - Topic name (from `# Name:` comment or file name)
   - Trigger type (from `beginDialog.kind`)
   - Trigger phrases (from `intent.triggerQueries`)

4. **Present a summary**:

```
Topics in <Agent Name>:

| # | Name | Trigger Type | Trigger Phrases |
|---|------|--------------|-----------------|
| 1 | Greeting | OnConversationStart | (automatic) |
| 2 | Product Info | OnRecognizedIntent | "what products", "product catalog" |
| 3 | Fallback | OnUnknownIntent | (catch-all) |

Total: X topics
```

## Output Format

For each topic, show:
- **Name**: The topic name
- **Trigger Type**: How the topic is triggered
- **Trigger Phrases**: Sample phrases (first 3)
- **File Path**: Relative path to the topic file

## Use Cases

- Get an overview of the agent's conversation coverage
- Find topics that might conflict (similar trigger phrases)
- Identify gaps in topic coverage
- Plan new topics based on existing structure