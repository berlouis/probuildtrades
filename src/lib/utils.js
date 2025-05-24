/**
 * Combines class names safely.
 * Filters out false, null, undefined and joins the rest into a single string.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
