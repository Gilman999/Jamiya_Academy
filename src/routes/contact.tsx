import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ScrollEffects } from "@/components/scroll-effects";

const WHATSAPP_URL = "https://wa.me/919368324180?text=Assalamu%20Alaikum%2C%20I%20have%20an%20inquiry%20regarding%20Jamiya%20Academy";
const PHONE = "+91 93683 24180";
const PHONE_TEL = "+919368324180";
const EMAIL = "info@jamiyaacademy.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      {
        name: "description",
        content:
          "Contact Jamiya Academy female directress and support team. WhatsApp: +91 93683 24180. Inquire about Alima courses, admissions, timings, and campus.",
      },
      { property: "og:title", content: "Contact Us — Jamiya Academy Helpdesk" },
    ],
  }),
  component: ContactPage,
});

export function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Admission Inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      const msg = `Assalamu%20Alaikum%2C%20Inquiry%20from%20Website!%0A%0A*Name:*%20${encodeURIComponent(formState.name)}%0A*Phone:*%20${encodeURIComponent(formState.phone)}%0A*Subject:*%20${encodeURIComponent(formState.subject)}%0A*Message:*%20${encodeURIComponent(formState.message)}`;
      window.open(`https://wa.me/919368324180?text=${msg}`, "_blank");
    }, 500);
  };

  const faqs = [
    {
      q: "Are all online and offline classes taught by female scholars?",
      a: "Yes, 100% of our teachers, Qariyas, and directresses are qualified female scholars. We strictly maintain complete Islamic Parda across all live streams and physical campus classrooms.",
    },
    {
      q: "How do live online classes work for global students?",
      a: "Online classes are conducted live six days a week through private video streams. High-quality HD recordings of every lecture are uploaded daily so students who miss a live session can catch up anytime.",
    },
    {
      q: "Which courses are offered completely free of charge?",
      a: "Four foundational courses — Urdu (Read & Write), Nizamat (Event Hosting), Namaz (Complete Prayer Guide), and Farz Uloom — are offered 100% free with no admission fee or tuition charges.",
    },
    {
      q: "Are completion certificates registered by the State Government?",
      a: "Yes, Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ is a State Government Registered Academy. Official certificates and diplomas are awarded upon successful completion of Alimiyya, Tajweed, and skill programs.",
    },
    {
      q: "What is the fee structure for paid courses?",
      a: "Online Deeni Islamic courses start at just ₹299/month, Vocational Skill & Language programs are ₹350/month, and Offline Campus learning is ₹500/month.",
    },
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
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">DIRECT SUPPORT & GUIDANCE</span>
            <div className="h-px w-12 bg-accent/40" />
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl md:text-6xl text-primary font-medium leading-tight" data-reveal>
            Get in Touch With Us
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-base text-muted-foreground leading-relaxed" data-reveal data-reveal-delay="1">
            Have questions regarding admissions, fees, course timings, or online/offline learning? Our female administration team is here to assist you.
          </p>
        </div>
      </section>

      {/* QUICK CONTACT CARDS — Swipeable Horizontally on Mobile */}
      <section className="py-10 sm:py-16 bg-[#F7F4EE] border-b border-border/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 sm:pb-0">
            
            {/* Card 1 - WhatsApp */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[80vw] sm:w-auto max-w-[300px] sm:max-w-none shrink-0 sm:shrink snap-center bg-card border border-border/80 p-6 rounded-xs hover:border-accent transition-all group shadow-xs flex flex-col justify-between space-y-4"
              data-reveal
            >
              <div>
                <span className="text-3xl">💬</span>
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold mt-3">FASTEST RESPONSE</p>
                <h3 className="font-serif text-xl text-primary font-medium mt-1 group-hover:text-accent transition-colors">
                  WhatsApp Direct
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Chat directly with our female directress for instant admission assistance.
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                Chat Now <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>

            {/* Card 2 - Phone Call */}
            <a
              href={`tel:${PHONE_TEL}`}
              className="w-[80vw] sm:w-auto max-w-[300px] sm:max-w-none shrink-0 sm:shrink snap-center bg-card border border-border/80 p-6 rounded-xs hover:border-accent transition-all group shadow-xs flex flex-col justify-between space-y-4"
              data-reveal
              data-reveal-delay="1"
            >
              <div>
                <span className="text-3xl">📞</span>
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold mt-3">CALL HELPLINE</p>
                <h3 className="font-serif text-xl text-primary font-medium mt-1 group-hover:text-accent transition-colors">
                  {PHONE}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Available Mon – Sat, 9:00 AM – 6:00 PM for phone inquiries.
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                Call Helpline <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>

            {/* Card 3 - Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="w-[80vw] sm:w-auto max-w-[300px] sm:max-w-none shrink-0 sm:shrink snap-center bg-card border border-border/80 p-6 rounded-xs hover:border-accent transition-all group shadow-xs flex flex-col justify-between space-y-4"
              data-reveal
              data-reveal-delay="2"
            >
              <div>
                <span className="text-3xl">✉️</span>
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold mt-3">EMAIL INQUIRIES</p>
                <h3 className="font-serif text-xl text-primary font-medium mt-1 group-hover:text-accent transition-colors truncate">
                  {EMAIL}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Send official questions, partnership proposals, or document queries.
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-1">
                Send Email <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>

            {/* Card 4 - Campus Address */}
            <div
              className="w-[80vw] sm:w-auto max-w-[300px] sm:max-w-none shrink-0 sm:shrink snap-center bg-card border border-border/80 p-6 rounded-xs hover:border-accent transition-all group shadow-xs flex flex-col justify-between space-y-4"
              data-reveal
              data-reveal-delay="3"
            >
              <div>
                <span className="text-3xl">📍</span>
                <p className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold mt-3">OFFLINE CAMPUS</p>
                <h3 className="font-serif text-xl text-primary font-medium mt-1">
                  Academy Campus
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  State Registered Academy Campus, Uttar Pradesh, India.
                </p>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-accent">
                State Registered
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* FORM & FAQ SECTION */}
      <section className="py-16 sm:py-24 bg-[#FBF9F5]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Contact Form */}
            <div className="lg:col-span-6 bg-card border border-border/80 p-8 sm:p-10 rounded-xs shadow-sm space-y-6" data-reveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">SEND A MESSAGE</span>
                <h2 className="font-serif text-3xl text-primary font-medium mt-1">
                  Have a Specific Question?
                </h2>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Fill out the quick form below. Submitting will launch WhatsApp with your pre-filled inquiry.
                </p>
              </div>

              {submitted ? (
                <div className="p-6 bg-accent/15 border border-accent rounded-xs text-center space-y-3">
                  <span className="text-2xl text-accent font-bold">✓</span>
                  <h4 className="font-serif text-xl text-primary font-medium">Message Redirected to WhatsApp</h4>
                  <p className="text-xs text-muted-foreground">
                    If WhatsApp didn't open automatically, click the button below:
                  </p>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground"
                  >
                    Open WhatsApp Chat ➔
                  </a>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Mariam Khan"
                      className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
                        Inquiry Topic *
                      </label>
                      <select
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary focus:border-accent focus:outline-none"
                      >
                        <option value="Admission Inquiry">Admission Inquiry</option>
                        <option value="Fee Structure">Fee Structure & Discounts</option>
                        <option value="Online Class Timings">Online Class Timings</option>
                        <option value="Free Courses">Free Foundational Courses</option>
                        <option value="Certificate Verification">Certificate Verification</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
                      Your Message / Question *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Type your detailed question here..."
                      className="w-full rounded-xs border border-border bg-[#FBF9F5] p-4 text-xs text-primary focus:border-accent focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90 transition-all shadow-md cursor-pointer"
                  >
                    Send Inquiry on WhatsApp ➔
                  </button>
                </form>
              )}
            </div>

            {/* Right: FAQ Accordion */}
            <div className="lg:col-span-6 space-y-6" data-reveal data-reveal-delay="1">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">FREQUENTLY ASKED QUESTIONS</span>
                <h2 className="font-serif text-3xl text-primary font-medium mt-1">
                  Common Inquiries Answered
                </h2>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Quick responses to popular questions from new students and parents.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border/80 rounded-xs overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full text-left p-5 font-serif text-lg text-primary font-medium flex items-center justify-between hover:text-accent transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="text-accent font-bold text-base ml-2">
                        {openFaq === idx ? "−" : "+"}
                      </span>
                    </button>

                    {openFaq === idx && (
                      <div className="px-5 pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3 animate-in fade-in duration-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-20 border-t border-border bg-[#162E25] text-primary-foreground">
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
              <li><a href="/contact" className="hover:text-accent transition-colors">Contact Us</a></li>
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
