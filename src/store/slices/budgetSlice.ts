import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Budget } from '../../types';
import { INITIAL_BUDGETS } from '../../data';

interface BudgetState {
  budgets: Budget[];
  activeMonth: string; // YYYY-MM
  isLoading: boolean;
}

const now = new Date();
const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

const initialState: BudgetState = {
  budgets: INITIAL_BUDGETS,
  activeMonth: currentMonth,
  isLoading: false,
};

export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudgets: (state, action: PayloadAction<Budget[]>) => {
      state.budgets = action.payload;
    },
    addBudget: (state, action: PayloadAction<Budget>) => {
      state.budgets.push(action.payload);
    },
    updateBudget: (state, action: PayloadAction<Budget>) => {
      const idx = state.budgets.findIndex((b) => b.id === action.payload.id);
      if (idx !== -1) {
        state.budgets[idx] = action.payload;
      }
    },
    deleteBudget: (state, action: PayloadAction<string>) => {
      state.budgets = state.budgets.filter((b) => b.id !== action.payload);
    },
    setActiveMonth: (state, action: PayloadAction<string>) => {
      state.activeMonth = action.payload;
    },
  },
});

export const { setBudgets, addBudget, updateBudget, deleteBudget, setActiveMonth } = budgetSlice.actions;
export default budgetSlice.reducer;
