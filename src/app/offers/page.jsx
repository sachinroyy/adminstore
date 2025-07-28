"use client";
import { Container, Typography, Box, Card, CardContent, CardMedia, Grid, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const dummyOffers = [
  {
    name: 'Aashirvaad Atta',
    category: 'Grocery',
    price: 299,
    offer: '10% OFF',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Tata Salt',
    category: 'Grocery',
    price: 25,
    offer: '5% OFF',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Haldiram Namkeen',
    category: 'Namkeen',
    price: 80,
    offer: '15% OFF',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Bikaji Bhujia',
    category: 'Namkeen',
    price: 60,
    offer: '12% OFF',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Cadbury Dairy Milk',
    category: 'Chocolate',
    price: 45,
    offer: '8% OFF',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Nestle KitKat',
    category: 'Chocolate',
    price: 35,
    offer: '7% OFF',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Parle-G Biscuits',
    category: 'Grocery',
    price: 10,
    offer: '20% OFF',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Lay’s Chips',
    category: 'Namkeen',
    price: 20,
    offer: '10% OFF',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Amul Dark Chocolate',
    category: 'Chocolate',
    price: 99,
    offer: '18% OFF',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Sunfeast Yippee Noodles',
    category: 'Grocery',
    price: 45,
    offer: '10% OFF',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Amul Dark Chocolate',
    category: 'Chocolate',
    price: 99,
    offer: '18% OFF',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Sunfeast Yippee Noodles',
    category: 'Grocery',
    price: 45,
    offer: '10% OFF',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80',
  },
];

export default function OffersPage() {
  const router = useRouter();
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" align="center" fontWeight={700} mb={4} color="black">
          Exclusive Offers on Grocery, Namkeen & Chocolates
        </Typography>
        <Grid container spacing={4}>
          {dummyOffers.map((item, idx) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
              <Card sx={{ height: 300, width: 250, mx: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3, bgcolor: 'white', borderRadius: 3, overflow: 'hidden' }}>
  {/* Image: 60% of card height */}
  <Box sx={{ flex: '0 0 50%', height: '60%' }}>
    <CardMedia
      component="img"
      image={item.image}
      alt={item.name}
      sx={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
    />
  </Box>
  {/* Text: 20% of card height */}
  <Box sx={{ flex: '0 0 20%', height: '20%', px: 2, py: 0.5, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Typography variant="h6" fontWeight={600} color="black" noWrap>{item.name}</Typography>
    <Typography variant="body2" color="black" noWrap>Category: {item.category}</Typography>
  </Box>
  {/* Price & Offer: 10% of card height */}
  <Box sx={{ flex: '0 0 10%', height: '10%', px: 2, py: 0.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <Typography variant="body1" fontWeight={500} color="black">₹{item.price}</Typography>
    <Typography variant="body2" color="black" fontWeight={600}>{item.offer}</Typography>
  </Box>
  {/* Shop Now Button: remaining space */}
  <Box sx={{ flex: '1 1 0', p: 1, pt: 0, display: 'flex', alignItems: 'flex-end' }}>
    <Button fullWidth variant="contained" sx={{ bgcolor: 'black', color: 'white', fontWeight: 600, ':hover': { bgcolor: '#222', color: 'white' } }} onClick={() => router.push('/')}>Shop Now</Button>
  </Box>
</Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}