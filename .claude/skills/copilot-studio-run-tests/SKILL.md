---
name: copilot-studio-run-tests
description: Run batch test suites against a published Copilot Studio agent using the Power CAT Copilot Studio Kit. Requires Dataverse connection and test set configuration.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Run Tests (Batch Test Suite)

Run pre-defined test sets with expected responses and pass/fail scoring using the Power CAT Copilot Studio Kit.

## Prerequisites

1. **Power CAT Copilot Studio Kit** installed in your environment
2. **Azure App Registration** with Dataverse permissions
3. **Test Set** configured in the kit
4. **Agent published**

## Test Types

| Type | Description |
|------|-------------|
| Point Test | Single utterance with expected response |
| Batch Test | Multiple utterances with expected responses |
| Evaluation | Analyze results from Copilot Studio UI evaluations |

## Instructions

### Setup

1. **Install Copilot Studio Kit**:
   - Download from [Power CAT Copilot Studio Kit](https://github.com/microsoft/Power-CAT-Copilot-Studio-Kit)
   - Import into your Power Platform environment

2. **Create Test Set**:
   - Define test cases in the kit
   - Each case has: utterance, expected response, pass criteria

3. **Configure Connection**:
   - Create `tests/settings.json` with Dataverse details

### Running Tests

1. **Verify configuration**:
   - Check `tests/settings.json` exists
   - Verify test set ID

2. **Run test suite**:
   - Execute all tests in the set
   - Collect results

3. **Analyze results**:
   - Pass/fail status
   - Response latencies
   - Failure patterns

## Configuration File

Create `tests/settings.json`:

```json
{
  "clientId": "<app-registration-client-id>",
  "tenantId": "<tenant-id>",
  "dataverseUrl": "<dataverse-environment-url>",
  "agentId": "<agent-configuration-id>",
  "testSetId": "<test-set-id>"
}
```

## Analyzing Evaluation Results

If user provides evaluation CSV:

1. **Read the CSV file**:
   - Parse evaluation results
   - Identify failures

2. **Analyze patterns**:
   - Common failure types
   - Topics with issues
   - Response quality problems

3. **Propose fixes**:
   - YAML modifications
   - Trigger phrase improvements
   - Knowledge source additions

## Test Result Format

```
Test Suite Results:
==================
Total: 25
Passed: 22
Failed: 3
Latency: avg 1.2s, max 3.5s

Failed Tests:
- Test 5: Expected "order status" got "tracking info"
- Test 12: Response missing required information
- Test 18: Topic routing incorrect
```

## Workflow

1. Configure test set in Copilot Studio Kit
2. Set up Dataverse connection
3. Run test suite
4. Analyze results
5. Propose fixes for failures