import type { MenuCategory } from "@/content/menu";

export function MenuNav({ categories }: { categories: MenuCategory[] }) {
  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-[57px] z-30 -mx-4 overflow-x-auto border-b border-ink/10 bg-plaster/95 px-4 py-3 backdrop-blur sm:top-[65px] sm:-mx-6 sm:px-6"
    >
      <ul className="flex w-max gap-5">
        {categories.map((c) => (
          <li key={c.slug}>
            <a
              href={`#${c.slug}`}
              className="whitespace-nowrap font-utility text-xs uppercase tracking-widest text-ink/70 hover:text-ember"
            >
              {c.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
