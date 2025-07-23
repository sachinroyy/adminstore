'use client';

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Container, 
  Divider, 
  Grid, 
  Typography, 
  CircularProgress,
  Alert,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push('/'); // Redirect to home page after sign in
    }
  }, [status, router]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signIn('google', { 
        callbackUrl: '/',
        redirect: false 
      });
      
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during sign in');
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (status === "loading") {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            background: 'linear-gradient(to bottom right, #ffffff, #f5f5f5)'
          }}
        >
          <Box 
            component="img"
            src="/logo.svg" 
            alt="Logo" 
            sx={{ 
              height: 60, 
              width: 'auto',
              mb: 2 
            }} 
          />
          
          <Typography component="h1" variant="h4" sx={{ 
            fontWeight: 700,
            mb: 1,
            background: 'linear-gradient(45deg, #1976d2, #00bcd4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Welcome Back
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to continue to your account
          </Typography>
          
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
              {error}
            </Alert>
          )}
          
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <GoogleIcon />}
            sx={{
              py: 1.5,
              mb: 3,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
              textTransform: 'none',
              fontSize: '1rem',
              borderRadius: 2
            }}
          >
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>
          
          <Divider sx={{ width: '100%', mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or
            </Typography>
          </Divider>
          
          <Typography 
            variant="body2" 
            color="text.secondary" 
            align="center"
            sx={{ mt: 2, fontSize: '0.75rem' }}
          >
            By continuing, you agree to our{' '}
            <Typography 
              component="span" 
              color="primary"
              sx={{ 
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' } 
              }}
            >
              Terms of Service
            </Typography>{' '}
            and{' '}
            <Typography 
              component="span" 
              color="primary"
              sx={{ 
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' } 
              }}
            >
              Privacy Policy
            </Typography>
          </Typography>
        </Paper>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Typography 
              component="span" 
              color="primary" 
              sx={{ 
                cursor: 'pointer',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' } 
              }}
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}