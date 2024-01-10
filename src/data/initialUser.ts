import { UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr_kuldeep_01',
  name: 'Kuldeep Kumar',
  email: 'kuldeep.kumar@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  preferredCurrency: 'INR',
  startOfMonthDay: 1,
  isDarkMode: false,
  notificationsEnabled: true,
  onboardingCompleted: true,
  biometricsEnabled: false,
  monthlySavingsTargetPercent: 30,
};
