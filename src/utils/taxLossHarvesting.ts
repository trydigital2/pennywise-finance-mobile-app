/**
 * Tax-Loss Harvesting & Capital Gains Tax Optimizer Engine
 * Analyzes realized capital gains against unrealized losses
 * to calculate tax offset savings in sub-paise integer precision.
 */

export interface TaxHarvestingSummary {
  realizedShortTermGainsPaise: number;
  realizedLongTermGainsPaise: number;
  unrealizedLossesAvailablePaise: number;
  harvestableLossesPaise: number;
  estimatedTaxSavedPaise: number;
  netTaxLiabilityAfterHarvestPaise: number;
  recommendation: string;
}

export function calculateTaxHarvesting(
  realizedSTCGPaise: number,
  realizedLTCGPaise: number,
  unrealizedLossesPaise: number,
  stcgTaxRate: number = 0.20, // 20% STCG
  ltcgTaxRate: number = 0.125 // 12.5% LTCG above ₹1.25L exemption
): TaxHarvestingSummary {
  const safeSTCG = Math.max(0, realizedSTCGPaise);
  const safeLTCG = Math.max(0, realizedLTCGPaise);
  const safeLosses = Math.max(0, unrealizedLossesPaise);

  const initialTaxSTCG = safeSTCG * stcgTaxRate;
  const initialTaxLTCG = safeLTCG * ltcgTaxRate;
  const initialTaxLiability = initialTaxSTCG + initialTaxLTCG;

  // Offset priority: First offset STCG (higher tax rate), then LTCG
  const stcgOffset = Math.min(safeSTCG, safeLosses);
  const remainingLosses = safeLosses - stcgOffset;
  const ltcgOffset = Math.min(safeLTCG, remainingLosses);
  const harvestableLossesPaise = stcgOffset + ltcgOffset;

  const taxSavedSTCG = stcgOffset * stcgTaxRate;
  const taxSavedLTCG = ltcgOffset * ltcgTaxRate;
  const estimatedTaxSavedPaise = Math.round(taxSavedSTCG + taxSavedLTCG);

  const netTaxLiabilityAfterHarvestPaise = Math.round(
    Math.max(0, initialTaxLiability - estimatedTaxSavedPaise)
  );

  let recommendation = '';
  if (estimatedTaxSavedPaise > 0) {
    recommendation =
      'Tax harvest opportunity identified. Liquidating selected underperforming assets can directly reduce your tax bill.';
  } else {
    recommendation =
      'No immediate harvesting required. No net capital gains tax liability exists for the current assessment period.';
  }

  return {
    realizedShortTermGainsPaise: safeSTCG,
    realizedLongTermGainsPaise: safeLTCG,
    unrealizedLossesAvailablePaise: safeLosses,
    harvestableLossesPaise,
    estimatedTaxSavedPaise,
    netTaxLiabilityAfterHarvestPaise,
    recommendation,
  };
}
