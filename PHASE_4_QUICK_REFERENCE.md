# Phase 4 - Quick Reference

## Status Summary
- ✅ **YAML Validation**: COMPLETE - All 48 files validated, 0 critical issues
- 🔄 **Agent Publishing**: REQUIRED - Agents must be published before testing
- 📋 **Testing**: READY - Playbook created, test cases defined

## Before You Start Testing

### 1. Validate YAML (Already Done ✅)
```
Result: All YAML files pass validation
- No duplicate node IDs (only expected "main" IDs)
- 100% Power Fx syntax valid
- All references correct
```

### 2. Push Agents to Power Platform
```
Via VS Code Extension:
1. Open VS Code
2. Open Copilot Studio extension
3. For each agent:
   - Right-click agent folder
   - Select "Push to Copilot Studio"
   - Confirm changes
4. All 4 agents should now be in DRAFT state
```

### 3. Publish Agents
```
Via Copilot Studio UI (https://copilotstudio.microsoft.com):
1. Open each agent
2. Click "Publish" button (top right)
3. Confirm publication
4. Agents now marked as "Published"

Order: Publish in this sequence:
1. Deal Orchestrator (depends on others)
2. Market Analysis Agent
3. Competitive Landscape Agent
4. Deal Memo Writer Agent
```

## Test Execution Sequence

### Quick Test (30 minutes)
```
1. Test 2: Intake & Triage (5 min)
2. Test 3: Market Analysis (10 min)
3. Test 4: Competitive Analysis (10 min)
4. Test 5: Memo Generation (5 min)
```

### Full Test (60 minutes)
```
1. Test 2: Intake & Triage (5 min)
2. Test 3: Market Analysis (15 min)
3. Test 4: Competitive Analysis (15 min)
4. Test 5: Memo Generation (10 min)
5. Test 6: End-to-End Pipeline (15 min)
```

## Which Testing Approach?

| Approach | When | Command |
|----------|------|---------|
| **Point-Test** | Testing individual flows | `/chat-with-agent` |
| **Batch Suite** | Pre-defined test sets | `/run-tests` |

**Recommendation**: Use Point-Test for Phase 4 (more visual feedback, easier to debug)

## Test Scenarios (Copy-Paste Ready)

### Test 2: Intake & Triage
```
I'd like to coordinate a standard VC diligence pass for a Series A SaaS company. 

Company: TechFlow AI
Sector: Enterprise AI / Workflow Automation
Stage: Series A, $2M raised
Documents: Product deck (15 slides), customer case studies, technical architecture doc

Please analyze their market opportunity and competitive positioning.
```

### Test 3: Market Analysis
```
Analyze the market opportunity for TechFlow AI:
- Target: Enterprise workflow automation via AI
- Primary market: Fortune 500 companies
- Secondary market: Mid-market enterprises (100-5,000 employees)
- Tertiary market: SMBs with AI adoption

Please estimate TAM, SAM, and SOM using both top-down and bottom-up approaches. 
Assess your confidence in these estimates and cite your evidence sources.
```

### Test 4: Competitive Landscape
```
Analyze the competitive landscape for TechFlow AI (enterprise AI workflow automation):

Direct competitors to research:
- Automation Anywhere
- UiPath
- Blue Prism
- Alteryx

Substitutes/Alternatives:
- In-house RPA teams
- Traditional process outsourcing
- Consultancy firms

Please identify their positioning, differentiation, and market share. 
Include your confidence assessment and evidence sources.
```

### Test 5: Memo Generation
```
Please draft a professional IC-style memo based on these specialist analyses:

[PASTE MARKET ANALYSIS OUTPUT]

[PASTE COMPETITIVE ANALYSIS OUTPUT]

Format as a 5-section memo:
1. Company Overview (TechFlow AI - Series A, $2M raised)
2. Market Analysis (with confidence levels)
3. Competitive Landscape (with confidence levels)
4. Key Risks & Uncertainties
5. Open Questions for Management

Important: No investment recommendations. Neutral tone. Preserve confidence levels.
```

### Test 6: End-to-End Pipeline
```
Let's run a complete diligence on a new Series A SaaS company.

Company: CloudScale Analytics
Sector: Data Analytics / Business Intelligence
Stage: Series A ($3M raised)
Funding: 18 months runway

Documents available:
- Pitch deck (18 slides)
- Customer case studies (3)
- Technical documentation
- Customer list (beta customers)

Please coordinate a full analysis:
1. Intake and identify key deal parameters
2. Analyze the market opportunity (TAM/SAM/SOM)
3. Map the competitive landscape
4. Generate a professional IC memo

Please proceed through the complete pipeline.
```

## Pass Criteria Checklist

### Test 2: Intake & Triage
- [ ] Metadata extracted (company, sector, stage)
- [ ] Documents identified
- [ ] Missing items flagged
- [ ] Routes to Market Agent

### Test 3: Market Analysis
- [ ] TAM/SAM/SOM estimated
- [ ] Top-down + bottom-up provided
- [ ] **Confidence & Evidence section present**
- [ ] Confidence level stated
- [ ] Evidence sources cited

### Test 4: Competitive Landscape
- [ ] Competitors identified
- [ ] Positioning map created
- [ ] **Confidence & Evidence section present**
- [ ] Unverified claims flagged
- [ ] Sources cited

### Test 5: Memo Generation
- [ ] All 5 sections present
- [ ] Confidence levels preserved
- [ ] No investment recommendations
- [ ] Professional formatting
- [ ] Neutral tone

### Test 6: End-to-End Pipeline
- [ ] All phases execute in sequence
- [ ] No interruptions/errors
- [ ] Data flows between agents
- [ ] Final memo complete
- [ ] < 5 minutes total time

## Troubleshooting Quick Tips

| Issue | Fix |
|-------|-----|
| Agent routing fails | Check BeginDialog agent names (case-sensitive) |
| Missing confidence section | Verify agent published, not draft |
| Data lost between agents | Check variable assignments in orchestrator |
| Timeout/slow response | Retry, check knowledge source complexity |
| Hallucinated/incoherent content | Simplify prompts, check agent instructions |

## Files Reference

- **Validation Report**: `/PHASE_4_VALIDATION_REPORT.md`
- **Testing Playbook**: `/PHASE_4_TESTING_PLAYBOOK.md`
- **This File**: `/PHASE_4_QUICK_REFERENCE.md`

## Key Agents & Files

### Deal Orchestrator
- Location: `/agents/Deal Orchestrator/`
- Key Topics: `ConversationStart.mcs.yml`, `CallMarketAgent.mcs.yml`, `CallCompetitiveAgent.mcs.yml`, `CallMemoWriter.mcs.yml`, `ValidateOutputs.mcs.yml`

### Market Analysis Agent
- Location: `/agents/Market Analysis Agent/`
- Key Topics: `AnalyzeMarket.mcs.yml`, `TAMEstimation.mcs.yml`, `ConfidenceEvidence.mcs.yml`
- Knowledge Sources: 3 (Web Search, SharePoint, Industry Reports)

### Competitive Landscape Agent
- Location: `/agents/Competitive Landscape Agent/`
- Key Topics: `direct-competitors.topic.mcs.yml`, `positioning-map.topic.mcs.yml`

### Deal Memo Writer Agent
- Location: `/agents/Deal Memo Writer Agent/`
- Key Topics: `DraftMemo.mcs.yml`, `MarketAnalysisSection.mcs.yml`, `CompetitiveLandscapeSection.mcs.yml`

## Success = All Tests PASS ✅

Once all tests pass:
1. Update SQL todos (mark as done)
2. Document results
3. Proceed to Phase 5 (Deployment)

Good luck! 🚀
