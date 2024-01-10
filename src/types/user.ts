export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferredCurrency: CurrencyCode;
  startOfMonthDay: number; // 1 to 31
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  onboardingCompleted: boolean;
  biometricsEnabled: boolean;
  monthlySavingsTargetPercent: number;
}
