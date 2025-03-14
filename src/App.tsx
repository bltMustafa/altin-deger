import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import FinancePage from './pages/FinancePage';
import { FAQ } from './components/FAQ';
import { Container, Grid, Box } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="finance" element={<FinancePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Existing components */}
        </Grid>
        <Box sx={{ mt: 4 }}>
          <FAQ />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App; 