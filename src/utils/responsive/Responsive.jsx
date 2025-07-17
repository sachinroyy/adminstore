import React from 'react';
import { Box, Typography } from '@mui/material';
import useResponsive from './useResponsive';

/**
 * A component that renders children based on the current breakpoint
 * @param {Object} props
 * @param {React.ReactNode} props.mobile - Content to show on mobile (xs)
 * @param {React.ReactNode} props.tablet - Content to show on tablet (sm)
 * @param {React.ReactNode} props.desktop - Content to show on desktop (md and up)
 * @param {boolean} props.hideOnMobile - Hide on mobile
 * @param {boolean} props.hideOnTablet - Hide on tablet
 * @param {boolean} props.hideOnDesktop - Hide on desktop
 */
const Responsive = ({
  mobile,
  tablet,
  desktop,
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
  children,
}) => {
  const { isMobile, isTablet } = useResponsive();

  if (hideOnMobile && isMobile) return null;
  if (hideOnTablet && isTablet) return null;
  if (hideOnDesktop && !isMobile && !isTablet) return null;

  if (isMobile) return mobile || children;
  if (isTablet) return tablet || children;
  return desktop || children;
};

/**
 * Shows content only on mobile devices
 */
const MobileOnly = (props) => (
  <Responsive mobile={props.children} hideOnTablet hideOnDesktop />
);

/**
 * Shows content only on tablet devices
 */
const TabletOnly = (props) => (
  <Responsive tablet={props.children} hideOnMobile hideOnDesktop />
);

/**
 * Shows content only on desktop devices
 */
const DesktopOnly = (props) => (
  <Responsive desktop={props.children} hideOnMobile hideOnTablet />
);

/**
 * Shows content on mobile and tablet, but not on desktop
 */
const MobileAndTabletOnly = (props) => (
  <Responsive mobile={props.children} tablet={props.children} hideOnDesktop />
);

/**
 * Shows content on tablet and desktop, but not on mobile
 */
const TabletAndDesktopOnly = (props) => (
  <Responsive tablet={props.children} desktop={props.children} hideOnMobile />
);

export {
  Responsive as default,
  MobileOnly,
  TabletOnly,
  DesktopOnly,
  MobileAndTabletOnly,
  TabletAndDesktopOnly,
  useResponsive,
};

export const BreakpointDebugger = () => {
  const { isMobile, isTablet, currentBreakpoint } = useResponsive();
  
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: 1,
        zIndex: 9999,
        fontSize: '12px',
      }}
    >
      <Typography variant="caption">
        Breakpoint: {currentBreakpoint.toUpperCase()}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
        <Typography variant="caption" color={isMobile ? 'lime' : 'inherit'}>
          Mobile
        </Typography>
        <Typography variant="caption" color={isTablet ? 'lime' : 'inherit'}>
          Tablet
        </Typography>
        <Typography variant="caption" color={!isMobile && !isTablet ? 'lime' : 'inherit'}>
          Desktop
        </Typography>
      </Box>
    </Box>
  );
};
