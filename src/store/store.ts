import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './slices/accountSlice';
import transactionReducer from './slices/transactionSlice';
import budgetReducer from './slices/budgetSlice';
import goalReducer from './slices/goalSlice';
import recurringReducer from './slices/recurringSlice';
import notificationReducer from './slices/notificationSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    transaction: transactionReducer,
    budget: budgetReducer,
    goal: goalReducer,
    recurring: recurringReducer,
    notification: notificationReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
