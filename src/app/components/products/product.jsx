
"use client";

import { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Grid, 
  Container, 
  CircularProgress, 
  Box,
  Button,
  IconButton,
  Rating,
  useTheme,
  Snackbar,
  Alert,
  useMediaQuery
} from '@mui/material';
import { AddShoppingCart, FavoriteBorder, Favorite, Share, FlashOn } from '@mui/icons-material';
import { useCart } from "../../../context/CartContext";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Products = ({ categoryId  }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const productsPerPage = 8; // 2 rows x 4 items per row
  const theme = useTheme();
  const { addToCart, cart } = useCart();

  const handleAddToCart = async (product) => {
    try {
      // Ensure we have a valid image URL
      const imageUrl = Array.isArray(product.images) && product.images.length > 0 
        ? product.images[0] 
        : (product.image || null);
      
      console.log('Adding to cart:', {
        _id: product._id,
        name: product.name,
        price: product.price,
        image: imageUrl
      });

      const result = await addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: imageUrl,
        quantity: 1
      });
      
      if (result.success) {
        setSnackbar({
          open: true,
          message: 'Product added to cart!',
          severity: 'success'
        });
      } else {
        throw new Error(result.error || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to add product to cart',
        severity: 'error'
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
        let url = "http://localhost:3000/api/products";
        if (categoryId) {
          url += `?category=${categoryId}`;
        }
        
        const res = await fetch(url);
        console.log('API Response Status:', res.status);
        const data = await res.json();
        console.log('API Response Data:', data);
        
        // Check if the response has a data property or is the array directly
        const productsData = data.data || data.products || data;
        console.log('Extracted Products:', productsData);
        
        setProducts(Array.isArray(productsData) ? productsData : []);
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
      
      <Grid container spacing={6} justifyContent="center" sx={{ width: '100%', mb: 4, minHeight: showAll ? 'auto' : '800px' }}>
        {(showAll ? products : products.slice((page - 1) * productsPerPage, page * productsPerPage)).map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card 
              sx={{ 
                width: '400px',
                maxWidth: 300,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                position: 'relative',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                  '& .product-actions': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                  '& .product-image': {
                    transform: 'scale(1.05)',
                  }
                },
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
              <IconButton
                aria-label="add to wishlist"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: 'error.main'
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <FavoriteBorder />
              </IconButton>

              {/* Product Image */}
              <Box sx={{ 
                width: '100%',
                height: '300px',
                minHeight: '300px',
                overflow: 'hidden',
                position: 'relative',
                backgroundColor: '#f8f9fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                boxSizing: 'border-box'
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
                    transition: 'transform 0.5s ease',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
                
                {/* Quick Actions */}
                <Box className="product-actions" sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 1,
                  p: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(4px)',
                  transform: 'translateY(100%)',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                }}>
                  <Button 
                    size="small" 
                    color="primary"
                    startIcon={isInCart(product._id) ? <CheckCircleOutlineIcon /> : <AddShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                    variant={isInCart(product._id) ? 'contained' : 'outlined'}
                    disabled={product.stock <= 0}
                  >
                    {isInCart(product._id) ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                    startIcon={<FlashOn />}
                    sx={{ 
                      minWidth: 'auto',
                      borderRadius: '50%',
                      p: 1,
                    }}
                  />
                </Box>
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
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 1.5
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
                      minHeight: '2.8em',
                      lineHeight: '1.4',
                      m: 0,
                    }}
                  >
                    {product.name || 'Product Name'}
                  </Typography>

                  {/* Price */}
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography 
                      variant="h6" 
                      color="primary" 
                      fontWeight={700}
                      sx={{ lineHeight: 1.2, whiteSpace: 'nowrap' }}
                    >
                      ₹{(product.price * 0.9)?.toFixed(2) || '999.00'}
                    </Typography>
                  </Box>
                </Box>

                {/* Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <Rating 
                    value={product.rating || 4.5} 
                    precision={0.5} 
                    size="small" 
                    readOnly 
                    sx={{ color: '#ffb400', mr: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    ({product.reviewCount || '24'})
                  </Typography>
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

              {/* Add to Cart Button - Mobile */}
              {/* <CardActions sx={{ p: 2, pt: 0, display: { xs: 'flex', sm: 'none' } }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  startIcon={<AddShoppingCart />}
                  sx={{ 
                    borderRadius: '8px',
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                >
                  Add to Cart
                </Button>
              </CardActions> */}
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
