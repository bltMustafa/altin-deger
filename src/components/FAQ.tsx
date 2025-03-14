import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Container,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import UpdateIcon from '@mui/icons-material/Update';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const faqData = [
  {
    question: 'Altın fiyatları nasıl belirlenir?',
    answer: 'Altın fiyatları, uluslararası piyasalarda belirlenen ons fiyatı, döviz kurları, arz-talep dengesi ve global ekonomik gelişmeler gibi faktörlere bağlı olarak şekillenir. Ayrıca yerel faktörler ve işçilik maliyetleri de fiyatları etkileyebilir.',
    icon: <MonetizationOnIcon color="primary" />
  },
  {
    question: 'Döviz kuru nasıl hesaplanır?',
    answer: 'Döviz kurları, ülkelerin ekonomik göstergeleri, merkez bankalarının politikaları, siyasi gelişmeler ve global piyasa koşullarına göre belirlenir. Piyasadaki arz-talep dengesi de kurların oluşumunda önemli rol oynar.',
    icon: <CurrencyExchangeIcon color="primary" />
  },
  {
    question: 'Günlük fiyatlar ne sıklıkla güncelleniyor?',
    answer: 'Fiyatlar piyasa açık olduğu süre boyunca anlık olarak güncellenmektedir. Hafta içi 09:00-17:30 saatleri arasında aktif piyasa verileri sunulmaktadır.',
    icon: <UpdateIcon color="primary" />
  },
  {
    question: 'Yatırım yaparken nelere dikkat edilmeli?',
    answer: 'Yatırım yaparken risk yönetimi, portföy çeşitlendirmesi, piyasa analizi ve uzun vadeli planlama önemlidir. Ayrıca güvenilir kaynaklardan bilgi almak ve piyasa trendlerini takip etmek de başarılı yatırım için kritik faktörlerdir.',
    icon: <TipsAndUpdatesIcon color="primary" />
  }
];

export function FAQ() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Paper 
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 2,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,245,245,0.95) 100%)',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            fontWeight: 700,
            textAlign: 'center',
            color: 'primary.main'
          }}
        >
          Sıkça Sorulan Sorular
        </Typography>

        <Box sx={{ mt: 2 }}>
          {faqData.map((item, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '8px !important',
                '&:before': {
                  display: 'none',
                },
                '&:not(:last-child)': {
                  marginBottom: 2,
                },
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                  },
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    pl: 6
                  }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Paper>
    </Container>
  );
} 