import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { FormField } from '../common/FormField';
import { CurrencyInput } from '../common/CurrencyInput';
import { PrimaryButton } from '../common/PrimaryButton';
import { parseCurrencyInput } from '../../utils/currency';
import { validateTransaction, detectDuplicateTransaction } from '../../utils/validators';
import { DEFAULT_CATEGORIES } from '../../constants/CATEGORIES';
import { Transaction, Account, TransactionType, CurrencyCode } from '../../types';

interface AddTransactionModalProps {
  visible: boolean;
  accounts: Account[];
  existingTransactions: Transaction[];
  initialData?: Transaction | null;
  currency?: CurrencyCode;
  onClose: () => void;
  onSave: (transactionData: Omit<Transaction, 'id'>, id?: string) => void;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  visible,
  accounts,
  existingTransactions,
  initialData,
  currency = 'INR',
  onClose,
  onSave,
}) => {
  const [type, setType] = useState<TransactionType>(initialData?.type || 'expense');
  const [amountStr, setAmountStr] = useState(
    initialData ? String(initialData.amountPaise / 100) : ''
  );
  const [title, setTitle] = useState(initialData?.title || '');
  const [categoryId, setCategoryId] = useState(
    initialData?.categoryId || 'cat_food'
  );
  const [accountId, setAccountId] = useState(
    initialData?.accountId || (accounts[0]?.id || '')
  );
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [isRecurring, setIsRecurring] = useState(initialData?.isRecurring || false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredCategories = DEFAULT_CATEGORIES.filter((c) =>
    type === 'income' ? c.type === 'income' : c.type === 'expense'
  );

  const handleSave = () => {
    const amountPaise = parseCurrencyInput(amountStr);
    const date = initialData ? initialData.date : new Date().toISOString();

    const candidate = {
      title,
      amountPaise,
      type,
      categoryId,
      accountId,
      date,
      notes: notes.trim() || undefined,
      isRecurring,
    };

    const validation = validateTransaction(candidate);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Check duplicate
    if (!initialData && detectDuplicateTransaction(candidate, existingTransactions)) {
      Alert.alert(
        'Duplicate Transaction Warning',
        'An identical transaction was already recorded in this account today. Do you still wish to save it?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Save Anyway',
            onPress: () => {
              onSave(candidate, undefined);
              onClose();
            },
          },
        ]
      );
      return;
    }

    onSave(candidate, undefined);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {initialData ? 'Edit Transaction' : 'New Transaction'}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Type Segment */}
          <View style={styles.segmentContainer}>
            {(['expense', 'income'] as TransactionType[]).map((t) => {
              const isSelected = type === t;
              return (
                <TouchableOpacity
                  key={t}
                  activeOpacity={0.8}
                  onPress={() => {
                    setType(t);
                    setCategoryId(t === 'income' ? 'cat_salary' : 'cat_food');
                  }}
                  style={[
                    styles.segmentBtn,
                    isSelected ? (t === 'expense' ? styles.segmentExpense : styles.segmentIncome) : null,
                  ]}
                >
                  <Text style={[styles.segmentText, isSelected ? styles.segmentActiveText : null]}>
                    {t.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Amount Input */}
          <CurrencyInput
            label="Transaction Amount"
            value={amountStr}
            onChangeText={(text) => {
              setAmountStr(text);
              if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
            }}
            currency={currency}
            error={errors.amount}
          />

          {/* Title / Merchant */}
          <FormField
            label="Merchant or Title"
            placeholder="e.g. Swiggy, Amazon, Salary"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
            }}
            error={errors.title}
          />

          {/* Category Chips */}
          <Text style={styles.sectionLabel}>Select Category</Text>
          <View style={styles.categoryGrid}>
            {filteredCategories.map((cat) => {
              const isSelected = categoryId === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  activeOpacity={0.7}
                  onPress={() => setCategoryId(cat.id)}
                  style={[
                    styles.categoryChip,
                    isSelected ? { backgroundColor: cat.color, borderColor: cat.color } : null,
                  ]}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={16}
                    color={isSelected ? '#FFF' : cat.color}
                  />
                  <Text style={[styles.categoryChipText, isSelected ? { color: '#FFF' } : null]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Account Selector */}
          <Text style={styles.sectionLabel}>Account</Text>
          <View style={styles.accountRow}>
            {accounts.map((acc) => {
              const isSelected = accountId === acc.id;
              return (
                <TouchableOpacity
                  key={acc.id}
                  activeOpacity={0.8}
                  onPress={() => setAccountId(acc.id)}
                  style={[
                    styles.accountOption,
                    isSelected ? { borderColor: Colors.primary, backgroundColor: Colors.surfaceSecondary } : null,
                  ]}
                >
                  <Ionicons name={acc.icon as any} size={18} color={isSelected ? Colors.primary : Colors.textSecondary} />
                  <Text style={[styles.accountName, isSelected ? { fontWeight: '700', color: Colors.primary } : null]} numberOfLines={1}>
                    {acc.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Notes */}
          <FormField
            label="Optional Notes"
            placeholder="Add invoice ID, split info, or reminders..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={2}
          />

          {/* Recurring Toggle */}
          <View style={styles.recurringRow}>
            <View>
              <Text style={styles.recurringLabel}>Recurring Transaction</Text>
              <Text style={styles.recurringSub}>Repeats automatically in records</Text>
            </View>
            <Switch
              value={isRecurring}
              onValueChange={setIsRecurring}
              trackColor={{ false: Colors.border, true: Colors.accent }}
            />
          </View>

          {/* Save Button */}
          <PrimaryButton
            title={initialData ? 'Update Transaction' : 'Save Transaction'}
            onPress={handleSave}
            size="lg"
            style={styles.saveBtn}
          />
        </ScrollView>
      </View>
    </Modal>
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
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    backgroundColor: Colors.surface,
  },
  closeBtn: {
    padding: 6,
  },
  headerTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  scrollContent: {
    padding: Spacing.screenPadding,
    paddingBottom: 40,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Radii.md,
    padding: 4,
    marginBottom: 20,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Radii.sm,
  },
  segmentExpense: {
    backgroundColor: Colors.expense,
  },
  segmentIncome: {
    backgroundColor: Colors.income,
  },
  segmentText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textSecondary,
  },
  segmentActiveText: {
    color: Colors.textInverse,
  },
  sectionLabel: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: 10,
    marginTop: 6,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 6,
  },
  categoryChipText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
  },
  accountRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  accountOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: Radii.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 6,
  },
  accountName: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textPrimary,
    flex: 1,
  },
  recurringRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    padding: 14,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    marginBottom: 24,
  },
  recurringLabel: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  recurringSub: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  saveBtn: {
    marginTop: 10,
  },
});
