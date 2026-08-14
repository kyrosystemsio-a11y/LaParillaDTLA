import type { MenuCategory } from "@/content/menu";

export interface MenuNavLink {
  href: string;
  label: string;
}

/**
 * Below `lg` this is a horizontally-scrolling bar pinned under the header. At
 * `lg` it becomes a sticky vertical rail in the page's left column — fifteen
 * categories do not fit in a horizontal bar on a wide screen without
 * truncating.
 */
export function MenuNav({
  categories,
  extraLinks = [],
}: {
  categories: MenuCategory[];
  /** Sections that live outside the `menu` data but belong in the jump nav. */
  extraLinks?: MenuNavLink[];
}) {
  const links: MenuNavLink[] = [
    ...categories.map((c) => ({ href: `#${c.slug}`, label: c.name })),
    ...extraLinks,
  ];

  return (
    <nav
      aria-label="Menu categories"
      // The rail is capped to the viewport and scrolls internally at `lg`.
      // Left unbounded it ran 629px tall from a 96px offset, so on common
      // laptop heights the last categories were clipped off the bottom with no
      // way to reach them — including by keyboard, since a sticky container
      // cannot be scrolled into view. An internal scroller fixes both.
      //
      // The horizontal scroller below `lg` is the <ul>, not this element, so
      // the trailing-edge fade can mask the scrollport without also punching a
      // hole in this bar's sticky background.
      className="sticky top-[57px] z-30 -mx-4 border-b border-ink/10 bg-plaster/95 py-3 backdrop-blur sm:top-[65px] sm:-mx-6 lg:top-24 lg:mx-0 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto lg:border-b-0 lg:bg-transparent lg:py-0 lg:backdrop-blur-none"
    >
      {/* The trailing edge fades below `lg`, so the strip reads as continuing
          rather than ending — only about four of fifteen categories fit on a
          phone. */}
      <ul className="flex gap-5 overflow-x-auto px-4 [mask-image:linear-gradient(to_right,black_calc(100%-28px),transparent)] sm:px-6 lg:flex-col lg:gap-0 lg:overflow-x-visible lg:px-0 lg:[mask-image:none]">
        {links.map((link) => (
          <li
            key={link.href}
            className="shrink-0 lg:border-b lg:border-ink/10 lg:last:border-none"
          >
            <a
              href={link.href}
              className="flex min-h-[24px] items-center whitespace-nowrap font-utility text-xs uppercase tracking-widest text-ink/70 hover:text-ember lg:min-h-[44px] lg:whitespace-normal"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
