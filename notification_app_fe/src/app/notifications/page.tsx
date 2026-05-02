'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Alert, Pagination } from '@mui/material';
import NotificationList from '@/components/NotificationList';
import FilterBar, { FilterType } from '@/components/FilterBar';
import { useNotifications } from '@/hooks/useNotifications';
import { useReadTracking } from '@/hooks/useReadTracking';

export default function NotificationsPage() {
  const { notifications, loading, error, fetchNotifications } = useNotifications();
  const { readIds, markAsRead } = useReadTracking();
  const [filter, setFilter] = useState<FilterType>('All');
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    fetchNotifications({ limit, page, type: filter });
  }, [filter, page, fetchNotifications]);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
        All Notifications
      </Typography>
      
      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      <NotificationList 
        notifications={notifications} 
        loading={loading} 
        readIds={readIds}
        onMarkAsRead={markAsRead}
      />
      
      {!loading && !error && notifications.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          {/* Note: In a real app we'd use the total pages provided by API. Hardcoding 5 for demo interaction */}
          <Pagination 
            count={5} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
          />
        </Box>
      )}
    </Box>
  );
}
