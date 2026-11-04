import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import { Colors } from "../../theme/colors";
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

      {/* Primary Corpus Highlight */}
      <View style={styles.corpusContainer}>
        <Text style={styles.corpusLabel}>Projected Corpus ({durationYears} Years)</Text>
        <Text style={styles.corpusValue}>{formatPaiseToCompactINR(projection.totalCorpusPaise)}</Text>
        <Text style={styles.corpusInflation}>
          ≈ {formatPaiseToCompactINR(projection.inflationAdjustedCorpusPaise)} in today's purchasing power (6% inflation)
        </Text>
      </View>

      {/* Invested vs Wealth Gain Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Total Invested</Text>
          <Text style={styles.statNumber}>{formatPaiseToCompactINR(projection.totalInvestedPaise)}</Text>
          <Text style={styles.statSub}>Principal contribution</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Wealth Gain</Text>
          <Text style={[styles.statNumber, { color: Colors.emerald500 }]}>
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
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.base,
    ...Shadows.sm,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.fontSize.xs,
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
    backgroundColor: Colors.emerald100,
    borderColor: Colors.emerald500,
  },
  stepUpBadgeText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.semibold,
  },
  stepUpBadgeTextActive: {
    color: Colors.emerald700,
  },
  corpusContainer: {
    backgroundColor: Colors.navy900,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  corpusLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.navy400,
    fontWeight: Typography.fontWeight.medium,
  },
  corpusValue: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: Typography.fontWeight.heavy,
    color: Colors.emerald400,
    marginVertical: 4,
  },
  corpusInflation: {
    fontSize: 11,
    color: Colors.navy300,
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
    fontWeight: Typography.fontWeight.medium,
  },
  statNumber: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
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
    backgroundColor: Colors.blue600,
  },
  yearText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeight.semibold,
  },
  yearTextActive: {
    color: Colors.white,
  },
});

