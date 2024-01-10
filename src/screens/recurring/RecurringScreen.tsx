import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Header } from '../../components/common/Header';
import { CategoryIcon } from '../../components/common/CategoryIcon';
import { EmptyState } from '../../components/common/EmptyState';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { toggleRuleActive, deleteRecurringRule } from '../../store/slices/recurringSlice';
import { formatCurrency } from '../../utils/currency';
import { formatDisplayDate } from '../../utils/date';
import { DEFAULT_CATEGORIES } from '../../constants/CATEGORIES';

export const RecurringScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const rules = useAppSelector((state) => state.recurring.rules);
  const accounts = useAppSelector((state) => state.account.accounts);
  const user = useAppSelector((state) => state.user.profile);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Recurring Transactions"
        showBack
        onBack={() => navigation.goBack()}
        subtitle="Automated Reminders & Rules"
      />

      <FlatList
        data={rules}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="repeat-outline"
            title="No Recurring Rules"
            description="Set up automatic rules for rent, broadband, or salary deposits."
          />
        }
        renderItem={({ item }) => {
          const category = DEFAULT_CATEGORIES.find((c) => c.id === item.categoryId);
          const account = accounts.find((a) => a.id === item.accountId);
          const isIncome = item.type === 'income';

          return (
            <View style={styles.card}>
              <CategoryIcon
                iconName={category?.icon || 'pricetag'}
                color={category?.color || Colors.primary}
                bgColor={category?.bgColor}
                size="md"
                style={styles.icon}
              />

              <View style={styles.detailsCol}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.subtext}>
                  {item.frequency.toUpperCase()} • Due {formatDisplayDate(item.nextDueDate)}
                </Text>
                <Text style={styles.accountText}>{account?.name}</Text>
              </View>

              <View style={styles.rightCol}>
                <Text style={[styles.amount, { color: isIncome ? Colors.income : Colors.expense }]}>
                  {isIncome ? '+' : '-'}{formatCurrency(item.amountPaise, user.preferredCurrency, false)}
                </Text>
                <Switch
                  value={item.isActive}
                  onValueChange={() => { dispatch(toggleRuleActive(item.id)); }}
                  trackColor={{ false: Colors.border, true: Colors.accent }}
                  style={{ marginTop: 6 }}
                />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Spacing.screenPadding,
    paddingBottom: 40,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  icon: {
    marginRight: 12,
  },
  detailsCol: {
    flex: 1,
  },
  title: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  subtext: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  accountText: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  amount: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
  },
});
