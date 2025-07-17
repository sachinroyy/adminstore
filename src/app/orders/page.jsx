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
  useTheme,
  CircularProgress
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) return;
      
      try {
        const response = await fetch('/api/orders');
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (!session) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Please sign in to view your orders
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/auth/signin?callbackUrl=/orders')}
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

  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          You haven't placed any orders yet
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => router.push('/products')}
          sx={{ mt: 2 }}
        >
          Start Shopping
        </Button>
      </Container>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Orders
      </Typography>
      
      {orders.map((order) => (
        <Paper key={order._id} elevation={0} variant="outlined" sx={{ mb: 4, overflow: 'hidden' }}>
          <Box sx={{ p: 3, bgcolor: 'background.default' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1">
                Order #{order._id.slice(-6).toUpperCase()}
              </Typography>
              <Box>
                <Chip 
                  label={order.status}
                  color={getStatusColor(order.status)}
                  size="small"
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
              <Typography variant="subtitle2">
                Total: ₹{order.total.toFixed(2)}
              </Typography>
            </Box>
          </Box>
          
          <Divider />
          
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
                        <Box sx={{ width: 60, height: 60, position: 'relative' }}>
                          <Image
                            src={item.image || '/placeholder-product.jpg'}
                            alt={item.name}
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </Box>
                        <Typography variant="body2">{item.name}</Typography>
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
              </TableBody>
            </Table>
          </TableContainer>
          
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', bgcolor: 'background.default' }}>
            <Button 
              variant="outlined" 
              size="small"
              onClick={() => router.push(`/orders/${order._id}`)}
            >
              View Details
            </Button>
          </Box>
        </Paper>
      ))}
    </Container>
  );
}
