import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { TransactionItem } from '../../components/common/TransactionItem';
import { DateFilter, DateFilterOption } from '../../components/common/DateFilter';
import { EmptyState } from '../../components/common/EmptyState';
import { FilterModal } from '../../components/modals/FilterModal';
import { AddTransactionModal } from '../../components/modals/AddTransactionModal';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { addTransaction, setFilter, resetFilter } from '../../store/slices/transactionSlice';
import { updateAccountBalance } from '../../store/slices/accountSlice';
import { formatCurrency } from '../../utils/currency';
import { formatDisplayDate, groupTransactionsByDate, isDateInRange } from '../../utils/date';
import { DEFAULT_CATEGORIES } from '../../constants/CATEGORIES';
import { Transaction, TransactionFilter } from '../../types';

export const TransactionsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const transactions = useAppSelector((state) => state.transaction.transactions);
  const filter = useAppSelector((state) => state.transaction.filter);
  const accounts = useAppSelector((state) => state.account.accounts);
  const user = useAppSelector((state) => state.user.profile);

  const [searchQuery, setSearchQuery] = useState('');
  const [dateOption, setDateOption] = useState<DateFilterOption>('this_month');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Date range mapping
  const dateRange = useMemo(() => {
    const now = new Date();
    switch (dateOption) {
      case 'this_month': {
        const start = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
        return { start, end: undefined };
      }
      case 'last_month': {
        const lastM = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        const start = `${lastM.getFullYear()}-${String(lastM.getMonth() + 1).padStart(2, '0')}-01`;
        const end = `${lastM.getFullYear()}-${String(lastM.getMonth() + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
        return { start, end };
      }
      case 'last_3_months': {
        const threeMAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
        const start = `${threeMAgo.getFullYear()}-${String(threeMAgo.getMonth() + 1).padStart(2, '0')}-01`;
        return { start, end: undefined };
      }
      case 'all':
      default:
        return { start: undefined, end: undefined };
    }
  }, [dateOption]);

  // Filtered transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const titleMatch = tx.title.toLowerCase().includes(q);
        const merchantMatch = tx.merchant ? tx.merchant.toLowerCase().includes(q) : false;
        const categoryMatch = DEFAULT_CATEGORIES.find((c) => c.id === tx.categoryId)?.name.toLowerCase().includes(q);
        if (!titleMatch && !merchantMatch && !categoryMatch) return false;
      }

      // Type filter
      if (filter.type !== 'all' && tx.type !== filter.type) {
        return false;
      }

      // Category filter
      if (filter.categoryId && tx.categoryId !== filter.categoryId) {
        return false;
      }

      // Account filter
      if (filter.accountId && tx.accountId !== filter.accountId) {
        return false;
      }

      // Date range filter
      if (!isDateInRange(tx.date, dateRange.start, dateRange.end)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filter.sortBy) {
        case 'amount_desc':
          return b.amountPaise - a.amountPaise;
        case 'amount_asc':
          return a.amountPaise - b.amountPaise;
        case 'date_asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date_desc':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  }, [transactions, searchQuery, filter, dateRange]);

  // Filtered totals
  const totalFilteredExpense = useMemo(
    () => filteredTransactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amountPaise, 0),
    [filteredTransactions]
  );

  const totalFilteredIncome = useMemo(
    () => filteredTransactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amountPaise, 0),
    [filteredTransactions]
  );

  // Grouped by Date
  const groupedSections = useMemo(() => {
    const grouped = groupTransactionsByDate(filteredTransactions);
    return Object.entries(grouped).map(([dateKey, items]) => ({
      dateKey,
      items,
    }));
  }, [filteredTransactions]);

  const hasActiveFilters = Boolean(filter.categoryId || filter.accountId || filter.type !== 'all');

  const handleSaveTransaction = (data: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = {
      ...data,
      id: `tx_${Date.now()}`,
    };
    dispatch(addTransaction(newTx));

    const balanceChange = data.type === 'income' ? data.amountPaise : -data.amountPaise;
    dispatch(
      updateAccountBalance({
        accountId: data.accountId,
        amountPaiseChange: balanceChange,
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search and Filter Top Bar */}
      <View style={styles.searchBarRow}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={18} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            placeholder="Search merchant, title or category..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setFilterModalVisible(true)}
          style={[styles.filterBtn, hasActiveFilters ? styles.activeFilterBtn : null]}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={hasActiveFilters ? '#FFF' : Colors.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setAddModalVisible(true)}
          style={styles.addBtn}
        >
          <Ionicons name="add" size={22} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Date Range Chips */}
      <DateFilter selected={dateOption} onSelect={setDateOption} />

      {/* Mini summary strip */}
      <View style={styles.summaryStrip}>
        <Text style={styles.countText}>
          {filteredTransactions.length} {filteredTransactions.length === 1 ? 'transaction' : 'transactions'}
        </Text>
        <View style={styles.stripTotals}>
          <Text style={[styles.stripAmount, { color: Colors.income }]}>
            +{formatCurrency(totalFilteredIncome, user.preferredCurrency, false)}
          </Text>
          <Text style={styles.stripDivider}>|</Text>
          <Text style={[styles.stripAmount, { color: Colors.expense }]}>
            -{formatCurrency(totalFilteredExpense, user.preferredCurrency, false)}
          </Text>
        </View>
      </View>

      {/* Transactions List */}
      <FlatList
        data={groupedSections}
        keyExtractor={(item) => item.dateKey}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon="receipt-outline"
            title="No Transactions Found"
            description="Try adjusting your filters or date selection, or record a new transaction."
            actionTitle="+ Add Transaction"
            onAction={() => setAddModalVisible(true)}
          />
        }
        renderItem={({ item }) => (
          <View style={styles.dateGroup}>
            <View style={styles.dateHeader}>
              <Text style={styles.dateHeaderText}>{formatDisplayDate(item.dateKey)}</Text>
              <Text style={styles.dateItemCount}>{item.items.length} records</Text>
            </View>
            <View style={styles.groupCard}>
              {item.items.map((tx) => {
                const cat = DEFAULT_CATEGORIES.find((c) => c.id === tx.categoryId);
                const acc = accounts.find((a) => a.id === tx.accountId);
                return (
                  <TransactionItem
                    key={tx.id}
                    transaction={tx}
                    category={cat}
                    account={acc}
                    currency={user.preferredCurrency}
                    onPress={() =>
                      navigation.navigate('TransactionDetailScreen', {
                        transactionId: tx.id,
                      })
                    }
                  />
                );
              })}
            </View>
          </View>
        )}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        currentFilter={filter}
        accounts={accounts}
        onClose={() => setFilterModalVisible(false)}
        onApply={(newFilter) => dispatch(setFilter(newFilter))}
        onReset={() => dispatch(resetFilter())}
      />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        visible={addModalVisible}
        accounts={accounts}
        existingTransactions={transactions}
        currency={user.preferredCurrency}
        onClose={() => setAddModalVisible(false)}
        onSave={handleSaveTransaction}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: 10,
    paddingBottom: 6,
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: Typography.fontSizes.sm,
    color: Colors.textPrimary,
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: Radii.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilterBtn: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: Radii.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 6,
    backgroundColor: Colors.surfaceSecondary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },
  countText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  stripTotals: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stripAmount: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
  },
  stripDivider: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  listContent: {
    paddingBottom: 40,
  },
  dateGroup: {
    marginTop: 14,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: 6,
  },
  dateHeaderText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateItemCount: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  groupCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.screenPadding,
    borderRadius: Radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
});
