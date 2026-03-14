# Market Analysis Agent - Quick Reference

## Topic Files Created ✅

| # | Filename | TopicId | Type | Nodes | Trigger |
|----|----------|---------|------|-------|---------|
| 1 | AnalyzeMarket.mcs.yml | AnalyzeMarket | Main | 15 | OnRecognizedIntent |
| 2 | TAMEstimation.mcs.yml | TAMEstimation | Sub | 14 | OnDialogCall |
| 3 | MarketDynamics.mcs.yml | MarketDynamics | Sub | 7 | OnDialogCall |
| 4 | EvidenceAssessment.mcs.yml | EvidenceAssessment | Sub | 8 | OnDialogCall |
| 5 | ConfidenceEvidence.mcs.yml | ConfidenceEvidence | Sub | 6 | OnDialogCall |

## Workflow Architecture

```
┌─────────────────────────┐
│  AnalyzeMarket (Main)   │
│  OnRecognizedIntent     │
│  Trigger: "Analyze      │
│   market" etc.          │
└────────────┬────────────┘
             │
     ┌───────┴────────┬───────────┬──────────────┐
     │                │           │              │
     ▼                ▼           ▼              ▼
┌─────────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐
│TAMEstimation│ │Dynamics  │ │Evidence  │ │ Confidence  │
│OnDialogCall │ │OnDialogCall│Assessment│ │OnDialogCall │
│             │ │OnDialogCall│OnDialogCall        │
│ Top-Down    │ │ Growth   │ │ Claim    │ │ Confidence  │
│ Bottom-Up   │ │ Drivers  │ │ Validation      │ Level   │
│ Variance    │ │Constraints  Supported│ │     by      │
│             │ │             Research│ │ Evidence    │
└─────────────┘ └──────────┘ └──────────┘ └─────────────┘
```

## Main Topic Variables

| Variable | Type | Purpose |
|----------|------|---------|
| companyName | Text | Company/product being analyzed |
| sector | Text | Industry/sector |
| stage | Text | Market stage (early/growth/mature) |
| marketDataProvided | Boolean | Whether user has market data |

## Sub-Topic Variables

### TAMEstimation
- `industrySize` (Number) - Total market revenue
- `reachablePercent` (Number) - Addressable market %
- `captureRate` (Number) - Obtainable market %
- `targetCustomers` (Number) - Customer count in market
- `acv` (Number) - Average Contract Value
- `tamVariance` (Text) - Variance assessment result

### MarketDynamics
- `growthDrivers` (Text) - Primary growth drivers
- `constraints` (Text) - Market constraints

### EvidenceAssessment
- `founderClaim` (Text) - Founder claim to validate
- `evidenceAlignment` (Text) - Validation status

### ConfidenceEvidence
- `evidenceSources` (Number) - Number of evidence sources
- `confidenceLevel` (Text) - High/Medium/Low
- `missingData` (Text) - Optional missing data notes

## Key Power Fx Expressions

### TAMEstimation - Top-Down Results
```
=concatenate(
  "### Top-Down Results\nTAM: $", Text(Topic.industrySize),
  " × 1.0 = $", Text(Topic.industrySize),
  "\nSAM: $", Text(Topic.industrySize),
  " × ", Text(Topic.reachablePercent),
  "% = $", Text(Topic.industrySize * Topic.reachablePercent / 100),
  "\nSOM: $", Text(Topic.industrySize),
  " × ", Text(Topic.captureRate),
  "% = $", Text(Topic.industrySize * Topic.captureRate / 100)
)
```

### TAMEstimation - Variance Check
```
=Abs((Topic.industrySize - (Topic.targetCustomers * Topic.acv)) / Topic.industrySize) > 0.3
```

### ConfidenceEvidence - Confidence Level
```
=If(Topic.evidenceSources >= 3, "High", If(Topic.evidenceSources = 2, "Medium", "Low"))
```

## Search Queries

### TAMEstimation Industry Search
```
=concatenate("Search for ", Topic.sector, 
  " industry market size, total addressable market, 
   and growth rates from analyst reports and market research")
```

### MarketDynamics Trends Search
```
=concatenate("Search for market trends in ", Topic.sector, 
  " industry including technology adoption acceleration, 
   regulatory changes, competitive landscape shifts, 
   and growth catalysts")
```

### EvidenceAssessment Validation Search
```
=concatenate("Search for analyst reports, market research, 
  and third-party validation on ", Topic.sector, 
  " market size, pricing benchmarks, and competitive landscape 
   to validate: ", Topic.founderClaim)
```

## 6 Deliverables Provided

| Letter | Deliverable | Topic |
|--------|-------------|-------|
| A | Market Size | TAMEstimation |
| B | Top-Down TAM/SAM/SOM | TAMEstimation |
| C | Bottom-Up TAM/SAM/SOM | TAMEstimation |
| D | Market Dynamics | MarketDynamics |
| E | Evidence Assessment | EvidenceAssessment |
| F | Confidence & Evidence Rating | ConfidenceEvidence |

## How to Test

1. **Trigger Main Topic**:
   - User says: "Analyze market"
   - User says: "Estimate market size"
   - User says: "Market analysis"

2. **Follow Dialog Flow**:
   - Agent asks for companyName
   - Agent asks for sector
   - Agent asks for stage
   - Agent asks if market data available
   - Agent navigates to TAMEstimation → MarketDynamics → EvidenceAssessment → ConfidenceEvidence

3. **Verify Calculations**:
   - Check TAM variance calculation matches expectations
   - Verify confidence level set correctly (High if 3+ sources)
   - Confirm all 6 deliverables mentioned in final summary

## Deployment Steps

1. ✅ Files created in `/agents/Market Analysis Agent/topics/`
2. Upload all 5 .mcs.yml files to Copilot Studio
3. Configure knowledge sources (if not already done)
4. Test triggering with sample queries
5. Publish agent

## Notes

- All variable references use `Topic.` prefix
- All Power Fx expressions start with `=`
- SearchAndSummarizeContent automatically connects to configured knowledge sources
- No agent name hardcoding - portable across environments
- Confidence scoring uses aggregated evidence sources

---
**Last Updated**: 2024-03-14
**Status**: Ready for deployment ✅
