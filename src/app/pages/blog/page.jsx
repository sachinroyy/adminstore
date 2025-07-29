"use client";
import { Container, Typography, Box, Button, keyframes } from '@mui/material';
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

import { Grid, Card, CardMedia, CardContent, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function BlogPage() {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleButtonClick = () => {
    router.push('/');
  };

  return (
    <Box sx={{ background: '#fff', minHeight: '130vh', p: { xs: 1, md: 4 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left: Main Blog Post */}
          <Grid item xs={12} md={8}>
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                image="/images/05.png"
                alt="Blog Main"
                sx={{ width: '100%', height: 480, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="overline" color="secondary" sx={{ mb: 1 }}>Uncategorized</Typography>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  How grocers are approaching delivery as the market evolves
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Avatar src="/images/JinStore.png" sx={{ width: 28, height: 28 }} />
                  <Typography variant="body2" color="text.secondary">November 3, 2023 &nbsp;•&nbsp; Kbtheme, store, themeforest</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Blimåvakt teskade inibel den mobilmisbruk deren jön nödning osk heteroski id rel ultran. Fällses tunekösa och tenör servicebarn nya om än muren för flönde slivj i vobba, och hyng samt esami, plåheten. Polytesram inat orca och pali förmiytheten, tulogi efbesam ologi renat, i tiss gönivis. Supraskop preblig får att psykolog geon sper.
                </Typography>
                <Button variant="contained" color="secondary" sx={{ mt: 2, px: 4, fontWeight: 600 }} onClick={() => setShowMoreInfo(!showMoreInfo)}>
                  {showMoreInfo ? 'Show Less' : 'Read More'}
                </Button>
                {showMoreInfo && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>Market Trends & Insights</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      The grocery delivery landscape is rapidly evolving with new technologies and changing consumer behaviors. Retailers are leveraging AI, data analytics, and last-mile logistics to improve efficiency and customer satisfaction. Partnerships with local producers and eco-friendly packaging are also on the rise.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Looking ahead, the integration of drone delivery, smart inventory management, and personalized shopping experiences will further transform the market. Staying agile and customer-focused will be key to success in this dynamic environment.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
            <Card elevation={3} sx={{ mb: 3 }}>
              <CardMedia
                component="img"
                image="/images/o4.png"
                alt="Blog Main"
                sx={{ width: '100%', height: 480, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="overline" color="secondary" sx={{ mb: 1 }}>Uncategorized</Typography>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  How grocers are approaching delivery as the market evolves
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Avatar src="/images/JinStore.png" sx={{ width: 28, height: 28 }} />
                  <Typography variant="body2" color="text.secondary">November 3, 2023 &nbsp;•&nbsp; Kbtheme, store, themeforest</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Blimåvakt teskade inibel den mobilmisbruk deren jön nödning osk heteroski id rel ultran. Fällses tunekösa och tenör servicebarn nya om än muren för flönde slivj i vobba, och hyng samt esami, plåheten. Polytesram inat orca och pali förmiytheten, tulogi efbesam ologi renat, i tiss gönivis. Supraskop preblig får att psykolog geon sper.
                </Typography>
                <Button variant="contained" color="secondary" sx={{ mt: 2, px: 4, fontWeight: 600 }} onClick={() => setShowMoreInfo(!showMoreInfo)}>
                  {showMoreInfo ? 'Show Less' : 'Read More'}
                </Button>
                {showMoreInfo && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>Market Trends & Insights</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      The grocery delivery landscape is rapidly evolving with new technologies and changing consumer behaviors. Retailers are leveraging AI, data analytics, and last-mile logistics to improve efficiency and customer satisfaction. Partnerships with local producers and eco-friendly packaging are also on the rise.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Looking ahead, the integration of drone delivery, smart inventory management, and personalized shopping experiences will further transform the market. Staying agile and customer-focused will be key to success in this dynamic environment.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Right: Sidebar */}
          <Grid item xs={12} md={4}>
            {/* Blog Post List */}
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Blog Post List</Typography>
            <List>
              {[
                {
                  title: 'How grocers are approaching delivery as the market evolves',
                  date: 'November 3, 2023',
                  img: '/images/blog01.png'
                },
                {
                  title: 'The Friday Checkout: Food insecurity keeps retailers off balance',
                  date: 'November 3, 2023',
                  img: '/images/banner-13.png'
                },
                {
                  title: 'Consumer want grocer to use AI to help them save money Dunnhumby',
                  date: 'November 3, 2023',
                  img: '/images/banner-14.png'
                },
                {
                  title: 'Order up! How grocers are replicating the restaurant experience in retail',
                  date: 'November 3, 2023',
                  img: '/images/adsslider.png'
                }
              ].map((post, idx) => (
                <ListItem alignItems="flex-start" key={idx} sx={{ pb: 1 }}>
                  <ListItemAvatar>
                    <Avatar src={post.img} variant="rounded" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="subtitle2" fontWeight={600}>{post.title}</Typography>}
                    secondary={<Typography variant="caption" color="text.secondary">{post.date}</Typography>}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 3 }} />

            {/* Social Media Widget */}
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Social Media Widget</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button startIcon={<FacebookIcon />} variant="contained" sx={{ background: '#1877f3', color: '#fff', textTransform: 'none' }}>facebook</Button>
              <Button startIcon={<TwitterIcon />} variant="contained" sx={{ background: '#1da1f2', color: '#fff', textTransform: 'none' }}>twitter</Button>
              <Button startIcon={<InstagramIcon />} variant="contained" sx={{ background: '#e1306c', color: '#fff', textTransform: 'none' }}>instagram</Button>
              <Button startIcon={<LinkedInIcon />} variant="contained" sx={{ background: '#0077b5', color: '#fff', textTransform: 'none' }}>linkedin</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}       