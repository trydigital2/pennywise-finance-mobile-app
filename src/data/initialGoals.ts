import { SavingsGoal } from '../types';

export const INITIAL_GOALS: SavingsGoal[] = [
  {
    id: 'goal_01',
    name: 'Emergency Fund (6 Months)',
    targetAmountPaise: 30000000, // ₹3,00,000
    currentAmountPaise: 22500000, // ₹2,25,000 (75%)
    targetDate: '2026-12-31',
    icon: 'shield-outline',
    color: '#10B981',
    isCompleted: false,
    notes: 'Safe liquid corpus in ICICI savings',
    contributions: [
      { id: 'gc_1', goalId: 'goal_01', amountPaise: 2500000, date: '2026-08-01', notes: 'Monthly bonus contribution' },
      { id: 'gc_2', goalId: 'goal_01', amountPaise: 2000000, date: '2026-09-01', notes: 'SIP transfer' },
      { id: 'gc_3', goalId: 'goal_01', amountPaise: 2000000, date: '2026-10-01', notes: 'Regular contribution' },
    ],
  },
  {
    id: 'goal_02',
    name: 'Japan Vacation Trip',
    targetAmountPaise: 20000000, // ₹2,00,000
    currentAmountPaise: 13500000, // ₹1,35,000 (67.5%)
    targetDate: '2027-04-15',
    icon: 'airplane-outline',
    color: '#3B82F6',
    isCompleted: false,
    notes: 'Flights and hotels for Tokyo & Kyoto',
    contributions: [
      { id: 'gc_4', goalId: 'goal_02', amountPaise: 1500000, date: '2026-09-15', notes: 'Freelance project payment' },
      { id: 'gc_5', goalId: 'goal_02', amountPaise: 1000000, date: '2026-10-10', notes: 'Savings allocation' },
    ],
  },
  {
    id: 'goal_03',
    name: 'New MacBook Pro M4',
    targetAmountPaise: 18000000, // ₹1,80,000
    currentAmountPaise: 18000000, // ₹1,80,000 (100% completed)
    targetDate: '2026-10-15',
    icon: 'laptop-outline',
    color: '#8B5CF6',
    isCompleted: true,
    notes: 'Target achieved! Ready for upgrade.',
    contributions: [
      { id: 'gc_6', goalId: 'goal_03', amountPaise: 5000000, date: '2026-08-10', notes: 'Design contest reward' },
      { id: 'gc_7', goalId: 'goal_03', amountPaise: 5000000, date: '2026-09-20', notes: 'Client milestone' },
    ],
  },
  {
    id: 'goal_04',
    name: 'Car Down Payment',
    targetAmountPaise: 40000000, // ₹4,00,000
    currentAmountPaise: 16000000, // ₹1,60,000 (40%)
    targetDate: '2027-08-30',
    icon: 'car-outline',
    color: '#F59E0B',
    isCompleted: false,
    notes: 'Down payment for EV compact SUV',
    contributions: [
      { id: 'gc_8', goalId: 'goal_04', amountPaise: 2000000, date: '2026-09-05', notes: 'Monthly allocation' },
    ],
  },
  {
    id: 'goal_05',
    name: 'Annual Health & Term Insurance',
    targetAmountPaise: 4500000, // ₹45,000
    currentAmountPaise: 4500000, // ₹45,000 (100%)
    targetDate: '2026-11-20',
    icon: 'heart-outline',
    color: '#EC4899',
    isCompleted: true,
    notes: 'Family floater premium ready',
    contributions: [
      { id: 'gc_9', goalId: 'goal_05', amountPaise: 4500000, date: '2026-10-02', notes: 'Direct annual reserve' },
    ],
  },
];
