'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Box, Badge, Slide } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../../context/CartContext';

export default function FloatingCartButton() {
  const router = useRouter();
  const { cart } = useCart();
  const [showButton, setShowButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show button when items are added to cart
  useEffect(() => {
    if (cart.totalItems > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setShowButton(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setShowButton(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cart.totalItems]);

  if (!isVisible) return null;

  return (
    <Slide direction="up" in={showButton} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          transform: 'translateX(-50%)',
          zIndex: 1300,
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          px: 2,
        }}
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => router.push('/cart')}
          startIcon={
            <Badge 
              badgeContent={cart.totalItems} 
              color="secondary"
              sx={{ 
                '& .MuiBadge-badge': { 
                  top: -5,
                  right: -5,
                  border: '2px solid #fff',
                  minWidth: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              }}
            >
              <ShoppingCartIcon />
            </Badge>
          }
          sx={{
            borderRadius: '50px',
            padding: '10px 24px',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            '&:hover': {
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              backgroundColor: '#d32f2f',
            },
          }}
        >
           ({cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'}) - ${cart.totalPrice.toFixed(2)}
        </Button>
      </Box>
    </Slide>
  );
}
