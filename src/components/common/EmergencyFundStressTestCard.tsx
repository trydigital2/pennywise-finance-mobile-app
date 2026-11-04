import React from "react";
import { View, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { Colors } from "../../theme/colors";
import { Typography } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";
import { Radii } from "../../theme/radii";
import { Shadows } from "../../theme/shadows";
import { calculateEmergencyFundRunway, EmergencyFundInputs } from "../../utils/emergencyFund";
import { formatCurrency } from "../../utils/currency";

export interface EmergencyFundStressTestCardProps {
  inputs?: EmergencyFundInputs;
  style?: StyleProp<ViewStyle>;
}

const DEFAULT_SAMPLE_INPUTS: EmergencyFundInputs = {
  liquidSavingsPaise: 24000000, // ₹2,40,000
  monthlyEssentialPaise: 5000000, // ₹50,000
  monthlyDiscretionaryPaise: 2000000, // ₹20,000
  targetMonths: 6,
  monthlySavingsContributionPaise: 1500000, // ₹15,000
};

export const EmergencyFundStressTestCard: React.FC<EmergencyFundStressTestCardProps> = ({
  inputs = DEFAULT_SAMPLE_INPUTS,
  style,
}) => {
  const result = calculateEmergencyFundRunway(inputs);

  const getTierColor = () => {
    switch (result.tier) {
      case "Fortified":
        return Colors.income; // Green
      case "Adequate":
        return Colors.primaryLight; // Teal/Blue
      case "Vulnerable":
        return Colors.warning; // Orange
      case "Critical Deficit":
        return Colors.expense; // Red
      default:
        return Colors.primary;
    }
  };

  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Emergency Runway & Resilience</Text>
          <Text style={styles.subtitle}>
            Goal: {formatCurrency(result.targetEmergencyFundPaise)} ({inputs.targetMonths ?? 6} Months Reserve)
          </Text>
        </View>
        <View style={[styles.tierBadge, { backgroundColor: getTierColor() + "20" }]}>
          <Text style={[styles.tierBadgeText, { color: getTierColor() }]}>
            {result.tier}
          </Text>
        </View>
      </View>

      {/* Primary KPI Runway Row */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Bare-Bones Runway</Text>
          <Text style={[styles.metricValue, { color: getTierColor() }]}>
            {result.bareBonesRunwayMonths} mos
          </Text>
          <Text style={styles.metricSub}>essentials only</Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Standard Runway</Text>
          <Text style={styles.metricValue}>{result.runwayMonths} mos</Text>
          <Text style={styles.metricSub}>with lifestyle</Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Funded Progress</Text>
          <Text style={styles.metricValueSecondary}>{result.percentageFunded}%</Text>
          <Text style={styles.metricSub}>of 6-mo goal</Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Capital Gap</Text>
          <Text style={styles.metricValueSecondary}>
            {result.gapToTargetPaise > 0 ? formatCurrency(result.gapToTargetPaise) : "Fully Funded"}
          </Text>
          <Text style={styles.metricSub}>
            {result.monthsToGoal > 0 ? `~${result.monthsToGoal} mos left` : "Protected"}
          </Text>
        </View>
      </View>

      {/* Progress Bar Track */}
      <View style={styles.progressContainer}>
        <View style={styles.barTrack}>
          <View
            style={[
              styles.barFill,
              {
                width: `${Math.min(100, result.percentageFunded)}%`,
                backgroundColor: getTierColor(),
              },
            ]}
          />
        </View>
      </View>

      {/* Tactical Advisory Box */}
      <View style={styles.adviceBox}>
        <Text style={styles.adviceTitle}>🛡️ Financial Stress Test Assessment</Text>
        <Text style={styles.adviceText}>{result.tacticalAdvice}</Text>
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
  tierBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radii.full,
  },
  tierBadgeText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.background,
    borderRadius: Radii.md,
    padding: Spacing.md,
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  metricItem: {
    width: "47%",
  },
  metricLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  metricValue: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.textPrimary,
  },
  metricValueSecondary: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  metricSub: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  progressContainer: {
    marginBottom: Spacing.md,
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
  adviceBox: {
    backgroundColor: `${Colors.primary}08`,
    borderRadius: Radii.sm,
    padding: Spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  adviceTitle: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.primary,
    marginBottom: 3,
  },
  adviceText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});

export default EmergencyFundStressTestCard;
