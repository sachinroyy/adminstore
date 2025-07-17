import { useState, useEffect } from 'react';
import { device } from './breakpoints';

const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isXl, setIsXl] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState('xs');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      
      // Update breakpoint states
      setIsMobile(width < 600);
      setIsTablet(width >= 600 && width < 900);
      setIsDesktop(width >= 900 && width < 1536);
      setIsXl(width >= 1536);
      
      // Set current breakpoint
      if (width < 600) setCurrentBreakpoint('xs');
      else if (width < 900) setCurrentBreakpoint('sm');
      else if (width < 1200) setCurrentBreakpoint('md');
      else if (width < 1536) setCurrentBreakpoint('lg');
      else setCurrentBreakpoint('xl');
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isXl,
    currentBreakpoint,
    device, // Export device media queries
  };
};

export default useResponsive;
