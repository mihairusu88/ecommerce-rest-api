/**
 * Cookie helpers for the auth tokens. We set the access and refresh tokens as
 * HTTP cookies (in addition to the JSON body) on login and refresh, and read
 * the refresh token back from the cookie on /refresh.
 *
 * No cookie-parser dependency: request cookies are parsed from the raw header,
 * and responses use Express's built-in res.cookie().
 */
const ACCESS_COOKIE = "accessToken";
const REFRESH_COOKIE = "refreshToken";

// One week — matches the default refresh-token lifetime in utils/jwt.js.
const REFRESH_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
// One hour — matches the default access-token lifetime.
const ACCESS_MAX_AGE_MS = 60 * 60 * 1000;

/** Parse a raw `Cookie` header into a { name: value } map. */
export function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((acc, part) => {
    const idx = part.indexOf("=");
    if (idx === -1) return acc;
    const name = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (name) acc[name] = decodeURIComponent(value);
    return acc;
  }, {});
}

/** Read the refresh token from the request cookies (or undefined). */
export function getRefreshCookie(req) {
  return parseCookies(req.headers.cookie)[REFRESH_COOKIE];
}

/** Set both auth tokens as HTTP cookies on the response. */
export function setAuthCookies(res, { accessToken, refreshToken }) {
  const base = {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
  res.cookie(ACCESS_COOKIE, accessToken, { ...base, maxAge: ACCESS_MAX_AGE_MS });
  res.cookie(REFRESH_COOKIE, refreshToken, { ...base, maxAge: REFRESH_MAX_AGE_MS });
}
