import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { CurrencyInput } from '../common/CurrencyInput';
import { PrimaryButton } from '../common/PrimaryButton';
import { parseCurrencyInput } from '../../utils/currency';
import { getCurrentMonthKey } from '../../utils/date';
import { DEFAULT_CATEGORIES } from '../../constants/CATEGORIES';
import { Budget, CurrencyCode } from '../../types';

interface AddBudgetModalProps {
  visible: boolean;
  currency?: CurrencyCode;
  onClose: () => void;
  onSave: (budgetData: Omit<Budget, 'id'>) => void;
}

export const AddBudgetModal: React.FC<AddBudgetModalProps> = ({
  visible,
  currency = 'INR',
  onClose,
  onSave,
}) => {
  const [categoryId, setCategoryId] = useState('cat_food');
  const [limitStr, setLimitStr] = useState('');
  const [threshold, setThreshold] = useState(80);
  const [error, setError] = useState('');

  const expenseCategories = DEFAULT_CATEGORIES.filter((c) => c.type === 'expense');

  const handleSave = () => {
    const monthlyLimitPaise = parseCurrencyInput(limitStr);
    if (monthlyLimitPaise <= 0) {
      setError('Please enter a valid monthly limit greater than zero.');
      return;
    }

    onSave({
      categoryId,
      monthlyLimitPaise,
      month: getCurrentMonthKey(),
      warningThresholdPercent: threshold,
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Monthly Budget</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <CurrencyInput
            label="Monthly Spending Limit"
            value={limitStr}
            onChangeText={(text) => {
              setLimitStr(text);
              if (error) setError('');
            }}
            currency={currency}
            error={error}
          />

          <Text style={styles.sectionLabel}>Select Expense Category</Text>
          <View style={styles.categoryGrid}>
            {expenseCategories.map((cat) => {
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

          <Text style={styles.sectionLabel}>Warning Alert Threshold ({threshold}%)</Text>
          <View style={styles.thresholdRow}>
            {[70, 75, 80, 85, 90].map((val) => {
              const isSelected = threshold === val;
              return (
                <TouchableOpacity
                  key={val}
                  activeOpacity={0.7}
                  onPress={() => setThreshold(val)}
                  style={[styles.thresholdBtn, isSelected ? styles.activeThreshold : null]}
                >
                  <Text style={[styles.thresholdText, isSelected ? styles.activeThresholdText : null]}>
                    {val}%
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <PrimaryButton
            title="Create Budget"
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
  sectionLabel: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: 10,
    marginTop: 10,
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
  thresholdRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
  },
  thresholdBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: Radii.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeThreshold: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  thresholdText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textSecondary,
  },
  activeThresholdText: {
    color: Colors.textInverse,
  },
  saveBtn: {
    marginTop: 10,
  },
});
