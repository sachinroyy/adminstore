
'use client';

import { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardMedia, CardActions,
  Button, CircularProgress, Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
  alignItems: 'center',
  maxWidth: '100%',
  width: '100%',
}));

const ProductImage = styled(CardMedia)({
  width: '300px',
  height: '200px',
  objectFit: 'contain',
  backgroundColor: '#f5f5f5',
  padding: '16px',
});

const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  margin: '8px 0',
});

export default function DealOfTheDay() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch('https://store-2b74.vercel.app/api/deals');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        
        // Process the data to ensure it has the expected structure
        const processedDeals = (Array.isArray(data) ? data : data.data || data.products || [])
          .map(deal => ({
            ...deal,
            // Ensure name field exists, fallback to title or 'Untitled'
            name: deal.name || deal.title || 'Untitled',
            // Ensure price is a number
            price: Number(deal.price) || 0,
            // Ensure image URL is properly set
            image: deal.image || deal.images?.[0] || '/placeholder.jpg',
            // Ensure description exists
            // description: deal.description || 'No description available'
          }));
          
        setDeals(processedDeals);
      } catch (err) {
        console.error('Error fetching deals:', err);
        setError(err.message || 'Failed to fetch deals');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  useEffect(() => {
    if (!showAll && deals.length > 5) {
      const interval = setInterval(() => {
        setStartIndex((prev) => (prev + 1) % deals.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [deals, showAll]);

  const getVisibleDeals = () => {
    if (showAll) return deals;
    const visible = [];
    for (let i = 0; i < 5; i++) {
      visible.push(deals[(startIndex + i) % deals.length]);
    }
    return visible;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>Loading deals...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="error" variant="h6">
          Error: {error}
        </Typography>
        <Button variant="outlined" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Box>
    );
  }

  const visibleDeals = getVisibleDeals();

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, px: 2 }}>
        <Typography variant="h4" component="h2" sx={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black' }}>
          Today's Deals
        </Typography>
        {deals.length > 4 && (
          <Button 
            variant="text" 
            color="primary"
            onClick={() => setShowAll(!showAll)}
            sx={{ textTransform: 'none', fontWeight: 600, color: 'black', '&:hover': { color: 'primary.main' } }}
          >
            {showAll ? 'Show Less' : 'View All'}
          </Button>
        )}
      </Box>

      <Box sx={{ 
        display: 'flex', 
        overflowX: 'auto',
        gap: 3,
        py: 2,
        px: 2,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        {visibleDeals.slice(0, 4).map((deal, index) => (
          <Box key={index} sx={{ minWidth: { xs: '70%', sm: '45%', md: '30%', lg: '23%' }, flexShrink: 0 }}>
            <ProductCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <ProductImage
                image={deal.image}
                title={deal.name}
                component="img"
                alt={deal.name}
                sx={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'contain',
                  p: 2
                }}
              />
              <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 1.5 }}>
                  <Typography 
                    variant="subtitle1" 
                    noWrap 
                    sx={{ 
                      fontWeight: 'bold', 
                      flex: 1, 
                      textAlign: 'left', 
                      pr: 1,
                      fontSize: '0.95rem'
                    }}
                  >
                    {deal.name}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    color="primary" 
                    sx={{ 
                      whiteSpace: 'nowrap',
                      fontSize: '1rem',
                      fontWeight: 600
                    }}
                  >
                    ${deal.price.toFixed(2)}
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth 
                  startIcon={<ShoppingCartIcon />}
                  size="small"
                  sx={{ 
                    mt: 'auto',
                    py: 1,
                    fontSize: '0.875rem'
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </ProductCard>
          </Box>
        ))}
      </Box>

      {showAll && (
        <Box mt={4}>
          <Grid container spacing={3}>
            {deals.map((deal, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <ProductCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <ProductImage
                    image={deal.image}
                    title={deal.name}
                    component="img"
                    alt={deal.name}
                    sx={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'contain',
                      p: 2
                    }}
                  />
                  <CardContent sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 1.5 }}>
                      <Typography 
                        variant="subtitle1" 
                        noWrap 
                        sx={{ 
                          fontWeight: 'bold', 
                          flex: 1, 
                          textAlign: 'left', 
                          pr: 1,
                          fontSize: '1rem'
                        }}
                      >
                        {deal.name}
                      </Typography>
                      <Typography 
                        variant="h6" 
                        color="primary" 
                        sx={{ 
                          whiteSpace: 'nowrap',
                          fontSize: '1.1rem',
                          fontWeight: 600
                        }}
                      >
                        ${deal.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      startIcon={<ShoppingCartIcon />}
                      size="small"
                      sx={{ 
                        mt: 'auto',
                        py: 1,
                        fontSize: '0.9rem'
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
