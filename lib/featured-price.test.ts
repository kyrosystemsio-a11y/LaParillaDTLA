import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveFeaturedPrice } from "./featured-price.ts";
import type { MenuCategory } from "../content/menu.ts";
import { menu, featured } from "../content/menu.ts";

const fixture: MenuCategory[] = [
  {
    slug: "molcajetes",
    name: "Molcajetes",
    items: [
      { name: "Molcajete Azteca", price: "$35.95" },
      { name: "Molcajete Grande", price: "$45.95" },
    ],
  },
  {
    slug: "grills",
    name: "Grills",
    items: [
      { name: "Grill 1", price: "$36.95" },
      { name: "Grill 2", price: "$40.95" },
    ],
  },
  {
    slug: "unpriced",
    name: "Unpriced",
    items: [{ name: "Horchata", price: "" }],
  },
];

test("returns null when a dish declares no price reference", () => {
  // This is the guacamole case: featured on the home page, no menu entry,
  // and we must never invent a price for it.
  assert.equal(resolveFeaturedPrice(undefined, fixture), null);
});

test("resolves an item reference to that item's exact price", () => {
  assert.equal(
    resolveFeaturedPrice({ kind: "item", name: "Molcajete Grande" }, fixture),
    "$45.95",
  );
});

test("resolves a category reference to a 'From' price using the lowest in the category", () => {
  assert.equal(
    resolveFeaturedPrice({ kind: "categoryFrom", slug: "grills" }, fixture),
    "From $36.95",
  );
});

test("returns null rather than a wrong price when an item name does not match", () => {
  // A typo must blank the price, never silently show a neighbouring dish's.
  assert.equal(
    resolveFeaturedPrice({ kind: "item", name: "Molcajete Gande" }, fixture),
    null,
  );
});

test("returns null rather than a wrong price when a category slug does not match", () => {
  assert.equal(
    resolveFeaturedPrice({ kind: "categoryFrom", slug: "no-such-slug" }, fixture),
    null,
  );
});

test("ignores unpriced items when computing a category minimum", () => {
  assert.equal(
    resolveFeaturedPrice({ kind: "categoryFrom", slug: "unpriced" }, fixture),
    null,
  );
});

// --- Guards against the real content drifting away from the home page ---

test("every featured dish either resolves a price or is explicitly reference-free", () => {
  for (const dish of featured) {
    if (!dish.priceRef) continue; // deliberately unpriced — see content/menu.ts
    assert.notEqual(
      resolveFeaturedPrice(dish.priceRef, menu),
      null,
      `featured dish "${dish.name}" has a priceRef that no longer resolves`,
    );
  }
});

test("the featured dishes render the prices currently published on the home page", () => {
  const rendered = featured.map((d) => [d.name, resolveFeaturedPrice(d.priceRef, menu)]);
  assert.deepEqual(rendered, [
    ["Molcajete del Señor Pancho Villa", "$45.95"],
    ["Parrilladas Brasero", "From $36.95"],
    ["Handmade tortillas", null],
    ["Fresh guacamole", null],
  ]);
});
