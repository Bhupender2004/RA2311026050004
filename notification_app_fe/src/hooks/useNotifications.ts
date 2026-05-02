import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Notification } from '../components/NotificationList';
import { logger } from '../../../logging_middleware/logger';

interface UseNotificationsResult {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  fetchNotifications: (options?: { limit?: number; page?: number; type?: string }) => Promise<void>;
}

// Use the Next.js rewrite configured in next.config.ts to avoid CORS errors
const API_URL = '/api/evaluation-service/notifications';

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async (options: { limit?: number; page?: number; type?: string } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.page) params.append('page', options.page.toString());
      if (options.type && options.type !== 'All') params.append('notification_type', options.type);

      const { data } = await axios.get(API_URL, { params });
      
      // Handle varied possible API data shapes
      const results = Array.isArray(data) ? data : data?.data || [];
      logger.info(`Fetched ${results.length} notifications via API successfully`);
      setNotifications(results);
    } catch (err: any) {
      if (err.response?.status === 401) {
        logger.warn('Protected API returned 401. Loading sample fallback data.');
        const sampleData: Notification[] = [
          { id: '1', type: 'Placement', title: 'Placement Drive 2026', message: 'TCS is visiting campus on Monday.', timestamp: new Date().toISOString(), isRead: false },
          { id: '2', type: 'Event', title: 'Tech Symposium', message: 'Annual tech symposium is scheduled for next month.', timestamp: new Date(Date.now() - 86400000).toISOString(), isRead: false },
          { id: '3', type: 'Result', title: 'Semester 4 Results', message: 'Your semester 4 results have been declared.', timestamp: new Date(Date.now() - 172800000).toISOString(), isRead: true },
          { id: '4', type: 'Placement', title: 'Resume Shortlist', message: 'Your resume has been shortlisted by Amazon.', timestamp: new Date(Date.now() - 3600000).toISOString(), isRead: false },
        ];
        
        let filteredSample = sampleData;
        if (options.type && options.type !== 'All') {
          filteredSample = sampleData.filter(m => m.type === options.type);
        }
        setNotifications(filteredSample);
        setError('Unable to fetch notifications from the protected API. Showing sample notifications for demonstration.');
      } else {
        logger.error('Failed to load notifications from API', err);
        setError('Failed to load notifications. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { notifications, loading, error, fetchNotifications };
}
