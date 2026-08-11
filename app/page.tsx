import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SignatureDishes } from "@/components/SignatureDishes";
import { StoryTeaser } from "@/components/StoryTeaser";
import { LocationCard } from "@/components/LocationCard";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { getVisibleLocations } from "@/content/locations";
import { locationSchema } from "@/lib/schema";
import { restaurant } from "@/content/restaurant";

export const metadata: Metadata = {
  title: "La Parrilla — Mexican Restaurant in Los Angeles",
  description:
    "Family-owned since 1978. Molcajetes, parrilladas, and handmade tortillas in Boyle Heights and on Wilshire, Los Angeles.",
  alternates: { canonical: "/" },
};

export default function Home() {
  const locations = getVisibleLocations();

  return (
    <>
      {locations.map((loc) => (
        <JsonLd key={loc.slug} data={locationSchema(loc)} />
      ))}

      <Hero />
      <SignatureDishes />
      <StoryTeaser />

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <h2 className="font-display text-4xl text-ink sm:text-5xl">Where to find us</h2>
        <p className="mt-3 max-w-2xl font-body text-base text-ink/70">
          Two addresses in Los Angeles. Hours vary — call ahead if you&apos;re
          making the trip.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {locations.map((loc) => (
            <LocationCard key={loc.slug} location={loc} />
          ))}
        </div>
      </section>

      <section className="bg-basalt py-14 text-plaster sm:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl sm:text-4xl">Feeding a table of twenty or a table of two?</h2>
          <p className="mx-auto mt-3 max-w-xl font-body text-plaster/80">
            {restaurant.cateringNote}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/catering" variant="secondary">
              Catering
            </Button>
            <Link
              href="/menu"
              className="inline-flex min-h-[44px] items-center justify-center border border-plaster/40 px-6 py-3 font-utility text-xs uppercase tracking-widest text-plaster hover:border-plaster"
            >
              Full menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
