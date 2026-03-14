---
name: copilot-studio-add-other-agents
description: Add child agents or connected agents to a Copilot Studio agent. Use when the user wants to integrate with other agents.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Add Other Agents (Child/Connected Agents)

Add child agents or connected agents to enable multi-agent scenarios.

## Agent Types

| Type | Description | Use Case |
|------|-------------|----------|
| Child Agent | Agent within the same solution | Modular topics, reusable flows |
| Connected Agent | External agent from another solution | Cross-solution integration |

## Instructions

1. **Auto-discover the agent directory**:
   ```
   glob pattern: **/agent.mcs.yml
   ```

2. **Determine the agent type**:
   - Child agent: Within same solution
   - Connected agent: External solution

3. **Create the agent reference YAML**:

### Child Agent (AgentDialog)

```yaml
kind: AgentDialog
id: AgentDialog_<unique_id>
displayName: <display name>
description: <description>
agent:
  kind: Child
  agentId: <child_agent_id>
  # ... configuration
```

### Connected Agent

```yaml
kind: AgentDialog
id: AgentDialog_<unique_id>
displayName: <display name>
description: <description>
agent:
  kind: Connected
  connectionReference: <connection_reference>
  # ... configuration
```

4. **Configure inputs and outputs**:

```yaml
inputs:
  - kind: AutomaticTaskInput
    propertyName: InputData
    description: "Data to send to child agent"
    entity: StringPrebuiltEntity
    shouldPromptUser: false

outputType:
  properties:
    Result:
      displayName: Result
      description: "Result from child agent"
      type: String
```

5. **Save to the agent's agents directory**:
   ```
   <agent_dir>/agents/<name>.agent.mcs.yml
   ```

6. **Validate the file** using the validate skill.

## Important: Preventing Child Agent Responses

Child agents should NOT send messages directly to users. Configure the child agent to use output variables instead of `SendMessageTool`.

Add this instruction to the child agent:
```
You must NOT use SendMessageTool or any direct messaging to the user.
Instead, return all results through your output variables.
The parent agent will handle all user communication.
```

## Workflow

1. Identify agent type (child vs connected)
2. Create agent reference YAML
3. Configure inputs and outputs
4. Save to agents directory
5. Validate
6. Configure child agent to not message users directly