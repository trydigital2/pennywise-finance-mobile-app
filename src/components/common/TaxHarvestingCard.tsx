import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { calculateTaxHarvesting } from '../../utils/taxLossHarvesting';
import { formatPaiseToCompactINR } from '../../utils/sipWealthProjector';

export interface TaxHarvestingCardProps {
  realizedSTCGPaise?: number;
  realizedLTCGPaise?: number;
  unrealizedLossesPaise?: number;
}

export const TaxHarvestingCard: React.FC<TaxHarvestingCardProps> = ({
  realizedSTCGPaise = 8500000, // ₹85,000 STCG
  realizedLTCGPaise = 15000000, // ₹1,50,000 LTCG
  unrealizedLossesPaise = 12000000, // ₹1,20,000 losses
}) => {
  const summary = calculateTaxHarvesting(
    realizedSTCGPaise,
    realizedLTCGPaise,
    unrealizedLossesPaise
  );

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.title}>Tax-Loss Harvesting</Text>
          <Text style={styles.subtitle}>Capital Gains Tax Offset Optimizer</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>TAX SAVINGS</Text>
        </View>
      </View>

      {/* Hero Savings Banner */}
      <View style={styles.heroBox}>
        <Text style={styles.heroLabel}>POTENTIAL TAX SAVED</Text>
        <Text style={styles.heroAmount}>
          {formatPaiseToCompactINR(summary.estimatedTaxSavedPaise)}
        </Text>
        <Text style={styles.heroSub}>
          By harvesting {formatPaiseToCompactINR(summary.harvestableLossesPaise)} unrealized losses
        </Text>
      </View>

      {/* Metrics Row */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Realized STCG</Text>
          <Text style={styles.metricValue}>
            {formatPaiseToCompactINR(summary.realizedShortTermGainsPaise)}
          </Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Realized LTCG</Text>
          <Text style={styles.metricValue}>
            {formatPaiseToCompactINR(summary.realizedLongTermGainsPaise)}
          </Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Net Tax After</Text>
          <Text style={[styles.metricValue, { color: Colors.income }]}>
            {formatPaiseToCompactINR(summary.netTaxLiabilityAfterHarvestPaise)}
          </Text>
        </View>
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
  titleGroup: {
    flex: 1,
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
  badge: {
    backgroundColor: Colors.accentLight,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: Radii.full,
  },
  badgeText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.income,
  },
  heroBox: {
    backgroundColor: Colors.background,
    borderRadius: Radii.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  heroLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  heroAmount: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.income,
    marginVertical: 4,
  },
  heroSub: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  metricItem: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radii.sm,
    padding: Spacing.sm,
  },
  metricLabel: {
    fontSize: 10,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  metricValue: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    marginTop: 2,
  },
});

export default TaxHarvestingCard;
