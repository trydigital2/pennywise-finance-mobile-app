import { Transaction, Budget, BudgetStatus, Category, SavingsGoal, Account } from '../types';
import { isDateInRange } from './date';

/**
 * Calculates total income in paise for matching transactions
 */
export function calculateTotalIncome(
  transactions: Transaction[],
  startDate?: string,
  endDate?: string
): number {
  return transactions
    .filter((tx) => tx.type === 'income' && isDateInRange(tx.date, startDate, endDate))
    .reduce((sum, tx) => sum + tx.amountPaise, 0);
}

/**
 * Calculates total expenses in paise for matching transactions
 */
export function calculateTotalExpenses(
  transactions: Transaction[],
  startDate?: string,
  endDate?: string
): number {
  return transactions
    .filter((tx) => tx.type === 'expense' && isDateInRange(tx.date, startDate, endDate))
    .reduce((sum, tx) => sum + tx.amountPaise, 0);
}

/**
 * Calculates net cash flow (Income - Expenses)
 */
export function calculateNetCashFlow(
  transactions: Transaction[],
  startDate?: string,
  endDate?: string
): number {
  const income = calculateTotalIncome(transactions, startDate, endDate);
  const expense = calculateTotalExpenses(transactions, startDate, endDate);
  return income - expense;
}

/**
 * Calculates current account balances derived from accounts + transactions
 */
export function calculateAccountBalances(
  accounts: Account[],
  transactions: Transaction[]
): Record<string, number> {
  const balances: Record<string, number> = {};
  
  accounts.forEach((acc) => {
    balances[acc.id] = acc.balancePaise;
  });

  return balances;
}

/**
 * Computes spending by category in paise
 */
export function calculateCategorySpending(
  transactions: Transaction[],
  startDate?: string,
  endDate?: string
): Record<string, number> {
  const spending: Record<string, number> = {};

  transactions
    .filter((tx) => tx.type === 'expense' && isDateInRange(tx.date, startDate, endDate))
    .forEach((tx) => {
      spending[tx.categoryId] = (spending[tx.categoryId] || 0) + tx.amountPaise;
    });

  return spending;
}

/**
 * Computes monthly budget status for a given budget rule
 */
export function calculateBudgetStatus(
  budget: Budget,
  transactions: Transaction[],
  categories: Category[]
): BudgetStatus {
  const category = categories.find((c) => c.id === budget.categoryId);
  
  // Start and end of budget's month
  const [year, month] = budget.month.split('-').map(Number);
  const startStr = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const endStr = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  const spentPaise = transactions
    .filter(
      (tx) =>
        tx.type === 'expense' &&
        tx.categoryId === budget.categoryId &&
        isDateInRange(tx.date, startStr, endStr)
    )
    .reduce((sum, tx) => sum + tx.amountPaise, 0);

  const remainingPaise = Math.max(0, budget.monthlyLimitPaise - spentPaise);
  const percentageUsed = budget.monthlyLimitPaise > 0 
    ? Math.round((spentPaise / budget.monthlyLimitPaise) * 100) 
    : 0;

  const isWarning = percentageUsed >= budget.warningThresholdPercent && percentageUsed < 100;
  const isExceeded = spentPaise > budget.monthlyLimitPaise;

  return {
    budget,
    categoryName: category?.name || 'General',
    categoryIcon: category?.icon || 'pricetag-outline',
    categoryColor: category?.color || '#64748B',
    spentPaise,
    remainingPaise,
    percentageUsed,
    isWarning,
    isExceeded,
  };
}

/**
 * Calculates savings rate percentage: ((Income - Expense) / Income) * 100
 */
export function calculateSavingsRate(incomePaise: number, expensePaise: number): number {
  if (incomePaise <= 0) return 0;
  const savings = incomePaise - expensePaise;
  if (savings <= 0) return 0;
  return Math.min(100, Math.round((savings / incomePaise) * 100));
}

/**
 * Calculates savings goal completion metrics
 */
export function calculateGoalProgress(goal: SavingsGoal): {
  percentage: number;
  remainingPaise: number;
  isCompleted: boolean;
} {
  const remainingPaise = Math.max(0, goal.targetAmountPaise - goal.currentAmountPaise);
  const percentage = goal.targetAmountPaise > 0
    ? Math.min(100, Math.round((goal.currentAmountPaise / goal.targetAmountPaise) * 100))
    : 0;
  const isCompleted = goal.currentAmountPaise >= goal.targetAmountPaise;

  return {
    percentage,
    remainingPaise,
    isCompleted,
  };
}
