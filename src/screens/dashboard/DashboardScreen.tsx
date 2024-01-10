import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { BalanceCard } from '../../components/common/BalanceCard';
import { SummaryCard } from '../../components/common/SummaryCard';
import { TransactionItem } from '../../components/common/TransactionItem';
import { BudgetProgressCard } from '../../components/common/BudgetProgressCard';
import { SavingsGoalCard } from '../../components/common/SavingsGoalCard';
import { SpendingChart } from '../../components/common/SpendingChart';
import { AddTransactionModal } from '../../components/modals/AddTransactionModal';
import { AddGoalModal } from '../../components/modals/AddGoalModal';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addTransaction } from '../../store/slices/transactionSlice';
import { updateAccountBalance } from '../../store/slices/accountSlice';
import { addGoal, addContribution } from '../../store/slices/goalSlice';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateNetCashFlow,
  calculateSavingsRate,
  calculateBudgetStatus,
  calculateCategorySpending,
} from '../../utils/calculations';
import { getCurrentMonthKey } from '../../utils/date';
import { DEFAULT_CATEGORIES } from '../../constants/CATEGORIES';
import { Transaction, TransactionType } from '../../types';

export const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<TransactionType>('expense');
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  // Redux State
  const accounts = useAppSelector((state) => state.account.accounts);
  const transactions = useAppSelector((state) => state.transaction.transactions);
  const budgets = useAppSelector((state) => state.budget.budgets);
  const goals = useAppSelector((state) => state.goal.goals);
  const notifications = useAppSelector((state) => state.notification.notifications);
  const user = useAppSelector((state) => state.user.profile);

  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;
  const currentMonth = getCurrentMonthKey(); // e.g. "2026-10"

  // Current Month Calculations
  const startOfMonth = `${currentMonth}-01`;
  const endOfMonth = `${currentMonth}-31`;

  const totalBalancePaise = useMemo(
    () => accounts.reduce((sum, acc) => sum + acc.balancePaise, 0),
    [accounts]
  );

  const monthlyIncomePaise = useMemo(
    () => calculateTotalIncome(transactions, startOfMonth, endOfMonth),
    [transactions, startOfMonth, endOfMonth]
  );

  const monthlyExpensePaise = useMemo(
    () => calculateTotalExpenses(transactions, startOfMonth, endOfMonth),
    [transactions, startOfMonth, endOfMonth]
  );

  const netCashFlowPaise = useMemo(
    () => calculateNetCashFlow(transactions, startOfMonth, endOfMonth),
    [transactions, startOfMonth, endOfMonth]
  );

  const savingsRatePercent = useMemo(
    () => calculateSavingsRate(monthlyIncomePaise, monthlyExpensePaise),
    [monthlyIncomePaise, monthlyExpensePaise]
  );

  // Monthly Budget Overview
  const activeBudgets = useMemo(
    () => budgets.filter((b) => b.month === currentMonth),
    [budgets, currentMonth]
  );

  const totalBudgetLimitPaise = useMemo(
    () => activeBudgets.reduce((sum, b) => sum + b.monthlyLimitPaise, 0),
    [activeBudgets]
  );

  const availableBudgetPaise = Math.max(0, totalBudgetLimitPaise - monthlyExpensePaise);

  // 3-Month Bar Chart Data
  const chartData = useMemo(() => {
    const months = [
      { key: '2026-08', label: 'Aug' },
      { key: '2026-09', label: 'Sep' },
      { key: '2026-10', label: 'Oct' },
    ];

    return months.map((m) => {
      const start = `${m.key}-01`;
      const end = `${m.key}-31`;
      return {
        label: m.label,
        incomePaise: calculateTotalIncome(transactions, start, end),
        expensePaise: calculateTotalExpenses(transactions, start, end),
      };
    });
  }, [transactions]);

  // Category Spending breakdown
  const categorySpending = useMemo(
    () => calculateCategorySpending(transactions, startOfMonth, endOfMonth),
    [transactions, startOfMonth, endOfMonth]
  );

  const topCategories = useMemo(() => {
    return Object.entries(categorySpending)
      .map(([catId, spentPaise]) => {
        const cat = DEFAULT_CATEGORIES.find((c) => c.id === catId);
        return {
          catId,
          name: cat?.name || 'General',
          color: cat?.color || '#3B82F6',
          icon: cat?.icon || 'pricetag-outline',
          spentPaise,
          percentage: monthlyExpensePaise > 0 ? Math.round((spentPaise / monthlyExpensePaise) * 100) : 0,
        };
      })
      .sort((a, b) => b.spentPaise - a.spentPaise)
      .slice(0, 4);
  }, [categorySpending, monthlyExpensePaise]);

  // Recent Transactions
  const recentTransactions = useMemo(
    () => transactions.slice(0, 5),
    [transactions]
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  };

  const handleOpenAdd = (type: TransactionType) => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleSaveTransaction = (data: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...data,
      id: `tx_${Date.now()}`,
    };
    dispatch(addTransaction(newTx));

    // Update corresponding account balance
    const balanceChange = data.type === 'income' ? data.amountPaise : -data.amountPaise;
    dispatch(
      updateAccountBalance({
        accountId: data.accountId,
        amountPaiseChange: balanceChange,
      })
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Text style={styles.greetingText}>Welcome back,</Text>
          <Text style={styles.userName}>{user.name} 👋</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('AnalyticsScreen')}
            style={styles.iconBtn}
          >
            <Ionicons name="stats-chart-outline" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('NotificationsScreen')}
            style={styles.iconBtn}
          >
            <Ionicons name="notifications-outline" size={20} color={Colors.textPrimary} />
            {unreadNotifsCount > 0 ? (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{unreadNotifsCount}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />}
      >
        {/* Main Balance Card */}
        <BalanceCard
          totalBalancePaise={totalBalancePaise}
          monthlyIncomePaise={monthlyIncomePaise}
          monthlyExpensePaise={monthlyExpensePaise}
          currency={user.preferredCurrency}
          onAddIncome={() => handleOpenAdd('income')}
          onAddExpense={() => handleOpenAdd('expense')}
          onViewAccounts={() => navigation.navigate('AccountsScreen')}
        />

        {/* 3-Pill Financial Metric Summary */}
        <SummaryCard
          netCashFlowPaise={netCashFlowPaise}
          savingsRatePercent={savingsRatePercent}
          availableBudgetPaise={availableBudgetPaise}
          currency={user.preferredCurrency}
        />

        {/* Cash-Flow Bar Chart */}
        <SpendingChart data={chartData} currency={user.preferredCurrency} />

        {/* Top Spending Categories Preview */}
        {topCategories.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Top Spending Categories</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AnalyticsScreen')}>
                <Text style={styles.seeAllText}>Deep Analytics</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categoryGrid}>
              {topCategories.map((cat) => (
                <View key={cat.catId} style={styles.catCard}>
                  <View style={[styles.catIconBox, { backgroundColor: `${cat.color}15` }]}>
                    <Ionicons name={cat.icon as any} size={20} color={cat.color} />
                  </View>
                  <Text style={styles.catName} numberOfLines={1}>{cat.name}</Text>
                  <Text style={styles.catPercent}>{cat.percentage}% of month</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {/* Recent Transactions Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsCard}>
            {recentTransactions.map((tx) => {
              const cat = DEFAULT_CATEGORIES.find((c) => c.id === tx.categoryId);
              const acc = accounts.find((a) => a.id === tx.accountId);
              return (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  category={cat}
                  account={acc}
                  currency={user.preferredCurrency}
                  onPress={() => navigation.navigate('TransactionDetailScreen', { transactionId: tx.id })}
                />
              );
            })}
          </View>
        </View>

        {/* Savings Goals Preview */}
        {goals.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Savings Goals</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Goals')}>
                <Text style={styles.seeAllText}>View All ({goals.length})</Text>
              </TouchableOpacity>
            </View>

            {goals.slice(0, 2).map((goal) => (
              <SavingsGoalCard
                key={goal.id}
                goal={goal}
                currency={user.preferredCurrency}
                onPress={() => navigation.navigate('Goals')}
                onAddFunds={() => {
                  dispatch(
                    addContribution({
                      goalId: goal.id,
                      contribution: {
                        id: `gc_${Date.now()}`,
                        goalId: goal.id,
                        amountPaise: 1000000, // ₹10,000 quick deposit
                        date: new Date().toISOString(),
                        notes: 'Quick contribution from dashboard',
                      },
                    })
                  );
                }}
              />
            ))}
          </View>
        ) : null}

        {/* Monthly Budget Preview */}
        {activeBudgets.length > 0 ? (
          <View style={[styles.section, { marginBottom: 30 }]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Monthly Budgets</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Budgets')}>
                <Text style={styles.seeAllText}>Manage Budgets</Text>
              </TouchableOpacity>
            </View>

            {activeBudgets.slice(0, 3).map((b) => {
              const status = calculateBudgetStatus(b, transactions, DEFAULT_CATEGORIES);
              return (
                <BudgetProgressCard
                  key={b.id}
                  status={status}
                  currency={user.preferredCurrency}
                  onPress={() => navigation.navigate('Budgets')}
                />
              );
            })}
          </View>
        ) : null}
      </ScrollView>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        visible={modalVisible}
        accounts={accounts}
        existingTransactions={transactions}
        currency={user.preferredCurrency}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTransaction}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  userInfo: {
    flex: 1,
  },
  greetingText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  userName: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.expense,
    minWidth: 14,
    height: 14,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  notifBadgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: Typography.fontWeights.bold,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.accent,
  },
  categoryGrid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenPadding,
    gap: 10,
  },
  catCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
  },
  catIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  catName: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  catPercent: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  transactionsCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    marginHorizontal: Spacing.screenPadding,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
});
