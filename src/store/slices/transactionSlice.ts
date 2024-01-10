import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Transaction, TransactionFilter } from '../../types';
import { INITIAL_TRANSACTIONS } from '../../data';

interface TransactionState {
  transactions: Transaction[];
  filter: TransactionFilter;
  isLoading: boolean;
}

const initialState: TransactionState = {
  transactions: INITIAL_TRANSACTIONS,
  filter: {
    type: 'all',
    sortBy: 'date_desc',
  },
  isLoading: false,
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter((t) => t.id !== action.payload);
    },
    setFilter: (state, action: PayloadAction<Partial<TransactionFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilter: (state) => {
      state.filter = {
        type: 'all',
        sortBy: 'date_desc',
      };
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilter,
  resetFilter,
} = transactionSlice.actions;

export default transactionSlice.reducer;
