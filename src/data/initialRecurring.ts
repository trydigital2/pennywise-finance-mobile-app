import { RecurringRule } from '../types';

export const INITIAL_RECURRING: RecurringRule[] = [
  {
    id: 'rec_01',
    title: 'Monthly Apartment Rent',
    amountPaise: 3500000, // ₹35,000
    type: 'expense',
    categoryId: 'cat_housing',
    accountId: 'acc_checking_01',
    frequency: 'monthly',
    nextDueDate: '2026-11-01',
    isActive: true,
    notes: 'Society maintenance included',
  },
  {
    id: 'rec_02',
    title: 'Senior Fullstack Tech Salary',
    amountPaise: 17500000, // ₹1,75,000
    type: 'income',
    categoryId: 'cat_salary',
    accountId: 'acc_checking_01',
    frequency: 'monthly',
    nextDueDate: '2026-10-31',
    isActive: true,
    notes: 'Direct corporate deposit',
  },
  {
    id: 'rec_03',
    title: 'High-Speed Fiber Internet',
    amountPaise: 119900, // ₹1,199
    type: 'expense',
    categoryId: 'cat_bills',
    accountId: 'acc_checking_01',
    frequency: 'monthly',
    nextDueDate: '2026-11-05',
    isActive: true,
    notes: '300 Mbps unlimited plan',
  },
  {
    id: 'rec_04',
    title: 'Electricity & Gas Utility',
    amountPaise: 380000, // ₹3,800
    type: 'expense',
    categoryId: 'cat_bills',
    accountId: 'acc_checking_01',
    frequency: 'monthly',
    nextDueDate: '2026-11-10',
    isActive: true,
    notes: 'State power board auto-pay',
  },
  {
    id: 'rec_05',
    title: 'Spotify Family Subscription',
    amountPaise: 19900, // ₹199
    type: 'expense',
    categoryId: 'cat_entertainment',
    accountId: 'acc_checking_01',
    frequency: 'monthly',
    nextDueDate: '2026-11-12',
    isActive: true,
    notes: 'Family 6 account pack',
  },
  {
    id: 'rec_06',
    title: 'Netflix 4K Ultra HD',
    amountPaise: 64900, // ₹649
    type: 'expense',
    categoryId: 'cat_entertainment',
    accountId: 'acc_checking_01',
    frequency: 'monthly',
    nextDueDate: '2026-11-15',
    isActive: true,
  },
  {
    id: 'rec_07',
    title: 'Cult.fit Gym & Fitness Membership',
    amountPaise: 180000, // ₹1,800
    type: 'expense',
    categoryId: 'cat_healthcare',
    accountId: 'acc_checking_01',
    frequency: 'monthly',
    nextDueDate: '2026-11-08',
    isActive: true,
    notes: 'Elite pass monthly installment',
  },
  {
    id: 'rec_08',
    title: 'Weekend Tech Consulting Retainer',
    amountPaise: 3500000, // ₹35,000
    type: 'income',
    categoryId: 'cat_freelance',
    accountId: 'acc_checking_01',
    frequency: 'monthly',
    nextDueDate: '2026-11-04',
    isActive: true,
    notes: 'Client code review & architecture',
  },
  {
    id: 'rec_09',
    title: 'Mutual Fund SIP - Index 50',
    amountPaise: 1500000, // ₹15,000
    type: 'expense',
    categoryId: 'cat_investments',
    accountId: 'acc_checking_01',
    frequency: 'monthly',
    nextDueDate: '2026-11-05',
    isActive: true,
    notes: 'Direct growth automated SIP',
  },
  {
    id: 'rec_10',
    title: 'Water Can & Supply Delivery',
    amountPaise: 35000, // ₹350
    type: 'expense',
    categoryId: 'cat_bills',
    accountId: 'acc_wallet_03',
    frequency: 'weekly',
    nextDueDate: '2026-10-25',
    isActive: true,
    notes: 'Cash payment on delivery',
  },
];
