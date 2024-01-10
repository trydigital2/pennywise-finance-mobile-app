import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Typography } from '../../theme/typography';
import { Spacing } from '../../theme/spacing';
import { Radii } from '../../theme/radii';
import { Header } from '../../components/common/Header';
import { EmptyState } from '../../components/common/EmptyState';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { markAsRead, markAllAsRead, deleteNotification } from '../../store/slices/notificationSlice';
import { formatRelativeOrDate } from '../../utils/date';
import { AppNotification } from '../../types';

export const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const notifications = useAppSelector((state) => state.notification.notifications);

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'budget_warning':
      case 'budget_exceeded':
        return { name: 'warning-outline', color: Colors.warning };
      case 'goal_milestone':
        return { name: 'trophy-outline', color: Colors.income };
      case 'monthly_report':
        return { name: 'document-text-outline', color: Colors.info };
      case 'recurring_due':
        return { name: 'time-outline', color: Colors.purple };
      default:
        return { name: 'notifications-outline', color: Colors.primary };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Notifications"
        showBack
        onBack={() => navigation.goBack()}
        rightAction={{
          icon: 'checkmark-done-outline',
          onPress: () => dispatch(markAllAsRead()),
        }}
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            icon="notifications-off-outline"
            title="All Caught Up!"
            description="You have no notifications or alerts at this moment."
          />
        }
        renderItem={({ item }) => {
          const iconInfo = getIcon(item.type);
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => dispatch(markAsRead(item.id))}
              style={[
                styles.notifCard,
                !item.isRead ? styles.unreadCard : null,
              ]}
            >
              <View style={[styles.iconBox, { backgroundColor: `${iconInfo.color}15` }]}>
                <Ionicons name={iconInfo.name as any} size={22} color={iconInfo.color} />
              </View>

              <View style={styles.contentCol}>
                <View style={styles.cardHeader}>
                  <Text style={[styles.title, !item.isRead ? styles.unreadTitle : null]}>
                    {item.title}
                  </Text>
                  <Text style={styles.date}>{formatRelativeOrDate(item.date)}</Text>
                </View>
                <Text style={styles.message}>{item.message}</Text>
              </View>

              <TouchableOpacity
                onPress={() => dispatch(deleteNotification(item.id))}
                style={styles.deleteBtn}
              >
                <Ionicons name="close" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            </TouchableOpacity>
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
  notifCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'flex-start',
  },
  unreadCard: {
    backgroundColor: '#F8FAFC',
    borderColor: Colors.accent,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentCol: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: Typography.fontWeights.semibold,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  unreadTitle: {
    fontWeight: Typography.fontWeights.bold,
  },
  date: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  message: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  deleteBtn: {
    padding: 4,
    marginLeft: 6,
  },
});
