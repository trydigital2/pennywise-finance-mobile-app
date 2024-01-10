import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { updateCurrency, updateUserProfile } from '../../store/slices/userSlice';
import { setAccounts } from '../../store/slices/accountSlice';
import { setTransactions } from '../../store/slices/transactionSlice';
import { setBudgets } from '../../store/slices/budgetSlice';
import { setGoals } from '../../store/slices/goalSlice';
import { setRecurringRules } from '../../store/slices/recurringSlice';
import { setNotifications } from '../../store/slices/notificationSlice';
import { StorageService } from '../../services/storage';
import {
  INITIAL_ACCOUNTS,
  INITIAL_TRANSACTIONS,
  INITIAL_BUDGETS,
  INITIAL_GOALS,
  INITIAL_RECURRING,
  INITIAL_NOTIFICATIONS,
} from '../../data';
import { CurrencyCode } from '../../types';

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.profile);
  const [resetModalVisible, setResetModalVisible] = useState(false);

  const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
    { code: 'INR', label: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', label: 'US Dollar', symbol: '$' },
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'GBP', label: 'British Pound', symbol: '£' },
  ];

  const handleResetDemoData = async () => {
    await StorageService.resetAllToDemo();
    dispatch(setAccounts(INITIAL_ACCOUNTS));
    dispatch(setTransactions(INITIAL_TRANSACTIONS));
    dispatch(setBudgets(INITIAL_BUDGETS));
    dispatch(setGoals(INITIAL_GOALS));
    dispatch(setRecurringRules(INITIAL_RECURRING));
    dispatch(setNotifications(INITIAL_NOTIFICATIONS));
    setResetModalVisible(false);
    Alert.alert('Reset Complete', 'Demo accounts and transactions have been reset.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>KK</Text>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.demoBadge}>
            <Text style={styles.demoBadgeText}>SIMULATED DEMO PROFILE</Text>
          </View>
        </View>

        {/* Currency Selection */}
        <Text style={styles.sectionHeader}>Display Currency</Text>
        <View style={styles.settingsGroup}>
          {currencies.map((curr) => {
            const isSelected = user.preferredCurrency === curr.code;
            return (
              <TouchableOpacity
                key={curr.code}
                activeOpacity={0.7}
                onPress={() => dispatch(updateCurrency(curr.code))}
                style={styles.settingRow}
              >
                <View style={styles.currLabelRow}>
                  <Text style={styles.currSymbol}>{curr.symbol}</Text>
                  <Text style={styles.settingLabel}>{curr.label} ({curr.code})</Text>
                </View>
                {isSelected ? (
                  <Ionicons name="checkmark-circle" size={20} color={Colors.accent} />
                ) : null}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Financial Tools Shortcuts */}
        <Text style={styles.sectionHeader}>Financial Tools</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate('AccountsScreen')}
          >
            <View style={styles.settingIconRow}>
              <Ionicons name="card-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingLabel}>Manage Accounts</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate('RecurringScreen')}
          >
            <View style={styles.settingIconRow}>
              <Ionicons name="repeat-outline" size={20} color={Colors.purple} />
              <Text style={styles.settingLabel}>Recurring Rules</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate('ReportsScreen')}
          >
            <View style={styles.settingIconRow}>
              <Ionicons name="document-text-outline" size={20} color={Colors.info} />
              <Text style={styles.settingLabel}>Monthly Financial Statements</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* App Preferences */}
        <Text style={styles.sectionHeader}>Preferences & Privacy</Text>
        <View style={styles.settingsGroup}>
          <View style={styles.settingRow}>
            <View style={styles.settingIconRow}>
              <Ionicons name="notifications-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingLabel}>Budget Alerts & Notifications</Text>
            </View>
            <Switch
              value={user.notificationsEnabled}
              onValueChange={(val) => { dispatch(updateUserProfile({ notificationsEnabled: val })); }}
              trackColor={{ false: Colors.border, true: Colors.accent }}
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingIconRow}>
              <Ionicons name="finger-print-outline" size={20} color={Colors.primary} />
              <Text style={styles.settingLabel}>Biometric App Lock</Text>
            </View>
            <Switch
              value={user.biometricsEnabled}
              onValueChange={(val) => { dispatch(updateUserProfile({ biometricsEnabled: val })); }}
              trackColor={{ false: Colors.border, true: Colors.accent }}
            />
          </View>
        </View>

        {/* Danger Zone: Reset Data */}
        <Text style={styles.sectionHeader}>Data Management</Text>
        <View style={styles.settingsGroup}>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => setResetModalVisible(true)}
          >
            <View style={styles.settingIconRow}>
              <Ionicons name="refresh-circle-outline" size={22} color={Colors.expense} />
              <Text style={[styles.settingLabel, { color: Colors.expense }]}>
                Reset to Demo Data
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* App Info & Disclaimer */}
        <View style={styles.appInfoBox}>
          <Text style={styles.appName}>PennyWise v1.0.0</Text>
          <Text style={styles.appDisclaimer}>
            Personal Finance & Wealth Tracker Demo. All balances, accounts, and calculations are local simulations. No real financial services or bank integrations are utilized.
          </Text>
        </View>
      </ScrollView>

      {/* Reset Confirmation Dialog */}
      <ConfirmationDialog
        visible={resetModalVisible}
        title="Reset Demo Data"
        message="This will restore all default accounts, transactions, budgets, and savings goals to their initial state. Continue?"
        confirmText="Reset All Data"
        isDestructive
        onConfirm={handleResetDemoData}
        onCancel={() => setResetModalVisible(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  userCard: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textInverse,
  },
  userName: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  userEmail: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  demoBadge: {
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.full,
    marginTop: 8,
  },
  demoBadgeText: {
    fontSize: 9,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  sectionHeader: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 8,
    marginTop: 10,
  },
  settingsGroup: {
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: Spacing.screenPadding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  currLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currSymbol: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.primary,
    width: 24,
  },
  settingIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  settingLabel: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
  },
  appInfoBox: {
    alignItems: 'center',
    padding: 24,
    marginTop: 10,
  },
  appName: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  appDisclaimer: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
});
