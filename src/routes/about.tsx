import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { ScrollEffects } from "@/components/scroll-effects";

const WHATSAPP_URL = "https://wa.me/919368324180?text=Assalamu%20Alaikum%2C%20I%20want%20to%20know%20more%20about%20Jamiya%20Kaneez%20E%20Sayyeda%20Fatima%20Academy";
const PHONE = "+91 93683 24180";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      {
        name: "description",
        content:
          "Learn about the history, founder vision, authentic Sanad curriculum, and government accreditation of Jamiya Kaneez E Sayyeda Fatima Academy.",
      },
      { property: "og:title", content: "About Jamiya Kaneez E Sayyeda Fatima Academy" },
      {
        property: "og:description",
        content:
          "State Registered Online & Offline Islamic Academy for Women & Girls. Founded by Fatima Ali Hashmi.",
      },
    ],
  }),
  component: AboutPage,
});

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-primary">
      <ScrollEffects />
      <Navbar />
      <AboutHero />
      <FoundersVision />
      <CorePillars />
      <AcademyTimeline />
      <AccreditationSection />
      <AboutCTA />
      <Footer />
    </div>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-12 bg-accent/40" />
      <span className="text-[10px] text-accent">✦</span>
      <div className="h-px w-12 bg-accent/40" />
    </div>
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
    <div className="mx-auto max-w-2xl text-center" data-reveal>
      <Divider className="mx-auto mb-4" />
      <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-3xl text-primary sm:text-4xl md:text-5xl font-medium leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm text-muted-foreground sm:text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

{/* 1. HERO SECTION */}
function AboutHero() {
  const stats = [
    { value: "15+", label: "Years of Academic Distinction" },
    { value: "100%", label: "Female Scholars & Staff" },
    { value: "19+", label: "Deeni & Skill Programmes" },
    { value: "Govt", label: "State Accredited Academy" },
  ];

  return (
    <section className="relative border-b border-border/60 py-20 sm:py-32 overflow-hidden bg-[#FBF9F5]">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent" data-reveal>
          ACADEMY HERITAGE & MISSION
        </p>
        
        <h1 className="mt-4 font-serif text-4xl text-primary sm:text-6xl md:text-7xl font-medium leading-tight" data-reveal data-reveal-delay="1">
          Nurturing Faith, Knowledge & Character
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground font-sans" data-reveal data-reveal-delay="2">
          Founded under State Government accreditation by qualified female scholars, Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ is an exclusive sanctuary dedicated to authentic Islamic learning and female empowerment.
        </p>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-border/60" data-reveal data-reveal-delay="3">
          {stats.map((s, idx) => (
            <div key={idx} className="p-4 text-center">
              <p className="font-serif text-4xl sm:text-5xl text-primary font-medium">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

{/* 2. FOUNDER'S VISION SECTION */}
function FoundersVision() {
  return (
    <section className="relative border-b border-border/60 py-20 sm:py-28 bg-[#F7F4EE]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Calligraphy & Founder Card */}
          <div className="lg:col-span-5 relative" data-reveal>
            <div className="bg-card border-2 border-accent/40 p-8 sm:p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 translate-x-4 -translate-y-4 text-accent/10 font-ruqaa text-9xl pointer-events-none select-none">
                فاطمة
              </div>

              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold">ACADEMY FOUNDER</span>
              <h3 className="mt-2 font-serif text-3xl text-primary font-medium">Fatima Ali Hashmi</h3>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">Founder & Chief Academic Directress</p>

              <div className="my-6 h-px w-16 bg-accent" />

              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed italic">
                &ldquo;Ilm-e-Deen is a sacred right upon every female. Our mission is to make authentic knowledge accessible to every home, preserving Islamic adab, complete parda, and dignity while imparting high-value modern skills.&rdquo;
              </p>

              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                <span className="font-ruqaa text-lg text-accent">جامعہ کنیزِ سیّدہ فاطمہ</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">State Registered</span>
              </div>
            </div>
          </div>

          {/* Right Vision Narrative */}
          <div className="lg:col-span-7 space-y-6" data-reveal data-reveal-delay="2">
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">OUR GUIDING PHILOSOPHY</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-primary font-medium leading-tight">
              A Safe Sanctuary for Women & Children to Flourish
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ was established with a singular noble purpose: to provide girls, women, and children with a dignified environment where they can acquire authentic Islamic education without compromising on modesty, safety, or personal obligations.
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              Whether studying traditional Alimiyya coursework or mastering modern vocational trades like fashion design, calligraphy, and digital media editing, our students receive direct mentorship from qualified female teachers who embody Islamic character and academic excellence.
            </p>

            <div className="pt-4 grid sm:grid-cols-2 gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span> 100% Female Teachers & Staff
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span> Complete Islamic Parda
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span> Live & Recorded Access
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span> State Govt Accreditation
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

{/* 3. FOUR CORE PILLARS */}
function CorePillars() {
  const pillars = [
    {
      no: "01",
      title: "Authentic Sanad Uloom",
      desc: "Structured 5-Year Alimiyya, Tajweed, and Farz Uloom curricula taught with strict adherence to authentic Quran and Sunnah traditions.",
    },
    {
      no: "02",
      title: "100% Female Sanctuary",
      desc: "Absolute Islamic privacy across private online video streams and dedicated physical campus classrooms managed exclusively by women.",
    },
    {
      no: "03",
      title: "Skill & Language Mastery",
      desc: "Empowering women with modern vocational trades including Fashion Designing, Stitching, Calligraphy, IT skills, and 4 world languages.",
    },
    {
      no: "04",
      title: "Barrier-Free Access",
      desc: "Free foundational courses (Namaz, Urdu, Farz Uloom), flexible scheduling, and learning open to all age groups without prerequisites.",
    },
  ];

  return (
    <section className="relative border-b border-border/60 py-20 sm:py-28 bg-[#FBF9F5]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="ACADEMY PILLARS"
          title="Built Upon Four Pillars of Excellence"
          description="Our structured educational framework integrates sacred Islamic tradition with practical life skills."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => (
            <div
              key={p.no}
              className="bg-card border border-border/80 p-8 flex flex-col justify-between space-y-6 shadow-xs hover:border-accent transition-all group"
              data-reveal
            >
              <div>
                <span className="font-serif text-sm text-accent font-bold uppercase tracking-[0.25em]">{p.no}</span>
                <h3 className="mt-4 font-serif text-2xl text-primary font-medium group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>

              <div className="pt-4 border-t border-border/40">
                <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-semibold">Core Principle</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

{/* 4. ACADEMY TIMELINE */}
function AcademyTimeline() {
  const milestones = [
    {
      year: "2010",
      title: "Founding of the Academy",
      desc: "Started as a dedicated local madrasa providing Tajweed and Namaz classes for neighborhood girls under female scholars.",
    },
    {
      year: "2016",
      title: "State Government Accreditation",
      desc: "Received official State Government accreditation, establishing standardized certificate courses and structured Alimiyya syllabus.",
    },
    {
      year: "2020",
      title: "Global Online Portal Expansion",
      desc: "Launched live online interactive classes and recorded lectures, enabling women from across the world to study from home.",
    },
    {
      year: "2026",
      title: "19+ Integrated Deeni & Skill Programmes",
      desc: "Expanded curriculum to 19 comprehensive courses spanning sacred Islamic sciences, modern vocational trades, and world languages.",
    },
  ];

  return (
    <section className="relative border-b border-border/60 py-20 sm:py-28 bg-[#F7F4EE]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="OUR MILESTONES"
          title="The Journey of Our Academy"
          description="From humble beginnings to a globally recognized sanctuary of learning."
        />

        <div className="mt-16 relative">
          {/* Timeline Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border/80 -translate-x-1/2" />

          <div className="space-y-12">
            {milestones.map((m, idx) => (
              <div
                key={m.year}
                className={`relative flex flex-col sm:flex-row items-start ${
                  idx % 2 === 0 ? "sm:flex-row-reverse" : ""
                }`}
                data-reveal
              >
                {/* Center Node Dot */}
                <div className="absolute left-4 sm:left-1/2 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-accent bg-background shadow-xs z-10" />

                {/* Content Card */}
                <div className="ml-10 sm:ml-0 sm:w-1/2 sm:px-8">
                  <div className="bg-card border border-border/80 p-6 sm:p-8 shadow-xs hover:border-accent transition-colors">
                    <span className="font-serif text-2xl text-accent font-bold">{m.year}</span>
                    <h3 className="mt-2 font-serif text-xl text-primary font-medium">{m.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{m.desc}</p>
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

{/* 5. ACCREDITATION & CREDENTIALS */}
function AccreditationSection() {
  return (
    <section className="relative border-b border-border/60 py-20 sm:py-28 bg-[#FBF9F5]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 text-center">
        <SectionHeader
          eyebrow="OFFICIAL ACCREDITATION"
          title="State Registered & Recognized Academy"
          description="Our certificates and curriculum adhere to official academic standards, granting students recognized qualifications upon completion."
        />

        <div className="mt-12 bg-card border-2 border-accent/40 p-8 sm:p-12 shadow-sm relative overflow-hidden" data-reveal>
          <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/60">
            
            <div className="pt-4 md:pt-0 md:px-4 text-center">
              <span className="text-3xl text-accent">📜</span>
              <h3 className="mt-3 font-serif text-xl text-primary font-medium">State Govt Registered</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Officially registered under State Government educational authority.
              </p>
            </div>

            <div className="pt-6 md:pt-0 md:px-4 text-center">
              <span className="text-3xl text-accent">🎓</span>
              <h3 className="mt-3 font-serif text-xl text-primary font-medium">Official Certificates</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Completion certificates issued for Alimiyya, Tajweed, and Skill diplomas.
              </p>
            </div>

            <div className="pt-6 md:pt-0 md:px-4 text-center">
              <span className="text-3xl text-accent">👩‍🏫</span>
              <h3 className="mt-3 font-serif text-xl text-primary font-medium">Verified Alimah Faculty</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                All classes taught exclusively by certified female Islamic scholars.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

{/* 6. CTA SECTION */}
function AboutCTA() {
  return (
    <section className="relative py-28 sm:py-36 flex flex-col justify-center items-center bg-[#FBF9F5] select-none">
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6" data-reveal>
        <Divider className="mx-auto" />
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-accent">JOIN OUR ACADEMY</p>
        <h2 className="mt-4 font-serif text-4xl text-primary sm:text-5xl md:text-6xl font-medium">
          Begin Your Sacred Journey
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground">
          Step into authentic Islamic education and skill mastery under qualified female scholars. Limited seats available.
        </p>
        
        <div className="mt-12 flex justify-center">
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

{/* 7. FOOTER */}
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
              <li><a href="/#courses" className="hover:text-accent transition-colors">Deeni Courses</a></li>
              <li><a href="/#skill-journey" className="hover:text-accent transition-colors">Skill Programmes</a></li>
              <li><a href="/#library" className="hover:text-accent transition-colors">Free Library</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Direct Admission</p>
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
