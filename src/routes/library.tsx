import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/navbar";
import { ScrollEffects } from "@/components/scroll-effects";

const WHATSAPP_URL = "https://wa.me/919368324180?text=Assalamu%20Alaikum%2C%20I%20want%20to%20enroll%20in%20a%20free%20library%20course";
const PHONE = "+91 93683 24180";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Digital Library — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      {
        name: "description",
        content:
          "Free Islamic PDF books, Tajweed guides, Daily Masnoon Duas, Hadith collections, and Alima study worksheets by Jamiya Academy.",
      },
      { property: "og:title", content: "Free Digital Islamic Library — Jamiya Academy" },
      {
        property: "og:description",
        content:
          "Download authentic Islamic PDF books, Tajweed guides, Urdu learning handbooks, and study worksheets for free.",
      },
    ],
  }),
  component: LibraryPage,
});

type Resource = {
  id: string;
  title: string;
  category: "all" | "books" | "tajweed" | "duas" | "hadith" | "worksheets";
  categoryLabel: string;
  format: string;
  language: string;
  size: string;
  downloads: number;
  isFree: boolean;
  author: string;
  description: string;
  chapters: { title: string; excerpt: string }[];
};

const RESOURCES: Resource[] = [
  {
    id: "res-01",
    title: "Madani Qaida & Tajweed Rules Guide",
    category: "tajweed",
    categoryLabel: "Tajweed & Quran",
    format: "PDF BOOK",
    language: "Urdu & Arabic",
    size: "4.8 MB",
    downloads: 3420,
    isFree: true,
    author: "Jamiya Academic Board",
    description:
      "Complete foundational textbook for correct Arabic pronunciation, Makharij diagrams, and essential Tajweed rules.",
    chapters: [
      {
        title: "Chapter 1: Makharij-ul-Huroof",
        excerpt:
          "Detailed points of articulation for all 29 Arabic letters with anatomical diagrams and pronunciation exercises.",
      },
      {
        title: "Chapter 2: Heavy & Light Letters (Tafkheem & Tarqeeq)",
        excerpt:
          "Rules regarding Full-Mouth (Tafkheem) letters (خص ضغط قظ) and Ra/Lam pronunciation guidelines.",
      },
      {
        title: "Chapter 3: Rules of Noon Sakin & Tanween",
        excerpt:
          "Comprehensive explanation of Izhar, Idgham, Iqlab, and Ikhfa with examples from Juz Amma.",
      },
    ],
  },
  {
    id: "res-02",
    title: "Namaz-e-Nabuwi ﷺ Complete Guide",
    category: "duas",
    categoryLabel: "Duas & Azkar",
    format: "PDF GUIDE",
    language: "Urdu & Arabic",
    size: "2.1 MB",
    downloads: 2890,
    isFree: true,
    author: "Female Scholars Team",
    description:
      "Step-by-step authentic guide on Namaz according to Sunnah, Wuzu rules, Farz/Sunnat actions, and daily Azkar for women.",
    chapters: [
      {
        title: "Chapter 1: Virtues & Conditions of Namaz",
        excerpt:
          "Importance of establishing Salah on time, prerequisites of purity, Wuzu step-by-step, and Ghusl obligations.",
      },
      {
        title: "Chapter 2: Method of Prayer for Women",
        excerpt:
          "Authentic posture, Takbeer-e-Tahreema, Qiyam, Ruku, Sajdah, and Tashahhud specific to female modesty.",
      },
      {
        title: "Chapter 3: Masnoon Duas After Salah",
        excerpt:
          "Authentic supplications recited by Rasoolullah ﷺ after Farz prayers with Arabic text and Urdu translation.",
      },
    ],
  },
  {
    id: "res-03",
    title: "Urdu Reading & Writing Handbook",
    category: "worksheets",
    categoryLabel: "Worksheets & Syllabi",
    format: "HANDBOOK",
    language: "Urdu",
    size: "3.5 MB",
    downloads: 1940,
    isFree: true,
    author: "Dept. of Languages",
    description:
      "Self-study handbook designed for beginners learning to read, write, and speak fluent Urdu with exercises.",
    chapters: [
      {
        title: "Section 1: Huruf-e-Tahajji & Joint Forms",
        excerpt:
          "Mastering Urdu alphabets, initial, medial, and final letter shapes with handwriting practice grids.",
      },
      {
        title: "Section 2: Daily Vocabulary & Sentences",
        excerpt:
          "Essential vocabulary words, daily household phrases, and basic reading passages with diacritics.",
      },
      {
        title: "Section 3: Islamic Reading Exercises",
        excerpt:
          "Short stories, Islamic moral tales, and Naat lyrics formatted for smooth reading fluency.",
      },
    ],
  },
  {
    id: "res-04",
    title: "Forty Hadith on Women's Tarbiyat & Adab",
    category: "hadith",
    categoryLabel: "Hadith & Seerat",
    format: "PDF BOOK",
    language: "Urdu & Arabic",
    size: "1.8 MB",
    downloads: 2150,
    isFree: true,
    author: "Selection by Fatima Ali Hashmi",
    description:
      "Selected authentic Ahadith with commentary focusing on moral character, family life, modesty, and female spiritual development.",
    chapters: [
      {
        title: "Hadith 1 - 10: Intentions & Character",
        excerpt:
          "Ahadith on sincerity of intention (Niyyat), truthfulness, kindness to parents, and speech discipline.",
      },
      {
        title: "Hadith 11 - 25: Modesty & Parda",
        excerpt:
          "Guidance from Rasoolullah ﷺ regarding Haya, modesty in attire, protection of gaze, and Islamic dignity.",
      },
      {
        title: "Hadith 26 - 40: Family & Community Rights",
        excerpt:
          "Ahadith detailing marital harmony, upbringing of children, neighborly etiquette, and seeking sacred knowledge.",
      },
    ],
  },
  {
    id: "res-05",
    title: "Masnoon Duas & Daily Azkar Collection",
    category: "duas",
    categoryLabel: "Duas & Azkar",
    format: "E-BOOK",
    language: "Arabic, Urdu & English",
    size: "1.2 MB",
    downloads: 4100,
    isFree: true,
    author: "Jamiya Library Board",
    description:
      "Daily morning & evening supplications, protection Azkar, and Sunnah Duas for every daily occasion.",
    chapters: [
      {
        title: "Part 1: Morning & Evening Protection Azkar",
        excerpt:
          "Ayat-ul-Kursi, 3 Quls, and authentic morning/evening protection supplications with transliteration.",
      },
      {
        title: "Part 2: Daily Life Supplications",
        excerpt:
          "Duas for waking up, entering home, eating, traveling, sleeping, and entering the masjid.",
      },
      {
        title: "Part 3: Special Need & Healing Prayers",
        excerpt:
          "Duas for hardship, anxiety, health, forgiveness (Istighfar), and Salawat upon the Prophet ﷺ.",
      },
    ],
  },
  {
    id: "res-06",
    title: "Farz Uloom Concise Textbook",
    category: "books",
    categoryLabel: "PDF Books",
    format: "PDF BOOK",
    language: "Urdu & Arabic",
    size: "5.4 MB",
    downloads: 1820,
    isFree: true,
    author: "Academic Board",
    description:
      "Essential Islamic knowledge required for every Muslimah — Aqaid, Taharat, Ibadat, Halal/Haram, and everyday Fiqh rules.",
    chapters: [
      {
        title: "Module 1: Islamic Aqaid (Beliefs)",
        excerpt:
          "Tawheed, Prophethood, Angels, Divine Books, Day of Judgment, and protection against modern misconceptions.",
      },
      {
        title: "Module 2: Purity & Hygiene (Taharat)",
        excerpt:
          "Detailed Fiqh rules on Najasat, Wuzu, Ghusl, Tayammum, and female-specific purity guidelines.",
      },
      {
        title: "Module 3: Everyday Halal & Haram",
        excerpt:
          "Dietary guidelines, financial transaction ethics, social interactions, and digital conduct rules.",
      },
    ],
  },
  {
    id: "res-07",
    title: "Alimiyya 1st Year Syllabus & Study Notes",
    category: "worksheets",
    categoryLabel: "Worksheets & Syllabi",
    format: "STUDY PACK",
    language: "Urdu & Arabic",
    size: "6.8 MB",
    downloads: 1450,
    isFree: true,
    author: "Dept. of Islamic Studies",
    description:
      "Complete first-year course pack for Alima students including Arabic grammar notes, Seerat summary, and exam worksheets.",
    chapters: [
      {
        title: "Grammar: Nahw & Sarf Basics",
        excerpt:
          "Summary tables of Arabic verb conjugations (Abwab), sentence structures, and grammatical parsing rules.",
      },
      {
        title: "Seerat-e-Rasool ﷺ Highlights",
        excerpt:
          "Chronological timeline of the Prophet's ﷺ life from Makkan hardship to Madinan statecraft.",
      },
      {
        title: "Practice Exams & Answer Sheets",
        excerpt:
          "Sample exam question papers with model answers for mid-term and annual Alimiyya assessments.",
      },
    ],
  },
  {
    id: "res-08",
    title: "Seerat Khawateen-e-Jannat",
    category: "hadith",
    categoryLabel: "Hadith & Seerat",
    format: "PDF BOOK",
    language: "Urdu",
    size: "4.1 MB",
    downloads: 2680,
    isFree: true,
    author: "Research Department",
    description:
      "Inspiring biographies and timeless lessons from the lives of Sayyeda Fatima, Sayyeda Khadija, and noble Sahabiyat.",
    chapters: [
      {
        title: "Life of Sayyeda Fatima Lilbanat ﷺ",
        excerpt:
          "Her devotion, humility, piety, relationship with Rasoolullah ﷺ, and legacy for all Muslim women.",
      },
      {
        title: "Sayyeda Khadija-tul-Kubra (R.A)",
        excerpt:
          "First believer, mother of the believers, her sacrifice for Islam, business integrity, and devotion.",
      },
      {
        title: "Legacy of the Female Companions",
        excerpt:
          "Stories of courage, knowledge, scholarship, and piety among the Sahabiyat in early Islamic history.",
      },
    ],
  },
];

export function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Resource["category"]>("all");
  const [activePreview, setActivePreview] = useState<Resource | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Filter logic
  const filteredResources = useMemo(() => {
    return RESOURCES.filter((res) => {
      const matchesCategory = selectedCategory === "all" || res.category === selectedCategory;
      const matchesSearch =
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Simulate PDF Download
  const handleDownload = (res: Resource) => {
    setDownloadingId(res.id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccess(`Downloaded "${res.title}" successfully!`);
      setTimeout(() => setDownloadSuccess(null), 4000);
    }, 1200);
  };

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "books", label: "PDF Books" },
    { id: "tajweed", label: "Tajweed & Quran" },
    { id: "duas", label: "Duas & Azkar" },
    { id: "hadith", label: "Hadith & Seerat" },
    { id: "worksheets", label: "Worksheets & Syllabi" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-primary">
      <ScrollEffects />
      <Navbar />

      {/* Toast Notification */}
      {downloadSuccess && (
        <div className="fixed top-20 right-4 z-50 bg-[#162E25] text-white px-6 py-3.5 rounded-full shadow-2xl text-xs font-semibold uppercase tracking-[0.2em] border border-accent flex items-center gap-3 animate-bounce">
          <span className="text-accent text-base">✓</span>
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section className="relative border-b border-border/60 py-16 sm:py-24 bg-[#FBF9F5] overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-accent/40" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">KNOWLEDGE VAULT</span>
            <div className="h-px w-12 bg-accent/40" />
          </div>

          <h1 className="font-serif text-4xl text-primary sm:text-5xl md:text-6xl font-medium leading-tight" data-reveal>
            Digital Library & Resource Hub
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed" data-reveal data-reveal-delay="1">
            Free authentic Islamic PDF books, Tajweed guides, daily Masnoon Duas, and study worksheets curated by female scholars.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 max-w-2xl mx-auto relative" data-reveal data-reveal-delay="2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, Tajweed rules, Hadith, Duas, or worksheets..."
              className="w-full rounded-full border-2 border-border/80 bg-card px-7 py-4 pr-12 text-sm text-primary placeholder:text-muted-foreground/60 shadow-xs focus:border-accent focus:outline-none transition-colors"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-primary uppercase tracking-widest"
              >
                Clear
              </button>
            ) : (
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground/50 text-base">
                🔍
              </span>
            )}
          </div>
        </div>
      </section>

      {/* MAIN LIBRARY CONTENT */}
      <section className="py-12 sm:py-20 bg-[#F7F4EE]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
          
          {/* CATEGORY FILTER TABS */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none" data-reveal>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as Resource["category"])}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card border border-border/70 text-muted-foreground hover:text-primary hover:border-accent"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* RESULTS COUNT & FILTER RESET */}
          <div className="flex items-center justify-between border-b border-border/60 pb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span>Showing {filteredResources.length} of {RESOURCES.length} Resources</span>
            {(selectedCategory !== "all" || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-accent font-semibold hover:underline"
              >
                Reset Filters ↺
              </button>
            )}
          </div>

          {/* RESOURCE CARDS GRID */}
          {filteredResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => (
                <div
                  key={res.id}
                  className="bg-card border border-border/80 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs hover:border-accent transition-all group relative animate-in fade-in duration-300"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                        {res.format}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                        {res.language}
                      </span>
                    </div>

                    {/* Title & Author */}
                    <h3 className="font-serif text-2xl text-primary font-medium group-hover:text-accent transition-colors">
                      {res.title}
                    </h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      By {res.author}
                    </p>

                    {/* Description */}
                    <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                      {res.description}
                    </p>

                    {/* Resource Specs */}
                    <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground/80 font-medium">
                      <span>📁 {res.size}</span>
                      <span>📥 {res.downloads.toLocaleString()} Downloads</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setActivePreview(res)}
                      className="rounded-full border border-primary/30 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 transition-all text-center"
                    >
                      Read Online
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDownload(res)}
                      disabled={downloadingId === res.id}
                      className="rounded-full bg-primary px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all text-center flex items-center justify-center gap-1 shadow-xs"
                    >
                      {downloadingId === res.id ? (
                        <span>Downloading...</span>
                      ) : (
                        <span>Download PDF ➔</span>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-card border border-border/60 p-12">
              <span className="text-4xl text-accent">📚</span>
              <h3 className="mt-4 font-serif text-2xl text-primary font-medium">No Resources Found</h3>
              <p className="mt-2 text-xs text-muted-foreground max-w-sm mx-auto">
                No library materials match your search query or selected category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all"
              >
                View All Library Books
              </button>
            </div>
          )}

        </div>
      </section>

      {/* FREE COURSE ENROLLMENT BANNER */}
      <section className="border-t border-b border-border/60 py-16 sm:py-24 bg-[#FBF9F5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center" data-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">✦ 100% FREE LEARNING</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-primary font-medium">
            Study Live With Female Teachers — Zero Fee
          </h2>
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            In addition to PDF books, four foundational courses (Urdu, Nizamat, Namaz, Farz Uloom) are offered completely free with live teacher guidance.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90 transition-all shadow-md"
            >
              Enroll Free Course On WhatsApp →
            </a>
          </div>
        </div>
      </section>

      {/* READ ONLINE PREVIEW MODAL */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-card border-2 border-accent max-w-2xl w-full rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-[#162E25] text-white p-6 flex items-start justify-between border-b border-accent/40">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                  {activePreview.categoryLabel} · {activePreview.format}
                </span>
                <h3 className="font-serif text-2xl text-white font-medium mt-1">
                  {activePreview.title}
                </h3>
                <p className="text-xs text-white/70 mt-0.5">Author: {activePreview.author}</p>
              </div>

              <button
                type="button"
                onClick={() => setActivePreview(null)}
                className="text-white/70 hover:text-white text-xl font-bold p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body - Chapters Preview */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-[#FBF9F5]">
              <div className="border-b border-border/40 pb-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">BOOK OVERVIEW</p>
                <p className="text-sm text-foreground/80 leading-relaxed mt-2">
                  {activePreview.description}
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  SAMPLE CHAPTERS & TABLE OF CONTENTS
                </p>
                
                {activePreview.chapters.map((chap, idx) => (
                  <div key={idx} className="bg-card border border-border/60 p-4 rounded-xs space-y-2">
                    <h4 className="font-serif text-lg text-primary font-medium">{chap.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{chap.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-[#F7F4EE] border-t border-border/60 flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                File Size: {activePreview.size}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActivePreview(null)}
                  className="px-5 py-2 rounded-full border border-border text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleDownload(activePreview);
                    setActivePreview(null);
                  }}
                  className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xs"
                >
                  Download PDF Now ➔
                </button>
              </div>
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
              <li><a href="/#courses" className="hover:text-accent transition-colors">Deeni Courses</a></li>
              <li><a href="/#skill-journey" className="hover:text-accent transition-colors">Skill Programmes</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Direct Guidance</p>
            <p className="mt-4 text-sm text-primary-foreground/80">
              WhatsApp Guidance: {PHONE}<br />
              Online Classes Globally · Offline Campus Available
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full border border-accent/60 px-5 py-2 text-xs uppercase tracking-[0.2em] text-accent hover:bg-accent hover:text-[#162E25] transition-all"
            >
              Message Us →
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-primary-foreground/15 pt-6 text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
