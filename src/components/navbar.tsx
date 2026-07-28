import { useState } from "react";
import { Link } from "@tanstack/react-router";

const WHATSAPP_URL = "https://wa.me/919368324180?text=Assalamu%20Alaikum%2C%20I%20want%20to%20take%20admission%20in%20Jamiya%20Kaneez%20E%20Sayyeda%20Fatima%20Academy";

export function Navbar() {
  const [open, setOpen] = useState(false);
  
  const links = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT US" },
    { href: "/#library", label: "LIBRARY" },
    { href: "/#why-choose-us", label: "FEATURES" },
    { href: "/#contact", label: "CONTACT" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        
        {/* Brand Logo & Name */}
        <Link to="/" className="flex items-center gap-3 min-w-0" onClick={() => setOpen(false)}>
          <img
            src="/jamiya-logo.png"
            alt="Jamiya Logo"
            className="h-9 w-9 object-contain rounded-full border border-accent/40 bg-white p-0.5"
          />
          <div className="flex flex-col">
            <span className="truncate font-serif text-lg tracking-tight text-primary leading-tight font-medium">
              Jamiya Kaneez
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground leading-none">
              E Sayyeda Fatima Lilbanat ﷺ
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links — All Caps */}
        <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground lg:flex">
          {links.map((l) => (
            l.href.startsWith("/") && !l.href.includes("#") ? (
              <Link
                key={l.label}
                to={l.href}
                className="hover:text-primary transition-colors"
                activeProps={{ className: "text-primary font-bold text-accent" }}
              >
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="hover:text-primary transition-colors">
                {l.label}
              </a>
            )
          ))}
        </nav>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-5 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-sm sm:px-6 sm:text-xs"
          >
            ENROLL
          </a>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-primary lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[12px] h-px w-4 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <nav className="border-t border-border/60 bg-background lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {links.map((l) => (
              <li key={l.label}>
                {l.href.startsWith("/") && !l.href.includes("#") ? (
                  <Link
                    to={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/40 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/40 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
