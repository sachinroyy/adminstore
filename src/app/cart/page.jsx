'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField,
  IconButton,
  Divider,
  Stack,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { initiateRazorpayPayment } from '../../lib/razorpay';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  useEffect(() => {
    if (session) {
      setShippingAddress(prev => ({
        ...prev,
        name: session.user?.name || '',
      }));
      setLoading(false);
    }
  }, [session]);

  const [updatingItems, setUpdatingItems] = useState({});

  const handleQuantityChange = async (productId, newQuantity) => {
    const quantity = Math.max(1, Math.min(100, parseInt(newQuantity, 10) || 1));
    
    try {
      setUpdatingItems(prev => ({ ...prev, [productId]: true }));
      
      const result = await updateQuantity(productId, quantity);
      
      if (!result.success) {
        setSnackbar({
          open: true,
          message: result.error || 'Failed to update quantity',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      setSnackbar({
        open: true,
        message: 'An error occurred while updating quantity',
        severity: 'error'
      });
    } finally {
      setUpdatingItems(prev => ({ ...prev, [productId]: false }));
    }
  };

  const incrementQuantity = async (productId, currentQuantity) => {
    await handleQuantityChange(productId, currentQuantity + 1);
  };

  const decrementQuantity = async (productId, currentQuantity) => {
    if (currentQuantity <= 1) {
      // If quantity is 1 or less, remove the item
      try {
        setUpdatingItems(prev => ({ ...prev, [productId]: true }));
        await removeFromCart(productId);
      } catch (error) {
        console.error('Error removing item:', error);
        setSnackbar({
          open: true,
          message: 'Failed to remove item from cart',
          severity: 'error'
        });
      } finally {
        setUpdatingItems(prev => ({ ...prev, [productId]: false }));
      }
    } else {
      // Otherwise, just decrement the quantity
      await handleQuantityChange(productId, currentQuantity - 1);
    }
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const processOrder = async (paymentData) => {
    try {
      // Show loading state
      setIsProcessing(true);
      setSnackbar({
        open: true,
        message: 'Processing your order...',
        severity: 'info',
        autoHideDuration: null // Don't auto-hide
      });

      // Create the order
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.items,
          total: cart.totalPrice,
          shippingAddress,
          userId: session.user.id,
          email: session.user.email,
          payment: paymentData
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const order = await response.json();
      
      // Clear the cart
      await clearCart();
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Order placed successfully! Redirecting to order details...',
        severity: 'success',
        autoHideDuration: 2000
      });
      
      // Navigate to order details after a short delay
      setTimeout(() => {
        router.push(`/orders/${order._id}?payment_success=true`);
      }, 1500);
      
    } catch (error) {
      console.error('Error processing order:', error);
      setSnackbar({
        open: true,
        message: `Error: ${error.message || 'Failed to process order. Please contact support.'}`,
        severity: 'error'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckout = async () => {
    if (!session) {
      router.push('/auth/signin?callbackUrl=/cart');
      return;
    }

    // Validate shipping address
    const requiredFields = ['name', 'address', 'city', 'state', 'zip', 'phone'];
    const missingFields = requiredFields.filter(field => !shippingAddress[field]);
    
    if (missingFields.length > 0) {
      setSnackbar({
        open: true,
        message: `Please fill in all required fields: ${missingFields.join(', ')}`,
        severity: 'error'
      });
      return;
    }

    setIsProcessing(true);

    try {
      // First create a Razorpay order
      const orderResponse = await fetch('/api/razorpay/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: cart.totalPrice,
          currency: 'INR',
          notes: {
            userId: session.user.id,
            items: JSON.stringify(cart.items.map(item => ({
              id: item.productId,
              name: item.name,
              quantity: item.quantity,
              price: item.price
            })))
          }
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Initialize Razorpay payment
      const rzp = await initiateRazorpayPayment({
        amount: cart.totalPrice,
        orderId: orderData.orderId,
        name: 'Your Store Name',
        description: `Order #${orderData.receipt}`,
        prefill: {
          name: shippingAddress.name,
          email: session.user.email,
          phone: shippingAddress.phone
        },
        notes: {
          address: shippingAddress.address,
          orderId: orderData.receipt
        },
      });

      // Handle payment success
      rzp.on('payment.success', async (response) => {
        try {
          // Verify payment signature
          const verifyResponse = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            }),
          });

          const verifyData = await verifyResponse.json();

          if (!verifyResponse.ok) {
            throw new Error(verifyData.error || 'Payment verification failed');
          }

          // Process the order with payment details
          await processOrder({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            status: 'captured',
            method: response.razorpay_payment_method || 'card',
            amount: cart.totalPrice,
            currency: 'INR'
          });

        } catch (error) {
          console.error('Payment verification error:', error);
          setSnackbar({
            open: true,
            message: 'Payment verification failed. Please contact support.',
            severity: 'error'
          });
          setIsProcessing(false);
        }
      });

      // Handle payment failure
      rzp.on('payment.failed', (response) => {
        console.error('Payment failed:', response.error);
        setSnackbar({
          open: true,
          message: `Payment failed: ${response.error.description || 'Unknown error'}`,
          severity: 'error'
        });
        setIsProcessing(false);
      });

      // Open Razorpay payment modal
      rzp.open();

    } catch (error) {
      console.error('Checkout error:', error);
      setSnackbar({
        open: true,
        message: error.message || 'Failed to initiate payment. Please try again.',
        severity: 'error'
      });
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!session) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Please sign in to view your cart
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/auth/signin?callbackUrl=/cart')}
        >
          Sign In
        </Button>
      </Container>
    );
  }

  if (!cart?.items || cart.items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center', color: 'text.primary' }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/products')}
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} variant="outlined" sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  variant="outlined"
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  value={shippingAddress.city}
                  onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="State"
                  variant="outlined"
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                  required
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ZIP/Postal Code"
                  variant="outlined"
                  value={shippingAddress.zip}
                  onChange={(e) => setShippingAddress({...shippingAddress, zip: e.target.value})}
                  required
                  margin="normal"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  value={shippingAddress.phone}
                  onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                  required
                  margin="normal"
                  type="tel"
                  inputProps={{
                    pattern: '[0-9]{10}',
                    title: 'Please enter a valid 10-digit phone number'
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
          <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.items.map((item, index) => {
                  // Ensure all required fields exist
                  const safeItem = {
                    ...item,
                    productId: item.productId || `temp-${index}`,
                    name: item.name || 'Unnamed Product',
                    price: parseFloat(item.price) || 0,
                    quantity: Math.max(1, parseInt(item.quantity, 10)) || 1,
                    image: item.image
                  };
                  
                  return (
                    <TableRow key={`${safeItem.productId}-${index}`}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ width: 80, height: 80, position: 'relative' }}>
                            {safeItem.image ? (
                              <Image
                                src={safeItem.image}
                                alt={`Image of ${safeItem.name}`}
                                width={80}
                                height={80}
                                style={{ objectFit: 'contain' }}
                                unoptimized={!safeItem.image.startsWith('/')}
                              />
                            ) : (
                              <div style={{ width: 80, height: 80, backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: '#9ca3af' }}>No Image</span>
                              </div>
                            )}
                          </Box>
                          <Typography variant="body1">{safeItem.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ₹{safeItem.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <Box display="flex" alignItems="center">
                          <IconButton 
                            onClick={() => decrementQuantity(item.productId, item.quantity)}
                            disabled={updatingItems[item.productId]}
                            size="small"
                            aria-label={item.quantity <= 1 ? "Remove item" : "Decrease quantity"}
                            color={item.quantity <= 1 ? "error" : "default"}
                          >
                            {updatingItems[item.productId] ? (
                              <CircularProgress size={20} />
                            ) : item.quantity <= 1 ? (
                              <DeleteIcon fontSize="small" />
                            ) : (
                              <RemoveIcon fontSize="small" />
                            )}
                          </IconButton>
                          
                          <TextField
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
                            onBlur={(e) => handleQuantityChange(item.productId, e.target.value)}
                            inputProps={{ 
                              min: 1, 
                              max: 100,
                              'aria-label': `Quantity for ${item.name}`
                            }}
                            size="small"
                            sx={{ 
                              width: '60px', 
                              mx: 1,
                              '& .MuiOutlinedInput-input': { 
                                textAlign: 'center',
                                padding: '8.5px 8px',
                                '-moz-appearance': 'textfield'
                              },
                              '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                                margin: 0
                              }
                            }}
                            disabled={updatingItems[item.productId]}
                          />
                          
                          <IconButton 
                            onClick={() => incrementQuantity(item.productId, item.quantity)}
                            disabled={item.quantity >= 100 || updatingItems[item.productId]}
                            size="small"
                            aria-label="Increase quantity"
                          >
                            {updatingItems[item.productId] ? (
                              <CircularProgress size={20} />
                            ) : (
                              <AddIcon fontSize="small" />
                            )}
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ₹{(safeItem.price * safeItem.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton 
                          onClick={async () => {
                            try {
                              setUpdatingItems(prev => ({ ...prev, [item.productId]: true }));
                              const result = await removeFromCart(item.productId);
                              if (!result.success) {
                                setSnackbar({
                                  open: true,
                                  message: 'Failed to remove item from cart',
                                  severity: 'error'
                                });
                              } else {
                                setSnackbar({
                                  open: true,
                                  message: 'Item removed from cart',
                                  severity: 'success'
                                });
                              }
                            } catch (error) {
                              console.error('Error removing item:', error);
                              setSnackbar({
                                open: true,
                                message: 'Error removing item from cart',
                                severity: 'error'
                              });
                            } finally {
                              setUpdatingItems(prev => ({ ...prev, [item.productId]: false }));
                            }
                          }}
                          color="error"
                          size="small"
                          disabled={updatingItems[item.productId]}
                          aria-label="Remove item from cart"
                        >
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={0} variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Subtotal</Typography>
                <Typography>₹{cart?.total?.toFixed(2) || '0.00'}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">₹{cart.total.toFixed(2)}</Typography>
              </Box>

              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                fullWidth
                onClick={handleCheckout}
                disabled={isProcessing}
                sx={{ mt: 2 }}
              >
                {isProcessing ? (
                  <>
                    <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </Button>

              <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert 
                  onClose={handleCloseSnackbar} 
                  severity={snackbar.severity}
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {snackbar.message}
                </Alert>
              </Snackbar>

              <Button 
                variant="outlined" 
                color="error" 
                size="small"
                fullWidth
                onClick={clearCart}
                startIcon={<DeleteIcon />}
                sx={{ mt: 1 }}
              >
                Clear Cart
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
