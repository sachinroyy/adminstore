'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  useTheme
} from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const fetchOrder = async () => {
      if (!session) return;
      
      try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
          throw new Error('Order not found');
        }
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, session]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'secondary';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateTotal = (items) => {
    return items?.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + (price * quantity);
    }, 0) || 0;
  };

  if (!session) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Please sign in to view this order
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push(`/auth/signin?callbackUrl=/orders/${id}`)}
        >
          Sign In
        </Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || 'Order not found'}
        </Typography>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => router.push('/orders')}
          sx={{ mt: 2 }}
        >
          Back to Orders
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBackIcon />} 
        onClick={() => router.push('/orders')}
        sx={{ mb: 3 }}
      >
        Back to Orders
      </Button>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Order #{order.orderNumber || id}
        </Typography>
        <Chip 
          label={order.status || 'Unknown'} 
          color={getStatusColor(order.status)}
          size="medium"
        />
      </Box>

      <Grid container spacing={3}>
        {/* Order Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Order Items</Typography>
            <TableContainer>
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
                  {order.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          {item.image && (
                            <Box sx={{ width: 64, height: 64, mr: 2, position: 'relative' }}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                style={{ objectFit: 'contain' }}
                              />
                            </Box>
                          )}
                          <div>
                            <Typography variant="body1">{item.name}</Typography>
                            {item.variant && (
                              <Typography variant="body2" color="textSecondary">
                                {item.variant}
                              </Typography>
                            )}
                          </div>
                        </Box>
                      </TableCell>
                      <TableCell align="right">${parseFloat(item.price || 0).toFixed(2)}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right">
                        ${(parseFloat(item.price || 0) * parseInt(item.quantity || 0)).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Order Summary</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Order Date" />
                <Typography>{formatDate(order.createdAt)}</Typography>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Subtotal" />
                <Typography>${calculateTotal(order.items).toFixed(2)}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Shipping" />
                <Typography>${parseFloat(order.shippingCost || 0).toFixed(2)}</Typography>
              </ListItem>
              <ListItem>
                <ListItemText primary="Tax" />
                <Typography>${parseFloat(order.tax || 0).toFixed(2)}</Typography>
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText 
                  primary={<strong>Total</strong>} 
                  primaryTypographyProps={{ fontWeight: 'bold' }} 
                />
                <Typography variant="h6">
                  ${(
                    calculateTotal(order.items) + 
                    parseFloat(order.shippingCost || 0) + 
                    parseFloat(order.tax || 0)
                  ).toFixed(2)}
                </Typography>
              </ListItem>
            </List>
          </Paper>

          {/* Shipping Information */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Shipping Information</Typography>
            <Typography>
              {order.shippingAddress?.name || 'N/A'}<br />
              {order.shippingAddress?.street}<br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}<br />
              {order.shippingAddress?.country}
            </Typography>
            
            <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
              Contact Information
            </Typography>
            <Typography>
              {order.customerEmail || 'N/A'}<br />
              {order.shippingAddress?.phone || 'N/A'}
            </Typography>

            {order.trackingNumber && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 2, fontWeight: 'bold' }}>
                  Tracking Information
                </Typography>
                <Typography>Tracking #: {order.trackingNumber}</Typography>
                {order.trackingUrl && (
                  <Button 
                    variant="outlined" 
                    size="small" 
                    sx={{ mt: 1 }}
                    onClick={() => window.open(order.trackingUrl, '_blank')}
                  >
                    Track Package
                  </Button>
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
