export type NotificationType = 'Placement' | 'Result' | 'Event';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
}

export interface FetchOptions {
  limit?: number;
  page?: number;
  notification_type?: NotificationType;
}
