import Image from "next/image";
import Link from "next/link";
import type { Location } from "@/content/locations";
import { getLocationImages } from "@/content/images";
import { StatusBadge } from "@/components/StatusBadge";
import { HoursBlock } from "@/components/HoursBlock";

/**
 * `headingLevel` keeps the document outline correct wherever the card is used:
 * h3 under a section heading (the home page), h2 when the cards sit directly
 * beneath the page's h1 (the locations index).
 */
export function LocationCard({
  location,
  headingLevel = 3,
}: {
  location: Location;
  headingLevel?: 2 | 3;
}) {
  const image = getLocationImages(location.slug)?.card;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  // Same construction the location detail page uses — derived from the
  // content layer, never a hardcoded address or map URL.
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapsQuery)}`;

  return (
    <article className="flex flex-col border border-ink/15 bg-plaster">
      {image && (
        // Height is capped at `lg`: unconstrained, the 4:3 crop grew to 404px
        // on a 1440x900 screen — 45% of the fold — and pushed the hours table
        // off it entirely. The aspect ratio still drives the box below `lg`.
        <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:h-[280px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-utility text-xs uppercase tracking-widest text-ink/70">
              {location.isOriginal ? "Original, since 1978" : `Since ${location.foundedYear}`}
            </p>
            <Heading className="mt-1 font-display text-3xl text-ink">
              {location.shortName}
            </Heading>
          </div>
          <StatusBadge status={location.status} />
        </div>

        <p className="mt-4 font-body text-sm leading-relaxed text-ink/75">{location.story}</p>

        <div className="mt-5 font-body text-sm text-ink/80">
          <p>{location.address.street}</p>
          <p>
            {location.address.city}, {location.address.state} {location.address.zip}
          </p>
          {/* min-h keeps this above the 24px target minimum; it was a 20px
              inline link, the smallest target on the locations page and its
              primary conversion action. Typography is unchanged. */}
          <a
            href={`tel:${location.phoneHref}`}
            className="mt-1 inline-flex min-h-[24px] items-center text-ember hover:underline"
          >
            {location.phone}
          </a>
        </div>

        <div className="mt-5">
          <HoursBlock location={location} />
        </div>

        {/* mt-auto keeps both cards' CTAs on the same line even though one
            card carries an hours table and the other does not.
            Directions lives on the card because the sticky action bar only
            ever points at the anchor location — without this, the non-anchor
            location had no directions affordance short of opening its own
            page. It uses that location's own mapsQuery. */}
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-1 pt-6">
          <Link
            href={`/locations/${location.slug}`}
            className="inline-flex min-h-[44px] items-center font-utility text-xs uppercase tracking-widest text-basalt underline underline-offset-4 hover:text-basalt-dark"
          >
            Full details →
          </Link>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center font-utility text-xs uppercase tracking-widest text-basalt underline underline-offset-4 hover:text-basalt-dark"
          >
            Directions
          </a>
        </div>
      </div>
    </article>
  );
}
