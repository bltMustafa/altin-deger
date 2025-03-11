import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onRefresh?: () => void;
  lastUpdate?: Date | null;
}

export function Header({ onRefresh, lastUpdate }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Box 
          onClick={() => navigate('/')} 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            '&:hover': {
              '& .MuiTypography-root': {
                background: 'linear-gradient(45deg, #3B82F6 30%, #1E3A8A 90%)',
                WebkitBackgroundClip: 'text',
              },
              '& .MuiSvgIcon-root': {
                transform: 'scale(1.1)',
                color: '#3B82F6'
              }
            }
          }}
        >
          <MonetizationOnIcon 
            sx={{ 
              fontSize: '2rem', 
              mr: 1, 
              color: '#1E3A8A',
              transition: 'all 0.3s ease'
            }} 
          />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1E3A8A 30%, #3B82F6 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'all 0.3s ease'
            }}
          >
            Altın Değer
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {lastUpdate && (
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mr: 2 }}
          >
            Son güncelleme: {lastUpdate.toLocaleTimeString()}
          </Typography>
        )}

        {onRefresh && (
          <IconButton 
            onClick={onRefresh}
            sx={{ 
              '&:hover': {
                color: '#3B82F6'
              }
            }}
          >
            <RefreshIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
} 