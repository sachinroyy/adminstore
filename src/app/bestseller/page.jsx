"use client";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Chip, Button, Box } from '@mui/material';

const products = [
  {
    name: 'Golden Blossom Honey',
    price: '₹399',
    image: '/images/01.png',
  },
  {
    name: 'Royal Basmati Rice 1kg',
    price: '₹249',
    image: '/images/02.jpeg',
  },
  {
    name: 'Sparkling Citrus Cooler',
    price: '₹199',
    image: '/images/03.jpg',
  },
  {
    name: 'UltraClean Harpic Liquid',
    price: '₹299',
    image: '/images/o4.png',
  },
  {
    name: 'Premium Cola Classic',
    price: '₹499',
    image: '/images/05.png',
  },
  {
    name: 'Amul Gourmet Butter 100g',
    price: '₹179',
    image: '/images/06.jpg',
  },
];

export default function BestsellerPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" fontWeight={700} align="center" sx={{ mb: 3, fontFamily: 'Poppins, Arial, sans-serif' ,color: '#1a1a1a'}}>
        Bestsellers
      </Typography>
      <Typography align="center" color="text.secondary" sx={{ mb: 5 }}>
        Discover our most popular products, loved by thousands of customers!
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, idx) => (
          <Grid item  xs={12} sm={6} md={3} lg={2}  key={idx}>
            <Card sx={{ width: 350, height: 400, p: 2, boxShadow: 3, borderRadius: 3, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 8 } }}>
              <Box sx={{ position: 'absolute', top: 18, left: 20, zIndex: 2 }}>
                <Chip label="Bestseller" color="warning" size="small" sx={{ fontWeight: 700 }} />
              </Box>
              <CardMedia
  component="img"
  image={product.image}
  alt={product.name}    
  sx={{ width: 200, height: 180, objectFit: 'cover', borderRadius: 2, mb: 1, mt: 2, boxShadow: 2 }}
  onError={e => { e.target.src = 'https://via.placeholder.com/220x180?text=Product'; }}
/>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                  {product.name}
                </Typography>
                <Typography color="primary" fontWeight={700} sx={{ mb: 1 }}>
                  {product.price}
                </Typography>
              </CardContent>
              <Button variant="contained" color="success" fullWidth sx={{ mt: 1, fontWeight: 600 }}>
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
