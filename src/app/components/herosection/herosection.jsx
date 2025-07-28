'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Box, Button, Container, Typography, styled } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      marginBottom: '1rem',
    },
    body1: {
      fontSize: '1.1rem',
      marginBottom: '2rem',
      color: 'text.secondary',
    },
  },
});

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100vw',
  maxWidth: '100%',
  color: 'black',
  padding: theme.spacing(8, 0),
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/images/heroslider.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: -9999,
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(12, 0),
    minHeight: '90vh',
    '&::before': {
      left: 30,
      right: 30,
      backgroundSize: 'contain',
    },
  },
}));


const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  width: '100vw',
  maxWidth: '100%',
}));

const HeroContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    textAlign: 'left',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const DiscountBadge = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: 'black',
  color: 'white',
  padding: theme.spacing(0.75, 3),
  borderRadius: '50px',
  marginBottom: theme.spacing(2),
  fontWeight: 600,
  letterSpacing: '0.5px',
  textTransform: 'uppercase',
  fontSize: '0.75rem',
  boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.4)'
  }
}));

const HeroText = styled(Box)(({ theme }) => ({
  flex: 1,
  marginBottom: theme.spacing(4),
  paddingLeft: 0, 
  [theme.breakpoints.up('md')]: {
    marginBottom: 0,
    marginRight: theme.spacing(4),
    paddingLeft: '7%', 
  },
}));

const CtaSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));



const CurrentPrice = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'black',
});

const OriginalPrice = styled(Typography)({
  fontSize: '1rem',
  textDecoration: 'line-through',
  color: 'rgba(0, 0, 0, 0.6)',
});

const OfferText = styled(Typography)({
  fontSize: '0.875rem',
  color: 'rgba(0, 0, 0, 0.7)',
  fontStyle: 'italic',
  marginTop: '4px',
  lineHeight: 1.2,
});

const HeroImage = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  '& .product-image': {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
}));

const HeroSection = () => {
  const router = useRouter();
  
  const handleShopNow = () => {
    router.push('/offers');
  };
  return (
    <ThemeProvider theme={theme}>
      <HeroContainer>
        {/* <Overlay /> */}
        <ContentWrapper>
          <HeroContent maxWidth="xl">
            <HeroText>
              <DiscountBadge>Weekend Discount</DiscountBadge>
              <Typography variant="h1" component="h1" sx={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 700, fontSize: '48px', lineHeight: '1.2' }}>
                Get the best quality<br /> products at the lowest prices
              </Typography>
              <Typography variant="body1">
                We have prepared special discounts for you on organic breakfast products.
              </Typography>
              <CtaSection>
                <Box display="flex" alignItems="center" gap={4} flexWrap="wrap">
                  <Button 
                    variant="contained"
                    size="large"
                    onClick={handleShopNow}
                    sx={{
                      padding: '12px 40px',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '1rem',
                      backgroundColor: 'black',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#333',
                      },
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    Offers
                  </Button>
                  <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Box display="flex" gap={2} alignItems="center" sx={{ height: '48px', alignItems: 'center', paddingTop: '60px' }}>
                      <CurrentPrice component="span">$21.67</CurrentPrice>
                      <OriginalPrice component="span">$59.99</OriginalPrice>
                    </Box>
                    <OfferText sx={{ mt: 1 }}>Don't miss this limited time offer.</OfferText>
                  </Box>
                </Box>
              </CtaSection>
            </HeroText>
            <HeroImage>
              <Image  
                src="/images/heroslider.png" 
                alt="Organic Super Omega Squares" 
                width={500}
                height={400}
                className="product-image"
                priority
                style={{
                  opacity: 0, // Hidden since we're using it as a background
                  position: 'absolute',
                  pointerEvents: 'none',
                }}
              />
            </HeroImage>
          </HeroContent>
        </ContentWrapper>
      </HeroContainer>
    </ThemeProvider>
  );
};

export default HeroSection;