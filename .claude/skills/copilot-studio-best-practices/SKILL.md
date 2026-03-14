---
name: copilot-studio-best-practices
description: Best practices for Copilot Studio agents. Covers JIT glossary loading, user context provisioning, dynamic topic redirects, and preventing child agents from responding directly to users.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Copilot Studio Best Practices

## JIT Glossary (Just-In-Time Glossary)

Automatically loads a CSV of customer-specific acronyms and terminology into a global variable (`Global.Glossary`) on the first user message. The orchestrator uses it to silently expand acronyms before searching knowledge sources — improving retrieval quality without the user having to explain internal jargon.

**Use when:**
- The user wants to add a glossary, acronym list, or terminology table
- Knowledge search quality is poor because the agent doesn't understand internal abbreviations
- The user asks about loading CSV/text data from SharePoint into a variable at conversation start

## JIT User Context

Loads the current user's Microsoft 365 profile (country, department, display name, etc.) into global variables on the first user message. The orchestrator uses these to personalize answers — e.g., returning the correct country-specific WFH policy without asking the user where they are.

**Use when:**
- The user wants country-aware, department-aware, or role-aware answers
- The agent needs to call the M365 Users connector (`GetMyProfile` / `UserGet_V2`)
- The user asks about personalizing responses based on who is chatting

## Dynamic Topic Redirect with Variable

Uses a `Switch()` Power Fx expression inside a `BeginDialog` node to dynamically redirect to different topics based on a variable value. Replaces complex if/then/else condition chains with a single, maintainable YAML pattern.

**Use when:**
- The user needs to route to one of several topics based on a variable
- The user wants to replace nested ConditionGroup nodes with a cleaner approach
- The user asks about dynamic topic redirects or Switch expressions in BeginDialog

## Prevent Child Agent Responses

Prevents child agents (connected agents) from sending messages directly to the user. Clarifies the common misconception about the completion setting and provides the instruction block to force child agents to use output variables instead of `SendMessageTool`.

**Use when:**
- The user wants a child agent to return data without messaging the user
- The user is confused about the completion setting on a child agent
- The parent agent needs to control all user-facing responses

## Date Context

Provides the current date to the orchestrator through agent instructions using Power FX (`{Text(Today(),DateTimeFormat.LongDate)}`). Enables accurate responses to date-related questions by giving the orchestrator explicit awareness of "today" for interpreting relative timeframes.

**Use when:**
- Users ask date-relative questions ("What's next week?", "upcoming events", "recent announcements")
- The agent needs to filter time-sensitive knowledge sources
- Date interpretation is causing confusion or hallucinations
- The agent handles schedules, calendars, deadlines, or time-sensitive content

## Combining Patterns

You can combine more than one best practice. For example, when using both glossary and user context, merge them into a **single** `conversation-init` topic rather than creating separate OnActivity topics.