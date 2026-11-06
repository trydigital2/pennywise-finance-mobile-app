import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import { Colors, Palette } from "../../theme/colors";
import { Typography } from "../../theme/typography";
import { Spacing } from "../../theme/spacing";
import { Radii } from "../../theme/radii";
import { Shadows } from "../../theme/shadows";
import { calculateSIPWealthProjection, formatPaiseToCompactINR } from "../../utils/sipWealthProjector";

export interface SIPWealthProjectorCardProps {
  initialMonthlyPaise?: number;
  initialReturnPct?: number;
  initialYears?: number;
  style?: StyleProp<ViewStyle>;
}

export const SIPWealthProjectorCard: React.FC<SIPWealthProjectorCardProps> = ({
  initialMonthlyPaise = 1000000, // ₹10,000/mo
  initialReturnPct = 12,
  initialYears = 15,
  style,
}) => {
  const [durationYears, setDurationYears] = useState<number>(initialYears);
  const [includeStepUp, setIncludeStepUp] = useState<boolean>(true);

  const projection = calculateSIPWealthProjection(
    initialMonthlyPaise,
    initialReturnPct / 100,
    durationYears,
    includeStepUp ? 0.10 : 0,
    0.06
  );

  return (
    <View style={[styles.card, style]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>SIP Wealth Compounding</Text>
          <Text style={styles.subtitle}>
            {formatPaiseToCompactINR(initialMonthlyPaise)}/mo · @{initialReturnPct}% p.a.
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.stepUpBadge, includeStepUp && styles.stepUpBadgeActive]}
          onPress={() => setIncludeStepUp(!includeStepUp)}
          activeOpacity={0.8}
        >
          <Text style={[styles.stepUpBadgeText, includeStepUp && styles.stepUpBadgeTextActive]}>
            {includeStepUp ? "✓ 10% Step-Up" : "+ Step-Up"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Corpus Hero Banner */}
      <View style={styles.corpusContainer}>
        <Text style={styles.corpusLabel}>ESTIMATED FUTURE WEALTH</Text>
        <Text style={styles.corpusValue}>{formatPaiseToCompactINR(projection.totalCorpusPaise)}</Text>
        <Text style={styles.corpusInflation}>
          ≈ {formatPaiseToCompactINR(projection.inflationAdjustedCorpusPaise)} in today's purchasing power (6% inflation)
        </Text>
      </View>

      {/* Stats Breakdown */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Invested</Text>
          <Text style={styles.statNumber}>{formatPaiseToCompactINR(projection.totalInvestedPaise)}</Text>
          <Text style={styles.statSub}>Principal contribution</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Wealth Gain</Text>
          <Text style={[styles.statNumber, { color: Palette.emerald500 }]}>
            +{formatPaiseToCompactINR(projection.estimatedReturnsPaise)}
          </Text>
          <Text style={styles.statSub}>{projection.wealthMultiplier}x Multiplier</Text>
        </View>
      </View>

      {/* Duration Selector Tabs */}
      <View style={styles.yearsRow}>
        {[5, 10, 15, 20, 25].map((yr) => (
          <TouchableOpacity
            key={yr}
            style={[styles.yearButton, durationYears === yr && styles.yearButtonActive]}
            onPress={() => setDurationYears(yr)}
            activeOpacity={0.75}
          >
            <Text style={[styles.yearText, durationYears === yr && styles.yearTextActive]}>
              {yr}Y
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  stepUpBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceSecondary,
  },
  stepUpBadgeActive: {
    backgroundColor: Palette.emerald100,
    borderColor: Palette.emerald500,
  },
  stepUpBadgeText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.semibold,
  },
  stepUpBadgeTextActive: {
    color: Palette.emerald700,
  },
  corpusContainer: {
    backgroundColor: Palette.navy900,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  corpusLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Palette.navy400,
    fontWeight: Typography.fontWeights.medium,
  },
  corpusValue: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.heavy,
    color: Palette.emerald400,
    marginVertical: 4,
  },
  corpusInflation: {
    fontSize: 11,
    color: Palette.navy300,
  },
  statsGrid: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radii.md,
    padding: Spacing.sm + 2,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: Typography.fontWeights.medium,
  },
  statNumber: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  statSub: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  yearsRow: {
    flexDirection: "row",
    gap: Spacing.xs,
  },
  yearButton: {
    flex: 1,
    paddingVertical: Spacing.xs + 2,
    alignItems: "center",
    borderRadius: Radii.sm,
    backgroundColor: Colors.surfaceSecondary,
  },
  yearButtonActive: {
    backgroundColor: Palette.blue600,
  },
  yearText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.semibold,
  },
  yearTextActive: {
    color: Palette.white,
  },
});

export default SIPWealthProjectorCard;
