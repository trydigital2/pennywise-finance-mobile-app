export type NotificationType =
  | 'budget_warning'
  | 'budget_exceeded'
  | 'goal_milestone'
  | 'monthly_report'
  | 'recurring_due'
  | 'system';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  date: string; // ISO date string
  isRead: boolean;
  severity: 'info' | 'warning' | 'alert' | 'success';
  entityId?: string;
}
