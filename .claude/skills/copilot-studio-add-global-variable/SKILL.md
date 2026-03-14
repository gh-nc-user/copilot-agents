---
name: copilot-studio-add-global-variable
description: Add a global variable to a Copilot Studio agent. Global variables are accessible across all topics.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Add Global Variable

Add a global variable to a Copilot Studio agent for cross-topic data sharing.

## Global Variable Types

| Type | Description | Example |
|------|-------------|---------|
| String | Text value | User name, preferences |
| Number | Numeric value | Count, score |
| Boolean | True/false | Is authenticated |
| Object | Complex data | User profile, settings |
| Table | Array of records | Cart items, list |

## Instructions

1. **Auto-discover the agent directory**:
   ```
   glob pattern: **/agent.mcs.yml
   ```

2. **Read the agent settings file**:
   ```
   read: settings.mcs.yml
   ```

3. **Add the global variable** to the settings:

```yaml
# In settings.mcs.yml
globalVariables:
  - name: Global.UserName
    type: String
    displayName: User Name
    description: "The current user's name"
    defaultValue: ""
  - name: Global.UserCountry
    type: String
    displayName: User Country
    description: "The current user's country"
    defaultValue: ""
```

4. **Validate the settings file**.

## Using Global Variables

### In Topics

```yaml
# Reading a global variable
- kind: SendActivity
  id: SendActivity_abc123
  activity: "Hello, {Global.UserName}!"

# Setting a global variable
- kind: SetVariable
  id: SetVariable_def456
  variable: Global.UserName
  value: "=Topic.InputName"
```

### In Power Fx

```yaml
# Reading
=Global.UserName

# Setting (requires SetVariable action)
variable: Global.UserName
value: "New Value"
```

## Best Practices

1. **Prefix with `Global.`** — Always use the Global prefix
2. **Initialize in OnConversationStart** — Set default values in the greeting topic
3. **Use sparingly** — Prefer topic variables when possible
4. **Document clearly** — Add descriptions for each variable

## Common Use Cases

| Variable | Type | Use Case |
|----------|------|----------|
| `Global.UserName` | String | Store user's name |
| `Global.UserCountry` | String | Country-specific responses |
| `Global.IsAuthenticated` | Boolean | Authentication state |
| `Global.UserPreferences` | Object | User settings |
| `Global.CartItems` | Table | Shopping cart |

## Workflow

1. Read settings.mcs.yml
2. Add global variable definition
3. Initialize in OnConversationStart topic
4. Validate settings