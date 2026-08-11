import type { MenuCategory } from "@/content/menu";
import { TicketDivider } from "@/components/TicketDivider";

export function MenuSection({ category }: { category: MenuCategory }) {
  return (
    <section
      id={category.slug}
      aria-labelledby={`${category.slug}-heading`}
      className="scroll-mt-32 py-10 first:pt-0"
    >
      <h2 id={`${category.slug}-heading`} className="font-display text-3xl text-ink sm:text-4xl">
        {category.name}
      </h2>
      {category.note && (
        <p className="mt-1 font-body text-sm italic text-ink/70">{category.note}</p>
      )}

      <ul className="mt-6 flex flex-col">
        {category.items.map((item) => (
          <li
            key={item.name}
            className={`flex items-baseline gap-3 border-b border-ink/10 py-3 last:border-none ${
              item.signature ? "bg-marigold/10 -mx-4 px-4" : ""
            }`}
          >
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-body text-base font-medium text-ink">{item.name}</span>
                {item.signature && (
                  <span className="font-utility text-[10px] uppercase tracking-widest text-ember">
                    Signature
                  </span>
                )}
              </div>
              {item.description && (
                <p className="mt-0.5 font-body text-sm text-ink/70">{item.description}</p>
              )}
            </div>
            <span aria-hidden="true" className="flex-1 border-b border-dotted border-ink/20 translate-y-[-4px]" />
            {item.price && (
              <span className="whitespace-nowrap font-utility text-sm text-ink">{item.price}</span>
            )}
          </li>
        ))}
      </ul>
      <TicketDivider className="mt-4" />
    </section>
  );
}
