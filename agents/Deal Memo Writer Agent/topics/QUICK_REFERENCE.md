# Deal Memo Writer Agent - Quick Reference

## Topic Overview (Execution Order)

```
1. DraftMemo                  [Main Entry Point]
   ↓
2. ValidateInputs            [Validation Gate]
   ↓
3. MemoSections              [Orchestrator]
   ├─→ 3a. CompanyOverviewSection
   ├─→ 3b. MarketAnalysisSection
   ├─→ 3c. CompetitiveLandscapeSection
   ├─→ 3d. KeyRisksSection
   └─→ 3e. OpenQuestionsSection
   ↓
4. CompileFinalMemo          [Final Output]
```

---

## 1. DraftMemo.mcs.yml
**Entry Point - Collects User Input**

| Aspect | Details |
|--------|---------|
| **Triggers** | "Draft memo", "Create memo", "Write investment memo", "Synthesize specialist outputs" |
| **Questions** | 1. Company name 2. Sector/industry 3. Market Analysis output 4. Competitive Landscape output |
| **Variables Set** | `Topic.CompanyName`, `Topic.Sector`, `Topic.MarketAgentOutput`, `Topic.CompetitiveAgentOutput` |
| **Next Step** | Calls ValidateInputs |

---

## 2. ValidateInputs.mcs.yml
**Validation Gate - Ensures Data Quality**

| Aspect | Details |
|--------|---------|
| **Purpose** | Verify specialist outputs contain "Confidence" AND "Evidence" sections |
| **Check 1** | Market output contains both "confidence" and "evidence" (case-insensitive) |
| **Check 2** | Competitive output contains both "confidence" and "evidence" (case-insensitive) |
| **Success** | Sets `Topic.InputsValid = true` → continues to MemoSections |
| **Failure** | Shows error message → requests user re-run specialists → ends |
| **Variables Set** | `Topic.MarketValid`, `Topic.CompetitiveValid`, `Topic.InputsValid` |

---

## 3. MemoSections.mcs.yml
**Orchestrator - Calls 5 Sub-Topics Sequentially**

| Aspect | Details |
|--------|---------|
| **Purpose** | Coordinate generation of all memo sections |
| **Sub-Topics Called** | CompanyOverviewSection → MarketAnalysisSection → CompetitiveLandscapeSection → KeyRisksSection → OpenQuestionsSection |
| **Key Feature** | Each sub-topic populates its `Topic.*Section` variable |
| **Returns** | All 5 section variables populated: CompanySection, MarketSection, CompetitiveSection, RisksSection, OpenQuestionsSection |

---

## 3a. CompanyOverviewSection.mcs.yml
**Section Generator - Company Overview**

| Aspect | Details |
|--------|---------|
| **Questions** | 1. Company stage (seed/series A/B/etc) 2. Business model & focus 3. Founding year |
| **Generated Section** | "## Company Overview\n\n**[CompanyName]** is a [[Stage]] [[Sector]] company. Founded in [Year], the company operates with the following model: [BusinessDescription]" |
| **Variables Set** | `Topic.CompanyStage`, `Topic.BusinessDescription`, `Topic.FoundingYear`, `Topic.CompanySection` |
| **Key Feature** | Uses company info from DraftMemo + new details to build formatted section |

---

## 3b. MarketAnalysisSection.mcs.yml
**Pass-Through Section - Market Analysis**

| Aspect | Details |
|--------|---------|
| **Purpose** | Display specialist output VERBATIM |
| **Attribution** | Header: "## Market Analysis\n\n*(per Market Analysis Agent)*" |
| **Power Fx** | `=concat("## Market Analysis\n\n*(per Market Analysis Agent)*\n\n", variables('Topic.MarketAgentOutput'))` |
| **Variables Set** | `Topic.MarketSection` |
| **Key Feature** | **ZERO modification** - exact specialist output preserved |

---

## 3c. CompetitiveLandscapeSection.mcs.yml
**Pass-Through Section - Competitive Landscape**

| Aspect | Details |
|--------|---------|
| **Purpose** | Display specialist output VERBATIM |
| **Attribution** | Header: "## Competitive Landscape\n\n*(per Competitive Landscape Agent)*" |
| **Power Fx** | `=concat("## Competitive Landscape\n\n*(per Competitive Landscape Agent)*\n\n", variables('Topic.CompetitiveAgentOutput'))` |
| **Variables Set** | `Topic.CompetitiveSection` |
| **Key Feature** | **ZERO modification** - exact specialist output preserved |

---

## 3d. KeyRisksSection.mcs.yml
**Section Generator - Key Risks**

| Aspect | Details |
|--------|---------|
| **Question** | "What key risks should be highlighted?" |
| **Market Risks** | If market output contains "risk" → "See market analysis above", else "No specific market risks identified" |
| **Competitive Risks** | If competitive output contains "risk" → "See competitive landscape above", else "No specific competitive risks identified" |
| **User Risks** | User-provided text (unmodified) |
| **Generated Section** | Combines all 3 risk categories with headers |
| **Variables Set** | `Topic.UserProvidedRisks`, `Topic.RisksSection` |

---

## 3e. OpenQuestionsSection.mcs.yml
**Section Generator - Open Questions**

| Aspect | Details |
|--------|---------|
| **Question** | "What open questions or next diligence steps should be prioritized?" |
| **From Specialists** | Note directing user to Confidence & Evidence sections above |
| **User Input** | User-provided questions (unmodified) |
| **Generated Section** | "## Open Questions & Next Diligence\n\n**From Specialist Analysis:**\n...\n\n**User-Identified Next Steps:**\n..." |
| **Variables Set** | `Topic.UserProvidedQuestions`, `Topic.OpenQuestionsSection` |

---

## 4. CompileFinalMemo.mcs.yml
**Final Output - Assemble & Export**

| Aspect | Details |
|--------|---------|
| **Process** | 1. Format date 2. Concatenate all sections 3. Display memo 4. Ask export preference |
| **Date Format** | `=text(addDays(now(), 0), 'yyyy-MM-dd')` |
| **Memo Sections** | CompanySection + MarketSection + CompetitiveSection + RisksSection + OpenQuestionsSection + metadata |
| **Metadata** | Prepared date, Company name, Sector |
| **Export Options** | Yes → Show copy instructions / No → Show "ready to copy" message |
| **Variables Set** | `Topic.FormattedDate`, `Topic.FinalMemo`, `Topic.SaveChoice` |

---

## Variable Reference

### Input Variables (From User)
```
Topic.CompanyName ...................... [string] - Company name
Topic.Sector ........................... [string] - Industry/sector
Topic.MarketAgentOutput ............... [string] - Market specialist output (verbatim)
Topic.CompetitiveAgentOutput .......... [string] - Competitive specialist output (verbatim)
```

### Validation Variables
```
Topic.MarketValid ...................... [boolean] - Market output has Confidence & Evidence?
Topic.CompetitiveValid ................ [boolean] - Competitive output has Confidence & Evidence?
Topic.InputsValid ..................... [boolean] - Both valid?
```

### Company Detail Variables
```
Topic.CompanyStage .................... [string] - seed/Series A/Series B/etc
Topic.BusinessDescription ............ [string] - Business model & focus
Topic.FoundingYear .................... [number] - Year company founded
```

### Section Variables
```
Topic.CompanySection ................. [string] - Formatted company overview
Topic.MarketSection .................. [string] - Market analysis + attribution
Topic.CompetitiveSection ............ [string] - Competitive landscape + attribution
Topic.RisksSection ................... [string] - Combined risks section
Topic.OpenQuestionsSection .......... [string] - Combined questions section
```

### User Input Variables
```
Topic.UserProvidedRisks .............. [string] - Additional risks from user
Topic.UserProvidedQuestions .......... [string] - Additional questions from user
```

### Output Variables
```
Topic.FormattedDate .................. [string] - Today's date (YYYY-MM-DD)
Topic.FinalMemo ...................... [string] - Complete formatted memo
Topic.SaveChoice ..................... [string] - User export choice (Yes/No)
```

---

## Power Fx Formulas at a Glance

| Topic | Formula | Purpose |
|-------|---------|---------|
| ValidateInputs | `=if(and(contains(toLower(variables('Topic.MarketAgentOutput')), 'confidence'), contains(toLower(variables('Topic.MarketAgentOutput')), 'evidence')), true, false)` | Check market output validity |
| ValidateInputs | `=if(and(contains(toLower(variables('Topic.CompetitiveAgentOutput')), 'confidence'), contains(toLower(variables('Topic.CompetitiveAgentOutput')), 'evidence')), true, false)` | Check competitive output validity |
| CompanyOverviewSection | `=concat("## Company Overview\n\n**", variables('Topic.CompanyName'), "** is a [", variables('Topic.CompanyStage'), "] [", variables('Topic.Sector'), "] company. Founded in ", text(variables('Topic.FoundingYear')), ", the company operates with the following model: ", variables('Topic.BusinessDescription'))` | Format company section |
| MarketAnalysisSection | `=concat("## Market Analysis\n\n*(per Market Analysis Agent)*\n\n", variables('Topic.MarketAgentOutput'))` | Add header + attribution to market output |
| CompetitiveLandscapeSection | `=concat("## Competitive Landscape\n\n*(per Competitive Landscape Agent)*\n\n", variables('Topic.CompetitiveAgentOutput'))` | Add header + attribution to competitive output |
| KeyRisksSection | `=concat("## Key Risks\n\n### Market Risks (per specialist)\n", if(contains(toLower(variables('Topic.MarketAgentOutput')), 'risk'), "See market analysis above", "No specific market risks identified"), "\n\n### Competitive Risks (per specialist)\n", if(contains(toLower(variables('Topic.CompetitiveAgentOutput')), 'risk'), "See competitive landscape above", "No specific competitive risks identified"), "\n\n### Additional Risks\n", variables('Topic.UserProvidedRisks'))` | Combine risks from all sources |
| OpenQuestionsSection | `=concat("## Open Questions & Next Diligence\n\n**From Specialist Analysis:**\nRefer to Confidence & Evidence sections in the market and competitive analyses above for outstanding questions.\n\n**User-Identified Next Steps:**\n", variables('Topic.UserProvidedQuestions'))` | Format questions section |
| CompileFinalMemo | `=text(addDays(now(), 0), 'yyyy-MM-dd')` | Format today's date |
| CompileFinalMemo | `=concat("# Investment Memo\n\n", variables('Topic.CompanySection'), "\n\n", variables('Topic.MarketSection'), "\n\n", variables('Topic.CompetitiveSection'), "\n\n", variables('Topic.RisksSection'), "\n\n", variables('Topic.OpenQuestionsSection'), "\n\n---\n\n**Prepared:** ", variables('Topic.FormattedDate'), "\n**Company:** ", variables('Topic.CompanyName'), "\n**Sector:** ", variables('Topic.Sector'))` | Assemble final memo |

---

## Data Preservation Principles

✅ **Pass-Through Integrity**
- Market & Competitive specialist outputs displayed VERBATIM
- No AI rewriting, summarization, or modification
- Confidence & Evidence sections preserved exactly

✅ **Clear Attribution**
- Market section: "*(per Market Analysis Agent)*"
- Competitive section: "*(per Competitive Landscape Agent)*"
- User can see original source of each insight

✅ **Variable Scoping**
- All variables use `Topic.*` for cross-topic inheritance
- Sub-topics read and update Topic-scoped variables
- Parent topic receives all updates when sub-topic ends

---

## Testing Checklist

- [ ] Trigger "Draft memo" successfully
- [ ] Input company name, sector, specialist outputs
- [ ] Validation detects missing "Confidence" section → error shown
- [ ] Validation detects missing "Evidence" section → error shown
- [ ] Both outputs valid → proceeds to MemoSections
- [ ] CompanyOverviewSection displays formatted section
- [ ] MarketAnalysisSection displays specialist output VERBATIM
- [ ] CompetitiveLandscapeSection displays specialist output VERBATIM
- [ ] KeyRisksSection combines risks correctly
- [ ] OpenQuestionsSection displays questions correctly
- [ ] CompileFinalMemo displays complete memo
- [ ] Memo includes date, company name, sector
- [ ] Export option "Yes" shows copy instructions
- [ ] Export option "No" shows "ready to copy" message
- [ ] All Topic.* variables persist across topics

