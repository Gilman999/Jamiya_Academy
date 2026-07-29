import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { submitAdmissionApplication } from "@/lib/academy-data";
import { Sparkles, ShieldCheck, CheckCircle2, Send, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Online Admission & Student Registration — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      { name: "description", content: "Register online for Alima, Tajweed, Urdu, and Deeni Islamic courses." },
    ],
  }),
  component: RegisterPage,
});

export function RegisterPage() {
  const [formData, setFormData] = useState({
    studentName: "",
    guardianName: "",
    age: "",
    whatsapp: "",
    email: "",
    city: "",
    country: "India",
    learningMode: "online" as "online" | "offline",
    course: "Alima Course (With Fazliyat)",
  });

  const [submitted, setSubmitted] = useState(false);
  const [assignedAppId, setAssignedAppId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const app = submitAdmissionApplication(formData);
    setAssignedAppId(app.id);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C201D] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#1B3B2B]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-4xl rounded-3xl bg-white border-2 border-[#1B3B2B]/15 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          {/* LEFT HERO */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#1B3B2B] via-[#244b37] to-[#12271c] text-white p-8 flex-col justify-between relative overflow-hidden border-r border-[#D4AF37]/30">
            <div className="space-y-6 relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FED65B] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> 1500 Saal Jashn Batch
              </span>
              <h2 className="font-serif text-3xl font-bold leading-tight text-white">
                Online Student Registration
              </h2>
              <p className="text-xs text-white/80 leading-relaxed">
                Join Jamiya Kaneez E Sayyeda Fatima. 100% Free Foundational Courses in Urdu, Nizamat, Namaz, & Farz Uloom for Women & Girls.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2 relative z-10 text-xs">
              <p className="font-bold text-[#FED65B]">✔️ No Admission Fee Required</p>
              <p className="text-white/80">✔️ State Registered Sanad Certificates</p>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-white/70 font-semibold uppercase tracking-wider relative z-10 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Direct Admin Review
              </span>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6 bg-[#FDFBF7]">
            {submitted ? (
              <div className="text-center space-y-4 p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto text-2xl shadow-md">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-bold text-emerald-950">Registration Submitted Successfully!</h3>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Your application ID is <strong className="font-mono text-[#1B3B2B]">{assignedAppId}</strong>. It has been routed directly to the Academy Administration Panel for review and approval.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <Link
                    to="/student-login"
                    className="px-6 py-2.5 rounded-full bg-[#1B3B2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#244b37]"
                  >
                    Go to Student Login →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">ADMISSION APPLICATION</span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B2B]">
                    Student Enrollment Form
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Fill in your details below to register for the upcoming academic session.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Sumayya Fatima"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Father / Husband Name *
                    </label>
                    <input
                      type="text"
                      value={formData.guardianName}
                      onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                      placeholder="e.g. Mohd Tariq"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="+91 93683 24180"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sumayya@gmail.com"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                    Select Desired Course *
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option>Alima Course (With Fazliyat) — 5 Years</option>
                    <option>Mubaligha Course — 1 Year</option>
                    <option>Tajweed Course (With Madani Qaida) — 3 Months</option>
                    <option>Urdu Course (Read & Write) — 3 Months [FREE]</option>
                    <option>Nizamat Course — 3 Months [FREE]</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      City / District
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. New Delhi"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Learning Mode
                    </label>
                    <select
                      value={formData.learningMode}
                      onChange={(e) => setFormData({ ...formData, learningMode: e.target.value as any })}
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="online">Online Live Classes (Worldwide)</option>
                      <option value="offline">Offline Campus Classrooms</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1B3B2B] text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#244b37] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-4 h-4 text-[#FED65B]" /> Submit Online Admission Application
                </button>
              </form>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
