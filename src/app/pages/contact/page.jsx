"use client";
import { Container, Typography, Box, Button, Grid, Card, CardContent, TextField, Divider, IconButton, Stack } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from 'react';

export default function ContactPage() {
  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Box sx={{ background: '#fff', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="caption" color="text.secondary" align="center" sx={{ mb: 1, display: 'block' }}>
  We're here to help, 24/7
</Typography>
<Typography variant="h2" align="center" fontWeight={700} sx={{ color: 'black', mb: 1, fontSize: { xs: '2.2rem', md: '2.8rem' } }}>
  Reach JinStore Support
</Typography>
<Typography align="center" sx={{ color: 'black', mb: 4 }}>
  Got a question, need help with an order, or want to share feedback? Our friendly support team is just a message away. We love hearing from our customers and making your shopping experience seamless!
</Typography>
        <Divider sx={{ mb: 4 }} />
        <Grid container spacing={4}>
          {/* Left: Offices Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight={700} sx={{ color: 'black', mb: 1 }}>Global Support, Local Touch</Typography>
<Typography color="text.secondary" sx={{ mb: 2, fontSize: 14 }}>
  Whether you're shopping from New York, Munich, or anywhere in the world, our support team is ready to assist you. Visit us, call, or email—your satisfaction is our top priority!
</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mb: 1 }}>
                  <LocationOnIcon fontSize="small" color="primary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">United States</Typography>
<Typography fontWeight={600}>JinStore HQ</Typography>
<Typography color="text.secondary" fontSize={13}>205 Middle Road, 2nd Floor, New York, NY 10016</Typography>
<Typography fontWeight={700} sx={{ mt: 1 }}>+1 (555) 123-4567</Typography>
<Typography color="primary" fontSize={13}>support@jinstore.com</Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mb: 1 }}>
                  <LocationOnIcon fontSize="small" color="primary" />
                  <Box>
                    <Typography variant="caption" color="text.secondary">Germany</Typography>
<Typography fontWeight={600}>JinStore Europe</Typography>
<Typography color="text.secondary" fontSize={13}>Leopoldstraße 50, 80802 Munich, Germany</Typography>
<Typography fontWeight={700} sx={{ mt: 1 }}>+49 89 123456</Typography>
<Typography color="primary" fontSize={13}>europe@jinstore.com</Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography color="text.secondary" fontSize={13}>
                Follow us:
                <IconButton size="small" color="primary"><FacebookIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="primary"><TwitterIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="primary"><InstagramIcon fontSize="small" /></IconButton>
                <IconButton size="small" color="primary"><LinkedInIcon fontSize="small" /></IconButton>
              </Typography>
            </Box>
          </Grid>
          {/* Right: Contact Form */}
          <Grid item xs={12} md={6}>
  <Card elevation={3} sx={{ p: 3 }}>
    <Typography color="text.secondary" sx={{ fontSize: 14, mb: 2 }}>
  Fill out the form below and our support heroes will get back to you within 24 hours. For urgent queries, try our live chat or call us directly!
</Typography>
    <form>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField label="Your name *" name="name" value={form.name} onChange={handleChange} fullWidth size="small" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Your email *" name="email" value={form.email} onChange={handleChange} fullWidth size="small" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Subject *" name="subject" value={form.subject} onChange={handleChange} fullWidth size="small" />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Your message" name="message" value={form.message} onChange={handleChange} fullWidth multiline minRows={4} size="small" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="secondary" sx={{ minWidth: 140 }}>
            Send Message
          </Button>
        </Grid>
      </Grid>
    </form>
  </Card>
</Grid>
        </Grid>
        {/* Feature Row */}
        <Grid container spacing={2} sx={{ mt: 6 }}>
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <LocalShippingIcon color="primary" fontSize="large" />
              <Box>
                <Typography fontWeight={700} fontSize={15}>Payment only online</Typography>
                <Typography color="text.secondary" fontSize={12}>Tasiğforsamhet betenedeesign. Mobile checkout. Yrig karltorpa.</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <NewReleasesIcon color="warning" fontSize="large" />
              <Box>
                <Typography fontWeight={700} fontSize={15}>New stocks and sales</Typography>
                <Typography color="text.secondary" fontSize={12}>Tasiğforsamhet betenedeesign. Mobile checkout. Yrig karltorpa.</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <VerifiedIcon color="success" fontSize="large" />
              <Box>
                <Typography fontWeight={700} fontSize={15}>Quality assurance</Typography>
                <Typography color="text.secondary" fontSize={12}>Tasiğforsamhet betenedeesign. Mobile checkout. Yrig karltorpa.</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <AccessTimeIcon color="secondary" fontSize="large" />
              <Box>
                <Typography fontWeight={700} fontSize={15}>Delivery from 1 hour</Typography>
                <Typography color="text.secondary" fontSize={12}>Tasiğforsamhet betenedeesign. Mobile checkout. Yrig karltorpa.</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}