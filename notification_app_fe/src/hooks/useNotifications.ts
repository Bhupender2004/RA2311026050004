import { useState, useCallback } from 'react';
import axios from 'axios';
import { Notification } from '../components/NotificationList';
import { logger } from '../logging_middleware/logger';

interface UseNotificationsResult {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  fetchNotifications: (options?: { limit?: number; page?: number; type?: string }) => Promise<void>;
}

const API_URL = '/api/evaluation-service/notifications';

let isApiUnauthorized = false;

export function useNotifications(): UseNotificationsResult {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotifications = useCallback(async (options: { limit?: number; page?: number; type?: string } = {}) => {
    setLoading(true);
    setError(null);

    const loadSampleData = () => {
      const sampleData: Notification[] = [
        { id: '1', type: 'Placement', title: 'TCS Placement Drive', message: 'TCS is visiting campus on Monday for the 2026 batch. Register now.', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), isRead: false },
        { id: '2', type: 'Placement', title: 'Amazon Shortlist', message: 'Congratulations! Your resume has been shortlisted for the final interview round.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), isRead: false },
        { id: '3', type: 'Placement', title: 'Google Off-Campus', message: 'Google has opened applications for off-campus software engineering roles.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), isRead: true },
        { id: '4', type: 'Placement', title: 'Mock Interview Prep', message: 'The placement cell is conducting a mock technical interview tomorrow.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), isRead: true },
        
        { id: '5', type: 'Result', title: 'Semester 6 Results', message: 'The university has released the final results for Semester 6. Check your portal.', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), isRead: false },
        { id: '6', type: 'Result', title: 'OS Midterm Grades', message: 'Grades for the Operating Systems midterm have been published.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), isRead: false },
        { id: '7', type: 'Result', title: 'Machine Learning Lab', message: 'Your ML lab assignment #4 has been evaluated. Score: 9.5/10', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), isRead: false },
        { id: '8', type: 'Result', title: 'Database Project Review', message: 'The external examiner has posted the scores for the DBMS project.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), isRead: true },
        
        { id: '9', type: 'Event', title: 'AI Hackathon 2026', message: 'Register for the 48-hour AI Hackathon starting this Friday. Huge prizes to be won!', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(), isRead: false },
        { id: '10', type: 'Event', title: 'Tech Symposium', message: 'The annual college tech symposium will feature industry leaders from Microsoft.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), isRead: false },
        { id: '11', type: 'Event', title: 'Alumni Tech Talk', message: 'Join us for a talk by our 2018 batch alumni on scaling distributed systems.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), isRead: true },
        { id: '12', type: 'Event', title: 'Cloud Computing Workshop', message: 'AWS Student Club is hosting a hands-on workshop on serverless architecture.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), isRead: true },
      ];
      
      sampleData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

      let filteredSample = sampleData;
      if (options.type && options.type !== 'All') {
        filteredSample = sampleData.filter(m => m.type === options.type);
      }

      const limit = options.limit || 5;
      const page = options.page || 1;
      const totalPagesCalc = Math.max(1, Math.ceil(filteredSample.length / limit));
      const slicedData = filteredSample.slice((page - 1) * limit, page * limit);

      setTotalPages(totalPagesCalc);
      setNotifications(slicedData);
      setError('Unable to fetch notifications from the protected API. Showing sample notifications for demonstration.');
      setLoading(false);
    };

    if (isApiUnauthorized) {
      loadSampleData();
      return;
    }

    try {
      const params = new URLSearchParams();
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.page) params.append('page', options.page.toString());
      if (options.type && options.type !== 'All') params.append('notification_type', options.type);

      const { data } = await axios.get(API_URL, { params });
      
      const results = Array.isArray(data) ? data : data?.data || [];
      logger.info(`Fetched ${results.length} notifications via API successfully`);
      
      setNotifications(results);
      setTotalPages(Math.ceil(results.length / (options.limit || 5)));
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        logger.warn('Protected API returned 401. Switching to sample fallback data permanently for this session.');
        isApiUnauthorized = true;
        loadSampleData();
      } else {
        logger.error('Failed to load notifications from API', err);
        setError('Failed to load notifications. Please try again later.');
      }
    } finally {
      if (!isApiUnauthorized) {
        setLoading(false);
      }
    }
  }, []);

  return { notifications, loading, error, totalPages, fetchNotifications };
}
