import type { MenuCategory } from "@/content/menu";

export interface MenuRow {
  /**
   * "full"  — one category spanning both desktop columns.
   * "split" — one or two categories, each occupying a single desktop column.
   *
   * Below the desktop breakpoint every row renders as a single column, so
   * this distinction is purely a wide-viewport concern.
   */
  span: "full" | "split";
  /** Exactly two categories when span is "split", exactly one when "full". */
  categories: MenuCategory[];
}

/**
 * A category can share a row only when none of its items carry a description —
 * bare name/price rows stay readable at half width, prose does not.
 */
function isCompact(category: MenuCategory): boolean {
  // The length guard matters: [].every() is vacuously true, which would make
  // an empty category pairing-eligible.
  return category.items.length > 0 && category.items.every((item) => !item.description);
}

/**
 * Groups menu categories into rows for the desktop grid.
 *
 * Menu order is meaningful (starters → mains → drinks → desserts), so
 * categories are only ever paired with their immediate neighbour and are
 * never reordered. That also keeps DOM order identical to content order,
 * which is what makes the category anchors safe.
 *
 * A compact category with no compact neighbour spans the full width rather
 * than sitting in one column — half a row with an empty half beside it reads
 * as a layout gap, not a choice.
 */
export function buildMenuRows(categories: MenuCategory[]): MenuRow[] {
  const rows: MenuRow[] = [];

  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    const next = categories[i + 1];

    if (isCompact(category) && next && isCompact(next)) {
      rows.push({ span: "split", categories: [category, next] });
      i++;
      continue;
    }

    rows.push({ span: "full", categories: [category] });
  }

  return rows;
}
