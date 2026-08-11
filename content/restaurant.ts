// Brand-level facts. Everything here is verified — do not add unverified claims.

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
  wilshireBuildingStory: {
    yearBuilt: 1905,
    originalStreetName: "Orange Street",
    formerOwner: "Charles Chapman",
    formerOwnerBusiness: "Chapman Market at Sixth and Alexandria",
    designation: "LA Conservancy-recognized Legacy Business",
    chaplinNote:
      "Charlie Chaplin memorabilia fills the dining room — the story goes that it started with a name mix-up between \"Chapman\" and \"Chaplin,\" and the tribute stuck.",
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
