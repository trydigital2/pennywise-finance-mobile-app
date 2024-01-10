export interface SavingsGoal {
  id: string;
  name: string;
  targetAmountPaise: number;
  currentAmountPaise: number;
  targetDate: string; // YYYY-MM-DD
  icon: string;
  color: string;
  isCompleted: boolean;
  notes?: string;
  contributions: GoalContribution[];
}

export interface GoalContribution {
  id: string;
  goalId: string;
  amountPaise: number;
  date: string;
  notes?: string;
}
