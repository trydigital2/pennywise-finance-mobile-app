import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppNavigator } from './AppNavigator';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { TransactionDetailScreen } from '../screens/transactions/TransactionDetailScreen';
import { AccountsScreen } from '../screens/accounts/AccountsScreen';
import { AnalyticsScreen } from '../screens/analytics/AnalyticsScreen';
import { ReportsScreen } from '../screens/reports/ReportsScreen';
import { NotificationsScreen } from '../screens/notifications/NotificationsScreen';
import { RecurringScreen } from '../screens/recurring/RecurringScreen';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { completeOnboarding } from '../store/slices/userSlice';
import { StorageService, STORAGE_KEYS } from '../services/storage';

export type RootStackParamList = {
  MainTabs: undefined;
  Onboarding: undefined;
  TransactionDetailScreen: { transactionId: string };
  AccountsScreen: undefined;
  AnalyticsScreen: undefined;
  ReportsScreen: undefined;
  NotificationsScreen: undefined;
  RecurringScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const onboardingCompleted = useAppSelector((state) => state.user.profile.onboardingCompleted);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function checkOnboarding() {
      const completed = await StorageService.getItem<boolean>(STORAGE_KEYS.ONBOARDING, false);
      if (completed) {
        dispatch(completeOnboarding());
      }
      setIsReady(true);
    }
    checkOnboarding();
  }, [dispatch]);

  if (!isReady) {
    return null; // Or Splash
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      {!onboardingCompleted ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : null}

      <Stack.Screen name="MainTabs" component={AppNavigator} />
      <Stack.Screen name="TransactionDetailScreen" component={TransactionDetailScreen} />
      <Stack.Screen name="AccountsScreen" component={AccountsScreen} />
      <Stack.Screen name="AnalyticsScreen" component={AnalyticsScreen} />
      <Stack.Screen name="ReportsScreen" component={ReportsScreen} />
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      <Stack.Screen name="RecurringScreen" component={RecurringScreen} />
    </Stack.Navigator>
  );
};
