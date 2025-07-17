"use client";

import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography, 
  Box, 
  Divider, 
  useMediaQuery, 
  useTheme,
  Button
} from '@mui/material';
import {
  Person as PersonIcon,
  Favorite as FavoriteIcon,
  LocalShipping as LocalShippingIcon,
  Language as LanguageIcon,
  AttachMoney as AttachMoneyIcon,
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const InformationBar = () => {
  const router = useRouter();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [languageAnchor, setLanguageAnchor] = useState(null);
  const [currencyAnchor, setCurrencyAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Don't render anything on mobile
  if (isMobile) {
    return null;
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileMenuAnchor(null);
    setLanguageAnchor(null);
    setCurrencyAnchor(null);
  };

  const handleLanguageClick = (event) => {
    setLanguageAnchor(event.currentTarget);
  };

  const handleCurrencyClick = (event) => {
    setCurrencyAnchor(event.currentTarget);
  };

  const renderDesktopMenu = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Button 
        href="/pages/about" 
        color="inherit" 
        size="small"
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      >
        About Us
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button 
        onClick={() => router.push('/components/myaccount')}
        color="inherit" 
        size="small"
        startIcon={<PersonIcon fontSize="small" />}
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, cursor: 'pointer' }}
      >
        My account
      </Button>
      <Divider orientation="vertical" flexItem />
      <Button 
        onClick={() => router.push('/pages/wishlist')}
        color="inherit" 
        size="small"
        startIcon={<FavoriteIcon fontSize="small" />}
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' }, cursor: 'pointer' }}
      >
        Wishlist
      </Button>
    </Box>
  );

  const renderDesktopOptions = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3   }}>
      <Button 
        color="inherit" 
        endIcon={<ExpandMoreIcon />}
        onClick={handleLanguageClick}
        size="small"
        sx={{ color: 'text.secondary' }}
      >
        English
      </Button>
      <Menu
        anchorEl={languageAnchor}
        open={Boolean(languageAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableScrollLock={true}
        MenuListProps={{
          'aria-labelledby': 'language-menu',
          disablePadding: true,
        }}
        PaperProps={{
          style: {
            minWidth: '120px',
            marginTop: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuItem onClick={handleMenuClose} dense>English</MenuItem>
        <MenuItem onClick={handleMenuClose} dense>Español</MenuItem>
        <MenuItem onClick={handleMenuClose} dense>Français</MenuItem>
      </Menu>

      <Button 
        color="inherit" 
        endIcon={<ExpandMoreIcon />}
        onClick={handleCurrencyClick}
        size="small"
        sx={{ color: 'text.secondary' }}
      >
        USD
      </Button>
      <Menu
        anchorEl={currencyAnchor}
        open={Boolean(currencyAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableScrollLock={true}
        MenuListProps={{
          'aria-labelledby': 'currency-menu',
          disablePadding: true,
        }}
        PaperProps={{
          style: {
            minWidth: '100px',
            marginTop: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuItem onClick={handleMenuClose} dense>USD</MenuItem>
        <MenuItem onClick={handleMenuClose} dense>EUR</MenuItem>
        <MenuItem onClick={handleMenuClose} dense>GBP</MenuItem>
      </Menu>

      <Button 
        href="/pages/tracking" 
        color="inherit" 
        size="small"
        sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
      >
        Order Tracking
      </Button>
    </Box>
  );

  const renderMobileMenu = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleMobileMenuOpen}
        sx={{ color: 'text.secondary' }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        disableScrollLock={true}
        MenuListProps={{
          'aria-labelledby': 'mobile-menu',
          disablePadding: true,
        }}
        PaperProps={{
          style: {
            width: '240px',
            maxWidth: '100%',
            marginTop: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
      >
        <MenuItem component="a" href="/pages/about" onClick={handleMenuClose} sx={{ py: 1.5 }}>About Us</MenuItem>
        <MenuItem component="a" href="/account" onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <PersonIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> My Account
        </MenuItem>
        <MenuItem component="a" href="/pages/wishlist" onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <FavoriteIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Wishlist
        </MenuItem>
        <MenuItem component="a" href="/pages/tracking" onClick={handleMenuClose} sx={{ py: 1.5 }}>
          <LocalShippingIcon sx={{ mr: 1, fontSize: '1.25rem' }} /> Order Tracking
        </MenuItem>
      </Menu>

      <Box sx={{ display: 'flex', alignItems: 'center', color: 'orange' }}>
        <LocalShippingIcon sx={{ mr: 0.5, fontSize: '1rem' }} />
        <Typography variant="caption">7:00-23:00</Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Box sx={{ backgroundColor: 'primary.main', height: '2px', width: '100%'  }} />
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'white', color: 'black' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: '32px !important', py: '2px !important' }}>
            {isMobile ? (
              renderMobileMenu()
            ) : (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                  <LocalShippingIcon sx={{ mr: 1, color: 'orange', fontSize: '1rem', justifyContent: 'center', alignItems: 'center' }} />
                  <Typography variant="caption" color="text.secondary">
                    We deliver{' '}
                    <Box component="span" sx={{ color: 'orange', fontWeight: 'medium', ml: 0.5 }}>
                      7:00 to 23:00
                    </Box>
                  </Typography>
                </Box>
                {renderDesktopMenu()}
                <Box sx={{ ml: 'auto' }}>
                  {renderDesktopOptions()}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default InformationBar;