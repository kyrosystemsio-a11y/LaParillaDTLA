import Image from "next/image";
import { images } from "@/content/images";
import { Button } from "@/components/Button";
import { getVisibleLocations } from "@/content/locations";

export function Hero() {
  const anchor = getVisibleLocations().find((l) => l.isOriginal);

  return (
    <section className="relative overflow-hidden border-b border-ink/10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20">
        <div className="order-2 lg:order-1">
          <p className="font-utility text-xs uppercase tracking-[0.2em] text-ember">
            Los Angeles, since 1978
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.02] text-ink sm:text-6xl lg:text-7xl">
            Mexican food, cooked over the fire, since the family opened the
            door.
          </h1>
          <p className="mt-6 max-w-lg font-body text-lg leading-relaxed text-ink/75">
            Molcajetes still smoking from the stone. Parrilladas off the
            grill. Tortillas made on the comal, to order. Two rooms in Los
            Angeles, one family running both.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {anchor && (
              <Button href={`tel:${anchor.phoneHref}`}>Call to reserve</Button>
            )}
            <Button href="/menu" variant="ghost">
              See the menu
            </Button>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src={images.heroBoyleHeights.src}
              alt={images.heroBoyleHeights.alt}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
