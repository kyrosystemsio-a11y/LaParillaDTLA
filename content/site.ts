export const site = {
  name: "La Parrilla",
  title: "La Parrilla — Mexican Restaurant in Los Angeles",
  description:
    "Family-owned since 1978. Molcajetes, parrilladas, and handmade tortillas in Boyle Heights and on Wilshire.",
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
