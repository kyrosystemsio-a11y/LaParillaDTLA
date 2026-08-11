import type { Metadata } from "next";
import Image from "next/image";
import { restaurant } from "@/content/restaurant";
import { images } from "@/content/images";
import { ChaplinSpotlight } from "@/components/ChaplinSpotlight";
import { Button } from "@/components/Button";
import { getVisibleLocations } from "@/content/locations";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Family-owned since 1978. The story of La Parrilla, from Boyle Heights to a 1905 house on Wilshire.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const anchor = getVisibleLocations().find((l) => l.isOriginal);

  return (
    <div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="font-utility text-xs uppercase tracking-widest text-ember">Our story</p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-ink sm:text-6xl">
            Run by the same family since {restaurant.founded.boyleHeights}.
          </h1>
          <div className="mt-6 space-y-4 max-w-lg font-body text-base leading-relaxed text-ink/75">
            <p>
              La Parrilla started in Boyle Heights in {restaurant.founded.boyleHeights},
              cooking the food the family grew up on — mole, molcajetes, meat
              off the grill. It&apos;s still the same room, still the same
              family, mariachi still coming through on a Friday night.
            </p>
            <p>{restaurant.founded.note}</p>
            <p>
              Several dishes on the menu today are Mary Carmen Creations —
              recipes that came from the kitchen&apos;s own hand, not off a
              prep sheet.
            </p>
          </div>
          {anchor && (
            <div className="mt-8">
              <Button href="/locations">Visit us</Button>
            </div>
          )}
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Image
            src={images.mariachi.src}
            alt={images.mariachi.alt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <ChaplinSpotlight />

      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl text-ink sm:text-4xl">Two rooms, one kitchen&apos;s worth of heart</h2>
        <p className="mt-4 font-body text-ink/70">
          Boyle Heights is where it started. Wilshire came next, in{" "}
          {restaurant.founded.wilshire}, into a building with more history
          than the restaurant itself. Both are still family-run.
        </p>
      </div>
    </div>
  );
}
