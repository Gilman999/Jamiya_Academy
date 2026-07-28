import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { ScrollEffects } from "@/components/scroll-effects";
import calligraphyBg from "@/assets/calligraphy-bg-new.jpg";

const PHONE = "+91 93683 24180";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      {
        name: "description",
        content:
          "Explore the visual gallery of Jamiya Academy — Quranic recitations, female student halqas in parda, Arabic calligraphy exhibitions, and campus events.",
      },
      { property: "og:title", content: "Campus & Creative Arts Gallery — Jamiya Academy" },
    ],
  }),
  component: GalleryPage,
});

type GalleryItem = {
  id: string;
  title: string;
  shortTag: string;
  category: "all" | "calligraphy" | "campus" | "fashion" | "awards";
  categoryLabel: string;
  date: string;
  image: string;
  spanClass: string;
  description: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Student Tajweed & Quran Recitation Halqa",
    shortTag: "✦ Student Parda Halqa",
    category: "campus",
    categoryLabel: "Campus Life",
    date: "12 May 2026",
    image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1200&auto=format&fit=crop",
    spanClass: "lg:col-span-2 lg:row-span-2 min-h-[340px]",
    description:
      "Alima students studying Quran recitations in complete Islamic modesty, parda, and quiet devotion.",
  },
  {
    id: "gal-2",
    title: "Arabic Calligraphy & Thuluth Script",
    shortTag: "✦ Calligraphy Art",
    category: "calligraphy",
    categoryLabel: "Calligraphy & Art",
    date: "04 April 2026",
    image: calligraphyBg,
    spanClass: "lg:col-span-1 lg:row-span-1 min-h-[200px]",
    description:
      "Traditional Arabic calligraphy artwork created using reed pens and golden ink.",
  },
  {
    id: "gal-3",
    title: "Fashion Designing & Abaya Tailoring",
    shortTag: "✦ Fashion & Tailoring",
    category: "fashion",
    categoryLabel: "Fashion & Craft",
    date: "18 March 2026",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
    spanClass: "lg:col-span-1 lg:row-span-1 min-h-[200px]",
    description:
      "Handcrafted modesty fashion, fabric pattern drafting, and custom tailoring skills.",
  },
  {
    id: "gal-4",
    title: "Academy Library & Research Sanctuary",
    shortTag: "✦ Library Vault",
    category: "campus",
    categoryLabel: "Campus Life",
    date: "22 February 2026",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
    spanClass: "lg:col-span-2 lg:row-span-1 min-h-[200px]",
    description:
      "Our quiet research library storing rare Islamic manuscripts, Fiqh books, and study guides.",
  },
  {
    id: "gal-5",
    title: "Islamic Geometric Architecture & Illumination",
    shortTag: "✦ Academy Sanctuary",
    category: "campus",
    categoryLabel: "Campus Life",
    date: "10 January 2026",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1200&auto=format&fit=crop",
    spanClass: "lg:col-span-1 lg:row-span-2 min-h-[340px]",
    description:
      "Architectural dome, geometric tiles, and spiritual ambiance at the academy campus.",
  },
  {
    id: "gal-6",
    title: "Masnoon Duas & Daily Azkar Study Desk",
    shortTag: "✦ Daily Azkar",
    category: "campus",
    categoryLabel: "Campus Life",
    date: "05 November 2025",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
    spanClass: "lg:col-span-1 lg:row-span-1 min-h-[200px]",
    description:
      "Quiet study desk equipped with Quran, Tasbih, and daily Masnoon prayer guides.",
  },
  {
    id: "gal-7",
    title: "Annual Convocation & Alima Sanad Ceremony",
    shortTag: "✦ Convocation Awards",
    category: "awards",
    categoryLabel: "Awards & Functions",
    date: "14 October 2025",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
    spanClass: "lg:col-span-2 lg:row-span-1 min-h-[200px]",
    description:
      "Official certificate distribution for graduating female scholars and diploma holders.",
  },
  {
    id: "gal-8",
    title: "Handmade Zardozi Embroidery & Craft",
    shortTag: "✦ Zardozi Craft",
    category: "fashion",
    categoryLabel: "Fashion & Craft",
    date: "01 September 2025",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    spanClass: "lg:col-span-1 lg:row-span-1 min-h-[200px]",
    description:
      "Handcrafted embroidery and intricate thread work created by vocational skill trainees.",
  },
  {
    id: "gal-9",
    title: "Alimiyya Manuscripts & Farz Uloom Textbooks",
    shortTag: "✦ Fiqh Manuscripts",
    category: "calligraphy",
    categoryLabel: "Calligraphy & Art",
    date: "20 August 2025",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1200&auto=format&fit=crop",
    spanClass: "lg:col-span-2 lg:row-span-1 min-h-[200px]",
    description:
      "Classical Islamic textbooks and notes studied during 5-year Alimiyya coursework.",
  },
];

export function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryItem["category"]>("all");
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const categories = [
    { id: "all", label: "All Moments" },
    { id: "campus", label: "Campus & Parda Halqas" },
    { id: "calligraphy", label: "Calligraphy & Art" },
    { id: "fashion", label: "Fashion & Craft" },
    { id: "awards", label: "Awards & Functions" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-primary">
      <ScrollEffects />
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative border-b border-border/60 py-16 sm:py-24 bg-[#FBF9F5] overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-accent/40" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent font-semibold">VISUAL ARCHIVES</span>
            <div className="h-px w-12 bg-accent/40" />
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl text-primary font-medium leading-tight" data-reveal>
            Academy Moments & Gallery
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-base text-muted-foreground leading-relaxed" data-reveal data-reveal-delay="1">
            Visual archives of Quranic study halqas in complete parda, Arabic calligraphy exhibitions, fashion design craft, and convocation honors.
          </p>

          {/* CATEGORY FILTER PILLS — Scrollable Mobile Carousel */}
          <div className="mt-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto snap-x scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0" data-reveal data-reveal-delay="2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as GalleryItem["category"])}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap transition-all cursor-pointer snap-center ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border/70 text-muted-foreground hover:text-primary hover:border-accent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID GALLERY SECTION — Responsive Bento Grid on Mobile */}
      <section className="py-10 sm:py-24 bg-[#F7F4EE]">
        <div className="mx-auto max-w-6xl px-3 sm:px-6">
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 auto-rows-[130px] sm:auto-rows-[180px] lg:auto-rows-[220px]">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className={`group relative overflow-hidden rounded-xs border border-border/80 bg-card shadow-sm cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-accent ${item.spanClass} animate-in fade-in duration-300`}
              >
                {/* Clean Image Background */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Hover Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Minimal Single Text Tag Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10">
                  <span className="bg-[#162E25]/85 backdrop-blur-xs text-accent text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-accent/40 shadow-sm truncate max-w-[130px] sm:max-w-none block">
                    {item.shortTag}
                  </span>
                </div>

                {/* Minimal Title Bar on Hover */}
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 z-10 text-white translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-serif text-xs sm:text-base font-medium text-white group-hover:text-accent transition-colors leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-card border-2 border-accent max-w-3xl w-full rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Image Header */}
            <div className="relative h-80 sm:h-96 w-full bg-black overflow-hidden">
              <img
                src={activeLightbox.image}
                alt={activeLightbox.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-20 text-white bg-black/60 hover:bg-black text-lg font-bold w-9 h-9 rounded-full flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                aria-label="Close image lightbox"
              >
                ✕
              </button>
            </div>

            {/* Modal Description */}
            <div className="p-6 sm:p-8 bg-[#FBF9F5] space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
                  {activeLightbox.categoryLabel}
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {activeLightbox.date}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-primary font-medium">
                {activeLightbox.title}
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeLightbox.description}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#F7F4EE] border-t border-border/60 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Jamiya Academy Gallery Archives
              </span>

              <button
                type="button"
                onClick={() => setActiveLightbox(null)}
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all cursor-pointer"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-arabic text-xl text-accent">جامعہ کنیزِ سیّدہ فاطمہ</p>
            <p className="mt-3 font-serif text-lg">Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ</p>
            <p className="mt-3 text-sm text-primary-foreground/70">
              Registered By State Government Academy • Founder: Fatima Ali Hashmi
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Quick Links</p>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="/library" className="hover:text-accent transition-colors">Digital Library</a></li>
              <li><a href="/gallery" className="hover:text-accent transition-colors">Gallery</a></li>
              <li><a href="/admission" className="hover:text-accent transition-colors">Admission Form</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Direct Guidance</p>
            <p className="mt-4 text-sm text-primary-foreground/80">
              WhatsApp Guidance: {PHONE}<br />
              Online Classes Globally · Offline Campus Available
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-primary-foreground/15 pt-6 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
