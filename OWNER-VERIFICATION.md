# Owner Verification Checklist

This is the document referred to by `content/restaurant.ts` ("Needs owner
confirmation — see Owner Verification Checklist"). It is the durable record of
every business fact this site publishes, or deliberately withholds, that only
the owner can settle.

**Documentation only.** Nothing in this file is rendered. Changing it changes
nothing on the site.

## How to use this file

Each item records five things:

- **Current state** — exactly what the site publishes today, or what it
  deliberately does not publish.
- **Why verification is needed** — the risk being carried right now.
- **Question for the owner** — the one thing we need answered.
- **Priority** — P0 (a visitor can be actively misled or sent somewhere
  broken), P1 (a visitor can be materially misinformed), P2 (correctness and
  credibility, low immediate harm). Priority is given by the section an item
  sits under, unless the item states its own.
- **Affected** — the routes and files that change when the answer arrives.

### Two kinds of statement in this repository

Keeping these apart is the whole point of this file.

- **Owner questions** — facts about the business. Nobody on the build side can
  answer them by research, and guessing at one publishes a false claim under
  the family's name. Every item below is one of these.
- **Developer assumptions** — decisions the build made in the *absence* of an
  answer, so the site could ship without fabricating anything. These are listed
  under each item as *Developer assumption in force*. They are placeholders,
  not findings, and every one of them is provisional.

**Do not fill in an answer here from a search result, a third-party listing, or
an inference.** An unanswered question is a working state; a wrong answer
recorded as verified is a defect that outlives everyone who remembers making
it. Leave items open until the owner answers.

---

## P0 — Publication-blocking

### 1. Online ordering link and price provenance

- **Current state:** `restaurant.onlineOrderVerified` is `false`. While it is
  false, `/menu` renders no "Order online" CTA and does not state that its
  prices come from the online ordering page. `restaurant.onlineOrderUrl` still
  holds the Ritual URL but is not exposed as a customer-facing action. All 84
  menu items and 83 prices in `content/menu.ts` were transcribed from that
  page.
- **Why verification is needed:** the URL could not be reached from any build
  environment used on this project, so nobody has confirmed it resolves. If it
  is dead, the CTA sends customers nowhere. If it is stale, every price on the
  menu is stale with it — and the site would be citing it as the authority.
- **Question for the owner:** Is this the current online ordering page, and are
  the prices on it the prices you charge today? Do you want online ordering
  promoted on the site at all?
- **Developer assumption in force:** none — the claim is withheld rather than
  assumed. Flipping the flag to `true` restores both the CTA and the provenance
  sentence with no code change.
- **Affected:** `/menu` — `app/menu/page.tsx`, `content/menu.ts`,
  `content/restaurant.ts`, `lib/schema.ts`.

---

## P1 — Materially misinforms a visitor

### 2. Catering email address

- **Current state:** `restaurant.cateringEmailPlaceholder` is
  `catering@laparrillala.com` — **a placeholder, not a working inbox** — and
  `cateringEmailVerified` is `false`. While it is false, `/catering` renders no
  email CTA at all. The page's meta description still offers "call, email, or
  DM".
- **Why verification is needed:** no verified address was ever supplied to this
  project; the placeholder was intentional from the start. An inquiry sent to
  an address that does not exist is lost silently, which is worse than offering
  no email at all. The placeholder's domain is itself unverified (see item 12).
- **Question for the owner:** What email address should catering inquiries go
  to, and who reads it? If there is no email, should the site say so?
- **Developer assumption in force:** that phone and Instagram DM are sufficient
  intake channels on their own. Provisional.
- **Affected:** `/catering` — `app/catering/page.tsx` (meta description),
  `content/restaurant.ts`.

### 3. Catering packages and pricing

- **Current state:** `/catering` states: *"We don't publish set catering
  packages or pricing — every event is different, and the fastest way to get a
  real answer is a call or a message."* This is hardcoded prose with no
  content-layer backing and no verification flag.
- **Why verification is needed:** this is a claim about the restaurant's own
  policy. If catering packages or a price sheet do exist, the sentence is not
  merely unverified — it is false, and it actively withholds something the
  customer came to find.
- **Question for the owner:** Do you have set catering packages, per-head
  pricing, or a catering menu? If so, may we publish them?
- **Developer assumption in force:** that catering is quoted case by case.
  Provisional.
- **Affected:** `/catering` — `app/catering/page.tsx`.

### 4. Catering inquiry process

- **Current state:** `/catering` states: *"Tell us the size of the crowd, the
  date, and what you're after, and we'll work out the rest with you
  directly."* Hardcoded prose, no content-layer backing.
- **Why verification is needed:** it describes a bespoke consultative process
  and commits the family to it. It may not be how they actually take bookings —
  there may be a deposit, a lead time, a minimum headcount, or a form.
- **Question for the owner:** How does a catering booking actually work? Is
  there a minimum size, a lead time, or a deposit a customer should know about
  before they call?
- **Developer assumption in force:** that the process is informal and
  conversational. Provisional.
- **Affected:** `/catering` — `app/catering/page.tsx`.

### 5. Whether Wilshire offers catering

- **Current state:** `restaurant.cateringOffered` is `true` at the **brand**
  level, with no per-location dimension anywhere in the content layer.
  `/catering` lists both locations' phone numbers. Wilshire's listing now
  carries the same status badge the rest of the site uses, so its
  `unconfirmed` status is visible — but that badge says nothing about catering
  either way.
- **Why verification is needed:** the site offers a Wilshire phone number as a
  catering intake channel while declining to vouch for that location's
  operating status everywhere else. Nothing records whether Wilshire caters.
- **Question for the owner:** Does the Wilshire location take catering
  bookings? Should catering inquiries for both locations go to one number?
- **Developer assumption in force:** that catering is a brand-level service
  available at any operating location. Provisional.
- **Affected:** `/catering` — `app/catering/page.tsx`, `content/restaurant.ts`,
  `content/locations.ts`.

### 6. Reservations

- **Current state:** the site header and the home page hero both render **"Call
  to reserve"** as their primary action, dialling the anchor location (Boyle
  Heights). `restaurant.reservationsPolicy` is `'phone-only'` but is **read by
  no component** — the CTA label is hardcoded in two files.
- **Why verification is needed:** the site's most prominent action asserts that
  reservations are accepted. Many family-run neighbourhood restaurants seat
  walk-ins only. The site is also inconsistent with itself about what a call
  achieves: `/menu` says "Call for takeout" and `/catering` says "Call".
- **Question for the owner:** Do you take reservations? At both locations, or
  only one? Is there a party size below which you don't need one?
- **Developer assumption in force:** that reservations are taken by phone at
  the anchor location. Provisional, and currently published as fact.
- **Affected:** every route (persistent header) — `components/Header.tsx`,
  `components/Hero.tsx`, `content/restaurant.ts`.

### 7. "Mary Carmen Creations"

**Priority: P2.** Kept in this section for stable numbering; it was corrected
downward once the menu data was re-checked properly.

- **Current state:** `/about` states: *"Several dishes on the menu today are
  Mary Carmen Creations — recipes that came from the kitchen's own hand, not
  off a prep sheet."* `content/menu.ts` **does** carry a `Mary Carmen
  Creations` category (slug `mary-carmen-creations`) holding three molcajetes —
  Azteca, del Señor Pancho Villa, and Arriero — so the `/about` claim is
  supported by the site's own menu, and "several" is accurate.
  `restaurant.ownerNote` records the softer form of the claim ("Several menu
  items are *billed as* 'Mary Carmen Creations'") but is unused: the `/about`
  prose is a hardcoded paraphrase that strengthens "billed as" into "are" and
  adds "not off a prep sheet", neither of which any source supports.
- **Why verification is needed:** two smaller points, not the large one. First,
  the category itself came from the same online ordering page as every other
  menu item — so it inherits item 1's verification status. Second, `/about`
  asserts recipe *provenance* ("came from the kitchen's own hand"), which is a
  stronger claim than a menu heading establishes.
- **Question for the owner:** Is "Mary Carmen Creations" the correct name for
  that section, and are those three molcajetes the right dishes under it? Is
  the provenance framing on `/about` accurate?
- **Developer assumption in force:** that the menu categorization is correct
  and that the `/about` framing fairly describes it.
- **Affected:** `/about`, `/menu` — `app/about/page.tsx`, `content/menu.ts`,
  `content/restaurant.ts`.

### 8. Boyle Heights founding year

- **Current state:** **1978**, published as plain fact on roughly ten surfaces:
  the hero eyebrow, the `/about` h1 and body, the footer, root and `/about`
  metadata, the Boyle Heights card eyebrow ("Original, since 1978"), its story
  blurb, and its meta description.
- **Why verification is needed:** it is the most-repeated fact on the site and
  it sits on the unresolved side of a two-source conflict (item 10).
- **Question for the owner:** What year did the Boyle Heights location open?
- **Developer assumption in force:** 1978, per the Phase 1 brief.
- **Affected:** `/`, `/about`, `/locations`, `/locations/boyle-heights` —
  `content/restaurant.ts`, `content/locations.ts`, `content/site.ts`,
  `components/Hero.tsx`, `components/Footer.tsx`, `components/LocationCard.tsx`,
  `app/about/page.tsx`, `app/page.tsx`.

### 9. Wilshire opening year

- **Current state:** **1996**, published in `founded.note` ("Wilshire followed
  as the family's second location"), in the location card eyebrow ("Since
  1996"), and inside an image alt string.
- **Why verification is needed:** same conflict as item 10.
- **Question for the owner:** What year did the Wilshire location open?
- **Developer assumption in force:** 1996, per the Phase 1 brief.
- **Affected:** `/locations`, `/locations/wilshire` — `content/locations.ts`,
  `content/restaurant.ts`, `content/images.ts`.

### 10. What the 1978 / 1996 source conflict actually refers to

- **Current state:** `content/restaurant.ts` records, in a comment only:
  *"Sources conflict: the LA Conservancy building profile cites 1978 for the
  Wilshire building; the family's own Facebook post describes Wilshire as the
  second location, opened 1996."* The build resolved this as Boyle Heights
  1978 (original) / Wilshire 1996 (second) and **publishes that resolution as
  plain fact. No reader of the site is told the dates are contested.**
- **Why verification is needed:** the two sources may not be in conflict at all
  — one may date the *building*, the other the *restaurant*. Until someone
  says which, the site's most-repeated fact rests on an unreconciled dispute
  recorded nowhere a reader can see.
- **Question for the owner:** Does 1978 refer to the building at 1300 Wilshire,
  to the Boyle Heights restaurant, or to something else? Which date belongs to
  which thing?
- **Developer assumption in force:** that 1978 is the Boyle Heights restaurant
  and the Conservancy's 1978 figure describes the building. Provisional.
- **Affected:** as items 8 and 9.

### 11. Wilshire current operating status and hours

- **Current state:** `status: 'unconfirmed'`. Hours **are** stored in
  `content/locations.ts` (sourced from Yelp, Aug 2026) but are **never
  rendered** — `HoursBlock` returns early and `locationSchema` omits
  `openingHoursSpecification`. The page shows "Call to confirm hours" and tells
  visitors hours have been changing. The Wilshire meta description carries the
  same caution. This is the flag that reconfigures the most of the site.
- **Why verification is needed:** the location is published as visitable while
  the site declines to state when it is open. That is the honest treatment of
  an unknown, but it is a holding pattern, not an answer.
- **Question for the owner:** Is the Wilshire location currently open? What are
  its hours? If it is closed or seasonal, say so and the site will reflect it.
- **Developer assumption in force:** none — hours are withheld rather than
  guessed. Setting `status` to `'open'` or `'limited'` publishes the stored
  hours with no code change, so **confirm the stored hours are correct before
  flipping the flag.**
- **Affected:** `/`, `/locations`, `/locations/wilshire`, `/catering`, sitemap,
  JSON-LD — `content/locations.ts`.

---

## P2 — Correctness and credibility

### 12. Canonical live website domain

- **Current state:** `content/site.ts` falls back to
  `https://www.laparrillala.com` when `NEXT_PUBLIC_SITE_URL` is unset. That
  fallback feeds `metadataBase`, every canonical URL, every OpenGraph URL, the
  sitemap, and the JSON-LD `url` and `hasMenu` fields. It was unreachable from
  every build environment used on this project. The catering placeholder email
  (item 2) uses the same domain.
- **Why verification is needed:** if the site ships to a different domain with
  the environment variable unset, every canonical and every share link points
  at the wrong host.
- **Question for the owner:** What domain will the live site use?
- **Developer assumption in force:** `www.laparrillala.com`. Provisional, and
  it ships as the default.
- **Affected:** every route, sitemap, robots, all JSON-LD — `content/site.ts`.

### 13. Instagram accounts

- **Current state:** two handles are published as live links in the footer and
  emitted in JSON-LD `sameAs`: `@thereallaparrillarestaurants` (brand) and
  `@la_parrilla_wilshire`. The brand account is also the destination of the
  "DM on Instagram" catering CTA. Neither could be reached from any build
  environment. A Facebook page is known to exist but `social.facebook.url` is
  deliberately `null` because no stable URL could be confirmed.
- **Why verification is needed:** the brand account is a live customer intake
  channel for catering. If the handle is wrong, inquiries go to a stranger.
- **Question for the owner:** Are both handles correct and actively monitored?
  Which one should catering DMs go to? What is the Facebook page URL?
- **Developer assumption in force:** both handles as given in the Phase 1
  brief; Facebook withheld rather than guessed.
- **Affected:** every route (footer), `/catering`, all JSON-LD —
  `content/social.ts`.

### 14. Amenities by location

- **Current state:** eight amenities (Full bar, TV, Outdoor seating, Good for
  groups, Kid-friendly, Casual dress, Catering available, Vegetarian options)
  are published on **both** location pages from a single brand-level list. The
  heading and the disclaimer beneath now both scope this to La Parrilla
  generally, and the page tells visitors to call the location they are visiting
  to check anything specific. **No per-location amenities data exists.**
- **Why verification is needed:** the list is currently correct as a
  brand-level statement and is labelled as one, but a visitor choosing a
  location on the strength of outdoor seating or a full bar has no per-location
  answer.
- **Question for the owner:** Which of these apply at Boyle Heights, and which
  at Wilshire? Are any of them wrong for either?
- **Developer assumption in force:** that all eight are true of the business
  generally. Scoped honestly in the UI rather than asserted per location.
- **Affected:** `/locations/boyle-heights`, `/locations/wilshire` —
  `components/Amenities.tsx`, `content/restaurant.ts`.

### 15. "La Hora Feliz Cantina" naming

- **Current state:** `/menu` renders a bar section headed **"Bar"** (from
  `barInfo.name`), then a paragraph immediately below that names the same thing
  **"La Hora Feliz Cantina"** (from `restaurant.happyHour.sectionName`). Two
  names for one thing on one screen. The happy hour itself is stated to exist
  with **no days, times, or prices** — the copy defers to a phone call, which
  is correct and should stay that way until this item is answered.
- **Why verification is needed:** we do not know whether "La Hora Feliz
  Cantina" is the real name of a menu section, a name for the happy hour, or a
  name for the bar area.
- **Question for the owner:** What is this section actually called on your
  menu? And what are the happy hour days and times, if you would like them
  published?
- **Developer assumption in force:** that both names are real and refer to
  related but distinct things. Provisional. Days and times are withheld
  entirely rather than guessed.
- **Affected:** `/menu` — `content/menu.ts` (`barInfo`),
  `content/restaurant.ts` (`happyHour`), `app/menu/page.tsx`.

### 16. Guacamole — menu status and price

- **Current state:** "Fresh guacamole" is one of the four dishes featured on
  the home page, with the blurb "Made fresh, not from a tub." **It has no entry
  anywhere in `content/menu.ts`**, so it renders with **no price** — the
  featured-price helper omits the price rather than inventing one. This is
  recorded as a `TODO(owner-verification)` in the menu data.
- **Why verification is needed:** either the menu data is incomplete or the
  dish should not be featured. The home page currently promotes a dish the menu
  page does not list.
- **Question for the owner:** Is guacamole on the menu, and at what price? If
  it is not a listed item, should it stay on the home page?
- **Developer assumption in force:** none — the dish is published exactly as
  approved, with the price omitted. **Do not resolve this by inventing a menu
  item or a price, and do not substitute another dish.**
- **Affected:** `/`, `/menu` — `content/menu.ts`, `components/SignatureDishes.tsx`,
  `lib/featured-price.ts`.

### 17. Legal / registered business name

- **Current state:** the site uses **"La Parrilla"** everywhere — page titles,
  header, footer, JSON-LD `name` (as "La Parrilla — Boyle Heights" and
  "La Parrilla — Wilshire"), and OpenGraph `siteName`. The ordering URL slug
  reads `la-parrilla-restaurant-...`, suggesting the registered name may
  include "Restaurant".
- **Why verification is needed:** JSON-LD `name` is what search engines and
  maps match against business listings; a mismatch can fragment the business's
  search presence.
- **Question for the owner:** What is the registered business name? Should the
  site use it, or the shorter trading name?
- **Developer assumption in force:** "La Parrilla" throughout.
- **Affected:** every route, all JSON-LD — `content/site.ts`,
  `content/restaurant.ts`, `content/locations.ts`.

### 18. Owner surname

- **Current state:** `restaurant.owner` is recorded as
  `Maria del Carmen ("Mary Carmen") Salas/Salinas` — **an unresolved surname
  alternation sitting in the content layer.** The field is **not rendered
  anywhere**, so nothing incorrect is currently published; `/about` refers only
  to "Mary Carmen Creations".
- **Why verification is needed:** not a live risk today, but the site's source
  of truth holds a person's name in two forms. It must be settled before the
  owner is ever named on the site.
- **Question for the owner:** What is the correct spelling of the owner's name?
  Should she be named on the site at all?
- **Developer assumption in force:** none — the field is unused rather than
  resolved.
- **Affected:** none currently rendered — `content/restaurant.ts`.

---

## Related open questions not yet approved for change

Recorded here so they are not lost. These were identified but are **not**
approved for implementation, and several are not owner questions at all —
they are build decisions awaiting their own scope.

- **Image alt text.** Every image on the site is generated placeholder art
  (`public/images/README.md` states this plainly), but the alt text describes
  real photographs of the restaurant. A screen-reader user is told what a
  photograph depicts when no photograph exists. **Build decision, not an owner
  question** — though it resolves itself the moment real photography arrives.
  See `public/images/README.md` for the shot list.
- **"1905 wood-frame building" in alt text.** The construction detail is not
  sourced anywhere in the content layer.
- **Root and `/locations` meta descriptions.** Both read as two operating
  restaurants; only the Wilshire detail description carries the caution. Tied
  to item 11.
- **`/about` has no segment-level OpenGraph.** Build decision.

---

## Changelog

- **Phase 2G** — file created. 18 items recorded, all open. No item has been
  answered by the owner. No answers have been inferred, searched for, or
  guessed.
- **Phase 2G, correction** — item 7 was first recorded on the claim that no
  menu item was identified as a Mary Carmen Creation. That was wrong:
  `content/menu.ts` carries a `Mary Carmen Creations` category with three
  molcajetes. The item has been rewritten and its priority lowered from P1 to
  P2. Nothing was published on the strength of the original error.
