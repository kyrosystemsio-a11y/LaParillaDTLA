import type { MenuCategory } from "@/content/menu";
import { TicketDivider } from "@/components/TicketDivider";

export function MenuSection({
  category,
  span = "full",
}: {
  category: MenuCategory;
  /** Which kind of grid row this sits in. Only affects desktop measure. */
  span?: "full" | "split";
}) {
  return (
    <section
      id={category.slug}
      aria-labelledby={`${category.slug}-heading`}
      className="scroll-mt-32 py-10 first:pt-0"
    >
      {/* Signature emphasis is a size step, not a colour or a rule. A left
          rule merged into one continuous bar where two flagged categories were
          adjacent, and marigold already means "signature item" one level down —
          reusing it here made the same colour mean two things in one section. */}
      <h2
        id={`${category.slug}-heading`}
        className={
          category.signature
            ? "font-display text-4xl text-ink sm:text-5xl"
            : "font-display text-3xl text-ink sm:text-4xl"
        }
      >
        {category.name}
      </h2>
      {category.note && (
        <p className="mt-1 font-body text-sm italic text-ink/70">{category.note}</p>
      )}

      {/* Full-width sections cap their measure on desktop: without this a
          three-word dish name is tied to its price by a ~700px dotted leader,
          which is the legibility problem the desktop pass exists to fix.
          Split sections are already in a narrow column. */}
      <ul className={`mt-6 flex flex-col ${span === "full" ? "lg:max-w-3xl" : ""}`}>
        {category.items.map((item) => (
          <li
            key={item.name}
            className={`flex items-baseline gap-3 border-b border-ink/10 py-3 last:border-none ${
              item.signature ? "-mx-4 bg-marigold/10 px-4" : ""
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

            {/* An item with no listed price gets no leader and no price cell —
                a dotted rule pointing at nothing reads as a bug. We do not
                invent a price or a stand-in label for it. */}
            {item.price && (
              <>
                <span
                  aria-hidden="true"
                  className="flex-1 translate-y-[-4px] border-b border-dotted border-ink/20"
                />
                <span className="whitespace-nowrap font-utility text-sm text-ink">
                  {item.price}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className={`mt-4 ${span === "full" ? "lg:max-w-3xl" : ""}`}>
        <TicketDivider />
      </div>
    </section>
  );
}
