import Image from "next/image";
import { images } from "@/content/images";
import { featured, menu } from "@/content/menu";
import { resolveFeaturedPrice } from "@/lib/featured-price";

export function SignatureDishes() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <h2 className="font-display text-4xl text-ink sm:text-5xl">What we&apos;re known for</h2>

      {/* Two-up from the narrowest width: stacking four square tiles one per
          row made this section 2.5 screens tall on a phone. */}
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 lg:grid-cols-4">
        {featured.map((dish) => {
          const image = images[dish.imageKey];
          const price = resolveFeaturedPrice(dish.priceRef, menu);

          return (
            <div key={dish.name} className="reveal">
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-4 font-display text-lg text-ink sm:text-xl">{dish.name}</h3>
              <p className="mt-1 font-body text-sm text-ink/70">{dish.blurb}</p>
              {/* No price is rendered when the dish has no menu entry to price
                  against. We never substitute a guess. */}
              {price && <p className="mt-1 font-utility text-sm text-ember">{price}</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
