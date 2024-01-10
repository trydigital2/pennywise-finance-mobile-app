import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { BudgetProgressCard } from '../../components/common/BudgetProgressCard';
import { EmptyState } from '../../components/common/EmptyState';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { AddBudgetModal } from '../../components/modals/AddBudgetModal';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addBudget, deleteBudget } from '../../store/slices/budgetSlice';
import { calculateBudgetStatus } from '../../utils/calculations';
import { formatCurrency } from '../../utils/currency';
import { getCurrentMonthKey, formatMonthYear } from '../../utils/date';
import { DEFAULT_CATEGORIES } from '../../constants/CATEGORIES';
import { Budget } from '../../types';

export const BudgetsScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const budgets = useAppSelector((state) => state.budget.budgets);
  const transactions = useAppSelector((state) => state.transaction.transactions);
  const user = useAppSelector((state) => state.user.profile);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'warning' | 'healthy'>('all');

  const currentMonthKey = getCurrentMonthKey();

  // Active month budgets
  const activeBudgets = useMemo(
    () => budgets.filter((b) => b.month === currentMonthKey),
    [budgets, currentMonthKey]
  );

  // Compute status for each budget
  const budgetStatuses = useMemo(() => {
    return activeBudgets.map((b) =>
      calculateBudgetStatus(b, transactions, DEFAULT_CATEGORIES)
    );
  }, [activeBudgets, transactions]);

  // Overall totals
  const totalLimitPaise = useMemo(
    () => activeBudgets.reduce((sum, b) => sum + b.monthlyLimitPaise, 0),
    [activeBudgets]
  );

  const totalSpentPaise = useMemo(
    () => budgetStatuses.reduce((sum, s) => sum + s.spentPaise, 0),
    [budgetStatuses]
  );

  const overallPercent = totalLimitPaise > 0
    ? Math.min(100, Math.round((totalSpentPaise / totalLimitPaise) * 100))
    : 0;

  const filteredStatuses = useMemo(() => {
    if (filterType === 'warning') {
      return budgetStatuses.filter((s) => s.isWarning || s.isExceeded);
    }
    if (filterType === 'healthy') {
      return budgetStatuses.filter((s) => !s.isWarning && !s.isExceeded);
    }
    return budgetStatuses;
  }, [budgetStatuses, filterType]);

  const handleSaveBudget = (data: Omit<Budget, 'id'>) => {
    const newBudget: Budget = {
      ...data,
      id: `bgt_${Date.now()}`,
    };
    dispatch(addBudget(newBudget));
  };

  const handleDeleteBudget = () => {
    if (deleteTargetId) {
      dispatch(deleteBudget(deleteTargetId));
      setDeleteTargetId(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Monthly Budgets</Text>
          <Text style={styles.headerSub}>{formatMonthYear(currentMonthKey)}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setAddModalVisible(true)}
          style={styles.addBtn}
        >
          <Ionicons name="add" size={22} color="#FFF" />
          <Text style={styles.addBtnText}>New Budget</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Overall Limit Card */}
        <View style={[styles.overallCard, Shadows.md]}>
          <View style={styles.overallTop}>
            <View>
              <Text style={styles.overallLabel}>TOTAL BUDGET SPENT</Text>
              <Text style={styles.overallAmount}>
                {formatCurrency(totalSpentPaise, user.preferredCurrency, false)}
              </Text>
            </View>
            <View style={styles.percentBadge}>
              <Text style={styles.percentText}>{overallPercent}%</Text>
            </View>
          </View>

          <View style={styles.overallTrack}>
            <View
              style={[
                styles.overallFill,
                {
                  width: `${overallPercent}%`,
                  backgroundColor: overallPercent >= 90 ? Colors.expense : Colors.income,
                },
              ]}
            />
          </View>

          <View style={styles.overallBottom}>
            <Text style={styles.overallBottomText}>
              Limit: {formatCurrency(totalLimitPaise, user.preferredCurrency, false)}
            </Text>
            <Text style={styles.overallBottomText}>
              Remaining: {formatCurrency(Math.max(0, totalLimitPaise - totalSpentPaise), user.preferredCurrency, false)}
            </Text>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {[
            { id: 'all', label: `All (${budgetStatuses.length})` },
            { id: 'warning', label: `Alerts (${budgetStatuses.filter((s) => s.isWarning || s.isExceeded).length})` },
            { id: 'healthy', label: `Healthy (${budgetStatuses.filter((s) => !s.isWarning && !s.isExceeded).length})` },
          ].map((item) => {
            const isSelected = filterType === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => setFilterType(item.id as any)}
                style={[styles.filterChip, isSelected ? styles.activeChip : null]}
              >
                <Text style={[styles.filterText, isSelected ? styles.activeText : null]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Budgets List */}
        {filteredStatuses.length > 0 ? (
          filteredStatuses.map((status) => (
            <View key={status.budget.id} style={styles.cardWrapper}>
              <BudgetProgressCard
                status={status}
                currency={user.preferredCurrency}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setDeleteTargetId(status.budget.id)}
                style={styles.deleteBtn}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="trash-outline" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <EmptyState
            icon="pie-chart-outline"
            title="No Budgets Found"
            description="Create your first category budget to keep your spending controlled."
            actionTitle="+ Create Budget"
            onAction={() => setAddModalVisible(true)}
          />
        )}
      </ScrollView>

      {/* Add Modal */}
      <AddBudgetModal
        visible={addModalVisible}
        currency={user.preferredCurrency}
        onClose={() => setAddModalVisible(false)}
        onSave={handleSaveBudget}
      />

      {/* Delete Confirmation */}
      <ConfirmationDialog
        visible={Boolean(deleteTargetId)}
        title="Delete Budget"
        message="Are you sure you want to remove this category budget?"
        confirmText="Delete"
        isDestructive
        onConfirm={handleDeleteBudget}
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
    backgroundColor: Colors.primary,
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radii.full,
  },
  percentText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: '#FFF',
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
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenPadding,
    gap: 8,
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radii.full,
    backgroundColor: Colors.surfaceSecondary,
  },
  activeChip: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  activeText: {
    color: '#FFF',
    fontWeight: Typography.fontWeights.semibold,
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
});
