---
name: copilot-studio-validate
description: Validate a Copilot Studio YAML file against the schema and best practices. Use when the user asks to check, validate, or verify a YAML file.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Validate YAML Structure

Validate a Copilot Studio YAML file against the schema and best practices.

## Instructions

1. **If a file path is provided**, use it. Otherwise, ask the user which file to validate.

2. **Read the file** to perform validation:

```
Use the read tool to read the YAML file
```

3. **Identify the file type** by checking the `kind` property:
   - `AdaptiveDialog` — Topic file
   - `GptComponentMetadata` — Agent metadata
   - `TaskDialog` — Connector action
   - `AgentDialog` — Child agent
   - `KnowledgeSourceConfiguration` — Knowledge source

4. **Perform manual checks**:

   **Structure Validation:**
   - `kind` property is present and valid
   - All required properties are present
   - Property types match schema expectations

   **ID Validation:**
   - All nodes have unique IDs
   - IDs follow naming convention (`<nodeType>_<random>`)
   - No `_REPLACE` placeholders remain

   **Reference Validation:**
   - Dialog references use correct fully-qualified format (`<schemaName>.topic.<TopicName>`)
   - Variable names use correct scope prefix (Topic., System.)

   **Power Fx Validation:**
   - Expressions start with `=` prefix
   - Parentheses are balanced
   - String interpolation uses `{}` correctly

   **Generative Orchestration (if applicable):**
   - If `inputType`/`outputType` defined, check matching `inputs` entries
   - If `AutomaticTaskInput` used, check `propertyName` matches `inputType.properties`

5. **Report findings**:

```
Validation Results for: <filename>

[PASS] <check description>
[WARN] <check description>
[FAIL] <check description>

Summary: X passed, Y warnings, Z failures
```

## Common Issues to Check

| Issue | Description | Fix |
|-------|-------------|-----|
| Missing `=` prefix | Power Fx expressions must start with `=` | Add `=` before expression |
| Duplicate IDs | Each node must have a unique ID | Regenerate IDs |
| Invalid `kind:` value | Kind must exist in schema | Use lookup-schema skill |
| Missing required properties | Some properties are mandatory | Add missing properties |
| Incorrect variable scope | Variables need proper prefix | Use `Topic.` or `System.` |

## Best Practices

- Always validate after creating or editing YAML
- Fix all FAIL issues before pushing to Copilot Studio
- WARN issues are recommendations, not blockers