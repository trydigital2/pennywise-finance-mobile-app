import React from 'react';
import { View, Text, TextInput, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Radii } from '../../theme/radii';
import { CURRENCY_SYMBOLS } from '../../utils/currency';
import { CurrencyCode } from '../../types';

interface CurrencyInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  currency?: CurrencyCode;
  error?: string;
  style?: ViewStyle;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label = 'Amount',
  value,
  onChangeText,
  currency = 'INR',
  error,
  style,
}) => {
  const symbol = CURRENCY_SYMBOLS[currency] || '₹';

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputBox, error ? styles.errorBorder : null]}>
        <Text style={styles.symbol}>{symbol}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="0.00"
          placeholderTextColor={Colors.textMuted}
          keyboardType="decimal-pad"
          style={styles.input}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: Radii.lg,
    paddingHorizontal: 16,
    height: 58,
  },
  errorBorder: {
    borderColor: Colors.expense,
  },
  symbol: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.primary,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  errorText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.expense,
    marginTop: 4,
  },
});
