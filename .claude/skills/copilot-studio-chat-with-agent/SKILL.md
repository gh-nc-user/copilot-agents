---
name: copilot-studio-chat-with-agent
description: Send a test message to a published Copilot Studio agent via the Copilot Studio Client SDK. Requires Azure App Registration with CopilotStudio.Copilots.Invoke permission.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Chat with Agent (Point-Test)

Send a single utterance directly to a published Copilot Studio agent and receive the full response.

## Prerequisites

1. **Agent must be published** — Draft agents are not reachable
2. **Azure App Registration** with:
   - Platform: Public client / Native (Mobile and desktop applications)
   - Redirect URI: `http://localhost` (HTTP, not HTTPS)
   - API permissions: `CopilotStudio.Copilots.Invoke` (granted by admin)

## Instructions

### First-Time Setup

1. **Create Azure App Registration**:
   - Go to Azure Portal → App registrations
   - Create new registration
   - Select "Public client/native"
   - Add redirect URI: `http://localhost`
   - Note the Client ID

2. **Grant API Permission**:
   - Add API permission: `CopilotStudio.Copilots.Invoke`
   - Grant admin consent

3. **Configure in Project**:
   - Create `tests/settings.json` with your configuration
   - Include Client ID and environment details

### Running a Test

1. **Verify agent is published**:
   - User must publish in Copilot Studio UI
   - Draft agents cannot be tested externally

2. **Send test utterance**:
   - Provide the utterance to test
   - The skill will authenticate and send the message
   - Return the full agent response

3. **Multi-turn conversations**:
   - The skill maintains conversation context
   - Send follow-up messages to continue

## Configuration File

Create `tests/settings.json`:

```json
{
  "clientId": "<your-app-registration-client-id>",
  "tenantId": "<your-tenant-id>",
  "environmentUrl": "<your-power-platform-environment-url>",
  "agentId": "<your-agent-id>"
}
```

## Response Format

The skill returns:
- Agent's text response
- Any suggested actions
- Conversation ID for follow-up
- Turn count

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Authentication failed | Verify Client ID and permissions |
| Agent not found | Verify agent is published |
| Permission denied | Grant admin consent for API |
| Connection error | Verify environment URL |

## Workflow

1. Verify prerequisites (App Registration, published agent)
2. Configure settings
3. Send test utterance
4. Review response
5. Send follow-up if needed