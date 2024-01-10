import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { formatCurrency } from '../../utils/currency';
import { CurrencyCode } from '../../types';

interface BalanceCardProps {
  totalBalancePaise: number;
  monthlyIncomePaise: number;
  monthlyExpensePaise: number;
  currency?: CurrencyCode;
  onAddIncome: () => void;
  onAddExpense: () => void;
  onViewAccounts: () => void;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  totalBalancePaise,
  monthlyIncomePaise,
  monthlyExpensePaise,
  currency = 'INR',
  onAddIncome,
  onAddExpense,
  onViewAccounts,
}) => {
  return (
    <View style={[styles.card, Shadows.lg]}>
      {/* Header */}
      <View style={styles.topRow}>
        <View>
          <Text style={styles.label}>TOTAL LIQUID BALANCE</Text>
          <Text style={styles.balanceText}>
            {formatCurrency(totalBalancePaise, currency, false)}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onViewAccounts}
          style={styles.accountsBtn}
        >
          <Text style={styles.accountsBtnText}>Accounts</Text>
          <Ionicons name="chevron-forward" size={14} color={Colors.textInverse} />
        </TouchableOpacity>
      </View>

      {/* Monthly In/Out Pill */}
      <View style={styles.statsRow}>
        <View style={styles.statPill}>
          <View style={[styles.iconDot, { backgroundColor: Colors.income }]}>
            <Ionicons name="arrow-down" size={12} color="#FFF" />
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Month Income</Text>
            <Text style={[styles.statValue, { color: '#34D399' }]}>
              +{formatCurrency(monthlyIncomePaise, currency, false)}
            </Text>
          </View>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statPill}>
          <View style={[styles.iconDot, { backgroundColor: Colors.expense }]}>
            <Ionicons name="arrow-up" size={12} color="#FFF" />
          </View>
          <View style={styles.statColumn}>
            <Text style={styles.statLabel}>Month Expense</Text>
            <Text style={[styles.statValue, { color: '#FB7185' }]}>
              -{formatCurrency(monthlyExpensePaise, currency, false)}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onAddIncome}
          style={[styles.actionBtn, styles.incomeActionBtn]}
        >
          <Ionicons name="add-circle" size={18} color="#FFF" />
          <Text style={styles.actionBtnText}>Add Income</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onAddExpense}
          style={[styles.actionBtn, styles.expenseActionBtn]}
        >
          <Ionicons name="remove-circle" size={18} color="#FFF" />
          <Text style={styles.actionBtnText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primary,
    borderRadius: Radii.xl,
    padding: Spacing.xl,
    marginHorizontal: Spacing.screenPadding,
    marginVertical: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 4,
  },
  balanceText: {
    fontSize: Typography.fontSizes.display,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.textInverse,
  },
  accountsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radii.full,
  },
  accountsBtnText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textInverse,
    fontWeight: Typography.fontWeights.medium,
    marginRight: 2,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: Radii.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  statPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  statColumn: {
    flex: 1,
  },
  statLabel: {
    fontSize: Typography.fontSizes.xs,
    color: '#CBD5E1',
  },
  statValue: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: Radii.md,
    gap: 6,
  },
  incomeActionBtn: {
    backgroundColor: Colors.income,
  },
  expenseActionBtn: {
    backgroundColor: Colors.expense,
  },
  actionBtnText: {
    color: '#FFF',
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
  },
});
