/**
 * Normalize a service base URL. Render's private networking exposes sibling
 * services as `host:port` (no scheme) via `fromService` blueprint references,
 * whereas local/dev config uses full `http://host:port` URLs. Prepend `http://`
 * when a scheme is missing so both forms work unchanged downstream.
 */
export function normalizeBaseUrl(url) {
  if (!url) return url;
  return /^[a-z]+:\/\//i.test(url) ? url : `http://${url}`;
}
