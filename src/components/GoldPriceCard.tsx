import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { GoldRate } from '../services/goldService';

interface GoldPriceCardProps {
  data: GoldRate;
}

export function GoldPriceCard({ data }: GoldPriceCardProps) {
  const changeRate = parseFloat(data.change_rate);
  const isPositive = changeRate > 0;
  const isNegative = changeRate < 0;

  return (
    <Card 
      className="fade-in"
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1.1rem',
              color: '#1a1a1a'
            }}
          >
            {data.name}
          </Typography>
          <Chip
            label={data.market_status}
            size="small"
            color={data.market_status === "Açık" ? "success" : "default"}
            sx={{ ml: 1 }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
          >
            <span>Alış:</span>
            <span style={{ fontWeight: 600, color: '#1a1a1a' }}>
              {parseFloat(data.buying).toLocaleString('tr-TR')} ₺
            </span>
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <span>Satış:</span>
            <span style={{ fontWeight: 600, color: '#1a1a1a' }}>
              {parseFloat(data.selling).toLocaleString('tr-TR')} ₺
            </span>
          </Typography>
        </Box>

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: 'flex-end',
            mt: 'auto'
          }}
        >
          {isPositive && <TrendingUpIcon color="success" sx={{ fontSize: 20 }} />}
          {isNegative && <TrendingDownIcon color="error" sx={{ fontSize: 20 }} />}
          <Typography
            variant="body2"
            sx={{
              ml: 0.5,
              color: isPositive ? 'success.main' : isNegative ? 'error.main' : 'text.secondary',
              fontWeight: 600
            }}
          >
            %{Math.abs(changeRate).toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
} 