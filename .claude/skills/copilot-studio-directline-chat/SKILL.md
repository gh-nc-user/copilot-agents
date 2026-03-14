---
name: copilot-studio-directline-chat
description: Send a test message to a Copilot Studio agent via DirectLine v3 REST API. Works with any bot that has DirectLine enabled. Supports OAuth/sign-in card flows.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# DirectLine Chat

Send a single utterance via the DirectLine v3 REST API (pure HTTP polling). Works with any bot that has DirectLine enabled.

## Prerequisites

Either:
1. **DirectLine Secret** from Azure Bot Service, OR
2. **Copilot Studio Token Endpoint URL**

## Instructions

### Option A: DirectLine Secret

1. **Get DirectLine Secret**:
   - Go to Azure Bot Service
   - Find your bot
   - Copy DirectLine secret

2. **Configure**:
   ```json
   {
     "directLineSecret": "<your-secret>"
   }
   ```

3. **Send message**:
   - Skill authenticates with secret
   - Sends message via DirectLine API
   - Polls for response

### Option B: Copilot Studio Token Endpoint

1. **Get Token Endpoint**:
   - From Copilot Studio settings
   - Copy token endpoint URL

2. **Configure**:
   ```json
   {
     "tokenEndpointUrl": "<your-token-endpoint>"
   }
   ```

3. **Send message**:
   - Skill gets token from endpoint
   - Sends message via DirectLine
   - Polls for response

## DirectLine API Flow

```
1. POST /directline/tokens/conversation
   → Get conversation token

2. POST /directline/conversations/{id}/activities
   → Send user message

3. GET /directline/conversations/{id}/activities
   → Poll for bot response
```

## Advantages

| Feature | DirectLine | SDK |
|---------|------------|-----|
| No App Registration | ✅ | ❌ |
| Works with any bot | ✅ | ❌ |
| OAuth/Sign-in cards | ✅ | ✅ |
| Multi-turn | ✅ | ✅ |

## Configuration File

Create `tests/settings.json`:

```json
{
  "directLineSecret": "<secret>",
  // OR
  "tokenEndpointUrl": "<token-endpoint-url>"
}
```

## Response Format

```
Bot Response:
=============
Text: "Your order #12345 is currently in transit..."

Suggested Actions:
- Track package
- Contact support

Conversation ID: abc123-def456
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Invalid secret | Verify DirectLine secret |
| Token expired | Get new token |
| No response | Check bot is running |
| OAuth failed | Verify sign-in card flow |

## Workflow

1. Configure DirectLine secret or token endpoint
2. Send test utterance
3. Poll for response
4. Return full response
5. Support multi-turn with conversation ID