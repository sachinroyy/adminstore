"use client";
import { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Stepper, Step, StepLabel } from '@mui/material';

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);
  
  const steps = [
    'Order Placed',
    'Order Confirmed',
    'Processing',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const handleTrackOrder = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here to get the order status
    setOrderStatus(2); // Simulating order status: Processing
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Track Your Order
      </Typography>
      
      <Box component={Paper} elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Enter your order number
        </Typography>
        <Box component="form" onSubmit={handleTrackOrder} sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            size="large"
          >
            Track
          </Button>
        </Box>

        {orderStatus !== null && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Order Status
            </Typography>
            <Stepper activeStep={orderStatus} alternativeLabel sx={{ mt: 3 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
      </Box>
    </Container>
  );
}
