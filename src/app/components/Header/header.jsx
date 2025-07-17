"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Badge,
  useMediaQuery,
  useTheme,
  Button,
  Menu,
  MenuItem,
  Divider,
  Stack
} from '@mui/material';
import {
  LocationOnOutlined as LocationIcon,
  Search as SearchIcon,
  PersonOutline as PersonIcon,
  FavoriteBorder as FavoriteIcon,
  ShoppingCartOutlined as CartOutlineIcon,
  ExpandMore as ExpandMoreIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import CartIcon from '../CartIcon/CartIcon';

const Header = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [locationAnchor, setLocationAnchor] = useState(null);

  const handleLocationClick = (event) => {
    setLocationAnchor(event.currentTarget);
  };

  const handleLocationClose = () => {
    setLocationAnchor(null);
  };



  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'white', 
        color: 'black',
        borderBottom: '1px solid #e0e0e0',
        py: '4px !important',
        minHeight: '48px !important'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '40px !important', py: '0 !important' }}>


          {/* Logo */}
          <Box 
            component="a" 
            href="/" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              textDecoration: 'none',
              color: 'primary.main',
              mr: isMobile ? 'auto' : 4
            }}
          >
            <Box
              component="img"
              src="/images/image.png"
              alt="Logo"
              sx={{
                height: 40,
                width: '100%',
                mr: 2
              }}
            />
             <Box
              component="img"
              src="/images/JinStore.png"
              alt="Logo"
              sx={{
                padding: 1,
                height: 40,
                width: '100%',  
                mr: 2
              }}
            />
           
          </Box>


          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, ml: 2, width: '100%' }}>
              {/* Location */} 
              <Button
                color="inherit"
                startIcon={<LocationIcon fontSize="large" />}
                endIcon={<ExpandMoreIcon fontSize="large" />}
                onClick={handleLocationClick}
                sx={{ 
                  color: 'text.primary',
                  textTransform: 'none',
                  mr: 2,
                  
                }}
              >
                <Box sx={{ textAlign: 'left' }}>
                  <Typography variant="caption" display="block" lineHeight={1}>
                    Deliver to
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="bold">
                    India
                  </Typography>
                </Box>
              </Button>
              <Menu
                anchorEl={locationAnchor}
                open={Boolean(locationAnchor)}
                onClose={handleLocationClose}
              >
                <MenuItem onClick={handleLocationClose}>United States</MenuItem>
                <MenuItem onClick={handleLocationClose}>United Kingdom</MenuItem>
                <MenuItem onClick={handleLocationClose}>Canada</MenuItem>
                <MenuItem onClick={handleLocationClose}>Australia</MenuItem>
              </Menu>

              {/* Search Bar */}
              <Box sx={{ flexGrow: 1, maxWidth: '100%', ml: 2, mr: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search for products..."
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 2,
                      backgroundColor: '#f5f5f5',
                      '& fieldset': { border: 'none' }
                    }
                  }}
                />
              </Box>
            </Box>
          )}

          {/* Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
             {isMobile ? (
               <IconButton 
                 onClick={() => router.push('/components/singin')}
                 sx={{ 
                   color: 'text.primary',
                   width: '48px',
                   height: '48px',
                   '& .MuiSvgIcon-root': {
                     fontSize: '1.8rem'
                   },
                   '&:hover': {
                     backgroundColor: 'rgba(0, 0, 0, 0.04)'
                   }
                 }}
               >
                 <PersonIcon />
               </IconButton>
             ) : (
               <Button 
                 color="inherit"
                 startIcon={<PersonIcon />}
                 onClick={() => router.push('/components/singin')}
                 sx={{ 
                   color: 'text.primary',
                   textTransform: 'none',
                   display: 'flex',
                   flexDirection: 'row',
                   alignItems: 'center',
                   minWidth: '120px',
                   padding: '8px 16px',
                   margin: '0 4px',
                   '& .MuiButton-startIcon': {
                     marginRight: '8px',
                     '& > *:first-of-type': {
                       fontSize: '1.6rem',
                     },
                   },
                   '&:hover': {
                     backgroundColor: 'rgba(0, 0, 0, 0.04)'
                   },
                   cursor: 'pointer'
                 }}
               >
                 <Box sx={{ textAlign: 'left' }}>
                   <Box component="div" sx={{ fontSize: '0.8rem', lineHeight: 1.2 }}>Sign In</Box>
                   <Box component="div" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Account</Box>
                 </Box>
               </Button>
             )}
            
            <IconButton sx={{ 
              color: 'text.primary',
              width: '48px',
              height: '48px',
              margin: '0 4px',
              '& .MuiSvgIcon-root': {
                fontSize: '1.8rem'
              }
            }}>
              <Badge badgeContent={3} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            
            <CartIcon />
            
           
          </Box>
        </Toolbar>


      </Container>
    </AppBar>
  );
};

export default Header;