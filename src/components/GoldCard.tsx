import { Card, CardContent, Typography, Box } from '@mui/material';
import { GoldPrice } from '../types/GoldTypes';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { formatDistance } from 'date-fns';
import { tr } from 'date-fns/locale';

interface GoldCardProps {
  data: GoldPrice;
  title: string;
}

export const GoldCard = ({ data, title }: GoldCardProps) => {
  const isPositiveChange = data.change >= 0;

  return (
    <Card sx={{ minWidth: 275, height: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography color="text.secondary">
            Alış:
          </Typography>
          <Typography variant="h6" color="primary">
            {data.buying.toLocaleString('tr-TR')} ₺
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography color="text.secondary">
            Satış:
          </Typography>
          <Typography variant="h6" color="primary">
            {data.selling.toLocaleString('tr-TR')} ₺
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            {formatDistance(new Date(data.lastUpdate), new Date(), { locale: tr })}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {isPositiveChange ? (
              <TrendingUpIcon color="success" />
            ) : (
              <TrendingDownIcon color="error" />
            )}
            <Typography
              variant="body2"
              color={isPositiveChange ? 'success.main' : 'error.main'}
            >
              %{Math.abs(data.change).toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}; 