"use client";

import { usePathname } from "next/navigation";
import { getAnchorLocation, getVisibleLocations } from "@/content/locations";

// Sticky bottom bar, mobile only: the fastest path from "on the sidewalk"
// to calling or getting directions. Shows the location whose page you're
// on; falls back to the anchor location (Boyle Heights) everywhere else.
export function MobileActionBar() {
  const pathname = usePathname();
  const locations = getVisibleLocations();
  const matched = locations.find((l) => pathname?.startsWith(`/locations/${l.slug}`));
  const active = matched ?? getAnchorLocation();
  if (!active) return null;

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(active.mapsQuery)}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-ink/15 bg-ink text-plaster lg:hidden">
      <a
        href={`tel:${active.phoneHref}`}
        className="flex min-h-[52px] flex-1 items-center justify-center gap-2 border-r border-plaster/15 font-utility text-xs uppercase tracking-widest"
      >
        Call {active.shortName}
      </a>
      <a
        href={mapsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[52px] flex-1 items-center justify-center gap-2 font-utility text-xs uppercase tracking-widest"
      >
        Directions
      </a>
    </div>
  );
}
