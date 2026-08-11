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
    story:
      "The original house. Open since 1978, still run by the same family, still bringing the mariachi through the dining room.",
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
    story:
      "A 1905 house on what was once Orange Street, one of the oldest buildings standing on Wilshire Boulevard and a recognized Legacy Business. Call ahead — hours here have been changing.",
    mapsQuery: "1300 Wilshire Blvd, Los Angeles, CA 90017",
  },
];

export function getVisibleLocations(): Location[] {
  return locations.filter((l) => l.status !== "closed");
}

export function getLocationBySlug(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug && l.status !== "closed");
}
