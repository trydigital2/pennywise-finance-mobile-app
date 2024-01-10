import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { Header } from '../../components/common/Header';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useAppSelector } from '../../store/hooks';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateNetCashFlow,
  calculateSavingsRate,
} from '../../utils/calculations';
import { formatCurrency } from '../../utils/currency';
import { formatMonthYear } from '../../utils/date';
import { exportTransactionsToCSV } from '../../services/csvExport';

export const ReportsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const transactions = useAppSelector((state) => state.transaction.transactions);
  const user = useAppSelector((state) => state.user.profile);

  const [selectedMonth, setSelectedMonth] = useState('2026-10');

  const currentMonthStart = `${selectedMonth}-01`;
  const currentMonthEnd = `${selectedMonth}-31`;

  const income = useMemo(
    () => calculateTotalIncome(transactions, currentMonthStart, currentMonthEnd),
    [transactions, currentMonthStart, currentMonthEnd]
  );

  const expense = useMemo(
    () => calculateTotalExpenses(transactions, currentMonthStart, currentMonthEnd),
    [transactions, currentMonthStart, currentMonthEnd]
  );

  const netSavings = useMemo(
    () => calculateNetCashFlow(transactions, currentMonthStart, currentMonthEnd),
    [transactions, currentMonthStart, currentMonthEnd]
  );

  const savingsRate = useMemo(
    () => calculateSavingsRate(income, expense),
    [income, expense]
  );

  // Previous month calculation
  const prevMonthKey = selectedMonth === '2026-10' ? '2026-09' : '2026-08';
  const prevIncome = useMemo(
    () => calculateTotalIncome(transactions, `${prevMonthKey}-01`, `${prevMonthKey}-31`),
    [transactions, prevMonthKey]
  );
  const prevExpense = useMemo(
    () => calculateTotalExpenses(transactions, `${prevMonthKey}-01`, `${prevMonthKey}-31`),
    [transactions, prevMonthKey]
  );

  const expenseDifference = expense - prevExpense;
  const isSpendingIncreased = expenseDifference > 0;

  const handleExport = () => {
    const monthTransactions = transactions.filter(
      (t) => t.date >= currentMonthStart && t.date <= currentMonthEnd
    );
    const csvContent = exportTransactionsToCSV(monthTransactions);
    Alert.alert(
      'Statement Exported (CSV)',
      'Successfully generated CSV report with ' + monthTransactions.length + ' transactions for ' + formatMonthYear(selectedMonth) + ' (' + csvContent.length + ' bytes).',
      [{ text: 'Done' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Financial Statement"
        showBack
        onBack={() => navigation.goBack()}
        subtitle="Monthly P&L Report"
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Month Picker */}
        <View style={styles.monthTabs}>
          {['2026-10', '2026-09', '2026-08'].map((m) => {
            const isSelected = selectedMonth === m;
            return (
              <TouchableOpacity
                key={m}
                activeOpacity={0.7}
                onPress={() => setSelectedMonth(m)}
                style={[styles.monthTab, isSelected ? styles.activeMonthTab : null]}
              >
                <Text style={[styles.monthTabText, isSelected ? styles.activeMonthTabText : null]}>
                  {formatMonthYear(m)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Hero Statement Card */}
        <View style={[styles.statementCard, Shadows.md]}>
          <Text style={styles.statementMonth}>{formatMonthYear(selectedMonth)}</Text>
          <Text style={styles.statementSub}>Income & Expense Performance</Text>

          <View style={styles.kpiGrid}>
            <View style={styles.kpiItem}>
              <Text style={styles.kpiLabel}>TOTAL INFLOW</Text>
              <Text style={[styles.kpiValue, { color: Colors.income }]}>
                +{formatCurrency(income, user.preferredCurrency, false)}
              </Text>
            </View>

            <View style={styles.kpiDivider} />

            <View style={styles.kpiItem}>
              <Text style={styles.kpiLabel}>TOTAL OUTFLOW</Text>
              <Text style={[styles.kpiValue, { color: Colors.expense }]}>
                -{formatCurrency(expense, user.preferredCurrency, false)}
              </Text>
            </View>
          </View>

          <View style={styles.netSavingsBanner}>
            <Text style={styles.netSavingsLabel}>NET ACCUMULATED SAVINGS</Text>
            <Text style={styles.netSavingsValue}>
              {netSavings >= 0 ? '+' : ''}{formatCurrency(netSavings, user.preferredCurrency, false)}
            </Text>
            <Text style={styles.savingsRateTag}>
              Savings Rate: {savingsRate}%
            </Text>
          </View>
        </View>

        {/* Comparison with Previous Month */}
        <View style={[styles.comparisonCard, Shadows.sm]}>
          <Text style={styles.compTitle}>Previous Month Comparison</Text>
          <Text style={styles.compSub}>vs {formatMonthYear(prevMonthKey)}</Text>

          <View style={styles.compRow}>
            <View>
              <Text style={styles.compLabel}>Spending Change</Text>
              <Text
                style={[
                  styles.compAmount,
                  { color: isSpendingIncreased ? Colors.expense : Colors.income },
                ]}
              >
                {isSpendingIncreased ? '+' : ''}
                {formatCurrency(expenseDifference, user.preferredCurrency, false)}
              </Text>
            </View>
            <View style={styles.compIconBox}>
              <Ionicons
                name={isSpendingIncreased ? 'arrow-up-circle' : 'arrow-down-circle'}
                size={32}
                color={isSpendingIncreased ? Colors.expense : Colors.income}
              />
            </View>
          </View>
        </View>

        {/* Export Action */}
        <PrimaryButton
          title="Export Statement (CSV)"
          onPress={handleExport}
          icon={<Ionicons name="download-outline" size={18} color="#FFF" />}
          size="lg"
          style={styles.exportBtn}
        />
      </ScrollView>
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
  monthTabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 12,
    gap: 8,
  },
  monthTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Radii.md,
    backgroundColor: Colors.surfaceSecondary,
  },
  activeMonthTab: {
    backgroundColor: Colors.primary,
  },
  monthTabText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  activeMonthTabText: {
    color: '#FFF',
    fontWeight: Typography.fontWeights.bold,
  },
  statementCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.screenPadding,
    marginVertical: 10,
  },
  statementMonth: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.textInverse,
  },
  statementSub: {
    fontSize: Typography.fontSizes.xs,
    color: '#94A3B8',
    marginBottom: 16,
  },
  kpiGrid: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: Radii.md,
    padding: 12,
    marginBottom: 14,
  },
  kpiItem: {
    flex: 1,
    alignItems: 'center',
  },
  kpiLabel: {
    fontSize: 9,
    color: '#CBD5E1',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  kpiValue: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
  },
  kpiDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 8,
  },
  netSavingsBanner: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: Radii.md,
    padding: 14,
    alignItems: 'center',
  },
  netSavingsLabel: {
    fontSize: 9,
    fontWeight: Typography.fontWeights.semibold,
    color: '#A7F3D0',
    letterSpacing: 0.5,
  },
  netSavingsValue: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.heavy,
    color: '#34D399',
    marginTop: 2,
  },
  savingsRateTag: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: '#FFF',
    marginTop: 4,
  },
  comparisonCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: 16,
    marginHorizontal: Spacing.screenPadding,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  compTitle: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  compSub: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  compRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
  },
  compAmount: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    marginTop: 2,
  },
  compIconBox: {
    padding: 4,
  },
  exportBtn: {
    marginHorizontal: Spacing.screenPadding,
    marginTop: 18,
  },
});
