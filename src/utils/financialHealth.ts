/**
 * Personal Financial Health & Spending Velocity Engine
 * Computes multidimensional financial fitness scores (0 - 100),
 * daily burn rates, safe spending allowances, and budget pacing.
 */

export type HealthGrade = "A+" | "A" | "B" | "C" | "D";

export interface FinancialHealthInputs {
  monthlyIncomePaise: number;
  monthlyExpensePaise: number;
  emergencyFundPaise: number;
  monthlyBudgetLimitPaise: number;
}

export interface FinancialHealthResult {
  score: number; // 0 - 100
  grade: HealthGrade;
  savingsRatePercent: number;
  emergencyFundMonths: number;
  budgetUtilizationPercent: number;
  statusLabel: string;
  recommendations: string[];
}

export interface SpendingVelocityResult {
  dailyBurnRatePaise: number;
  projectedMonthEndPaise: number;
  safeDailyAllowancePaise: number;
  daysRemaining: number;
  isPacingOverBudget: boolean;
  projectedVariancePaise: number; // positive = overspend, negative = surplus
}

/**
 * Calculates a comprehensive financial fitness score based on 4 pillars:
 * 1. Savings Rate (30 pts max - target >= 20%)
 * 2. Expense-to-Income Discipline (30 pts max - target <= 70%)
 * 3. Emergency Buffer (25 pts max - target >= 3-6 months)
 * 4. Budget Adherence (15 pts max - target <= 95% of budget)
 */
export function calculateFinancialHealth(inputs: FinancialHealthInputs): FinancialHealthResult {
  const {
    monthlyIncomePaise,
    monthlyExpensePaise,
    emergencyFundPaise,
    monthlyBudgetLimitPaise,
  } = inputs;

  if (monthlyIncomePaise <= 0) {
    return {
      score: 50,
      grade: "C",
      savingsRatePercent: 0,
      emergencyFundMonths: 0,
      budgetUtilizationPercent: 0,
      statusLabel: "Needs Income Data",
      recommendations: ["Log your primary monthly income source to activate financial health scoring."],
    };
  }

  // 1. Savings Rate Component (30 pts max)
  const netSavingsPaise = Math.max(0, monthlyIncomePaise - monthlyExpensePaise);
  const savingsRatePercent = Math.round((netSavingsPaise / monthlyIncomePaise) * 100);
  let savingsScore = 0;
  if (savingsRatePercent >= 30) {
    savingsScore = 30;
  } else if (savingsRatePercent >= 20) {
    savingsScore = 25;
  } else if (savingsRatePercent >= 10) {
    savingsScore = 18;
  } else if (savingsRatePercent > 0) {
    savingsScore = 10;
  } else {
    savingsScore = 0;
  }

  // 2. Expense Discipline Component (30 pts max)
  const expenseRatio = monthlyExpensePaise / monthlyIncomePaise;
  let expenseScore = 0;
  if (expenseRatio <= 0.5) {
    expenseScore = 30;
  } else if (expenseRatio <= 0.7) {
    expenseScore = 24;
  } else if (expenseRatio <= 0.85) {
    expenseScore = 15;
  } else if (expenseRatio <= 1.0) {
    expenseScore = 8;
  } else {
    expenseScore = 0; // deficit
  }

  // 3. Emergency Fund Buffer (25 pts max)
  const monthsOfRunway =
    monthlyExpensePaise > 0 ? emergencyFundPaise / monthlyExpensePaise : 6;
  const emergencyFundMonths = Math.round(monthsOfRunway * 10) / 10;
  let emergencyScore = 0;
  if (emergencyFundMonths >= 6) {
    emergencyScore = 25;
  } else if (emergencyFundMonths >= 3) {
    emergencyScore = 20;
  } else if (emergencyFundMonths >= 1) {
    emergencyScore = 12;
  } else {
    emergencyScore = Math.round(emergencyFundMonths * 8);
  }

  // 4. Budget Utilization (15 pts max)
  let budgetScore = 15;
  const budgetUtilizationPercent =
    monthlyBudgetLimitPaise > 0
      ? Math.round((monthlyExpensePaise / monthlyBudgetLimitPaise) * 100)
      : 100;
  if (budgetUtilizationPercent > 100) {
    budgetScore = 0;
  } else if (budgetUtilizationPercent > 90) {
    budgetScore = 7;
  } else {
    budgetScore = 15;
  }

  const rawScore = savingsScore + expenseScore + emergencyScore + budgetScore;
  const score = Math.max(0, Math.min(100, rawScore));

  let grade: HealthGrade = "C";
  let statusLabel = "Moderate Fitness";
  const recommendations: string[] = [];

  if (score >= 90) {
    grade = "A+";
    statusLabel = "Exceptional Financial Health";
    recommendations.push("Capital allocation is optimized. Consider expanding investment avenues.");
  } else if (score >= 80) {
    grade = "A";
    statusLabel = "Strong Financial Health";
    recommendations.push("Consistent surplus generated monthly. Maintain steady savings pace.");
  } else if (score >= 65) {
    grade = "B";
    statusLabel = "Good Financial Health";
    if (savingsRatePercent < 20) {
      recommendations.push("Aim to raise your monthly savings rate closer to 20% by curbing discretionary spends.");
    }
    if (emergencyFundMonths < 3) {
      recommendations.push("Build a 3-month living expense reserve before increasing long-term outlays.");
    }
  } else if (score >= 45) {
    grade = "C";
    statusLabel = "Fair — Action Recommended";
    recommendations.push("Your expenses are consuming over 80% of net income. Review category budgets.");
  } else {
    grade = "D";
    statusLabel = "Critical Attention Required";
    recommendations.push("Monthly outlays exceed or equal total incoming cash. Prioritize debt reduction.");
  }

  return {
    score,
    grade,
    savingsRatePercent,
    emergencyFundMonths,
    budgetUtilizationPercent,
    statusLabel,
    recommendations,
  };
}

/**
 * Calculates current month daily velocity and runway projections.
 */
export function calculateSpendingVelocity(
  currentMonthExpensesPaise: number,
  daysElapsed: number,
  daysInMonth: number,
  monthlyBudgetLimitPaise: number
): SpendingVelocityResult {
  const boundedElapsed = Math.max(1, daysElapsed);
  const daysRemaining = Math.max(0, daysInMonth - boundedElapsed);

  const dailyBurnRatePaise = Math.round(currentMonthExpensesPaise / boundedElapsed);
  const projectedMonthEndPaise = dailyBurnRatePaise * daysInMonth;

  const remainingBudgetPaise = Math.max(0, monthlyBudgetLimitPaise - currentMonthExpensesPaise);
  const safeDailyAllowancePaise =
    daysRemaining > 0 ? Math.round(remainingBudgetPaise / daysRemaining) : 0;

  const projectedVariancePaise = projectedMonthEndPaise - monthlyBudgetLimitPaise;
  const isPacingOverBudget = projectedVariancePaise > 0;

  return {
    dailyBurnRatePaise,
    projectedMonthEndPaise,
    safeDailyAllowancePaise,
    daysRemaining,
    isPacingOverBudget,
    projectedVariancePaise,
  };
}
