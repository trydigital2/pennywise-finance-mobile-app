import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavingsGoal, GoalContribution } from '../../types';
import { INITIAL_GOALS } from '../../data';

interface GoalState {
  goals: SavingsGoal[];
  isLoading: boolean;
}

const initialState: GoalState = {
  goals: INITIAL_GOALS,
  isLoading: false,
};

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    setGoals: (state, action: PayloadAction<SavingsGoal[]>) => {
      state.goals = action.payload;
    },
    addGoal: (state, action: PayloadAction<SavingsGoal>) => {
      state.goals.push(action.payload);
    },
    updateGoal: (state, action: PayloadAction<SavingsGoal>) => {
      const idx = state.goals.findIndex((g) => g.id === action.payload.id);
      if (idx !== -1) {
        state.goals[idx] = action.payload;
      }
    },
    deleteGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter((g) => g.id !== action.payload);
    },
    addContribution: (
      state,
      action: PayloadAction<{ goalId: string; contribution: GoalContribution }>
    ) => {
      const goal = state.goals.find((g) => g.id === action.payload.goalId);
      if (goal) {
        goal.contributions.push(action.payload.contribution);
        goal.currentAmountPaise += action.payload.contribution.amountPaise;
        if (goal.currentAmountPaise >= goal.targetAmountPaise) {
          goal.isCompleted = true;
        }
      }
    },
  },
});

export const { setGoals, addGoal, updateGoal, deleteGoal, addContribution } = goalSlice.actions;
export default goalSlice.reducer;
