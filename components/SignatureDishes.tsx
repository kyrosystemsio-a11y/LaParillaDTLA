import Image from "next/image";
import { images } from "@/content/images";

const dishes = [
  {
    image: images.molcajete,
    name: "Molcajete del Señor Pancho Villa",
    detail: "Chicken, beef, shrimp, panela cheese, and cactus, in a hot stone molcajete with a bucket of four Coronitas.",
    price: "$45.95",
  },
  {
    image: images.brasero,
    name: "Parrilladas Brasero",
    detail: "Mixed grills for two — off the fire, straight to the table.",
    price: "From $36.95",
  },
  {
    image: images.comal,
    name: "Handmade tortillas",
    detail: "Made to order, on the comal.",
    price: null,
  },
  {
    image: images.guacamole,
    name: "Fresh guacamole",
    detail: "Made fresh, not from a tub.",
    price: null,
  },
];

export function SignatureDishes() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-4xl text-ink sm:text-5xl">What we&apos;re known for</h2>
      </div>
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {dishes.map((d) => (
          <div key={d.name} className="reveal">
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={d.image.src}
                alt={d.image.alt}
                fill
                sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 font-display text-xl text-ink">{d.name}</h3>
            <p className="mt-1 font-body text-sm text-ink/65">{d.detail}</p>
            {d.price && <p className="mt-1 font-utility text-sm text-ember">{d.price}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
