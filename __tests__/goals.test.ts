import { calculateGoalProgress } from '../src/utils/calculations';
import { SavingsGoal } from '../src/types';

describe('Savings Goals Progress Calculations', () => {
  test('calculates accurate progress percentage and remaining amount', () => {
    const goal: SavingsGoal = {
      id: 'g_1',
      name: 'Emergency Fund',
      targetAmountPaise: 50000000, // ₹5,00,000
      currentAmountPaise: 25000000, // ₹2,50,000 (50%)
      targetDate: '2027-01-01',
      icon: 'shield',
      color: '#10B981',
      isCompleted: false,
      contributions: [],
    };

    const progress = calculateGoalProgress(goal);
    expect(progress.percentage).toBe(50);
    expect(progress.remainingPaise).toBe(25000000);
    expect(progress.isCompleted).toBe(false);
  });

  test('marks goal as completed when current amount meets target', () => {
    const goal: SavingsGoal = {
      id: 'g_2',
      name: 'Holiday Trip',
      targetAmountPaise: 10000000, // ₹1,00,000
      currentAmountPaise: 10500000, // ₹1,05,000 (105%)
      targetDate: '2026-12-31',
      icon: 'airplane',
      color: '#3B82F6',
      isCompleted: true,
      contributions: [],
    };

    const progress = calculateGoalProgress(goal);
    expect(progress.percentage).toBe(100);
    expect(progress.remainingPaise).toBe(0);
    expect(progress.isCompleted).toBe(true);
  });
});
