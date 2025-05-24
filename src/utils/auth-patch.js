'use client';

/**
 * Safely patch auth from undefined values to avoid destructuring errors
 * @param {any} e
 * @returns {object}
 */
export const patchAuth = (e) => {
  if (e === undefined || e === null) {
    return { auth: {} };
  }

  if (typeof e === 'object' && !('auth' in e)) {
    e.auth = {};
  }

  return e;
};

// Optional global patch (use only if needed for legacy objects)
if (typeof Object !== 'undefined' && Object.assign) {
  const originalAssign = Object.assign;

  Object.assign = function (...args) {
    const target = args[0] ?? {};
    for (let i = 1; i < args.length; i++) {
      const source = args[i];
      if (source && typeof source === 'object' && 'auth' in source) {
        if (!target.auth) {
          target.auth = {};
        }
      }
    }
    return originalAssign.apply(this, args);
  };
}
