import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Radii } from '../../theme/radii';

export type DateFilterOption = 'this_month' | 'last_month' | 'last_3_months' | 'all';

interface DateFilterProps {
  selected: DateFilterOption;
  onSelect: (option: DateFilterOption) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ selected, onSelect }) => {
  const options: { id: DateFilterOption; label: string }[] = [
    { id: 'this_month', label: 'This Month' },
    { id: 'last_month', label: 'Last Month' },
    { id: 'last_3_months', label: 'Last 3 Months' },
    { id: 'all', label: 'All Time' },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <TouchableOpacity
            key={opt.id}
            activeOpacity={0.7}
            onPress={() => onSelect(opt.id)}
            style={[styles.chip, isSelected ? styles.activeChip : null]}
          >
            <Text style={[styles.chipText, isSelected ? styles.activeText : null]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radii.full,
    backgroundColor: Colors.surfaceSecondary,
  },
  activeChip: {
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
    color: Colors.textSecondary,
  },
  activeText: {
    color: Colors.textInverse,
    fontWeight: Typography.fontWeights.semibold,
  },
});
