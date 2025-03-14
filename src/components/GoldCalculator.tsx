import {
  Box,
  Paper,
  Typography,
  TextField,
  Grid,
  MenuItem,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import { useState} from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalculateIcon from '@mui/icons-material/Calculate';
import ScaleIcon from '@mui/icons-material/Scale';
import { GoldRate } from '../services/goldService';

interface GoldType {
  value: string;
  label: string;
  weight: number;
}

const goldTypes: GoldType[] = [
  { value: 'gram', label: 'Gram Altın', weight: 1 },
  { value: 'ceyrek', label: 'Çeyrek Altın', weight: 1.75 },
  { value: 'yarim', label: 'Yarım Altın', weight: 3.5 },
  { value: 'tam', label: 'Tam Altın', weight: 7.0 },
];

const workmanshipRates = [
  { value: '8', label: 'Düşük (%8)' },
  { value: '10', label: 'Orta (%10)' },
  { value: '12', label: 'Yüksek (%12)' },
  { value: '15', label: 'Özel İşçilik (%15)' },
];

interface Props {
  goldRates: GoldRate[];
}

export function GoldCalculator({ goldRates }: Props) {
  const [amount, setAmount] = useState<string>('1');
  const [fromType, setFromType] = useState('gram');
  const [toType, setToType] = useState('ceyrek');
  const [selectedGoldType, setSelectedGoldType] = useState('gram');
  const [workmanshipRate, setWorkmanshipRate] = useState<string>('10');

  const getGoldPrice = (type: string): number => {
    const gold = goldRates.find(rate => {
      if (type === 'gram') return rate.name === 'Gram Altın';
      if (type === 'ceyrek') return rate.name === 'Çeyrek Altın';
      if (type === 'yarim') return rate.name === 'Yarım Altın';
      if (type === 'tam') return rate.name === 'Tam Altın';
      return false;
    });
    return gold ? parseFloat(gold.selling.replace(',', '')) : 0;
  };

  const calculateConversion = () => {
    const fromGold = goldTypes.find(g => g.value === fromType);
    const toGold = goldTypes.find(g => g.value === toType);
    
    if (!fromGold || !toGold || !amount) return 0;
    
    const gramValue = parseFloat(amount) * fromGold.weight;
    return (gramValue / toGold.weight).toFixed(4);
  };

  const formatPrice = (price: string) => {
    return parseFloat(price)
      .toLocaleString('tr-TR', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
  };

  const calculateTotalPrice = () => {
    const selectedGold = goldTypes.find(g => g.value === selectedGoldType);
    if (!selectedGold || !amount) return { basePrice: '0,00', workmanship: '0,00', total: '0,00' };

    const currentPrice = getGoldPrice(selectedGoldType);
    const quantity = parseFloat(amount) || 0;
    const basePrice = quantity * currentPrice;
    const workmanship = (basePrice * parseFloat(workmanshipRate)) / 100;
    const total = basePrice + workmanship;

    return {
      basePrice: formatPrice(basePrice.toString()),
      workmanship: formatPrice(workmanship.toString()),
      total: formatPrice(total.toString())
    };
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 800,
          textAlign: 'center',
          background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Altın Hesaplayıcı
      </Typography>

      <Grid container spacing={4}>
        {/* Altın Çevirici */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #FFF8E1 100%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 30px rgba(255,193,7,0.2)',
              },
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255,193,7,0.1)',
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255,193,7,0.1) 0%, rgba(255,193,7,0) 70%)',
                borderRadius: '50%',
              }}
            />
            
            <CardContent sx={{ position: 'relative', p: 4 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4,
                pb: 3,
                borderBottom: '1px solid rgba(0,0,0,0.06)'
              }}>
                <CalculateIcon sx={{ 
                  color: '#FFA000',
                  mr: 2, 
                  fontSize: 32,
                  filter: 'drop-shadow(0 2px 4px rgba(255,193,7,0.3))'
                }} />
                <Typography variant="h5" sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #FF6F00 30%, #FFA000 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Altın Çevirici
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Miktar"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MonetizationOnIcon sx={{ color: '#FFA000' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(255,255,255,1)',
                          boxShadow: '0 4px 12px rgba(255,193,7,0.15)',
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <TextField
                      fullWidth
                      select
                      label="Dönüştürülecek"
                      value={fromType}
                      onChange={(e) => setFromType(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(255,255,255,1)',
                            boxShadow: '0 4px 12px rgba(255,193,7,0.15)',
                          }
                        }
                      }}
                    >
                      {goldTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #FF6F00 30%, #FFA000 90%)',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(255,193,7,0.3)',
                      fontSize: '20px',
                      fontWeight: 'bold'
                    }}>
                      →
                    </Box>

                    <TextField
                      fullWidth
                      select
                      label="Hedef Birim"
                      value={toType}
                      onChange={(e) => setToType(e.target.value)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'rgba(255,255,255,0.8)',
                          borderRadius: 2,
                          '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.9)',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'rgba(255,255,255,1)',
                            boxShadow: '0 4px 12px rgba(255,193,7,0.15)',
                          }
                        }
                      }}
                    >
                      {goldTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      mt: 2,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,248,225,0.9) 100%)',
                      borderRadius: 3,
                      border: '1px solid rgba(255,193,7,0.2)',
                      textAlign: 'center',
                      boxShadow: '0 4px 20px rgba(255,193,7,0.1)'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
                      Dönüşüm Sonucu
                    </Typography>
                    <Typography variant="h3" sx={{ 
                      fontWeight: 800,
                      color: '#FF6F00',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      mb: 2
                    }}>
                      {calculateConversion()}
                      <Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 1, fontWeight: 500 }}>
                        adet
                      </Typography>
                    </Typography>
                    <Typography variant="subtitle1" sx={{
                      color: '#FFA000',
                      fontWeight: 600,
                      display: 'inline-block',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255,193,7,0.1)'
                    }}>
                      {goldTypes.find(g => g.value === toType)?.label}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* İşçilik Hesaplayıcı */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              background: 'linear-gradient(135deg, #ffffff 0%, #E3F2FD 100%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 30px rgba(33,150,243,0.2)',
              },
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(33,150,243,0.1)',
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(33,150,243,0.1) 0%, rgba(33,150,243,0) 70%)',
                borderRadius: '50%',
              }}
            />
            
            <CardContent sx={{ position: 'relative', p: 4 }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 4,
                pb: 3,
                borderBottom: '1px solid rgba(0,0,0,0.06)'
              }}>
                <ScaleIcon sx={{ 
                  color: '#1976D2',
                  mr: 2, 
                  fontSize: 32,
                  filter: 'drop-shadow(0 2px 4px rgba(33,150,243,0.3))'
                }} />
                <Typography variant="h5" sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #1565C0 30%, #1976D2 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Toplam Değer Hesaplayıcı
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Miktar"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MonetizationOnIcon sx={{ color: '#1976D2' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(255,255,255,1)',
                          boxShadow: '0 4px 12px rgba(33,150,243,0.15)',
                        }
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Altın Türü"
                    value={selectedGoldType}
                    onChange={(e) => setSelectedGoldType(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(255,255,255,1)',
                          boxShadow: '0 4px 12px rgba(33,150,243,0.15)',
                        }
                      }
                    }}
                  >
                    {goldTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label} - {getGoldPrice(option.value).toLocaleString('tr-TR')} ₺
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="İşçilik Oranı"
                    value={workmanshipRate}
                    onChange={(e) => setWorkmanshipRate(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(255,255,255,0.9)',
                        },
                        '&.Mui-focused': {
                          backgroundColor: 'rgba(255,255,255,1)',
                          boxShadow: '0 4px 12px rgba(33,150,243,0.15)',
                        }
                      }
                    }}
                  >
                    {workmanshipRates.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      mt: 2,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(227,242,253,0.9) 100%)',
                      borderRadius: 3,
                      border: '1px solid rgba(33,150,243,0.2)',
                      boxShadow: '0 4px 20px rgba(33,150,243,0.1)'
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="body1" sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          color: 'text.secondary',
                          fontWeight: 500
                        }}>
                          <span>Altın Değeri:</span>
                          <strong style={{ color: '#1976D2' }}>{calculateTotalPrice().basePrice} ₺</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body1" sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          color: 'text.secondary',
                          fontWeight: 500
                        }}>
                          <span>İşçilik Tutarı:</span>
                          <strong style={{ color: '#1976D2' }}>{calculateTotalPrice().workmanship} ₺</strong>
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h6" sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          borderTop: '2px solid rgba(33,150,243,0.1)',
                          mt: 2,
                          pt: 2,
                          fontWeight: 700,
                          color: '#1565C0'
                        }}>
                          <span>Toplam Tutar:</span>
                          <strong>{calculateTotalPrice().total} ₺</strong>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
} 