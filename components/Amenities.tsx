import { restaurant } from "@/content/restaurant";

/**
 * Compact, practical, deliberately not an icon grid.
 *
 * `restaurant.amenities` is a BRAND-level list, verified against the business's
 * listings — it is NOT confirmed per location. That qualification is rendered
 * in the DOM below, not left to this comment: on a location page whose hours we
 * say we cannot confirm, an unqualified feature list reads as a claim about
 * that address. Per-location confirmation is an open owner-verification item.
 */
export function Amenities() {
  return (
    <section aria-labelledby="amenities-heading">
      <h2
        id="amenities-heading"
        className="font-utility text-xs uppercase tracking-widest text-ink/70"
      >
        Good to know — both locations
      </h2>
      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
        {restaurant.amenities.map((amenity, i) => (
          <li key={amenity} className="font-body text-sm text-ink/80">
            {amenity}
            {/* Separator trails its item so a wrapped line never opens with a
                floating dot. */}
            {i < restaurant.amenities.length - 1 && (
              <span aria-hidden="true" className="ml-3 text-ink/70">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 font-body text-xs text-ink/70">
        These apply to La Parrilla generally. Call the location you&apos;re
        visiting to check anything specific.
      </p>
    </section>
  );
}
