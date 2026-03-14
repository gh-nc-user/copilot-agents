# Deal Memo Writer Agent - Topic Architecture

## Overview
This agent synthesizes specialist agent outputs (Market Analysis & Competitive Landscape) into professional investment memos. It validates inputs, orchestrates memo generation, and provides formatting and export functionality.

## Topic Dependency Tree

```
DraftMemo (Entry Point)
├── ValidateInputs
│   └── Validates "Confidence & Evidence" sections exist
├── MemoSections (Orchestrator)
│   ├── CompanyOverviewSection
│   ├── MarketAnalysisSection
│   ├── CompetitiveLandscapeSection
│   ├── KeyRisksSection
│   └── OpenQuestionsSection
└── CompileFinalMemo (Final Output)
    └── Assembles complete memo + export options
```

---

## Topic Details

### 1. **DraftMemo.mcs.yml** (Main Entry Point)
**Trigger Phrases:**
- "Draft memo"
- "Create memo"
- "Write investment memo"
- "Synthesize specialist outputs"

**Flow:**
1. Welcome message
2. Collect company name (`Topic.CompanyName`)
3. Collect sector (`Topic.Sector`)
4. Collect Market Analysis output (`Topic.MarketAgentOutput`)
5. Collect Competitive Landscape output (`Topic.CompetitiveAgentOutput`)
6. Invoke ValidateInputs
7. Invoke MemoSections
8. Invoke CompileFinalMemo

**Variables Set:**
- `Topic.CompanyName` (string)
- `Topic.Sector` (string)
- `Topic.MarketAgentOutput` (string - verbatim from specialist)
- `Topic.CompetitiveAgentOutput` (string - verbatim from specialist)

---

### 2. **ValidateInputs.mcs.yml** (Validation Gate)
**Purpose:** Verify specialist outputs contain required sections

**Logic:**
- Checks if `Topic.MarketAgentOutput` contains both "confidence" AND "evidence" (case-insensitive)
- Checks if `Topic.CompetitiveAgentOutput` contains both "confidence" AND "evidence" (case-insensitive)
- If both pass: Sets `Topic.InputsValid = true`, shows success message, continues
- If either fails: Shows error message, asks user to re-run specialists with complete output, ends dialog

**Power Fx Validation:**
```power-fx
# Market validity check
=if(and(contains(toLower(variables('Topic.MarketAgentOutput')), 'confidence'), 
        contains(toLower(variables('Topic.MarketAgentOutput')), 'evidence')), 
    true, false)

# Competitive validity check
=if(and(contains(toLower(variables('Topic.CompetitiveAgentOutput')), 'confidence'), 
        contains(toLower(variables('Topic.CompetitiveAgentOutput')), 'evidence')), 
    true, false)
```

**Variables Set:**
- `Topic.MarketValid` (boolean)
- `Topic.CompetitiveValid` (boolean)
- `Topic.InputsValid` (boolean)

---

### 3. **MemoSections.mcs.yml** (Orchestrator)
**Purpose:** Sequentially invoke all 5 section-generating sub-topics

**Flow:**
1. Send "Generating memo sections..." message
2. BeginDialog → CompanyOverviewSection
3. BeginDialog → MarketAnalysisSection
4. BeginDialog → CompetitiveLandscapeSection
5. BeginDialog → KeyRisksSection
6. BeginDialog → OpenQuestionsSection
7. EndDialog (returns to parent)

**Note:** Each sub-topic returns with its section variable populated (e.g., `Topic.CompanySection`)

---

### 4. **CompanyOverviewSection.mcs.yml**
**Purpose:** Collect company details and generate formatted overview section

**Questions:**
1. "What is the company stage (seed/series A/series B/etc)?" → `Topic.CompanyStage`
2. "What is the business model and primary focus area?" → `Topic.BusinessDescription`
3. "What year was the company founded?" → `Topic.FoundingYear`

**Generated Section:**
```markdown
## Company Overview

**[CompanyName]** is a [[Stage]] [[Sector]] company. Founded in [FoundingYear], 
the company operates with the following model: [BusinessDescription]
```

**Variables Set:**
- `Topic.CompanyStage`
- `Topic.BusinessDescription`
- `Topic.FoundingYear`
- `Topic.CompanySection` (formatted markdown)

---

### 5. **MarketAnalysisSection.mcs.yml**
**Purpose:** Pass-through specialist output with attribution

**Pass-Through Logic:**
```power-fx
=concat("## Market Analysis\n\n*(per Market Analysis Agent)*\n\n", 
        variables('Topic.MarketAgentOutput'))
```

**Key Feature:** Zero modification - specialist output displayed exactly as provided

**Variables Set:**
- `Topic.MarketSection` (with header + attribution + original output)

---

### 6. **CompetitiveLandscapeSection.mcs.yml**
**Purpose:** Pass-through specialist output with attribution

**Pass-Through Logic:**
```power-fx
=concat("## Competitive Landscape\n\n*(per Competitive Landscape Agent)*\n\n", 
        variables('Topic.CompetitiveAgentOutput'))
```

**Key Feature:** Zero modification - specialist output displayed exactly as provided

**Variables Set:**
- `Topic.CompetitiveSection` (with header + attribution + original output)

---

### 7. **KeyRisksSection.mcs.yml**
**Purpose:** Compile risks from specialists + user input

**Question:** "What key risks should be highlighted? (market risks, execution risks, competitive risks, etc.)"

**Risk Compilation Logic:**
- Market Risks: If Market output contains "risk" → "See market analysis above", else "No specific market risks identified"
- Competitive Risks: If Competitive output contains "risk" → "See competitive landscape above", else "No specific competitive risks identified"
- Additional Risks: User-provided risks (unmodified)

**Generated Section:**
```markdown
## Key Risks

### Market Risks (per specialist)
[Auto-detection result]

### Competitive Risks (per specialist)
[Auto-detection result]

### Additional Risks
[User-provided risks]
```

**Variables Set:**
- `Topic.UserProvidedRisks`
- `Topic.RisksSection` (formatted markdown)

---

### 8. **OpenQuestionsSection.mcs.yml**
**Purpose:** Compile open questions for next diligence steps

**Question:** "What open questions or next diligence steps should be prioritized?"

**Generated Section:**
```markdown
## Open Questions & Next Diligence

**From Specialist Analysis:**
Refer to Confidence & Evidence sections in the market and competitive 
analyses above for outstanding questions.

**User-Identified Next Steps:**
[User questions/next steps]
```

**Variables Set:**
- `Topic.UserProvidedQuestions`
- `Topic.OpenQuestionsSection` (formatted markdown)

---

### 9. **CompileFinalMemo.mcs.yml** (Final Output)
**Purpose:** Assemble complete memo + provide export options

**Process:**
1. Format today's date: `Topic.FormattedDate = text(addDays(now(), 0), 'yyyy-MM-dd')`
2. Concatenate all sections with headers and metadata
3. Display complete memo
4. Ask "Would you like to export or save this memo?"
5. Route based on user choice

**Final Memo Structure:**
```markdown
# Investment Memo

## Company Overview
[from CompanyOverviewSection]

## Market Analysis
[from MarketAnalysisSection - verbatim]

## Competitive Landscape
[from CompetitiveLandscapeSection - verbatim]

## Key Risks
[from KeyRisksSection]

## Open Questions & Next Diligence
[from OpenQuestionsSection]

---

**Prepared:** [Today's Date]
**Company:** [CompanyName]
**Sector:** [Sector]
```

**Export Options:**
- **Yes:** Show instructions to copy memo to investment tracking system/OneNote/email
- **No:** Show "Ready to copy" message

**Variables Set:**
- `Topic.FormattedDate`
- `Topic.FinalMemo` (complete formatted memo)
- `Topic.SaveChoice` (Yes/No)

---

## Data Flow Summary

```
User Input (DraftMemo)
    ↓
[CompanyName, Sector, MarketAgentOutput, CompetitiveAgentOutput]
    ↓
ValidateInputs (Check for "Confidence & Evidence")
    ↓
MemoSections (Orchestrator calls 5 sub-topics)
    ├─→ CompanyOverviewSection → Topic.CompanySection
    ├─→ MarketAnalysisSection → Topic.MarketSection
    ├─→ CompetitiveLandscapeSection → Topic.CompetitiveSection
    ├─→ KeyRisksSection → Topic.RisksSection
    └─→ OpenQuestionsSection → Topic.OpenQuestionsSection
    ↓
CompileFinalMemo
    ├─→ Concatenate all sections → Topic.FinalMemo
    ├─→ Display complete memo
    └─→ Route to export or end
    ↓
Output (Ready to copy/share/export)
```

---

## Variable Scoping

All variables use `Topic.*` scope for cross-topic inheritance:

| Variable | Scope | Type | Set By | Used By |
|----------|-------|------|--------|---------|
| CompanyName | Topic | String | DraftMemo | All sections + final memo |
| Sector | Topic | String | DraftMemo | Company section + final memo |
| MarketAgentOutput | Topic | String | DraftMemo | Validation, Market section, Risk section |
| CompetitiveAgentOutput | Topic | String | DraftMemo | Validation, Competitive section, Risk section |
| MarketValid | Topic | Boolean | ValidateInputs | Validation condition |
| CompetitiveValid | Topic | Boolean | ValidateInputs | Validation condition |
| InputsValid | Topic | Boolean | ValidateInputs | (Informational) |
| CompanyStage | Topic | String | CompanyOverviewSection | Company section |
| BusinessDescription | Topic | String | CompanyOverviewSection | Company section |
| FoundingYear | Topic | Number | CompanyOverviewSection | Company section |
| CompanySection | Topic | String | CompanyOverviewSection | Final memo |
| MarketSection | Topic | String | MarketAnalysisSection | Final memo |
| CompetitiveSection | Topic | String | CompetitiveLandscapeSection | Final memo |
| UserProvidedRisks | Topic | String | KeyRisksSection | Risk section |
| RisksSection | Topic | String | KeyRisksSection | Final memo |
| UserProvidedQuestions | Topic | String | OpenQuestionsSection | Open questions section |
| OpenQuestionsSection | Topic | String | OpenQuestionsSection | Final memo |
| FormattedDate | Topic | String | CompileFinalMemo | Final memo |
| FinalMemo | Topic | String | CompileFinalMemo | Display + export |
| SaveChoice | Topic | String | CompileFinalMemo | Export routing |

---

## Key Design Principles

### 1. **Pass-Through Integrity**
- Specialist outputs (Market & Competitive) are displayed VERBATIM
- No summarization, rephrasing, or modification
- Confidence & Evidence sections preserved exactly

### 2. **Clear Attribution**
- Market Analysis section header: "*(per Market Analysis Agent)*"
- Competitive Landscape section header: "*(per Competitive Landscape Agent)*"
- Risk sections reference original specialist outputs

### 3. **Topic Variable Inheritance**
- All variables use `Topic.*` scope
- Sub-topics can read and modify Topic-scoped variables
- Parent topic receives updated variables when sub-topic EndDialog is called

### 4. **Validation Gate**
- Prevents memo generation if specialist outputs lack required sections
- Clear error messaging guides user to re-run specialists
- Ensures data quality before expensive synthesis

### 5. **Modular Section Generation**
- Each section is a separate topic for reusability
- Topics can be invoked individually or sequentially
- Easy to add/remove/modify sections without affecting others

---

## Testing Recommendations

### Happy Path:
1. Trigger "Draft memo"
2. Provide all required inputs
3. Ensure specialist outputs include "Confidence" and "Evidence"
4. Verify all sections populate correctly
5. Review final memo formatting
6. Test export options

### Error Cases:
1. Specialist output missing "Confidence" → Validation fails
2. Specialist output missing "Evidence" → Validation fails
3. User provides empty/invalid inputs → No section generated

### Integration Points:
- Market Analysis Agent (output source for validation)
- Competitive Landscape Agent (output source for validation)
- Investment tracking system (memo destination)

---

## Future Enhancements

- [ ] PDF export capability
- [ ] Email share functionality
- [ ] Memo template library selection
- [ ] Confidence score rollup from specialists
- [ ] Custom section ordering
- [ ] Collaborative editing/commenting
