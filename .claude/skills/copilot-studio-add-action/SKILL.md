---
name: copilot-studio-add-action
description: Guide users through adding a new connector action to a Copilot Studio agent. Connector actions require UI-based connection setup, so this skill walks users through the Copilot Studio portal steps.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Add Connector Action (Guide)

This skill guides users through adding a new connector action to their Copilot Studio agent. **It does NOT write action YAML directly** because connector actions require a connection reference that can only be created through the Copilot Studio UI.

## Why This Is a Guide, Not a Generator

Connector actions need:
1. A **connection reference** — an authenticated link to the external service (Teams, Outlook, SharePoint, etc.)
2. The connection reference can only be created by the user authenticating in the Copilot Studio portal
3. Once the action is added via the UI and pulled locally, the YAML can be edited with `copilot-studio-edit-action`

## Common Connectors

| Connector | API Name | Common Operations |
|-----------|----------|-------------------|
| Teams | `shared_teams` | Post message, Get channel, List members |
| Outlook | `shared_office365` | Send email, Get emails, Create event |
| SharePoint | `shared_sharepointonline` | Get items, Create item, Update item |
| Dataverse | `shared_commondataserviceforapps` | Create, Read, Update, Delete records |
| HTTP | `shared_http` | GET, POST, PUT, DELETE requests |

## Instructions

1. **Understand what the user wants** — ask clarifying questions if the request is vague (e.g., "send a message" — Teams? Outlook? Slack?)

2. **Help identify the connector and operation**:
   - Ask what external service they need to connect to
   - Help them understand what operations are available
   - Note: Full connector lookup requires the original plugin's database

3. **Walk the user through the UI steps**:

   > Here's how to add this action in Copilot Studio:
   >
   > 1. Open [Copilot Studio](https://copilotstudio.microsoft.com)
   > 2. Navigate to your agent
   > 3. Go to **Actions** in the left sidebar
   > 4. Click **+ Add an action**
   > 5. Search for the operation from the connector
   > 6. Configure the connection (authenticate with your credentials)
   > 7. Save the action
   >
   > Once saved, pull the updated agent files using the **Copilot Studio VS Code Extension** (Source Control → Pull).

4. **After the user confirms they've pulled**, check for the new action file:
   ```
   glob pattern: **/actions/*.mcs.yml
   ```
   If the action file is present, let the user know it was pulled successfully.

5. **Offer to edit the action** — if the user wants to customize inputs, descriptions, or connection mode:
   > Would you like me to edit the action YAML? I can modify input descriptions, switch between automatic and manual inputs, change the connection mode, and more. Use the `copilot-studio-edit-action` skill.

## Action YAML Structure (Reference)

For reference, a connector action (TaskDialog) has this structure:

```yaml
kind: TaskDialog
id: <unique_id>
description: <action description>
entryPoint:
  kind: OnInvoke
inputs:
  - kind: <InputKind>
    propertyName: <input_name>
    description: <input_description>
    # ... additional properties
outputs:
  # ... output configuration
connectionReference:
  # ... connection reference (created in UI)
```

## Workflow

1. Identify connector and operation needed
2. Guide user through UI to add action
3. User pulls changes with VS Code Extension
4. Optionally edit the action YAML with edit-action skill