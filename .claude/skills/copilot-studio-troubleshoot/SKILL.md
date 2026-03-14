---
name: copilot-studio-troubleshoot
description: Debug and fix issues with Copilot Studio agents — wrong topic routing, validation errors, unexpected behavior.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Troubleshoot Copilot Studio Agent

Debugging and fixing agent issues.

## Troubleshooting Workflow

1. **Search known issues** — Check common problems first
2. **Validate YAML files** — Run validation on all files
3. **Look up schema definitions** — Verify kind values
4. **Check trigger phrases** — Look for conflicts or overlaps
5. **Propose specific fixes** — Provide actionable solutions

## Common Issues

### Wrong Topic Routing

**Symptoms:**
- User says something and wrong topic triggers
- Multiple topics match the same phrase
- Topic doesn't trigger when expected

**Causes:**
- Overlapping trigger phrases
- Trigger phrases too similar
- Model description conflicts

**Solutions:**
- Use disambiguation topic
- Make trigger phrases more specific
- Add negative trigger phrases
- Update model description

### Validation Errors

**Symptoms:**
- YAML doesn't import correctly
- Error messages in Copilot Studio

**Causes:**
- Invalid `kind:` values
- Missing required properties
- Duplicate IDs
- Incorrect Power Fx syntax

**Solutions:**
- Use the validate skill to check files
- Use lookup-schema skill to verify kind values
- Regenerate duplicate IDs
- Ensure Power Fx expressions start with `=`

### Hallucination Issues

**Symptoms:**
- Agent makes up information
- Responses not grounded in knowledge sources
- Inconsistent answers

**Causes:**
- No knowledge source configured
- Knowledge source not indexed
- Generative mode without grounding

**Solutions:**
- Add knowledge source
- Check knowledge source status
- Use `SearchAndSummarizeContent` for explicit grounding
- Add agent instructions to use knowledge

### Child Agent Issues

**Symptoms:**
- Child agent responds directly to user
- Parent agent doesn't receive data
- Unexpected messages from child

**Causes:**
- Child agent using `SendMessageTool`
- Incorrect completion setting
- Missing output variables

**Solutions:**
- Set child agent completion properly
- Use output variables instead of messages
- Add instruction block to prevent direct responses

## Diagnostic Steps

1. **Ask clarifying questions** about the issue
2. **Read relevant YAML files** to understand structure
3. **Validate all files** using the validate skill
4. **Check for common patterns** that cause issues
5. **Propose specific fixes** with code examples

## Known Issues Reference

Check the Microsoft Copilot Studio documentation and GitHub issues for known problems:
- https://github.com/microsoft/skills-for-copilot-studio/issues

## Fix Proposal Format

```
## Issue Analysis

**Problem**: <description>
**Root Cause**: <cause>
**Affected Files**: <list>

## Proposed Fix

1. <step 1>
2. <step 2>
3. <step 3>

## Code Changes

<file path>:
```yaml
<changed code>
```

## Validation

After applying fixes:
1. Validate all modified files
2. Push to Copilot Studio
3. Test in draft mode
4. Publish and verify
```