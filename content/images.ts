// Every image slot on the site, defined once here. Swap the `src` values for
// real photography — see /public/images/README.md for the full shot list
// and target dimensions.
//
// The `alt` strings below describe PLACEHOLDER ART, because that is what is
// currently on screen. Every file in /public/images is generated abstract SVG
// that renders the words "PHOTO PLACEHOLDER" on its face; the alt text used to
// describe photographs that do not exist, so a sighted visitor saw a labelled
// placeholder while a screen-reader user was told the room was strung with
// papel picado. `next/image` renders these as <img alt="...">, which discards
// each SVG's own aria-label, so alt is the only accessible name a placeholder
// gets — and it was the only part of the system that was not honest.
//
// When a slot's `src` is swapped for real photography, ITS `alt` MUST BE
// REWRITTEN in the same edit to describe the actual photograph. The intended
// subject of each shot is recorded in /public/images/README.md; nothing here
// invents what a future photograph will show.

export interface ImageSlot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const images = {
  heroBoyleHeights: {
    src: "/images/hero-boyle-heights.svg",
    alt: "Placeholder image for a photograph of the Boyle Heights dining room.",
    width: 1600,
    height: 2000,
  },
  heroWilshireBuilding: {
    src: "/images/wilshire-building.svg",
    alt: "Placeholder image for a photograph of the 1905 building at 1300 Wilshire.",
    width: 1600,
    height: 1200,
  },
  molcajete: {
    src: "/images/molcajete-pancho-villa.svg",
    alt: "Placeholder image for a photograph of the Molcajete del Señor Pancho Villa.",
    width: 1200,
    height: 1200,
  },
  comal: {
    src: "/images/comal-tortillas.svg",
    alt: "Placeholder image for a photograph of handmade tortillas on the comal.",
    width: 1200,
    height: 1200,
  },
  brasero: {
    src: "/images/parrillada-brasero.svg",
    alt: "Placeholder image for a photograph of a Parrilladas Brasero mixed grill.",
    width: 1200,
    height: 1200,
  },
  chaplinWall: {
    src: "/images/chaplin-memorabilia.svg",
    alt: "Placeholder image for a photograph of the Chaplin memorabilia wall at the Wilshire location.",
    width: 1200,
    height: 1500,
  },
  mariachi: {
    src: "/images/mariachi-boyle-heights.svg",
    alt: "Placeholder image for a photograph of mariachi at the Boyle Heights location.",
    width: 1200,
    height: 1200,
  },
  guacamole: {
    src: "/images/guacamole.svg",
    alt: "Placeholder image for a photograph of guacamole.",
    width: 1200,
    height: 1200,
  },
  bar: {
    src: "/images/bar-margaritas.svg",
    alt: "Placeholder image for a photograph of the bar.",
    width: 1200,
    height: 1200,
  },
  exteriorBoyleHeights: {
    src: "/images/exterior-boyle-heights.svg",
    alt: "Placeholder image for a photograph of the La Parrilla exterior in Boyle Heights.",
    width: 1200,
    height: 900,
  },
  exteriorWilshire: {
    src: "/images/exterior-wilshire.svg",
    alt: "Placeholder image for a photograph of the exterior of the 1905 building at 1300 Wilshire Blvd.",
    width: 1200,
    height: 900,
  },
  cateringSpread: {
    src: "/images/catering-spread.svg",
    alt: "Placeholder image for a photograph of a catering spread.",
    width: 1200,
    height: 900,
  },
} as const satisfies Record<string, ImageSlot>;

// Per-location image assignments, keyed by location slug. Components look
// imagery up through here rather than branching on slug themselves, so adding
// or re-photographing a location never means editing a component.
const locationImageMap: Record<string, { card: ImageSlot; hero: ImageSlot }> = {
  "boyle-heights": {
    card: images.exteriorBoyleHeights,
    hero: images.heroBoyleHeights,
  },
  wilshire: {
    card: images.exteriorWilshire,
    hero: images.heroWilshireBuilding,
  },
};

// Returns undefined for an unmapped slug rather than substituting another
// location's photograph — showing the wrong restaurant is worse than showing
// none. `generateStaticParams` only builds known slugs, so this is a guard,
// not an expected path.
export function getLocationImages(slug: string): { card: ImageSlot; hero: ImageSlot } | undefined {
  return locationImageMap[slug];
}
