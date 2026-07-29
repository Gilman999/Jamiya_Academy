import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { PortalModals } from "@/components/portal-modals";
import { getCurrentStudent, StudentProfile } from "@/lib/supabase";

const WHATSAPP_URL = "https://wa.me/919368324180?text=Assalamu%20Alaikum%2C%20I%20want%20to%20take%20admission%20in%20Jamiya%20Kaneez%20E%20Sayyeda%20Fatima%20Academy";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<"results" | "certificates" | "notices" | "student-login" | "admin-login" | null>(null);
  const [studentSession, setStudentSession] = useState<StudentProfile | null>(null);

  useEffect(() => {
    async function checkSession() {
      const student = await getCurrentStudent();
      if (student) {
        setStudentSession(student);
      }
    }
    checkSession();
  }, []);

  // Close open dropdowns when clicking anywhere outside
  useEffect(() => {
    const handleOutsideClick = () => {
      setFeaturesOpen(false);
      setLoginOpen(false);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const links = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT US" },
    { href: "/library", label: "LIBRARY" },
    { href: "/#why-choose-us", label: "FEATURES", isDropdown: true },
    { href: "/gallery", label: "GALLERY" },
    { href: "/contact", label: "CONTACT" },
  ];

  const dropdownItems = [
    { label: "ADMISSION FORM", action: "admission", href: "/admission" },
    { label: "RESULTS", action: "results" },
    { label: "CERTIFICATES", action: "certificates" },
    { label: "NOTICE BOARD", action: "notices" },
  ];

  const handleDropdownClick = (item: typeof dropdownItems[0]) => {
    setFeaturesOpen(false);
    setLoginOpen(false);
    setOpen(false);
    if (item.action === "admission") {
      window.location.href = "/admission";
    } else {
      setActiveModal(item.action as any);
    }
  };

  return (
    <>
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
              l.isDropdown ? (
                <div
                  key={l.label}
                  className="relative py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLoginOpen(false);
                      setFeaturesOpen((v) => !v);
                    }}
                    className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer group"
                  >
                    <span>{l.label}</span>
                    <span className={`text-[10px] opacity-70 transition-transform duration-200 ${featuresOpen ? "rotate-180 text-accent font-bold" : "group-hover:rotate-180"}`}>▾</span>
                  </button>

                  {/* Dropdown Menu — Clickable Toggle (Stays open until clicked again) */}
                  {featuresOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-52 bg-card border-2 border-accent/80 shadow-2xl rounded-xs p-1.5 transition-all duration-200 z-50 animate-in fade-in zoom-in-95">
                      <div className="space-y-0.5">
                        {dropdownItems.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => handleDropdownClick(item)}
                            className="w-full text-left px-3.5 py-2.5 rounded-xs text-[11px] font-bold uppercase tracking-[0.2em] text-primary hover:bg-accent/20 hover:text-accent transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>{item.label}</span>
                            <span className="text-accent text-xs">→</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : l.href.startsWith("/") && !l.href.includes("#") ? (
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

          {/* CTA Buttons (LOGIN & ENROLL) & Mobile Toggle */}
          <div className="flex shrink-0 items-center gap-2.5">
            {/* LOGIN CTA Dropdown — Clickable Toggle */}
            <div
              className="relative py-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFeaturesOpen(false);
                  setLoginOpen((v) => !v);
                }}
                className={`rounded-full border-2 border-primary px-3.5 py-1.5 text-[10px] sm:px-5 sm:py-2 sm:text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center gap-1 cursor-pointer ${
                  loginOpen
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-transparent text-primary hover:bg-primary/10"
                }`}
              >
                <span>LOGIN</span>
                <span className={`text-[10px] opacity-70 transition-transform duration-200 ${loginOpen ? "rotate-180 text-accent font-bold" : ""}`}>▾</span>
              </button>

              {/* Login Dropdown Options — Stays open until clicked again */}
              {loginOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-card border-2 border-accent/80 shadow-2xl rounded-xs p-1.5 transition-all duration-200 z-50 animate-in fade-in zoom-in-95">
                  <div className="space-y-0.5">
                    {studentSession && (
                      <Link
                        to="/dashboard"
                        onClick={() => setLoginOpen(false)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xs text-[11px] font-bold uppercase tracking-[0.18em] text-accent bg-accent/10 hover:bg-accent/20 transition-colors flex items-center justify-between cursor-pointer border border-accent/40 mb-1"
                      >
                        <span>✨ MY DASHBOARD</span>
                        <span className="text-accent text-xs">→</span>
                      </Link>
                    )}

                    <Link
                      to="/student-login"
                      onClick={() => setLoginOpen(false)}
                      className="w-full text-left px-3.5 py-2.5 rounded-xs text-[11px] font-bold uppercase tracking-[0.18em] text-primary hover:bg-accent/20 hover:text-accent transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>🎓 STUDENT LOGIN</span>
                      <span className="text-accent text-xs">→</span>
                    </Link>

                    <Link
                      to="/admin-login"
                      onClick={() => setLoginOpen(false)}
                      className="w-full text-left px-3.5 py-2.5 rounded-xs text-[11px] font-bold uppercase tracking-[0.18em] text-primary hover:bg-accent/20 hover:text-accent transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>🔐 ADMIN LOGIN</span>
                      <span className="text-accent text-xs">→</span>
                    </Link>

                    <Link
                      to="/admin-dashboard"
                      onClick={() => setLoginOpen(false)}
                      className="w-full text-left px-3.5 py-2 rounded-xs text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors flex items-center justify-between cursor-pointer border-t border-border/40 mt-1 pt-1.5"
                    >
                      <span>🛠️ ADMIN DASHBOARD</span>
                      <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/admission"
              className="rounded-full bg-primary px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-sm sm:px-6 sm:text-xs"
            >
              ENROLL
            </Link>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border text-primary lg:hidden cursor-pointer"
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
              {/* Mobile LOGIN Portals */}
              <li className="border-b border-border/40 py-2">
                <p className="py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  PORTAL LOGIN
                </p>
                <div className="pl-3 space-y-2 my-1">
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setActiveModal("student-login");
                    }}
                    className="block w-full text-left py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-accent"
                  >
                    • 🎓 Student Login
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      setActiveModal("admin-login");
                    }}
                    className="block w-full text-left py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-accent"
                  >
                    • 🔐 Admin Login
                  </button>
                </div>
              </li>

              {links.map((l) => (
                <li key={l.label}>
                  {l.isDropdown ? (
                    <div className="border-b border-border/40 py-2">
                      <p className="py-1 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                        {l.label} SERVICES
                      </p>
                      <div className="pl-3 space-y-1.5 my-1">
                        {dropdownItems.map((item) => (
                          <button
                            key={item.label}
                            type="button"
                            onClick={() => handleDropdownClick(item)}
                            className="block w-full text-left py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
                          >
                            • {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : l.href.startsWith("/") && !l.href.includes("#") ? (
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

      {/* Global Portal Modals */}
      <PortalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </>
  );
}
