import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { Header } from '../../components/common/Header';
import { CategoryIcon } from '../../components/common/CategoryIcon';
import { SpendingChart } from '../../components/common/SpendingChart';
import { useAppSelector } from '../../store/hooks';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateCategorySpending,
} from '../../utils/calculations';
import { formatCurrency } from '../../utils/currency';
import { DEFAULT_CATEGORIES } from '../../constants/CATEGORIES';

export const AnalyticsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const transactions = useAppSelector((state) => state.transaction.transactions);
  const user = useAppSelector((state) => state.user.profile);

  const [selectedMonth, setSelectedMonth] = useState('2026-10');

  const startOfMonth = `${selectedMonth}-01`;
  const endOfMonth = `${selectedMonth}-31`;

  const totalExpensePaise = useMemo(
    () => calculateTotalExpenses(transactions, startOfMonth, endOfMonth),
    [transactions, startOfMonth, endOfMonth]
  );

  const totalIncomePaise = useMemo(
    () => calculateTotalIncome(transactions, startOfMonth, endOfMonth),
    [transactions, startOfMonth, endOfMonth]
  );

  // Category breakdown
  const categorySpending = useMemo(
    () => calculateCategorySpending(transactions, startOfMonth, endOfMonth),
    [transactions, startOfMonth, endOfMonth]
  );

  const categoryList = useMemo(() => {
    return Object.entries(categorySpending)
      .map(([catId, amountPaise]) => {
        const cat = DEFAULT_CATEGORIES.find((c) => c.id === catId);
        const percent = totalExpensePaise > 0
          ? Math.round((amountPaise / totalExpensePaise) * 100)
          : 0;
        return {
          catId,
          name: cat?.name || 'General',
          icon: cat?.icon || 'pricetag',
          color: cat?.color || Colors.primary,
          bgColor: cat?.bgColor,
          amountPaise,
          percent,
        };
      })
      .sort((a, b) => b.amountPaise - a.amountPaise);
  }, [categorySpending, totalExpensePaise]);

  // Average daily spend (30 days)
  const averageDailySpend = Math.round(totalExpensePaise / 30);

  // Top Merchants
  const topMerchants = useMemo(() => {
    const map: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense' && t.date.startsWith(selectedMonth))
      .forEach((t) => {
        const name = t.merchant || t.title;
        map[name] = (map[name] || 0) + t.amountPaise;
      });
    return Object.entries(map)
      .map(([name, amountPaise]) => ({ name, amountPaise }))
      .sort((a, b) => b.amountPaise - a.amountPaise)
      .slice(0, 5);
  }, [transactions, selectedMonth]);

  const months = [
    { key: '2026-10', label: 'October' },
    { key: '2026-09', label: 'September' },
    { key: '2026-08', label: 'August' },
  ];

  const chartData = [
    {
      label: 'Aug',
      incomePaise: calculateTotalIncome(transactions, '2026-08-01', '2026-08-31'),
      expensePaise: calculateTotalExpenses(transactions, '2026-08-01', '2026-08-31'),
    },
    {
      label: 'Sep',
      incomePaise: calculateTotalIncome(transactions, '2026-09-01', '2026-09-30'),
      expensePaise: calculateTotalExpenses(transactions, '2026-09-01', '2026-09-30'),
    },
    {
      label: 'Oct',
      incomePaise: calculateTotalIncome(transactions, '2026-10-01', '2026-10-31'),
      expensePaise: calculateTotalExpenses(transactions, '2026-10-01', '2026-10-31'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Spending Analytics"
        showBack
        onBack={() => navigation.goBack()}
        subtitle="Insights & Breakdown"
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Month Selector */}
        <View style={styles.monthPills}>
          {months.map((m) => {
            const isSelected = selectedMonth === m.key;
            return (
              <TouchableOpacity
                key={m.key}
                activeOpacity={0.7}
                onPress={() => setSelectedMonth(m.key)}
                style={[styles.monthChip, isSelected ? styles.activeMonthChip : null]}
              >
                <Text style={[styles.monthChipText, isSelected ? styles.activeMonthText : null]}>
                  {m.label} 2026
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Daily Average Card */}
        <View style={[styles.dailyCard, Shadows.sm]}>
          <View>
            <Text style={styles.dailyLabel}>AVERAGE DAILY SPEND</Text>
            <Text style={styles.dailyValue}>
              {formatCurrency(averageDailySpend, user.preferredCurrency, false)}
              <Text style={styles.dailyUnit}> / day</Text>
            </Text>
          </View>
          <View style={styles.statIconBox}>
            <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
          </View>
        </View>

        {/* Cash Flow Comparison */}
        <SpendingChart data={chartData} currency={user.preferredCurrency} />

        {/* Category Breakdown Progress List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Spending Breakdown</Text>
          <View style={styles.breakdownCard}>
            {categoryList.map((item) => (
              <View key={item.catId} style={styles.catRow}>
                <CategoryIcon
                  iconName={item.icon}
                  color={item.color}
                  bgColor={item.bgColor}
                  size="sm"
                  style={styles.catIcon}
                />
                <View style={styles.catDetails}>
                  <View style={styles.catTopRow}>
                    <Text style={styles.catName}>{item.name}</Text>
                    <Text style={styles.catAmount}>
                      {formatCurrency(item.amountPaise, user.preferredCurrency, false)}
                    </Text>
                  </View>
                  <View style={styles.catTrack}>
                    <View
                      style={[
                        styles.catFill,
                        { width: `${item.percent}%`, backgroundColor: item.color },
                      ]}
                    />
                  </View>
                  <Text style={styles.catPercentText}>{item.percent}% of total</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Top Merchants Leaderboard */}
        {topMerchants.length > 0 ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Top Outflow Merchants</Text>
            <View style={styles.merchantsCard}>
              {topMerchants.map((m, idx) => (
                <View key={idx} style={styles.merchantRow}>
                  <View style={styles.rankBadge}>
                    <Text style={styles.rankText}>#{idx + 1}</Text>
                  </View>
                  <Text style={styles.merchantName} numberOfLines={1}>
                    {m.name}
                  </Text>
                  <Text style={styles.merchantAmount}>
                    {formatCurrency(m.amountPaise, user.preferredCurrency, false)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
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
  monthPills: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: 12,
    gap: 8,
  },
  monthChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: Radii.full,
    backgroundColor: Colors.surfaceSecondary,
  },
  activeMonthChip: {
    backgroundColor: Colors.primary,
  },
  monthChipText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  activeMonthText: {
    color: '#FFF',
    fontWeight: Typography.fontWeights.semibold,
  },
  dailyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.screenPadding,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  dailyLabel: {
    fontSize: 10,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  dailyValue: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.textPrimary,
    marginTop: 4,
  },
  dailyUnit: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.regular,
    color: Colors.textSecondary,
  },
  statIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginTop: 18,
    paddingHorizontal: Spacing.screenPadding,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  breakdownCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  catIcon: {
    marginRight: 12,
  },
  catDetails: {
    flex: 1,
  },
  catTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  catName: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  catAmount: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  catTrack: {
    height: 6,
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  catFill: {
    height: '100%',
    borderRadius: 3,
  },
  catPercentText: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  merchantsCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  merchantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  rankBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  rankText: {
    fontSize: 10,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  merchantName: {
    flex: 1,
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textPrimary,
  },
  merchantAmount: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
});
