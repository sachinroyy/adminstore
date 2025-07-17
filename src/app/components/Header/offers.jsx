"use client";

import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  IconButton,
  useTheme,
  useMediaQuery,
  styled
} from '@mui/material';
import { 
  KeyboardArrowLeft as ArrowLeftIcon, 
  KeyboardArrowRight as ArrowRightIcon 
} from '@mui/icons-material';

const offers = [
  { text: "FREE SHIPPING ON ORDERS OVER $50", code: "FREESHIP" },
  { text: "20% OFF ON YOUR FIRST ORDER", code: "WELCOME20" },
  { text: "BUY 1 GET 1 FREE ON SELECTED ITEMS", code: "BOGO" },
  { text: "FREE RETURNS & EXCHANGES", code: "" },
];

const OfferText = styled(Typography)({
  color: '#fff',
  fontSize: '0.75rem',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  '& .highlight': {
    color: '#ffd700',
    fontWeight: 700,
    marginLeft: '4px',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '2px 6px',
    borderRadius: '4px',
  }
});

const OffersBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentOffer, setCurrentOffer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (offers.length <= 1) return;
    
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentOffer((prev) => (prev + 1) % offers.length);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentOffer((prev) => (prev - 1 + offers.length) % offers.length);
  };

  const handleNext = () => {
    setCurrentOffer((prev) => (prev + 1) % offers.length);
  };

  const current = offers[currentOffer];
  const showArrows = offers.length > 1;

  return (
    <Box 
      sx={{
        backgroundColor: '#333',
        color: 'white',
        padding: '8px 0',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          '& .offer-arrow': {
            opacity: 0.8,
          }
        }
      }}
    >
      <Box 
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          px: 2
        }}
      >
        {showArrows && (
          <IconButton 
            className="offer-arrow"
            onClick={handlePrev}
            size="small"
            sx={{
              color: 'white',
              opacity: 0.5,
              transition: 'opacity 0.3s',
              position: 'absolute',
              left: 8,
              '&:hover': {
                opacity: 1,
                backgroundColor: 'rgba(255,255,255,0.1)'
              },
              ...(isMobile && { display: 'none' })
            }}
          >
            <ArrowLeftIcon fontSize="small" />
          </IconButton>
        )}

        <Box 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          sx={{
            textAlign: 'center',
            flexGrow: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            px: showArrows ? 4 : 2
          }}
        >
          <OfferText>
            {current.text}
            {current.code && (
              <span className="highlight">{current.code}</span>
            )}
          </OfferText>
        </Box>

        {showArrows && (
          <IconButton 
            className="offer-arrow"
            onClick={handleNext}
            size="small"
            sx={{
              color: 'white',
              opacity: 0.5,
              transition: 'opacity 0.3s',
              position: 'absolute',
              right: 8,
              '&:hover': {
                opacity: 1,
                backgroundColor: 'rgba(255,255,255,0.1)'
              },
              ...(isMobile && { display: 'none' })
            }}
          >
            <ArrowRightIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* Indicators for mobile */}
      {showArrows && isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, gap: 1 }}>
          {offers.map((_, index) => (
            <Box 
              key={index}
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                bgcolor: index === currentOffer ? 'white' : 'rgba(255,255,255,0.3)',
                transition: 'background-color 0.3s'
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default OffersBar;