import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Line, Text as SvgText } from 'react-native-svg';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Radii } from '../../theme/radii';
import { Shadows } from '../../theme/shadows';
import { formatCompactCurrency } from '../../utils/currency';
import { CurrencyCode } from '../../types';

interface ChartBarData {
  label: string;
  incomePaise: number;
  expensePaise: number;
}

interface SpendingChartProps {
  data: ChartBarData[];
  currency?: CurrencyCode;
}

export const SpendingChart: React.FC<SpendingChartProps> = ({
  data,
  currency = 'INR',
}) => {
  if (!data || data.length === 0) {
    return null;
  }

  const maxVal = Math.max(
    ...data.flatMap((d) => [d.incomePaise, d.expensePaise]),
    100000 // default min height
  );

  const chartHeight = 140;
  const barWidth = 14;
  const gap = 8;
  const groupWidth = barWidth * 2 + gap + 16;
  const svgWidth = data.length * groupWidth + 20;

  return (
    <View style={[styles.container, Shadows.sm]}>
      <View style={styles.headerRow}>
        <Text style={styles.chartTitle}>Monthly Income vs Expenses</Text>
        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.income }]} />
            <Text style={styles.legendText}>Income</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.expense }]} />
            <Text style={styles.legendText}>Expense</Text>
          </View>
        </View>
      </View>

      <Svg width="100%" height={chartHeight + 35} viewBox={`0 0 ${svgWidth} ${chartHeight + 35}`}>
        {/* Baseline grid */}
        <Line x1="10" y1={chartHeight} x2={svgWidth - 10} y2={chartHeight} stroke={Colors.border} strokeWidth="1" />

        {data.map((item, index) => {
          const groupX = 15 + index * groupWidth;
          const incomeHeight = (item.incomePaise / maxVal) * (chartHeight - 20);
          const expenseHeight = (item.expensePaise / maxVal) * (chartHeight - 20);

          return (
            <React.Fragment key={index}>
              {/* Income Bar */}
              <Rect
                x={groupX}
                y={chartHeight - incomeHeight}
                width={barWidth}
                height={Math.max(4, incomeHeight)}
                rx="4"
                fill={Colors.income}
              />

              {/* Expense Bar */}
              <Rect
                x={groupX + barWidth + gap}
                y={chartHeight - expenseHeight}
                width={barWidth}
                height={Math.max(4, expenseHeight)}
                rx="4"
                fill={Colors.expense}
              />

              {/* Month Label */}
              <SvgText
                x={groupX + barWidth + gap / 2}
                y={chartHeight + 20}
                fontSize="11"
                fill={Colors.textSecondary}
                fontWeight="500"
                textAnchor="middle"
              >
                {item.label}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
  },
  legendRow: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
  },
});
