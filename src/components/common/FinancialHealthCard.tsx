import React from "react";
import { View, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { Colors } from "../../theme/colors";
import { Typography } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";
import { Radii } from "../../theme/radii";
import { Shadows } from "../../theme/shadows";
import { FinancialHealthResult, SpendingVelocityResult } from "../../utils/financialHealth";
import { formatCurrency } from "../../utils/currency";

export interface FinancialHealthCardProps {
  healthResult: FinancialHealthResult;
  velocityResult: SpendingVelocityResult;
  style?: StyleProp<ViewStyle>;
}

export const FinancialHealthCard: React.FC<FinancialHealthCardProps> = ({
  healthResult,
  velocityResult,
  style,
}) => {
  const getGradeColor = () => {
    switch (healthResult.grade) {
      case "A+":
      case "A":
        return Colors.income;
      case "B":
        return Colors.primary;
      case "C":
        return Colors.warning;
      default:
        return Colors.expense;
    }
  };

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Financial Health Score</Text>
          <Text style={styles.subtitle}>{healthResult.statusLabel}</Text>
        </View>
        <View style={[styles.gradeBadge, { backgroundColor: getGradeColor() + "20" }]}>
          <Text style={[styles.gradeText, { color: getGradeColor() }]}>
            Grade {healthResult.grade}
          </Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{healthResult.score}/100</Text>
          <Text style={styles.metricLabel}>Health Score</Text>
          <Text style={styles.metricSub}>Composite Index</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{healthResult.savingsRatePercent}%</Text>
          <Text style={styles.metricLabel}>Savings Rate</Text>
          <Text style={styles.metricSub}>Target: ≥20%</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricItem}>
          <Text style={styles.metricValue}>{healthResult.emergencyFundMonths}m</Text>
          <Text style={styles.metricLabel}>Reserve Runway</Text>
          <Text style={styles.metricSub}>Target: ≥3-6m</Text>
        </View>
      </View>

      <View style={styles.velocityBox}>
        <View style={styles.velocityRow}>
          <Text style={styles.velocityLabel}>Daily Burn Rate:</Text>
          <Text style={styles.velocityValue}>{formatCurrency(velocityResult.dailyBurnRatePaise)}/day</Text>
        </View>
        <View style={styles.velocityRow}>
          <Text style={styles.velocityLabel}>Safe Daily Allowance:</Text>
          <Text style={[styles.velocityValue, { color: velocityResult.isPacingOverBudget ? Colors.expense : Colors.income }]}>
            {formatCurrency(velocityResult.safeDailyAllowancePaise)}/day
          </Text>
        </View>
      </View>

      {healthResult.recommendations.length > 0 && (
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>💡 {healthResult.recommendations[0]}</Text>
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
  gradeBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radii.full,
  },
  gradeText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.background,
    paddingVertical: Spacing.md,
    borderRadius: Radii.md,
    marginBottom: Spacing.md,
  },
  metricItem: {
    alignItems: "center",
    flex: 1,
  },
  metricValue: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.textPrimary,
  },
  metricLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
    marginTop: 2,
  },
  metricSub: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 1,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
  velocityBox: {
    backgroundColor: Colors.background,
    padding: Spacing.sm,
    borderRadius: Radii.sm,
    gap: 4,
    marginBottom: Spacing.sm,
  },
  velocityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  velocityLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
  },
  velocityValue: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  tipBox: {
    backgroundColor: Colors.surface,
    paddingTop: 4,
  },
  tipText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});

export default FinancialHealthCard;
