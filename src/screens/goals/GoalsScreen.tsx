import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { SavingsGoalCard } from '../../components/common/SavingsGoalCard';
import { CurrencyInput } from '../../components/common/CurrencyInput';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { EmptyState } from '../../components/common/EmptyState';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { AddGoalModal } from '../../components/modals/AddGoalModal';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addGoal, deleteGoal, addContribution } from '../../store/slices/goalSlice';
import { formatCurrency, parseCurrencyInput } from '../../utils/currency';
import { SavingsGoal } from '../../types';

export const GoalsScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const goals = useAppSelector((state) => state.goal.goals);
  const user = useAppSelector((state) => state.user.profile);

  const [addGoalVisible, setAddGoalVisible] = useState(false);
  const [addFundsGoal, setAddFundsGoal] = useState<SavingsGoal | null>(null);
  const [depositStr, setDepositStr] = useState('');
  const [depositError, setDepositError] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const totalTargetPaise = useMemo(
    () => goals.reduce((sum, g) => sum + g.targetAmountPaise, 0),
    [goals]
  );

  const totalSavedPaise = useMemo(
    () => goals.reduce((sum, g) => sum + g.currentAmountPaise, 0),
    [goals]
  );

  const overallProgress = totalTargetPaise > 0
    ? Math.min(100, Math.round((totalSavedPaise / totalTargetPaise) * 100))
    : 0;

  const activeGoals = goals.filter((g) => !g.isCompleted);
  const completedGoals = goals.filter((g) => g.isCompleted);

  const handleSaveGoal = (data: any) => {
    const newGoal: SavingsGoal = {
      ...data,
      id: `goal_${Date.now()}`,
      currentAmountPaise: 0,
      isCompleted: false,
      contributions: [],
    };
    dispatch(addGoal(newGoal));
  };

  const handleDeposit = () => {
    const amountPaise = parseCurrencyInput(depositStr);
    if (amountPaise <= 0) {
      setDepositError('Please enter a valid contribution amount');
      return;
    }

    if (addFundsGoal) {
      dispatch(
        addContribution({
          goalId: addFundsGoal.id,
          contribution: {
            id: `gc_${Date.now()}`,
            goalId: addFundsGoal.id,
            amountPaise,
            date: new Date().toISOString(),
            notes: 'Manual contribution deposit',
          },
        })
      );
      setAddFundsGoal(null);
      setDepositStr('');
    }
  };

  const handleDeleteGoal = () => {
    if (deleteTargetId) {
      dispatch(deleteGoal(deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Savings Goals</Text>
          <Text style={styles.headerSub}>{activeGoals.length} Active • {completedGoals.length} Completed</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setAddGoalVisible(true)}
          style={styles.addBtn}
        >
          <Ionicons name="add" size={22} color="#FFF" />
          <Text style={styles.addBtnText}>New Goal</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Overall Corpus Card */}
        <View style={[styles.overallCard, Shadows.md]}>
          <View style={styles.overallTop}>
            <View>
              <Text style={styles.overallLabel}>TOTAL SAVINGS ACCUMULATED</Text>
              <Text style={styles.overallAmount}>
                {formatCurrency(totalSavedPaise, user.preferredCurrency, false)}
              </Text>
            </View>
            <View style={styles.percentBadge}>
              <Text style={styles.percentText}>{overallProgress}%</Text>
            </View>
          </View>

          <View style={styles.overallTrack}>
            <View style={[styles.overallFill, { width: `${overallProgress}%` }]} />
          </View>

          <View style={styles.overallBottom}>
            <Text style={styles.overallBottomText}>
              Target: {formatCurrency(totalTargetPaise, user.preferredCurrency, false)}
            </Text>
            <Text style={styles.overallBottomText}>
              Needed: {formatCurrency(Math.max(0, totalTargetPaise - totalSavedPaise), user.preferredCurrency, false)}
            </Text>
          </View>
        </View>

        {/* Active Goals */}
        {activeGoals.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>In Progress ({activeGoals.length})</Text>
            {activeGoals.map((goal) => (
              <View key={goal.id} style={styles.cardWrapper}>
                <SavingsGoalCard
                  goal={goal}
                  currency={user.preferredCurrency}
                  onPress={() => {}}
                  onAddFunds={() => {
                    setAddFundsGoal(goal);
                    setDepositStr('');
                    setDepositError('');
                  }}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setDeleteTargetId(goal.id)}
                  style={styles.deleteBtn}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons name="trash-outline" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}

        {/* Completed Goals */}
        {completedGoals.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Completed Goals 🎉 ({completedGoals.length})</Text>
            {completedGoals.map((goal) => (
              <View key={goal.id} style={styles.cardWrapper}>
                <SavingsGoalCard
                  goal={goal}
                  currency={user.preferredCurrency}
                  onPress={() => {}}
                  onAddFunds={() => {}}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setDeleteTargetId(goal.id)}
                  style={styles.deleteBtn}
                >
                  <Ionicons name="trash-outline" size={16} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : null}

        {goals.length === 0 ? (
          <EmptyState
            icon="trophy-outline"
            title="No Savings Goals Yet"
            description="Start by setting a target for an emergency fund, gadget, or your next holiday."
            actionTitle="+ Create First Goal"
            onAction={() => setAddGoalVisible(true)}
          />
        ) : null}
      </ScrollView>

      {/* Add Goal Modal */}
      <AddGoalModal
        visible={addGoalVisible}
        currency={user.preferredCurrency}
        onClose={() => setAddGoalVisible(false)}
        onSave={handleSaveGoal}
      />

      {/* Quick Deposit Funds Modal */}
      <Modal
        visible={Boolean(addFundsGoal)}
        transparent
        animationType="fade"
        onRequestClose={() => setAddFundsGoal(null)}
      >
        <View style={styles.backdrop}>
          <View style={styles.depositCard}>
            <Text style={styles.depositTitle}>Add Contribution</Text>
            <Text style={styles.depositSub}>{addFundsGoal?.name}</Text>

            <CurrencyInput
              label="Deposit Amount"
              value={depositStr}
              onChangeText={(text) => {
                setDepositStr(text);
                if (depositError) setDepositError('');
              }}
              currency={user.preferredCurrency}
              error={depositError}
            />

            <View style={styles.depositActions}>
              <TouchableOpacity
                onPress={() => setAddFundsGoal(null)}
                style={styles.cancelDepositBtn}
              >
                <Text style={styles.cancelDepositText}>Cancel</Text>
              </TouchableOpacity>
              <PrimaryButton
                title="Deposit Funds"
                onPress={handleDeposit}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        visible={Boolean(deleteTargetId)}
        title="Delete Savings Goal"
        message="Are you sure you want to remove this goal? Your savings records for this goal will be cleared."
        confirmText="Delete"
        isDestructive
        onConfirm={handleDeleteGoal}
        onCancel={() => setDeleteTargetId(null)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 14,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  headerSub: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radii.md,
    gap: 4,
  },
  addBtnText: {
    color: '#FFF',
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  overallCard: {
    backgroundColor: '#0F172A',
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    marginHorizontal: Spacing.screenPadding,
    marginVertical: 14,
  },
  overallTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  overallLabel: {
    fontSize: 10,
    fontWeight: Typography.fontWeights.semibold,
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 4,
  },
  overallAmount: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.textInverse,
  },
  percentBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.full,
  },
  percentText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: '#34D399',
  },
  overallTrack: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  overallFill: {
    height: '100%',
    backgroundColor: Colors.income,
    borderRadius: 4,
  },
  overallBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overallBottomText: {
    fontSize: Typography.fontSizes.xs,
    color: '#CBD5E1',
  },
  section: {
    marginTop: 10,
  },
  sectionHeader: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 8,
  },
  cardWrapper: {
    position: 'relative',
  },
  deleteBtn: {
    position: 'absolute',
    top: 14,
    right: 26,
    padding: 6,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  depositCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    padding: 24,
    width: '100%',
    maxWidth: 360,
  },
  depositTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  depositSub: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  depositActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  cancelDepositBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radii.md,
    backgroundColor: Colors.surfaceSecondary,
  },
  cancelDepositText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
});
