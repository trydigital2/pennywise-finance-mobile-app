import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import { Colors } from "../../theme/colors";
import { Typography } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";
import { Radii } from "../../theme/radii";
import { Shadows } from "../../theme/shadows";
import { DebtItem, DebtPayoffStrategy, compareDebtStrategies } from "../../utils/debtPayoff";
import { formatCurrency } from "../../utils/currency";

export interface DebtPayoffPlannerCardProps {
  debts?: DebtItem[];
  extraMonthlyPaise?: number;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_SAMPLE_DEBTS: DebtItem[] = [
  { id: "1", name: "Credit Card (HDFC)", balancePaise: 4500000, annualInterestRate: 36.0, minimumPaymentPaise: 250000 },
  { id: "2", name: "Personal Loan (ICICI)", balancePaise: 15000000, annualInterestRate: 14.5, minimumPaymentPaise: 420000 },
  { id: "3", name: "Consumer Durable (Bajaj)", balancePaise: 2800000, annualInterestRate: 18.0, minimumPaymentPaise: 200000 },
];

export const DebtPayoffPlannerCard: React.FC<DebtPayoffPlannerCardProps> = ({
  debts = DEFAULT_SAMPLE_DEBTS,
  extraMonthlyPaise = 500000, // ₹5,000 extra per month
  style,
}) => {
  const [activeStrategy, setActiveStrategy] = useState<DebtPayoffStrategy>("avalanche");

  const comparison = compareDebtStrategies(debts, extraMonthlyPaise);
  const currentSummary = activeStrategy === "avalanche" ? comparison.avalanche : comparison.snowball;

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Debt Freedom Planner</Text>
          <Text style={styles.subtitle}>
            Total Debt: {formatCurrency(currentSummary.totalStartingDebtPaise)} · +{formatCurrency(extraMonthlyPaise)}/mo
          </Text>
        </View>
        <View style={styles.recBadge}>
          <Text style={styles.recBadgeText}>
            {activeStrategy === comparison.recommendedStrategy ? "⭐ Recommended" : "Alternative"}
          </Text>
        </View>
      </View>

      {/* Strategy Toggle Tabs */}
      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleTab, activeStrategy === "avalanche" && styles.toggleTabActive]}
          onPress={() => setActiveStrategy("avalanche")}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.toggleTabText, activeStrategy === "avalanche" && styles.toggleTabTextActive]}
          >
            Avalanche (Max Savings)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleTab, activeStrategy === "snowball" && styles.toggleTabActive]}
          onPress={() => setActiveStrategy("snowball")}
          activeOpacity={0.8}
        >
          <Text
            style={[styles.toggleTabText, activeStrategy === "snowball" && styles.toggleTabTextActive]}
          >
            Snowball (Fast Wins)
          </Text>
        </TouchableOpacity>
      </View>

      {/* Summary KPI Cards */}
      <View style={styles.kpiGrid}>
        <View style={styles.kpiItem}>
          <Text style={styles.kpiLabel}>Debt-Free In</Text>
          <Text style={styles.kpiValue}>
            {Math.floor(currentSummary.monthsToDebtFree / 12)}y {currentSummary.monthsToDebtFree % 12}m
          </Text>
        </View>
        <View style={styles.kpiItem}>
          <Text style={styles.kpiLabel}>Total Interest</Text>
          <Text style={[styles.kpiValue, { color: Colors.expense }]}>
            {formatCurrency(currentSummary.totalInterestPaidPaise)}
          </Text>
        </View>
        <View style={styles.kpiItem}>
          <Text style={styles.kpiLabel}>Avalanche Savings</Text>
          <Text style={[styles.kpiValue, { color: Colors.income }]}>
            {formatCurrency(comparison.interestSavedWithAvalanchePaise)}
          </Text>
        </View>
      </View>

      {/* Payoff Priority Order */}
      <View style={styles.orderContainer}>
        <Text style={styles.orderTitle}>
          Priority Elimination Order ({activeStrategy === "avalanche" ? "Highest APR First" : "Lowest Balance First"}):
        </Text>
        <View style={styles.orderPillsRow}>
          {currentSummary.payoffOrder.map((name, index) => (
            <View key={name} style={styles.orderPill}>
              <Text style={styles.orderPillIndex}>#{index + 1}</Text>
              <Text style={styles.orderPillName} numberOfLines={1}>
                {name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tactical Strategy Advice */}
      <View style={styles.adviceBox}>
        <Text style={styles.adviceText}>💡 {comparison.recommendationReason}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.screenPadding,
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadows.sm,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  recBadge: {
    backgroundColor: `${Colors.income}15`,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radii.full,
  },
  recBadgeText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.income,
  },
  toggleRow: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: Radii.sm,
    padding: 3,
    marginBottom: Spacing.md,
  },
  toggleTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    alignItems: "center",
    borderRadius: Radii.xs,
  },
  toggleTabActive: {
    backgroundColor: Colors.surface,
    ...Shadows.sm,
  },
  toggleTabText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  toggleTabTextActive: {
    fontWeight: Typography.fontWeights.bold,
    color: Colors.primary,
  },
  kpiGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.background,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  kpiItem: {
    alignItems: "center",
    flex: 1,
  },
  kpiLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  kpiValue: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  orderContainer: {
    marginBottom: Spacing.md,
  },
  orderTitle: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  orderPillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.xs,
  },
  orderPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    gap: 4,
  },
  orderPillIndex: {
    fontSize: 10,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.primary,
  },
  orderPillName: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textPrimary,
  },
  adviceBox: {
    backgroundColor: `${Colors.primary}08`,
    borderRadius: Radii.sm,
    padding: Spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  adviceText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});

export default DebtPayoffPlannerCard;
