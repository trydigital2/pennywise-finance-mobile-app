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
import { PrimaryButton } from '../common/PrimaryButton';
import { DEFAULT_CATEGORIES } from '../../constants/CATEGORIES';
import { TransactionFilter, Account, SortOption } from '../../types';

interface FilterModalProps {
  visible: boolean;
  currentFilter: TransactionFilter;
  accounts: Account[];
  onClose: () => void;
  onApply: (filter: TransactionFilter) => void;
  onReset: () => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  currentFilter,
  accounts,
  onClose,
  onApply,
  onReset,
}) => {
  const [type, setType] = useState(currentFilter.type || 'all');
  const [categoryId, setCategoryId] = useState<string | undefined>(currentFilter.categoryId);
  const [accountId, setAccountId] = useState<string | undefined>(currentFilter.accountId);
  const [sortBy, setSortBy] = useState<SortOption>(currentFilter.sortBy || 'date_desc');

  const handleApply = () => {
    onApply({
      type,
      categoryId,
      accountId,
      sortBy,
      searchQuery: currentFilter.searchQuery,
      startDate: currentFilter.startDate,
      endDate: currentFilter.endDate,
    });
    onClose();
  };

  const handleReset = () => {
    setType('all');
    setCategoryId(undefined);
    setAccountId(undefined);
    setSortBy('date_desc');
    onReset();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filter Transactions</Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Transaction Type */}
          <Text style={styles.sectionLabel}>Transaction Type</Text>
          <View style={styles.chipsRow}>
            {[
              { id: 'all', label: 'All' },
              { id: 'expense', label: 'Expenses' },
              { id: 'income', label: 'Income' },
            ].map((t) => {
              const isSelected = type === t.id;
              return (
                <TouchableOpacity
                  key={t.id}
                  activeOpacity={0.7}
                  onPress={() => setType(t.id as any)}
                  style={[styles.chip, isSelected ? styles.activeChip : null]}
                >
                  <Text style={[styles.chipText, isSelected ? styles.activeChipText : null]}>
                    {t.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Sort Order */}
          <Text style={styles.sectionLabel}>Sort By</Text>
          <View style={styles.chipsRow}>
            {[
              { id: 'date_desc', label: 'Newest First' },
              { id: 'date_asc', label: 'Oldest First' },
              { id: 'amount_desc', label: 'Highest Amount' },
              { id: 'amount_asc', label: 'Lowest Amount' },
            ].map((s) => {
              const isSelected = sortBy === s.id;
              return (
                <TouchableOpacity
                  key={s.id}
                  activeOpacity={0.7}
                  onPress={() => setSortBy(s.id as SortOption)}
                  style={[styles.chip, isSelected ? styles.activeChip : null]}
                >
                  <Text style={[styles.chipText, isSelected ? styles.activeChipText : null]}>
                    {s.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Filter by Account */}
          <Text style={styles.sectionLabel}>Account</Text>
          <View style={styles.chipsRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setAccountId(undefined)}
              style={[styles.chip, !accountId ? styles.activeChip : null]}
            >
              <Text style={[styles.chipText, !accountId ? styles.activeChipText : null]}>
                All Accounts
              </Text>
            </TouchableOpacity>
            {accounts.map((acc) => {
              const isSelected = accountId === acc.id;
              return (
                <TouchableOpacity
                  key={acc.id}
                  activeOpacity={0.7}
                  onPress={() => setAccountId(isSelected ? undefined : acc.id)}
                  style={[styles.chip, isSelected ? styles.activeChip : null]}
                >
                  <Text style={[styles.chipText, isSelected ? styles.activeChipText : null]}>
                    {acc.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Filter by Category */}
          <Text style={styles.sectionLabel}>Category</Text>
          <View style={styles.chipsRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setCategoryId(undefined)}
              style={[styles.chip, !categoryId ? styles.activeChip : null]}
            >
              <Text style={[styles.chipText, !categoryId ? styles.activeChipText : null]}>
                All Categories
              </Text>
            </TouchableOpacity>
            {DEFAULT_CATEGORIES.map((cat) => {
              const isSelected = categoryId === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  activeOpacity={0.7}
                  onPress={() => setCategoryId(isSelected ? undefined : cat.id)}
                  style={[styles.chip, isSelected ? styles.activeChip : null]}
                >
                  <Text style={[styles.chipText, isSelected ? styles.activeChipText : null]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <PrimaryButton
            title="Apply Filters"
            onPress={handleApply}
            size="lg"
            style={styles.applyBtn}
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
  resetText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.expense,
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
    marginTop: 14,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  activeChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  activeChipText: {
    color: Colors.textInverse,
    fontWeight: Typography.fontWeights.semibold,
  },
  applyBtn: {
    marginTop: 30,
  },
});
