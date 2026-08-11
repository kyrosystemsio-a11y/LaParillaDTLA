import type { LocationStatus } from "@/content/locations";

const copy: Record<Exclude<LocationStatus, "closed">, { label: string; className: string }> = {
  open: { label: "Open", className: "bg-basalt/10 text-basalt" },
  limited: { label: "Reduced hours", className: "bg-marigold/20 text-ember-dark" },
  unconfirmed: { label: "Call to confirm hours", className: "bg-ember/10 text-ember-dark" },
};

export function StatusBadge({ status }: { status: LocationStatus }) {
  if (status === "closed") return null;
  const c = copy[status];
  return (
    <span className={`inline-flex items-center px-3 py-1 font-utility text-[11px] uppercase tracking-widest ${c.className}`}>
      {c.label}
    </span>
  );
}
