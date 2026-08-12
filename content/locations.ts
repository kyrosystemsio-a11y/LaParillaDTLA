// The single flag that reconfigures the whole site. Flip `status` and every
// page, nav entry, sitemap row, and JSON-LD block reacts automatically.
export type LocationStatus = "open" | "limited" | "unconfirmed" | "closed";

export interface DayHours {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  open: string | null; // null = closed that day
  close: string | null;
}

export interface Location {
  slug: string;
  name: string;
  shortName: string;
  status: LocationStatus;
  isOriginal: boolean;
  foundedYear: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  neighborhood?: string;
  phone: string; // display format
  phoneHref: string; // tel: format
  // Hours are only ever rendered when status is 'open' or 'limited'.
  // For 'unconfirmed' locations this data exists but must never be published.
  hours: DayHours[];
  hoursSourceNote: string;
  mariachi: boolean;
  story: string;
  // Search-result copy for this location's detail page. Verified facts only —
  // and never hours, and never anything implying an 'unconfirmed' location is
  // currently open.
  metaDescription: string;
  mapsQuery: string;
}

export const locations: Location[] = [
  {
    slug: "boyle-heights",
    name: "La Parrilla — Boyle Heights",
    shortName: "Boyle Heights",
    status: "open",
    isOriginal: true,
    foundedYear: 1978,
    address: {
      street: "2126 E Cesar E Chavez Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90033",
    },
    neighborhood: "Boyle Heights",
    phone: "(323) 262-3434",
    phoneHref: "+13232623434",
    hours: [
      { day: "Mon", open: "9:00am", close: "8:00pm" },
      { day: "Tue", open: "9:00am", close: "8:00pm" },
      { day: "Wed", open: "9:00am", close: "8:00pm" },
      { day: "Thu", open: "9:00am", close: "8:00pm" },
      { day: "Fri", open: "9:00am", close: "9:00pm" },
      { day: "Sat", open: "9:00am", close: "9:00pm" },
      { day: "Sun", open: "9:00am", close: "8:00pm" },
    ],
    hoursSourceNote: "Per Yelp, updated June 2026.",
    mariachi: true,
    // Card blurb. Deliberately leaves mariachi out — the location page renders
    // that separately off the `mariachi` flag, and saying it in both places
    // reads as padding.
    story:
      "The original location, run by the same family since 1978.",
    metaDescription:
      "La Parrilla in Boyle Heights — the original, family-owned since 1978. Molcajetes, parrilladas, and handmade tortillas on Cesar E Chavez Ave, Los Angeles. Call (323) 262-3434.",
    mapsQuery: "2126 E Cesar E Chavez Ave, Los Angeles, CA 90033",
  },
  {
    slug: "wilshire",
    name: "La Parrilla — Wilshire",
    shortName: "Wilshire",
    status: "unconfirmed",
    isOriginal: false,
    foundedYear: 1996,
    address: {
      street: "1300 Wilshire Blvd",
      city: "Los Angeles",
      state: "CA",
      zip: "90017",
    },
    neighborhood: "Westlake / Downtown LA",
    phone: "(213) 353-4980",
    phoneHref: "+12133534980",
    // Stored but withheld from the page while status is 'unconfirmed'.
    // Source: Yelp, Aug 2026. Do not publish until status flips to 'limited' or 'open'.
    hours: [
      { day: "Mon", open: null, close: null },
      { day: "Tue", open: null, close: null },
      { day: "Wed", open: "11:00am", close: "5:00pm" },
      { day: "Thu", open: "11:00am", close: "5:00pm" },
      { day: "Fri", open: "11:00am", close: "6:00pm" },
      { day: "Sat", open: "11:00am", close: "6:00pm" },
      { day: "Sun", open: "11:00am", close: "6:00pm" },
    ],
    hoursSourceNote: "Per Yelp, Aug 2026 — withheld pending owner confirmation.",
    mariachi: false,
    // Card blurb. Carries no hours message — HoursBlock owns that, and it
    // renders directly beneath this on both the card and the location page.
    // Carries no geography either; the address and `neighborhood` above say it.
    // The building's specifics belong to BuildingNote and StoryTeaser.
    story:
      "The family's second location, in a building with more history than the restaurant.",
    // The search result is the first thing most people see, so the caution
    // that the page carries has to be in here too — not just on the page.
    // Status is 'unconfirmed': this must not read as an open restaurant.
    metaDescription:
      "La Parrilla on Wilshire — the family's second Mexican restaurant, in a 1905 building in Westlake, Los Angeles. Molcajetes and parrilladas. Hours here have been changing; call ahead before you go.",
    mapsQuery: "1300 Wilshire Blvd, Los Angeles, CA 90017",
  },
];

export function getVisibleLocations(): Location[] {
  return locations.filter((l) => l.status !== "closed");
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug && l.status !== "closed");
}

/**
 * The location that site-wide "call us" actions should point at.
 *
 * Prefers the original location, and only falls back to a location whose hours
 * we cannot confirm if there is genuinely nothing else open. Every component
 * that needs a default phone number must use this, so a status change can
 * never leave one call site advertising an `unconfirmed` location while the
 * others point elsewhere.
 */
export function getAnchorLocation(): Location | undefined {
  const visible = getVisibleLocations();
  return (
    visible.find((l) => l.isOriginal) ??
    visible.find((l) => l.status === "open") ??
    visible[0]
  );
}
