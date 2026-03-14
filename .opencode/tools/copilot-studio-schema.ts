import { tool } from "@opencode-ai/plugin"

// Copilot Studio YAML Schema Definitions
// This is a simplified schema for validation purposes
// For full schema, see: https://github.com/microsoft/skills-for-copilot-studio

const SCHEMA_DEFINITIONS: Record<string, Record<string, unknown>> = {
  // Dialog Types
  AdaptiveDialog: {
    kind: "AdaptiveDialog",
    required: ["kind", "beginDialog"],
    properties: {
      kind: { type: "string", const: "AdaptiveDialog" },
      id: { type: "string" },
      beginDialog: { $ref: "#/definitions/BeginDialog" },
      inputs: { type: "array" },
      outputType: { type: "object" },
    },
  },
  TaskDialog: {
    kind: "TaskDialog",
    required: ["kind", "entryPoint"],
    properties: {
      kind: { type: "string", const: "TaskDialog" },
      id: { type: "string" },
      description: { type: "string" },
      entryPoint: { type: "object" },
      inputs: { type: "array" },
      outputs: { type: "object" },
    },
  },
  AgentDialog: {
    kind: "AgentDialog",
    required: ["kind", "agent"],
    properties: {
      kind: { type: "string", const: "AgentDialog" },
      id: { type: "string" },
      displayName: { type: "string" },
      agent: { type: "object" },
    },
  },
  KnowledgeSourceConfiguration: {
    kind: "KnowledgeSourceConfiguration",
    required: ["kind", "source"],
    properties: {
      kind: { type: "string", const: "KnowledgeSourceConfiguration" },
      id: { type: "string" },
      displayName: { type: "string" },
      source: { type: "object" },
    },
  },

  // Trigger Types
  OnRecognizedIntent: {
    kind: "OnRecognizedIntent",
    required: ["kind", "intent"],
    properties: {
      kind: { type: "string", const: "OnRecognizedIntent" },
      intent: { type: "object" },
      actions: { type: "array" },
    },
  },
  OnConversationStart: {
    kind: "OnConversationStart",
    required: ["kind"],
    properties: {
      kind: { type: "string", const: "OnConversationStart" },
      actions: { type: "array" },
    },
  },
  OnUnknownIntent: {
    kind: "OnUnknownIntent",
    required: ["kind"],
    properties: {
      kind: { type: "string", const: "OnUnknownIntent" },
      actions: { type: "array" },
    },
  },
  OnEscalate: {
    kind: "OnEscalate",
    required: ["kind"],
    properties: {
      kind: { type: "string", const: "OnEscalate" },
      actions: { type: "array" },
    },
  },
  OnError: {
    kind: "OnError",
    required: ["kind"],
    properties: {
      kind: { type: "string", const: "OnError" },
      actions: { type: "array" },
    },
  },

  // Action Types
  SendActivity: {
    kind: "SendActivity",
    required: ["kind"],
    properties: {
      kind: { type: "string", const: "SendActivity" },
      id: { type: "string" },
      activity: { type: "string" },
    },
  },
  Question: {
    kind: "Question",
    required: ["kind", "variable", "prompt"],
    properties: {
      kind: { type: "string", const: "Question" },
      id: { type: "string" },
      variable: { type: "string" },
      prompt: { type: "string" },
      options: { type: "array" },
    },
  },
  ConditionGroup: {
    kind: "ConditionGroup",
    required: ["kind", "conditions"],
    properties: {
      kind: { type: "string", const: "ConditionGroup" },
      id: { type: "string" },
      conditions: { type: "array" },
    },
  },
  BeginDialog: {
    kind: "BeginDialog",
    required: ["kind"],
    properties: {
      kind: { type: "string", const: "BeginDialog" },
      dialog: { type: "string" },
    },
  },
  EndDialog: {
    kind: "EndDialog",
    required: ["kind"],
    properties: {
      kind: { type: "string", const: "EndDialog" },
    },
  },
  SetVariable: {
    kind: "SetVariable",
    required: ["kind", "variable", "value"],
    properties: {
      kind: { type: "string", const: "SetVariable" },
      id: { type: "string" },
      variable: { type: "string" },
      value: { type: "string" },
    },
  },
  SearchAndSummarizeContent: {
    kind: "SearchAndSummarizeContent",
    required: ["kind"],
    properties: {
      kind: { type: "string", const: "SearchAndSummarizeContent" },
      id: { type: "string" },
      query: { type: "string" },
    },
  },
  AnswerQuestionWithAI: {
    kind: "AnswerQuestionWithAI",
    required: ["kind"],
    properties: {
      kind: { type: "string", const: "AnswerQuestionWithAI" },
      id: { type: "string" },
    },
  },
  HttpRequest: {
    kind: "HttpRequest",
    required: ["kind", "url"],
    properties: {
      kind: { type: "string", const: "HttpRequest" },
      id: { type: "string" },
      url: { type: "string" },
      method: { type: "string" },
    },
  },

  // Input Types
  AutomaticTaskInput: {
    kind: "AutomaticTaskInput",
    required: ["kind", "propertyName", "description"],
    properties: {
      kind: { type: "string", const: "AutomaticTaskInput" },
      propertyName: { type: "string" },
      description: { type: "string" },
      entity: { type: "string" },
      shouldPromptUser: { type: "boolean" },
    },
  },
}

// Valid kind values
const VALID_KINDS = [
  // Dialog Types
  "AdaptiveDialog",
  "TaskDialog",
  "AgentDialog",
  "KnowledgeSourceConfiguration",
  // Trigger Types
  "OnRecognizedIntent",
  "OnConversationStart",
  "OnUnknownIntent",
  "OnEscalate",
  "OnError",
  "OnInvoke",
  // Action Types
  "SendActivity",
  "Question",
  "ConditionGroup",
  "Condition",
  "BeginDialog",
  "EndDialog",
  "SetVariable",
  "SetTextVariable",
  "SearchAndSummarizeContent",
  "AnswerQuestionWithAI",
  "HttpRequest",
  "TelemetryTrackEvent",
  "CancelAllDialogs",
  "RepeatDialog",
  // Input Types
  "AutomaticTaskInput",
  "ManualTaskInput",
  "TextInput",
  "NumberInput",
  "ChoiceInput",
  "BooleanInput",
  // Entity Types
  "StringPrebuiltEntity",
  "NumberPrebuiltEntity",
  "BooleanPrebuiltEntity",
  "DateTimePrebuiltEntity",
]

export const copilotStudioSchema = tool({
  description:
    "Validate Copilot Studio YAML files and look up schema definitions. Use to verify kind values, check required properties, and validate structure.",
  args: {
    command: tool.schema
      .enum(["validate", "kinds", "resolve", "search"])
      .describe("Command to execute: validate, kinds, resolve, or search"),
    argument: tool.schema
      .string()
      .optional()
      .describe("Argument for the command (file path for validate, kind name for resolve, search term for search)"),
  },
  async execute(args) {
    switch (args.command) {
      case "kinds":
        return listKinds()
      case "resolve":
        return resolveKind(args.argument || "")
      case "search":
        return searchKind(args.argument || "")
      case "validate":
        return "Validation requires a file path. Use the read tool to read the file, then validate manually."
      default:
        return `Unknown command: ${args.command}`
    }
  },
})

function listKinds(): string {
  const categorized = {
    "Dialog Types": ["AdaptiveDialog", "TaskDialog", "AgentDialog", "KnowledgeSourceConfiguration"],
    "Trigger Types": [
      "OnRecognizedIntent",
      "OnConversationStart",
      "OnUnknownIntent",
      "OnEscalate",
      "OnError",
      "OnInvoke",
    ],
    "Action Types": [
      "SendActivity",
      "Question",
      "ConditionGroup",
      "Condition",
      "BeginDialog",
      "EndDialog",
      "SetVariable",
      "SetTextVariable",
      "SearchAndSummarizeContent",
      "AnswerQuestionWithAI",
      "HttpRequest",
      "TelemetryTrackEvent",
      "CancelAllDialogs",
      "RepeatDialog",
    ],
    "Input Types": ["AutomaticTaskInput", "ManualTaskInput", "TextInput", "NumberInput", "ChoiceInput", "BooleanInput"],
    "Entity Types": ["StringPrebuiltEntity", "NumberPrebuiltEntity", "BooleanPrebuiltEntity", "DateTimePrebuiltEntity"],
  }

  let output = "# Valid Kind Values in Copilot Studio YAML\n\n"
  for (const [category, kinds] of Object.entries(categorized)) {
    output += `## ${category}\n`
    for (const kind of kinds) {
      output += `- \`${kind}\`\n`
    }
    output += "\n"
  }
  return output
}

function resolveKind(kind: string): string {
  const definition = SCHEMA_DEFINITIONS[kind]
  if (!definition) {
    return `Kind '${kind}' not found in schema definitions.\n\nUse 'search' to find similar kinds.`
  }

  let output = `# ${kind}\n\n`
  output += "```yaml\n"
  output += YAML.stringify(definition, null, 2)
  output += "```\n\n"

  if (definition.required) {
    output += "**Required Properties:**\n"
    for (const prop of definition.required as string[]) {
      output += `- \`${prop}\`\n`
    }
  }

  return output
}

function searchKind(term: string): string {
  const termLower = term.toLowerCase()
  const matches = VALID_KINDS.filter((k) => k.toLowerCase().includes(termLower))

  if (matches.length === 0) {
    return `No kinds found matching '${term}'.\n\nTry searching for: dialog, trigger, action, input, or entity`
  }

  let output = `# Kinds matching '${term}'\n\n`
  for (const match of matches) {
    output += `- \`${match}\`\n`
  }
  return output
}

// Simple YAML formatter (since we don't have yaml library)
const YAML = {
  stringify(obj: unknown, indent = 0): string {
    const spaces = "  ".repeat(indent)
    if (obj === null || obj === undefined) return "null"
    if (typeof obj === "string") return obj.includes("\n") ? `|\n${obj}` : obj
    if (typeof obj !== "object") return String(obj)
    if (Array.isArray(obj)) {
      return obj.map((item) => `- ${YAML.stringify(item, indent + 1)}`).join("\n" + spaces)
    }
    return Object.entries(obj as Record<string, unknown>)
      .map(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          return `${key}:\n${spaces}${YAML.stringify(value, indent + 1)}`
        }
        return `${key}: ${YAML.stringify(value)}`
      })
      .join("\n" + spaces)
  },
}

export default copilotStudioSchema