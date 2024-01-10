export interface Budget {
  id: string;
  categoryId: string;
  monthlyLimitPaise: number;
  month: string; // Format: YYYY-MM
  warningThresholdPercent: number; // default 80 (%)
}

export interface BudgetStatus {
  budget: Budget;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  spentPaise: number;
  remainingPaise: number;
  percentageUsed: number;
  isWarning: boolean;
  isExceeded: boolean;
}
