import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { formatCurrency } from '../../utils/currency';
import { Account, CurrencyCode } from '../../types';

interface AccountCardProps {
  account: Account;
  currency?: CurrencyCode;
  onPress?: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  currency = 'INR',
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={!onPress}
      style={[styles.card, { backgroundColor: account.color }, Shadows.md]}
    >
      <View style={styles.topRow}>
        <View style={styles.instInfo}>
          <Text style={styles.instName}>{account.institution}</Text>
          <Text style={styles.accountName}>{account.name}</Text>
        </View>
        <Ionicons name={account.icon as any} size={24} color="#FFF" />
      </View>

      <Text style={styles.maskedNumber}>{account.maskedNumber}</Text>

      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
          <Text style={styles.balanceValue}>
            {formatCurrency(account.balancePaise, currency, false)}
          </Text>
        </View>
        <View style={styles.typeTag}>
          <Text style={styles.typeText}>{account.type.replace('_', ' ').toUpperCase()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Radii.xl,
    padding: Spacing.lg,
    marginRight: 14,
    width: 280,
    height: 165,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  instInfo: {
    flex: 1,
  },
  instName: {
    fontSize: Typography.fontSizes.xs,
    color: 'rgba(255, 255, 255, 0.75)',
    fontWeight: Typography.fontWeights.medium,
    textTransform: 'uppercase',
  },
  accountName: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: '#FFF',
    marginTop: 2,
  },
  maskedNumber: {
    fontSize: Typography.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  balanceLabel: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.75)',
    letterSpacing: 0.5,
  },
  balanceValue: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.heavy,
    color: '#FFF',
    marginTop: 1,
  },
  typeTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.sm,
  },
  typeText: {
    fontSize: 10,
    fontWeight: Typography.fontWeights.bold,
    color: '#FFF',
  },
});
