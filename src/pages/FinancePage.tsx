import { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography, 
  CircularProgress, 
  Tabs, 
  Tab, 
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Chip,
  Fade,
  Alert,
  Snackbar
} from '@mui/material';
import { Header } from '../components/Header';
import { GoldPriceCard } from '../components/GoldPriceCard';
import { fetchGoldRates, fetchExchangeRates, GoldRate } from '../services/goldService';
import { GoldCalculator } from '../components/GoldCalculator';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FilterListIcon from '@mui/icons-material/FilterList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`finance-tabpanel-${index}`}
      aria-labelledby={`finance-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function FinancePage() {
  const [value, setValue] = useState(0);
  const [goldRates, setGoldRates] = useState<GoldRate[]>([]);
  const [exchangeRates, setExchangeRates] = useState<GoldRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filterData = (data: GoldRate[]) => {
    return data.filter(rate => 
      rate.name.toLowerCase().includes(searchTerm)
    );
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
    setShowUpdateSuccess(true);
  };

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [goldData, exchangeData] = await Promise.all([
        fetchGoldRates(),
        fetchExchangeRates()
      ]);
      setGoldRates(goldData);
      setExchangeRates(exchangeData);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 120000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '70vh',
        gap: 3
      }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" color="text.secondary">
          Piyasa verileri yükleniyor...
        </Typography>
      </Box>
    );
  }

  const filteredGoldRates = filterData(goldRates);
  const filteredExchangeRates = filterData(exchangeRates);

  return (
    <Box sx={{ 
      bgcolor: '#f8f9fa', 
      minHeight: '100vh',
      backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,215,0,0.03) 0%, rgba(0,0,0,0) 70%)'
    }}>
      <Header onRefresh={fetchData} lastUpdate={lastUpdate} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
          mb: 4 
        }}>
          <Typography 
            variant="h4" 
            component="h1"
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
            }}
          >
            Güncel Piyasa Verileri
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Tooltip title="Son Güncelleme" arrow>
              <Chip
                icon={<AccessTimeIcon />}
                label={formatLastUpdate(lastUpdate)}
                variant="outlined"
                sx={{ 
                  borderColor: 'primary.main',
                  '& .MuiChip-icon': { color: 'primary.main' }
                }}
              />
            </Tooltip>

            <Tooltip title="Verileri Yenile" arrow>
              <IconButton 
                onClick={handleRefresh}
                sx={{ 
                  animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Paper 
          sx={{ 
            p: 2, 
            mb: 3, 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <TextField
            fullWidth
            placeholder="Altın veya döviz türü ara..."
            value={searchTerm}
            onChange={handleSearch}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title="Filtrele" arrow>
                    <IconButton size="small">
                      <FilterListIcon />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              )
            }}
          />
        </Paper>

        <Paper 
          elevation={0} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            mb: 4,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            border: '1px solid rgba(0,0,0,0.08)'
          }}
        >
          <Tabs 
            value={value} 
            onChange={handleChange} 
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 600,
                py: 2
              },
              '& .Mui-selected': {
                color: value === 0 ? '#FFB300' : '#1976D2',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: value === 0 ? '#FFB300' : '#1976D2',
                height: 3
              }
            }}
          >
            <Tab 
              label={`Altın Fiyatları (${filteredGoldRates.length})`}
              icon={<Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#FFB300', mb: 0.5 }} />}
              iconPosition="start"
            />
            <Tab 
              label={`Döviz Kurları (${filteredExchangeRates.length})`}
              icon={<Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#1976D2', mb: 0.5 }} />}
              iconPosition="start"
            />
          </Tabs>
        </Paper>

        <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {filteredGoldRates.map((rate) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={rate.name}>
                <Fade in timeout={300}>
                  <Box>
                    <GoldPriceCard data={rate} />
                  </Box>
                </Fade>
              </Grid>
            ))}
            {filteredGoldRates.length === 0 && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Aradığınız kriterlere uygun sonuç bulunamadı.
                </Alert>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {filteredExchangeRates.map((rate) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={rate.name}>
                <Fade in timeout={300}>
                  <Box>
                    <GoldPriceCard data={rate} />
                  </Box>
                </Fade>
              </Grid>
            ))}
            {filteredExchangeRates.length === 0 && (
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Aradığınız kriterlere uygun sonuç bulunamadı.
                </Alert>
              </Grid>
            )}
          </Grid>
        </TabPanel>

        <Box sx={{ mt: 4 }}>
          <GoldCalculator goldRates={goldRates} />
        </Box>
      </Container>

      <Snackbar
        open={showUpdateSuccess}
        autoHideDuration={3000}
        onClose={() => setShowUpdateSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Veriler başarıyla güncellendi!
        </Alert>
      </Snackbar>
    </Box>
  );
} 