import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useResponsive() {
  const [state, setState] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    breakpoint: 'xs',
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isSmall: false,
    isMedium: false,
    isLarge: false,
  });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      let bp = 'xs';

      if (width >= breakpoints['2xl']) bp = '2xl';
      else if (width >= breakpoints.xl) bp = 'xl';
      else if (width >= breakpoints.lg) bp = 'lg';
      else if (width >= breakpoints.md) bp = 'md';
      else if (width >= breakpoints.sm) bp = 'sm';

      setState({
        width,
        height,
        breakpoint: bp,
        isMobile: width < breakpoints.sm,
        isTablet: width >= breakpoints.sm && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        isSmall: width < breakpoints.md,
        isMedium: width >= breakpoints.md && width < breakpoints.xl,
        isLarge: width >= breakpoints.xl,
      });
    };

    update(); // initial call
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return state;
}
