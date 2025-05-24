'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

const pageview = (url) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

export const GoogleAnalytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_TRACKING_ID) return;
    pageview(pathname);
  }, [pathname]);

  return null;
};
