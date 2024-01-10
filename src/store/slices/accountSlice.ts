import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../types';
import { INITIAL_ACCOUNTS } from '../../data';

interface AccountState {
  accounts: Account[];
  isLoading: boolean;
}

const initialState: AccountState = {
  accounts: INITIAL_ACCOUNTS,
  isLoading: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload);
    },
    updateAccountBalance: (
      state,
      action: PayloadAction<{ accountId: string; amountPaiseChange: number }>
    ) => {
      const acc = state.accounts.find((a) => a.id === action.payload.accountId);
      if (acc) {
        acc.balancePaise += action.payload.amountPaiseChange;
        acc.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { setAccounts, addAccount, updateAccountBalance } = accountSlice.actions;
export default accountSlice.reducer;
