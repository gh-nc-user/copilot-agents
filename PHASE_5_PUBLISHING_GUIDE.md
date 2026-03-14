# Phase 5: Publishing Agents to Power Platform & Teams

Complete guide to push, publish, test, and document your Copilot Studio agents.

---

## 📋 Phase 5 Tasks Overview

| Task | Status | Estimated Time |
|------|--------|-----------------|
| 1. Push to Power Platform (Draft) | ⏳ Manual | 5-10 min |
| 2. Publish to Live | ⏳ Manual | 5 min |
| 3. Test in Teams | ⏳ Manual | 10-15 min |
| 4. Create End-User Runbook | ✅ Auto | Generated |

---

## ✅ Pre-Publishing Checklist

Before starting, verify all 4 agents are configured:

- [x] **Deal Orchestrator** (`agents/Deal Orchestrator/agent.mcs.yml`) - 1.2K
- [x] **Market Analysis Agent** (`agents/Market Analysis Agent/agent.mcs.yml`) - 2.0K
- [x] **Competitive Landscape Agent** (`agents/Competitive Landscape Agent/agent.mcs.yml`) - 988B
- [x] **Deal Memo Writer Agent** (`agents/Deal Memo Writer Agent/agent.mcs.yml`) - 965B

All agents are ready for publishing ✅

---

## 🚀 Step 1: Push Agents to Power Platform (Draft)

### Prerequisites
- VS Code installed
- **Copilot Studio Extension** installed (`microsoft.copilot-studio`)
- Azure subscription with Power Platform access
- Authenticated to your Power Platform environment

### Instructions

#### Option A: Using VS Code Copilot Studio Extension (Recommended)

1. **Open VS Code**
   ```
   cd /home/adamwilliamson/dev/copilot-agents
   code .
   ```

2. **Install Copilot Studio Extension** (if not already installed)
   - Open VS Code Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
   - Search for "Copilot Studio"
   - Install the official **Copilot Studio** extension by Microsoft

3. **Authenticate**
   - Open the Copilot Studio sidebar panel
   - Click "Sign In"
   - Authenticate with your Azure/Microsoft 365 account
   - Select your Power Platform environment

4. **Push First Agent: Deal Orchestrator**
   - In VS Code file explorer, navigate to `agents/Deal Orchestrator/`
   - Right-click `agent.mcs.yml`
   - Select **"Publish to Copilot Studio"** (or use Command Palette: `Copilot Studio: Publish Agent`)
   - Confirm the environment
   - Wait for confirmation: "Agent published successfully"
   - ⏳ Agent appears in **Draft** status in Copilot Studio

5. **Repeat for Remaining Agents**
   - `agents/Market Analysis Agent/agent.mcs.yml`
   - `agents/Competitive Landscape Agent/agent.mcs.yml`
   - `agents/Deal Memo Writer Agent/agent.mcs.yml`

   For each:
   - Right-click `agent.mcs.yml`
   - Select "Publish to Copilot Studio"
   - Confirm
   - Wait for success message

#### Option B: Using Copilot Studio Web Portal (Alternative)

If VS Code extension doesn't work:

1. Go to [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com)
2. Sign in with your Microsoft 365 account
3. Click "+ New Agent"
4. Select "Upload YAML"
5. Upload each `agent.mcs.yml` file from:
   - `agents/Deal Orchestrator/agent.mcs.yml`
   - `agents/Market Analysis Agent/agent.mcs.yml`
   - `agents/Competitive Landscape Agent/agent.mcs.yml`
   - `agents/Deal Memo Writer Agent/agent.mcs.yml`

### ✅ Success Criteria (Step 1)

In [Copilot Studio Portal](https://copilotstudio.microsoft.com):

- [ ] "Deal Orchestrator" appears in agents list
- [ ] "Market Analysis Agent" appears in agents list
- [ ] "Competitive Landscape Agent" appears in agents list
- [ ] "Deal Memo Writer Agent" appears in agents list
- [ ] All 4 agents show **"Draft"** status (gray icon)
- [ ] All agents show creation timestamp

**Status**: When all checks pass → ✅ **p5-push-to-platform COMPLETE**

---

## 📢 Step 2: Publish Agents to Live

### Prerequisites
- All 4 agents created and in Draft status (completed Step 1)
- Copilot Studio Portal access

### Instructions

1. **Go to Copilot Studio Portal**
   - Navigate to [https://copilotstudio.microsoft.com](https://copilotstudio.microsoft.com)
   - Sign in with your Microsoft 365 account

2. **Publish Agent #1: Deal Orchestrator (PRIMARY)**
   - Click on **"Deal Orchestrator"** in agents list
   - Click **Settings** (gear icon in top-right)
   - Click **"Publish"** button (blue/primary button)
   - Review publication summary
   - Click **"Confirm Publish"**
   - Wait for success notification: "Agent Published" ✅
   - Status changes from "Draft" → **"Published"** (blue/live icon)

3. **Publish Agent #2: Market Analysis Agent**
   - Click on **"Market Analysis Agent"** in agents list
   - Click **Settings** (gear icon in top-right)
   - Click **"Publish"** button
   - Click **"Confirm Publish"**
   - Wait for success notification ✅

4. **Publish Agent #3: Competitive Landscape Agent**
   - Click on **"Competitive Landscape Agent"** in agents list
   - Click **Settings** (gear icon in top-right)
   - Click **"Publish"** button
   - Click **"Confirm Publish"**
   - Wait for success notification ✅

5. **Publish Agent #4: Deal Memo Writer Agent**
   - Click on **"Deal Memo Writer Agent"** in agents list
   - Click **Settings** (gear icon in top-right)
   - Click **"Publish"** button
   - Click **"Confirm Publish"**
   - Wait for success notification ✅

### ✅ Success Criteria (Step 2)

In [Copilot Studio Portal](https://copilotstudio.microsoft.com):

- [ ] "Deal Orchestrator" shows **"Published"** status (live/blue icon)
- [ ] "Market Analysis Agent" shows **"Published"** status (live/blue icon)
- [ ] "Competitive Landscape Agent" shows **"Published"** status (live/blue icon)
- [ ] "Deal Memo Writer Agent" shows **"Published"** status (live/blue icon)
- [ ] Each agent displays publication timestamp
- [ ] Each agent displays "Last published by: [your name]"

**Status**: When all checks pass → ✅ **p5-publish-agents COMPLETE**

---

## 🧪 Step 3: Test Agents in Microsoft Teams

### Prerequisites
- All 4 agents published (completed Step 2)
- Microsoft Teams client installed
- Access to Teams organization where agents are published

### Instructions

#### Part A: Verify Agents Appear in Teams

1. **Open Microsoft Teams**
   - Launch Teams desktop client or go to teams.microsoft.com

2. **Navigate to Copilot**
   - Click **"Copilot"** icon in left sidebar (or search for "Copilot")
   - You should see the Copilot interface

3. **Find Agents Tab**
   - Look for **"Agents"** tab in the Copilot section
   - Click on **"Agents"** tab
   - You should see a list of available agents

4. **Verify All 4 Agents Appear**
   - [ ] "Deal Orchestrator (PM)" visible in agent list
   - [ ] "Market Analysis Agent" visible in agent list
   - [ ] "Competitive Landscape Agent" visible in agent list
   - [ ] "Deal Memo Writer Agent" visible in agent list
   - [ ] Each agent shows thumbnail/icon
   - [ ] Each agent shows description

#### Part B: Test Deal Orchestrator Workflow

1. **Start Conversation**
   - Click on **"Deal Orchestrator"** in the agents list
   - A new chat window opens with the agent

2. **Upload Sample Deal Materials** (Choose one approach)

   **Option 1: Upload a File**
   - Click attachment/upload icon
   - Select a sample deal deck (PDF, PPTX, DOCX)
   - Message: "Please analyze this deal for me"
   - Press Send

   **Option 2: Describe a Deal**
   - Send message: "I have a deal to analyze. It's a SaaS acquisition for $50M with 3-year revenue multiples of 8x. Primary market is enterprise. Key competitors are [Company A] and [Company B]."
   - Press Send

3. **Wait for Deal Intake**
   - Orchestrator should respond with deal metadata summary
   - Look for: Deal name, size, industry, key metrics
   - Expected time: 2-5 seconds

4. **Verify Specialist Routing**
   - Orchestrator calls Market Analysis Agent
   - Market agent starts analyzing market opportunity
   - Expected time: 5-10 seconds
   - Market agent calls Competitive Landscape Agent
   - Competitive agent analyzes competitive positioning
   - Expected time: 5-10 seconds

5. **Verify Final Memo Generation**
   - Deal Memo Writer Agent generates final memo
   - Memo should include 5 sections:
     - [ ] Executive Summary
     - [ ] Deal Overview & Valuation
     - [ ] Market Opportunity
     - [ ] Competitive Landscape
     - [ ] Investment Recommendation
   - Memo should include confidence levels (High/Medium/Low)
   - Memo should appear in Teams chat

6. **Test Memo Export/Save**
   - Right-click on memo message
   - Select "Copy" or take screenshot
   - Verify memo text is preserved
   - Save memo for records

#### Part C: Error Testing (Optional)

1. **Test Timeout Handling**
   - Send a complex query
   - If timeout occurs, verify error message is user-friendly
   - Verify "retry" option available

2. **Test Low Confidence**
   - Send incomplete deal info
   - Verify confidence levels show as "Low" when appropriate
   - Verify agent still provides recommendation

### ✅ Success Criteria (Step 3)

- [ ] All 4 agents visible in Teams Copilot > Agents tab
- [ ] Deal Orchestrator callable from Teams
- [ ] Deal intake extracts metadata correctly
- [ ] Specialist routing works (Market + Competitive agents called)
- [ ] Market Analysis Agent processes successfully
- [ ] Competitive Landscape Agent processes successfully
- [ ] Memo generation produces 5-section memo
- [ ] Confidence levels visible in memo (High/Medium/Low)
- [ ] No errors or timeouts during execution
- [ ] Memo can be copied/saved from Teams chat
- [ ] End-to-end time is acceptable (< 30 seconds total)

**Status**: When all checks pass → ✅ **p5-test-in-teams COMPLETE**

---

## 📖 Step 4: Create End-User Runbook (Auto-Generated)

A Teams runbook has been generated at:
📄 **`TEAMS_RUNBOOK.md`**

This document contains:
- ✅ Overview of the agent system
- ✅ How to access agents in Teams
- ✅ Step-by-step usage instructions
- ✅ What to expect at each stage
- ✅ Typical workflow diagrams
- ✅ FAQ section
- ✅ Support contacts

### Distribution

1. **Share with End-Users**
   - Post in Teams channel: `#agent-support` or similar
   - Email link to runbook URL
   - Add to organization wiki/knowledge base

2. **Customize if Needed**
   - Update support contact info
   - Add organization-specific guidance
   - Include screenshots (from your Teams client)
   - Add training video link (if available)

**Status**: ✅ **p5-document-runbook COMPLETE** (auto-generated)

---

## 🎯 Phase 5 Completion Checklist

### p5-push-to-platform
- [ ] Deal Orchestrator pushed to Power Platform (Draft)
- [ ] Market Analysis Agent pushed to Power Platform (Draft)
- [ ] Competitive Landscape Agent pushed to Power Platform (Draft)
- [ ] Deal Memo Writer Agent pushed to Power Platform (Draft)
- [ ] All 4 agents visible in Copilot Studio portal
- [ ] All 4 agents show "Draft" status

### p5-publish-agents
- [ ] Deal Orchestrator published to Live
- [ ] Market Analysis Agent published to Live
- [ ] Competitive Landscape Agent published to Live
- [ ] Deal Memo Writer Agent published to Live
- [ ] All 4 agents show "Published" status
- [ ] Publication timestamps visible for each agent

### p5-test-in-teams
- [ ] All 4 agents visible in Teams Copilot > Agents
- [ ] Deal Orchestrator callable and responsive
- [ ] Deal intake works (metadata extracted)
- [ ] Specialist routing works (both agents called)
- [ ] Memo generation produces 5-section output
- [ ] Confidence levels visible and accurate
- [ ] No errors during execution
- [ ] End-to-end workflow completes successfully

### p5-document-runbook
- [ ] TEAMS_RUNBOOK.md created
- [ ] Overview section complete
- [ ] Access instructions included
- [ ] Usage steps documented
- [ ] Typical workflow outlined
- [ ] FAQ section with key questions
- [ ] Support contact information provided
- [ ] Runbook shared with end-users

---

## ⏱️ Estimated Timeline

| Step | Task | Duration |
|------|------|----------|
| 1 | Push 4 agents to Power Platform | 5-10 min |
| 2 | Publish 4 agents to Live | 5 min |
| 3 | Test in Teams (including warm-up) | 10-15 min |
| 4 | Create runbook | ✅ Auto (0 min) |
| **Total** | **Phase 5 Complete** | **~25-30 min** |

---

## 🆘 Troubleshooting

### Issue: Agents don't appear in Teams after publishing

**Solution:**
1. Wait 5-10 minutes for Teams sync (sometimes takes time)
2. Refresh Teams (`Ctrl+Shift+R` / `Cmd+Shift+R`)
3. Check agent is truly "Published" (not "Draft")
4. Verify you're in the correct Teams organization
5. Clear Teams cache: `%appdata%\Microsoft\Teams` (Windows) or `~/Library/Application Support/Microsoft/Teams` (Mac)

### Issue: Agent times out during execution

**Solution:**
1. Check topic complexity - reduce if too many nested calls
2. Verify specialist agents are published and accessible
3. Check Power Platform capacity/quotas
4. Try with simpler deal data first
5. Check network connection stability

### Issue: Memo format is incorrect or missing sections

**Solution:**
1. Verify Deal Memo Writer Agent has all 5 sections defined
2. Check that confidence level fields are properly populated
3. Run test again - may be transient issue
4. Check agent logs in Copilot Studio portal

### Issue: Confidence levels not showing in memo

**Solution:**
1. Verify Market Analysis Agent includes confidence in output
2. Verify Competitive Landscape Agent includes confidence in output
3. Verify Deal Memo Writer Agent references these fields
4. Check variable mapping between agents

---

## 📞 Support Resources

- **Copilot Studio Documentation**: https://learn.microsoft.com/en-us/microsoft-cloud/dev/copilot/studio/
- **Copilot Studio Portal**: https://copilotstudio.microsoft.com
- **Power Platform Admin**: https://admin.powerplatform.microsoft.com
- **Teams Admin**: https://admin.teams.microsoft.com

---

## ✅ Next Steps

After Phase 5 is complete:

1. **Monitor** agent usage and performance
2. **Collect** user feedback
3. **Iterate** based on feedback (Phase 6 - future)
4. **Scale** to other teams/organizations
5. **Document** in knowledge base

---

**Phase 5 Status**: ✅ READY FOR EXECUTION

Last Updated: 2024
