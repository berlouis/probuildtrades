'use client';

import React, { createContext, useContext, useState, useEffect, Suspense } from 'react';
import { ConsentLevel } from '@/components/analytics/ConsentBanner';
import * as analytics from '@/components/analytics/GoogleAnalytics';

const AnalyticsContext = createContext({
  isEnabled: false,
  trackEvent: () => {},
  trackPageView: () => {},
  trackButtonClick: () => {},
  trackFormSubmission: () => {},
  trackOutboundLink: () => {},
  trackServiceSelection: () => {},
  trackCalculatorUsage: () => {},
});

export const useAnalytics = () => useContext(AnalyticsContext);

function AnalyticsProviderContent({ children }) {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Example: check user consent
    setIsEnabled(true);
  }, []);

  const contextValue = {
    isEnabled,
    trackEvent: analytics.trackEvent,
    trackPageView: analytics.trackPageView,
    trackButtonClick: analytics.trackButtonClick,
    trackFormSubmission: analytics.trackFormSubmission,
    trackOutboundLink: analytics.trackOutboundLink,
    trackServiceSelection: analytics.trackServiceSelection,
    trackCalculatorUsage: analytics.trackCalculatorUsage,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function AnalyticsProvider({ children }) {
  return (
    <Suspense fallback={null}>
      <AnalyticsProviderContent>
        {children}
      </AnalyticsProviderContent>
    </Suspense>
  );
}
