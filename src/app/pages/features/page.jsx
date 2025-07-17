"use client";
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const features = [
  {
    icon: <LocalShippingIcon fontSize="large" color="primary" />,
    title: "Fast Delivery",
    description: "Quick and reliable shipping to your doorstep."
  },
  {
    icon: <SecurityIcon fontSize="large" color="primary" />,
    title: "Secure Payments",
    description: "100% secure payment processing."
  },
  {
    icon: <PaymentIcon fontSize="large" color="primary" />,
    title: "Easy Returns",
    description: "Hassle-free return policy."
  },
  {
    icon: <SupportAgentIcon fontSize="large" color="primary" />,
    title: "24/7 Support",
    description: "Round-the-clock customer service."
  }
];

export default function FeaturesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Our Features
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, textAlign: 'center' }}>
              <Box sx={{ my: 2 }}>
                {feature.icon}
              </Box>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
