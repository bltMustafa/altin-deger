import { Card, CardContent, Typography, Chip, Box, Paper } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import RemoveIcon from '@mui/icons-material/Remove';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

interface GoldPriceCardProps {
  data: {
    name: string;
    buying: string;
    selling: string;
    change_rate: string;
    market_status: string;
    type: string;
    original_buying?: string;
    original_selling?: string;
  };
}

export function GoldPriceCard({ data }: GoldPriceCardProps) {
  const changeRate = parseFloat(data.change_rate || "0");
  const isPositive = changeRate > 0;
  const isZero = changeRate === 0 || isNaN(changeRate);
  const isGold = data.type === "Altın";

  const showBuying = data.original_buying || formatPrice(data.buying);
  const showSelling = data.original_selling || formatPrice(data.selling);

  function formatPrice(price: string) {
    if (!price || price === "0" || price === "0.00") return "0,00";
    
    return parseFloat(price).toLocaleString('tr-TR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  }

  const getCardBackground = () => {
    if (isGold) {
      return 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,248,225,1) 100%)';
    }
    return 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(236,246,255,1) 100%)';
  };

  const getIconColor = () => {
    return isGold ? '#FFB300' : '#1976D2';
  };

  return (
    <Card 
      elevation={2}
      sx={{ 
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
        },
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        background: getCardBackground()
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isGold ? (
            <MonetizationOnIcon sx={{ color: getIconColor() }} />
          ) : (
            <CurrencyExchangeIcon sx={{ color: getIconColor() }} />
          )}
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            {data.name}
          </Typography>
        </Box>
        <Chip 
          label={data.market_status} 
          size="small"
          color={data.market_status === "Açık" ? "success" : "default"}
          sx={{ 
            fontWeight: 600,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      </Box>

      <CardContent sx={{ p: 0 }}>
        {/* Fiyat bilgileri */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                Alış
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2E3B55' }}>
                {showBuying} ₺
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, textAlign: 'right' }}>
                Satış
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#2E3B55', textAlign: 'right' }}>
                {showSelling} ₺
              </Typography>
            </Box>
          </Box>

          {/* Değişim oranı */}
          <Paper 
            elevation={0} 
            sx={{ 
              p: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 1,
              borderRadius: 2,
              backgroundColor: isZero 
                ? 'rgba(0,0,0,0.05)' 
                : isPositive 
                  ? 'rgba(46,125,50,0.1)' 
                  : 'rgba(211,47,47,0.1)',
            }}
          >
            {isZero ? (
              <RemoveIcon sx={{ color: 'text.secondary' }} />
            ) : isPositive ? (
              <TrendingUpIcon sx={{ color: 'success.main' }} />
            ) : (
              <TrendingDownIcon sx={{ color: 'error.main' }} />
            )}
            <Typography 
              variant="body2" 
              sx={{ 
                color: isZero ? 'text.secondary' : isPositive ? 'success.main' : 'error.main',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {isZero ? 'Değişim yok' : `%${Math.abs(changeRate).toFixed(2)}`}
            </Typography>
          </Paper>
        </Box>
      </CardContent>
      
      {!isZero && (
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40px',
            height: '40px',
            background: isPositive ? 'success.main' : 'error.main',
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
            opacity: 0.8
          }}
        />
      )}
    </Card>
  );
} 