'use client';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkIcon from '@mui/icons-material/Work';

interface NotificationProps {
  id: string;
  type: 'Placement' | 'Result' | 'Event';
  title: string;
  message: string;
  timestamp: string;
  isRead?: boolean;
  onClick?: () => void;
}

export default function NotificationCard({ type, title, message, timestamp, isRead = false, onClick }: NotificationProps) {
  const getIcon = () => {
    switch (type) {
      case 'Placement': return <WorkIcon fontSize="small" />;
      case 'Result': return <EmojiEventsIcon fontSize="small" />;
      case 'Event': return <EventIcon fontSize="small" />;
      default: return undefined;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'Placement': return 'success';
      case 'Result': return 'warning';
      case 'Event': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card 
      onClick={onClick}
      variant="outlined" 
      sx={{ 
        mb: 2, 
        cursor: onClick ? 'pointer' : 'default',
        bgcolor: isRead ? 'background.paper' : 'action.hover',
        borderLeft: isRead ? '1px solid' : '4px solid',
        borderLeftColor: isRead ? 'divider' : 'primary.main',
        transition: '0.2s',
        '&:hover': { borderColor: 'primary.main' }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ 
            bgcolor: 'background.paper', 
            px: 1, 
            py: 0.25, 
            borderRadius: 1, 
            border: '1px solid', 
            borderColor: 'divider',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <Typography variant="caption" color="text.secondary" fontWeight="medium">
              {new Date(timestamp).toLocaleString()}
            </Typography>
          </Box>
          <Chip 
            icon={getIcon()} 
            label={type} 
            color={getColor()} 
            size="small" 
            variant="outlined"
          />
        </Box>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
}
