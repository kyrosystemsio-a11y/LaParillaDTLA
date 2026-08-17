// Brand-level facts. Everything here is verified — do not add unverified claims.

// The structured facts about 1300 Wilshire, declared once so the prose below
// interpolates them instead of retyping them. If a value is ever corrected,
// every sentence on the site that uses it changes with it.
const wilshireBuilding = {
  yearBuilt: 1905,
  originalStreetName: "Orange Street",
  formerOwner: "Charles Chapman",
  formerOwnerBusiness: "Chapman Market at Sixth and Alexandria",
  designation: "LA Conservancy-recognized Legacy Business",
  // The source reports the Chapman/Chaplin mix-up as an account, not as
  // documented history. Every retelling below therefore keeps a hedge
  // ("as the story is told"). Do not remove it when editing for voice.
  chaplinNote:
    "Charlie Chaplin memorabilia fills the dining room — the story goes that it started with a name mix-up between \"Chapman\" and \"Chaplin,\" and the tribute stuck.",
} as const;

export const restaurant = {
  name: "La Parrilla",
  legalPositioning: "Authentic Mexican food. Parrilladas and molcajetes.",
  owner: "Maria del Carmen (\"Mary Carmen\") Salas/Salinas",
  ownerNote:
    "Several menu items are billed as \"Mary Carmen Creations.\"",
  founded: {
    boyleHeights: 1978,
    wilshire: 1996,
    // Sources conflict: the LA Conservancy building profile cites 1978 for the
    // Wilshire building; the family's own Facebook post describes Wilshire as
    // the second location, opened 1996. We treat Boyle Heights (1978) as the
    // original and Wilshire (1996) as the second location. Needs owner
    // confirmation — see Owner Verification Checklist.
    note:
      "Boyle Heights opened first, in 1978. Wilshire followed as the family's second location.",
  },
  familyOwned: true,
  cuisine: "Mexican",
  priceRange: "$$",
  // The Wilshire building story. Every fact below traces to the LA Conservancy
  // building profile. It is told at three depths so no page reprints another:
  //   teaser       → home page, the curiosity hook
  //   full         → /about, the canonical version
  //   locationNote → /locations/wilshire, why it matters at that address
  // Note what is deliberately NOT claimed: we do not date the Chapman/Chaplin
  // mix-up (no source gives a date) and we do not say who first hung the
  // photographs (no source says). Do not add either.
  wilshireBuildingStory: {
    ...wilshireBuilding,

    teaser: {
      eyebrow: "The Wilshire dining room",
      headline: `A house built in ${wilshireBuilding.yearBuilt}, on a street that isn't there anymore.`,
      body: `Wilshire was still called ${wilshireBuilding.originalStreetName} back then. Inside, there's a wall of Charlie Chaplin photographs — and the reason for them isn't the one you'd guess.`,
      ctaLabel: "Read the story",
    },

    full: {
      // Used as a bare label, which asserts nothing about *what* carries the
      // designation. Do not expand it into a sentence — see the note on
      // `designation` above.
      eyebrow: wilshireBuilding.designation,
      headline: "The Chaplin wall, and how it got there.",
      paragraphs: [
        `The building at 1300 Wilshire went up in ${wilshireBuilding.yearBuilt}, back when that stretch of the boulevard was still called ${wilshireBuilding.originalStreetName}. It's one of the oldest structures left standing on Wilshire, and it once belonged to ${wilshireBuilding.formerOwner} — the man behind ${wilshireBuilding.formerOwnerBusiness}.`,
        `As the story is told, Chapman got heard as Chaplin somewhere along the way. However it started, the photographs are still up: a Mexican restaurant with a Charlie Chaplin wall, from a mix-up over a name. The wall stays.`,
      ],
    },

    locationNote: {
      heading: "About this building",
      body: `This is a house from ${wilshireBuilding.yearBuilt} — one of the oldest left standing on Wilshire, from back when the street was still called ${wilshireBuilding.originalStreetName}. It belonged to ${wilshireBuilding.formerOwner}, of ${wilshireBuilding.formerOwnerBusiness}. As the story is told, the Charlie Chaplin photographs inside come from a mix-up between the two names.`,
    },
  },
  // Ordering / reservations
  onlineOrderUrl:
    "https://ritual.co/order/la-parrilla-restaurant-wilshire-witmer-los-angeles/75ec",
  // Verification of this URL was blocked in the build environment's network
  // sandbox (egress to ritual.co was refused before any response could be
  // read). Treat it as UNVERIFIED — confirm it resolves before launch, and
  // if it 404s, remove the "Order online" CTA and rely on phone/takeout only.
  onlineOrderVerified: false,
  reservationsPolicy: "phone-only" as const,
  takeout: true,
  // Delivery is unconfirmed across sources — do not publish a delivery claim.
  cateringOffered: true,
  cateringNote:
    "Catering is available. The fastest way to reach us is by phone, or send a DM on Instagram.",
  cateringEmailPlaceholder: "catering@laparrillala.com", // placeholder — owner to supply real address
  // The address above is a stand-in, not a working inbox. While this is false
  // the catering page renders no email CTA at all — an inquiry sent to an
  // address that does not exist is lost silently, which is worse than offering
  // no email. Set to true only once the owner supplies a real address (replace
  // the placeholder above at the same time); the CTA returns with no code change.
  cateringEmailVerified: false,
  signatureItems: [
    "Molcajete del Señor Pancho Villa",
    "Parrilladas Brasero mixed grills",
    "Fresh guacamole",
    "Queso fundido",
    "Handmade tortillas made on the comal",
  ],
  happyHour: {
    exists: true,
    sectionName: "La Hora Feliz Cantina",
    // Exact days/times/prices are unconfirmed — never publish specifics.
    note: "The cantina runs a happy hour. Call your location for current days and times.",
  },
  bar: {
    full: true,
    description:
      "A full bar: margaritas by the glass or the pitcher, Mexican and domestic beer, sangria, micheladas.",
  },
  amenities: [
    "Full bar",
    "TV",
    "Outdoor seating",
    "Good for groups",
    "Kid-friendly",
    "Casual dress",
    "Catering available",
    "Vegetarian options",
  ],
} as const;
