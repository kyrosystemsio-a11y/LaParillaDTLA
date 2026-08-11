# La Parrilla — website

Next.js (App Router) + TypeScript + Tailwind site for La Parrilla, a
family-owned Mexican restaurant in Los Angeles with two locations.

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
npx tsc --noEmit  # typecheck
```

## Content layer

Every restaurant fact — hours, prices, addresses, phone numbers, social
handles, image paths — lives in typed modules under `/content`. Nothing
outside that folder should hardcode a business fact. See:

- `content/restaurant.ts` — brand facts, ownership, the Wilshire building story
- `content/locations.ts` — **the location status flag** (see below)
- `content/menu.ts` — every menu category, item, and price
- `content/social.ts` — Instagram/Facebook handles
- `content/images.ts` — every image slot on the site (see `public/images/README.md`)
- `content/site.ts` — site-wide metadata and nav

## The location status flag

`content/locations.ts` exports a `LocationStatus` type:
`'open' | 'limited' | 'unconfirmed' | 'closed'`. Flipping one location's
`status` string fully reconfigures the site for that location — nav, the
locations index, the location detail page, JSON-LD schema, and
`sitemap.xml` all react automatically. No other file needs to change.

- `open` — full hours table, standard treatment.
- `limited` — hours table renders with a "reduced hours — call to confirm" note.
- `unconfirmed` — no hours are published anywhere. The page shows address,
  phone, story, and a "call ahead to confirm hours" line only.
- `closed` — the location is dropped from navigation, the locations index,
  `sitemap.xml`, and JSON-LD. `generateStaticParams` stops building its page.

## Environment variables

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the
real production domain before deploying — it drives canonical URLs,
OpenGraph tags, and the sitemap.

## Images

All imagery is placeholder SVG art — see `public/images/README.md` for the
full shot list, target dimensions, and how to swap in real photography.
