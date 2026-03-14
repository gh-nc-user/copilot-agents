# Copilot Studio Multi-Agent Deal Analysis System

**Project Status**: Planning Phase  
**Last Updated**: 2026-03-14  
**Scope**: Building 4 coordinated Copilot Studio agents for VC deal analysis, deployable to Teams

---

## Executive Summary

This project develops a **multi-agent system** that replicates a VC deal analysis framework as a series of specialized Copilot Studio agents. Instead of a single "all-knowing" AI, each agent has a narrow, bias-controlled scope aligned to professional VC practice.

**End Goal**: Deploy agents to Copilot Studio and make them accessible to end-users via Teams.

---

## Project Objectives

1. **Build a disciplined analytical framework** using agents that mirror institutional VC deal analysis
2. **Decompose deal review work** across 4 specialized agents (each with bounded authority)
3. **Support human decision-making** without replacing investor judgment
4. **Deploy to Teams** for seamless access by stakeholders
5. **Maintain YAML-first development** for version control and collaboration

---

## The VC Deal Analysis Framework

All early-stage VC deal memos converge on the same analytical structure, regardless of fund strategy:

### Core Sections (Agents Analyze Against These)
1. **Company & Product** — What are they building?
2. **Problem & Customer** — Who has the problem? Is it acute?
3. **Market (TAM / Dynamics)** — How big is the addressable market? Growth trends?
4. **Competitive Landscape** — Who else is solving this? How crowded is the space?
5. **Differentiation & Moat** — Why do they win?
6. **Business Model** — How do they make money?
7. **Traction & Proof Points** — What evidence validates traction?
8. **Risks & Open Questions** — What could go wrong? What unknowns remain?

**Design Principle**: Agents analyze deal *against* this framework. They do **not** decide whether to invest.

---

## The Agent Architecture

### Agent Lineup

| Agent | Role | Primary Function | Bias Control |
|-------|------|------------------|--------------|
| **Deal Orchestrator** | Project Manager / VC PM | Decomposes deal into analytical components, routes to specialists, collects outputs verbatim | No analysis authority; routing only; no opinions |
| **Market Analysis Agent** | VC Market Analyst | Analyzes TAM/SAM/SOM, customer segments, market dynamics using industry-standard VC methodologies | Skeptical of founder claims; flags assumptions; no portfolio anchoring; no pattern-matching |
| **Competitive Landscape Agent** | Competitive Intelligence Analyst | Maps direct/adjacent/substitute competitors, positioning, market saturation; describes structure | Factual mapping only; no judgment; no success probability estimates; no investment recommendations |
| **Deal Memo Writer Agent** | Investment Memo Writer | Synthesizes outputs into professional deal analysis memo with IC-style tone | Strict synthesis only; cannot invent analysis; attributes insights to source; no investment recommendation |

### Multi-Agent Coordination Pattern

- **Parent Agent (Orchestrator)** treats each specialist as a tool with clear input/output contracts
- **Connected Agents** pattern recommended by Microsoft for domain-specialized systems
- **Parallel/Sequential Execution** (TBD during implementation)
- Each agent's decision-making authority is **explicitly bounded** by design

---

## Key Design Principles

1. **Decision Support, Not Decision Replacement**
   - Agents provide analysis; humans decide
   - Aligns with Microsoft's guidance on agentic AI

2. **Bias Control Built-In**
   - Market Agent: Explicitly skeptical, flags unsupported claims
   - Competitive Agent: Factual mapping only, no opinions
   - Memo Writer: Cannot invent; synthesis + citation only

3. **Framework Alignment**
   - Every agent's output aligns to the 8-section VC deal framework
   - Ensures institutional consistency

4. **YAML-First Development**
   - All agents stored as YAML in Git
   - Validated before push to Copilot Studio
   - Enables collaboration and version control

---

## Current State

### Existing Setup
- Copilot Studio environment created in Power Platform
- Blank template agent cloned to project directory via VS Code Copilot Studio Extension
- Repository structure initialized:
  - `/agents/Blank Agent as Template/` — template with standard topics (Greeting, Fallback, etc.)
  - `.opencode/` — Copilot Studio schema and templates
  - `.claude/skills/` — 21 specialized Copilot CLI skills available

### Technology Stack
- **Microsoft Copilot Studio** — Agent platform
- **YAML** — Agent definition format (.mcs.yml files)
- **Copilot CLI** — Development environment with specialized skills
- **VS Code Copilot Studio Extension** — Clone/push agents to Power Platform
- **Teams** — End-user deployment target

### Available Skills (Copilot CLI)
- `copilot-studio-author` — Main authoring (topics, actions, variables)
- `copilot-studio-new-topic` — Create new topics
- `copilot-studio-add-generative-answers` — Add knowledge search
- `copilot-studio-add-other-agents` — Link specialists to orchestrator
- `copilot-studio-validate` — Pre-push YAML validation
- `copilot-studio-test` — Test conversations
- `copilot-studio-edit-agent` — Configure agent settings
- `copilot-studio-troubleshoot` — Debug issues

---

## Data & Knowledge Sources (Planned)

### Planned Knowledge Sources by Agent

**Market Analysis Agent**
- Historical deal memos (SharePoint/OneDrive)
- Past investment theses from your fund
- Market research PDFs (trusted sources)
- Optional: public web grounding for broader research

**Competitive Landscape Agent**
- Your historical deal documents
- Past pitch decks (especially declined deals)
- Optional: structured "Deals Reviewed" SharePoint list
- Comparable deals database (to be defined)

**Deal Memo Writer Agent**
- Your fund's historical memo template(s)
- Reference memos (exemplars of good analysis)

---

## Industry-Standard VC Workflow & Memo Lifecycle

### The Standard Pipeline
Deal memos fit into a broader industry workflow:
**Screen → Diligence → Write Memo → Critique/Approve → Store/Learn**

### Standard Memo Contents (Industry Norm)
Across institutional VC, memos converge on core sections:
- Company Overview
- Problem & Solution
- Market (TAM, dynamics)
- Product
- Team
- Traction & Metrics
- Competition
- Financials & Terms
- Risks
- (Often includes a recommendation)

### Operational Stages (What Actually Happens Per Deal)

**Stage 1: Intake & Triage (Screening)**
- **Inputs**: Pitch deck, teaser, data room link, email thread notes
- **Output**: One-page summary + "what's missing" list
- **Purpose**: Decide whether to take a first call or pass
- **Memo Linkage**: This is "screening" in the memo lifecycle
- **Agents Used**: None (pre-agent work)

**Stage 2: First-Pass Diligence (Fast)**
- **Focus**: Market sanity check, competitor map, basic traction interpretation, obvious red flags
- **Output**: "Continue / Pause" decision based on gaps + initial memo skeleton
- **Purpose**: Decide if deal warrants deep diligence or if obvious gaps preclude investment
- **Memo Linkage**: First-pass memo skeleton (this is where your agents can add value)
- **Agents Used**: Market Agent + Competitive Landscape Agent (fast pass)

**Stage 3: Deep Diligence (Targeted)**
- **Focus**: Highest-risk unknowns (market proof, GTM motion, retention, unit economics, team references, legal)
- **Output**: Updated memo with evidence, explicit risks, mitigations, open questions
- **Purpose**: Resolve uncertainties and build conviction for IC decision
- **Memo Linkage**: Detailed memo with evidence trail per claim
- **Agents Used**: Market Agent + Competitive Landscape Agent (deeper analysis) + Deal Memo Writer

**Stage 4: IC / Decision**
- **Artifact**: Memo is the decision input (fact vs. interpretation clearly separated)
- **Output**: Investment decision (pass/continue/invest)
- **Purpose**: Structured decision-making with evidence trail
- **Memo Linkage**: Memo supports decision; good structures separate facts from interpretation
- **Agents Used**: None (human decision-making)

**Stage 5: Post-Decision Learning Loop**
- **Action**: Store memo, revisit assumptions later
- **Purpose**: Institutional memory, validate/invalidate initial assumptions, improve future analysis
- **Memo Linkage**: Memos become data for pattern recognition and bias calibration
- **Agents Used**: None (historical analysis)

### Where Your Agents Fit

Your agents are **specifically designed for Stage 2 and Stage 3** of this workflow:

- **Intake & Triage**: Pre-memo work (not agent territory)
- **First-Pass Diligence** ✅ Agents take detailed notes on market & competition
- **Deep Diligence** ✅ Agents provide evidence-backed analysis with Confidence & Evidence sections
- **IC/Decision**: Memo becomes the decision artifact (human-led)
- **Post-Decision Learning**: Memos stored for future reference (not agent territory)

### Key Insights for Agent Design

1. **Memo Structure Alignment**: Your 5-section memo (Company, Market, Competitive, Risks, Open Questions) aligns with industry norms but is scoped narrowly to what your agents produce (excludes financials, team deep-dives, terms—those come from other diligence)

2. **Evidence Trail is Critical**: Industry best practice emphasizes evidence per claim. Your Confidence & Evidence sections enforce this accountability.

3. **Two Workflows**:
   - **Fast first-pass**: Agents run quickly, output flags major risks or gaps
   - **Deep diligence**: Agents run with more time/sources, provide detailed evidence

4. **Memo as Decision Artifact**: The memo's role is to provide structured input to IC discussion, not to decide. This aligns with your agents' lack of investment recommendations.

5. **Institutional Learning**: Stored memos should later inform whether initial assumptions held. This informs future agent bias calibration.

---

## Copilot Studio Multi-Agent Orchestration & Workflow Mapping

### Orchestration Pattern (Connected Agents)

**Microsoft's Guidance**
- **Inline agents**: Small reusable workflows inside the same agent
- **Connected agents**: Separate agents with their own orchestration, tools, knowledge; parent delegates work; requires handoff, security, and auditing management
- **Recommended pattern**: Orchestrator + specialist subagents (connected agents) for separation of concerns

**Your Implementation Approach**
- Use **connected agents** pattern (each specialist is a separate agent with its own knowledge sources)
- **Design + instruction**: Define orchestration instructions NOW
- **UI wiring + operational rollout**: After specialist validation (once each agent works independently)

This staged approach aligns with Microsoft's emphasis on clear handoff criteria and governance.

---

### How Your Virtual VC Team Executes Each Workflow Stage

**Stage 1: Intake & Triage (Screening)**
- **Entry Point**: Deal Orchestrator (front door agent)
- **Trigger**: File upload + metadata (pitch deck, teaser, notes, etc.)
- **Orchestrator Actions**:
  - Read submitted documents
  - Identify company, sector, stage, available documents
  - Produce: (a) 1-page intake summary, (b) missing info list, (c) workplan for specialists
- **Specialist Calls**:
  - Market Analysis Agent: Sanity check market definition + sizing assumptions with sources
  - Competitive Landscape Agent: Competitor/substitute map with citations
- **Output**: Intake memo + decision (continue / pause)
- **Agent Role**: Orchestrator delegates, collects outputs

**Stage 2: First-Pass Diligence (Fast)**
- **Focus**: Market sanity check, competitor map, basic traction, obvious red flags
- **Market Analysis Agent Output**:
  - Market definition and category boundaries
  - TAM/SAM/SOM assumptions (at least one top-down + one bottom-up)
  - Evidence review with references (URLs, document citations)
  - Confidence & Evidence section (confidence level + sources)
- **Competitive Landscape Agent Output**:
  - Sourced competitor list
  - Positioning axes (price, deployment, target segment, GTM)
  - "Verified vs. claimed" differentiation analysis
  - Confidence & Evidence section (confidence level + sources)
- **Output**: First-pass memo skeleton + risk/gap summary
- **Agent Role**: Specialists provide deep analysis; memo writer synthesizes

**Stage 3: Deep Diligence (Targeted)**
- **Focus**: Highest-risk unknowns (market proof, GTM motion, retention, unit economics, team references, legal)
- **Current Scope**: Market + Competitive agents provide deeper evidence trails and validation
- **Future Extension** (not in initial build): Additional specialist agents for financials, team/reference checks, legal
- **Output**: Updated memo with resolved evidence and explicit mitigations
- **Note**: This demonstrates the extensibility of the connected agents pattern

**Stage 4: Memo Drafting (Decision Artifact)**
- **Trigger**: Market + Competitive agents complete their analysis
- **Deal Memo Writer Actions**:
  - Synthesize specialist outputs into standard memo structure
  - Preserve citations and confidence levels from specialists
  - Include explicit risks and open questions
  - Maintain neutral tone; no investment recommendation
- **Output**: Final IC-style memo (5 sections: Company, Market, Competitive, Risks, Open Questions)
- **Memo Becomes**: The decision artifact for IC discussion

**Stage 5: Store & Learn (Post-Decision)**
- **Current Scope**: Not included in initial agent build
- **Future Extension**: Store memo outputs to SharePoint/OneDrive via connector tools/flows
- **Purpose**: Institutional memory; validate/invalidate assumptions later; calibrate future analysis bias
- **Note**: Separate from orchestration pattern itself

---

### Current System Scope vs. Future Extensions

**In Scope (Initial Build)**
- ✅ Deal Orchestrator (routing, intake summary)
- ✅ Market Analysis Agent (TAM/SAM/SOM, evidence quality)
- ✅ Competitive Landscape Agent (competitor mapping, evidence quality)
- ✅ Deal Memo Writer (synthesis, decision artifact)
- ✅ Orchestration instructions & handoff criteria

**Out of Scope (Future Extensions)**
- ⏳ Financial/unit economics specialist agent
- ⏳ Team/reference check specialist agent
- ⏳ Legal/regulatory specialist agent
- ⏳ Memo storage to SharePoint/OneDrive (connector flows)
- ⏳ Institutional learning loop (assumption validation)
- ⏳ UI wiring for connected agents (push to Teams after validation)

**Design Decision**: Plan for extensibility now (specialist agents designed to work independently), execute initial build with 4 agents, extend later.

### Orchestrator Instructions (Concrete Logic - Design Level)

**Purpose**: Define clear handoff criteria and data passing rules (per Microsoft's guidance on connected agents governance)

**Intake Phase**
1. List all files provided (deck, financial model, data room links, notes, etc.)
2. Identify document types (pitch deck = "deck", financial model = "model", data room = "dataroom", etc.)
3. Extract metadata: company name, sector/industry, stage (if stated), funding size (if stated)
4. Note what's missing vs. expected (later becomes "open questions")

**Agent Invocation Decision**
- **Always invoke**: Market Analysis Agent, Competitive Landscape Agent
- **Conditionally invoke** (future): Financial agent (if financial model provided), Legal agent (if cap table / incorporation docs provided), Team agent (if reference check data available)
- **Routing rule**: If insufficient data for a conditional agent, skip it; note in open questions

**Context Passing to Each Specialist**
- **To Market Analysis Agent**: Company name, sector, stage, deck links, any financial data, market-relevant documents
- **To Competitive Landscape Agent**: Company name, sector, product description, deck links, any competitive positioning materials

**Required Specialist Outputs** (orchestrator must validate these exist before proceeding)
- ✅ Findings (substantive analysis per deliverable sections)
- ✅ References (URLs, document citations, or explicit "not found")
- ✅ Confidence & Evidence section (Confidence Level + Evidence breakdown)

**If specialist output is incomplete**: Request completion before proceeding to memo writer

**Memo Writer Invocation**
- Pass ALL specialist outputs verbatim (no summarization or editing by orchestrator)
- Include: Company name, sector, stage, intake summary, specialist findings + confidence levels
- Instruction: Preserve confidence levels, citations, and evidence gaps in final memo

**Orchestrator Return**
- Final memo (5 sections: Company, Market, Competitive, Risks, Open Questions)
- Open diligence checklist (items flagged as missing or low-confidence)
- Next steps recommendation (e.g., "Continue to deep diligence" or "Pause pending market validation")

**Data Passing Governance**
- No data loss or reinterpretation by orchestrator (pass-through integrity)
- Explicit attribution maintained (who said what)
- Confidence levels and evidence gaps NOT suppressed or summarized
- If information contradicts between sources, note the contradiction in open questions (don't resolve it)

**Error Handling**
- If specialist returns incomplete output: Request completion with explanation of gaps
- If specialist cannot find evidence: Explicitly state "not found" rather than guessing
- If multiple specialists have conflicting findings: Present both perspectives in memo; note the discrepancy

---

## Detailed Agent Specifications

### 1. Deal Orchestrator Agent (Project Manager)

**Role Statement**  
You are a venture deal review project manager. You do not perform analysis. Your responsibility is to break a deal review into standard analytical components and delegate them to specialist agents.

**Process Flow (Exact Sequence)**
1. Identify: company name (if available), sector, stage, and documents provided
2. Delegate market work to the Market Analysis Agent
3. Delegate competitive work to the Competitive Landscape Agent
4. Ensure each specialist includes a Confidence & Evidence section
5. Pass all outputs to the Deal Memo Writer Agent **without modification**

**Operational Rules**
- Do not evaluate investment quality
- Do not add opinions or new facts
- Do not summarize specialist findings yourself
- Do not modify specialist outputs before passing to memo writer
- Ensure missing data is recorded as open questions
- Ensure both specialists deliver Confidence & Evidence sections (do not proceed without them)

**Conversation Starters (Teams UX)**
- "Coordinate a standard VC diligence pass"
- "Run market and competitive analysis and produce a memo"
- "Manage an initial IC-style review"

**Capabilities**
- OneDriveAndSharePoint (deal document intake)

**Grounding Principles (Anti-Bias)**
- No analysis authority; routing only
- Enforces specialist Confidence & Evidence sections (ensures bias controls propagate)
- Pass-through integrity prevents information loss or reinterpretation
- Prevents "lossy summarization" by insisting on unmodified outputs

**Why This Design**
- Matches Microsoft's parent/connected agent orchestration model
- Enforces bias controls (Confidence & Evidence) at orchestrator level
- Prevents hidden bias from creeping in via selective routing or summarization
- Ensures systematic coverage of all deal dimensions
- Pass-through integrity protects specialist autonomy and findings
- "Without modification" rule prevents orchestrator bias injection

---

### 2. Market Analysis Agent (Industry-Standard VC Methodologies)

**Role Statement**  
You are a venture capital market analyst. Use industry-standard VC practices to analyze market sizing, segmentation, and dynamics. You assess markets rigorously and flag unsupported claims.

**Deliverables (Structured Output)**
- **A) Target Customer & Use Case**: Who buys, who uses, and why now
- **B) Market Definition**: Define category boundaries; note adjacent markets
- **C) TAM / SAM / SOM**: Include at least one top-down and one bottom-up approach when possible; explicitly list assumptions
- **D) Market Dynamics**: Growth drivers, constraints, regulation, adoption friction
- **E) Evidence Quality**: What is supported vs. asserted
- **F) Open Questions**: What data is needed to validate market claims

**Mandatory Closing Section: Confidence & Evidence**
- **Confidence Level**: High | Medium | Low (explicit self-assessment)
- **Evidence Used**:
  - Founder-provided claims (cite slide/page if known)
  - Third-party sources (list URLs or publications)
  - Assumptions made due to missing data

**Operational Rules**
- Be skeptical of founder-provided market numbers; treat them as hypotheses
- Explicitly list assumptions and their strength
- Do not recommend investing or rejecting
- Do not use the user's historical deals as reference (no portfolio anchoring)
- Do not engage in pattern-matching to past successes
- If data is insufficient, state so clearly
- Cite uncertainty when data is weak or contradictory
- Distinguish between addressable market (TAM), accessible market (SAM), and serviceable obtainable market (SOM)

**Conversation Starters (Teams UX)**
- "Estimate TAM, SAM, and SOM and assess evidence quality"
- "Analyze market dynamics and customer segmentation"
- "Evaluate whether market claims are supported by data"

**Capabilities**
- OneDriveAndSharePoint (document access)
- WebSearch (external market research)

**Grounding Principles (Anti-Bias)**
- Use neutral, industry-standard TAM frameworks (top-down vs. bottom-up)
- No reference to portfolio history or past deal success patterns
- No intuitive leaps; require evidence for market size claims
- Flag where founder claims differ from third-party sources
- Evidence audit trail (URLs, publications, cited pages) creates accountability
- Confidence self-assessment prevents false certainty

**Why This Design**
- Aligns with Microsoft's guidance on specialized, instruction-driven agents
- Explicit skepticism prevents founder-optimism bias from propagating
- Standard frameworks ensure institutional consistency
- Deliverables structure prevents vague analysis
- WebSearch capability enables grounding in external data
- Confidence & Evidence section forces accountability and transparency
- Separates founder claims from third-party sources (prevents conflation)

---

### 3. Competitive Landscape Agent (Mapping, Not Judgment)

**Role Statement**  
You are a competitive intelligence analyst for early-stage technology companies. Your job is to map the competitive landscape accurately and objectively, without judgment.

**Deliverables (Structured Output)**
- **A) Direct Competitors**: Companies solving the same problem for the same customer
- **B) Alternatives & Substitutes**: Including incumbents and non-obvious solutions
- **C) Positioning Dimensions**: Price, target customer, deployment, GTM
- **D) Differentiation Claims**: Clearly separate claims vs. verified facts
- **E) Category Structure**: Fragmented vs. concentrated, switching costs
- **F) Open Questions**: What needs validation

**Mandatory Closing Section: Confidence & Evidence**
- **Confidence Level**: High | Medium | Low (explicit self-assessment)
- **Evidence Used**:
  - Founder-provided materials
  - Third-party sources (URLs, analyst reports, public websites)
  - Assumptions made due to incomplete information

**Operational Rules**
- Do NOT rank companies or declare winners
- Do NOT estimate probability of success
- Do NOT recommend investing or rejecting
- Label unverified claims explicitly as such
- Focus on market structure and competitive positioning, not opinion
- Distinguish between direct competition, adjacent solutions, and substitutes
- Note barriers to entry if evident

**Conversation Starters (Teams UX)**
- "Identify competitors and substitutes and assess evidence quality"
- "Map positioning and differentiation claims"
- "Assess category crowding and structural risks"

**Capabilities**
- OneDriveAndSharePoint (document access)
- WebSearch (competitor research)

**Grounding Principles (Anti-Bias)**
- Factual mapping only: who exists, where they compete, how they position
- No "favorability" scores or implicit ranking
- No discussion of founder quality or execution likelihood
- Competitive overconfidence is a major source of bias; constrain it explicitly
- Unverified claims are explicitly labeled as such
- Evidence audit trail (URLs, reports, websites) creates accountability
- Confidence self-assessment prevents false certainty

**Why This Design**
- Matches Microsoft's recommendation for domain-isolated connected agents
- Most VC bias enters through competitive overconfidence or dismissal
- Strict mapping prevents judgment creep
- Deliverables structure prevents vague analysis
- WebSearch capability enables comprehensive competitor research
- Unverified claim labeling prevents hallucination
- Confidence & Evidence section forces accountability and transparency
- Separates founder materials from third-party sources (prevents conflation)

---

### 4. Deal Memo Writer Agent (Strict Synthesis)

**Role Statement**  
You are a professional venture deal memo writer. Your job is to synthesize analysis from specialist agents into a professional, neutral deal analysis memo. You never invent analysis.

**Deliverables (Exact Memo Structure)**
1. **Company Overview**: What it does, who it serves, business model, stage (if known)
2. **Market Analysis**: Summarize Market Analysis Agent output, **including its Confidence & Evidence section**
3. **Competitive Landscape**: Summarize Competitive Landscape Agent output, **including its Confidence & Evidence section**
4. **Key Risks**: Only if supported by inputs
5. **Open Questions & Next Diligence Steps**: Explicit questions and what evidence would answer them

**Operational Rules**
- Use ONLY information provided by the user and specialist agents
- Do NOT invent data, competitors, customers, or conclusions
- Do NOT provide an investment recommendation
- Attribute major points to the source agent
- Preserve stated confidence levels and evidence gaps
- Maintain neutral, professional tone throughout
- No investment recommendation or conclusion

**Conversation Starters (Teams UX)**
- "Draft an IC-style memo from the specialist analyses"
- "Create a neutral deal memo with confidence annotations"
- "Summarize diligence findings and open questions"

**Capabilities**
- OneDriveAndSharePoint (document access for reference)

**Grounding Principles (Anti-Bias)**
- Strict synthesis: agent outputs → memo (no lossy summarization)
- Attribution enforces accountability for each claim
- Preserving Confidence & Evidence prevents false certainty from propagating
- Neutral tone prevents editorial bias from creeping into language
- Absence of recommendation prevents decision-forcing
- Evidence gaps highlighted throughout (not buried)

**Why This Design**
- Ensures decision support (not decision replacement)
- Attribution creates accountability trail
- Confidence & Evidence transparency prevents false certainty
- Preserving evidence gaps and uncertainty is as important as stating findings
- IC-style format ensures institutional credibility
- Multi-source confidence levels enable calibrated decision-making

---

## Development Phases (Draft)

### Phase 1: Foundation & Architecture
- [ ] Finalize deal intake format and routing criteria
- [ ] Define context data passing between orchestrator and specialists
- [ ] Map knowledge source locations and structure
- [ ] Plan parallel vs. sequential execution
- [ ] Validate YAML schema for all agents

### Phase 2: Agent Development
- [ ] Develop Deal Orchestrator (routing, task decomposition)
- [ ] Develop Market Analysis Agent (TAM, customer segments, skepticism)
- [ ] Develop Competitive Landscape Agent (competitor mapping, factual analysis)
- [ ] Develop Deal Memo Writer Agent (synthesis, citation)

### Phase 3: Integration & Testing
- [ ] Test orchestrator-to-specialist communication
- [ ] Test end-to-end workflows
- [ ] Validate against VC framework
- [ ] Test error handling and edge cases

### Phase 4: Publishing & Deployment
- [ ] Push agents to Power Platform (draft)
- [ ] Publish in Copilot Studio
- [ ] Deploy to Teams
- [ ] Test in Teams interface
- [ ] Document runbook

---

## Implementation Decision Points

**✅ Schema & YAML Structure (RESOLVED)**

Agent YAML files cloned via VS Code Copilot Studio Extension use **GptComponentMetadata format**, not the declarative agent JSON schema. The declarative JSON schema (v1.5) is the configuration format used in the Copilot Studio portal UI, but YAML authoring uses:

```yaml
mcs.metadata:
  componentName: Agent Name
kind: GptComponentMetadata
displayName: Agent Display Name
instructions: [role + instructions text]
gptCapabilities:
  webBrowsing: [true/false]
aISettings:
  model:
    modelNameHint: [model name]
```

**Implication**: Build agent YAML using GptComponentMetadata format; the declarative JSON specs provided are the "translation" to portal UI if needed later.

---

## Open Questions (To Be Addressed)

### Data Flow & UX
- [ ] Deal intake: File upload, text paste, or structured form?
- [ ] Routing criteria: Full taxonomy of deal types/stages/verticals?
- [ ] Parallel vs. sequential execution of specialists?
- [ ] Context structure: What data flows from orchestrator to each specialist?

### Knowledge Sources
- [ ] Where are historical deals stored? (SharePoint structure?)
- [ ] How structured is the "Deals Reviewed" list?
- [ ] What external market research sources should be included?
- [ ] What does the memo template look like?

### Teams Integration
- [ ] Who are the end users? (You only, deal partners, full team?)
- [ ] Output format in Teams: Chat display, downloadable memo, task creation?
- [ ] User roles: Different permissions for different user groups?

### Scope Boundaries
- [ ] What is explicitly OUT of scope?
- [ ] Financial modeling? Term sheet generation? (TBD)
- [ ] Risk scoring/recommendation? (TBD)

---

## Repository Structure

```
copilot-agents/
├── README.md
├── AGENTS.md                          # AI agent guidance (auto-loaded by Copilot CLI)
├── PROJECT_OVERVIEW.md                # This file (session checkpoint)
├── agents/
│   ├── Blank Agent as Template/       # Original template (will be customized/replicated)
│   │   ├── agent.mcs.yml
│   │   ├── settings.mcs.yml
│   │   └── topics/
│   ├── Deal Orchestrator/             # Parent orchestrator (TBD)
│   ├── Market Analysis Agent/         # Specialist 1 (TBD)
│   ├── Competitive Landscape Agent/   # Specialist 2 (TBD)
│   └── Deal Memo Writer Agent/        # Specialist 3 (TBD)
├── .opencode/
│   ├── opencode.json
│   ├── tools/
│   │   └── copilot-studio-schema.ts
│   └── templates/
│       └── topics/
├── .claude/
│   └── skills/                        # 21 Copilot Studio skills
└── docs/
    ├── PROJECT_CONTEXT.md
    ├── DECISION_LOG.md
    └── IMPLEMENTATION_LOG.md
```

---

## Next Steps

1. ✅ Establish VC framework and agent roles (DONE)
2. ⏳ Define data flow, routing, and knowledge sources (IN PROGRESS)
3. ⏳ Finalize implementation roadmap
4. ⏳ Begin Agent Development (Phase 2)

---

## References

- [Microsoft Copilot Studio Multi-Agent Orchestration](https://learn.microsoft.com/en-us/microsoft-copilot-studio/build-multi-agent-orchestration)
- [Connected Agents Pattern](https://learn.microsoft.com/en-us/microsoft-copilot-studio/connect-agents)
- [Copilot CLI Skills Documentation](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli)
- AGENTS.md (in repo root, auto-loaded for guidance)

---

**Document Owner**: Adam Williamson  
**Last Sync**: 2026-03-14 02:14 UTC  
**Session**: Planning Phase - Agent Architecture & Framework Definition

---

## Implementation Progress Checkpoint (March 14, 2026 - 12:34 UTC)

**Overall Status**: 68% Complete (26/38 todos)

### Phase Completion Status

| Phase | Todos | Status | Deliverables |
|-------|-------|--------|--------------|
| **1. Foundation** | 4/4 | ✅ 100% | Deal Orchestrator customized, 3 agent skeletons created |
| **2. Agent Topics** | 19/19 | ✅ 100% | 43 topics built across 4 agents, knowledge sources configured |
| **3. Integration** | 3/3 | ✅ 100% | Connected agents linked, error handling implemented |
| **4. Testing** | 0/7 | ⏳ IN PROGRESS | YAML validation, all workflow tests |
| **5. Publishing** | 0/4 | ⏳ QUEUED | Push to platform, publish, Teams testing, runbook |

### Built Artifacts Summary

**Agent Structure Created**:
- **Deal Orchestrator**: 18 topics (intake, delegation, validation, error handling)
- **Market Analysis Agent**: 5 topics (main, TAM/SAM/SOM, dynamics, evidence, confidence)
- **Competitive Landscape Agent**: 5 topics (main, direct competitors, positioning, evidence, confidence)
- **Deal Memo Writer Agent**: 15 topics (validation, memo sections, compilation, output)
- **Total**: 43 topics, 111+ nodes, 3 connected agent relationships

### Key Achievements

✅ **Multi-Agent Orchestration**: Orchestrator → Market + Competitive (parallel) → Memo Writer  
✅ **Bias Control**: Confidence & Evidence mandatory, end-to-end validation  
✅ **Pass-Through Integrity**: No summarization, outputs preserved verbatim  
✅ **Error Resilience**: Timeout detection, retries, escalation  
✅ **Evidence Transparency**: Confidence levels + audit trail in final memo  

### Current Execution

**Phase 4 Testing** (agent-9 running):
- YAML validation against schema
- Intake workflow test
- Market analysis workflow test
- Competitive analysis workflow test
- Memo generation test
- End-to-end pipeline test
- Troubleshooting and fixes

**Phase 5 Publishing** (next):
- Push to Power Platform
- Publish to live
- Teams interface testing
- End-user documentation

---
