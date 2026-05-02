import { useState, useEffect, useCallback } from 'react';

export function useReadTracking() {
  const [readIds, setReadIds] = useState<Set<string>>(new Set());

  // Load from localStorage on client-side mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('read_notifications');
      if (stored) {
        setReadIds(new Set(JSON.parse(stored)));
      }
    } catch (e) {
      console.error('Failed to parse read notifications', e);
    }
  }, []);

  const markAsRead = useCallback((id: string) => {
    setReadIds((prev) => {
      if (prev.has(id)) return prev; // Avoid unnecessary state updates
      const newSet = new Set(prev);
      newSet.add(id);
      localStorage.setItem('read_notifications', JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  }, []);

  const markAllAsRead = useCallback((ids: string[]) => {
    setReadIds((prev) => {
      const newSet = new Set(prev);
      let changed = false;
      ids.forEach((id) => {
        if (!newSet.has(id)) {
          newSet.add(id);
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('read_notifications', JSON.stringify(Array.from(newSet)));
      }
      return newSet;
    });
  }, []);

  return { readIds, markAsRead, markAllAsRead };
}
