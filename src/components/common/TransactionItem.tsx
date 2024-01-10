import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { formatCurrency } from '../../utils/currency';
import { formatRelativeOrDate } from '../../utils/date';
import { CategoryIcon } from './CategoryIcon';
import { Transaction, Category, Account, CurrencyCode } from '../../types';

interface TransactionItemProps {
  transaction: Transaction;
  category?: Category;
  account?: Account;
  currency?: CurrencyCode;
  onPress: () => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  category,
  account,
  currency = 'INR',
  onPress,
}) => {
  const isIncome = transaction.type === 'income';
  const isTransfer = transaction.type === 'transfer';

  const amountColor = isIncome
    ? Colors.income
    : isTransfer
    ? Colors.info
    : Colors.textPrimary;

  const prefix = isIncome ? '+' : isTransfer ? '' : '-';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      {/* Category Icon */}
      <CategoryIcon
        iconName={category?.icon || 'pricetag-outline'}
        color={category?.color || Colors.primary}
        bgColor={category?.bgColor}
        size="md"
        style={styles.icon}
      />

      {/* Main Details */}
      <View style={styles.detailsCol}>
        <Text style={styles.title} numberOfLines={1}>
          {transaction.title}
        </Text>
        <View style={styles.subRow}>
          <Text style={styles.categoryName}>
            {category?.name || 'General'}
          </Text>
          {account ? (
            <>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.accountText}>{account.name}</Text>
            </>
          ) : null}
        </View>
      </View>

      {/* Amount and Date */}
      <View style={styles.amountCol}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {prefix}{formatCurrency(transaction.amountPaise, currency, false)}
        </Text>
        <Text style={styles.date}>
          {formatRelativeOrDate(transaction.date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: Spacing.screenPadding,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  icon: {
    marginRight: 12,
  },
  detailsCol: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
  },
  dot: {
    marginHorizontal: 4,
    color: Colors.textMuted,
    fontSize: 10,
  },
  accountText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textMuted,
  },
  amountCol: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
  },
  date: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
});
