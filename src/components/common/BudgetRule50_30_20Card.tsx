import React from "react";
import { View, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { Colors } from "../../theme/colors";
import { Typography } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";
import { Radii } from "../../theme/radii";
import { Shadows } from "../../theme/shadows";
import { Budget50_30_20_Result } from "../../utils/savingsOptimizer";
import { formatCurrency } from "../../utils/currency";

export interface BudgetRule50_30_20CardProps {
  budgetResult: Budget50_30_20_Result;
  style?: StyleProp<ViewStyle>;
}

export const BudgetRule50_30_20Card: React.FC<BudgetRule50_30_20CardProps> = ({
  budgetResult,
  style,
}) => {
  const getHealthBadgeColor = () => {
    switch (budgetResult.allocationHealth) {
      case "Optimized":
      case "High Saver":
        return Colors.income;
      case "Wants Heavy":
        return Colors.warning;
      default:
        return Colors.expense;
    }
  };

  const renderBucketBar = (
    label: string,
    targetPct: number,
    actualPct: number,
    actualAmount: number,
    fillColor: string
  ) => {
    const isOver = actualPct > targetPct + 2;
    return (
      <View style={styles.bucketItem}>
        <View style={styles.bucketHeader}>
          <Text style={styles.bucketLabel}>
            {label} ({actualPct}% / {targetPct}%)
          </Text>
          <Text style={[styles.bucketAmount, isOver && { color: Colors.expense }]}>
            {formatCurrency(actualAmount)}
          </Text>
        </View>
        <View style={styles.barTrack}>
          <View
            style={[
              styles.barFill,
              {
                width: `${Math.min(100, actualPct)}%`,
                backgroundColor: fillColor,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>50 / 30 / 20 Budget Rule</Text>
          <Text style={styles.subtitle}>Allocation Health & Breakdown</Text>
        </View>
        <View style={[styles.healthBadge, { backgroundColor: getHealthBadgeColor() + "20" }]}>
          <Text style={[styles.healthBadgeText, { color: getHealthBadgeColor() }]}>
            {budgetResult.allocationHealth}
          </Text>
        </View>
      </View>

      <View style={styles.bucketsContainer}>
        {renderBucketBar(
          "Needs (Target 50%)",
          50,
          budgetResult.needs.actualPercent,
          budgetResult.needs.actualPaise,
          Colors.primaryLight
        )}
        {renderBucketBar(
          "Wants (Target 30%)",
          30,
          budgetResult.wants.actualPercent,
          budgetResult.wants.actualPaise,
          Colors.warning
        )}
        {renderBucketBar(
          "Savings (Target 20%)",
          20,
          budgetResult.savings.actualPercent,
          budgetResult.savings.actualPaise,
          Colors.income
        )}
      </View>

      {budgetResult.optimizationTips.length > 0 && (
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>📊 {budgetResult.optimizationTips[0]}</Text>
        </View>
      )}
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
  healthBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radii.full,
  },
  healthBadgeText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
  },
  bucketsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  bucketItem: {
    gap: 4,
  },
  bucketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bucketLabel: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  bucketAmount: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
  },
  barTrack: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
  tipBox: {
    backgroundColor: Colors.background,
    padding: Spacing.sm,
    borderRadius: Radii.sm,
  },
  tipText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});

export default BudgetRule50_30_20Card;
