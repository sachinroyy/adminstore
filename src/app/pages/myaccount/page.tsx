"use client";

import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { 
  Box, 
  Typography, 
  Avatar, 
  Paper, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  Button, 
  CircularProgress,
  Container
} from '@mui/material';

type User = {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type CustomSession = Session & {
  user: User;
};

export default function ProfilePage() {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string };
  const router = useRouter();

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

  if (!session) {
    router.push('/');
    return null;
  }

  const { user } = session;

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper 
          elevation={3} 
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {user.image && (
            <Avatar
              src={user.image}
              alt={user.name || 'User'}
              sx={{ width: 120, height: 120, mb: 2 }}
            />
          )}
          
          <Typography component="h1" variant="h5" gutterBottom>
            {user.name || 'User'}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {user.email}
          </Typography>
          
          <Divider sx={{ width: '100%', my: 3 }} />
          
          <Typography variant="h6" gutterBottom sx={{ alignSelf: 'flex-start' }}>
            Account Information
          </Typography>
          
          <List sx={{ width: '100%', mb: 2 }}>
            <ListItem disablePadding>
              <ListItemText 
                primary="User ID" 
                secondary={user.id} 
                secondaryTypographyProps={{
                  sx: { 
                    wordBreak: 'break-all',
                    fontFamily: 'monospace'
                  }
                }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText 
                primary="Authentication Provider" 
                secondary="Google" 
              />
            </ListItem>
          </List>
          
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => signOut({ callbackUrl: '/pages/singin' })}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Out
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
