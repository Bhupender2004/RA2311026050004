'use client';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar sx={{ flexWrap: 'wrap', gap: 1 }}>
        <NotificationsIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', minWidth: 'fit-content' }}>
          Notifier
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            component={Link} 
            href="/notifications" 
            color={pathname === '/notifications' ? 'primary' : 'inherit'}
          >
            All
          </Button>
          <Button 
            component={Link} 
            href="/priority-inbox" 
            color={pathname === '/priority-inbox' ? 'primary' : 'inherit'}
          >
            Priority Inbox
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
