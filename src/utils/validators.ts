import { Transaction, Budget, SavingsGoal } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateTransaction(input: Partial<Transaction>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.title || input.title.trim().length === 0) {
    errors.title = 'Title or merchant is required';
  } else if (input.title.trim().length > 100) {
    errors.title = 'Title must be under 100 characters';
  }

  if (input.amountPaise === undefined || input.amountPaise === null || input.amountPaise <= 0) {
    errors.amount = 'Amount must be greater than zero';
  }

  if (!input.categoryId) {
    errors.categoryId = 'Please select a category';
  }

  if (!input.accountId) {
    errors.accountId = 'Please select an account';
  }

  if (!input.date) {
    errors.date = 'Transaction date is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateBudget(input: Partial<Budget>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.categoryId) {
    errors.categoryId = 'Category is required';
  }

  if (!input.monthlyLimitPaise || input.monthlyLimitPaise <= 0) {
    errors.monthlyLimit = 'Monthly limit must be greater than zero';
  }

  if (!input.month || !/^\d{4}-\d{2}$/.test(input.month)) {
    errors.month = 'Month must be in YYYY-MM format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateGoal(input: Partial<SavingsGoal>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length === 0) {
    errors.name = 'Goal name is required';
  }

  if (!input.targetAmountPaise || input.targetAmountPaise <= 0) {
    errors.targetAmount = 'Target amount must be greater than zero';
  }

  if (!input.targetDate) {
    errors.targetDate = 'Target completion date is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Warns if an identical transaction was recorded in the same account on the same day
 */
export function detectDuplicateTransaction(
  newTx: Partial<Transaction>,
  existing: Transaction[]
): boolean {
  if (!newTx.amountPaise || !newTx.title || !newTx.accountId || !newTx.date) {
    return false;
  }

  const targetDateKey = newTx.date.split('T')[0];
  const targetTitle = newTx.title.trim().toLowerCase();

  return existing.some((tx) => {
    if (newTx.id && tx.id === newTx.id) return false;
    const txDateKey = tx.date.split('T')[0];
    return (
      tx.amountPaise === newTx.amountPaise &&
      tx.accountId === newTx.accountId &&
      txDateKey === targetDateKey &&
      tx.title.trim().toLowerCase() === targetTitle
    );
  });
}
