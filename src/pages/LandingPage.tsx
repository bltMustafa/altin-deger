import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import UpdateIcon from '@mui/icons-material/Update';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
          color: 'white',
          pt: { xs: 12, md: 20 },
          pb: { xs: 12, md: 20 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            zIndex: 0,
            background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 2,
                  background: 'linear-gradient(45deg, #FFD700 30%, #FFF4BD 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Altın Değer
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 500,
                  mb: 4,
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                Türkiye'nin En Güncel Altın ve Döviz Kurları
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => navigate('/finance')}
                startIcon={<MonetizationOnIcon />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 14px 0 rgba(255,184,0,0.39)',
                }}
              >
                Fiyatları Görüntüle
              </Button>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'block' },
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    bottom: -20,
                    left: -20,
                    background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0) 70%)',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                  },
                }}
              >
                <MonetizationOnIcon
                  sx={{
                    fontSize: '280px',
                    color: theme => theme.palette.secondary.main,
                    animation: 'float 6s ease-in-out infinite',
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <ShowChartIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Canlı Takip
                </Typography>
                <Typography color="text.secondary">
                  Altın ve döviz kurlarını anlık olarak takip edin. Piyasadaki en güncel verilerle işlem yapın.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <TimelineIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Detaylı Analiz
                </Typography>
                <Typography color="text.secondary">
                  Fiyat değişimlerini ve trendleri analiz edin. Piyasa hareketlerini yakından izleyin.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <UpdateIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h3" sx={{ mb: 2 }}>
                  Güncel Veriler
                </Typography>
                <Typography color="text.secondary">
                  En güncel piyasa verilerine anında erişin. Güvenilir ve hızlı veri akışı sağlayın.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" sx={{ mb: 3 }}>
            Hemen Başlayın
          </Typography>
          <Typography sx={{ mb: 4, opacity: 0.9 }}>
            Altın ve döviz kurlarını takip etmek için hemen başlayın. Piyasayı yakından takip edin.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/finance')}
            sx={{ px: 6, py: 2 }}
          >
            Fiyatları Görüntüle
          </Button>
        </Container>
      </Box>
    </Box>
  );
} 