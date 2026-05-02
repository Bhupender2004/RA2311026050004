'use client';
import { Box, Chip, Typography } from '@mui/material';

export type FilterType = 'All' | 'Placement' | 'Result' | 'Event';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function FilterBar({ currentFilter, onFilterChange }: FilterBarProps) {
  const filters: FilterType[] = ['All', 'Placement', 'Result', 'Event'];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
        Filter by:
      </Typography>
      {filters.map((filter) => (
        <Chip
          key={filter}
          label={filter}
          onClick={() => onFilterChange(filter)}
          color={currentFilter === filter ? 'primary' : 'default'}
          variant={currentFilter === filter ? 'filled' : 'outlined'}
          clickable
        />
      ))}
    </Box>
  );
}
