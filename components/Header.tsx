"use client";

import Link from "next/link";
import { useState } from "react";
import { nav } from "@/content/site";
import { getAnchorLocation } from "@/content/locations";

export function Header() {
  const [open, setOpen] = useState(false);
  const anchor = getAnchorLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-plaster/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-display text-2xl tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          La Parrilla
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-body text-sm font-medium text-ink/80 transition-colors hover:text-ember"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          {anchor && (
            <a
              href={`tel:${anchor.phoneHref}`}
              className="inline-flex items-center rounded-sm bg-basalt px-4 py-2 font-utility text-xs uppercase tracking-widest text-plaster transition-colors hover:bg-basalt-dark"
            >
              Call to reserve
            </a>
          )}
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-6 bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`absolute left-0 top-[7px] block h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`absolute left-0 top-[14px] block h-0.5 w-6 bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-ink/10 bg-plaster px-4 pb-6 md:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-ink/10 last:border-none">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center font-body text-base text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
