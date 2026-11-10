import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { calculateSection54FExemption, Section54FInputs } from '../../utils/section54FEngine';
import { formatPaiseToCompactINR } from '../../utils/sipWealthProjector';

export interface Section54FExemptionCardProps {
  inputs?: Partial<Section54FInputs>;
}

export const Section54FExemptionCard: React.FC<Section54FExemptionCardProps> = ({ inputs }) => {
  const defaultInputs: Section54FInputs = {
    netConsiderationPaise: 800000000, // ₹80,00,000 net consideration
    capitalGainPaise: 450000000, // ₹45,00,000 LTCG
    reinvestmentAmountPaise: 600000000, // ₹60,00,000 reinvested in house/CGAS
    ltcgTaxRate: 0.125,
    hasMultipleHouses: false,
    ...inputs,
  };

  const summary = calculateSection54FExemption(defaultInputs);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text style={styles.title}>Section 54F Exemption</Text>
          <Text style={styles.subtitle}>LTCG Reinvestment Tax Shelter</Text>
        </View>
        <View
          style={[
            styles.badge,
            summary.isFullyExempt ? styles.badgeSuccess : styles.badgePartial,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              summary.isFullyExempt ? styles.badgeTextSuccess : styles.badgeTextPartial,
            ]}
          >
            {summary.isFullyExempt ? '100% EXEMPT' : `${summary.reinvestmentRatioPercent}% SHELTERED`}
          </Text>
        </View>
      </View>

      {/* Hero Banner */}
      <View style={styles.heroBox}>
        <Text style={styles.heroLabel}>ESTIMATED TAX LIABILITY AVOIDED</Text>
        <Text style={styles.heroAmount}>
          {formatPaiseToCompactINR(summary.taxLiabilityAvoidedPaise)}
        </Text>
        <Text style={styles.heroSub}>
          Exempt Gain: {formatPaiseToCompactINR(summary.eligibleExemptionPaise)} of{' '}
          {formatPaiseToCompactINR(defaultInputs.capitalGainPaise)}
        </Text>
      </View>

      {/* Metrics Row */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Net Consideration</Text>
          <Text style={styles.metricValue}>
            {formatPaiseToCompactINR(defaultInputs.netConsiderationPaise)}
          </Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Reinvestment</Text>
          <Text style={styles.metricValue}>
            {formatPaiseToCompactINR(defaultInputs.reinvestmentAmountPaise)}
          </Text>
        </View>

        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Taxable LTCG</Text>
          <Text style={[styles.metricValue, { color: Colors.expense }]}>
            {formatPaiseToCompactINR(summary.taxableCapitalGainPaise)}
          </Text>
        </View>
      </View>

      {/* Statutory Guidance */}
      <View style={styles.statutoryBox}>
        <Text style={styles.statutoryTitle}>Statutory Compliance</Text>
        <Text style={styles.statutoryText}>
          Deposit into Capital Gains Account Scheme (CGAS) before ITR filing deadline. {summary.lockInPeriodYears}-year lock-in applies.
        </Text>
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
    marginBottom: Spacing.sm,
  },
  titleGroup: {
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
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: Radii.full,
  },
  badgeSuccess: {
    backgroundColor: Colors.incomeBg,
  },
  badgePartial: {
    backgroundColor: Colors.warningBg,
  },
  badgeText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
  },
  badgeTextSuccess: {
    color: Colors.income,
  },
  badgeTextPartial: {
    color: Colors.warning,
  },
  heroBox: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radii.md,
    padding: Spacing.md,
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  heroLabel: {
    fontSize: 10,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  heroAmount: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.income,
    marginVertical: 4,
  },
  heroSub: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xs,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
  },
  metricValue: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  statutoryBox: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.xs,
    marginTop: Spacing.xs,
  },
  statutoryTitle: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  statutoryText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginTop: 2,
  },
});

export default Section54FExemptionCard;

