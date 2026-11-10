/**
 * FIRE (Financial Independence, Retire Early) & Safe Withdrawal Rate Engine
 * Calculates FIRE Target Number, LeanFIRE, FatFIRE, CoastFIRE milestones,
 * and years-to-financial-independence with inflation adjustments.
 */

export type FIRETier = 'FIRE Achieved' | 'Coast FIRE' | 'On Track' | 'Building Foundation';

export interface FIREResult {
  fireTargetNumberPaise: number;
  leanFireNumberPaise: number;
  fatFireNumberPaise: number;
  coastFireTargetPaise: number;
  fireProgressPct: number;
  estimatedYearsToFIRE: number;
  projectedRetirementAge: number;
  isCoastFIREReached: boolean;
  tier: FIRETier;
  tierColor: string;
  recommendation: string;
}

export interface FIREInputs {
  annualExpensesPaise: number;
  currentNetWorthPaise: number;
  annualSavingsPaise: number;
  currentAge?: number;
  targetRetirementAge?: number;
  safeWithdrawalRatePct?: number; // e.g. 4.0 for 4%
  expectedReturnRate?: number; // e.g. 0.10 for 10%
  inflationRate?: number; // e.g. 0.06 for 6%
}

/**
 * Evaluates holistic FIRE retirement readiness.
 */
export function calculateFIREReadiness(inputs: FIREInputs): FIREResult {
  const {
    annualExpensesPaise,
    currentNetWorthPaise,
    annualSavingsPaise,
    currentAge = 28,
    targetRetirementAge = 50,
    safeWithdrawalRatePct = 4.0,
    expectedReturnRate = 0.10,
    inflationRate = 0.06,
  } = inputs;

  const safeExpenses = Math.max(100000, annualExpensesPaise);
  const safeSWR = Math.max(2.5, Math.min(6.0, safeWithdrawalRatePct));
  const realAnnualRate = Math.max(0.01, (1 + expectedReturnRate) / (1 + inflationRate) - 1);

  // 1. FIRE Milestones
  const fireTargetNumberPaise = Math.round(safeExpenses / (safeSWR / 100));
  const leanFireNumberPaise = Math.round(fireTargetNumberPaise * 0.75);
  const fatFireNumberPaise = Math.round(fireTargetNumberPaise * 1.5);

  // 2. Coast FIRE Target
  const yearsToTarget = Math.max(1, targetRetirementAge - currentAge);
  const compoundDiscount = Math.pow(1 + realAnnualRate, yearsToTarget);
  const coastFireTargetPaise = Math.round(fireTargetNumberPaise / compoundDiscount);
  const isCoastFIREReached = currentNetWorthPaise >= coastFireTargetPaise;

  // 3. Progress Percentage
  const fireProgressPct = Math.min(
    100,
    Math.round((currentNetWorthPaise / fireTargetNumberPaise) * 1000) / 10
  );

  // 4. Time to FIRE Projection
  let corpus = currentNetWorthPaise;
  let yearsCount = 0;
  const maxYearsSimulation = 50;

  while (corpus < fireTargetNumberPaise && yearsCount < maxYearsSimulation) {
    corpus = corpus * (1 + realAnnualRate) + annualSavingsPaise;
    yearsCount++;
  }

  const estimatedYearsToFIRE = yearsCount;
  const projectedRetirementAge = currentAge + estimatedYearsToFIRE;

  // 5. Tier Classification
  let tier: FIRETier = 'Building Foundation';
  let tierColor = '#64748B';
  let recommendation = '';

  if (fireProgressPct >= 100) {
    tier = 'FIRE Achieved';
    tierColor = '#10B981';
    recommendation =
      'Congratulations! Your portfolio fully generates perpetual passive cash flow matching your living expenses.';
  } else if (isCoastFIREReached) {
    tier = 'Coast FIRE';
    tierColor = '#8B5CF6';
    recommendation =
      'Coast FIRE unlocked! Your current portfolio alone will compound into your full FIRE target without needing another rupee of savings.';
  } else if (fireProgressPct >= 35) {
    tier = 'On Track';
    tierColor = '#2563EB';
    recommendation =
      'Accelerated momentum. Increasing your annual savings rate by just 5% can shave multiple years off your retirement timeline.';
  } else {
    tier = 'Building Foundation';
    tierColor = '#F59E0B';
    recommendation =
      'Early accumulation stage. Focus on widening the gap between income and baseline expenses to maximize monthly investment compounding.';
  }

  return {
    fireTargetNumberPaise,
    leanFireNumberPaise,
    fatFireNumberPaise,
    coastFireTargetPaise,
    fireProgressPct,
    estimatedYearsToFIRE,
    projectedRetirementAge,
    isCoastFIREReached,
    tier,
    tierColor,
    recommendation,
  };
}
