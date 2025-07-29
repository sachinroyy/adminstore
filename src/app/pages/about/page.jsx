"use client";
import { Container, Typography, Box, Button, keyframes, Grid, Paper, Stack, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import TimelineIcon from '@mui/icons-material/Timeline';
import FlagIcon from '@mui/icons-material/Flag';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import StoreIcon from '@mui/icons-material/Store';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

// Pulsing animation
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleButtonClick = () => {
    router.push('/');
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
        p: 4
      }}
    >
      <Container maxWidth="md">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
        >
          {/* 1. Brand Introduction */}
<motion.div variants={item}>
  <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, textAlign: 'center', background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)' }}>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={2}>
      <StoreIcon sx={{ fontSize: 48, color: '#1976d2' }} />
      <Typography
        variant="h1"
        component="h1"
        sx={{
          fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
          fontWeight: 900,
          background: 'linear-gradient(45deg, #6a11cb 30%, #2575fc 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        JinStore
      </Typography>
    </Stack>
    <Typography
      variant="h5"
      component="h2"
      sx={{
        color: 'text.secondary',
        mb: 1,
        fontWeight: 400
      }}
    >
      India’s trusted online store for premium electronics, gadgets, and lifestyle accessories.
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
      Based in Delhi, delivering across India.
    </Typography>
  </Paper>
</motion.div>

{/* 2. Brand Story / Journey */}
<motion.div variants={item}>
  <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, background: 'linear-gradient(90deg, #f3e5f5 0%, #e1f5fe 100%)' }}>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
      <TimelineIcon sx={{ color: '#ab47bc', fontSize: 32 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2575fc' }}>
        Our Journey
      </Typography>
    </Stack>
    <Typography variant="body1" sx={{ maxWidth: '700px', mx: 'auto', color: 'text.secondary', textAlign: 'center' }}>
      Born in 2020 from a tiny Delhi warehouse and a big dream, JinStore started with just 50 products. Fueled by passion and customer love, we’ve grown to thousands of items and nationwide delivery. From late-night packing to our first 1,000 orders, every milestone is a story of resilience and innovation.
    </Typography>
    <Stack direction="row" justifyContent="center" spacing={2} mt={2}>
      <Tooltip title="Founded in 2020"><Typography variant="caption" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}><FlagIcon sx={{ mr: 0.5, fontSize: 18 }} />2020</Typography></Tooltip>
      <Tooltip title="10K Customers"><Typography variant="caption" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}><GroupIcon sx={{ mr: 0.5, fontSize: 18 }} />2021</Typography></Tooltip>
      <Tooltip title="Pan-India Delivery"><Typography variant="caption" sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}><LocalOfferIcon sx={{ mr: 0.5, fontSize: 18 }} />2023</Typography></Tooltip>
    </Stack>
  </Paper>
</motion.div>

{/* 3. Mission & Vision */}
<motion.div variants={item}>
  <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, background: 'linear-gradient(90deg, #e0f7fa 0%, #fce4ec 100%)' }}>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
      <InfoIcon sx={{ color: '#0288d1', fontSize: 32 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2575fc' }}>
        Mission & Vision
      </Typography>
    </Stack>
    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1, textAlign: 'center' }}>
      <strong>Mission:</strong> To make quality products affordable for everyone.
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary', textAlign: 'center' }}>
      <strong>Vision:</strong> To be the most trusted online marketplace in Asia.
    </Typography>
  </Paper>
</motion.div>

{/* 4. Core Values */}
<motion.div variants={item}>
  <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, background: 'linear-gradient(90deg, #fffde7 0%, #f3e5f5 100%)' }}>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
      <StarIcon sx={{ color: '#ffd600', fontSize: 32 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2575fc' }}>
        Our Core Values
      </Typography>
    </Stack>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><ThumbUpAltIcon color="primary" /><Typography fontWeight={600}>Customer First</Typography></Stack>
        <Typography variant="body2" color="text.secondary">We listen and respond to your needs.</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><VerifiedIcon color="success" /><Typography fontWeight={600}>Quality Always</Typography></Stack>
        <Typography variant="body2" color="text.secondary">Only the best products make it to your cart.</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><LocalOfferIcon color="secondary" /><Typography fontWeight={600}>Eco-Friendly</Typography></Stack>
        <Typography variant="body2" color="text.secondary">We choose sustainable packaging.</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><TimelineIcon color="info" /><Typography fontWeight={600}>Innovation</Typography></Stack>
        <Typography variant="body2" color="text.secondary">We embrace new ideas and technology.</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><FlagIcon color="warning" /><Typography fontWeight={600}>Integrity</Typography></Stack>
        <Typography variant="body2" color="text.secondary">Honesty in every transaction.</Typography>
      </Grid>
    </Grid>
  </Paper>
</motion.div>

{/* 5. Product/Service Highlights */}
<motion.div variants={item}>
  <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, background: 'linear-gradient(90deg, #e1f5fe 0%, #fffde7 100%)' }}>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
      <ShoppingCartIcon sx={{ color: '#1976d2', fontSize: 32 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2575fc' }}>
        Why Shop With Us?
      </Typography>
    </Stack>
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><VerifiedIcon color="success" /><Typography fontWeight={600}>Authentic Products</Typography></Stack>
        <Typography variant="body2" color="text.secondary">Direct from verified manufacturers.</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><LocalOfferIcon color="secondary" /><Typography fontWeight={600}>Best Prices</Typography></Stack>
        <Typography variant="body2" color="text.secondary">No middlemen, only great deals.</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><SupportAgentIcon color="primary" /><Typography fontWeight={600}>24/7 Support</Typography></Stack>
        <Typography variant="body2" color="text.secondary">Always here for you.</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><EmojiEventsIcon color="warning" /><Typography fontWeight={600}>Free Returns</Typography></Stack>
        <Typography variant="body2" color="text.secondary">Shop risk-free, hassle-free.</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><TimelineIcon color="info" /><Typography fontWeight={600}>Fast Shipping</Typography></Stack>
        <Typography variant="body2" color="text.secondary">24-hour dispatch guarantee.</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><StarIcon color="warning" /><Typography fontWeight={600}>Handpicked Quality</Typography></Stack>
        <Typography variant="body2" color="text.secondary">Every item chosen for you.</Typography>
      </Grid>
    </Grid>
  </Paper>
</motion.div>

{/* 6. Achievements / Recognition */}
<motion.div variants={item}>
  <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, background: 'linear-gradient(90deg, #fce4ec 0%, #e0f7fa 100%)' }}>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
      <EmojiEventsIcon sx={{ color: '#fbc02d', fontSize: 32 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2575fc' }}>
        Achievements
      </Typography>
    </Stack>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><StarIcon color="warning" /><Typography fontWeight={600}>4.9/5 Rating</Typography></Stack>
        <Typography variant="body2" color="text.secondary">By 50,000+ happy customers</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><VerifiedIcon color="success" /><Typography fontWeight={600}>Media Features</Typography></Stack>
        <Typography variant="body2" color="text.secondary">TechIndia, Delhi Times, StartUp Asia</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Stack direction="row" alignItems="center" spacing={1}><EmojiEventsIcon color="warning" /><Typography fontWeight={600}>Award Winner</Typography></Stack>
        <Typography variant="body2" color="text.secondary">2024 Customer Delight Award</Typography>
      </Grid>
    </Grid>
  </Paper>
</motion.div>

{/* 7. Social Proof */}
<motion.div variants={item}>
  <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, background: 'linear-gradient(90deg, #e3f2fd 0%, #fce4ec 100%)' }}>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
      <ThumbUpAltIcon sx={{ color: '#1976d2', fontSize: 32 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2575fc' }}>
        What Our Customers Say
      </Typography>
    </Stack>
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, background: '#fff' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
            "JinStore delivers quality and speed!"<br /><b>– Priya S.</b>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, background: '#fff' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
            "Best prices and amazing support."<br /><b>– Rahul K.</b>
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, background: '#fff' }}>
          <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
            Over 90% of our customers recommend us to friends.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Paper>
</motion.div>

{/* 8. Team Introduction */}
<motion.div variants={item}>
  <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, background: 'linear-gradient(90deg, #f3e5f5 0%, #e1f5fe 100%)' }}>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
      <GroupIcon sx={{ color: '#7b1fa2', fontSize: 32 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2575fc' }}>
        Meet Our Team
      </Typography>
    </Stack>
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} sm={4}>
        <Paper elevation={1} sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
          <Box sx={{ bgcolor: '#2196F3', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 24, mx: 'auto', mb: 1 }}>SJ</Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Samar Jain</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Founder & CEO<br />Dreamer, doer, and tech enthusiast.</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={1} sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
          <Box sx={{ bgcolor: '#21CBF3', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 24, mx: 'auto', mb: 1 }}>AK</Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Anita Kapoor</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Head of Operations<br />Ensuring smooth deliveries, every time.</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper elevation={1} sx={{ p: 2, borderRadius: 2, textAlign: 'center' }}>
          <Box sx={{ bgcolor: '#FF9800', color: 'white', borderRadius: '50%', width: 56, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 24, mx: 'auto', mb: 1 }}>RK</Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Rohit Khanna</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Tech Lead<br />Building the future of ecommerce.</Typography>
        </Paper>
      </Grid>
    </Grid>
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 2, textAlign: 'center' }}>
      Our team of 15 works tirelessly to source the best products for you.
    </Typography>
  </Paper>
</motion.div>

{/* 9. Contact / Support Info */}
<motion.div variants={item}>
  <Paper elevation={2} sx={{ width: '100%', p: { xs: 2, md: 4 }, mb: 4, borderRadius: 4, background: 'linear-gradient(90deg, #e1f5fe 0%, #fce4ec 100%)' }}>
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} mb={1}>
      <EmailIcon sx={{ color: '#0288d1', fontSize: 32 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#2575fc' }}>
        Contact & Support
      </Typography>
    </Stack>
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" spacing={2} mb={2}>
      <Stack direction="row" alignItems="center" spacing={1}><EmailIcon color="primary" /><Typography variant="body1" sx={{ color: 'text.secondary' }}>support@jin-store.com</Typography></Stack>
      <Stack direction="row" alignItems="center" spacing={1}><SupportAgentIcon color="secondary" /><Typography variant="body1" sx={{ color: 'text.secondary' }}>+91 9876543210</Typography></Stack>
    </Stack>
    <Button
      variant="outlined"
      color="primary"
      href="/contact"
      sx={{ mt: 1, px: 4, fontWeight: 600 }}
      startIcon={<SupportAgentIcon />}
    >
      Contact Us
    </Button>
  </Paper>
 </motion.div>

{/* 10. Call to Action (CTA) */}
<motion.div variants={item}>
  <Box sx={{ textAlign: 'center', mt: 6, mb: 2 }}>
    <Button
      variant="contained"
      color="primary"
      size="large"
      href="/products"
      sx={{ px: 5, py: 1.7, fontSize: '1.2rem', borderRadius: '10px', fontWeight: 700, boxShadow: '0 6px 20px rgba(33, 203, 243, 0.15)' }}
    >
      Discover Our Latest Collection — Shop Now!
    </Button>
  </Box>
</motion.div>

          <motion.div variants={item}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                mt: 6
              }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  onClick={handleButtonClick}
                  component={motion.button}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Back to Home
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="large"
                  onClick={handleButtonClick}
                  component={motion.button}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    textTransform: 'none',
                    borderRadius: '8px',
                    fontWeight: 600,
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Back to Home
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
}
