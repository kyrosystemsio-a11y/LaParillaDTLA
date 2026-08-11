import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";
import { restaurant } from "@/content/restaurant";

// Home page only. The hook, not the story — one headline, two sentences, and
// a way through to /about, which carries the full telling.
export function StoryTeaser() {
  const { teaser } = restaurant.wilshireBuildingStory;

  return (
    <section className="bg-ink text-plaster">
      <div className="ticket-edge h-3 bg-ink" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
        <div>
          <p className="font-utility text-xs uppercase tracking-[0.2em] text-marigold">
            {teaser.eyebrow}
          </p>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight sm:text-5xl">
            {teaser.headline}
          </h2>
          <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-plaster/85">
            {teaser.body}
          </p>
          <Link
            href="/about"
            className="mt-7 inline-flex min-h-[44px] items-center font-utility text-xs uppercase tracking-widest text-marigold underline underline-offset-8 hover:text-plaster"
          >
            {teaser.ctaLabel} →
          </Link>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[4/5]">
          <Image
            src={images.chaplinWall.src}
            alt={images.chaplinWall.alt}
            fill
            sizes="(min-width: 1024px) 32vw, 90vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="ticket-edge h-3 rotate-180 bg-ink" aria-hidden="true" />
    </section>
  );
}
