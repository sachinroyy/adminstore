"use client";

import { Box, Stack, Button, Typography } from "@mui/material";
import Image from "next/image";

const ImageRowMUI = () => {
  return (
    <Box sx={{ maxWidth: { xs: '100%', lg: 1200, xl: 1850 }, width: '100%', px: { xs: 3, sm: 2, md: 3 }, mx: 'auto', py: { xs: 2, md: 3 } }}>
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={{ xs: 3, md: 3 }}
        justifyContent="space-between" 
        alignItems="stretch"
        sx={{ width: '100%' }}
      >
        <Box sx={{ 
          width: { xs: '100%', md: '32%' }, 
          position: 'relative',
          mb: { xs: 2, md: 0 },
          '&:last-child': {
            mb: 0
          }
        }}>
          <Image
            src="/images/banner-12.png"
            alt="Image 1"
            width={500}
            height={200}
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            priority
          />
          <Box className="overlay" sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: {
              xs: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
              sm: 'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%)',
              md: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)'
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderRadius: 8,
            opacity: 1,
            transition: 'opacity 0.3s ease',
            color: 'white',
            p: { xs: 2, sm: 2.5, md: 3 },
            textAlign: 'left'
          }}>
            <Typography variant={{ xs: 'h6', sm: 'h5', md: 'h5' }} sx={{ 
              mb: 1, 
              fontWeight: 'bold', 
              textTransform: 'uppercase',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
            }}>
              Summer Sale
            </Typography>
            <Typography variant={{ xs: 'h5', sm: 'h4', md: 'h4' }} sx={{ 
              mb: 2, 
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' }
            }}>
              Up to 50% Off
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: { xs: 2, md: 3 }, 
              maxWidth: { xs: '100%', md: '70%' },
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
            }}>
              On selected items. Limited time offer!
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                py: { xs: 0.5, sm: 1 },
                px: { xs: 1, sm: 2 }
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
        <Box sx={{ 
          width: { xs: '100%', md: '32%' }, 
          position: 'relative',
          mb: { xs: 2, md: 0 },
          '&:last-child': {
            mb: 0
          }
        }}>
          <Image
            src="/images/banner-13.png"
            alt="Image 2"
            width={500}
            height={200}
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            priority
          />
          <Box className="overlay" sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: {
              xs: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
              sm: 'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%)',
              md: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)'
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderRadius: 8,
            opacity: 1,
            transition: 'opacity 0.3s ease',
            color: 'white',
            p: { xs: 2, sm: 2.5, md: 3 },
            textAlign: 'left'
          }}>
            <Typography variant={{ xs: 'h6', sm: 'h5', md: 'h5' }} sx={{ 
              mb: 1, 
              fontWeight: 'bold', 
              textTransform: 'uppercase',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
            }}>
              New Collection
            </Typography>
            <Typography variant={{ xs: 'h5', sm: 'h4', md: 'h4' }} sx={{ 
              mb: 2, 
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' }
            }}>
              2025 Trends
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: { xs: 2, md: 3 }, 
              maxWidth: { xs: '100%', md: '70%' },
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
            }}>
              Discover the latest fashion trends this season
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                py: { xs: 0.5, sm: 1 },
                px: { xs: 1, sm: 2 }
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
        <Box sx={{ 
          width: { xs: '100%', md: '32%' }, 
          position: 'relative',
          mb: { xs: 2, md: 0 },
          '&:last-child': {
            mb: 0
          }
        }}>
          <Image
            src="/images/banner-14.png"
            alt="Image 3"
            width={500}
            height={200}
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            priority
          />
          <Box className="overlay" sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: {
              xs: 'linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)',
              sm: 'linear-gradient(90deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 100%)',
              md: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)'
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderRadius: 8,
            opacity: 1,
            transition: 'opacity 0.3s ease',
            color: 'white',
            p: { xs: 2, sm: 2.5, md: 3 },
            textAlign: 'left'
          }}>
            <Typography variant={{ xs: 'h6', sm: 'h5', md: 'h5' }} sx={{ 
              mb: 1, 
              fontWeight: 'bold', 
              textTransform: 'uppercase',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
            }}>
              Flash Sale
            </Typography>
            <Typography variant={{ xs: 'h5', sm: 'h4', md: 'h4' }} sx={{ 
              mb: 2, 
              fontWeight: 'bold',
              fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.75rem' }
            }}>
              Ending Soon
            </Typography>
            <Typography variant="body1" sx={{ 
              mb: { xs: 2, md: 3 }, 
              maxWidth: { xs: '100%', md: '70%' },
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
            }}>
              Hurry! Limited stock available
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
                py: { xs: 0.5, sm: 1 },
                px: { xs: 1, sm: 2 }
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ImageRowMUI;
