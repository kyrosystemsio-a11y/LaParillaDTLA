import Image from "next/image";
import { images } from "@/content/images";
import { restaurant } from "@/content/restaurant";

// The canonical, deepest telling of the Wilshire building story. Used on
// /about only. The home page gets StoryTeaser; the Wilshire location page
// gets BuildingNote. All three read their prose from the content layer so
// no page reprints another.
export function ChaplinSpotlight() {
  const { full } = restaurant.wilshireBuildingStory;

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
            {full.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
            {full.headline}
          </h2>
          <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-plaster/85">
            {full.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="ticket-edge h-3 rotate-180 bg-ink" aria-hidden="true" />
    </section>
  );
}
