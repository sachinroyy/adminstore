// Breakpoint values in pixels
const breakpoints = {
  // Extra small devices (phones, 600px and down)
  xs: 0,
  // Small devices (portrait tablets and large phones, 600px and up)
  sm: 600,
  // Medium devices (landscape tablets, 900px and up)
  md: 900,
  // Large devices (laptops/desktops, 1200px and up)
  lg: 1200,
  // Extra large devices (large laptops and desktops, 1536px and up)
  xl: 1536,
};

export const device = {
  // Mobile first approach (min-width)
  mobile: `(min-width: ${breakpoints.xs}px)`,
  tablet: `(min-width: ${breakpoints.sm}px)`,
  laptop: `(min-width: ${breakpoints.md}px)`,
  desktop: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  
  // Specific breakpoint ranges
  mobileOnly: `(max-width: ${breakpoints.sm - 1}px)`,
  tabletOnly: `(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
  laptopOnly: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
  desktopOnly: `(min-width: ${breakpoints.lg}px) and (max-width: ${breakpoints.xl - 1}px)`,
};

export default breakpoints;
