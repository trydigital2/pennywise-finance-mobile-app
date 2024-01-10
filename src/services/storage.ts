import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account, Budget, SavingsGoal, Transaction, RecurringRule, AppNotification, UserProfile } from '../types';
import {
  INITIAL_ACCOUNTS,
  INITIAL_BUDGETS,
  INITIAL_GOALS,
  INITIAL_NOTIFICATIONS,
  INITIAL_RECURRING,
  INITIAL_TRANSACTIONS,
  INITIAL_USER,
} from '../data';

export const STORAGE_KEYS = {
  TRANSACTIONS: '@pennywise_transactions_v1',
  ACCOUNTS: '@pennywise_accounts_v1',
  BUDGETS: '@pennywise_budgets_v1',
  GOALS: '@pennywise_goals_v1',
  RECURRING: '@pennywise_recurring_v1',
  NOTIFICATIONS: '@pennywise_notifications_v1',
  USER_PROFILE: '@pennywise_user_profile_v1',
  ONBOARDING: '@pennywise_onboarding_completed_v1',
};

export const StorageService = {
  // Generic Helpers
  async getItem<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (raw !== null) {
        return JSON.parse(raw) as T;
      }
      return defaultValue;
    } catch (error) {
      console.warn(`[StorageService] Failed to read ${key}:`, error);
      return defaultValue;
    }
  },

  async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`[StorageService] Failed to save ${key}:`, error);
      return false;
    }
  },

  // Transactions
  async loadTransactions(): Promise<Transaction[]> {
    return this.getItem<Transaction[]>(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
  },

  async saveTransactions(items: Transaction[]): Promise<boolean> {
    return this.setItem(STORAGE_KEYS.TRANSACTIONS, items);
  },

  // Accounts
  async loadAccounts(): Promise<Account[]> {
    return this.getItem<Account[]>(STORAGE_KEYS.ACCOUNTS, INITIAL_ACCOUNTS);
  },

  async saveAccounts(items: Account[]): Promise<boolean> {
    return this.setItem(STORAGE_KEYS.ACCOUNTS, items);
  },

  // Budgets
  async loadBudgets(): Promise<Budget[]> {
    return this.getItem<Budget[]>(STORAGE_KEYS.BUDGETS, INITIAL_BUDGETS);
  },

  async saveBudgets(items: Budget[]): Promise<boolean> {
    return this.setItem(STORAGE_KEYS.BUDGETS, items);
  },

  // Savings Goals
  async loadGoals(): Promise<SavingsGoal[]> {
    return this.getItem<SavingsGoal[]>(STORAGE_KEYS.GOALS, INITIAL_GOALS);
  },

  async saveGoals(items: SavingsGoal[]): Promise<boolean> {
    return this.setItem(STORAGE_KEYS.GOALS, items);
  },

  // Recurring
  async loadRecurring(): Promise<RecurringRule[]> {
    return this.getItem<RecurringRule[]>(STORAGE_KEYS.RECURRING, INITIAL_RECURRING);
  },

  async saveRecurring(items: RecurringRule[]): Promise<boolean> {
    return this.setItem(STORAGE_KEYS.RECURRING, items);
  },

  // Notifications
  async loadNotifications(): Promise<AppNotification[]> {
    return this.getItem<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  async saveNotifications(items: AppNotification[]): Promise<boolean> {
    return this.setItem(STORAGE_KEYS.NOTIFICATIONS, items);
  },

  // User Profile
  async loadUser(): Promise<UserProfile> {
    return this.getItem<UserProfile>(STORAGE_KEYS.USER_PROFILE, INITIAL_USER);
  },

  async saveUser(user: UserProfile): Promise<boolean> {
    return this.setItem(STORAGE_KEYS.USER_PROFILE, user);
  },

  // Reset all to Demo Data
  async resetAllToDemo(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TRANSACTIONS,
        STORAGE_KEYS.ACCOUNTS,
        STORAGE_KEYS.BUDGETS,
        STORAGE_KEYS.GOALS,
        STORAGE_KEYS.RECURRING,
        STORAGE_KEYS.NOTIFICATIONS,
        STORAGE_KEYS.USER_PROFILE,
      ]);
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS)],
        [STORAGE_KEYS.ACCOUNTS, JSON.stringify(INITIAL_ACCOUNTS)],
        [STORAGE_KEYS.BUDGETS, JSON.stringify(INITIAL_BUDGETS)],
        [STORAGE_KEYS.GOALS, JSON.stringify(INITIAL_GOALS)],
        [STORAGE_KEYS.RECURRING, JSON.stringify(INITIAL_RECURRING)],
        [STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_NOTIFICATIONS)],
        [STORAGE_KEYS.USER_PROFILE, JSON.stringify(INITIAL_USER)],
      ]);
    } catch (error) {
      console.warn('[StorageService] Failed to reset demo data:', error);
    }
  },
};
