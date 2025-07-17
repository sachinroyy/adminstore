
'use client';

import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Typography,
  Tooltip
} from '@mui/material';
import {
  Logout as LogoutIcon,
  ExpandMore,
  Settings,
  Favorite,
  History,
  AccountCircle,
  Email,
  Google
} from '@mui/icons-material';
import Link from 'next/link';
import { useState, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';

const menuItems = [
  { icon: <AccountCircle color="primary" />, label: 'Profile', href: '/profile' },
  { icon: <History sx={{ color: 'purple' }} />, label: 'Order History', href: '/orders' },
  { icon: <Favorite sx={{ color: 'hotpink' }} />, label: 'Wishlist', href: '/wishlist' },
  { icon: <Settings sx={{ color: 'gray' }} />, label: 'Settings', href: '/settings' },
];

export default function MyAccount() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => setOpen((prev) => !prev);
  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  if (!session) {
    return (
      <Link href="/components/signin">
        <Button variant="contained" color="primary" startIcon={<AccountCircle />}>
          Sign In
        </Button>
      </Link>
    );
  }

  return (
    <Box sx={{ position: 'relative', zIndex: 1500 ,display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Tooltip title="My Account">
        <Button
          ref={anchorRef}
          onClick={handleToggle}
          variant="outlined"
          startIcon={
            session.user?.image ? (
              <Avatar
                src={session.user.image}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                {session.user?.name?.[0] || 'U'}
              </Avatar>
            )
          }
          endIcon={<ExpandMore />}
          sx={{ textTransform: 'none' }}
        >
          <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left' }}>
            <Typography variant="body2">{session.user?.name}</Typography>
            <Stack direction="row" spacing={0.5} alignItems="center">
              {session.user?.email?.includes('@gmail.com') ? (
                <Google fontSize="small" color="error" />
              ) : (
                <Email fontSize="small" color="primary" />
              )}
              <Typography variant="caption">
                {session.user?.email?.split('@')[0]}
              </Typography>
            </Stack>
          </Box>
        </Button>
      </Tooltip>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: 'top right' }}>
            <Paper elevation={4} sx={{ minWidth: 220, mt: 1, borderRadius: 2 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} onKeyDown={(e) => e.key === 'Tab' && setOpen(false)}>
                  <Box sx={{ px: 2, py: 1.5, bgcolor: 'grey.50' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar
                        src={session.user?.image || ''}
                        sx={{ width: 48, height: 48 }}
                      >
                        {session.user?.name?.[0] || 'U'}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={500}>
                          {session.user?.name || 'User'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {session.user?.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Divider />

                  {menuItems.map((item, idx) => (
                    <Link key={idx} href={item.href} passHref>
                      <MenuItem onClick={handleClose}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {item.icon}
                          <Typography variant="body2">{item.label}</Typography>
                        </Stack>
                      </MenuItem>
                    </Link>
                  ))}

                  <Divider />

                  <MenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                    <LogoutIcon color="error" sx={{ mr: 1 }} />
                    <Typography color="error">Sign Out</Typography>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}
