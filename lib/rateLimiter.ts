// Very basic in-memory rate limiter by IP + endpoint
const requests: Record<string, { count: number; lastRequest: number }> = {};
const WINDOW = 60 * 1000; // 1 minute
const LIMIT = 15; // max 15 requests per minute per endpoint+IP

export function rateLimit(key: string): boolean {
  const now = Date.now();
  if (!requests[key] || now - requests[key].lastRequest > WINDOW) {
    requests[key] = { count: 1, lastRequest: now };
    return false;
  }
  requests[key].count += 1;
  requests[key].lastRequest = now;
  return requests[key].count > LIMIT;
}
