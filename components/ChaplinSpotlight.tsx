import Image from "next/image";
import { images } from "@/content/images";
import { restaurant } from "@/content/restaurant";

export function ChaplinSpotlight() {
  const b = restaurant.wilshireBuildingStory;

  return (
    <section className="bg-ink text-plaster">
      <div className="ticket-edge h-3 bg-ink" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="relative aspect-[4/5] w-full max-w-md -rotate-1 overflow-hidden border-8 border-plaster shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]">
          <Image
            src={images.chaplinWall.src}
            alt={images.chaplinWall.alt}
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-utility text-xs uppercase tracking-[0.2em] text-marigold">
            {b.designation}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            A house built in {b.yearBuilt}, on a street that isn&apos;t there
            anymore.
          </h2>
          <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-plaster/85">
            <p>
              Before it was Wilshire Boulevard, this stretch was called{" "}
              {b.originalStreetName}. The building at 1300 went up in{" "}
              {b.yearBuilt} — it&apos;s one of the oldest structures still
              standing on Wilshire, and it once belonged to {b.formerOwner},
              who built {b.formerOwnerBusiness}.
            </p>
            <p>{b.chaplinNote}</p>
            <p>
              La Parrilla moved in as the family&apos;s second location, and
              kept the wall exactly as strange and wonderful as they found
              it.
            </p>
          </div>
        </div>
      </div>
      <div className="ticket-edge h-3 rotate-180 bg-ink" aria-hidden="true" />
    </section>
  );
}
