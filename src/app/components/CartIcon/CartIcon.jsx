'use client';

import { Badge, IconButton, Tooltip, useTheme, useMediaQuery } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';
import { useCart } from "../../../context/CartContext";

export default function CartIcon() {
  const router = useRouter();
  const { cart } = useCart();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Tooltip title="View Cart">
      <IconButton 
        color="inherit" 
        onClick={() => router.push('/cart')}
        sx={{
          color: 'text.primary',
          width: '48px',
          height: '48px',
          margin: '0 4px',
          '& .MuiSvgIcon-root': {
            fontSize: '1.8rem'
          },
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        <Badge 
          badgeContent={cart?.totalItems || 0} 
          color="error"
          overlap="circular"
          sx={{
            '& .MuiBadge-badge': {
              right: 8,
              top: 8,
              padding: '0 4px',
              height: '16px',
              minWidth: '16px',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              border: '1px solid #fff'
            },
          }}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
