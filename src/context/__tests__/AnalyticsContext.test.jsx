import { render, act, fireEvent } from '@testing-library/react';
import { AnalyticsProvider, useAnalytics } from '../AnalyticsContext';
import * as analytics from '@/components/analytics/GoogleAnalytics';
import { ConsentLevel } from '@/components/analytics/ConsentBanner';
import '@testing-library/jest-dom';

const TestComponent = () => {
  const {
    isEnabled,
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackFormSubmission,
    trackOutboundLink,
    trackServiceSelection,
    trackCalculatorUsage
  } = useAnalytics();

  return (
    <div>
      <div data-testid="enabled-status">{isEnabled ? 'enabled' : 'disabled'}</div>
      <button
        data-testid="track-event-btn"
        onClick={() => trackEvent('test-action', 'test-category', 'test-label', 123)}
      >
        Track Event
      </button>
      <button
        data-testid="track-page-view-btn"
        onClick={() => trackPageView('/test-page')}
      >
        Track Page View
      </button>
    </div>
  );
};

describe('AnalyticsContext', () => {
  it('renders without crashing and shows status', () => {
    const { getByTestId } = render(
      <AnalyticsProvider>
        <TestComponent />
      </AnalyticsProvider>
    );

    expect(getByTestId('enabled-status')).toBeInTheDocument();
  });

  it('calls analytics methods when buttons are clicked', () => {
    const spy = jest.spyOn(analytics, 'trackEvent').mockImplementation(() => {});
    const { getByTestId } = render(
      <AnalyticsProvider>
        <TestComponent />
      </AnalyticsProvider>
    );
    fireEvent.click(getByTestId('track-event-btn'));
    expect(spy).toHaveBeenCalledWith('test-action', 'test-category', 'test-label', 123);
    spy.mockRestore();
  });
});
