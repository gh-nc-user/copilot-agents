# Market Analysis Agent - Topic Documentation

## 📌 Overview

This agent provides comprehensive market analysis with 6 key deliverables:
1. **Market Size** - TAM/SAM/SOM estimation
2. **Top-Down Analysis** - Industry revenue based sizing
3. **Bottom-Up Analysis** - Customer count × ACV based sizing  
4. **Market Dynamics** - Growth drivers and constraints
5. **Evidence Assessment** - Founder claim validation
6. **Confidence Rating** - Evidence-based confidence scoring

## 📁 Files

### Topic Files (5 files)

| File | Purpose | Nodes |
|------|---------|-------|
| `AnalyzeMarket.mcs.yml` | Main entry point, orchestrates workflow | 15 |
| `TAMEstimation.mcs.yml` | Dual TAM/SAM/SOM estimation (top-down + bottom-up) | 14 |
| `MarketDynamics.mcs.yml` | Market growth drivers and constraints analysis | 7 |
| `EvidenceAssessment.mcs.yml` | Founder claim validation against third-party sources | 8 |
| `ConfidenceEvidence.mcs.yml` | Confidence scoring and evidence aggregation | 6 |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | This file - overview and quick start |
| `QUICK_REFERENCE.md` | Variable reference, Power Fx expressions, workflows |
| `VALIDATION_REPORT.md` | Comprehensive validation checklist and statistics |

## 🚀 Quick Start

### 1. Upload Files to Copilot Studio

Upload these 5 files to your Market Analysis Agent:
- AnalyzeMarket.mcs.yml
- TAMEstimation.mcs.yml
- MarketDynamics.mcs.yml
- EvidenceAssessment.mcs.yml
- ConfidenceEvidence.mcs.yml

### 2. Configure Knowledge Sources

Ensure your agent has knowledge sources configured that cover:
- Industry market research and TAM data
- Market trends and growth catalysts
- Competitive analysis and pricing benchmarks

### 3. Test Triggering

Users can trigger the main topic with:
- "Analyze market"
- "Estimate market size"
- "Market analysis"

## 🎯 Workflow

```
User: "Analyze market"
    ↓
AnalyzeMarket collects initial data:
  • Company/product name
  • Sector/industry
  • Market stage (early/growth/mature)
  • Market data availability
    ↓
TAMEstimation (Delivers A, B, C):
  • Top-Down: Industry size → SAM → SOM
  • Bottom-Up: Customers × ACV → SAM → SOM
  • Variance Analysis: Compares approaches
    ↓
MarketDynamics (Delivers D):
  • Collects growth drivers
  • Searches market trends
  • Analyzes constraints
    ↓
EvidenceAssessment (Delivers E):
  • Captures founder claim
  • Validates against research
  • Reports alignment
    ↓
ConfidenceEvidence (Delivers F):
  • Aggregates evidence sources
  • Scores confidence level
  • Final summary with all 6 deliverables
```

## 📊 Key Variables

### Main Topic Input
```
companyName     (Text) - Company or product name
sector          (Text) - Industry/sector
stage           (Text) - Market stage
marketDataProvided (Boolean) - Has user provided data?
```

### Sub-Topic Variables
```
TAMEstimation:
  industrySize, reachablePercent, captureRate, 
  targetCustomers, acv, tamVariance

MarketDynamics:
  growthDrivers, constraints

EvidenceAssessment:
  founderClaim, evidenceAlignment

ConfidenceEvidence:
  evidenceSources, confidenceLevel, missingData
```

## 💡 Power Fx Features

### TAM Variance Detection
```
=Abs((industrySize - (targetCustomers * acv)) / industrySize) > 0.3
```
Detects if approaches differ by >30% and flags for review.

### Confidence Scoring
```
=If(evidenceSources >= 3, "High", If(evidenceSources = 2, "Medium", "Low"))
```
Automatically scores confidence based on evidence sources.

### Dynamic Queries
All SearchAndSummarizeContent queries dynamically reference variables:
```
=concatenate("Search for ", Topic.sector, " industry market size...")
```

## ✅ Validation Status

- ✅ All 50 node IDs unique
- ✅ All Power Fx expressions valid
- ✅ All variable scopes correct (Topic.)
- ✅ All dialog references valid
- ✅ YAML syntax validated
- ✅ Schema compliance verified

## 🔍 Testing Checklist

- [ ] Main topic triggers on "Analyze market"
- [ ] Initial questions collect all 4 variables
- [ ] TAMEstimation calculates both approaches
- [ ] Variance detection triggers for high differences
- [ ] MarketDynamics captures drivers and constraints
- [ ] EvidenceAssessment validates founder claims
- [ ] ConfidenceEvidence scores confidence correctly
- [ ] Final summary lists all 6 deliverables
- [ ] Knowledge sources integrate properly
- [ ] Conversation flows smoothly end-to-end

## 📝 Customization

### Adding More Evidence Sources
In ConfidenceEvidence.mcs.yml, update:
```yaml
SetVariable: evidenceSources = 4  (or higher)
```

### Adjusting Variance Threshold
In TAMEstimation.mcs.yml, change:
```yaml
value: "=Abs(...) > 0.3"  # Change 0.3 to different threshold
```

### Modifying Confidence Thresholds
In ConfidenceEvidence.mcs.yml, update:
```yaml
value: "=If(Topic.evidenceSources >= 3, "High", ...)"  # Change >= 3
```

## 🤝 Support

For issues or questions:
1. Check VALIDATION_REPORT.md for detailed schema validation
2. Review QUICK_REFERENCE.md for variable and expression reference
3. Consult individual topic files for implementation details

## 📄 Files

```
Market Analysis Agent/
├── topics/
│   ├── AnalyzeMarket.mcs.yml
│   ├── TAMEstimation.mcs.yml
│   ├── MarketDynamics.mcs.yml
│   ├── EvidenceAssessment.mcs.yml
│   └── ConfidenceEvidence.mcs.yml
├── README.md (this file)
├── QUICK_REFERENCE.md
└── VALIDATION_REPORT.md
```

## 🎓 Learning Resources

- **TopicId**: Matches filename for easy identification
- **OnRecognizedIntent**: Main topic uses user phrases
- **OnDialogCall**: Sub-topics called from parent
- **SearchAndSummarizeContent**: Queries knowledge sources
- **Power Fx**: Dynamic calculations and conditionals
- **BeginDialog**: Navigation between topics
- **Variables**: Topic-scoped (Topic.variableName)

---

**Status**: Ready for deployment ✅  
**Updated**: 2024-03-14  
**Schema**: Copilot Studio YAML (validated)
