import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RecurringRule } from '../../types';
import { INITIAL_RECURRING } from '../../data';

interface RecurringState {
  rules: RecurringRule[];
  isLoading: boolean;
}

const initialState: RecurringState = {
  rules: INITIAL_RECURRING,
  isLoading: false,
};

export const recurringSlice = createSlice({
  name: 'recurring',
  initialState,
  reducers: {
    setRecurringRules: (state, action: PayloadAction<RecurringRule[]>) => {
      state.rules = action.payload;
    },
    addRecurringRule: (state, action: PayloadAction<RecurringRule>) => {
      state.rules.push(action.payload);
    },
    updateRecurringRule: (state, action: PayloadAction<RecurringRule>) => {
      const idx = state.rules.findIndex((r) => r.id === action.payload.id);
      if (idx !== -1) {
        state.rules[idx] = action.payload;
      }
    },
    deleteRecurringRule: (state, action: PayloadAction<string>) => {
      state.rules = state.rules.filter((r) => r.id !== action.payload);
    },
    toggleRuleActive: (state, action: PayloadAction<string>) => {
      const rule = state.rules.find((r) => r.id === action.payload);
      if (rule) {
        rule.isActive = !rule.isActive;
      }
    },
  },
});

export const {
  setRecurringRules,
  addRecurringRule,
  updateRecurringRule,
  deleteRecurringRule,
  toggleRuleActive,
} = recurringSlice.actions;

export default recurringSlice.reducer;
