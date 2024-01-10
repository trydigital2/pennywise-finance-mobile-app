import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Radii } from '../../theme/radii';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) => {
  const getContainerStyle = (): ViewStyle => {
    let base: ViewStyle = styles.base;

    switch (variant) {
      case 'primary':
        base = { ...base, backgroundColor: Colors.primary };
        break;
      case 'secondary':
        base = { ...base, backgroundColor: Colors.surfaceSecondary };
        break;
      case 'outline':
        base = { ...base, backgroundColor: 'transparent', borderWidth: 1.5, borderColor: Colors.border };
        break;
      case 'danger':
        base = { ...base, backgroundColor: Colors.expense };
        break;
      case 'ghost':
        base = { ...base, backgroundColor: 'transparent' };
        break;
    }

    switch (size) {
      case 'sm':
        base = { ...base, paddingVertical: 8, paddingHorizontal: 12, borderRadius: Radii.sm };
        break;
      case 'md':
        base = { ...base, paddingVertical: 12, paddingHorizontal: 18, borderRadius: Radii.md };
        break;
      case 'lg':
        base = { ...base, paddingVertical: 16, paddingHorizontal: 24, borderRadius: Radii.lg };
        break;
    }

    if (disabled || isLoading) {
      base = { ...base, opacity: 0.6 };
    }

    return base;
  };

  const getTextStyle = (): TextStyle => {
    let baseText: TextStyle = styles.baseText;

    switch (variant) {
      case 'primary':
      case 'danger':
        baseText = { ...baseText, color: Colors.textInverse };
        break;
      case 'secondary':
        baseText = { ...baseText, color: Colors.textPrimary };
        break;
      case 'outline':
        baseText = { ...baseText, color: Colors.textPrimary };
        break;
      case 'ghost':
        baseText = { ...baseText, color: Colors.accent };
        break;
    }

    switch (size) {
      case 'sm':
        baseText = { ...baseText, fontSize: Typography.fontSizes.sm };
        break;
      case 'md':
        baseText = { ...baseText, fontSize: Typography.fontSizes.md };
        break;
      case 'lg':
        baseText = { ...baseText, fontSize: Typography.fontSizes.lg };
        break;
    }

    return baseText;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[getContainerStyle(), style]}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' || variant === 'danger' ? '#fff' : Colors.primary} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  baseText: {
    fontWeight: Typography.fontWeights.semibold,
  },
});
