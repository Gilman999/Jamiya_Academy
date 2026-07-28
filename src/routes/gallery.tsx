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
          "Explore the visual gallery of Jamiya Academy — Quranic recitations, Arabic calligraphy exhibitions, fashion design showcases, and campus events.",
      },
      { property: "og:title", content: "Campus & Creative Arts Gallery — Jamiya Academy" },
    ],
  }),
  component: GalleryPage,
});

type GalleryItem = {
  id: string;
  title: string;
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
    title: "Arabic Calligraphy & Typography Masterclass",
    category: "calligraphy",
    categoryLabel: "Calligraphy & Art",
    date: "12 May 2026",
    image: calligraphyBg,
    spanClass: "md:col-span-2 md:row-span-2 min-h-[360px]",
    description:
      "Students practicing Thuluth and Naskh scripts using authentic reed pens and traditional inks under expert Qariya direction.",
  },
  {
    id: "gal-2",
    title: "Sacred Quran Recitation & Tajweed Halqa",
    category: "campus",
    categoryLabel: "Campus Life",
    date: "04 April 2026",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1 min-h-[220px]",
    description:
      "Daily morning Tajweed halqa where Alima students revise Makharij and recitations before live lectures.",
  },
  {
    id: "gal-3",
    title: "Fashion Designing & Pattern Making Workshop",
    category: "fashion",
    categoryLabel: "Fashion & Craft",
    date: "18 March 2026",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1 min-h-[220px]",
    description:
      "Handcrafted Abaya tailoring, fabric pattern cutting, and modest fashion embroidery by skill department students.",
  },
  {
    id: "gal-4",
    title: "Academy Library & Research Sanctuary",
    category: "campus",
    categoryLabel: "Campus Life",
    date: "22 February 2026",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-2 min-h-[340px]",
    description:
      "Our serene digital & physical reference library storing authentic Fiqh commentaries, Hadith lexicons, and study notes.",
  },
  {
    id: "gal-5",
    title: "Annual Alimiyya Convocation & Honor Ceremony",
    category: "awards",
    categoryLabel: "Awards & Functions",
    date: "10 January 2026",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-2 md:row-span-1 min-h-[240px]",
    description:
      "Felicitation of graduating Alimahs and Sanad awardees under the directorship of Fatima Ali Hashmi.",
  },
  {
    id: "gal-6",
    title: "Islamic Geometric Art & Illumination",
    category: "calligraphy",
    categoryLabel: "Calligraphy & Art",
    date: "05 November 2025",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1 min-h-[220px]",
    description:
      "Traditional tezhib illumination motifs created by calligraphy diploma students using gold leaf technique.",
  },
  {
    id: "gal-7",
    title: "Handmade Embroidery & Textile Craft",
    category: "fashion",
    categoryLabel: "Fashion & Craft",
    date: "14 October 2025",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1 min-h-[220px]",
    description:
      "Zardozi needlework and intricate hand embroidery exhibition created by vocational skill trainees.",
  },
  {
    id: "gal-8",
    title: "Interactive Classroom & Digital Broadcast Studio",
    category: "campus",
    categoryLabel: "Campus Life",
    date: "01 September 2025",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    spanClass: "md:col-span-1 md:row-span-1 min-h-[220px]",
    description:
      "Broadcast setup for streaming live online classes to female students across 12 countries.",
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
    { id: "calligraphy", label: "Calligraphy & Art" },
    { id: "campus", label: "Campus & Classrooms" },
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

          <h1 className="font-serif text-4xl text-primary sm:text-5xl md:text-6xl font-medium leading-tight" data-reveal>
            Academy Moments & Gallery
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed" data-reveal data-reveal-delay="1">
            Glimpses of daily Quranic study halqas, Arabic calligraphy exhibitions, fashion design showcases, and annual convocation ceremonies.
          </p>

          {/* CATEGORY FILTER PILLS */}
          <div className="mt-10 flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none" data-reveal data-reveal-delay="2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as GalleryItem["category"])}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap transition-all cursor-pointer ${
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

      {/* BENTO GRID GALLERY SECTION */}
      <section className="py-16 sm:py-24 bg-[#F7F4EE]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[220px]">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className={`group relative overflow-hidden rounded-xs border border-border/80 bg-card shadow-sm cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-accent ${item.spanClass} animate-in fade-in duration-300`}
              >
                {/* Image Background */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Glassmorphism Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-accent text-[#162E25] text-[9px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full shadow-xs">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Bottom Content Bar */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-white space-y-1.5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-accent/90 font-medium">
                    {item.date}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-medium leading-snug text-white group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.description}
                  </p>
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
                className="absolute top-4 right-4 z-20 text-white bg-black/60 hover:bg-black text-lg font-bold w-9 h-9 rounded-full flex items-center justify-center border border-white/20 transition-colors"
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
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
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
