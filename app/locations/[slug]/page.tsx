import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocationBySlug, getVisibleLocations } from "@/content/locations";
import { StatusBadge } from "@/components/StatusBadge";
import { HoursBlock } from "@/components/HoursBlock";
import { Button } from "@/components/Button";
import { JsonLd } from "@/components/JsonLd";
import { locationSchema } from "@/lib/schema";
import { images } from "@/content/images";

export function generateStaticParams() {
  return getVisibleLocations().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};
  return {
    title: location.shortName,
    description: `${location.name} — ${location.address.street}, ${location.address.city}, ${location.address.state}. ${location.phone}.`,
    alternates: { canonical: `/locations/${location.slug}` },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapsQuery)}`;
  const image = location.slug === "wilshire" ? images.heroWilshireBuilding : images.heroBoyleHeights;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd data={locationSchema(location)} />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <StatusBadge status={location.status} />
          </div>
          <h1 className="mt-4 font-display text-5xl text-ink sm:text-6xl">{location.shortName}</h1>
          <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink/75">
            {location.story}
          </p>

          <div className="mt-8 font-body text-base text-ink/85">
            <p>{location.address.street}</p>
            <p>
              {location.address.city}, {location.address.state} {location.address.zip}
            </p>
            {location.neighborhood && (
              <p className="mt-1 text-sm text-ink/70">{location.neighborhood}</p>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={`tel:${location.phoneHref}`}>Call {location.phone}</Button>
            <Button href={mapsHref} variant="ghost">
              Directions
            </Button>
          </div>

          <div className="mt-8">
            <HoursBlock location={location} />
          </div>

          {location.mariachi && (
            <p className="mt-6 font-body text-sm text-ink/70">
              Live mariachi is a regular part of the room here.
            </p>
          )}
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
