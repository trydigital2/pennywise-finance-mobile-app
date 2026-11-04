/**
 * Systematic Investment Plan (SIP) & Wealth Compounding Projector
 * Computes compound growth, annual step-up SIP trajectories,
 * and inflation-adjusted purchasing power in sub-paise integer precision.
 */

export interface YearlyWealthSnapshot {
  year: number;
  totalInvestedPaise: number;
  estimatedReturnsPaise: number;
  totalCorpusPaise: number;
  inflationAdjustedCorpusPaise: number;
}

export interface SIPWealthProjection {
  totalInvestedPaise: number;
  estimatedReturnsPaise: number;
  totalCorpusPaise: number;
  inflationAdjustedCorpusPaise: number;
  wealthMultiplier: number;
  yearlySnapshots: YearlyWealthSnapshot[];
}

/**
 * Calculates compound wealth trajectory for a monthly SIP.
 */
export function calculateSIPWealthProjection(
  monthlyInvestmentPaise: number,
  expectedAnnualReturnRate: number, // e.g. 0.12 for 12%
  durationYears: number,
  annualStepUpPct: number = 0, // e.g. 0.10 for 10% annual step-up
  annualInflationRate: number = 0.06 // default 6% inflation
): SIPWealthProjection {
  const safeMonthly = Math.max(0, monthlyInvestmentPaise);
  const safeYears = Math.max(1, Math.min(40, durationYears));
  const safeRate = Math.max(0.01, Math.min(0.30, expectedAnnualReturnRate));
  const monthlyRate = safeRate / 12;

  let currentMonthlySIP = safeMonthly;
  let totalInvestedPaise = 0;
  let accumulatedCorpus = 0;
  const yearlySnapshots: YearlyWealthSnapshot[] = [];

  for (let y = 1; y <= safeYears; y++) {
    for (let m = 1; m <= 12; m++) {
      totalInvestedPaise += currentMonthlySIP;
      accumulatedCorpus = (accumulatedCorpus + currentMonthlySIP) * (1 + monthlyRate);
    }

    const inflationFactor = Math.pow(1 + annualInflationRate, y);
    const inflationAdjusted = Math.round(accumulatedCorpus / inflationFactor);

    yearlySnapshots.push({
      year: y,
      totalInvestedPaise: Math.round(totalInvestedPaise),
      estimatedReturnsPaise: Math.max(0, Math.round(accumulatedCorpus - totalInvestedPaise)),
      totalCorpusPaise: Math.round(accumulatedCorpus),
      inflationAdjustedCorpusPaise: Math.round(inflationAdjusted),
    });

    if (annualStepUpPct > 0) {
      currentMonthlySIP = Math.round(currentMonthlySIP * (1 + annualStepUpPct));
    }
  }

  const finalSnapshot = yearlySnapshots[yearlySnapshots.length - 1];
  const wealthMultiplier =
    finalSnapshot.totalInvestedPaise > 0
      ? Math.round((finalSnapshot.totalCorpusPaise / finalSnapshot.totalInvestedPaise) * 10) / 10
      : 1;

  return {
    totalInvestedPaise: finalSnapshot.totalInvestedPaise,
    estimatedReturnsPaise: finalSnapshot.estimatedReturnsPaise,
    totalCorpusPaise: finalSnapshot.totalCorpusPaise,
    inflationAdjustedCorpusPaise: finalSnapshot.inflationAdjustedCorpusPaise,
    wealthMultiplier,
    yearlySnapshots,
  };
}

/**
 * Formats paise into clean INR currency string with Lakhs / Crores suffixes.
 */
export function formatPaiseToCompactINR(paise: number): string {
  const rupees = paise / 100;
  if (rupees >= 10000000) {
    return `₹${(rupees / 10000000).toFixed(2)} Cr`;
  }
  if (rupees >= 100000) {
    return `₹${(rupees / 100000).toFixed(2)} L`;
  }
  return `₹${Math.round(rupees).toLocaleString('en-IN')}`;
}

