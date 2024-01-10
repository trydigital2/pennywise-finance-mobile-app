export type AccountType = 'checking' | 'savings' | 'cash_wallet' | 'investment';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balancePaise: number; // in integer paise (100 paise = 1 INR)
  maskedNumber: string;
  currency: string;
  institution: string;
  isDefault: boolean;
  color: string;
  icon: string;
  updatedAt: string;
}
