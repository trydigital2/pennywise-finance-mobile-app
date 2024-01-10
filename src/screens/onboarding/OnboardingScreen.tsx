import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { useAppDispatch } from '../../store/hooks';
import { completeOnboarding } from '../../store/slices/userSlice';
import { StorageService, STORAGE_KEYS } from '../../services/storage';

const { width } = Dimensions.get('window');

const slides = [
  {
    icon: 'wallet-outline',
    title: 'Master Your Personal Finances',
    subtitle: 'Track your daily expenses, monitor income streams, and keep your balances organized in one secure place.',
    color: Colors.accent,
  },
  {
    icon: 'pie-chart-outline',
    title: 'Smart Category Budgets',
    subtitle: 'Set monthly limits across food, transport, bills, and get real-time warning indicators before you overspend.',
    color: '#3B82F6',
  },
  {
    icon: 'trending-up-outline',
    title: 'Achieve Big Savings Goals',
    subtitle: 'Plan for emergency funds, travel, or gadget upgrades with visual milestone progress bars and target tracking.',
    color: '#8B5CF6',
  },
];

export const OnboardingScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useAppDispatch();

  const handleFinish = async () => {
    await StorageService.setItem(STORAGE_KEYS.ONBOARDING, true);
    dispatch(completeOnboarding());
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const slide = slides[currentSlide];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar with Skip */}
      <View style={styles.topBar}>
        <View style={styles.brandBadge}>
          <Ionicons name="leaf" size={16} color={Colors.income} />
          <Text style={styles.brandText}>PennyWise</Text>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={handleFinish}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Main Slide Illustration & Content */}
      <View style={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: `${slide.color}15` }]}>
          <Ionicons name={slide.icon as any} size={72} color={slide.color} />
        </View>

        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>

        {/* Indicators */}
        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentSlide ? [styles.activeDot, { backgroundColor: slide.color }] : null,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Footer Controls */}
      <View style={styles.footer}>
        <PrimaryButton
          title={currentSlide === slides.length - 1 ? 'Get Started' : 'Continue'}
          onPress={handleNext}
          size="lg"
          style={styles.actionBtn}
        />
        <Text style={styles.disclaimerText}>
          Simulated demo experience • No banking credentials required
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: 12,
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radii.full,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 6,
  },
  brandText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.textPrimary,
  },
  skipText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textSecondary,
    padding: 6,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 32,
    marginVertical: 'auto',
  },
  iconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  title: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.heavy,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: Typography.fontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  activeDot: {
    width: 24,
  },
  footer: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: 24,
  },
  actionBtn: {
    width: '100%',
    marginBottom: 12,
  },
  disclaimerText: {
    fontSize: 11,
    color: Colors.textMuted,
    textAlign: 'center',
  },
});
