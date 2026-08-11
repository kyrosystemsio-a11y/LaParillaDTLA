import type { Metadata } from "next";
import { getVisibleLocations } from "@/content/locations";
import { LocationCard } from "@/components/LocationCard";
import { JsonLd } from "@/components/JsonLd";
import { locationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find La Parrilla in Boyle Heights and on Wilshire in Los Angeles.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  const locations = getVisibleLocations();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {locations.map((loc) => (
        <JsonLd key={loc.slug} data={locationSchema(loc)} />
      ))}
      <h1 className="font-display text-5xl text-ink sm:text-6xl">Locations</h1>
      <p className="mt-3 max-w-xl font-body text-ink/70">
        Pick the room that&apos;s closest. Boyle Heights is the original;
        Wilshire sits in a building from 1905.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {locations.map((loc) => (
          // These cards sit directly under the page h1, so they carry h2.
          <LocationCard key={loc.slug} location={loc} headingLevel={2} />
        ))}
      </div>
    </div>
  );
}
