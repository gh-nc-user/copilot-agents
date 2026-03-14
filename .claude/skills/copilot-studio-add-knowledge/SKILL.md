---
name: copilot-studio-add-knowledge
description: Add a knowledge source to a Copilot Studio agent. Knowledge sources enable the agent to answer questions from documents, websites, and other content.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Add Knowledge Source

Add a knowledge source to a Copilot Studio agent to enable grounded answers from documents, websites, and other content.

## Knowledge Source Types

| Type | Description | Use Case |
|------|-------------|----------|
| SharePoint | Documents from SharePoint sites | Internal documents, policies |
| Website | Public website content | FAQs, product pages |
| File | Uploaded files | PDFs, Word documents |
| Dataverse | Dataverse tables | Structured data |
| External | Custom API endpoints | External data sources |

## Instructions

1. **Auto-discover the agent directory**:
   ```
   glob pattern: **/agent.mcs.yml
   ```
   If multiple agents found, ask which one.

2. **Determine the knowledge source type**:
   - Ask the user what content they want to add
   - Help identify the best source type

3. **Create the knowledge source YAML**:

### SharePoint Knowledge Source

```yaml
kind: KnowledgeSourceConfiguration
id: knowledge_<unique_id>
displayName: <display name>
description: <description>
source:
  kind: SharePoint
  siteUrl: <sharepoint_site_url>
  # ... additional configuration
```

### Website Knowledge Source

```yaml
kind: KnowledgeSourceConfiguration
id: knowledge_<unique_id>
displayName: <display name>
description: <description>
source:
  kind: Website
  url: <website_url>
  # ... additional configuration
```

4. **Save to the agent's knowledge directory**:
   ```
   <agent_dir>/knowledge/<name>.knowledge.mcs.yml
   ```

5. **Validate the generated file** using the validate skill.

## Important Notes

- Knowledge sources must be indexed before they're searchable
- Indexing happens automatically after adding the source
- For large content, indexing may take time
- Use `SearchAndSummarizeContent` action for explicit knowledge queries in topics

## Workflow

1. Identify knowledge source type
2. Create knowledge source YAML
3. Save to knowledge directory
4. Validate the file
5. User pushes and publishes
6. Knowledge becomes searchable after indexing