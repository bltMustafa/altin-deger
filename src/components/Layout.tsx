import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function Layout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
} 