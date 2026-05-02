'use client';
import { Box, Typography, CircularProgress } from '@mui/material';
import NotificationCard from './NotificationCard';

export type NotificationType = 'Placement' | 'Result' | 'Event';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  loading?: boolean;
  readIds?: Set<string>;
  onMarkAsRead?: (id: string) => void;
}

export default function NotificationList({ notifications, loading = false, readIds, onMarkAsRead }: NotificationListProps) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body1" color="text.secondary">
          No notifications found.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {notifications.map((notif) => (
        <NotificationCard 
          key={notif.id} 
          {...notif} 
          isRead={readIds?.has(notif.id) || notif.isRead}
          onClick={() => onMarkAsRead && onMarkAsRead(notif.id)}
        />
      ))}
    </Box>
  );
}
