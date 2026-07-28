import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroPattern from "@/assets/hero-pattern.jpg";
import { ScrollEffects } from "@/components/scroll-effects";


const WHATSAPP_URL = "https://whatsapp.com/channel/0029Vb1ZKk359PwUCpHrYO0G";
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

const skillCourses: Course[] = [
  { no: "01", name: "Calligraphy", subtitle: "Khattati of sacred scripts", duration: "Skill Based" },
  { no: "02", name: "English Speaking", subtitle: "Spoken fluency programme", duration: "Skill Based" },
  { no: "03", name: "Fashion Designing", subtitle: "Modest design & tailoring", duration: "Skill Based" },
  { no: "04", name: "Mehndi", subtitle: "Traditional & contemporary art", duration: "Skill Based" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jamiya Kaneez E Sayyeda Fatima Lilbanat — Online Islamic Academy for Women" },
      {
        name: "description",
        content:
          "An online academy of sacred learning for women — Alima, Tajweed, Qirat, Bayan and skill courses. Live classes with female teachers. Free courses on the 1500th Milad-un-Nabi ﷺ.",
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

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollEffects />
      <Nav />
      <Hero />
      <Announcement />
      <Courses />
      <Library />
      <Offer />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
}


function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#courses", label: "Courses" },
    { href: "#library", label: "Free Library" },
    { href: "#offer", label: "Offer" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <a href="#top" className="flex min-w-0 items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="truncate font-serif text-lg tracking-tight text-primary">Jamiya Kaneez</span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            E Sayyeda Fatima
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary">{l.label}</a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-primary px-3 py-2 text-[10px] font-medium uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90 sm:px-4 sm:text-xs"
          >
            Enroll
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-sm border border-border text-primary md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[12px] h-px w-4 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border/60 bg-background md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/40 py-3 text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
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
          <Divider className="mx-auto mt-8" />
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
        <p
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
          data-reveal
          data-reveal-delay="2"
        >
          An online academy of sacred learning for girls and women — where the tradition of
          <em> ilm-e-deen</em> is taught with adab, by female teachers, in complete parda.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3" data-reveal data-reveal-delay="3">
          <a
            href="#courses"
            className="rounded-sm bg-primary px-6 py-3 text-sm font-medium uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore Courses
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-primary/40 bg-transparent px-6 py-3 text-sm font-medium uppercase tracking-widest text-primary transition-colors hover:bg-primary/5"
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

        <div className="mt-24">
          <SectionHeader
            eyebrow="Additional Programmes"
            title="Skill-Based Courses"
            description="Four vocational programmes — traditional crafts and modern skills, taught alongside the deeni curriculum."
          />
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {skillCourses.map((c) => (
              <div key={c.no} className="bg-card p-8" data-reveal>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-sm text-accent">{c.no}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {c.duration}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl text-primary">{c.name}</h3>
                {c.subtitle && (
                  <p className="mt-2 text-sm text-muted-foreground">{c.subtitle}</p>
                )}
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
        <h3 className="font-serif text-lg text-primary sm:text-xl md:text-2xl">
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
          className="text-xs uppercase tracking-[0.2em] text-primary hover:text-accent"
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
              className="group flex flex-col justify-between border border-border bg-card p-6 transition-colors hover:border-accent"
              data-reveal

            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-accent">Free</span>
                <h3 className="mt-4 font-serif text-2xl text-primary">{c.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {c.duration}
                </p>
              </div>
              <div className="mt-8 text-xs uppercase tracking-[0.25em] text-primary group-hover:text-accent">
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
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Welcome Offer — For New Students</p>
        <h2 className="mt-6 font-serif text-4xl text-primary sm:text-5xl md:text-6xl">
          One fee. All courses.
        </h2>
        <div className="mx-auto mt-10 max-w-md border border-accent/40 bg-card p-6 sm:mt-12 sm:p-10">
          <p className="font-serif text-6xl text-primary sm:text-7xl md:text-8xl">
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
            className="mt-8 inline-block rounded-sm bg-primary px-6 py-3 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors hover:bg-primary/90"
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

function Features() {
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
    <section className="border-b border-border/60 bg-primary/[0.03] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Adab & Care"
          title="How We Teach"
        />
        <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {items.map((i) => (
            <div key={i.k}>
              <p className="font-serif text-3xl text-accent">{i.k}</p>
              <h3 className="mt-4 font-serif text-xl text-primary">{i.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Divider className="mx-auto" />
        <h2 className="mt-8 font-serif text-4xl text-primary md:text-5xl">
          Begin Your Journey
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          For enrollment, course details, or any question — reach us directly.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <a
            href={`tel:${PHONE_TEL}`}
            className="group border border-border bg-card p-8 text-left transition-colors hover:border-accent"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Call</p>
            <p className="mt-4 font-serif text-2xl text-primary">{PHONE}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Tap to dial →
            </p>
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-border bg-card p-8 text-left transition-colors hover:border-accent"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">WhatsApp Channel</p>
            <p className="mt-4 font-serif text-2xl text-primary">Follow & Enroll</p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Official channel →
            </p>
          </a>
        </div>
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
              An online academy of sacred learning for women.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Explore</p>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#courses" className="hover:text-accent">All Courses</a></li>
              <li><a href="#library" className="hover:text-accent">Free Library</a></li>
              <li><a href="#offer" className="hover:text-accent">Welcome Offer</a></li>
              <li><a href="#contact" className="hover:text-accent">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent">Contact</p>
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
          <p>© {new Date().getFullYear()} Jamiya Kaneez E Sayyeda Fatima Lilbanat</p>
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
      <p className="text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
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
