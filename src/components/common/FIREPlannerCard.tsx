import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { calculateFIREReadiness, FIREInputs } from '../../utils/firePlanner';
import { formatPaiseToCompactINR } from '../../utils/sipWealthProjector';

export interface FIREPlannerCardProps {
  inputs?: Partial<FIREInputs>;
  style?: StyleProp<ViewStyle>;
}

export const FIREPlannerCard: React.FC<FIREPlannerCardProps> = ({ inputs, style }) => {
  const defaultInputs: FIREInputs = {
    annualExpensesPaise: 120000000, // ₹12,00,000 / year (₹1L/mo)
    currentNetWorthPaise: 85000000, // ₹85,00,000
    annualSavingsPaise: 60000000, // ₹6,00,000 / year
    currentAge: 29,
    targetRetirementAge: 48,
    safeWithdrawalRatePct: 4.0,
    ...inputs,
  };

  const result = calculateFIREReadiness(defaultInputs);

  return (
    <View style={[styles.card, style]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.headerTitleGroup}>
          <Text style={styles.title}>FIRE & Early Retirement</Text>
          <Text style={styles.subtitle}>
            Annual Expenses: {formatPaiseToCompactINR(defaultInputs.annualExpensesPaise)} · 4% Rule
          </Text>
        </View>
        <View
          style={[
            styles.tierBadge,
            { backgroundColor: result.tierColor + '20', borderColor: result.tierColor },
          ]}
        >
          <Text style={[styles.tierText, { color: result.tierColor }]}>{result.tier}</Text>
        </View>
      </View>

      {/* Target Corpus Hero Banner */}
      <View style={styles.heroBanner}>
        <View style={styles.heroLeft}>
          <Text style={styles.heroLabel}>Target FIRE Number</Text>
          <Text style={styles.heroAmount}>
            {formatPaiseToCompactINR(result.fireTargetNumberPaise)}
          </Text>
          <Text style={styles.heroProgress}>
            {result.fireProgressPct}% Funded ({formatPaiseToCompactINR(defaultInputs.currentNetWorthPaise)})
          </Text>
        </View>

        <View style={styles.heroRight}>
          <Text style={styles.yearsNumber}>{result.estimatedYearsToFIRE}</Text>
          <Text style={styles.yearsLabel}>Years to FIRE</Text>
          <Text style={styles.retireAge}>Age ~{result.projectedRetirementAge}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${result.fireProgressPct}%` }]} />
        </View>
      </View>

      {/* Milestones Grid */}
      <View style={styles.milestonesGrid}>
        <View style={styles.milestoneBox}>
          <Text style={styles.milestoneLabel}>Lean FIRE</Text>
          <Text style={styles.milestoneValue}>
            {formatPaiseToCompactINR(result.leanFireNumberPaise)}
          </Text>
          <Text style={styles.milestoneSub}>Basic living</Text>
        </View>

        <View style={styles.milestoneBox}>
          <Text style={styles.milestoneLabel}>Coast FIRE</Text>
          <Text style={styles.milestoneValue}>
            {formatPaiseToCompactINR(result.coastFireTargetPaise)}
          </Text>
          <Text style={[styles.milestoneSub, result.isCoastFIREReached && styles.unlockedText]}>
            {result.isCoastFIREReached ? '✓ Unlocked' : 'In Progress'}
          </Text>
        </View>

        <View style={styles.milestoneBox}>
          <Text style={styles.milestoneLabel}>Fat FIRE</Text>
          <Text style={styles.milestoneValue}>
            {formatPaiseToCompactINR(result.fatFireNumberPaise)}
          </Text>
          <Text style={styles.milestoneSub}>Luxury tier</Text>
        </View>
      </View>

      {/* Recommendation Banner */}
      <View style={styles.recommendationContainer}>
        <Text style={styles.recommendationTitle}>STRATEGIC INSIGHT</Text>
        <Text style={styles.recommendationText}>{result.recommendation}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  headerTitleGroup: {
    flex: 1,
    marginRight: Spacing.sm,
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
    paddingVertical: 3,
    borderRadius: Radii.full,
    borderWidth: 1,
  },
  tierText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
  },
  heroBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  heroLeft: {
    flex: 1,
  },
  heroLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  heroAmount: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  heroProgress: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.primary,
    fontWeight: Typography.fontWeights.semibold,
  },
  heroRight: {
    alignItems: 'center',
    minWidth: 80,
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
    paddingLeft: Spacing.sm,
  },
  yearsNumber: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.primary,
  },
  yearsLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  retireAge: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
    marginTop: 1,
  },
  progressContainer: {
    marginBottom: Spacing.md,
  },
  track: {
    height: 6,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radii.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: Radii.full,
  },
  milestonesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  milestoneBox: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radii.sm,
    padding: Spacing.sm,
  },
  milestoneLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  milestoneValue: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  milestoneSub: {
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 1,
  },
  unlockedText: {
    color: Colors.income,
    fontWeight: Typography.fontWeights.bold,
  },
  recommendationContainer: {
    backgroundColor: Colors.background,
    borderRadius: Radii.sm,
    padding: Spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  recommendationTitle: {
    fontSize: 9,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.primary,
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  recommendationText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textPrimary,
    lineHeight: 16,
  },
});

export default FIREPlannerCard;
