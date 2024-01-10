import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { formatCurrency } from '../../utils/currency';
import { CurrencyCode } from '../../types';

interface SummaryCardProps {
  netCashFlowPaise: number;
  savingsRatePercent: number;
  availableBudgetPaise: number;
  currency?: CurrencyCode;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  netCashFlowPaise,
  savingsRatePercent,
  availableBudgetPaise,
  currency = 'INR',
}) => {
  const isPositive = netCashFlowPaise >= 0;

  return (
    <View style={[styles.container, Shadows.sm]}>
      {/* Net Savings */}
      <View style={styles.metric}>
        <View style={styles.headerRow}>
          <Ionicons
            name={isPositive ? 'trending-up' : 'trending-down'}
            size={16}
            color={isPositive ? Colors.income : Colors.expense}
          />
          <Text style={styles.metricLabel}>Net Cash Flow</Text>
        </View>
        <Text
          style={[
            styles.metricValue,
            { color: isPositive ? Colors.income : Colors.expense },
          ]}
        >
          {isPositive ? '+' : ''}
          {formatCurrency(netCashFlowPaise, currency, false)}
        </Text>
      </View>

      <View style={styles.separator} />

      {/* Savings Rate */}
      <View style={styles.metric}>
        <View style={styles.headerRow}>
          <Ionicons name="pie-chart-outline" size={16} color={Colors.accent} />
          <Text style={styles.metricLabel}>Savings Rate</Text>
        </View>
        <Text style={[styles.metricValue, { color: Colors.textPrimary }]}>
          {savingsRatePercent}%
        </Text>
      </View>

      <View style={styles.separator} />

      {/* Remaining Budget */}
      <View style={styles.metric}>
        <View style={styles.headerRow}>
          <Ionicons name="wallet-outline" size={16} color={Colors.info} />
          <Text style={styles.metricLabel}>Budget Left</Text>
        </View>
        <Text style={[styles.metricValue, { color: Colors.textPrimary }]}>
          {formatCurrency(availableBudgetPaise, currency, false)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.screenPadding,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  metric: {
    flex: 1,
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  metricValue: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
  },
  separator: {
    width: 1,
    height: '80%',
    backgroundColor: Colors.borderLight,
    alignSelf: 'center',
  },
});
