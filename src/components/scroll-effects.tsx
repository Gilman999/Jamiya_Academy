import { useEffect } from "react";
import Lenis from "lenis";

export function ScrollEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let rafId = 0;

    if (!prefersReduced) {
      const htmlEl = document.documentElement;
      const prevBehavior = htmlEl.style.scrollBehavior;
      htmlEl.style.scrollBehavior = "auto";

      lenis = new Lenis({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
      });

      const updateScrollProgress = () => {
        // 1. Skill Journey scroll line progress fill
        const journeySec = document.querySelector("#skill-journey") as HTMLElement;
        if (journeySec) {
          const lineEl = journeySec.querySelector(".journey-line-fill") as HTMLElement;
          if (lineEl) {
            const rect = journeySec.getBoundingClientRect();
            const windowH = window.innerHeight;
            const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (rect.height + windowH * 0.2)));
            lineEl.style.height = `${progress * 100}%`;
          }
        }

        // 2. Begin Your Journey: Calligraphy background image drifts smoothly rightward on scroll
        const contactSec = document.querySelector("#contact") as HTMLElement;
        if (contactSec) {
          const rect = contactSec.getBoundingClientRect();
          const windowH = window.innerHeight;
          // progress: 0 = section entering view, 1 = fully scrolled through
          const progress = Math.min(1, Math.max(0, (windowH - rect.top) / (rect.height + windowH * 0.4)));

          // Sphere image: smooth rightward drift as you scroll to reveal full calligraphy text
          const sphereImg = contactSec.querySelector<HTMLElement>(".sphere-img");
          if (sphereImg) {
            const startX = -38; // Initial offset showing beginning of calligraphy
            const endX = 6;     // Ending offset revealing full calligraphy text
            const driftX = startX + (endX - startX) * progress;
            sphereImg.style.transform = `translate3d(${driftX}%, -50%, 0)`;
          }
        }
      };

      const raf = (time: number) => {
        lenis?.raf(time);
        updateScrollProgress();
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // Smooth hash anchor scroll
      const onAnchorClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
        if (!a) return;
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -72 });
      };
      document.addEventListener("click", onAnchorClick);

      // Parallax
      const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      const updateParallax = () => {
        const y = window.scrollY;
        for (const el of parallaxEls) {
          const speed = parseFloat(el.dataset.parallax || "0.2");
          el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        }
      };
      lenis.on("scroll", updateParallax);
      updateParallax();

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
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
