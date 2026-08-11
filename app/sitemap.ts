import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getVisibleLocations } from "@/content/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/menu", "/about", "/locations", "/catering"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const locationRoutes = getVisibleLocations().map((loc) => ({
    url: `${site.url}/locations/${loc.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...locationRoutes];
}
