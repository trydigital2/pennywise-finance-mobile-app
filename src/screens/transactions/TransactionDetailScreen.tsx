import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { CategoryIcon } from '../../components/common/CategoryIcon';
import { Badge } from '../../components/common/Badge';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { ConfirmationDialog } from '../../components/common/ConfirmationDialog';
import { AddTransactionModal } from '../../components/modals/AddTransactionModal';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteTransaction, updateTransaction } from '../../store/slices/transactionSlice';
import { updateAccountBalance } from '../../store/slices/accountSlice';
import { formatCurrency } from '../../utils/currency';
import { formatDisplayDate } from '../../utils/date';
import { DEFAULT_CATEGORIES } from '../../constants/CATEGORIES';
import { Transaction } from '../../types';

export const TransactionDetailScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const { transactionId } = route.params || {};

  const transactions = useAppSelector((state) => state.transaction.transactions);
  const accounts = useAppSelector((state) => state.account.accounts);
  const user = useAppSelector((state) => state.user.profile);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const tx = transactions.find((t) => t.id === transactionId);

  if (!tx) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFoundBox}>
          <Text style={styles.notFoundText}>Transaction not found.</Text>
          <PrimaryButton title="Go Back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  const category = DEFAULT_CATEGORIES.find((c) => c.id === tx.categoryId);
  const account = accounts.find((a) => a.id === tx.accountId);

  const isIncome = tx.type === 'income';
  const amountColor = isIncome ? Colors.income : Colors.expense;

  const handleDelete = () => {
    // Revert account balance before deleting
    const revertChange = isIncome ? -tx.amountPaise : tx.amountPaise;
    dispatch(
      updateAccountBalance({
        accountId: tx.accountId,
        amountPaiseChange: revertChange,
      })
    );

    dispatch(deleteTransaction(tx.id));
    setConfirmDelete(false);
    navigation.goBack();
  };

  const handleUpdate = (updatedData: Omit<Transaction, 'id'>) => {
    // Revert old amount
    const oldChange = isIncome ? -tx.amountPaise : tx.amountPaise;
    dispatch(updateAccountBalance({ accountId: tx.accountId, amountPaiseChange: oldChange }));

    // Apply new amount
    const newIsIncome = updatedData.type === 'income';
    const newChange = newIsIncome ? updatedData.amountPaise : -updatedData.amountPaise;
    dispatch(updateAccountBalance({ accountId: updatedData.accountId, amountPaiseChange: newChange }));

    dispatch(
      updateTransaction({
        ...updatedData,
        id: tx.id,
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transaction Details</Text>
        <TouchableOpacity onPress={() => setEditModalVisible(true)} style={styles.editBtn}>
          <Ionicons name="create-outline" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Card */}
        <View style={[styles.heroCard, Shadows.sm]}>
          <CategoryIcon
            iconName={category?.icon || 'pricetag'}
            color={category?.color || Colors.primary}
            bgColor={category?.bgColor}
            size="lg"
            style={styles.heroIcon}
          />
          <Text style={[styles.heroAmount, { color: amountColor }]}>
            {isIncome ? '+' : '-'}{formatCurrency(tx.amountPaise, user.preferredCurrency, false)}
          </Text>
          <Text style={styles.heroTitle}>{tx.title}</Text>
          <Badge
            label={tx.type.toUpperCase()}
            variant={isIncome ? 'success' : 'danger'}
            style={styles.heroBadge}
          />
        </View>

        {/* Details Table */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <View style={styles.detailValueRow}>
              <Ionicons name={category?.icon as any} size={16} color={category?.color} style={{ marginRight: 6 }} />
              <Text style={styles.detailValue}>{category?.name}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account</Text>
            <Text style={styles.detailValue}>{account?.name} ({account?.maskedNumber})</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>{formatDisplayDate(tx.date)}</Text>
          </View>

          {tx.merchant ? (
            <>
              <View style={styles.divider} />
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Merchant / Party</Text>
                <Text style={styles.detailValue}>{tx.merchant}</Text>
              </View>
            </>
          ) : null}

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Recurring Status</Text>
            <Text style={styles.detailValue}>{tx.isRecurring ? 'Yes (Automated Rule)' : 'One-time transaction'}</Text>
          </View>

          {tx.notes ? (
            <>
              <View style={styles.divider} />
              <View style={[styles.detailRow, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                <Text style={[styles.detailLabel, { marginBottom: 6 }]}>Notes</Text>
                <Text style={styles.notesText}>{tx.notes}</Text>
              </View>
            </>
          ) : null}
        </View>

        {/* Actions */}
        <View style={styles.actionSection}>
          <PrimaryButton
            title="Edit Transaction"
            onPress={() => setEditModalVisible(true)}
            variant="outline"
            style={styles.button}
          />
          <PrimaryButton
            title="Delete Transaction"
            onPress={() => setConfirmDelete(true)}
            variant="danger"
            style={styles.button}
          />
        </View>
      </ScrollView>

      {/* Delete Confirmation */}
      <ConfirmationDialog
        visible={confirmDelete}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction? Your account balance will be updated automatically."
        confirmText="Delete"
        isDestructive
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />

      {/* Edit Modal */}
      <AddTransactionModal
        visible={editModalVisible}
        accounts={accounts}
        existingTransactions={transactions}
        initialData={tx}
        currency={user.preferredCurrency}
        onClose={() => setEditModalVisible(false)}
        onSave={handleUpdate}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  editBtn: {
    padding: 4,
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  heroIcon: {
    marginBottom: 12,
  },
  heroAmount: {
    fontSize: Typography.fontSizes.display,
    fontWeight: Typography.fontWeights.heavy,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  heroBadge: {
    marginTop: 4,
  },
  detailsCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  detailLabel: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  detailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailValue: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  notesText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  actionSection: {
    gap: 12,
  },
  button: {
    width: '100%',
  },
  notFoundBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: Typography.fontSizes.md,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
});
