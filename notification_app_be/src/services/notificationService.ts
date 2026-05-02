import axios from 'axios';
import type { Notification, FetchOptions } from '../types/notification.js';
import { getPriorityScore } from './../utils/priority.js';
import { logger } from '../logging_middleware/logger.js';

const API_URL = 'http://20.207.122.201/evaluation-service/notifications';

export const fetchNotifications = async (options: FetchOptions = {}): Promise<Notification[]> => {
  try {
    const { data } = await axios.get(API_URL, { params: options });
    logger.info('Successfully fetched notifications from backend API');
    return Array.isArray(data) ? data : data?.data || [];
  } catch (error: any) {
    logger.error('Failed to fetch notifications from backend API', error);
    return [];
  }
};

export const getTopNotifications = async (options: FetchOptions = {}): Promise<Notification[]> => {
  const notifications = await fetchNotifications(options);

  return notifications.sort((a, b) => {
    const priorityDiff = getPriorityScore(b.type) - getPriorityScore(a.type);
    
    if (priorityDiff !== 0) {
      return priorityDiff;
    }
    
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
};
