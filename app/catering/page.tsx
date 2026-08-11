import type { Metadata } from "next";
import Image from "next/image";
import { restaurant } from "@/content/restaurant";
import { images } from "@/content/images";
import { social } from "@/content/social";
import { Button } from "@/components/Button";
import { getVisibleLocations } from "@/content/locations";

export const metadata: Metadata = {
  title: "Catering",
  description: "Catering inquiries for La Parrilla — call, email, or DM to talk through your event.",
  alternates: { canonical: "/catering" },
};

export default function CateringPage() {
  const locations = getVisibleLocations();

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
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${restaurant.cateringEmailPlaceholder}`}>Email us</Button>
            <Button href={social.instagramBrand.url} variant="ghost">
              DM on Instagram
            </Button>
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
            <h2 className="font-display text-2xl text-ink">{loc.shortName}</h2>
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
