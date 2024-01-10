import { calculateBudgetStatus } from '../src/utils/calculations';
import { Budget, Category, Transaction } from '../src/types';

describe('Budget Calculation Scenarios', () => {
  const category: Category = {
    id: 'cat_dining',
    name: 'Dining Out',
    type: 'expense',
    icon: 'restaurant',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
  };

  test('correctly calculates healthy budget status under 50% usage', () => {
    const budget: Budget = {
      id: 'b_1',
      categoryId: 'cat_dining',
      monthlyLimitPaise: 1000000, // ₹10,000
      month: '2026-10',
      warningThresholdPercent: 80,
    };

    const transactions: Transaction[] = [
      {
        id: 'tx_1',
        title: 'Cafe Lunch',
        amountPaise: 400000, // ₹4,000 (40%)
        type: 'expense',
        categoryId: 'cat_dining',
        accountId: 'acc_1',
        date: '2026-10-05T12:00:00.000Z',
      },
    ];

    const status = calculateBudgetStatus(budget, transactions, [category]);
    expect(status.spentPaise).toBe(400000);
    expect(status.remainingPaise).toBe(600000);
    expect(status.percentageUsed).toBe(40);
    expect(status.isWarning).toBe(false);
    expect(status.isExceeded).toBe(false);
  });

  test('flags warning state when usage hits or exceeds threshold', () => {
    const budget: Budget = {
      id: 'b_2',
      categoryId: 'cat_dining',
      monthlyLimitPaise: 1000000, // ₹10,000
      month: '2026-10',
      warningThresholdPercent: 75,
    };

    const transactions: Transaction[] = [
      {
        id: 'tx_1',
        title: 'Dinner Party',
        amountPaise: 800000, // ₹8,000 (80%)
        type: 'expense',
        categoryId: 'cat_dining',
        accountId: 'acc_1',
        date: '2026-10-10T20:00:00.000Z',
      },
    ];

    const status = calculateBudgetStatus(budget, transactions, [category]);
    expect(status.percentageUsed).toBe(80);
    expect(status.isWarning).toBe(true);
    expect(status.isExceeded).toBe(false);
  });

  test('flags exceeded state when spent amount exceeds limit', () => {
    const budget: Budget = {
      id: 'b_3',
      categoryId: 'cat_dining',
      monthlyLimitPaise: 1000000, // ₹10,000
      month: '2026-10',
      warningThresholdPercent: 80,
    };

    const transactions: Transaction[] = [
      {
        id: 'tx_1',
        title: 'Catering service',
        amountPaise: 1250000, // ₹12,500 (125%)
        type: 'expense',
        categoryId: 'cat_dining',
        accountId: 'acc_1',
        date: '2026-10-15T18:00:00.000Z',
      },
    ];

    const status = calculateBudgetStatus(budget, transactions, [category]);
    expect(status.spentPaise).toBe(1250000);
    expect(status.remainingPaise).toBe(0);
    expect(status.percentageUsed).toBe(125);
    expect(status.isExceeded).toBe(true);
  });
});
