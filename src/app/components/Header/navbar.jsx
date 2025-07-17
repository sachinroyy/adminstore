'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem, 
  useMediaQuery, 
  useTheme,
  Container,
  TextField,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function Navbar() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMenu, setCurrentMenu] = useState('');

  const navItems = [
    { 
      label: 'Home', 
      path: '/',
      icon: <HomeIcon fontSize="small" />
    },
    { 
      label: 'Shop', 
      hasDropdown: true,
      items: [
        { label: 'Best Sellers', path: '/shop' },
        { label: 'Recomma', path: '/shop?filter=new' },
        { label: 'Best Sellers', path: '/shop?filter=bestsellers' },
        { label: 'On Sale', path: '/shop?filter=sale' },
      ]
    },
    { 
      label: 'Categories', 
      hasDropdown: true,
      items: [
        { label: 'Fruits', path: '/categories/fruits' },
        { label: 'Vegetables', path: '/categories/vegetables' },
        { label: 'Beverages', path: '/categories/beverages' },
        { label: 'Dairy', path: '/categories/dairy' },
      ]
    },
    { 
      label: 'Features', 
      path: '/pages/features',
      icon: <LocalOfferIcon fontSize="small" />
    },
    { 
      label: 'Blog', 
      path: '/pages/blog',
      icon: <MenuBookIcon fontSize="small" />
    },
    { 
      label: 'About Us', 
      path: '/pages/about',
      icon: <InfoIcon fontSize="small" />
    },
    { 
      label: 'Support', 
      path: '/pages/contact',
      icon: <ContactMailIcon fontSize="small" />
    },
  ];
  
  const rightNavItems = [
    { 
      label: 'Trending', 
      hasDropdown: true,
      items: [
        { label: 'Hot Deals', path: '/trending/hot-deals' },
        { label: 'Best Sellers', path: '/trending/best-sellers' },
        { label: 'New Arrivals', path: '/trending/new-arrivals' },
        { label: 'Special Offers', path: '/trending/special-offers' },
      ]
    }
  ];

  const navigateTo = (path) => {
    router.push(path);
    handleClose();
    handleMobileMenuClose();
  };

  const handleClick = (event, item) => {
    if (isMobile) return;
    if (item.hasDropdown) {
      setCurrentMenu(item.label);
      setAnchorEl(event.currentTarget);
    } else if (item.path) {
      navigateTo(item.path);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentMenu('');
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const renderDropdownMenu = (items, anchorOrigin = 'left') => (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: anchorOrigin,
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: anchorOrigin,
      }}
      PaperProps={{
        style: {
          minWidth: '200px',
          marginTop: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxHeight: '70vh',
          overflowY: 'auto',
        },
      }}
      disableScrollLock={true}
      MenuListProps={{
        'aria-labelledby': 'nested-menu',
        disablePadding: true,
      }}
    >
      {items.map((subItem, index) => (
        <MenuItem 
          key={index} 
          onClick={() => subItem.path && navigateTo(subItem.path)}
          sx={{
            '&:hover': {
              backgroundColor: 'action.hover',
              color: 'primary.main',
            },
            py: 1.5,
            px: 2,
          }}
        >
          {subItem.icon && <ListItemIcon sx={{ minWidth: 36 }}>{subItem.icon}</ListItemIcon>}
          <ListItemText primary={subItem.label} />
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: '48px !important', px: 1, width: '100%', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMobileMenuOpen}
                sx={{ mr: 2, color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Box key={item.label}>
                  <Button
                    color="inherit"
                    startIcon={item.icon}
                    endIcon={item.hasDropdown ? <ExpandMoreIcon /> : null}
                    onClick={(e) => handleClick(e, item)}
                    sx={{
                      color: 'text.primary',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      px: 1.5,
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'action.hover',
                      },
                      '& .MuiButton-startIcon': {
                        mr: 0.5,
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                  {item.hasDropdown && currentMenu === item.label && renderDropdownMenu(item.items || [], 'left')}
                </Box>
              ))}
            </Box>
          </Box>
          
          {/* Right-aligned items */}
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            width: { xs: '85%', md: 'auto' },
            justifyContent: 'flex-end'
          }}>
            <TextField
              size="small"
              placeholder="Search..."
              variant="outlined"
              sx={{
                display: { xs: 'flex', md: 'none' },
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  height: '36px',
                },
                '& .MuiOutlinedInput-input': {
                  py: '8px',
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {rightNavItems.map((item) => (
              <Box key={item.label}>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  endIcon={<ExpandMoreIcon />}
                  onClick={(e) => handleClick(e, item)}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 500,
                    fontSize: '0.85rem',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    boxShadow: 'none',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  {item.label}
                </Button>
                {item.hasDropdown && currentMenu === item.label && renderDropdownMenu(item.items || [])}
              </Box>
            ))}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              ml: 2,
              '&:hover': {
                '& .sale-button': {
                  transform: 'scale(1.03)',
                  boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)',
                }
              }
            }}>
              <Button
                variant="contained"
                color="error"
                size="small"
                endIcon={<ExpandMoreIcon />}
                className="sale-button"
                sx={{
                  borderRadius: '16px',
                  textTransform: 'none',
                  boxShadow: 'none',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)',
                    backgroundColor: '#d32f2f',
                  },
                }}
              >
                SALE
              </Button>
            </Box>
            </Box>
          </Box>
        </Toolbar>

        {/* Mobile Menu */}
        <Menu
          anchorEl={mobileMenuAnchor}
          open={Boolean(mobileMenuAnchor)}
          onClose={handleMobileMenuClose}
          PaperProps={{
            style: {
              width: '280px',
              maxWidth: '100%',
              marginTop: '8px',
              borderRadius: '8px',
              padding: '8px 0',
            },
          }}
        >
          {navItems.map((item) => (
            <div key={item.label}>
              <MenuItem 
                onClick={() => item.path && navigateTo(item.path)}
                sx={{
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon || <HomeIcon fontSize="small" />}
                </ListItemIcon>
                <ListItemText primary={item.label} />
                {item.hasDropdown && <ExpandMoreIcon fontSize="small" sx={{ ml: 1 }} />}
              </MenuItem>
              {item.hasDropdown && item.items?.map((subItem, index) => (
                <MenuItem 
                  key={index} 
                  onClick={() => navigateTo(subItem.path)}
                  sx={{
                    pl: 8,
                    py: 1.25,
                    fontSize: '0.9rem',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                      color: 'primary.main',
                    },
                  }}
                >
                  {subItem.label}
                </MenuItem>
              ))}
              <Divider sx={{ my: 0.5 }} />
            </div>
          ))}
          <Box sx={{ px: 2, py: 1, mt: 1 }}>
            <Typography variant="overline" color="text.secondary">
              Trending
            </Typography>
            {rightNavItems[0]?.items?.map((item, index) => (
              <MenuItem 
                key={index}
                onClick={() => navigateTo(item.path)}
                sx={{
                  py: 1.25,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    color: 'primary.main',
                  },
                }}
              >
                <LocalOfferIcon fontSize="small" sx={{ mr: 2, color: 'error.main' }} />
                <ListItemText primary={item.label} />
              </MenuItem>
            ))}
          </Box>
        </Menu>
    </Container>
  </AppBar>
  );
}
