import type { Metadata } from "next";
import { menu, barInfo } from "@/content/menu";
import { restaurant } from "@/content/restaurant";
import { MenuNav } from "@/components/MenuNav";
import { MenuSection } from "@/components/MenuSection";
import { Button } from "@/components/Button";
import { getVisibleLocations } from "@/content/locations";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Molcajetes, parrilladas, seafood, street tacos, and more — the full La Parrilla menu, Los Angeles.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  const anchor = getVisibleLocations().find((l) => l.isOriginal);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <h1 className="font-display text-5xl text-ink sm:text-6xl">Menu</h1>
        <p className="mt-3 max-w-xl font-body text-ink/70">
          Prices as listed for online ordering. Dine-in menus can vary
          slightly by location — ask your server if you don&apos;t see
          something you&apos;re after.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {anchor && <Button href={`tel:${anchor.phoneHref}`}>Call for takeout</Button>}
          <Button href={restaurant.onlineOrderUrl} variant="ghost">
            Order online
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <MenuNav categories={menu} />

        <div className="divide-y divide-ink/10">
          {menu.map((category) => (
            <MenuSection key={category.slug} category={category} />
          ))}
        </div>

        <section id="bar" className="scroll-mt-32 py-10">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">{barInfo.name}</h2>
          <p className="mt-3 max-w-2xl font-body text-base leading-relaxed text-ink/75">
            {barInfo.description}
          </p>
          <p className="mt-2 font-body text-sm italic text-ink/70">{barInfo.priceNote}</p>
          <p className="mt-4 max-w-2xl font-body text-sm text-ink/70">
            {restaurant.happyHour.sectionName} — {restaurant.happyHour.note}
          </p>
        </section>
      </div>
    </div>
  );
}
