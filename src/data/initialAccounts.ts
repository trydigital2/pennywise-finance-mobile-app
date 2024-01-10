import { Account } from '../types';

export const INITIAL_ACCOUNTS: Account[] = [
  {
    id: 'acc_checking_01',
    name: 'HDFC Priority Checking',
    type: 'checking',
    balancePaise: 18450000, // ₹1,84,500.00
    maskedNumber: '•••• 4892',
    currency: 'INR',
    institution: 'HDFC Bank',
    isDefault: true,
    color: '#1E3A8A',
    icon: 'card-outline',
    updatedAt: '2026-10-22T09:00:00.000Z',
  },
  {
    id: 'acc_savings_02',
    name: 'ICICI Wealth Reserve',
    type: 'savings',
    balancePaise: 42500000, // ₹4,25,000.00
    maskedNumber: '•••• 7319',
    currency: 'INR',
    institution: 'ICICI Bank',
    isDefault: false,
    color: '#991B1B',
    icon: 'shield-checkmark-outline',
    updatedAt: '2026-10-22T09:00:00.000Z',
  },
  {
    id: 'acc_wallet_03',
    name: 'Daily Cash Wallet',
    type: 'cash_wallet',
    balancePaise: 1250000, // ₹12,500.00
    maskedNumber: 'Cash in Hand',
    currency: 'INR',
    institution: 'Physical Cash',
    isDefault: false,
    color: '#065F46',
    icon: 'wallet-outline',
    updatedAt: '2026-10-22T09:00:00.000Z',
  },
];
