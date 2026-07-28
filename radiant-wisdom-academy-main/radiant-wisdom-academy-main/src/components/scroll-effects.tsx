import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Mounts Lenis for smooth scroll, an IntersectionObserver for
 * `[data-reveal]` fade/rise-in, and a rAF parallax loop for `[data-parallax]`.
 * Client-only — safe to import from a route because effects are guarded.
 */
export function ScrollEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Smooth scroll (Lenis) ---
    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!prefersReduced) {
      // Disable native smooth so Lenis can own scrolling
      const htmlEl = document.documentElement;
      const prevBehavior = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollBehavior = "auto";

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Hash anchor smooth-scroll via Lenis
      const onAnchorClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']") as
          | HTMLAnchorElement
          | null;
        if (!a) return;
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -72 });
      };
      document.addEventListener("click", onAnchorClick);

      // Parallax loop
      const parallaxEls = Array.from(
        document.querySelectorAll<HTMLElement>("[data-parallax]"),
      );
      const updateParallax = () => {
        const y = window.scrollY;
        for (const el of parallaxEls) {
          const speed = parseFloat(el.dataset.parallax || "0.2");
          el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        }
      };
      lenis.on("scroll", updateParallax);
      updateParallax();

      // Cleanup adds anchor handler removal
      return () => {
        document.removeEventListener("click", onAnchorClick);
        cancelAnimationFrame(rafId);
        lenis?.destroy();
        htmlEl.style.scrollBehavior = prevBehavior;
      };
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Reveal-on-scroll ---
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (prefersReduced) {
      els.forEach((el) => el.classList.add("is-revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
