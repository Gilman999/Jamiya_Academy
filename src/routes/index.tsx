import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroPattern from "@/assets/hero-pattern.jpg";
import { ScrollEffects } from "@/components/scroll-effects";
import { Navbar } from "@/components/navbar";
import { PortalModals } from "@/components/portal-modals";

const WHATSAPP_URL = "https://wa.me/919368324180?text=Assalamu%20Alaikum%2C%20I%20want%20to%20take%20admission%20in%20Jamiya%20Kaneez%20E%20Sayyeda%20Fatima%20Academy";
const PHONE = "+91 93683 24180";
const PHONE_TEL = "+919368324180";

type Course = {
  no: string;
  name: string;
  subtitle?: string;
  duration: string;
  free?: boolean;
};

const deenCourses: Course[] = [
  { no: "01", name: "Alima Course", subtitle: "With Fazliyat Complete", duration: "5 Years" },
  { no: "02", name: "Mubaligha Course", subtitle: "Deen ki Dawat Dene Wali", duration: "1 Year" },
  { no: "03", name: "Tajweed Course", subtitle: "With Madani Qaida", duration: "3 Months" },
  { no: "04", name: "Qirat Course", subtitle: "With Nazeera Complete", duration: "1 Year" },
  { no: "05", name: "Bayan Course", duration: "3 Months" },
  { no: "06", name: "Urdu Course", subtitle: "Read & Write", duration: "3 Months", free: true },
  { no: "07", name: "Nizamat Course", duration: "3 Months", free: true },
  { no: "08", name: "Namaz Course", duration: "3 Months", free: true },
  { no: "09", name: "Farz Uloom Course", duration: "3 Months", free: true },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jamiya Kaneez E Sayyeda Fatima Lilbanat — Online & Offline Islamic Academy" },
      {
        name: "description",
        content:
          "An online academy of sacred learning for women — Alima, Tajweed, Qirat, Bayan and skill courses. Live classes with female teachers. Free courses available.",
      },
      { property: "og:title", content: "Jamiya Kaneez E Sayyeda Fatima Lilbanat" },
      {
        property: "og:description",
        content:
          "Online Islamic academy for girls & women. Alima, Tajweed, Qirat and more — from ₹299/month. Certified courses, female teachers, complete parda.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

export function Home() {
  const [activeModal, setActiveModal] = useState<"results" | "certificates" | "notices" | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-primary">
      <ScrollEffects />
      <Navbar />
      <Hero />
      <Announcement />
      <WhyChooseUs onOpenModal={(m) => setActiveModal(m)} />
      <Courses />
      <SkillJourneySection />
      <Library />
      <ClassesModeSection />
      <HowWeTeachSection />
      <Contact />
      <Footer />
      <PortalModals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border/60">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        data-parallax="0.25"
        style={{
          backgroundImage: `url(${heroPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-32">
        <p className="font-arabic text-2xl text-primary md:text-3xl" data-reveal>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        
        <div data-reveal data-reveal-delay="1">
          <Divider className="mx-auto mt-6" />
        </div>

        <h1
          className="mt-8 font-serif text-4xl leading-[1.05] text-primary sm:text-5xl md:text-7xl"
          data-reveal
          data-reveal-delay="1"
        >
          Jamiya Kaneez E<br />
          <span className="italic">Sayyeda Fatima</span> Lilbanat
          <span className="align-super text-xl sm:text-2xl md:text-3xl"> ﷺ</span>
        </h1>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent" data-reveal data-reveal-delay="2">
          Registered By State Government Academy • Founder: Fatima Ali Hashmi
        </p>

        <p
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          data-reveal
          data-reveal-delay="2"
        >
          An online academy of sacred learning for girls and women — where the tradition of
          <em> ilm-e-deen</em> is taught with adab, by female teachers, in complete parda.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal data-reveal-delay="3">
          <a
            href="#classes-mode"
            className="rounded-sm bg-primary px-6 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore Courses
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-primary/40 bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-widest text-[#162E25] transition-colors hover:bg-primary/5"
          >
            Join on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Announcement() {
  return (
    <section className="border-b border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 sm:py-14 md:grid-cols-[1fr_2fr] md:items-center">
        <div data-reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Special Announcement</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
            1500 Saal Jashn-e-<br />Milad-un-Nabi <span className="align-super text-lg">ﷺ</span>
          </h2>
        </div>
        <div className="border-l border-primary-foreground/20 pl-8" data-reveal data-reveal-delay="2">
          <p className="text-sm leading-relaxed text-primary-foreground/85 md:text-base">
            In commemoration of this blessed year, four foundational courses are being offered
            <span className="text-accent"> completely free of charge</span> — Urdu, Nizamat,
            Namaz, and Farz Uloom. Alhamdulillah.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
            Ilm-e-Deen is farz upon every man and woman.
          </p>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs({ onOpenModal }: { onOpenModal?: (m: "results" | "certificates" | "notices") => void }) {
  const reasons = [
    {
      no: "01",
      title: "Female Teachers Only",
      desc: "Qualified female scholars for all Islamic & skill courses.",
    },
    {
      no: "02",
      title: "For Females & Kids Only",
      desc: "Safe, exclusive sanctuary for girls, women & children.",
    },
    {
      no: "03",
      title: "No Age Limit",
      desc: "Learning open for all age groups with personal guidance.",
    },
    {
      no: "04",
      title: "100% Parda & Safety",
      desc: "Complete Islamic parda, privacy & respectful environment.",
    },
    {
      no: "05",
      title: "Live & Recorded Classes",
      desc: "Interactive live sessions + 24/7 recorded video access.",
    },
    {
      no: "06",
      title: "Structured Syllabus & Tests",
      desc: "Step-by-step curriculum with weekly progress assessments.",
    },
    {
      no: "07",
      title: "Digital Library Access",
      desc: "Free access to PDF books, study notes & worksheets.",
    },
    {
      no: "08",
      title: "Official Certificates",
      desc: "State Govt Registered Academy completion certificates.",
    },
    {
      no: "09",
      title: "Worldwide Online & Campus",
      desc: "Study online globally or offline at our academy campus.",
    },
  ];

  const vLineStyle = {
    background: "linear-gradient(to bottom, transparent 0%, var(--border) 40px, var(--border) calc(100% - 40px), transparent 100%)",
  };

  const hLineStyle = {
    background: "linear-gradient(to right, transparent 0%, var(--border) 24px, var(--border) calc(100% - 24px), transparent 100%)",
  };

  return (
    <section id="why-choose-us" className="relative border-b border-border/60 py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-10 relative">
        <SectionHeader
          eyebrow="Academy Distinction"
          title="Why Choose Our Academy?"
          description="Dedicated to providing authentic Islamic knowledge, practical skill development, and language fluency in a safe, female-led environment."
        />

        <div className="relative mt-10 sm:mt-14 py-px">
          
          {/* Swipeable Horizontally on Mobile */}
          <div className="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 lg:pb-0 relative z-0">
            {reasons.map((r) => (
              <div
                key={r.no}
                className="w-[80vw] sm:w-auto max-w-[300px] lg:max-w-none shrink-0 lg:shrink snap-center bg-card border border-border/80 p-6 rounded-xs lg:border-none lg:bg-transparent lg:p-7 relative"
                data-reveal
              >
                <span className="font-serif text-xs text-accent font-semibold">{r.no}</span>
                <h3 className="mt-2 font-serif text-xl text-primary font-medium">{r.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
            <div className="absolute top-[-3.5rem] bottom-[-3.5rem] left-0 w-px" style={vLineStyle} />
            <div className="absolute top-[-3.5rem] bottom-[-3.5rem] left-1/3 w-px" style={vLineStyle} />
            <div className="absolute top-[-3.5rem] bottom-[-3.5rem] left-2/3 w-px" style={vLineStyle} />
            <div className="absolute top-[-3.5rem] bottom-[-3.5rem] right-0 w-px" style={vLineStyle} />
            <div className="absolute -left-20 -right-20 top-0 h-px" style={hLineStyle} />
            <div className="absolute -left-20 -right-20 top-1/3 h-px" style={hLineStyle} />
            <div className="absolute -left-20 -right-20 top-2/3 h-px" style={hLineStyle} />
            <div className="absolute -left-20 -right-20 bottom-0 h-px" style={hLineStyle} />
          </div>

          <div className="absolute inset-0 pointer-events-none z-10 hidden sm:block lg:hidden">
            <div className="absolute top-[-2.5rem] bottom-[-2.5rem] left-0 w-px" style={vLineStyle} />
            <div className="absolute top-[-2.5rem] bottom-[-2.5rem] left-1/2 w-px" style={vLineStyle} />
            <div className="absolute top-[-2.5rem] bottom-[-2.5rem] right-0 w-px" style={vLineStyle} />
            <div className="absolute -left-12 -right-12 top-0 h-px" style={hLineStyle} />
            <div className="absolute -left-12 -right-12 bottom-0 h-px" style={hLineStyle} />
          </div>

          <div className="absolute inset-0 pointer-events-none z-10 sm:hidden">
            <div className="absolute top-[-2rem] bottom-[-2rem] left-0 w-px" style={vLineStyle} />
            <div className="absolute top-[-2rem] bottom-[-2rem] right-0 w-px" style={vLineStyle} />
            <div className="absolute -left-6 -right-6 top-0 h-px" style={hLineStyle} />
            <div className="absolute -left-6 -right-6 bottom-0 h-px" style={hLineStyle} />
          </div>

        </div>
      </div>
    </section>
  );
}

function ClassesModeSection() {
  const [mode, setMode] = useState<"online" | "offline">("online");

  return (
    <section id="classes-mode" className="border-b border-border/60 py-16 sm:py-24 bg-[#F7F4EE]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
        
        {/* Header & Animated Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" data-reveal>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold transition-all duration-300">
              {mode === "online" ? "ONLINE CLASSES" : "OFFLINE CAMPUS"}
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-primary font-medium sm:whitespace-nowrap truncate transition-all duration-300">
              {mode === "online" ? "Learn From Anywhere." : "Academy Campus."}
            </h2>
          </div>

          {/* Smooth Sliding Pill Toggle Switch */}
          <div className="relative inline-flex p-1 rounded-full bg-[#EAE4D6] border border-border/80 shadow-xs self-start md:self-auto shrink-0 select-none">
            {/* Sliding Pill Background Indicator */}
            <div
              className="absolute top-1 bottom-1 rounded-full bg-primary shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                width: "calc(50% - 4px)",
                transform: mode === "online" ? "translateX(0)" : "translateX(calc(100% + 4px))",
              }}
            />

            <button
              type="button"
              onClick={() => setMode("online")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors duration-200 text-center ${
                mode === "online" ? "text-primary-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Online
            </button>
            <button
              type="button"
              onClick={() => setMode("offline")}
              className={`relative z-10 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors duration-200 text-center ${
                mode === "offline" ? "text-primary-foreground" : "text-muted-foreground hover:text-primary"
              }`}
            >
              Offline
            </button>
          </div>
        </div>

        {/* Mobile Arrow Indicator */}
        <div className="flex md:hidden justify-end pt-1 -mb-2">
          <span className="text-accent font-bold text-sm animate-pulse">→</span>
        </div>

        {/* Smooth Crossfading Content Grids */}
        <div className="relative min-h-[580px] pt-2 md:pt-4">
          
          {/* ONLINE CARDS GRID — Swipeable Horizontally on Mobile */}
          <div
            className={`flex md:grid md:grid-cols-3 gap-5 md:gap-6 w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-5 pb-4 md:pt-4 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 ${
              mode === "online"
                ? "opacity-100 translate-y-0 relative z-10 transition-all duration-400 ease-out"
                : "opacity-0 pointer-events-none absolute inset-x-0 top-4 translate-y-3 scale-[0.98] transition-all duration-300 ease-in"
            }`}
          >
            {/* Card 01 - Islamic Courses */}
            <div className="w-[85vw] sm:w-auto max-w-[340px] md:max-w-none shrink-0 md:shrink snap-center bg-card border-2 border-accent p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md relative group">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-[#162E25] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                <span>✦</span> POPULAR
              </div>

              <div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-6 pt-1">
                  <span className="font-serif text-xs text-accent font-bold uppercase tracking-[0.25em]">01</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold">MONTHLY</span>
                </div>

                <h3 className="font-serif text-2xl text-primary font-medium">Islamic Courses</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Nineteen structured Islamic courses — from Namaz to complete Alima Fazliyat.
                </p>

                <p className="font-serif text-4xl sm:text-5xl text-primary mt-6 mb-6">₹299</p>

                <div className="border-t border-border/40 pt-6">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-foreground/80 font-medium">
                    <div>• Alima Course</div>
                    <div>• Tajweed Course</div>
                    <div>• Nazra Course</div>
                    <div>• Wariya Course</div>
                    <div>• Hafiza Course</div>
                    <div>• Kids Safeer-e-Quran</div>
                    <div>• Seerat-e-Rasool ﷺ</div>
                    <div>• Asma-ul-Husna</div>
                    <div>• Asma-ul-Mustafa ﷺ</div>
                    <div>• Dua Course</div>
                    <div>• Namaz Course</div>
                    <div>• Farz Uloom Course</div>
                    <div>• Mubaligha Course</div>
                    <div>• Khawateen Tarbiyat</div>
                    <div>• Tarbiyat Course</div>
                    <div>• Fatiha Course</div>
                    <div>• Naat & Nizamat</div>
                    <div>• Bayan Course</div>
                    <div>• Urdu Course</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-primary text-primary-foreground px-6 py-2.5 text-xs font-semibold uppercase tracking-widest hover:bg-primary/90 transition-all w-full text-center shadow-xs"
                >
                  ENROLL —
                </a>
              </div>
            </div>

            {/* Card 02 - Skill Courses */}
            <div className="w-[85vw] sm:w-auto max-w-[340px] md:max-w-none shrink-0 md:shrink snap-center bg-card border border-border/80 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-accent transition-colors group">
              <div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-6">
                  <span className="font-serif text-xs text-accent font-semibold uppercase tracking-[0.25em]">02</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">MONTHLY</span>
                </div>

                <h3 className="font-serif text-2xl text-primary font-medium">Skill Courses</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Modern & traditional skills — creative, digital, and vocational.
                </p>

                <p className="font-serif text-4xl sm:text-5xl text-primary mt-6 mb-6">₹350</p>

                <div className="border-t border-border/40 pt-6">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-foreground/80 font-medium">
                    <div>• Poster Editing</div>
                    <div>• Video Editing</div>
                    <div>• AI Video Generator</div>
                    <div>• Calligraphy</div>
                    <div>• Fabric Painting</div>
                    <div>• Fashion Designing</div>
                    <div>• Mehndi</div>
                    <div>• Stitching</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-primary/40 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all w-full text-center"
                >
                  ENROLL —
                </a>
              </div>
            </div>

            {/* Card 03 - Language Courses */}
            <div className="w-[85vw] sm:w-auto max-w-[340px] md:max-w-none shrink-0 md:shrink snap-center bg-card border border-border/80 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-accent transition-colors group">
              <div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-6">
                  <span className="font-serif text-xs text-accent font-semibold uppercase tracking-[0.25em]">03</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">MONTHLY</span>
                </div>

                <h3 className="font-serif text-2xl text-primary font-medium">Language Courses</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Four world languages taught by qualified female teachers.
                </p>

                <p className="font-serif text-4xl sm:text-5xl text-primary mt-6 mb-6">₹350</p>

                <div className="border-t border-border/40 pt-6">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-foreground/80 font-medium">
                    <div>• English</div>
                    <div>• Urdu</div>
                    <div>• Arabic</div>
                    <div>• Farsi</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-primary/40 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all w-full text-center"
                >
                  ENROLL —
                </a>
              </div>
            </div>
          </div>

          {/* OFFLINE CARDS GRID — Swipeable Horizontally on Mobile */}
          <div
            className={`flex md:grid md:grid-cols-3 gap-5 md:gap-6 w-full overflow-x-auto md:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pt-5 pb-4 md:pt-4 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 ${
              mode === "offline"
                ? "opacity-100 translate-y-0 relative z-10 transition-all duration-400 ease-out"
                : "opacity-0 pointer-events-none absolute inset-x-0 top-4 translate-y-3 scale-[0.98] transition-all duration-300 ease-in"
            }`}
          >
            {/* Card 01 - Islamic Courses */}
            <div className="w-[85vw] sm:w-auto max-w-[340px] md:max-w-none shrink-0 md:shrink snap-center bg-card border border-border/80 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-accent transition-colors group">
              <div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-6">
                  <span className="font-serif text-xs text-accent font-semibold uppercase tracking-[0.25em]">01</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">MONTHLY</span>
                </div>

                <h3 className="font-serif text-2xl text-primary font-medium">Islamic Courses</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  All Islamic courses available on-campus with practical mentorship.
                </p>

                <p className="font-serif text-4xl sm:text-5xl text-primary mt-6 mb-6">₹500</p>

                <div className="border-t border-border/40 pt-6">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-foreground/80 font-medium">
                    <div>• Alima Course</div>
                    <div>• Tajweed Course</div>
                    <div>• Nazra Course</div>
                    <div>• Qirat Course</div>
                    <div>• Bayan Course</div>
                    <div>• Urdu Course</div>
                    <div>• Namaz Course</div>
                    <div>• Farz Uloom</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-primary/40 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all w-full text-center"
                >
                  ENROLL —
                </a>
              </div>
            </div>

            {/* Card 02 - Fashion Designing */}
            <div className="w-[85vw] sm:w-auto max-w-[340px] md:max-w-none shrink-0 md:shrink snap-center bg-card border border-border/80 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-accent transition-colors group">
              <div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-6">
                  <span className="font-serif text-xs text-accent font-semibold uppercase tracking-[0.25em]">02</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">MONTHLY</span>
                </div>

                <h3 className="font-serif text-2xl text-primary font-medium">Fashion Designing</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Practical training with experienced female instructors.
                </p>

                <p className="font-serif text-4xl sm:text-5xl text-primary mt-6 mb-6">₹500</p>

                <div className="border-t border-border/40 pt-6">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-foreground/80 font-medium">
                    <div>• Pattern Drafting</div>
                    <div>• Cutting & Sewing</div>
                    <div>• Boutique Design</div>
                    <div>• Stitching</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-primary/40 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all w-full text-center"
                >
                  ENROLL —
                </a>
              </div>
            </div>

            {/* Card 03 - Skills & Languages */}
            <div className="w-[85vw] sm:w-auto max-w-[340px] md:max-w-none shrink-0 md:shrink snap-center bg-card border border-border/80 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-accent transition-colors group">
              <div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-6">
                  <span className="font-serif text-xs text-accent font-semibold uppercase tracking-[0.25em]">03</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-medium">MONTHLY</span>
                </div>

                <h3 className="font-serif text-2xl text-primary font-medium">Skills & Languages</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Skill and language courses taught in-person at the campus.
                </p>

                <p className="font-serif text-4xl sm:text-5xl text-primary mt-6 mb-6">₹350</p>

                <div className="border-t border-border/40 pt-6">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs text-foreground/80 font-medium">
                    <div>• Spoken English</div>
                    <div>• Calligraphy</div>
                    <div>• Mehndi Art</div>
                    <div>• Fabric Painting</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full border border-primary/40 px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all w-full text-center"
                >
                  ENROLL —
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

function Courses() {
  return (
    <section id="courses" className="border-b border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Curriculum"
          title="Deeni Uloom"
          description="Nine structured courses — from foundational Namaz to complete Alima Fazliyat. Each with a defined syllabus, duration, and certificate upon completion."
        />
        <div className="mt-16 divide-y divide-border border-y border-border">
          {deenCourses.map((c) => (
            <CourseRow key={c.no} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillJourneySection() {
  const steps = [
    {
      step: "01 / SKILL",
      title: "Calligraphy & Sacred Arts",
      subtitle: "Master Khattati of Quranic verses, traditional reed pens & gold leaf ornamentation.",
      image: "/images/calligraphy.png",
      duration: "Skill Based",
      isRight: false,
    },
    {
      step: "02 / LANGUAGE",
      title: "English & Spoken Fluency",
      subtitle: "Comprehensive spoken fluency, grammar, vocabulary & public speaking confidence.",
      image: "/images/english.png",
      duration: "Skill Based",
      isRight: true,
    },
    {
      step: "03 / SKILL",
      title: "Fashion Designing & Tailoring",
      subtitle: "Modest fashion design, pattern drafting, fabric selection & precision stitching.",
      image: "/images/fashion.png",
      duration: "Skill Based",
      isRight: false,
    },
    {
      step: "04 / SKILL",
      title: "Mehndi & Traditional Art",
      subtitle: "Classic Indian, Arabic & modern bridal henna application techniques.",
      image: "/images/mehndi.png",
      duration: "Skill Based",
      isRight: true,
    },
    {
      step: "05 / CREATIVE",
      title: "Poster & AI Video Editing",
      subtitle: "Digital graphic poster design, video editing timelines & AI video creation tools.",
      image: "/images/editing.png",
      duration: "Skill Based",
      isRight: false,
    },
  ];

  return (
    <section id="skill-journey" className="relative border-b border-border/60 py-16 sm:py-32 overflow-hidden bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        
        <SectionHeader
          eyebrow="Creative & Vocational Journey"
          title="Skill-Based & Language Programmes"
          description="A 5-part learning path designed to empower women and girls with creative mastery, modern software skills, and language fluency."
        />

        <div className="relative mt-16 sm:mt-20">
          
          <div className="absolute top-4 bottom-4 left-5 sm:left-1/2 -translate-x-1/2 w-px bg-border/60 pointer-events-none" />
          <div className="journey-line-fill absolute top-4 left-5 sm:left-1/2 -translate-x-1/2 w-px bg-accent pointer-events-none h-0 transition-all duration-200" />

          <div className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-12 sm:gap-y-16 relative z-10">
            {steps.map((item, idx) => (
              <div
                key={item.step}
                className={`relative pl-10 sm:pl-0 ${
                  item.isRight ? "sm:col-start-2 sm:mt-24" : "sm:col-start-1"
                }`}
                data-reveal
                data-reveal-delay={((idx % 2) + 1).toString()}
              >
                <div className={`flex absolute top-8 w-4 h-4 rounded-full border-2 border-accent bg-background z-20 items-center justify-center shadow-xs ${
                  item.isRight
                    ? "left-5 sm:-left-6 -translate-x-1/2 sm:-translate-y-1/2"
                    : "left-5 sm:-right-6 -translate-x-1/2 sm:translate-x-1/2 sm:-translate-y-1/2"
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>

                <div className="bg-card border border-border/80 p-5 sm:p-8 transition-all duration-300 hover:border-accent hover:shadow-md group">
                  <div className="flex items-baseline justify-between border-b border-border/40 pb-3 mb-4">
                    <span className="font-serif text-xs uppercase tracking-[0.25em] text-accent font-semibold">
                      {item.step}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {item.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-primary font-medium group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {item.subtitle}
                  </p>

                  <div className="my-5 sm:my-6 rounded-sm border border-border/50 overflow-hidden aspect-[16/10] bg-muted/40 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-border/40">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary group-hover:text-accent transition-colors"
                    >
                      Join Programme <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

function CourseRow({ course }: { course: Course }) {
  return (
    <div className="grid grid-cols-12 items-baseline gap-x-3 gap-y-2 py-6" data-reveal>
      <span className="col-span-2 font-serif text-lg text-accent md:col-span-1">{course.no}</span>
      <div className="col-span-10 md:col-span-7">
        <h3 className="font-serif text-lg text-[#162E25] sm:text-xl md:text-2xl">
          {course.name}
          {course.free && (
            <span className="ml-2 align-middle text-[10px] uppercase tracking-[0.25em] text-accent">
              ◆ Free
            </span>
          )}
        </h3>
        {course.subtitle && (
          <p className="mt-1 text-sm text-muted-foreground">{course.subtitle}</p>
        )}
      </div>
      <div className="col-span-7 col-start-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:text-xs md:col-span-3 md:col-start-9 md:text-right">
        {course.duration}
      </div>
      <div className="col-span-3 text-right md:col-span-1">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full border border-primary/20 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          Join →
        </a>
      </div>
    </div>
  );
}

function Library() {
  const freeItems = deenCourses.filter((c) => c.free);
  return (
    <section id="library" className="border-b border-border/60 bg-muted/40 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Free Library"
          title="Learn Without Cost"
          description="Foundational deeni education, offered without fees. Enroll and receive live classes, notes, and recordings — the same care and structure as our paid programmes."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {freeItems.map((c) => (
            <a
              key={c.no}
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-sm"
              data-reveal
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">Free</span>
                <h3 className="mt-4 font-serif text-2xl text-primary">{c.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {c.duration}
                </p>
              </div>
              <div className="mt-8 inline-flex items-center text-xs uppercase tracking-[0.25em] text-primary group-hover:text-accent font-semibold">
                Enroll →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section id="offer" className="border-b border-border/60 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">✦ MOST POPULAR OFFER</p>
        <h2 className="mt-6 font-serif text-4xl text-primary sm:text-5xl md:text-6xl">
          One fee. All courses.
        </h2>
        <div className="mx-auto mt-10 max-w-md border-2 border-accent bg-card p-6 sm:mt-12 sm:p-10 shadow-md relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-[#162E25] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] shadow-sm whitespace-nowrap">
            POPULAR PLAN
          </div>
          <p className="font-serif text-6xl text-[#162E25] sm:text-7xl md:text-8xl mt-2">
            ₹299
            <span className="ml-2 align-middle font-sans text-sm uppercase tracking-[0.25em] text-muted-foreground">
              / month
            </span>
          </p>
          <div className="mx-auto mt-6 h-px w-16 bg-accent" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Enroll in a single course or study all of them together — deeni or skill-based —
            for the same monthly fee. No hidden charges. Certificate on completion.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md w-full"
          >
            Claim Your Seat
          </a>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          No Age Limits · Group & Personal Classes
        </p>
      </div>
    </section>
  );
}

function HowWeTeachSection() {
  const items = [
    {
      k: "01",
      t: "Only Female Teachers",
      d: "Every class is conducted by qualified women teachers, with complete parda and safety.",
    },
    {
      k: "02",
      t: "Live Classes, Six Days",
      d: "Weekly classes six days, with Jumu'ah reserved for Mehfil-e-Noor ﷺ and tarbiyat.",
    },
    {
      k: "03",
      t: "Notes & Recordings",
      d: "Written notes and class recordings are shared — learn from home, at your own pace.",
    },
    {
      k: "04",
      t: "Personal Guidance",
      d: "Direct guidance from teachers, with both group and one-to-one class options available.",
    },
  ];

  return (
    <section id="how-we-teach" className="relative border-b border-border/60 bg-[#F7F4EE] pt-12 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
      
      {/* Desktop Vertical Guidelines */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-6xl pointer-events-none hidden lg:block">
        <div className="absolute top-0 bottom-0 left-0 w-px bg-border/70" />
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-border/70" />
        <div className="absolute top-0 bottom-0 left-2/4 w-px bg-border/70" />
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-border/70" />
        <div className="absolute top-0 bottom-0 right-0 w-px bg-border/70" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative z-10 space-y-6 lg:space-y-0">
        
        {/* Mobile Header & Arrow Indicator */}
        <div className="flex lg:hidden items-end justify-between border-b border-border/60 pb-6" data-reveal>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">ADAB & CARE</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-primary font-medium">
              How We Teach
            </h2>
          </div>

          <div className="text-accent font-bold text-sm animate-pulse">
            →
          </div>
        </div>

        {/* Content Container — Desktop 4 Columns, Mobile Swipeable Cards */}
        <div className="flex lg:grid lg:grid-cols-4 gap-4 lg:gap-0 overflow-x-auto lg:overflow-visible snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 lg:pb-0">
          
          {/* Col 1 Header — Hidden on mobile as mobile header is rendered above */}
          <div className="hidden lg:flex pt-0 lg:pr-8 flex-col justify-between space-y-10" data-reveal>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">ADAB & CARE</p>
              <h2 className="mt-3 font-serif text-4xl text-primary md:text-5xl font-medium leading-tight">
                How We<br />Teach
              </h2>
            </div>

            <div className="space-y-2">
              <p className="font-serif text-3xl sm:text-4xl text-accent font-medium">{items[0].k}</p>
              <h3 className="font-serif text-xl sm:text-2xl text-primary font-medium">{items[0].t}</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{items[0].d}</p>
            </div>
          </div>

          {/* Item 01 Card — Mobile Only */}
          <div className="lg:hidden w-[78vw] sm:w-[280px] shrink-0 snap-center bg-card border border-border/80 p-6 flex flex-col justify-between space-y-4 shadow-xs" data-reveal>
            <p className="font-serif text-3xl text-accent font-medium">{items[0].k}</p>
            <div className="space-y-1.5">
              <h3 className="font-serif text-xl text-primary font-medium">{items[0].t}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">{items[0].d}</p>
            </div>
          </div>

          {/* Item 02 */}
          <div className="w-[78vw] sm:w-[280px] lg:w-auto shrink-0 lg:shrink snap-center bg-card lg:bg-transparent border lg:border-none border-border/80 p-6 lg:p-0 lg:pt-0 lg:px-8 flex flex-col justify-between lg:justify-end space-y-4 lg:space-y-2 shadow-xs lg:shadow-none" data-reveal data-reveal-delay="1">
            <p className="font-serif text-3xl sm:text-4xl text-accent font-medium">{items[1].k}</p>
            <div className="space-y-1.5 lg:space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl text-primary font-medium">{items[1].t}</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{items[1].d}</p>
            </div>
          </div>

          {/* Item 03 */}
          <div className="w-[78vw] sm:w-[280px] lg:w-auto shrink-0 lg:shrink snap-center bg-card lg:bg-transparent border lg:border-none border-border/80 p-6 lg:p-0 lg:pt-0 lg:px-8 flex flex-col justify-between lg:justify-end space-y-4 lg:space-y-2 shadow-xs lg:shadow-none" data-reveal data-reveal-delay="2">
            <p className="font-serif text-3xl sm:text-4xl text-accent font-medium">{items[2].k}</p>
            <div className="space-y-1.5 lg:space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl text-primary font-medium">{items[2].t}</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{items[2].d}</p>
            </div>
          </div>

          {/* Item 04 */}
          <div className="w-[78vw] sm:w-[280px] lg:w-auto shrink-0 lg:shrink snap-center bg-card lg:bg-transparent border lg:border-none border-border/80 p-6 lg:p-0 lg:pt-0 lg:pl-8 flex flex-col justify-between lg:justify-end space-y-4 lg:space-y-2 shadow-xs lg:shadow-none" data-reveal data-reveal-delay="3">
            <p className="font-serif text-3xl sm:text-4xl text-accent font-medium">{items[3].k}</p>
            <div className="space-y-1.5 lg:space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl text-primary font-medium">{items[3].t}</h3>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{items[3].d}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// 📜 BEGIN YOUR JOURNEY SECTION — Plain Clean Background
function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-[75vh] py-24 sm:py-36 flex flex-col justify-center items-center overflow-hidden bg-[#FBF9F5] border-t border-border/60 select-none"
    >
      {/* ── CENTER CONTENT ── */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        
        <Divider className="mx-auto" />
        
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-accent" data-reveal>
          ADMISSIONS OPEN NOW
        </p>

        <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl md:text-6xl font-medium" data-reveal data-reveal-delay="1">
          Begin Your Journey
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground" data-reveal data-reveal-delay="2">
          Step into authentic Islamic education and skill mastery under qualified female scholars. 
          Limited seats available for the new batch.
        </p>

        {/* Big Green CTA Button — white oval rises fast on hover */}
        <div className="mt-12 flex justify-center" data-reveal data-reveal-delay="3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-full border-2 border-[#162E25] bg-[#162E25] px-12 py-5 text-sm sm:text-base font-bold uppercase tracking-[0.25em] text-white shadow-xl transition-all duration-300 group"
          >
            <span className="absolute -inset-4 bg-white translate-y-[110%] group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-t-[100%]" />
            <span className="relative z-10 group-hover:text-[#162E25] transition-colors duration-250 flex items-center gap-3">
              Start Admission <span className="group-hover:translate-x-2 transition-transform duration-250">→</span>
            </span>
          </a>
        </div>

        <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Online & Offline Campus · Direct Guidance: {PHONE}
        </p>

      </div>
    </section>
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
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#courses" className="hover:text-accent">All Courses</a></li>
              <li><a href="#why-choose-us" className="hover:text-accent">Why Choose Us</a></li>
              <li><a href="#library" className="hover:text-accent">Free Library</a></li>
              <li><a href="#offer" className="hover:text-accent">Welcome Offer</a></li>
              <li><a href="#contact" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <li><a href={`tel:${PHONE_TEL}`} className="hover:text-accent">{PHONE}</a></li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  WhatsApp Channel
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ</p>
          <p className="uppercase tracking-[0.25em]">Ilm · Adab · Amal</p>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl" data-reveal>
      <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">{eyebrow}</p>
      <h2 className="mt-4 font-serif text-4xl text-primary md:text-5xl">{title}</h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex w-32 items-center gap-2 ${className}`}>
      <span className="h-px flex-1 bg-accent/50" />
      <span className="text-accent">✦</span>
      <span className="h-px flex-1 bg-accent/50" />
    </div>
  );
}
