import type { MenuCategory, PriceRef } from "@/content/menu";

/**
 * Resolves the price shown for a home-page featured dish from the menu data,
 * so a price can never be typed in twice and drift.
 *
 * Returns `null` — never a guess — when there is no reference, or when a
 * reference no longer matches anything. A missing price renders as no price,
 * which is correct; a wrong price on a real restaurant's site is not.
 */
export function resolveFeaturedPrice(
  ref: PriceRef | undefined,
  categories: MenuCategory[],
): string | null {
  if (!ref) return null;

  if (ref.kind === "item") {
    for (const category of categories) {
      const item = category.items.find((i) => i.name === ref.name);
      if (item) return item.price || null;
    }
    return null;
  }

  const category = categories.find((c) => c.slug === ref.slug);
  if (!category) return null;

  const amounts = category.items
    .map((i) => ({ raw: i.price, value: Number(i.price.replace(/[^0-9.]/g, "")) }))
    .filter((p) => p.raw !== "" && Number.isFinite(p.value));
  if (amounts.length === 0) return null;

  const lowest = amounts.reduce((min, p) => (p.value < min.value ? p : min));
  return `From ${lowest.raw}`;
}
