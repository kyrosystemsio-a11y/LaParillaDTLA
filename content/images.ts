// Every image slot on the site, defined once here. Swap the `src` values for
// real photography — see /public/images/README.md for the full shot list
// and target dimensions.

export interface ImageSlot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const images = {
  heroBoyleHeights: {
    src: "/images/hero-boyle-heights.svg",
    alt: "The dining room at La Parrilla's original Boyle Heights location, strung with papel picado.",
    width: 1600,
    height: 2000,
  },
  heroWilshireBuilding: {
    src: "/images/wilshire-building.svg",
    alt: "The 1905 wood-frame building on Wilshire Boulevard that has housed La Parrilla since 1996.",
    width: 1600,
    height: 1200,
  },
  molcajete: {
    src: "/images/molcajete-pancho-villa.svg",
    alt: "A stone molcajete of chicken, beef, shrimp, panela cheese, and cactus, served smoking hot.",
    width: 1200,
    height: 1200,
  },
  comal: {
    src: "/images/comal-tortillas.svg",
    alt: "Handmade tortillas on the comal.",
    width: 1200,
    height: 1200,
  },
  brasero: {
    src: "/images/parrillada-brasero.svg",
    alt: "A Parrilladas Brasero mixed grill for two, fresh off the fire.",
    width: 1200,
    height: 1200,
  },
  chaplinWall: {
    src: "/images/chaplin-memorabilia.svg",
    alt: "Charlie Chaplin photographs and memorabilia on the wall at the Wilshire location.",
    width: 1200,
    height: 1500,
  },
  mariachi: {
    src: "/images/mariachi-boyle-heights.svg",
    alt: "Mariachi performing tableside at the Boyle Heights location.",
    width: 1200,
    height: 1200,
  },
  guacamole: {
    src: "/images/guacamole.svg",
    alt: "Fresh guacamole made to order.",
    width: 1200,
    height: 1200,
  },
  bar: {
    src: "/images/bar-margaritas.svg",
    alt: "The bar at La Parrilla, set for margaritas.",
    width: 1200,
    height: 1200,
  },
  exteriorBoyleHeights: {
    src: "/images/exterior-boyle-heights.svg",
    alt: "The street-facing exterior of La Parrilla in Boyle Heights.",
    width: 1200,
    height: 900,
  },
  exteriorWilshire: {
    src: "/images/exterior-wilshire.svg",
    alt: "The exterior of the 1905 building at 1300 Wilshire Blvd.",
    width: 1200,
    height: 900,
  },
  cateringSpread: {
    src: "/images/catering-spread.svg",
    alt: "A catering spread of tacos, rice, and beans.",
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
