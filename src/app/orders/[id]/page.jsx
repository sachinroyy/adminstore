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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || 'Order not found'}
        </Typography>
        <Button 
          variant="outlined" 
          color="primary" 
          onClick={() => router.push('/orders')}
          startIcon={<ArrowBackIcon />}
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

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Order #{order._id.slice(-6).toUpperCase()}
        </Typography>
        <Chip 
          label={order.status}
          color={getStatusColor(order.status)}
          sx={{ textTransform: 'capitalize', fontWeight: 600 }}
        />
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={0} variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Order Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List dense>
              <ListItem disablePadding sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="Order Date" 
                  secondary={formatDate(order.createdAt)} 
                />
              </ListItem>
              <ListItem disablePadding sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="Order Total" 
                  secondary={`₹${order.total.toFixed(2)}`} 
                />
              </ListItem>
              <ListItem disablePadding sx={{ py: 0.5 }}>
                <ListItemText 
                  primary="Payment Method" 
                  secondary={order.paymentMethod || 'Not specified'} 
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={0} variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {order.shippingAddress ? (
              <Box>
                <Typography>{order.shippingAddress.name}</Typography>
                <Typography>{order.shippingAddress.address}</Typography>
                <Typography>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                </Typography>
                <Typography>Phone: {order.shippingAddress.phone}</Typography>
              </Box>
            ) : (
              <Typography color="text.secondary">No shipping address provided</Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={0} variant="outlined" sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Order Status
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Current Status
                </Typography>
                <Chip 
                  label={order.status}
                  color={getStatusColor(order.status)}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography variant="body2">
                  {formatDate(order.updatedAt || order.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} variant="outlined" sx={{ mb: 4 }}>
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
              {order.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: 80, height: 80, position: 'relative' }}>
                        <Image
                          src={item.image || '/placeholder-product.jpg'}
                          alt={item.name}
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </Box>
                      <Box>
                        <Typography variant="body1">{item.name}</Typography>
                        {item.category && (
                          <Typography variant="body2" color="text.secondary">
                            {item.category}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    ₹{item.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    {item.quantity}
                  </TableCell>
                  <TableCell align="right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell rowSpan={3} colSpan={2} />
                <TableCell colSpan={1}>
                  <Typography variant="subtitle2">Subtotal</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>₹{order.total.toFixed(2)}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                  <Typography variant="subtitle2">Shipping</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>Free</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}>
                  <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle1" fontWeight="bold">
                    ₹{order.total.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button 
          variant="outlined" 
          onClick={() => router.push('/orders')}
        >
          Back to Orders
        </Button>
        {order.status.toLowerCase() !== 'cancelled' && (
          <Button 
            variant="contained" 
            color="error"
            // Add cancel order functionality here
          >
            Cancel Order
          </Button>
        )}
      </Box>
    </Container>
  );
}
