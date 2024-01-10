import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { RootNavigator } from './src/navigation/RootNavigator';
import { StorageService } from './src/services/storage';
import { setAccounts } from './src/store/slices/accountSlice';
import { setTransactions } from './src/store/slices/transactionSlice';
import { setBudgets } from './src/store/slices/budgetSlice';
import { setGoals } from './src/store/slices/goalSlice';
import { setRecurringRules } from './src/store/slices/recurringSlice';
import { setNotifications } from './src/store/slices/notificationSlice';
import { setUserProfile } from './src/store/slices/userSlice';

function AppInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function loadPersistedData() {
      try {
        const [accounts, transactions, budgets, goals, recurring, notifications, user] =
          await Promise.all([
            StorageService.loadAccounts(),
            StorageService.loadTransactions(),
            StorageService.loadBudgets(),
            StorageService.loadGoals(),
            StorageService.loadRecurring(),
            StorageService.loadNotifications(),
            StorageService.loadUser(),
          ]);

        store.dispatch(setAccounts(accounts));
        store.dispatch(setTransactions(transactions));
        store.dispatch(setBudgets(budgets));
        store.dispatch(setGoals(goals));
        store.dispatch(setRecurringRules(recurring));
        store.dispatch(setNotifications(notifications));
        store.dispatch(setUserProfile(user));
      } catch (e) {
        console.warn('[PennyWise] Failed to hydrate persisted data:', e);
      }
    }

    loadPersistedData();
  }, []);

  return <>{children}</>;
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppInitializer>
          <NavigationContainer>
            <StatusBar style="dark" />
            <RootNavigator />
          </NavigationContainer>
        </AppInitializer>
      </SafeAreaProvider>
    </Provider>
  );
}
