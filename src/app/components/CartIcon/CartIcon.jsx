'use client';

import { Badge, IconButton, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/navigation';
import { useCart } from "../../../context/CartContext";

export default function CartIcon() {
  const router = useRouter();
  const { cartCount } = useCart();

  return (
    <Tooltip title="View Cart">
      <IconButton 
        color="inherit" 
        onClick={() => router.push('/cart')}
        sx={{
          position: 'relative',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <Badge 
          badgeContent={cartCount} 
          color="secondary"
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
            },
          }}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
