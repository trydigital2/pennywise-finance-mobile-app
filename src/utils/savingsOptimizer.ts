/**
 * 50/30/20 Budget Optimization & Compound Growth Utilities
 * Evaluates budget distribution across Essential Needs (50%), Discretionary Wants (30%),
 * and Future Savings (20%), and forecasts wealth building over time.
 */

export interface Budget50_30_20_Inputs {
  monthlyIncomePaise: number;
  actualNeedsPaise: number;
  actualWantsPaise: number;
  actualSavingsPaise: number;
}

export interface BudgetBucket {
  name: string;
  targetPercent: number;
  actualPercent: number;
  targetPaise: number;
  actualPaise: number;
  variancePaise: number; // positive = overspent, negative = saved
  isBalanced: boolean;
}

export interface Budget50_30_20_Result {
  needs: BudgetBucket;
  wants: BudgetBucket;
  savings: BudgetBucket;
  totalIncomePaise: number;
  allocationHealth: "Optimized" | "Wants Heavy" | "Needs Strained" | "High Saver";
  optimizationTips: string[];
}

export interface CompoundProjection {
  year: number;
  totalContributedPaise: number;
  interestEarnedPaise: number;
  totalValuePaise: number;
}

/**
 * Calculates 50/30/20 rule breakdown and identifies variance against targets.
 */
export function calculate50_30_20_Budget(inputs: Budget50_30_20_Inputs): Budget50_30_20_Result {
  const {
    monthlyIncomePaise,
    actualNeedsPaise,
    actualWantsPaise,
    actualSavingsPaise,
  } = inputs;

  const income = Math.max(1, monthlyIncomePaise);

  const targetNeedsPaise = Math.round(income * 0.5);
  const targetWantsPaise = Math.round(income * 0.3);
  const targetSavingsPaise = Math.round(income * 0.2);

  const actualNeedsPct = Math.round((actualNeedsPaise / income) * 100);
  const actualWantsPct = Math.round((actualWantsPaise / income) * 100);
  const actualSavingsPct = Math.round((actualSavingsPaise / income) * 100);

  const needsBucket: BudgetBucket = {
    name: "Needs (50%)",
    targetPercent: 50,
    actualPercent: actualNeedsPct,
    targetPaise: targetNeedsPaise,
    actualPaise: actualNeedsPaise,
    variancePaise: actualNeedsPaise - targetNeedsPaise,
    isBalanced: actualNeedsPct <= 52,
  };

  const wantsBucket: BudgetBucket = {
    name: "Wants (30%)",
    targetPercent: 30,
    actualPercent: actualWantsPct,
    targetPaise: targetWantsPaise,
    actualPaise: actualWantsPaise,
    variancePaise: actualWantsPaise - targetWantsPaise,
    isBalanced: actualWantsPct <= 32,
  };

  const savingsBucket: BudgetBucket = {
    name: "Savings (20%)",
    targetPercent: 20,
    actualPercent: actualSavingsPct,
    targetPaise: targetSavingsPaise,
    actualPaise: actualSavingsPaise,
    variancePaise: targetSavingsPaise - actualSavingsPaise,
    isBalanced: actualSavingsPct >= 18,
  };

  let allocationHealth: "Optimized" | "Wants Heavy" | "Needs Strained" | "High Saver" = "Optimized";
  const optimizationTips: string[] = [];

  if (actualSavingsPct >= 30) {
    allocationHealth = "High Saver";
    optimizationTips.push("Exceptional savings discipline. Ensure surplus funds are deployed in growth assets.");
  } else if (actualNeedsPct > 55) {
    allocationHealth = "Needs Strained";
    optimizationTips.push("Essential fixed costs exceed 50% of income. Explore renegotiating recurring utilities.");
  } else if (actualWantsPct > 35) {
    allocationHealth = "Wants Heavy";
    optimizationTips.push("Discretionary spending is outpacing target by " + (actualWantsPct - 30) + "%. Trim entertainment outlays.");
  } else {
    allocationHealth = "Optimized";
    optimizationTips.push("Your spending aligns well with the balanced 50/30/20 guideline.");
  }

  return {
    needs: needsBucket,
    wants: wantsBucket,
    savings: savingsBucket,
    totalIncomePaise: income,
    allocationHealth,
    optimizationTips,
  };
}

/**
 * Projects compound growth for recurring monthly savings contributions.
 */
export function projectCompoundGrowth(
  monthlyContributionPaise: number,
  annualInterestRatePercent: number,
  years: number = 5,
  startingBalancePaise: number = 0
): CompoundProjection[] {
  const projections: CompoundProjection[] = [];
  const monthlyRate = annualInterestRatePercent / 100 / 12;

  let currentBalance = startingBalancePaise;
  let totalContributed = startingBalancePaise;

  for (let y = 1; y <= years; y++) {
    for (let m = 1; m <= 12; m++) {
      currentBalance = (currentBalance + monthlyContributionPaise) * (1 + monthlyRate);
      totalContributed += monthlyContributionPaise;
    }

    const roundedValue = Math.round(currentBalance);
    const roundedContributed = Math.round(totalContributed);
    projections.push({
      year: y,
      totalContributedPaise: roundedContributed,
      interestEarnedPaise: Math.max(0, roundedValue - roundedContributed),
      totalValuePaise: roundedValue,
    });
  }

  return projections;
}
