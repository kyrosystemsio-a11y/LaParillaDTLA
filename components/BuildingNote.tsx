import { restaurant } from "@/content/restaurant";

// Wilshire location page only. Contextual — it answers "what is this room?"
// for someone deciding whether to come here specifically. No image (the page
// already leads with the building) and no ink panel (it would fight the page);
// it borrows the bordered-note language already used by HoursBlock.
export function BuildingNote() {
  const { locationNote, designation } = restaurant.wilshireBuildingStory;

  return (
    <section className="border-l-2 border-marigold bg-plaster-deep/50 py-5 pl-5 pr-4">
      <h2 className="font-display text-2xl text-ink">{locationNote.heading}</h2>
      <p className="mt-3 font-body text-sm leading-relaxed text-ink/80">
        {locationNote.body}
      </p>
      <p className="mt-3 font-utility text-[11px] uppercase tracking-widest text-ink/70">
        {designation}
      </p>
    </section>
  );
}
