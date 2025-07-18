
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
  Paper,
  Alert,
  Stack,
  Divider,
} from "@mui/material";


import Image from 'next/image'; // For Google icon

function SignInContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'OAuthAccountNotLinked') {
      setError('This email is already registered with a different provider.');
    } else if (errorParam) {
      setError('An error occurred during sign in. Please try again.');
    }
  }, [searchParams]);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      setError('');
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      console.error(err);
      setError('Failed to sign in. Please try again.');
      setIsLoading(false);
    }
  };

  if (status === 'loading' || status === 'authenticated') {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'grey.100',
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <CircularProgress />
          <Typography variant="body1" color="text.secondary">
            Loading...
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 10 }}>
      <Paper elevation={4} sx={{ p: 5, borderRadius: 3 }}>
        <Stack spacing={3} alignItems="center">
          <Avatar
            sx={{ bgcolor: 'primary.main', width: 64, height: 64, fontSize: 32 }}
          >
            👋
          </Avatar>

          <Box textAlign="center">
            <Typography variant="h4" fontWeight={600}>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Sign in to your account to continue
            </Typography>
          </Box>

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            fullWidth
            variant="outlined"
            onClick={handleSignIn}
            disabled={isLoading}
            sx={{
              textTransform: 'none',
              bgcolor: 'white',
              color: 'rgba(0, 0, 0, 0.6)',
              borderColor: '#ddd',
              py: 1.4,
              fontWeight: 500,
              fontSize: '1rem',
              '&:hover': {
                bgcolor: '#f7f7f7',
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5,
            }}
          >
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <Image
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google Logo"
                width={20}
                height={20}
              />
            )}
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </Button>

          <Divider sx={{ width: '100%' }} />

          <Typography variant="body2" textAlign="center" color="text.secondary">
            By signing in, you agree to our{' '}
            <Box
              component="a"
              href="/terms"
              sx={{ color: 'primary.main', fontWeight: 500, textDecoration: 'none' }}
            >
              Terms of Service
            </Box>{' '}
            and{' '}
            <Box
              component="a"
              href="/privacy"
              sx={{ color: 'primary.main', fontWeight: 500, textDecoration: 'none' }}
            >
              Privacy Policy
            </Box>
            .
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    }>
      <SignInContent />
    </Suspense>
  );
}