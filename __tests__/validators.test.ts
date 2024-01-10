import {
  validateTransaction,
  validateBudget,
  validateGoal,
  detectDuplicateTransaction,
} from '../src/utils/validators';
import { Transaction } from '../src/types';

describe('Validation Utilities', () => {
  describe('validateTransaction', () => {
    test('passes for valid transaction input', () => {
      const result = validateTransaction({
        title: 'Starbucks Coffee',
        amountPaise: 35000,
        categoryId: 'cat_food',
        accountId: 'acc_1',
        date: '2026-10-22T08:00:00.000Z',
      });
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });

    test('fails when title, amount, category or account are missing or zero', () => {
      const result = validateTransaction({
        title: '',
        amountPaise: 0,
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.title).toBeDefined();
      expect(result.errors.amount).toBeDefined();
      expect(result.errors.categoryId).toBeDefined();
      expect(result.errors.accountId).toBeDefined();
      expect(result.errors.date).toBeDefined();
    });
  });

  describe('validateBudget', () => {
    test('passes for valid budget input', () => {
      const result = validateBudget({
        categoryId: 'cat_food',
        monthlyLimitPaise: 2500000,
        month: '2026-10',
      });
      expect(result.isValid).toBe(true);
    });

    test('fails on invalid format or zero limit', () => {
      const result = validateBudget({
        categoryId: '',
        monthlyLimitPaise: -50,
        month: '2026/10',
      });
      expect(result.isValid).toBe(false);
      expect(result.errors.categoryId).toBeDefined();
      expect(result.errors.monthlyLimit).toBeDefined();
      expect(result.errors.month).toBeDefined();
    });
  });

  describe('validateGoal', () => {
    test('validates savings goal target amount and name', () => {
      const valid = validateGoal({
        name: 'New Car',
        targetAmountPaise: 50000000,
        targetDate: '2027-01-01',
      });
      expect(valid.isValid).toBe(true);

      const invalid = validateGoal({
        name: '',
        targetAmountPaise: 0,
      });
      expect(invalid.isValid).toBe(false);
      expect(invalid.errors.name).toBeDefined();
      expect(invalid.errors.targetAmount).toBeDefined();
    });
  });

  describe('detectDuplicateTransaction', () => {
    const existing: Transaction[] = [
      {
        id: 'tx_1',
        title: 'Uber Ride',
        amountPaise: 35000,
        type: 'expense',
        categoryId: 'cat_transport',
        accountId: 'acc_1',
        date: '2026-10-22T10:00:00.000Z',
      },
    ];

    test('detects duplicate transaction with same account, amount, title, and day', () => {
      const isDuplicate = detectDuplicateTransaction(
        {
          title: 'uber ride',
          amountPaise: 35000,
          accountId: 'acc_1',
          date: '2026-10-22T14:30:00.000Z', // same day
        },
        existing
      );
      expect(isDuplicate).toBe(true);
    });

    test('returns false when different amount, date, or account', () => {
      const notDuplicate = detectDuplicateTransaction(
        {
          title: 'Uber Ride',
          amountPaise: 45000, // different amount
          accountId: 'acc_1',
          date: '2026-10-22T10:00:00.000Z',
        },
        existing
      );
      expect(notDuplicate).toBe(false);
    });
  });
});
