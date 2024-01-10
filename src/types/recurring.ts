export type RecurringFrequency = 'weekly' | 'monthly' | 'yearly';

export interface RecurringRule {
  id: string;
  title: string;
  amountPaise: number;
  type: 'expense' | 'income';
  categoryId: string;
  accountId: string;
  frequency: RecurringFrequency;
  nextDueDate: string; // YYYY-MM-DD
  isActive: boolean;
  notes?: string;
}
