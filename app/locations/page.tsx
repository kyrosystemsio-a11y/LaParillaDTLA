import type { Metadata } from "next";
import { getVisibleLocations } from "@/content/locations";
import { LocationCard } from "@/components/LocationCard";
import { JsonLd } from "@/components/JsonLd";
import { locationSchema } from "@/lib/schema";

// This page does list both locations, so both are still named. What changed is
// that it no longer reads as an invitation to turn up at either: "Find ... in"
// implied two rooms with settled hours, while Wilshire's status is
// 'unconfirmed'. The caution reuses wording already rendered on the home page
// and on the Wilshire detail page rather than introducing a new claim. Revisit
// if Wilshire's status in `content/locations.ts` ever changes.
const LOCATIONS_DESCRIPTION =
  "Addresses and phone numbers for La Parrilla in Los Angeles — Boyle Heights and Wilshire. Hours vary by location; call ahead before you go.";

export const metadata: Metadata = {
  title: "Locations",
  description: LOCATIONS_DESCRIPTION,
  alternates: { canonical: "/locations" },
  // Without these the page inherited the root layout's OpenGraph block, so a
  // shared link previewed as the home page and advertised the home page URL.
  // `images` has to be restated: declaring `openGraph` on a segment detaches
  // the root opengraph-image file, which would leave this page with no share
  // image at all.
  openGraph: {
    title: "Locations — La Parrilla",
    description: LOCATIONS_DESCRIPTION,
    url: "/locations",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
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
