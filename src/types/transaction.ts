export type TransactionType = 'expense' | 'income' | 'transfer';

export interface Transaction {
  id: string;
  title: string;
  amountPaise: number; // in integer paise
  type: TransactionType;
  categoryId: string;
  accountId: string;
  toAccountId?: string; // used for internal transfer
  date: string; // ISO 8601 string (YYYY-MM-DDTHH:mm:ss.sssZ)
  merchant?: string;
  notes?: string;
  isRecurring?: boolean;
  recurringRuleId?: string;
  tags?: string[];
}
