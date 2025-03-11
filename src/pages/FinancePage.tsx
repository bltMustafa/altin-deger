import { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, CircularProgress, Tabs, Tab } from '@mui/material';
import { Header } from '../components/Header';
import { GoldPriceCard } from '../components/GoldPriceCard';
import { fetchGoldRates, fetchExchangeRates, GoldRate } from '../services/goldService';

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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
    const interval = setInterval(fetchData, 120000); // 2 dakikada bir güncelle
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Header onRefresh={fetchData} lastUpdate={lastUpdate} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          align="center"
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4,
            mt: 6,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
          }}
        >
          Güncel Piyasa Verileri
        </Typography>

        <Box sx={{ 
          borderBottom: 1, 
          borderColor: 'divider',
          mt: 2
        }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            centered
            sx={{
              '& .MuiTab-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 600
              }
            }}
          >
            <Tab label="Altın Fiyatları" />
            <Tab label="Döviz Kurları" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Grid container spacing={3}>
            {goldRates.map((rate) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={rate.name}>
                <GoldPriceCard data={rate} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {exchangeRates.map((rate) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={rate.name}>
                <GoldPriceCard data={rate} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  );
} 