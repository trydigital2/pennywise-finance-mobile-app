import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Header } from '../../components/common/Header';
import { AccountCard } from '../../components/common/AccountCard';
import { TransactionItem } from '../../components/common/TransactionItem';
import { EmptyState } from '../../components/common/EmptyState';
import { useAppSelector } from '../../store/hooks';
import { formatCurrency } from '../../utils/currency';
import { DEFAULT_CATEGORIES } from '../../constants/CATEGORIES';

export const AccountsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const accounts = useAppSelector((state) => state.account.accounts);
  const transactions = useAppSelector((state) => state.transaction.transactions);
  const user = useAppSelector((state) => state.user.profile);

  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || '');

  const selectedAccount = useMemo(
    () => accounts.find((a) => a.id === selectedAccountId) || accounts[0],
    [accounts, selectedAccountId]
  );

  const accountTransactions = useMemo(
    () => transactions.filter((t) => t.accountId === selectedAccountId),
    [transactions, selectedAccountId]
  );

  const totalLiquid = useMemo(
    () => accounts.reduce((sum, a) => sum + a.balancePaise, 0),
    [accounts]
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="My Accounts"
        showBack
        onBack={() => navigation.goBack()}
        subtitle="Simulated Liquid Balances"
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Simulation Banner */}
        <View style={styles.banner}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.info} />
          <Text style={styles.bannerText}>
            Simulated demo accounts. No real bank accounts or credentials connected.
          </Text>
        </View>

        {/* Total Wealth Summary */}
        <View style={styles.summaryBar}>
          <Text style={styles.summaryLabel}>Total Liquid Assets</Text>
          <Text style={styles.summaryValue}>
            {formatCurrency(totalLiquid, user.preferredCurrency, false)}
          </Text>
        </View>

        {/* Horizontal Cards Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScroll}
        >
          {accounts.map((acc) => (
            <AccountCard
              key={acc.id}
              account={acc}
              currency={user.preferredCurrency}
              onPress={() => setSelectedAccountId(acc.id)}
            />
          ))}
        </ScrollView>

        {/* Selected Account Transactions */}
        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>
            Transactions for {selectedAccount?.name}
          </Text>
          <Text style={styles.txCount}>{accountTransactions.length} items</Text>
        </View>

        <View style={styles.transactionsWrapper}>
          {accountTransactions.length > 0 ? (
            accountTransactions.map((tx) => {
              const cat = DEFAULT_CATEGORIES.find((c) => c.id === tx.categoryId);
              return (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  category={cat}
                  account={selectedAccount}
                  currency={user.preferredCurrency}
                  onPress={() =>
                    navigation.navigate('TransactionDetailScreen', {
                      transactionId: tx.id,
                    })
                  }
                />
              );
            })
          ) : (
            <EmptyState
              icon="wallet-outline"
              title="No Account Transactions"
              description="No transactions found for this specific simulated account."
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.infoBg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  bannerText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.info,
    flex: 1,
  },
  summaryBar: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: 16,
    paddingBottom: 8,
  },
  summaryLabel: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.fontWeights.medium,
  },
  summaryValue: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.textPrimary,
    marginTop: 2,
  },
  cardsScroll: {
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 12,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    marginTop: 16,
    marginBottom: 10,
  },
  transactionsTitle: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  txCount: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
  },
  transactionsWrapper: {
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.screenPadding,
    borderRadius: Radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
});
