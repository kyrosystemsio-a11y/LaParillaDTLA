import Link from "next/link";
import type { Location } from "@/content/locations";
import { StatusBadge } from "@/components/StatusBadge";
import { HoursBlock } from "@/components/HoursBlock";

export function LocationCard({ location }: { location: Location }) {
  return (
    <article className="flex flex-col border border-ink/15 bg-plaster p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-utility text-xs uppercase tracking-widest text-ink/70">
            {location.isOriginal ? "Original, since 1978" : `Since ${location.foundedYear}`}
          </p>
          <h3 className="mt-1 font-display text-3xl text-ink">{location.shortName}</h3>
        </div>
        <StatusBadge status={location.status} />
      </div>

      <p className="mt-4 font-body text-sm leading-relaxed text-ink/75">{location.story}</p>

      <div className="mt-5 font-body text-sm text-ink/80">
        <p>{location.address.street}</p>
        <p>
          {location.address.city}, {location.address.state} {location.address.zip}
        </p>
        <a href={`tel:${location.phoneHref}`} className="mt-1 inline-block text-ember hover:underline">
          {location.phone}
        </a>
      </div>

      <div className="mt-5">
        <HoursBlock location={location} />
      </div>

      <Link
        href={`/locations/${location.slug}`}
        className="mt-6 inline-flex min-h-[44px] items-center font-utility text-xs uppercase tracking-widest text-basalt underline underline-offset-4 hover:text-basalt-dark"
      >
        Full details →
      </Link>
    </article>
  );
}
