// Verified prices only, from the restaurant's Ritual ordering page.
// Do not alter a price or description. Do not add items.

export interface MenuItem {
  name: string;
  description?: string;
  price: string; // formatted, e.g. "$13.95"
  signature?: boolean;
}

export interface MenuCategory {
  slug: string;
  name: string;
  note?: string;
  /**
   * Marks a house-defining section for slightly heavier visual treatment.
   * Keep this to a genuine few — if most categories are signature, none are.
   */
  signature?: boolean;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    slug: "to-start",
    name: "To start",
    items: [
      { name: "Queso Fundido with Rajas Poblanas", price: "$11.95" },
      { name: "Queso Fundido with Chorizo", price: "$12.95" },
      { name: "Queso Fundido with Camarones", price: "$13.95" },
      {
        name: "Huesos Botanas",
        description: "BBQ spare ribs — a house specialty.",
        price: "$13.95",
      },
      { name: "Quesadillas del Comal", price: "$10.95" },
      {
        name: "Sopitos",
        description: "Four thin sopitos, beans, chorizo, ranchero cheese.",
        price: "$12.95",
      },
    ],
  },
  {
    slug: "festival-gourmet",
    name: "Festival Gourmet",
    note: "Entrées, most served with soup, rice, and beans.",
    items: [
      {
        name: "Enchiladas Poblanas",
        description: "Homemade mole.",
        price: "$13.95",
      },
      { name: "Chile Verde", description: "Pork in green sauce.", price: "$13.95" },
      { name: "Carne Asada", description: "Grilled steak.", price: "$13.95" },
      { name: "Enchiladas", price: "$12.95" },
      { name: "Enchiladas Suizas", price: "$13.95" },
      { name: "Enchilada y Taco", price: "$12.95" },
      {
        name: "Enchiladas Carmelita",
        description: "Green sauce, shrimp, mushrooms.",
        price: "$13.95",
      },
      { name: "Chimichangas", price: "$12.95" },
      { name: "Three Taquitos", price: "$12.95" },
      { name: "Chile Relleno with Enchilada", price: "$13.95" },
      { name: "Chile Relleno with Taco", price: "$13.95" },
      { name: "Two Tacos Dorados", price: "$12.95" },
      { name: "Piramide Tostada", price: "$12.95" },
      { name: "Las Gemelas", description: "Two tostadas.", price: "$12.95" },
    ],
  },
  {
    slug: "whats-new",
    name: "What's new",
    items: [
      { name: "Tacos al Carbon Plate", price: "$14.95" },
      { name: "Steak Picado", price: "$13.95" },
      { name: "Pollito en Mole", price: "$14.95" },
      { name: "Pechuga Campesina", price: "$14.95" },
      { name: "Filete a la Tampiqueña", price: "$16.95" },
      { name: "Milanesa Acapulqueña", price: "$13.95" },
      { name: "Platón del Patrón", price: "$16.95" },
      { name: "Huarachito Tizoc", price: "$16.95" },
      { name: "Huarachito Moctezuma", price: "$15.95" },
    ],
  },
  {
    slug: "mary-carmen-creations",
    name: "Mary Carmen Creations",
    note: "Molcajetes — served hot, straight from the stone.",
    signature: true,
    items: [
      { name: "Molcajete Azteca", description: "For two.", price: "$35.95" },
      {
        name: "Molcajete del Señor Pancho Villa",
        description:
          "For two — chicken, beef, shrimp, panela cheese, and cactus, served in a hot stone molcajete with a bucket of four Coronitas.",
        price: "$45.95",
        signature: true,
      },
      { name: "Molcajete Arriero", description: "For two.", price: "$35.95" },
    ],
  },
  {
    slug: "parrilladas-brasero",
    name: "Parrilladas Brasero",
    note: "Mixed grills for two.",
    signature: true,
    items: [
      {
        name: "Brasero 1",
        description: "Tripitas, carne asada, chicken.",
        price: "$36.95",
      },
      {
        name: "Brasero 2",
        description: "Carne asada, chicken, pork chop.",
        price: "$36.95",
      },
      {
        name: "Brasero 3",
        description: "Spare rib, chorizo, carne asada, queso fundido.",
        price: "$36.95",
      },
      {
        name: "Veracruz 4",
        description: "Shrimp, fish, scallops, octopus, cheese.",
        price: "$36.95",
      },
    ],
  },
  {
    slug: "parrilladas",
    name: "Parrilladas",
    items: [
      { name: "Arrachera Campesina", price: "$16.95" },
      { name: "Chef's Inspiration Benito Plate", price: "$16.95" },
      { name: "Carne Asada with shrimp", price: "$16.95" },
      { name: "Chicken Breast with shrimp", price: "$16.95" },
      { name: "Codorniz", description: "Cornish hen.", price: "$13.95" },
      { name: "La Tablita", price: "$16.95" },
    ],
  },
  {
    slug: "cocteles-caldos",
    name: "Cócteles & Caldos",
    items: [
      { name: "Shrimp Cóctel", price: "$13.95" },
      { name: "Octopus Cóctel", price: "$13.95" },
      { name: "Campechana", price: "$13.95" },
      { name: "Ceviche", price: "$13.95" },
      { name: "Ceviche Mixto", price: "$14.95" },
      { name: "Caldo de Pescado", price: "$14.95" },
      { name: "Caldo de Camarones", price: "$13.95" },
      { name: "Caldo Siete Mares", price: "$19.95" },
    ],
  },
  {
    slug: "seafood",
    name: "Seafood specialties",
    items: [
      { name: "Camarones", price: "$16.95" },
      { name: "Pescado Entero", description: "Whole red snapper.", price: "$50.00" },
      { name: "Filete de Pescado", price: "$13.95" },
      {
        name: "Camarones Costa Azul",
        description: "Bacon-wrapped, stuffed.",
        price: "$17.95",
      },
      { name: "Fish Filet Los Cabos", price: "$17.95" },
    ],
  },
  {
    slug: "street-tacos",
    name: "Street tacos",
    items: [
      { name: "Carnitas", price: "$12.95" },
      { name: "Cochinita Pibil", price: "$11.95" },
      { name: "Campechanos", price: "$13.95" },
    ],
  },
  {
    slug: "fajitas",
    name: "Fajitas",
    note: "On a sizzling comal.",
    items: [
      { name: "Chicken", price: "$30.95" },
      { name: "Beef", price: "$30.95" },
      { name: "Shrimp", price: "$32.95" },
      { name: "Combo", price: "$34.95" },
    ],
  },
  {
    slug: "burritos",
    name: "Burritos",
    items: [
      { name: "Carnitas", price: "$11.95" },
      { name: "Shrimp", price: "$12.95" },
      { name: "Asada", price: "$12.95" },
      { name: "Grilled Chicken", price: "$11.95" },
    ],
  },
  {
    slug: "para-los-ninos",
    name: "Para los niños",
    note: "Served with rice and beans.",
    items: [
      { name: "Burrito", price: "$10.95" },
      { name: "Enchilada", price: "$10.95" },
      { name: "Taquitos", price: "$10.95" },
      { name: "Quesadilla", price: "$10.95" },
    ],
  },
  {
    slug: "desserts",
    name: "Desserts",
    items: [
      { name: "Flan", price: "$5.95" },
      { name: "Nieve Frita", price: "$5.95" },
      { name: "Plátanos Fritos", price: "$5.95" },
      { name: "Pastel de Tres Leches", price: "$5.95" },
      { name: "Cheesecake", price: "$5.95" },
    ],
  },
  {
    slug: "non-alcoholic",
    name: "Non-alcoholic",
    items: [
      { name: "Jarritos", price: "$2.95" },
      { name: "Soda", price: "$2.50" },
      { name: "Milk", price: "$2.75" },
      { name: "Aguas Frescas", price: "$2.75" },
      { name: "Horchata", price: "" },
      { name: "Coffee", price: "$2.50" },
      { name: "Café de Olla", price: "$3.50" },
      { name: "Hot Tea", price: "$2.25" },
      { name: "Fresh Orange Juice", price: "$4.95" },
    ],
  },
];

export const barInfo = {
  name: "Bar",
  description:
    "Full bar. Margaritas — by the glass or the pitcher. Mexican and domestic beer, including Corona, Negra Modelo, and Coronitas by the bucket. Sangria. Micheladas.",
  priceNote: "No posted cocktail prices — ask your server.",
};
