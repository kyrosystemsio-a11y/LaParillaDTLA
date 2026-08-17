export const site = {
  name: "La Parrilla",
  title: "La Parrilla — Mexican Restaurant in Los Angeles",
  // Names only the location whose status is 'open'. This string reaches every
  // route — it is the root description, the OpenGraph description on any page
  // that does not declare its own, and the Twitter description everywhere — so
  // naming Wilshire here advertised an operating restaurant 13 times over while
  // the rest of the site withholds that location's hours and tells visitors to
  // call ahead. Revisit this wording if Wilshire's status in
  // `content/locations.ts` ever changes.
  description:
    "Family-owned since 1978. Molcajetes, parrilladas, and handmade tortillas in Boyle Heights, Los Angeles.",
  // Set NEXT_PUBLIC_SITE_URL in your environment for correct canonical/OG URLs in production.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.laparrillala.com",
  keywords: [
    "La Parrilla Los Angeles",
    "Mexican restaurant downtown LA",
    "Mexican restaurant Boyle Heights",
    "parrillada Los Angeles",
    "molcajete Los Angeles",
    "handmade tortillas LA",
  ],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our story" },
  { href: "/locations", label: "Locations" },
  { href: "/catering", label: "Catering" },
] as const;
