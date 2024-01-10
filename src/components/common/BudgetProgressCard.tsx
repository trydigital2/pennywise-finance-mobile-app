import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { formatCurrency } from '../../utils/currency';
import { CategoryIcon } from './CategoryIcon';
import { BudgetStatus, CurrencyCode } from '../../types';

interface BudgetProgressCardProps {
  status: BudgetStatus;
  currency?: CurrencyCode;
  onPress?: () => void;
}

export const BudgetProgressCard: React.FC<BudgetProgressCardProps> = ({
  status,
  currency = 'INR',
  onPress,
}) => {
  const { categoryName, categoryIcon, categoryColor, spentPaise, remainingPaise, percentageUsed, isWarning, isExceeded, budget } = status;

  const barColor = isExceeded
    ? Colors.expense
    : isWarning
    ? Colors.warning
    : categoryColor || Colors.income;

  const progressPercent = Math.min(100, percentageUsed);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
      style={[styles.card, Shadows.sm]}
    >
      <View style={styles.topRow}>
        <View style={styles.leftInfo}>
          <CategoryIcon
            iconName={categoryIcon}
            color={categoryColor}
            size="sm"
            style={styles.icon}
          />
          <View>
            <Text style={styles.categoryName}>{categoryName}</Text>
            <Text style={styles.subtext}>
              {percentageUsed}% of limit used
            </Text>
          </View>
        </View>
        <View style={styles.rightValues}>
          <Text style={styles.spentText}>
            {formatCurrency(spentPaise, currency, false)}
          </Text>
          <Text style={styles.limitText}>
            / {formatCurrency(budget.monthlyLimitPaise, currency, false)}
          </Text>
        </View>
      </View>

      {/* Progress Track */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progressPercent}%`, backgroundColor: barColor }]} />
      </View>

      {/* Bottom Alert/Remaining Info */}
      <View style={styles.bottomRow}>
        <Text style={[styles.statusNote, { color: isExceeded ? Colors.expense : Colors.textSecondary }]}>
          {isExceeded
            ? 'Exceeded by ' + formatCurrency(spentPaise - budget.monthlyLimitPaise, currency, false)
            : formatCurrency(remainingPaise, currency, false) + ' remaining'}
        </Text>
        {isWarning && !isExceeded ? (
          <Text style={styles.warningTag}>Nearing Limit</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.screenPadding,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  categoryName: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  subtext: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 1,
  },
  rightValues: {
    alignItems: 'flex-end',
  },
  spentText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  limitText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.surfaceSecondary,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusNote: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
  },
  warningTag: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.warning,
  },
});
