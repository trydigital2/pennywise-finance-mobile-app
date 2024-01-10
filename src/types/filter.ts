export type SortOption = 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc';

export interface TransactionFilter {
  type: 'all' | 'expense' | 'income';
  categoryId?: string;
  accountId?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  searchQuery?: string;
  sortBy: SortOption;
}
