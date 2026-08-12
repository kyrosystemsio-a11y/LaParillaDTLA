import Link from "next/link";
import { nav } from "@/content/site";
import { social } from "@/content/social";
import { getVisibleLocations } from "@/content/locations";

export function Footer() {
  const locations = getVisibleLocations();

  return (
    <footer className="border-t border-ink/10 bg-plaster-deep pb-20 pt-14 lg:pb-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl text-ink">La Parrilla</p>
          <p className="mt-3 max-w-xs font-body text-sm text-ink/70">
            Family-owned Mexican food in Los Angeles since 1978.
          </p>
          <div className="mt-3 flex flex-col font-body text-sm text-ink/70">
            <a
              href={social.instagramBrand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[24px] items-center py-1 hover:text-ember"
            >
              Instagram — {social.instagramBrand.handle}
            </a>
            <a
              href={social.instagramWilshire.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[24px] items-center py-1 hover:text-ember"
            >
              Instagram (Wilshire) — {social.instagramWilshire.handle}
            </a>
          </div>
        </div>

        <div>
          <p className="font-utility text-xs uppercase tracking-widest text-ink/70">
            Site
          </p>
          <ul className="mt-2 flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[24px] items-center py-1 font-body text-sm text-ink/80 hover:text-ember"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-utility text-xs uppercase tracking-widest text-ink/70">
            Locations
          </p>
          <ul className="mt-3 flex flex-col gap-3">
            {locations.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="inline-flex min-h-[24px] items-center py-1 font-body text-sm text-ink/80 hover:text-ember"
                >
                  {loc.shortName}
                </Link>
                <p className="font-body text-xs text-ink/70">{loc.address.street}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-4 font-utility text-xs text-ink/70 sm:px-6">
        © {new Date().getFullYear()} La Parrilla. Hours and details can change —
        call the location you&apos;re visiting to be sure.
      </div>
    </footer>
  );
}
