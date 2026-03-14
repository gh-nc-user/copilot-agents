---
name: copilot-studio-add-generative-answers
description: Add generative answers (SearchAndSummarizeContent) to a topic. Use when the user wants the agent to search knowledge sources and generate answers.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Add Generative Answers

Add a SearchAndSummarizeContent node to a topic for knowledge-grounded responses.

## When to Use

| Scenario | Recommended Approach |
|----------|---------------------|
| Agent has knowledge source | Use `SearchAndSummarizeContent` |
| Need explicit query control | Use `SearchAndSummarizeContent` with custom query |
| General knowledge (no docs) | Use `AnswerQuestionWithAI` |
| Simple Q&A from docs | Let orchestrator handle it (no node needed) |

## Instructions

1. **Auto-discover the agent directory**:
   ```
   glob pattern: **/agent.mcs.yml
   ```

2. **Check for knowledge sources**:
   ```
   glob pattern: **/knowledge/*.knowledge.mcs.yml
   ```
   If no knowledge sources exist, recommend adding one first.

3. **Identify the target topic** for the generative answer node.

4. **Create the SearchAndSummarizeContent node**:

```yaml
- kind: SearchAndSummarizeContent
  id: SearchAndSummarizeContent_<unique_id>
  # Basic configuration
```

5. **Configure the node** based on use case:

### Basic Knowledge Search

```yaml
- kind: SearchAndSummarizeContent
  id: SearchAndSummarizeContent_abc123
```

### With Custom Query

```yaml
- kind: SearchAndSummarizeContent
  id: SearchAndSummarizeContent_def456
  query: "=Topic.SearchQuery"
```

### With Knowledge Source Filter

```yaml
- kind: SearchAndSummarizeContent
  id: SearchAndSummarizeContent_ghi789
  knowledgeSourceIds:
    - knowledge_source_id_1
    - knowledge_source_id_2
```

6. **Insert the node** in the topic's actions array.

7. **Validate the file** using the validate skill.

## Important Notes

- **Knowledge sources must be configured first** — Use `copilot-studio-add-knowledge`
- **Generative orchestrator** — If `GenerativeActionsEnabled: true` in settings, the orchestrator may handle knowledge queries automatically
- **AnswerQuestionWithAI** — Use for general knowledge NOT grounded in documents
- **Explicit control** — Use `SearchAndSummarizeContent` when you need to control the query or filter sources

## Workflow

1. Verify knowledge sources exist
2. Identify target topic
3. Create SearchAndSummarizeContent node
4. Configure query and filters as needed
5. Insert into topic
6. Validate