# Phase 4 - Testing Playbook

This playbook provides step-by-step instructions for executing Tests 2-6 once agents are published.

## Prerequisites Checklist
- [ ] All agents pushed to Power Platform
- [ ] All agents published in Copilot Studio UI
- [ ] Agents marked as "Published" (not "Draft")
- [ ] YAML validation complete (see PHASE_4_VALIDATION_REPORT.md)

---

## Test Execution Guide

### Test 2: Intake & Triage Flow

**Objective**: Validate that the Deal Orchestrator correctly identifies deal metadata and routes to specialists.

**Setup**:
1. Use the `/chat-with-agent` skill
2. Connect to: Deal Orchestrator agent

**Test Case**: Standard VC Diligence Pass

**Input/Prompt**:
```
I'd like to coordinate a standard VC diligence pass for a Series A SaaS company. 

Company: TechFlow AI
Sector: Enterprise AI / Workflow Automation
Stage: Series A, $2M raised
Documents: Product deck (15 slides), customer case studies, technical architecture doc

Please analyze their market opportunity and competitive positioning.
```

**Expected Behavior**:
1. Orchestrator recognizes the deal intake request
2. Extracts metadata:
   - Company Name: "TechFlow AI"
   - Sector: "Enterprise AI / Workflow Automation"
   - Stage: "Series A"
   - Funding: "$2M raised"
3. Identifies documents present
4. Flags what's missing (financial projections, customer list, etc.)
5. Routes to Market Analysis Agent

**Pass Criteria**:
- [ ] All metadata fields extracted correctly
- [ ] Company name captured
- [ ] Sector identified
- [ ] Stage recognized
- [ ] Documents listed
- [ ] Agent routes to Market Analysis
- [ ] Conversation continues without interruption

**Notes**: If routing fails, check the `CallMarketAgent` topic and BeginDialog configuration.

---

### Test 3: Market Analysis Flow

**Objective**: Validate that Market Analysis Agent produces TAM/SAM/SOM estimates with proper Confidence & Evidence section.

**Setup**:
1. Use the `/chat-with-agent` skill
2. Connect to: Market Analysis Agent

**Test Case**: TAM/SAM/SOM Estimation

**Input/Prompt**:
```
Analyze the market opportunity for TechFlow AI:
- Target: Enterprise workflow automation via AI
- Primary market: Fortune 500 companies
- Secondary market: Mid-market enterprises (100-5,000 employees)
- Tertiary market: SMBs with AI adoption

Please estimate TAM, SAM, and SOM using both top-down and bottom-up approaches. 
Assess your confidence in these estimates and cite your evidence sources.
```

**Expected Behavior**:
1. Agent researches market data
2. Provides TAM estimate (e.g., $50-80B)
3. Provides SAM estimate (e.g., $8-15B)
4. Provides SOM estimate (e.g., $100-500M)
5. Includes top-down reasoning
6. Includes bottom-up reasoning
7. Provides market dynamics assessment
8. **Explicitly includes "Confidence & Evidence" section** with:
   - Confidence level (High/Medium/Low)
   - Evidence breakdown (founder sources, third-party sources, assumptions)
   - Data quality assessment

**Pass Criteria**:
- [ ] TAM estimate provided
- [ ] SAM estimate provided
- [ ] SOM estimate provided
- [ ] Top-down approach documented
- [ ] Bottom-up approach documented
- [ ] Market dynamics described
- [ ] **Confidence & Evidence section present** (CRITICAL)
- [ ] Confidence level explicitly stated
- [ ] Evidence sources cited

**Failure Modes**:
- ❌ Missing confidence level → Indicates agent not following instructions
- ❌ No "Confidence & Evidence" section → Data passing issue with orchestrator
- ❌ Estimates seem arbitrary → Check web search capability

---

### Test 4: Competitive Landscape Flow

**Objective**: Validate that Competitive Analysis Agent identifies competitors and produces positioning map with Confidence & Evidence.

**Setup**:
1. Use the `/chat-with-agent` skill
2. Connect to: Competitive Landscape Agent

**Test Case**: Competitive Analysis

**Input/Prompt**:
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

**Expected Behavior**:
1. Agent researches competitors
2. Identifies direct competitors with market positions
3. Identifies substitutes and alternatives
4. Creates positioning map (dimensions, players, gaps)
5. Assesses differentiation for TechFlow AI
6. **Explicitly includes "Confidence & Evidence" section** with:
   - Confidence level (High/Medium/Low)
   - Unverified claims labeled
   - Evidence sources (company websites, press releases, analyst reports)
   - Data gaps noted

**Pass Criteria**:
- [ ] Direct competitors listed (min 3-4)
- [ ] Substitutes identified
- [ ] Positioning dimensions clear
- [ ] Market map created
- [ ] Differentiation assessed
- [ ] **Confidence & Evidence section present** (CRITICAL)
- [ ] Unverified claims flagged
- [ ] Sources properly cited

**Failure Modes**:
- ❌ Missing confidence section → Data passing issue
- ❌ Claims without citations → Agent not following guidelines
- ❌ Outdated competitor info → Check web search recency

---

### Test 5: Memo Generation

**Objective**: Validate that Deal Memo Writer synthesizes market and competitive analyses into professional memo.

**Setup**:
1. Use the `/chat-with-agent` skill
2. Connect to: Deal Memo Writer Agent

**Test Case**: IC-Style Deal Memo

**Inputs** (from Tests 3 & 4):
- Market Analysis output (TAM/SAM/SOM + Confidence & Evidence)
- Competitive Analysis output (Positioning + Confidence & Evidence)

**Input/Prompt**:
```
Please draft a professional IC-style memo based on these specialist analyses:

[MARKET ANALYSIS OUTPUT FROM TEST 3]

[COMPETITIVE ANALYSIS OUTPUT FROM TEST 4]

Format as a 5-section memo:
1. Company Overview (TechFlow AI - Series A, $2M raised)
2. Market Analysis (with confidence levels from above)
3. Competitive Landscape (with confidence levels from above)
4. Key Risks & Uncertainties
5. Open Questions for Management

Important: Do NOT add investment recommendations. Maintain neutral analytical tone.
Preserve all confidence levels and evidence gaps from the specialist analyses.
```

**Expected Behavior**:
1. Memo generated in 5 sections
2. Company section: Overview of TechFlow AI
3. Market section: TAM/SAM/SOM with confidence levels preserved
4. Competitive section: Positioning with confidence levels preserved
5. Risks section: Market risks, competitive risks, execution risks
6. Questions section: Open items for management clarification
7. Professional formatting maintained
8. Neutral tone (no recommendations)

**Pass Criteria**:
- [ ] All 5 sections present
- [ ] Confidence levels preserved from specialists
- [ ] No investment recommendations included
- [ ] Neutral tone maintained
- [ ] Professional formatting
- [ ] Evidence gaps flagged
- [ ] Coherent narrative flow

**Failure Modes**:
- ❌ Missing sections → Check DraftMemo topic
- ❌ Confidence levels lost → Data passing issue
- ❌ Investment recommendation included → Instructions not followed
- ❌ Incoherent/hallucinated content → Check input formatting

---

### Test 6: End-to-End Pipeline

**Objective**: Validate complete flow from intake through memo generation without intervention.

**Setup**:
1. Use the `/chat-with-agent` skill
2. Connect to: Deal Orchestrator agent
3. Start fresh conversation

**Test Case**: Complete Deal Analysis Pipeline

**Input/Prompt**:
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

**Expected Behavior**:

**Phase 1: Intake (ConversationStart + IntakeIdentify)**
- Orchestrator acknowledges deal
- Extracts metadata
- Identifies stage, sector, funding
- Notes documents and gaps

**Phase 2: Market Analysis (CallMarketAgent)**
- Market Agent receives company context
- Researches market opportunity
- Provides TAM/SAM/SOM estimates
- Includes Confidence & Evidence section
- Returns to orchestrator

**Phase 3: Competitive Analysis (CallCompetitiveAgent)**
- Competitive Agent receives company context
- Researches competitor landscape
- Provides positioning map
- Includes Confidence & Evidence section
- Returns to orchestrator

**Phase 4: Validation (ValidateOutputs)**
- Orchestrator validates both outputs present
- Confirms Confidence & Evidence sections present
- Checks confidence levels
- Routes to memo writer

**Phase 5: Memo Generation (CallMemoWriter)**
- Memo Writer receives both analyses
- Synthesizes into 5-section memo
- Preserves confidence levels
- Generates professional output

**Phase 6: Completion (EndofConversation)**
- Orchestrator presents final memo
- Offers next steps

**Pass Criteria**:
- [ ] All 6 phases execute in sequence
- [ ] No interruptions or errors
- [ ] Data flows correctly between agents
- [ ] Confidence & Evidence preserved throughout
- [ ] Final memo is professional and complete
- [ ] Complete execution time < 5 minutes

**Failure Modes**:
- ❌ Agent routing fails → Check BeginDialog references
- ❌ Data lost in transition → Check variable assignments
- ❌ Confidence sections missing → Check ValidateOutputs logic
- ❌ Timeout errors → Check agent response times

---

## Troubleshooting Guide

### Issue: Agent routing fails
**Symptoms**: User message doesn't trigger expected agent, stays in orchestrator
**Diagnosis**:
1. Check BeginDialog action IDs in CallMarketAgent, CallCompetitiveAgent, CallMemoWriter
2. Verify agent names match exactly (case-sensitive)
3. Check triggerQueries in topic intents

**Fix**: Re-validate BeginDialog references in orchestrator topics

---

### Issue: Confidence & Evidence section missing
**Symptoms**: Agent output lacks confidence level and evidence breakdown
**Diagnosis**:
1. Agent may not have received instruction set
2. Agent may be using old cached response
3. Knowledge sources may not be configured

**Fix**:
1. Verify agent instructions include "Confidence & Evidence section" requirement
2. Publish agent to clear cache
3. Check knowledge sources are enabled

---

### Issue: Data loss between agents
**Symptoms**: Market findings not available to competitive agent, or both not available to memo writer
**Diagnosis**:
1. Check variable assignments in CallMarketAgent output handling
2. Check variable assignments in CallCompetitiveAgent output handling
3. Check ValidateOutputs variable storage

**Fix**: Re-validate data passing logic in orchestrator topics

---

### Issue: Timeout or slow response
**Symptoms**: Agent takes >30 seconds or times out
**Diagnosis**:
1. Web search may be slow or timeout
2. Knowledge source queries may be expensive
3. LLM may be overloaded

**Fix**:
1. Check web browsing is enabled but not required for every query
2. Simplify knowledge source queries
3. Retry after agent cache clears

---

## Test Results Template

**Test 2: Intake & Triage Flow**
- Status: [ ] PASS [ ] FAIL
- Issues: (list any failures)
- Notes: (observations)

**Test 3: Market Analysis Flow**
- Status: [ ] PASS [ ] FAIL
- Issues: (list any failures)
- Notes: (observations)

**Test 4: Competitive Landscape Flow**
- Status: [ ] PASS [ ] FAIL
- Issues: (list any failures)
- Notes: (observations)

**Test 5: Memo Generation**
- Status: [ ] PASS [ ] FAIL
- Issues: (list any failures)
- Notes: (observations)

**Test 6: End-to-End Pipeline**
- Status: [ ] PASS [ ] FAIL
- Issues: (list any failures)
- Notes: (observations)

---

## Next Steps After Testing

### If All Tests Pass ✅
1. Document test results
2. Complete Phase 4 todos
3. Proceed to Phase 5 (Deployment)

### If Any Test Fails ❌
1. Document exact failure mode
2. Collect full conversation transcript
3. Check agent settings and topic configuration
4. Use troubleshoot skill if needed
5. Fix issues and re-test
6. Repeat until all tests pass

---

## Important Notes

- **Publish Requirement**: All agents must be published before testing with `/chat-with-agent` skill
- **Fresh Conversations**: Start each test in a fresh conversation (don't chain tests)
- **Sample Data**: Use the provided test cases or adapt with your own deal data
- **Iterative**: If tests fail, fix issues incrementally and re-test
- **Documentation**: Keep test results for regression testing in future phases
