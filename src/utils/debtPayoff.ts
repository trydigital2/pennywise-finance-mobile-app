/**
 * Debt Freedom & Payoff Accelerator Engine
 * Implements Debt Snowball (lowest balance first for psychological momentum)
 * and Debt Avalanche (highest APR first for mathematical interest minimization).
 * All monetary amounts are computed in integer paise.
 */

export type DebtPayoffStrategy = "snowball" | "avalanche";

export interface DebtItem {
  id: string;
  name: string;
  balancePaise: number;
  annualInterestRate: number; // e.g. 18.5 for 18.5%
  minimumPaymentPaise: number;
}

export interface DebtPayoffSummary {
  strategy: DebtPayoffStrategy;
  totalStartingDebtPaise: number;
  monthsToDebtFree: number;
  totalInterestPaidPaise: number;
  totalPaidPaise: number;
  payoffOrder: string[];
}

export interface DebtComparisonResult {
  snowball: DebtPayoffSummary;
  avalanche: DebtPayoffSummary;
  interestSavedWithAvalanchePaise: number;
  monthsDifference: number;
  recommendedStrategy: DebtPayoffStrategy;
  recommendationReason: string;
}

/**
 * Simulates month-by-month debt payoff under Snowball or Avalanche prioritization.
 */
export function calculateDebtPayoffSchedule(
  debts: DebtItem[],
  strategy: DebtPayoffStrategy,
  extraMonthlyPaise: number = 0
): DebtPayoffSummary {
  if (!debts || debts.length === 0) {
    return {
      strategy,
      totalStartingDebtPaise: 0,
      monthsToDebtFree: 0,
      totalInterestPaidPaise: 0,
      totalPaidPaise: 0,
      payoffOrder: [],
    };
  }

  // Clone debts with active balances
  let activeDebts = debts
    .filter((d) => d.balancePaise > 0)
    .map((d) => ({
      ...d,
      currentBalance: d.balancePaise,
    }));

  const totalStartingDebtPaise = activeDebts.reduce((acc, d) => acc + d.balancePaise, 0);

  // Sorting based on strategy:
  // Snowball: Ascending balance (lowest balance first)
  // Avalanche: Descending APR (highest interest first)
  const sortActiveDebts = () => {
    activeDebts.sort((a, b) => {
      if (strategy === "snowball") {
        return a.currentBalance - b.currentBalance;
      } else {
        return b.annualInterestRate - a.annualInterestRate;
      }
    });
  };

  let totalInterestPaidPaise = 0;
  let totalPaidPaise = 0;
  let months = 0;
  const payoffOrder: string[] = [];
  const maxSafeMonths = 360; // 30-year safety ceiling

  let freedUpPaymentsPaise = 0;

  while (activeDebts.length > 0 && months < maxSafeMonths) {
    months++;
    sortActiveDebts();

    let extraPool = extraMonthlyPaise + freedUpPaymentsPaise;

    // 1. Accrue monthly interest on all active debts
    for (const debt of activeDebts) {
      const monthlyRate = (debt.annualInterestRate / 100) / 12;
      const accruedInterest = Math.round(debt.currentBalance * monthlyRate);
      debt.currentBalance += accruedInterest;
      totalInterestPaidPaise += accruedInterest;
    }

    // 2. Pay minimum payments
    for (const debt of activeDebts) {
      const payment = Math.min(debt.currentBalance, debt.minimumPaymentPaise);
      debt.currentBalance -= payment;
      totalPaidPaise += payment;
    }

    // 3. Channel extra pool into the top target debt
    for (const debt of activeDebts) {
      if (debt.currentBalance > 0 && extraPool > 0) {
        const extraPayment = Math.min(debt.currentBalance, extraPool);
        debt.currentBalance -= extraPayment;
        totalPaidPaise += extraPayment;
        extraPool -= extraPayment;
      }
    }

    // 4. Identify paid-off debts and snowball their minimum payments forward
    const remainingDebts = [];
    for (const debt of activeDebts) {
      if (debt.currentBalance <= 0) {
        if (!payoffOrder.includes(debt.name)) {
          payoffOrder.push(debt.name);
        }
        freedUpPaymentsPaise += debt.minimumPaymentPaise;
      } else {
        remainingDebts.push(debt);
      }
    }
    activeDebts = remainingDebts;
  }

  return {
    strategy,
    totalStartingDebtPaise,
    monthsToDebtFree: months,
    totalInterestPaidPaise,
    totalPaidPaise,
    payoffOrder,
  };
}

/**
 * Compares Debt Snowball vs Debt Avalanche and delivers tailored tactical recommendations.
 */
export function compareDebtStrategies(
  debts: DebtItem[],
  extraMonthlyPaise: number = 0
): DebtComparisonResult {
  const snowball = calculateDebtPayoffSchedule(debts, "snowball", extraMonthlyPaise);
  const avalanche = calculateDebtPayoffSchedule(debts, "avalanche", extraMonthlyPaise);

  const interestSavedWithAvalanchePaise = Math.max(
    0,
    snowball.totalInterestPaidPaise - avalanche.totalInterestPaidPaise
  );
  const monthsDifference = snowball.monthsToDebtFree - avalanche.monthsToDebtFree;

  let recommendedStrategy: DebtPayoffStrategy = "avalanche";
  let recommendationReason = "";

  if (interestSavedWithAvalanchePaise > 500000) {
    // Over ₹5,000 saved in interest
    recommendedStrategy = "avalanche";
    recommendationReason = `Avalanche saves significant money in total interest charges by prioritizing high APR accounts.`;
  } else {
    recommendedStrategy = "snowball";
    recommendationReason = `Snowball provides faster quick wins by eliminating smaller balances first, building psychological momentum.`;
  }

  return {
    snowball,
    avalanche,
    interestSavedWithAvalanchePaise,
    monthsDifference,
    recommendedStrategy,
    recommendationReason,
  };
}
