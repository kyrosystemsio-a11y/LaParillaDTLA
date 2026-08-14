import type { Location } from "@/content/locations";

// The only place hours ever get rendered. Status-aware by construction —
// there is no path here that prints hours for an 'unconfirmed' location.
export function HoursBlock({ location }: { location: Location }) {
  if (location.status === "unconfirmed") {
    return (
      <div className="border border-ink/15 bg-plaster px-5 py-4">
        <p className="font-utility text-xs uppercase tracking-widest text-ember">
          Call ahead to confirm hours
        </p>
        <p className="mt-2 font-body text-sm text-ink/70">
          Hours at this location have been changing. The fastest way to know
          before you go is a quick call.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-ink/15 bg-plaster px-5 py-4">
      {location.status === "limited" && (
        <p className="mb-3 font-utility text-xs uppercase tracking-widest text-ember">
          Reduced hours — call to confirm
        </p>
      )}
      <table className="w-full font-utility text-sm">
        {/* Names the table for screen readers without changing anything on
            screen — otherwise a visitor hears "table" with no indication of
            which location's hours these are. */}
        <caption className="sr-only">
          Opening hours for {location.name}
        </caption>
        <tbody>
          {location.hours.map((h) => (
            <tr key={h.day} className="border-b border-ink/10 last:border-none">
              {/* scope="row" associates each time with its day. As plain <td>
                  cells the two had no programmatic relationship. */}
              <th scope="row" className="py-1.5 pr-4 text-left font-normal text-ink/70">
                {h.day}
              </th>
              <td className="py-1.5 text-right text-ink">
                {h.open && h.close ? `${h.open} – ${h.close}` : "Closed"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 font-body text-xs text-ink/70">{location.hoursSourceNote}</p>
    </div>
  );
}
