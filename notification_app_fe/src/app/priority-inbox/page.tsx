'use client';

import { useEffect, useMemo } from 'react';
import { Box, Typography, Alert, Button } from '@mui/material';
import NotificationList, { NotificationType } from '@/components/NotificationList';
import { useNotifications } from '@/hooks/useNotifications';
import { useReadTracking } from '@/hooks/useReadTracking';

const getPriorityScore = (type: NotificationType): number => {
  const priorities: Record<NotificationType, number> = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };
  return priorities[type] || 0;
};

export default function PriorityInboxPage() {
  const { notifications, loading, error, fetchNotifications } = useNotifications();
  const { readIds, markAsRead, markAllAsRead } = useReadTracking();

  useEffect(() => {
    fetchNotifications({ limit: 50 });
  }, [fetchNotifications]);

  const sortedNotifications = useMemo(() => {
    if (!notifications || notifications.length === 0) return [];
    
    return [...notifications].sort((a, b) => {
      const priorityDiff = getPriorityScore(b.type) - getPriorityScore(a.type);
      
      if (priorityDiff !== 0) {
        return priorityDiff;
      }
      
      const timeA = new Date(a.timestamp).getTime();
      const timeB = new Date(b.timestamp).getTime();
      
      if (isNaN(timeA) || isNaN(timeB)) return 0;

      return timeB - timeA;
    });
  }, [notifications]);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
            Priority Inbox
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your most important updates. Placements surface first, followed by Results and Events.
          </Typography>
        </Box>
        <Button 
          variant="outlined" 
          onClick={() => markAllAsRead(sortedNotifications.map(n => n.id))}
          disabled={sortedNotifications.length === 0}
        >
          Mark all as read
        </Button>
      </Box>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      <NotificationList 
        notifications={sortedNotifications} 
        loading={loading} 
        readIds={readIds}
        onMarkAsRead={markAsRead}
      />
    </Box>
  );
}
