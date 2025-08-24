"use client";
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import LockIcon from '@mui/icons-material/Lock';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function FeaturesPage() {
  const features = [
    {
      icon: <LocalShippingIcon color="primary" sx={{ fontSize: 48 }} />,
      title: 'Free Shipping',
      desc: 'Free shipping on all orders above ₹999',
    },
    {
      icon: <AutorenewIcon color="warning" sx={{ fontSize: 48 }} />,
      title: 'Easy Returns',
      desc: '7-Day hassle-free returns',
    },
    {
      icon: <LockIcon color="success" sx={{ fontSize: 48 }} />,
      title: 'Secure Payments',
      desc: '100% secure & encrypted payment system',
    },
    {
      icon: <SupportAgentIcon color="secondary" sx={{ fontSize: 48 }} />,
      title: '24/7 Support',
      desc: 'Always here to help anytime',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, idx) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card
              sx={{
                width: { xs: 390, sm: 'auto' },
                maxWidth: { xs: '100%', sm: 'none' },
                height: 'auto',
                p: 3,
                textAlign: 'center',
                boxShadow: 3,
                borderRadius: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-8px)', boxShadow: 8 },
              }}
            >
              <Box sx={{ mb: 1 }}>{feature.icon}</Box>
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary" fontSize={15}>
                  {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
