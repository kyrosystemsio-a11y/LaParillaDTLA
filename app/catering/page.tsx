import type { Metadata } from "next";
import Image from "next/image";
import { restaurant } from "@/content/restaurant";
import { images } from "@/content/images";
import { social } from "@/content/social";
import { Button } from "@/components/Button";
import { StatusBadge } from "@/components/StatusBadge";
import { getAnchorLocation, getVisibleLocations } from "@/content/locations";

const CATERING_DESCRIPTION =
  "Catering inquiries for La Parrilla — call, email, or DM to talk through your event.";

export const metadata: Metadata = {
  title: "Catering",
  description: CATERING_DESCRIPTION,
  alternates: { canonical: "/catering" },
  // Without these the page inherited the root layout's OpenGraph block, so a
  // shared catering link previewed as the home page and advertised the home
  // page URL — and a forwarded link is how most catering inquiries start.
  // `images` has to be restated: declaring `openGraph` on a segment detaches
  // the root opengraph-image file, which would leave this page with no share
  // image at all.
  openGraph: {
    title: "Catering — La Parrilla",
    description: CATERING_DESCRIPTION,
    url: "/catering",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

export default function CateringPage() {
  const locations = getVisibleLocations();
  // Same shared rule every other "call us" action on the site uses.
  const anchor = getAnchorLocation();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="font-utility text-xs uppercase tracking-widest text-ember">Catering</p>
          <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">
            Feeding your people, La Parrilla style.
          </h1>
          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-ink/75">
            {restaurant.cateringNote} Tell us the size of the crowd, the date,
            and what you&apos;re after, and we&apos;ll work out the rest with
            you directly.
          </p>
          {/* Phone leads because the copy above says it is the fastest way to
              reach us — it previously sat 494px below the fold at 390px while
              an unverified email address held the primary slot. The number
              comes from the anchor location, never hardcoded. Email returns
              automatically once `cateringEmailVerified` flips to true. */}
          <div className="mt-8 flex flex-wrap gap-3">
            {anchor && (
              <Button href={`tel:${anchor.phoneHref}`}>Call {anchor.phone}</Button>
            )}
            <Button href={social.instagramBrand.url} variant="ghost">
              DM on Instagram
            </Button>
            {restaurant.cateringEmailVerified && (
              <Button href={`mailto:${restaurant.cateringEmailPlaceholder}`} variant="ghost">
                Email us
              </Button>
            )}
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={images.cateringSpread.src}
            alt={images.cateringSpread.alt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-16 grid gap-6 border-t border-ink/10 pt-10 sm:grid-cols-2">
        {locations.map((loc) => (
          <div key={loc.slug}>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-2xl text-ink">{loc.shortName}</h2>
              {/* This page was the only surface listing an 'unconfirmed'
                  location with no qualification at all, which read as a
                  vouched-for intake channel. The badge is the same component
                  every other location listing uses, and it is driven by the
                  same `status` flag — it asserts nothing about whether this
                  location caters. Rendered only where there is uncertainty to
                  show, so the anchor location's treatment is unchanged. */}
              {loc.status !== "open" && <StatusBadge status={loc.status} />}
            </div>
            <a href={`tel:${loc.phoneHref}`} className="mt-1 inline-block font-body text-ember hover:underline">
              {loc.phone}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-xl font-body text-xs text-ink/70">
        We don&apos;t publish set catering packages or pricing — every event
        is different, and the fastest way to get a real answer is a call or a
        message.
      </p>
    </div>
  );
}
