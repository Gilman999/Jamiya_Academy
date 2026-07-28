import { useState } from "react";

const WHATSAPP_URL = "https://wa.me/919368324180?text=Assalamu%20Alaikum%2C%20I%20want%20to%20verify%20my%20result%20or%20certificate";

type ModalType = "results" | "certificates" | "notices" | null;

export function PortalModals({
  activeModal,
  onClose,
}: {
  activeModal: ModalType;
  onClose: () => void;
}) {
  const [rollNo, setRollNo] = useState("");
  const [certId, setCertId] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [certResult, setCertResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  if (!activeModal) return null;

  // Mock Result Search
  const handleResultSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNo.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearchResult({
        studentName: "Ayesha Fatima",
        rollNo: rollNo.toUpperCase(),
        course: "Alima Course — Year 1",
        grade: "Distinction (A+)",
        status: "PASSED",
        percentage: "94.5%",
      });
    }, 800);
  };

  // Mock Certificate Search
  const handleCertSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCertResult({
        certNo: certId.toUpperCase(),
        studentName: "Mariam Khan",
        course: "Tajweed-ul-Quran & Madani Qaida",
        issueDate: "15 January 2026",
        status: "VERIFIED & STATE REGISTERED",
      });
    }, 800);
  };

  const notices = [
    {
      id: "n-1",
      date: "26 July 2026",
      badge: "EXAMINATION",
      title: "Annual Alimiyya & Tajweed Final Examination Schedule 2026",
      content:
        "All online and offline students are hereby notified that the final examinations for the 2025-2026 academic session will commence from August 10th. Detailed date sheets have been sent via WhatsApp groups.",
    },
    {
      id: "n-2",
      date: "20 July 2026",
      badge: "ANNOUNCEMENT",
      title: "1500 Saal Jashn-e-Milad-un-Nabi ﷺ Free Admissions Open",
      content:
        "Admissions for the 4 free foundational courses (Urdu, Nizamat, Namaz, Farz Uloom) are currently open for the new batch. No admission fee or monthly tuition charges required.",
    },
    {
      id: "n-3",
      date: "12 July 2026",
      badge: "HOLIDAY",
      title: "Jumu'ah Mehfil-e-Noor ﷺ & Weekly Recess Schedule",
      content:
        "Classes will remain closed on Friday for Mehfil-e-Noor and spiritual tarbiyat sessions. Live stream recording link will be shared at 4:00 PM.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-card border-2 border-accent max-w-lg w-full rounded-xs shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#1B3B2B] text-white p-6 flex items-center justify-between border-b border-accent/40">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
              ACADEMY PORTAL
            </span>
            <h3 className="font-serif text-2xl text-white font-medium mt-0.5">
              {activeModal === "results" && "Student Results Portal"}
              {activeModal === "certificates" && "Certificate Verification Portal"}
              {activeModal === "notices" && "Academy Notice Board"}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-white/70 hover:text-white text-xl font-bold p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 bg-[#FDFBF7]">
          
          {/* 1. RESULTS MODAL */}
          {activeModal === "results" && (
            <div className="space-y-6">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Enter your Roll Number or Student ID to view your official examination result and mark sheet.
              </p>

              <form onSubmit={handleResultSearch} className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Roll Number / Student ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. JAM-2026-084"
                    className="flex-1 rounded-full border border-border bg-card px-5 py-2.5 text-xs text-primary placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    {loading ? "Checking..." : "Search"}
                  </button>
                </div>
              </form>

              {searchResult && (
                <div className="bg-card border-2 border-accent/60 p-5 rounded-xs space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2">
                    <span className="font-serif text-sm font-bold text-primary">{searchResult.studentName}</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {searchResult.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>Roll No: <span className="font-semibold text-primary">{searchResult.rollNo}</span></div>
                    <div>Course: <span className="font-semibold text-primary">{searchResult.course}</span></div>
                    <div>Grade: <span className="font-semibold text-primary">{searchResult.grade}</span></div>
                    <div>Marks: <span className="font-semibold text-primary">{searchResult.percentage}</span></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. CERTIFICATES MODAL */}
          {activeModal === "certificates" && (
            <div className="space-y-6">
              <p className="text-xs text-muted-foreground leading-relaxed">
                Verify the authenticity of State Government Registered completion certificates issued by Jamiya Academy.
              </p>

              <form onSubmit={handleCertSearch} className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  Certificate Registration ID
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={certId}
                    onChange={(e) => setCertId(e.target.value)}
                    placeholder="e.g. CERT-JK-9402"
                    className="flex-1 rounded-full border border-border bg-card px-5 py-2.5 text-xs text-primary placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-primary/90 transition-all"
                  >
                    {loading ? "Verifying..." : "Verify"}
                  </button>
                </div>
              </form>

              {certResult && (
                <div className="bg-card border-2 border-accent/60 p-5 rounded-xs space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-border/40 pb-2">
                    <span className="font-serif text-sm font-bold text-primary">{certResult.studentName}</span>
                    <span className="bg-accent text-[#1B3B2B] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      VERIFIED
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 text-xs text-muted-foreground">
                    <div>Cert ID: <span className="font-semibold text-primary">{certResult.certNo}</span></div>
                    <div>Programme: <span className="font-semibold text-primary">{certResult.course}</span></div>
                    <div>Issued Date: <span className="font-semibold text-primary">{certResult.issueDate}</span></div>
                    <div>Status: <span className="font-semibold text-emerald-700">{certResult.status}</span></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. NOTICE BOARD MODAL */}
          {activeModal === "notices" && (
            <div className="space-y-4">
              <p className="text-xs text-muted-foreground">
                Official announcements, examination notices, and holiday schedules from Jamiya Academy Administration.
              </p>

              {notices.map((n) => (
                <div key={n.id} className="bg-card border border-border/70 p-4 rounded-xs space-y-2">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
                    <span className="bg-accent/20 text-accent font-bold px-2 py-0.5 rounded-sm">
                      {n.badge}
                    </span>
                    <span className="text-muted-foreground">{n.date}</span>
                  </div>
                  <h4 className="font-serif text-base text-primary font-medium">{n.title}</h4>
                  <p className="text-xs leading-relaxed text-muted-foreground">{n.content}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F5EFE6] border-t border-border/60 flex items-center justify-between text-xs">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-semibold hover:underline"
          >
            Contact Helpdesk on WhatsApp →
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
