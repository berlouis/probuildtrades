'use client';

import { useState, useEffect } from 'react';

/**
 * A custom hook for progressively loading images.
 * Returns the current image source and loading status.
 */
export function useProgressiveImg(lowQualitySrc, highQualitySrc) {
  const [src, setSrc] = useState(lowQualitySrc || highQualitySrc);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!highQualitySrc || lowQualitySrc === highQualitySrc) {
      setIsLoading(false);
      return;
    }

    setSrc(lowQualitySrc);
    setIsLoading(true);

    const img = new Image();
    img.src = highQualitySrc;

    img.onload = () => {
      setSrc(highQualitySrc);
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };
  }, [lowQualitySrc, highQualitySrc]);

  return [src, isLoading];
}
