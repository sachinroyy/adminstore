
"use client";
import { useEffect, useState } from "react";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardMedia, 
  CircularProgress,
  Chip,
  Container, 
  Grid, 
  IconButton, 
  Typography, 
  useTheme,
  useMediaQuery
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AddShoppingCart, FavoriteBorder, Favorite, Share, FlashOn } from '@mui/icons-material';
import { useCart } from "../../../context/CartContext";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Products = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const productsPerPage = 8; // 2 rows x 4 items per row
  const theme = useTheme();
  const { addToCart, cart, updateQuantity } = useCart();
  
  // Get cart quantity for a product
  const getCartQuantity = (productId) => {
    const cartItem = cart.items.find(item => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = async (product, quantity = 1) => {
    try {
      // Check if user is not signed in
      if (!session) {
        // Store the product in sessionStorage to add after sign in
        const productToAdd = {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: Array.isArray(product.images) && product.images.length > 0 
            ? product.images[0] 
            : (product.image || null),
          quantity: quantity
        };
        
        // Store the product in sessionStorage
        sessionStorage.setItem('productToAdd', JSON.stringify(productToAdd));
        
        // Redirect to sign-in page with callback URL
        router.push(`/pages/singin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      // If user is signed in, proceed with adding to cart
      const imageUrl = Array.isArray(product.images) && product.images.length > 0 
        ? product.images[0] 
        : (product.image || null);
      
      console.log('Updating cart:', {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: imageUrl
      });

      const result = await addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: imageUrl,
        quantity: quantity
      });
      
      if (result.success) {
        setSnackbar({
          open: true,
          message: quantity > 0 
            ? quantity === 1 
              ? 'Product added to cart!' 
              : `${quantity} items added to cart!`
            : 'Product removed from cart!',
          severity: 'success'
        });
      } else {
        throw new Error(result.error || 'Failed to update cart');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to update cart',
        severity: 'error'
      });
    }
  };
  
  const handleIncrement = async (product) => {
    const currentQty = getCartQuantity(product._id);
    await updateQuantity(product._id, currentQty + 1);
  };
  
  const handleDecrement = async (product) => {
    const currentQty = getCartQuantity(product._id);
    const newQty = currentQty - 1;
    
    if (newQty > 0) {
      // If quantity is still greater than 0, update the quantity
      await updateQuantity(product._id, newQty);
    } else {
      // If quantity would be 0 or less, remove the item from cart
      await updateQuantity(product._id, 0);
      // Show feedback
      setSnackbar({
        open: true,
        message: 'Removed from cart',
        severity: 'success'
      });
    }
  };

  const isInCart = (productId) => {
    return cart.items.some(item => item.productId === productId);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Fetch product data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('Fetching products from API...');
        let url = "https://store-2b74.vercel.app/api/products";

        if (categoryId) {
          url += `?category=${categoryId}`;
        }
        
        const res = await fetch(url);
        console.log('API Response Status:', res.status);
        const data = await res.json();
        console.log('API Response Data:', data);

        // Support nested shape: { success, data: { data: [...] } }
        const productsData = (data && data.data && Array.isArray(data.data.data))
          ? data.data.data
          : (Array.isArray(data?.data) ? data.data : (data?.products || data));

        console.log('Extracted Products:', productsData);

        // Normalize to ensure required fields
        const normalized = Array.isArray(productsData)
          ? productsData.map((p, i) => ({
              ...p,
              _id: p._id || p.id || `${p.name || 'item'}-${i}`,
              image: p.image || (Array.isArray(p.images) && p.images[0]) || 'https://via.placeholder.com/300x300',
            }))
          : [];

        setProducts(normalized);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);

        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container 
      maxWidth={false} 
      sx={{ 
        maxWidth: '1850px', 
        width: '100%',
        py: 2,
       
        px: { xs: 3, sm: 3, md: 4 },
        margin: '0 auto'
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: 4, 
        width: '100%',
        position: 'relative',
        minHeight: { xs: '100px', sm: 'auto' }
      }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{
            color: '#1a1a1a',
            fontWeight: 800,
            letterSpacing: '0.5px',
            fontFamily: 'Poppins, Arial, sans-serif',
            background: 'linear-gradient(90deg, #1a1a1a 0%, #4a4a4a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            position: 'relative',
            display: 'inline-block',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: '60%',
              height: '4px',
              bottom: '-8px',
              left: 0,
              background: 'linear-gradient(90deg, #ff4d4d 0%, #f9cb28 100%)',
              borderRadius: '2px'
            },
            '@media (max-width: 600px)': {
              fontSize: '2rem',
              mb: 4
            }
          }}
        >
          New Arrival in this category        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => setShowAll(!showAll)}
          sx={{ 
            minWidth: '120px',
            position: { xs: 'absolute', sm: 'static' },
            bottom: 0,
            right: 0,
            '@media (max-width: 600px)': {
              alignSelf: 'flex-end',
              mt: 2
            }
          }}
        >
          {showAll ? 'Show Less' : 'View All'}
        </Button>
      </Box>
      
      <Grid container spacing={2} sx={{ 
        width: '100%', 
        mb: 4, 
        minHeight: showAll ? 'auto' : '800px',
        mx: 'auto',
        maxWidth: '1400px',
        px: { xs: 1, sm: 2 },
        justifyContent: { xs: 'center', sm: 'flex-start' }
      }}>
        {(showAll ? products : products.slice((page - 1) * productsPerPage, page * productsPerPage))
          .map((product) => (
          <Grid item key={product._id} xs={3} sm={4} md={3} lg={3} sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            width: '100%',
            maxWidth: { xs: '43%', sm: '31%', md: '32%', lg: '19%' },
            flex: '0 0 auto',
            p: 1
          }}>
            <Card 
              sx={{ 
                width: { xs: '160px', sm: '360px' ,md: '360px',lg: '400px' },
                height: { xs: '200px', sm: '260px',md: '320px',lg: '360px' },
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                position: 'relative',
                cursor: 'pointer',
                backgroundColor: '#fff',
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: { xs: 'none', sm: 'translateY(-2px)' }
                }
              }}
              onClick={(e) => {
                if (e.target.closest('.product-actions') || e.target.closest('.wishlist-button')) {
                  return;
                }
                router.push(`/pages/product/${product._id}?id=${product._id}`);
              }}
            >
              {/* Discount Badge */}
              {product.discount && (
                <Chip
                  label={`${product.discount}% OFF`}
                  color="error"
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    fontWeight: 'bold',
                    zIndex: 1,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
              )}

              {/* Wishlist Button */}


              {/* Product Image */}
              <Box sx={{ 
                width: '100%',
                height: { xs: '160px', sm: '220px', md: '250px' },
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                boxSizing: 'border-box',
                borderBottom: '1px solid #f0f0f0'
              }}>
                <CardMedia
                  component="img"
                  className="product-image"
                  image={product.image || "https://via.placeholder.com/300x300"}
                  alt={product.name}
                  sx={{
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
              </Box>

              {/* Add to Cart Button */}
              <Box sx={{ 
                p: { xs: 0.5, sm: 2 },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                
                gap: { xs: 0.5, sm: 1 },
                borderBottom: '1px solid #f0f0f0',
                minHeight: { xs: 'auto', sm: '72px' },
                flexGrow: 1,
                position: { xs: 'absolute', sm: 'static' },
                left: { xs: '50%', sm: 'auto' },
                right: { xs: 'auto', sm: 'auto' },
                bottom: { xs: '25%', sm: 'auto' },
                width: { xs: '80%', sm: 'auto' },
                transform: { xs: 'translateX(-50%)', sm: 'none' },
                zIndex: { xs: 2, sm: 'auto' },
                backgroundColor: { xs: 'rgba(255,255,255,0.9)', sm: 'transparent' },
                backdropFilter: { xs: 'saturate(120%) blur(2px)', sm: 'none' }
              }}>
                  {getCartQuantity(product._id) >= 1 ? (
                    <Box 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        backgroundColor: 'background.paper',
                        '& .MuiButton-root': {
                          minWidth: 'auto',
                          padding: '4px 8px',
                          '&:hover': {
                            backgroundColor: 'transparent'
                          }
                        }
                      }}
                    >
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDecrement(product);
                        }}
                        disabled={product.stock <= 0}
                        color="primary"
                        sx={{ 
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          minWidth: '32px',
                          height: '32px',
                          p: 0.5
                        }}
                      >
                        -
                      </IconButton>
                      <Typography variant="body1" sx={{ minWidth: '24px', textAlign: 'center' }}>
                        {getCartQuantity(product._id)}
                      </Typography>
                      <IconButton 
                        size="small" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIncrement(product);
                        }}
                        sx={{ 
                          border: '1px solid',
                          borderColor: 'divider',
                          borderRadius: 1,
                          minWidth: '32px',
                          height: '32px'
                        }}
                      >
                        +
                      </IconButton>
                    </Box>
                  ) : getCartQuantity(product._id) === 0 ? (
                    <Button 
                      size="small" 
                      color="error"
                      startIcon={<AddShoppingCartIcon sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: 'error.main' }} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product, 1);
                      }}
                      variant="outlined"
                      disabled={product.stock <= 0}
                      fullWidth
                      sx={{ 
                        whiteSpace: 'nowrap',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        px: { xs: 0.5, sm: 1 },
                        color: 'error.main',
                        borderColor: 'error.main',
                        '&:hover': {
                          borderColor: 'error.dark',
                          backgroundColor: 'error.light',
                          color: 'error.dark'
                        },
                        '& .MuiButton-startIcon': {
                          mr: { xs: 0.5, sm: 1 },
                          color: 'error.main'
                        }
                      }}
                    >
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Add to Cart</Box>
                      <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Add</Box>
                    </Button>
                  ) : (
                    <Button 
                      size="small" 
                      color="error"
                      startIcon={<AddShoppingCartIcon sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: 'error.main' }} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product, 1);
                      }}
                      variant="outlined"
                      disabled={product.stock <= 0}
                      fullWidth
                      sx={{ 
                        whiteSpace: 'nowrap',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        px: { xs: 0.5, sm: 1 },
                        color: 'error.main',
                        borderColor: 'error.main',
                        '&:hover': {
                          borderColor: 'error.dark',
                          backgroundColor: 'error.light',
                          color: 'error.dark'
                        },
                        '& .MuiButton-startIcon': {
                          mr: { xs: 0.5, sm: 1 },
                          color: 'error.main'
                        }
                      }}
                    >
                      <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Add to Cart</Box>
                      <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Add</Box>
                    </Button>
                  )}
                </Box>

              {/* Product Info */}
              <CardContent sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                flexDirection: 'column',
                p: 2,
                pt: 1,
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 1,
                  mb: { xs: 0.5, sm: 1.5 },
                  width: '100%',
                  textAlign: 'left'
                }}>
                  {/* Product Name */}
                  <Typography 
                    variant="subtitle1" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 600,
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      minHeight: 'auto',
                      lineHeight: '1.3',
                      m: 0,
                      fontSize: { xs: '0.8rem', sm: '1rem' },
                      pr: 1,
                      textAlign: 'left'
                    }}
                  >
                    {product.name || 'Product Name'}
                  </Typography>

                  {/* Price */}
                  <Box sx={{ 
                    textAlign: 'right',
                    flexShrink: 0,
                    width: 'auto'
                  }}>
                    <Typography 
                      variant="h6" 
                      color="primary" 
                      fontWeight={700}
                      sx={{ 
                        lineHeight: 1.2, 
                        whiteSpace: 'nowrap',
                        fontSize: { xs: '0.8rem', sm: '1.25rem' },
                        textAlign: 'right'
                      }}
                    >
                      ₹{(product.price * 0.9)?.toFixed(0) || '999'}
                    </Typography>
                  </Box>
                </Box>

                {/* Discount and Original Price */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 'auto' }}>
                  {product.discount && (
                    <>
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ textDecoration: 'line-through' }}
                      >
                        ₹{product.price?.toFixed(2) || '1,099.00'}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="success.main"
                        sx={{ 
                          bgcolor: 'success.light',
                          px: 1,
                          py: 0.25,
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}
                      >
                        Save {product.discount}%
                      </Typography>
                    </>
                  )}
                </Box>
              </CardContent>

            
            </Card>
          </Grid>
        ))}
      </Grid>

      {!showAll && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button 
            variant="outlined" 
            onClick={() => setShowAll(true)}
            sx={{ textTransform: 'none' }}
          >
            View More Products
          </Button>
        </Box>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Products;
