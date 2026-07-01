/**
 * Product query helpers layered over the file-based catalogue in
 * `database/products.js`: search, sort, pagination and category listing.
 * Kept out of `routes/` so the handlers stay thin (see CLAUDE.md: reusable
 * helpers live in `utils/`).
 */
import products from "../../../database/products.js";

/** Title-case a category slug: "home-decoration" -> "Home Decoration". */
function titleCase(slug) {
  return slug
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Distinct categories, in order of first appearance in the catalogue.
 * `baseUrl` (e.g. "http://localhost:3002") is used to build absolute links.
 */
export function getCategories(baseUrl) {
  const slugs = [...new Set(products.map((p) => p.category))];
  return slugs.map((slug) => ({
    slug,
    name: titleCase(slug),
    url: `${baseUrl}/api/products/categories?category=${slug}`,
  }));
}

/** Case-insensitive substring match across the common product text fields. */
export function searchProducts(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [...products];
  return products.filter((p) => {
    const haystack = [p.title, p.description, p.brand, p.category, ...(p.tags || [])]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

/**
 * Return a sorted copy of `list`. Numeric fields sort numerically, everything
 * else by locale-aware string compare. Unknown/blank `sortBy` leaves the list
 * untouched; `order` is "asc" (default) or "desc".
 */
export function sortProducts(list, sortBy, order = "asc") {
  if (!sortBy) return list;
  const dir = order === "desc" ? -1 : 1;
  return [...list].sort((a, b) => {
    const av = a[sortBy];
    const bv = b[sortBy];
    if (av === undefined && bv === undefined) return 0;
    if (av === undefined) return 1;
    if (bv === undefined) return -1;
    if (typeof av === "number" && typeof bv === "number") return (av - bv) * dir;
    return String(av).localeCompare(String(bv)) * dir;
  });
}

/**
 * Slice `list` into the dummyjson-style pagination envelope.
 * `limit` defaults to 30; limit=0 (or invalid) returns all remaining items.
 */
export function paginate(list, { skip, limit } = {}) {
  const total = list.length;
  const s = Math.max(0, Number.parseInt(skip, 10) || 0);
  const rawLimit = limit === undefined ? 30 : Number.parseInt(limit, 10);
  const l = Number.isNaN(rawLimit) || rawLimit <= 0 ? total : rawLimit;
  const page = list.slice(s, s + l);
  return { products: page, total, skip: s, limit: page.length };
}
