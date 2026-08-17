import type { Metadata } from "next";
import { menu, barInfo } from "@/content/menu";
import { restaurant } from "@/content/restaurant";
import { buildMenuRows } from "@/lib/menu-layout";
import { MenuNav } from "@/components/MenuNav";
import { MenuSection } from "@/components/MenuSection";
import { Button } from "@/components/Button";
import { getAnchorLocation } from "@/content/locations";

const MENU_DESCRIPTION =
  "Molcajetes, parrilladas, seafood, street tacos, and more — the full La Parrilla menu, Los Angeles.";

export const metadata: Metadata = {
  title: "Menu",
  description: MENU_DESCRIPTION,
  alternates: { canonical: "/menu" },
  // Without these the page inherited the root layout's OpenGraph block, so a
  // shared menu link previewed as the home page and advertised the home page
  // URL. `images` has to be restated: declaring `openGraph` on a segment
  // detaches the root opengraph-image file, which would otherwise leave this
  // page with no share image at all.
  openGraph: {
    title: "Menu — La Parrilla",
    description: MENU_DESCRIPTION,
    url: "/menu",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

export default function MenuPage() {
  const anchor = getAnchorLocation();
  const rows = buildMenuRows(menu);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <h1 className="font-display text-5xl text-ink sm:text-6xl">Menu</h1>
        {/* Both the provenance sentence and the CTA below are gated on the same
            flag `lib/schema.ts` already respects. While it is false we neither
            send anyone to an ordering page we could not confirm resolves, nor
            cite that page as the authority for the prices on this one. The
            dine-in caveat is independent of the ordering source, so it stays
            either way. Flip the flag and both return with no code change. */}
        <p className="mt-3 max-w-xl font-body text-ink/70">
          {restaurant.onlineOrderVerified && "Prices as listed for online ordering. "}
          Dine-in menus can vary slightly by location — ask your server if you
          don&apos;t see something you&apos;re after.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {anchor && <Button href={`tel:${anchor.phoneHref}`}>Call for takeout</Button>}
          {restaurant.onlineOrderVerified && (
            <Button href={restaurant.onlineOrderUrl} variant="ghost">
              Order online
            </Button>
          )}
        </div>
      </div>

      {/* Category rail left, menu right, from `lg` up. Below that the rail
          collapses back to the sticky horizontal bar and everything is one
          column — the mobile reading experience is unchanged. */}
      <div className="mx-auto mt-6 max-w-6xl px-4 sm:px-6 lg:mt-10 lg:grid lg:grid-cols-[190px_1fr] lg:items-start lg:gap-14">
        {/* The bar section lives outside the `menu` data but is a section on
            this page, so it belongs in the jump nav. */}
        <MenuNav categories={menu} extraLinks={[{ href: "#bar", label: barInfo.name }]} />

        <div>
          {rows.map((row) => (
            <div
              key={row.categories.map((c) => c.slug).join("+")}
              className={
                row.span === "split"
                  ? // items-start, not stretch: equal-height columns pushed the
                    // ticket dividers apart by up to 172px on uneven pairs.
                    "lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12"
                  : undefined
              }
            >
              {row.categories.map((category) => (
                <MenuSection key={category.slug} category={category} span={row.span} />
              ))}
            </div>
          ))}

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
    </div>
  );
}
