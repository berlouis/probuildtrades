'use client';

/**
 * Global error handler utility
 */

const defaultConfig = {
  enabled: false,
  environment: 'development',
  enableConsoleLogging: true,
  maxErrorCount: 10,
};

let config = { ...defaultConfig };
let errorCount = 0;

/**
 * Initialize the error handler with optional overrides
 * @param {Object} customConfig
 */
export function initErrorHandler(customConfig = {}) {
  config = { ...defaultConfig, ...customConfig };
}

/**
 * Log or send an error based on current configuration
 * @param {Error} error
 * @param {Object} context Optional context: { component, action, data }
 */
export function captureError(error, context = {}) {
  if (!config.enabled && !config.enableConsoleLogging) return;
  if (errorCount >= config.maxErrorCount) return;

  errorCount++;

  if (config.enableConsoleLogging) {
    console.error('Captured Error:', error);
    console.error('Context:', context);
  }

  // Placeholder: connect to real error service here
  if (config.enabled) {
    // e.g., send to Sentry or custom API
  }
}
