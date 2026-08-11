import { restaurant } from "@/content/restaurant";
import { site } from "@/content/site";
import { social } from "@/content/social";
import { type Location } from "@/content/locations";

const dayMap: Record<string, string> = {
  Mon: "Monday",
  Tue: "Tuesday",
  Wed: "Wednesday",
  Thu: "Thursday",
  Fri: "Friday",
  Sat: "Saturday",
  Sun: "Sunday",
};

// Emits Restaurant JSON-LD for a single location. Hours are only ever
// included for 'open' or 'limited' locations — 'unconfirmed' locations get
// every other field but no openingHoursSpecification, matching the rule
// that unconfirmed hours must never be published.
export function locationSchema(location: Location) {
  const sameAs = [
    social.instagramBrand.url,
    location.slug === "wilshire" ? social.instagramWilshire.url : null,
    social.facebook.url,
  ].filter((v): v is string => Boolean(v));

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: location.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address.street,
      addressLocality: location.address.city,
      addressRegion: location.address.state,
      postalCode: location.address.zip,
      addressCountry: "US",
    },
    telephone: location.phone,
    servesCuisine: restaurant.cuisine,
    priceRange: restaurant.priceRange,
    url: `${site.url}/locations/${location.slug}`,
    ...(restaurant.onlineOrderVerified
      ? { hasMenu: `${site.url}/menu`, menu: `${site.url}/menu` }
      : { hasMenu: `${site.url}/menu` }),
    ...(sameAs.length ? { sameAs } : {}),
  };

  if (location.status === "open" || location.status === "limited") {
    schema.openingHoursSpecification = location.hours
      .filter((h) => h.open && h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${dayMap[h.day]}`,
        opens: to24h(h.open as string),
        closes: to24h(h.close as string),
      }));
  }

  return schema;
}

function to24h(time: string): string {
  const match = time.match(/(\d+):(\d+)(am|pm)/i);
  if (!match) return time;
  const [, h, m, ap] = match;
  let hour = parseInt(h, 10);
  if (ap.toLowerCase() === "pm" && hour !== 12) hour += 12;
  if (ap.toLowerCase() === "am" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${m}`;
}
