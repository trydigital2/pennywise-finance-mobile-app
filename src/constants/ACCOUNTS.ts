import { Account } from '../types';

export const DEFAULT_ACCOUNTS: Account[] = [
  {
    id: 'acc_checking',
    name: 'HDFC Priority Salary',
    type: 'checking',
    balancePaise: 18542000, // ₹1,85,420.00
    maskedNumber: '•••• 4892',
    currency: 'INR',
    institution: 'HDFC Bank',
    isDefault: true,
    color: '#1E3A8A',
    icon: 'business-outline',
    updatedAt: '2026-10-22T10:00:00.000Z',
  },
  {
    id: 'acc_savings',
    name: 'ICICI Wealth Savings',
    type: 'savings',
    balancePaise: 42085000, // ₹4,20,850.00
    maskedNumber: '•••• 7319',
    currency: 'INR',
    institution: 'ICICI Bank',
    isDefault: false,
    color: '#991B1B',
    icon: 'shield-checkmark-outline',
    updatedAt: '2026-10-22T10:00:00.000Z',
  },
  {
    id: 'acc_wallet',
    name: 'Daily Cash Wallet',
    type: 'cash_wallet',
    balancePaise: 845000, // ₹8,450.00
    maskedNumber: 'Cash on Hand',
    currency: 'INR',
    institution: 'Physical Wallet',
    isDefault: false,
    color: '#065F46',
    icon: 'wallet-outline',
    updatedAt: '2026-10-22T10:00:00.000Z',
  },
];
