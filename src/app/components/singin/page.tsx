// 'use client';

// import { signIn, useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { FaGoogle, FaSpinner } from 'react-icons/fa';

// export default function SignIn() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const error = searchParams.get('error');
//     if (error === 'OAuthAccountNotLinked') {
//       setError('This email is already registered with a different provider.');
//     } else if (error) {
//       setError('An error occurred during sign in. Please try again.');
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     if (status === 'authenticated') {
//       router.push('/');
//     }
//   }, [status, router]);

//   const handleSignIn = async () => {
//     try {
//       setIsLoading(true);
//       setError('');
//       await signIn('google', { callbackUrl: '/' });
//     } catch (error) {
//       console.error('Sign in error:', error);
//       setError('Failed to sign in. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   if (status === 'loading' || status === 'authenticated') {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
//         <div className="text-center">
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
//             Welcome Back
//           </h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Sign in to your account to continue
//           </p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-400 p-4">
//             <div className="flex">
//               <div className="flex-shrink-0">
//                 <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <div className="ml-3">
//                 <p className="text-sm text-red-700">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="mt-8 space-y-6">
//           <div>
//             <button
//               onClick={handleSignIn}
//               disabled={isLoading}
//               className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
//                 isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200`}
//             >
//               <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                 {isLoading ? (
//                   <FaSpinner className="animate-spin h-5 w-5 text-blue-500 group-hover:text-blue-400" />
//                 ) : (
//                   <FaGoogle className="h-5 w-5 text-blue-500 group-hover:text-blue-400" />
//                 )}
//               </span>
//               {isLoading ? 'Signing in...' : 'Sign in with Google'}
//             </button>
//           </div>
//         </div>

//         <div className="mt-6">
//           <p className="text-center text-sm text-gray-600">
//             By signing in, you agree to our{' '}
//             <a href="/terms" className="font-medium text-blue-600 hover:text-blue-500">
//               Terms of Service
//             </a>{' '}
//             and{' '}
//             <a href="/privacy" className="font-medium text-blue-600 hover:text-blue-500">
//               Privacy Policy
//             </a>.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
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
} from '@mui/material';

import Image from 'next/image'; // For Google icon

export default function SignInPage() {
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
