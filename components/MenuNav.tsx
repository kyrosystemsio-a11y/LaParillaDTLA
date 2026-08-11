import type { MenuCategory } from "@/content/menu";

/**
 * Below `lg` this is the original horizontally-scrolling bar pinned under the
 * header. At `lg` it becomes a sticky vertical rail in the page's left column —
 * fourteen categories do not fit in a horizontal bar on a wide screen without
 * truncating.
 */
export function MenuNav({ categories }: { categories: MenuCategory[] }) {
  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-[57px] z-30 -mx-4 overflow-x-auto border-b border-ink/10 bg-plaster/95 px-4 py-3 backdrop-blur sm:top-[65px] sm:-mx-6 sm:px-6 lg:top-24 lg:mx-0 lg:self-start lg:overflow-visible lg:border-b-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none"
    >
      <ul className="flex w-max gap-5 lg:w-auto lg:flex-col lg:gap-0">
        {categories.map((c) => (
          <li key={c.slug} className="lg:border-b lg:border-ink/10 lg:last:border-none">
            <a
              href={`#${c.slug}`}
              className="whitespace-nowrap font-utility text-xs uppercase tracking-widest text-ink/70 hover:text-ember lg:flex lg:min-h-[44px] lg:items-center lg:whitespace-normal"
            >
              {c.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
