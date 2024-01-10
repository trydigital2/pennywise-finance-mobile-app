import { Budget } from '../types';

export const INITIAL_BUDGETS: Budget[] = [
  {
    id: 'bgt_01',
    categoryId: 'cat_food',
    monthlyLimitPaise: 2500000, // ₹25,000
    month: '2026-10',
    warningThresholdPercent: 80,
  },
  {
    id: 'bgt_02',
    categoryId: 'cat_transport',
    monthlyLimitPaise: 1200000, // ₹12,000
    month: '2026-10',
    warningThresholdPercent: 80,
  },
  {
    id: 'bgt_03',
    categoryId: 'cat_shopping',
    monthlyLimitPaise: 2000000, // ₹20,000
    month: '2026-10',
    warningThresholdPercent: 75,
  },
  {
    id: 'bgt_04',
    categoryId: 'cat_bills',
    monthlyLimitPaise: 1500000, // ₹15,000
    month: '2026-10',
    warningThresholdPercent: 85,
  },
  {
    id: 'bgt_05',
    categoryId: 'cat_housing',
    monthlyLimitPaise: 4000000, // ₹40,000
    month: '2026-10',
    warningThresholdPercent: 90,
  },
  {
    id: 'bgt_06',
    categoryId: 'cat_healthcare',
    monthlyLimitPaise: 1000000, // ₹10,000
    month: '2026-10',
    warningThresholdPercent: 80,
  },
  {
    id: 'bgt_07',
    categoryId: 'cat_entertainment',
    monthlyLimitPaise: 800000, // ₹8,000
    month: '2026-10',
    warningThresholdPercent: 80,
  },
  {
    id: 'bgt_08',
    categoryId: 'cat_education',
    monthlyLimitPaise: 1000000, // ₹10,000
    month: '2026-10',
    warningThresholdPercent: 80,
  },
];
