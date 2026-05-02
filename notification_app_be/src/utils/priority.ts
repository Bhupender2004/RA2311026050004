import type { NotificationType } from '../types/notification.js';

export const getPriorityScore = (type: NotificationType): number => {
  const priorities: Record<NotificationType, number> = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };
  
  return priorities[type] || 0;
};
