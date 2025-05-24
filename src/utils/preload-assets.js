'use client';

/**
 * Utility for preloading assets to improve perceived performance
 */

/**
 * Preload a single image
 * @param {string} src
 * @returns {Promise<void>}
 */
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = (e) => reject(e);
    img.src = src;
  });
};

/**
 * Preload multiple images
 * @param {string[]} srcs
 */
export const preloadImages = async (srcs) => {
  try {
    await Promise.all(srcs.map(src => preloadImage(src)));
  } catch (error) {
    console.error('Error preloading images:', error);
  }
};

/**
 * Preload a web font
 * @param {string} fontFamily
 * @param {string} fontDescriptor (e.g. "bold 1em")
 */
export const preloadFont = (fontFamily, fontDescriptor = '1em') => {
  if (document && document.fonts && document.fonts.load) {
    document.fonts.load(`${fontDescriptor} ${fontFamily}`);
  }
};
