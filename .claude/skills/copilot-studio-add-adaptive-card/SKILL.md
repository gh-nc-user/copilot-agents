---
name: copilot-studio-add-adaptive-card
description: Add an Adaptive Card to a topic for rich interactive content. Use when the user wants to display cards, forms, or interactive elements.
license: MIT
compatibility: opencode
metadata:
  source: microsoft/skills-for-copilot-studio
  adapted_for: opencode
---

# Add Adaptive Card

Add an Adaptive Card to a topic for rich, interactive content.

## What Adaptive Cards Can Do

| Feature | Description |
|---------|-------------|
| Forms | Collect user input with text boxes, dropdowns |
| Images | Display images with captions |
| Buttons | Action buttons for user choices |
| Tables | Display tabular data |
| Columns | Multi-column layouts |

## Instructions

1. **Auto-discover the agent directory**:
   ```
   glob pattern: **/agent.mcs.yml
   ```

2. **Identify the target topic** for the adaptive card.

3. **Create the Adaptive Card JSON**:

### Basic Card with Text

```json
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "text": "Hello, {Topic.UserName}!",
      "size": "Medium"
    }
  ]
}
```

### Card with Buttons

```json
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "text": "What would you like to do?",
      "size": "Medium"
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Option A",
      "data": { "choice": "A" }
    },
    {
      "type": "Action.Submit",
      "title": "Option B",
      "data": { "choice": "B" }
    }
  ]
}
```

### Card with Input Form

```json
{
  "type": "AdaptiveCard",
  "body": [
    {
      "type": "TextBlock",
      "text": "Enter your information"
    },
    {
      "type": "Input.Text",
      "id": "userName",
      "placeholder": "Your name"
    },
    {
      "type": "Input.ChoiceSet",
      "id": "country",
      "choices": [
        { "title": "USA", "value": "US" },
        { "title": "Canada", "value": "CA" }
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.Submit",
      "title": "Submit"
    }
  ]
}
```

4. **Add the card to a SendActivity node**:

```yaml
- kind: SendActivity
  id: SendActivity_abc123
  activity:
    attachments:
      - contentType: application/vnd.microsoft.card.adaptive
        content:
          type: AdaptiveCard
          body:
            - type: TextBlock
              text: "Hello!"
          actions: []
```

5. **Handle card submit actions** in a subsequent node:

```yaml
- kind: ConditionGroup
  id: ConditionGroup_def456
  conditions:
    - kind: Condition
      expression: "=Topic.CardData.choice = \"A\""
      actions:
        - kind: SendActivity
          id: SendActivity_ghi789
          activity: "You chose Option A"
```

6. **Validate the topic file**.

## Best Practices

1. **Keep cards simple** — Don't overload with too much content
2. **Use Power Fx for dynamic content** — `{Topic.Variable}` in card JSON
3. **Test on all channels** — Cards render differently on Teams, web, etc.
4. **Handle submit data** — Process `Topic.CardData` after submission
5. **Provide fallback text** — For channels that don't support cards

## Workflow

1. Identify target topic
2. Create Adaptive Card JSON
3. Add to SendActivity node
4. Handle submit actions if needed
5. Validate