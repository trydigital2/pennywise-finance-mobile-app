import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Radii } from '../../theme/radii';

interface CategoryIconProps {
  iconName: string;
  color: string;
  bgColor?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  iconName,
  color,
  bgColor,
  size = 'md',
  style,
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { containerSize: 32, iconSize: 16, radius: Radii.sm };
      case 'lg':
        return { containerSize: 52, iconSize: 26, radius: Radii.lg };
      case 'md':
      default:
        return { containerSize: 42, iconSize: 20, radius: Radii.md };
    }
  };

  const { containerSize, iconSize, radius } = getDimensions();
  const background = bgColor || `${color}1A`; // 10% opacity fallback

  return (
    <View
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: radius,
          backgroundColor: background,
        },
        style,
      ]}
    >
      <Ionicons name={(iconName as any) || 'pricetag-outline'} size={iconSize} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
