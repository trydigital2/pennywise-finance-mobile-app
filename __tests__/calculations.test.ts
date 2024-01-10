import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateNetCashFlow,
  calculateCategorySpending,
  calculateBudgetStatus,
  calculateSavingsRate,
  calculateGoalProgress,
} from '../src/utils/calculations';
import { Transaction, Budget, Category, SavingsGoal } from '../src/types';

describe('Financial Calculation Utilities', () => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      title: 'Salary',
      amountPaise: 10000000, // ₹1,00,000
      type: 'income',
      categoryId: 'cat_salary',
      accountId: 'acc_1',
      date: '2026-10-01T10:00:00.000Z',
    },
    {
      id: '2',
      title: 'Freelance',
      amountPaise: 2500000, // ₹25,000
      type: 'income',
      categoryId: 'cat_freelance',
      accountId: 'acc_1',
      date: '2026-10-05T12:00:00.000Z',
    },
    {
      id: '3',
      title: 'Rent',
      amountPaise: 3000000, // ₹30,000
      type: 'expense',
      categoryId: 'cat_housing',
      accountId: 'acc_1',
      date: '2026-10-02T10:00:00.000Z',
    },
    {
      id: '4',
      title: 'Groceries',
      amountPaise: 1000000, // ₹10,000
      type: 'expense',
      categoryId: 'cat_food',
      accountId: 'acc_1',
      date: '2026-10-03T15:00:00.000Z',
    },
    {
      id: '5',
      title: 'September Groceries (Outside range)',
      amountPaise: 800000, // ₹8,000
      type: 'expense',
      categoryId: 'cat_food',
      accountId: 'acc_1',
      date: '2026-09-25T15:00:00.000Z',
    },
  ];

  test('calculateTotalIncome sums only income transactions within range', () => {
    const totalAll = calculateTotalIncome(mockTransactions);
    expect(totalAll).toBe(12500000); // 100,000 + 25,000 = ₹1,25,000

    const totalOctober = calculateTotalIncome(mockTransactions, '2026-10-01', '2026-10-31');
    expect(totalOctober).toBe(12500000);
  });

  test('calculateTotalExpenses sums only expense transactions within range', () => {
    const totalAll = calculateTotalExpenses(mockTransactions);
    expect(totalAll).toBe(4800000); // 30,000 + 10,000 + 8,000 = ₹48,000

    const totalOctober = calculateTotalExpenses(mockTransactions, '2026-10-01', '2026-10-31');
    expect(totalOctober).toBe(4000000); // 30,000 + 10,000 = ₹40,000
  });

  test('calculateNetCashFlow computes income minus expenses correctly', () => {
    const netOctober = calculateNetCashFlow(mockTransactions, '2026-10-01', '2026-10-31');
    expect(netOctober).toBe(8500000); // 1,25,000 - 40,000 = ₹85,000 surplus
  });

  test('calculateCategorySpending calculates totals per category', () => {
    const spending = calculateCategorySpending(mockTransactions, '2026-10-01', '2026-10-31');
    expect(spending['cat_housing']).toBe(3000000);
    expect(spending['cat_food']).toBe(1000000);
    expect(spending['cat_salary']).toBeUndefined();
  });

  test('calculateSavingsRate computes correct percentage', () => {
    expect(calculateSavingsRate(100000, 40000)).toBe(60); // 60%
    expect(calculateSavingsRate(100000, 100000)).toBe(0);
    expect(calculateSavingsRate(100000, 120000)).toBe(0); // No negative savings rate
    expect(calculateSavingsRate(0, 50000)).toBe(0);
  });

  test('calculateBudgetStatus determines spent, remaining, warning and exceeded flags', () => {
    const mockBudget: Budget = {
      id: 'b_1',
      categoryId: 'cat_food',
      monthlyLimitPaise: 1200000, // ₹12,000
      month: '2026-10',
      warningThresholdPercent: 80,
    };

    const mockCategories: Category[] = [
      { id: 'cat_food', name: 'Food & Dining', type: 'expense', icon: 'restaurant', color: '#F59E0B', bgColor: '#FEF3C7' },
    ];

    const status = calculateBudgetStatus(mockBudget, mockTransactions, mockCategories);
    expect(status.spentPaise).toBe(1000000); // ₹10,000 spent in October
    expect(status.remainingPaise).toBe(200000); // ₹2,000 remaining
    expect(status.percentageUsed).toBe(83); // 10/12 ~ 83%
    expect(status.isWarning).toBe(true); // >= 80%
    expect(status.isExceeded).toBe(false);
  });

  test('calculateGoalProgress computes progress percentage and completion state', () => {
    const goalInProgress: SavingsGoal = {
      id: 'g1',
      name: 'MacBook',
      targetAmountPaise: 20000000, // ₹2,00,000
      currentAmountPaise: 15000000, // ₹1,50,000
      targetDate: '2026-12-31',
      icon: 'laptop',
      color: '#8B5CF6',
      isCompleted: false,
      contributions: [],
    };

    const progress = calculateGoalProgress(goalInProgress);
    expect(progress.percentage).toBe(75);
    expect(progress.remainingPaise).toBe(5000000);
    expect(progress.isCompleted).toBe(false);

    const goalFinished: SavingsGoal = {
      ...goalInProgress,
      currentAmountPaise: 20000000,
    };
    expect(calculateGoalProgress(goalFinished).percentage).toBe(100);
    expect(calculateGoalProgress(goalFinished).isCompleted).toBe(true);
  });
});
