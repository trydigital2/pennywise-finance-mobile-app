import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { formatCurrency } from '../../utils/currency';
import { formatDisplayDate } from '../../utils/date';
import { calculateGoalProgress } from '../../utils/calculations';
import { SavingsGoal, CurrencyCode } from '../../types';

interface SavingsGoalCardProps {
  goal: SavingsGoal;
  currency?: CurrencyCode;
  onPress: () => void;
  onAddFunds: () => void;
}

export const SavingsGoalCard: React.FC<SavingsGoalCardProps> = ({
  goal,
  currency = 'INR',
  onPress,
  onAddFunds,
}) => {
  const { percentage, remainingPaise, isCompleted } = calculateGoalProgress(goal);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.card, Shadows.sm]}
    >
      <View style={styles.topRow}>
        <View style={styles.titleInfo}>
          <View style={[styles.iconBox, { backgroundColor: `${goal.color}15` }]}>
            <Ionicons name={goal.icon as any} size={22} color={goal.color} />
          </View>
          <View style={styles.nameColumn}>
            <Text style={styles.goalName} numberOfLines={1}>{goal.name}</Text>
            <Text style={styles.targetDate}>
              Target: {formatDisplayDate(goal.targetDate)}
            </Text>
          </View>
        </View>

        {isCompleted ? (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={Colors.income} />
            <Text style={styles.completedText}>Done</Text>
          </View>
        ) : (
          <Text style={styles.percentageText}>{percentage}%</Text>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${percentage}%`, backgroundColor: goal.color },
          ]}
        />
      </View>

      {/* Amounts and Quick Action */}
      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.currentAmount}>
            {formatCurrency(goal.currentAmountPaise, currency, false)}
          </Text>
          <Text style={styles.targetAmount}>
            of {formatCurrency(goal.targetAmountPaise, currency, false)}
          </Text>
        </View>

        {!isCompleted ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onAddFunds}
            style={styles.addFundsBtn}
          >
            <Ionicons name="add" size={16} color={Colors.primary} />
            <Text style={styles.addFundsText}>Add Funds</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.achievedLabel}>Goal Achieved! 🎉</Text>
        )}
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
    marginBottom: 12,
  },
  titleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: Radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  nameColumn: {
    flex: 1,
  },
  goalName: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  targetDate: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  percentageText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.primary,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.incomeBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radii.full,
    gap: 4,
  },
  completedText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.income,
  },
  progressBar: {
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
    alignItems: 'flex-end',
    marginTop: 10,
  },
  currentAmount: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  targetAmount: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
  },
  addFundsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radii.md,
    gap: 2,
  },
  addFundsText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.primary,
  },
  achievedLabel: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.income,
  },
});
