import { test } from "node:test";
import assert from "node:assert/strict";
import { buildMenuRows } from "./menu-layout.ts";
import type { MenuCategory } from "../content/menu.ts";

// A category whose items all carry descriptions needs the full measure to read.
function wide(slug: string): MenuCategory {
  return {
    slug,
    name: slug,
    items: [{ name: `${slug}-item`, description: "has a description", price: "$1.00" }],
  };
}

// A category of bare name/price rows can sit comfortably in half the width.
function compact(slug: string): MenuCategory {
  return {
    slug,
    name: slug,
    items: [
      { name: `${slug}-a`, price: "$1.00" },
      { name: `${slug}-b`, price: "$2.00" },
    ],
  };
}

test("returns nothing for an empty menu", () => {
  assert.deepEqual(buildMenuRows([]), []);
});

test("gives a category with descriptions the full width", () => {
  const rows = buildMenuRows([wide("festival-gourmet")]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].span, "full");
  assert.deepEqual(
    rows[0].categories.map((c) => c.slug),
    ["festival-gourmet"],
  );
});

test("pairs two consecutive description-free categories into one split row", () => {
  const rows = buildMenuRows([compact("street-tacos"), compact("fajitas")]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].span, "split");
  assert.deepEqual(
    rows[0].categories.map((c) => c.slug),
    ["street-tacos", "fajitas"],
  );
});

// A lone category must span the full width rather than sit in one column with
// dead space beside it — half-width with an empty neighbour reads as a gap.
test("gives a trailing unpaired compact category the full width", () => {
  const rows = buildMenuRows([compact("a"), compact("b"), compact("c")]);
  assert.equal(rows.length, 2);
  assert.equal(rows[0].span, "split");
  assert.deepEqual(
    rows[0].categories.map((c) => c.slug),
    ["a", "b"],
  );
  assert.equal(rows[1].span, "full");
  assert.deepEqual(
    rows[1].categories.map((c) => c.slug),
    ["c"],
  );
});

test("does not pair compact categories across an intervening wide category", () => {
  const rows = buildMenuRows([compact("a"), wide("middle"), compact("b")]);
  assert.deepEqual(
    rows.map((r) => [r.span, r.categories.map((c) => c.slug)]),
    [
      ["full", ["a"]],
      ["full", ["middle"]],
      ["full", ["b"]],
    ],
  );
});

test("only ever marks a row split when it actually holds two categories", () => {
  const rows = buildMenuRows([wide("a"), compact("b"), compact("c"), compact("d")]);
  for (const row of rows) {
    assert.equal(
      row.span === "split",
      row.categories.length === 2,
      `row [${row.categories.map((c) => c.slug)}] has span "${row.span}"`,
    );
  }
});

test("preserves menu order, which is meaningful (starters through desserts)", () => {
  const input = [
    wide("to-start"),
    wide("festival-gourmet"),
    compact("street-tacos"),
    compact("fajitas"),
    compact("desserts"),
  ];
  const flattened = buildMenuRows(input).flatMap((r) => r.categories.map((c) => c.slug));
  assert.deepEqual(flattened, input.map((c) => c.slug));
});

// [].every() is vacuously true, which would have made an empty category
// pairing-eligible. An empty category has nothing to lay out beside anything.
test("does not treat an empty category as pairable", () => {
  const empty: MenuCategory = { slug: "empty", name: "empty", items: [] };
  const rows = buildMenuRows([empty, compact("a")]);
  assert.deepEqual(
    rows.map((r) => [r.span, r.categories.map((c) => c.slug)]),
    [
      ["full", ["empty"]],
      ["full", ["a"]],
    ],
  );
});

// An empty string description is falsy. Asserted deliberately so a later
// refactor to `description?.trim()` cannot silently change the layout.
test("treats an item with an empty-string description as description-free", () => {
  const cat: MenuCategory = {
    slug: "drinks",
    name: "drinks",
    items: [
      { name: "a", description: "", price: "$1.00" },
      { name: "b", price: "$2.00" },
    ],
  };
  const rows = buildMenuRows([cat, compact("other")]);
  assert.equal(rows.length, 1);
  assert.equal(rows[0].span, "split");
});

test("treats a category as wide when only some of its items have descriptions", () => {
  const mixed: MenuCategory = {
    slug: "seafood",
    name: "seafood",
    items: [
      { name: "camarones", price: "$16.95" },
      { name: "pescado", description: "whole red snapper", price: "$50.00" },
    ],
  };
  assert.equal(buildMenuRows([mixed])[0].span, "full");
});
