/**
 * Basic Performance Metrics Utility (JS version)
 */

class PerformanceMetricsService {
  static instance;
  metrics = {
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fcp: null,
    domLoad: null,
    windowLoad: null,
    resources: [],
  };

  observers = [];

  constructor() {
    if (PerformanceMetricsService.instance) {
      return PerformanceMetricsService.instance;
    }

    PerformanceMetricsService.instance = this;
    this.init();
  }

  init() {
    if (typeof window === 'undefined' || !window.performance) return;

    window.addEventListener('load', () => {
      const [entry] = performance.getEntriesByType('navigation');
      if (entry) {
        this.metrics.ttfb = entry.responseStart;
        this.metrics.fcp = entry.responseEnd;
        this.metrics.domLoad = entry.domContentLoadedEventEnd;
        this.metrics.windowLoad = entry.loadEventEnd;
      }

      this.metrics.resources = performance.getEntriesByType('resource');
      this.notify();
    });
  }

  onUpdate(callback) {
    this.observers.push(callback);
  }

  notify() {
    for (const cb of this.observers) {
      cb(this.metrics);
    }
  }
}

export const getPerformanceMetrics = () => new PerformanceMetricsService();
