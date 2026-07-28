import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ScrollEffects } from "@/components/scroll-effects";

const WHATSAPP_PHONE = "919368324180";
const PHONE = "+91 93683 24180";

export const Route = createFileRoute("/admission")({
  head: () => ({
    meta: [
      { title: "Admission Form — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      {
        name: "description",
        content:
          "Official online admission application form for Jamiya Kaneez E Sayyeda Fatima Academy. Enroll in Alima, Tajweed, Skill, or Language courses.",
      },
      { property: "og:title", content: "Online Admission Form — Jamiya Academy" },
    ],
  }),
  component: AdmissionPage,
});

export function AdmissionPage() {
  const [formData, setFormData] = useState({
    studentName: "",
    guardianName: "",
    age: "",
    whatsapp: "",
    email: "",
    city: "",
    country: "India",
    learningMode: "online",
    category: "deeni",
    course: "Alima Course (With Fazliyat)",
    batchTiming: "Morning (9:00 AM - 11:30 AM)",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [appId, setAppId] = useState("");

  const deeniCourses = [
    "Alima Course (With Fazliyat) — 5 Years",
    "Mubaligha Course — 1 Year",
    "Tajweed Course (With Madani Qaida) — 3 Months",
    "Qirat Course (With Nazeera) — 1 Year",
    "Bayan Course — 3 Months",
    "Urdu Course (Read & Write) — 3 Months [FREE]",
    "Nizamat Course — 3 Months [FREE]",
    "Namaz Course — 3 Months [FREE]",
    "Farz Uloom Course — 3 Months [FREE]",
  ];

  const skillCourses = [
    "Stitching & Tailoring Masterclass — 6 Months",
    "Fashion Designing & Pattern Making — 6 Months",
    "Mehndi & Henna Artistry — 3 Months",
    "Calligraphy & Arabic Typography — 3 Months",
    "Video Editing & Digital Content — 3 Months",
  ];

  const languageCourses = [
    "English Spoken & Fluency — 6 Months",
    "Arabic Language & Grammar — 6 Months",
    "Persian (Farsi) Course — 3 Months",
    "Turkish Language Basics — 3 Months",
  ];

  const getCourseOptions = () => {
    if (formData.category === "skill") return skillCourses;
    if (formData.category === "languages") return languageCourses;
    return deeniCourses;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `JK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setAppId(generatedId);
    setSubmitted(true);
  };

  const getWhatsAppMessage = () => {
    const text = `Assalamu%20Alaikum%2C%20I%20have%20submitted%20my%20Admission%20Form!%0A%0A*Application%20ID:*%20${appId}%0A*Student%20Name:*%20${encodeURIComponent(formData.studentName)}%0A*Guardian:*%20${encodeURIComponent(formData.guardianName)}%0A*WhatsApp:*%20${encodeURIComponent(formData.whatsapp)}%0A*City/Country:*%20${encodeURIComponent(formData.city)}%2C%20${encodeURIComponent(formData.country)}%0A*Learning%20Mode:*%20${encodeURIComponent(formData.learningMode.toUpperCase())}%0A*Selected%20Course:*%20${encodeURIComponent(formData.course)}%0A*Batch:*%20${encodeURIComponent(formData.batchTiming)}`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-primary">
      <ScrollEffects />
      <Navbar />

      {/* HERO HEADER */}
      <section className="relative border-b border-border/60 py-16 sm:py-24 bg-[#FBF9F5] overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-accent/40" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">ADMISSION BATCH 2026-2027</span>
            <div className="h-px w-12 bg-accent/40" />
          </div>

          <h1 className="font-serif text-4xl text-primary sm:text-5xl md:text-6xl font-medium leading-tight" data-reveal>
            Student Admission Form
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed" data-reveal data-reveal-delay="1">
            Fill out the official application form for Online or Offline campus learning. Our admissions directress will contact you within 24 hours.
          </p>
        </div>
      </section>

      {/* MAIN FORM / CONFIRMATION SECTION */}
      <section className="py-16 sm:py-24 bg-[#F7F4EE]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          
          {submitted ? (
            /* SUCCESS CONFIRMATION CARD */
            <div className="bg-card border-2 border-accent p-8 sm:p-12 shadow-2xl rounded-xs text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-3xl text-accent border border-accent">
                ✓
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent">APPLICATION SUBMITTED</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-primary font-medium mt-2">
                  Welcome to Jamiya Academy
                </h2>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  Application Tracking ID: <span className="font-bold text-primary">{appId}</span>
                </p>
              </div>

              <div className="bg-[#FBF9F5] border border-border/80 p-6 rounded-xs text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground">Student Name:</span>
                  <span className="font-semibold text-primary">{formData.studentName}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground">Selected Course:</span>
                  <span className="font-semibold text-primary">{formData.course}</span>
                </div>
                <div className="flex justify-between border-b border-border/40 pb-2">
                  <span className="text-muted-foreground">Learning Mode:</span>
                  <span className="font-semibold text-accent uppercase">{formData.learningMode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Batch Slot:</span>
                  <span className="font-semibold text-primary">{formData.batchTiming}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
                Click below to send your application details directly to our Admissions Directress on WhatsApp for fast approval & roll number generation.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-primary px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Send Details To WhatsApp ➔
                </a>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="rounded-full border border-border px-6 py-3 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
                >
                  Edit Application
                </button>
              </div>
            </div>
          ) : (
            /* ADMISSION FORM */
            <form onSubmit={handleSubmit} className="bg-card border border-border/80 p-8 sm:p-12 shadow-sm rounded-xs space-y-8" data-reveal>
              
              {/* STEP 1: PERSONAL DETAILS */}
              <div className="space-y-4 border-b border-border/60 pb-8">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center">1</span>
                  <h3 className="font-serif text-2xl text-primary font-medium">Student Personal Information</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                      Full Name of Student *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Fatima Zohra"
                      className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                      Guardian / Father Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      placeholder="e.g. Mohammad Ali"
                      className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      required
                      min="5"
                      max="80"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="e.g. 19"
                      className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                      City / State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Bareilly / New Delhi"
                      className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary focus:border-accent focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                      Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. India / UK / UAE"
                      className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: COURSE & MODE SELECTION */}
              <div className="space-y-4 border-b border-border/60 pb-8">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center">2</span>
                  <h3 className="font-serif text-2xl text-primary font-medium">Programme & Learning Mode</h3>
                </div>

                {/* Mode Selector */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, learningMode: "online" })}
                    className={`p-4 rounded-xs border-2 text-left transition-all ${
                      formData.learningMode === "online"
                        ? "border-accent bg-accent/10 text-primary"
                        : "border-border/80 bg-[#FBF9F5] text-muted-foreground"
                    }`}
                  >
                    <span className="block font-serif text-lg font-medium">Online Live Classes</span>
                    <span className="block text-[10px] uppercase tracking-wider mt-1 text-accent font-bold">Globally Study From Home</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, learningMode: "offline" })}
                    className={`p-4 rounded-xs border-2 text-left transition-all ${
                      formData.learningMode === "offline"
                        ? "border-accent bg-accent/10 text-primary"
                        : "border-border/80 bg-[#FBF9F5] text-muted-foreground"
                    }`}
                  >
                    <span className="block font-serif text-lg font-medium">Offline Campus</span>
                    <span className="block text-[10px] uppercase tracking-wider mt-1 text-accent font-bold">Physical Classroom Learning</span>
                  </button>
                </div>

                {/* Category Radio Pills */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                    Department Category *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "deeni", label: "Deeni Islamic Courses" },
                      { id: "skill", label: "Skill & Vocational" },
                      { id: "languages", label: "World Languages" },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          const opts = cat.id === "skill" ? skillCourses : cat.id === "languages" ? languageCourses : deeniCourses;
                          setFormData({ ...formData, category: cat.id, course: opts[0] });
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.18em] transition-all ${
                          formData.category === cat.id
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "bg-[#FBF9F5] border border-border text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specific Course Dropdown */}
                <div className="pt-2">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                    Select Specific Course *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary focus:border-accent focus:outline-none"
                  >
                    {getCourseOptions().map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* STEP 3: TIMINGS & NOTES */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center">3</span>
                  <h3 className="font-serif text-2xl text-primary font-medium">Batch Timings & Requirements</h3>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                    Preferred Batch Timing *
                  </label>
                  <select
                    value={formData.batchTiming}
                    onChange={(e) => setFormData({ ...formData, batchTiming: e.target.value })}
                    className="w-full rounded-full border border-border bg-[#FBF9F5] px-5 py-3 text-xs text-primary focus:border-accent focus:outline-none"
                  >
                    <option value="Morning (9:00 AM - 11:30 AM)">Morning Slot (9:00 AM - 11:30 AM)</option>
                    <option value="Afternoon (2:00 PM - 4:30 PM)">Afternoon Slot (2:00 PM - 4:30 PM)</option>
                    <option value="Evening (5:00 PM - 7:30 PM)">Evening Slot (5:00 PM - 7:30 PM)</option>
                    <option value="Weekend Special (Saturday/Sunday)">Weekend Special Batch (Sat & Sun)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">
                    Additional Notes / Previous Islamic Study Background
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Mention any prior Quran reading experience or special timing requests..."
                    className="w-full rounded-xs border border-border bg-[#FBF9F5] p-4 text-xs text-primary focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full bg-primary px-12 py-4 text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl cursor-pointer"
                >
                  Submit Admission Application ➔
                </button>
              </div>

            </form>
          )}

        </div>
      </section>

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
