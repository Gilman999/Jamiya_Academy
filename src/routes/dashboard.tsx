import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  Video,
  PlayCircle,
  FileText,
  Library,
  HelpCircle,
  CalendarCheck,
  TrendingUp,
  Receipt,
  Award,
  User,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Download,
  ChevronRight,
  BookMarked,
  Filter,
  Check,
  AlertTriangle,
  Printer
} from "lucide-react";
import { getCurrentStudent, signOutStudent, StudentProfile, DEMO_STUDENT } from "@/lib/supabase";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Portal Dashboard — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      { name: "description", content: "Student Dashboard for course progress, live classes, assignments, and certificates." },
    ],
  }),
  component: StudentDashboardPage,
});

export function StudentDashboardPage() {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "courses"
    | "live-classes"
    | "recorded-classes"
    | "assignments"
    | "library"
    | "tests"
    | "attendance"
    | "report"
    | "fee"
    | "certificates"
    | "profile"
  >("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState("ALL");
  const [activeQuizModal, setActiveQuizModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const current = await getCurrentStudent();
      if (current) {
        setStudent(current);
      } else {
        setStudent(DEMO_STUDENT);
      }
      setLoading(false);
    }
    loadSession();
  }, []);

  const handleLogout = async () => {
    await signOutStudent();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#1B3B2B] border-t-[#D4AF37] rounded-full animate-spin mx-auto" />
          <p className="font-serif text-[#1B3B2B] font-bold text-lg">Loading Jamiya Student Portal...</p>
        </div>
      </div>
    );
  }

  const activeStudent = student || DEMO_STUDENT;

  const navItems = [
    { id: "overview", label: "Dashboard Home", icon: LayoutDashboard },
    { id: "courses", label: "My Courses", icon: BookOpen, badge: "3 Active" },
    { id: "live-classes", label: "Live Classes", icon: Video, badge: "LIVE NOW" },
    { id: "recorded-classes", label: "Recorded Classes", icon: PlayCircle },
    { id: "library", label: "Digital Library", icon: Library },
    { id: "assignments", label: "Assignments", icon: FileText, badge: "2 Due" },
    { id: "tests", label: "Online Tests", icon: HelpCircle },
    { id: "attendance", label: "Attendance", icon: CalendarCheck },
    { id: "report", label: "Progress Report", icon: TrendingUp },
    { id: "fee", label: "Fee Status", icon: Receipt },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "profile", label: "My Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C201D] flex overflow-hidden font-sans">
      
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[280px] bg-[#1B3B2B] text-white shadow-2xl z-30 border-r border-[#D4AF37]/30">
        
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1B3B2B] flex items-center justify-center font-serif font-bold text-xl shadow-md shrink-0">
            J
          </div>
          <div className="overflow-hidden">
            <h1 className="font-serif font-bold text-base text-[#FED65B] leading-tight truncate">
              Jamiya Kaneez
            </h1>
            <p className="text-[10px] text-white/70 uppercase tracking-widest leading-none mt-0.5">
              Student Portal
            </p>
          </div>
        </div>

        {/* Student Mini Card */}
        <div className="mx-4 my-4 p-3 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
          <img
            src={activeStudent.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"}
            alt={activeStudent.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]"
          />
          <div className="overflow-hidden text-xs">
            <p className="font-bold text-white truncate">{activeStudent.name}</p>
            <p className="text-[10px] text-[#FED65B] font-mono">{activeStudent.rollNo}</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#D4AF37] text-[#1B3B2B] font-bold shadow-md transform translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#1B3B2B]" : "text-[#D4AF37]"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      item.badge.includes("LIVE")
                        ? "bg-red-500 text-white animate-pulse"
                        : isActive
                        ? "bg-[#1B3B2B] text-white"
                        : "bg-white/15 text-[#FED65B]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-white/10 mt-auto">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-red-300 hover:bg-red-500/20 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER NAV */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden">
          <div className="w-[280px] h-full bg-[#1B3B2B] text-white flex flex-col p-4 shadow-2xl animate-in slide-in-from-left">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-serif text-lg font-bold text-[#FED65B]">Jamiya Portal</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#D4AF37] text-[#1B3B2B] font-bold"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </nav>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-auto flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-red-300 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-[280px] flex flex-col min-h-screen">
        
        {/* TOP HEADER BAR */}
        <header className="sticky top-0 z-20 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#1B3B2B]/10 px-4 py-3 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#1B3B2B] lg:hidden hover:bg-[#1B3B2B]/5 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-[#1B3B2B]">
                Assalamu Alaikum, {activeStudent.name.split(" ")[0]} 👋
              </h2>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {activeStudent.course} • Batch {activeStudent.batch}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="hidden md:flex items-center gap-2 bg-[#F5EFE6] border border-[#1B3B2B]/15 rounded-full px-3.5 py-1.5 text-xs">
              <Search className="w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search lectures, kitabs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent focus:outline-none w-44 text-xs text-[#1B3B2B]"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                className="p-2 rounded-full bg-[#F5EFE6] hover:bg-[#1B3B2B]/10 text-[#1B3B2B] transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#D4AF37] rounded-full ring-2 ring-white" />
              </button>
            </div>

            {/* Return to Public Website */}
            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-[#1B3B2B] text-[#1B3B2B] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-[#1B3B2B] hover:text-white transition-all"
            >
              <span>Main Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </header>

        {/* DASHBOARD BODY CONTENT BY TAB */}
        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Welcome Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1B3B2B] to-[#2D5A42] text-white p-6 sm:p-8 shadow-xl border border-[#D4AF37]/40">
                <div className="relative z-10 space-y-3 max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FED65B] text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" /> State Registered Academic Portal
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                    Welcome to Your Scholastic Sanctuary
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    You have <strong className="text-[#FED65B]">1 upcoming Live Class today</strong> at 4:30 PM (Tajweed & Qur’anic Phonetics) and 2 pending assignments.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveTab("live-classes")}
                      className="rounded-full bg-[#D4AF37] text-[#1B3B2B] px-5 py-2.5 text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#e9c349] transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Video className="w-4 h-4" /> Join Live Class →
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("courses")}
                      className="rounded-full border border-white/40 bg-white/10 text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer"
                    >
                      View All Courses
                    </button>
                  </div>
                </div>
                <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none text-9xl font-serif text-[#D4AF37]">
                  ﷺ
                </div>
              </div>

              {/* Stats Overview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#1B3B2B]/10 shadow-sm space-y-2 hover:border-[#D4AF37] transition-all">
                  <div className="flex items-center justify-between text-[#1B3B2B]">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Attendance</span>
                    <CalendarCheck className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#1B3B2B]">{activeStudent.attendance}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Excellent Record (Target 90%+)
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#1B3B2B]/10 shadow-sm space-y-2 hover:border-[#D4AF37] transition-all">
                  <div className="flex items-center justify-between text-[#1B3B2B]">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Courses</span>
                    <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#1B3B2B]">3 Courses</p>
                  <p className="text-[11px] text-muted-foreground">Alima, Tajweed & Hadith</p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#1B3B2B]/10 shadow-sm space-y-2 hover:border-[#D4AF37] transition-all">
                  <div className="flex items-center justify-between text-[#1B3B2B]">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Assignments</span>
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#1B3B2B]">2 Pending</p>
                  <p className="text-[11px] text-amber-700 font-semibold">Due in 3 Days</p>
                </div>

                <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#1B3B2B]/10 shadow-sm space-y-2 hover:border-[#D4AF37] transition-all">
                  <div className="flex items-center justify-between text-[#1B3B2B]">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fee Status</span>
                    <Receipt className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#1B3B2B]">PAID</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">Up to Date (Zero Dues)</p>
                </div>
              </div>

              {/* Course Progress & Upcoming Class Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Active Courses List */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xl font-bold text-[#1B3B2B]">Enrolled Academic Courses</h4>
                    <button
                      type="button"
                      onClick={() => setActiveTab("courses")}
                      className="text-xs font-bold text-[#1B3B2B] hover:text-[#D4AF37] uppercase tracking-wider flex items-center gap-1"
                    >
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#1B3B2B]/10 hover:shadow-md transition-all space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1B3B2B] text-white text-[10px] font-bold uppercase tracking-wider">
                          Primary Sanad
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">Progress: 82%</span>
                      </div>
                      <h5 className="font-serif text-lg font-bold text-[#1B3B2B]">
                        Alimiyya Degree Course (Year 2)
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        Includes Tafseer-ul-Quran, Mishkat-ul-Masabih, Fiqh-e-Hanafi, and Arabic Grammar.
                      </p>
                      <div className="w-full bg-[#1B3B2B]/10 rounded-full h-2 overflow-hidden">
                        <div className="bg-[#1B3B2B] h-full rounded-full w-[82%]" />
                      </div>
                      <div className="pt-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Instructor: Muftia Fatima Ali Hashmi</span>
                        <button
                          type="button"
                          onClick={() => setActiveTab("courses")}
                          className="font-bold text-[#1B3B2B] hover:underline"
                        >
                          Continue Learning →
                        </button>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#1B3B2B]/10 hover:shadow-md transition-all space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D4AF37] text-[#1B3B2B] text-[10px] font-bold uppercase tracking-wider">
                          Certificate
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">Progress: 94%</span>
                      </div>
                      <h5 className="font-serif text-lg font-bold text-[#1B3B2B]">
                        Tajweed-ul-Quran & Madani Qaida
                      </h5>
                      <p className="text-xs text-muted-foreground">
                        Makharij correction, Sifat, and Qirat rules with practical recitation exercises.
                      </p>
                      <div className="w-full bg-[#1B3B2B]/10 rounded-full h-2 overflow-hidden">
                        <div className="bg-[#D4AF37] h-full rounded-full w-[94%]" />
                      </div>
                      <div className="pt-1 flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Instructor: Qaria Ayesha Siddiqua</span>
                        <button
                          type="button"
                          onClick={() => setActiveTab("courses")}
                          className="font-bold text-[#1B3B2B] hover:underline"
                        >
                          Continue Recitation →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Sidebar Widget */}
                <div className="space-y-6">
                  <div className="p-5 rounded-xl bg-[#1B3B2B] text-white space-y-4 border border-[#D4AF37]/40 shadow-lg">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#FED65B] flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> Live Timetable
                      </span>
                      <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">
                        Today
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold text-[#FED65B]">
                          <span>04:30 PM - 05:30 PM</span>
                          <span>ZOOM LIVE</span>
                        </div>
                        <p className="text-xs font-semibold">Tafseer Surah An-Nur & Fiqh</p>
                        <p className="text-[10px] text-white/60">Muftia Fatima Ali Hashmi</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTab("live-classes")}
                      className="w-full rounded-lg bg-[#D4AF37] text-[#1B3B2B] py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#e9c349] transition-colors cursor-pointer"
                    >
                      Enter Live Classroom →
                    </button>
                  </div>

                  <div className="p-5 rounded-xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-3">
                    <h4 className="font-serif font-bold text-[#1B3B2B] text-base flex items-center justify-between">
                      <span>Academy Notices</span>
                      <span className="text-xs font-sans text-[#D4AF37] font-semibold">Latest</span>
                    </h4>
                    <ul className="space-y-2 text-xs divide-y divide-[#1B3B2B]/10">
                      <li className="pt-2 space-y-1">
                        <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">EXAM NOTICE</span>
                        <p className="font-semibold text-[#1B3B2B]">Annual Examination Date Sheet released for 2026 Batch.</p>
                      </li>
                      <li className="pt-2 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest">MEHFIL</span>
                        <p className="font-semibold text-[#1B3B2B]">Friday Mehfil-e-Noor ﷺ starts at 3:30 PM live stream.</p>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: MY COURSES */}
          {activeTab === "courses" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B3B2B]/10 pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">My Registered Courses</h3>
                  <p className="text-xs text-muted-foreground">Access syllabus, lecture notes, and assignments for your enrolled programs.</p>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#1B3B2B] text-white text-xs font-bold uppercase tracking-wider">
                  3 Enrolled Courses
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Alimiyya Degree Course (Year 2)",
                    badge: "YEAR 2 • ALIMIA",
                    progress: 82,
                    modules: "24 Modules Completed",
                    instructor: "Muftia Fatima Ali Hashmi",
                    desc: "Tafseer Surah An-Nur, Mishkat Hadith volume 1, Fiqh Hanafi, & Sarf-Nahw.",
                  },
                  {
                    title: "Tajweed-ul-Quran & Madani Qaida",
                    badge: "TAJWEED • SPECIALIZATION",
                    progress: 94,
                    modules: "18 Modules Completed",
                    instructor: "Qaria Ayesha Siddiqua",
                    desc: "Correct makhraj articulation, Sifat-e-Lazimah, and voice recitation coaching.",
                  },
                  {
                    title: "Hadith & Sunnah Studies",
                    badge: "ADVANCED HADITH",
                    progress: 68,
                    modules: "12 Modules Completed",
                    instructor: "Alima Zoya Khan",
                    desc: "Detailed study of Forty Hadith An-Nawawi and Mishkat-ul-Masabih.",
                  },
                ].map((c, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#1B3B2B] text-white text-[10px] font-bold uppercase tracking-widest">
                        {c.badge}
                      </span>
                      <h4 className="font-serif text-xl font-bold text-[#1B3B2B]">{c.title}</h4>
                      <p className="text-xs text-muted-foreground">{c.desc}</p>
                      <p className="text-xs text-[#1B3B2B] font-semibold">Instructor: {c.instructor}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>Syllabus Covered</span>
                          <span>{c.progress}%</span>
                        </div>
                        <div className="w-full bg-[#1B3B2B]/15 rounded-full h-2">
                          <div className="bg-[#1B3B2B] h-2 rounded-full" style={{ width: `${c.progress}%` }} />
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground font-mono">{c.modules}</p>
                    </div>

                    <button
                      type="button"
                      className="w-full rounded-xl bg-[#1B3B2B] text-white py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#2D5A42] transition-colors cursor-pointer"
                    >
                      Open Course Modules →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: LIVE CLASSES */}
          {activeTab === "live-classes" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Live Interactive Classrooms</h3>
                <p className="text-xs text-muted-foreground">Join scheduled live audio/video sessions directly with teachers.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1B3B2B] to-[#2D5A42] text-white space-y-6 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-red-500 text-white text-xs font-bold uppercase tracking-widest animate-pulse flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-ping" /> LIVE CLASS SESSION ACTIVE
                  </span>
                  <span className="text-xs font-mono text-[#FED65B]">Classroom ID: JAM-LIVE-882</span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Tafseer Surah An-Nur & Islamic Fiqh
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80">
                    Instructor: Muftia Fatima Ali Hashmi • Time: 04:30 PM - 05:30 PM IST
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <a
                    href="https://zoom.us"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#D4AF37] text-[#1B3B2B] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#e9c349] transition-all shadow-lg flex items-center gap-2"
                  >
                    <Video className="w-4 h-4" /> Enter Zoom Live Classroom →
                  </a>
                </div>
              </div>

              {/* Timetable Table */}
              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B]">Weekly Live Class Schedule</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1B3B2B]/20 text-[#1B3B2B]">
                        <th className="py-2.5 font-bold uppercase">Day</th>
                        <th className="py-2.5 font-bold uppercase">Subject</th>
                        <th className="py-2.5 font-bold uppercase">Time</th>
                        <th className="py-2.5 font-bold uppercase">Instructor</th>
                        <th className="py-2.5 font-bold uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1B3B2B]/10">
                      <tr>
                        <td className="py-3 font-semibold">Monday - Wednesday</td>
                        <td>Tafseer Surah An-Nur</td>
                        <td>04:30 PM - 05:30 PM</td>
                        <td>Muftia Fatima Ali Hashmi</td>
                        <td><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">SCHEDULED</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">Thursday</td>
                        <td>Tajweed Phonetics & Voice Recitation</td>
                        <td>05:00 PM - 06:00 PM</td>
                        <td>Qaria Ayesha Siddiqua</td>
                        <td><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">SCHEDULED</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 font-semibold">Friday</td>
                        <td>Jashn-e-Milad & Mehfil-e-Noor ﷺ</td>
                        <td>03:30 PM - 05:00 PM</td>
                        <td>Academy Directress</td>
                        <td><span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">SPECIAL MEHFIL</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RECORDED CLASSES */}
          {activeTab === "recorded-classes" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B3B2B]/10 pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Recorded Video Lecture Library</h3>
                  <p className="text-xs text-muted-foreground">Replay past lectures anytime for revision and exam prep.</p>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {["ALL", "TAFSEER", "TAJWEED", "HADITH", "FIQH"].map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setSelectedSubjectFilter(sub)}
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer ${
                        selectedSubjectFilter === sub
                          ? "bg-[#1B3B2B] text-white"
                          : "bg-[#F5EFE6] text-[#1B3B2B] hover:bg-[#1B3B2B]/10"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Surah Al-Baqarah Ayah 255-286 Detailed Tafseer", date: "26 July 2026", duration: "52 Mins", category: "TAFSEER" },
                  { title: "Tajweed Rules: Ghunna & Ikhfa Masterclass", date: "24 July 2026", duration: "45 Mins", category: "TAJWEED" },
                  { title: "Hadith 1: Intentions (Innamal A'malu Bin Niyyat)", date: "22 July 2026", duration: "60 Mins", category: "HADITH" },
                  { title: "Fiqh-e-Hanafi: Masail-e-Taharat & Wudu", date: "20 July 2026", duration: "50 Mins", category: "FIQH" },
                  { title: "Arabic Grammar: Conjugation of Fe'el Madi", date: "18 July 2026", duration: "40 Mins", category: "ALL" },
                ]
                  .filter((v) => selectedSubjectFilter === "ALL" || v.category === selectedSubjectFilter)
                  .map((v, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-3 hover:shadow-md transition-all">
                      <div className="h-40 rounded-xl bg-[#1B3B2B] flex items-center justify-center text-white relative overflow-hidden group">
                        <PlayCircle className="w-12 h-12 text-[#D4AF37] group-hover:scale-110 transition-transform cursor-pointer" />
                        <span className="absolute top-2 left-2 bg-[#D4AF37] text-[#1B3B2B] px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                          {v.category}
                        </span>
                        <span className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                          {v.duration}
                        </span>
                      </div>
                      <h5 className="font-serif font-bold text-base text-[#1B3B2B]">{v.title}</h5>
                      <p className="text-[11px] text-muted-foreground">Recorded on: {v.date}</p>
                      <button
                        type="button"
                        className="w-full rounded-lg bg-[#1B3B2B] text-white py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#2D5A42]"
                      >
                        Watch Video Replay →
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 5: DIGITAL LIBRARY */}
          {activeTab === "library" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Digital Islamic Library & PDF Kitabs</h3>
                <p className="text-xs text-muted-foreground">Download authentic Sanad books, Tajweed guides, and syllabus notes.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Mishkat-ul-Masabih PDF Volume 1", category: "HADITH KITAB", pages: "480 Pages", size: "14.2 MB" },
                  { title: "Nisab-us-Sarf & Nahw (Arabic Grammar)", category: "ARABIC GRAMMAR", pages: "210 Pages", size: "8.5 MB" },
                  { title: "Madani Qaida with Tajweed Color Coding", category: "TAJWEED GUIDE", pages: "64 Pages", size: "4.1 MB" },
                  { title: "Tafseer Jalalain (Juz 1 to 15)", category: "TAFSEER KITAB", pages: "620 Pages", size: "22.0 MB" },
                  { title: "Bahare Shariat Fiqh Volume 1", category: "FIQH KITAB", pages: "550 Pages", size: "18.6 MB" },
                ].map((k, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-[#1B3B2B] text-[#D4AF37]">
                        <BookMarked className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">{k.category}</span>
                        <h5 className="font-serif font-bold text-base text-[#1B3B2B]">{k.title}</h5>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{k.pages} • File Size: {k.size}</p>
                    <button
                      type="button"
                      className="w-full rounded-lg bg-[#1B3B2B] text-white py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#2D5A42] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#FED65B]" /> Download PDF Kitab
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: ASSIGNMENTS */}
          {activeTab === "assignments" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Homework & Assignments</h3>
                <p className="text-xs text-muted-foreground">Submit written exercise answers and voice notes for recitation review.</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: "Surah Al-Mulk Recitation Audio Submission", subject: "Tajweed Course", due: "30 July 2026", status: "PENDING", desc: "Record 2-minute voice note reciting Ayah 1-10 with correct Makhraj." },
                  { title: "Tafseer Surah An-Nisa Ayah 1-10 Notes", subject: "Alimiyya Year 2", due: "02 August 2026", status: "PENDING", desc: "Write summary of inheritance laws and orphan rights in Urdu/English." },
                  { title: "Sarf Conjugation Table (Fe'el Madi)", subject: "Arabic Grammar", due: "20 July 2026", status: "SUBMITTED & GRADED (A+)", desc: "Completed 14 forms of Fe'el Madi conjugations." },
                ].map((a, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider ${
                        a.status.includes("SUBMITTED") ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {a.status}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">Due: {a.due}</span>
                    </div>

                    <h5 className="font-serif font-bold text-lg text-[#1B3B2B]">{a.title}</h5>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                    <p className="text-xs text-[#1B3B2B] font-semibold">{a.subject}</p>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="button"
                        className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                          a.status.includes("SUBMITTED")
                            ? "bg-gray-200 text-gray-700 cursor-default"
                            : "bg-[#1B3B2B] text-white hover:bg-[#2D5A42] cursor-pointer"
                        }`}
                      >
                        {a.status.includes("SUBMITTED") ? "Submitted (Grade: A+)" : "Upload Submission →"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: ONLINE TESTS */}
          {activeTab === "tests" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Online Examinations & Quizzes</h3>
                <p className="text-xs text-muted-foreground">Take scheduled multiple choice assessments and check instantly scored results.</p>
              </div>

              {/* Active Quiz Card */}
              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">MID-TERM EVALUATION 2026</span>
                  <span className="text-xs font-mono text-emerald-700 font-semibold">Active Now</span>
                </div>
                <h4 className="font-serif text-xl font-bold text-[#1B3B2B]">Tajweed Makharij & Sifat Online Quiz</h4>
                <p className="text-xs text-muted-foreground">20 Multiple choice questions • 30 Minutes Duration • Passing Marks: 70%</p>

                {!activeQuizModal ? (
                  <button
                    type="button"
                    onClick={() => setActiveQuizModal(true)}
                    className="rounded-lg bg-[#1B3B2B] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#2D5A42] cursor-pointer"
                  >
                    Start Online Quiz Now →
                  </button>
                ) : (
                  <div className="p-5 rounded-xl bg-white border border-[#1B3B2B]/20 space-y-4 animate-in fade-in">
                    <h5 className="font-bold text-sm text-[#1B3B2B]">Question 1 of 5: What is the primary Makhraj of letter 'Qaf' (ق)?</h5>
                    <div className="space-y-2 text-xs">
                      {[
                        "A. Deepest root of tongue against soft palate",
                        "B. Tip of tongue against front upper teeth",
                        "C. Both lips pressed together",
                        "D. Throat cavity"
                      ].map((opt, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-2.5 rounded bg-[#F5EFE6] border border-[#1B3B2B]/10 cursor-pointer hover:bg-[#1B3B2B]/10">
                          <input
                            type="radio"
                            name="q1"
                            checked={quizAnswers[1] === idx}
                            onChange={() => setQuizAnswers({ ...quizAnswers, 1: idx })}
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>

                    {quizSubmitted ? (
                      <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded">
                        ✓ Score: 100% Passed! Result submitted to portal.
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setQuizSubmitted(true)}
                        className="rounded-lg bg-[#D4AF37] text-[#1B3B2B] px-5 py-2 text-xs font-bold uppercase tracking-wider"
                      >
                        Submit Test Answers →
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 8: ATTENDANCE */}
          {activeTab === "attendance" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Monthly Attendance Tracker</h3>
                <p className="text-xs text-muted-foreground">Track your live lecture presence and leaves log.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#1B3B2B] text-white space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FED65B]">Total Percentage</span>
                  <p className="font-serif text-4xl font-bold text-white">{activeStudent.attendance}</p>
                  <p className="text-xs text-white/70">26 Days Present out of 27 Total Days</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Leaves Allowed</span>
                  <p className="font-serif text-4xl font-bold text-[#1B3B2B]">1 Leave</p>
                  <p className="text-xs text-muted-foreground">1 Approved Sick Leave (July 14)</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</span>
                  <p className="font-serif text-4xl font-bold text-emerald-700">ELIGIBLE</p>
                  <p className="text-xs text-emerald-700 font-semibold">Eligible for Final Sanad Exams</p>
                </div>
              </div>

              {/* Monthly Calendar Heatmap Grid */}
              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B]">July 2026 Attendance Grid</h4>
                <div className="grid grid-cols-7 gap-2 text-center text-xs">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <span key={d} className="font-bold text-muted-foreground text-[10px] uppercase">{d}</span>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const isAbsent = day === 14;
                    const isHoliday = day % 7 === 5; // Friday
                    return (
                      <div
                        key={day}
                        className={`p-2.5 rounded-lg font-semibold text-xs border ${
                          isAbsent
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : isHoliday
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : "bg-[#1B3B2B] text-white border-transparent"
                        }`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: PROGRESS REPORT */}
          {activeTab === "report" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Academic Progress Report</h3>
                <p className="text-xs text-muted-foreground">Teacher remarks, subject marks, and grade history.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B3B2B]/10 pb-4">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#1B3B2B]">{activeStudent.name}</h4>
                    <p className="text-xs text-muted-foreground">Roll No: {activeStudent.rollNo} • {activeStudent.course}</p>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-[#D4AF37] text-[#1B3B2B] font-bold text-xs uppercase tracking-widest">
                    GRADE: A+ (DISTINCTION)
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { subject: "Quranic Tafseer & Surah An-Nur", mark: "96/100", grade: "A+" },
                    { subject: "Tajweed Phonetics & Qirat", mark: "98/100", grade: "A+" },
                    { subject: "Arabic Grammar (Sarf & Nahw)", mark: "92/100", grade: "A" },
                    { subject: "Fiqh & Masail-e-Khawateen", mark: "94/100", grade: "A+" },
                  ].map((sub, i) => (
                    <div key={i} className="flex justify-between items-center p-3.5 rounded-xl bg-white text-xs font-semibold border border-[#1B3B2B]/10">
                      <span className="text-[#1B3B2B]">{sub.subject}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[#1B3B2B] font-bold">{sub.mark}</span>
                        <span className="px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#1B3B2B] text-[10px] font-bold">{sub.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#1B3B2B]/10 space-y-2">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">PRINCIPAL REMARKS</span>
                  <p className="text-xs italic text-[#1B3B2B]">
                    “Ayesha Fatima demonstrates exceptional dedication to Tajweed precision and classical Tafseer comprehension. Recommended for advanced Sanad specialization.”
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: FEE STATUS */}
          {activeTab === "fee" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Fee Receipts & Tuition Status</h3>
                <p className="text-xs text-muted-foreground">View your fee payment receipts and tuition structure.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">STATUS: ALL DUES PAID</span>
                  <span className="text-xs font-mono text-muted-foreground">Academic Year 2025-2026</span>
                </div>
                <div className="p-4 rounded-xl bg-white/70 space-y-2 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>Course Tuition Fee</span>
                    <span>₹0 (100% Free Foundational Batch)</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Kitab Material & Portal Admin Charge</span>
                    <span>₹300 (PAID ON 01 JULY 2026)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Verified Certificates & Sanad</h3>
                <p className="text-xs text-muted-foreground">Download state-registered and academy-signed certificates.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-6 max-w-xl">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-[#1B3B2B] text-[#D4AF37] shadow-md">
                    <Award className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> State Registered Sanad
                    </span>
                    <h4 className="font-serif font-bold text-xl text-[#1B3B2B]">Tajweed-ul-Quran Completion Sanad</h4>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Issued to <strong>{activeStudent.name}</strong> on 15 January 2026. Verified under Registration ID: <span className="font-mono font-bold text-[#1B3B2B]">SANAD-2026-904</span>.
                </p>
                <button
                  type="button"
                  className="w-full rounded-xl bg-[#1B3B2B] text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#2D5A42] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4 text-[#FED65B]" /> Download Official PDF Sanad Certificate
                </button>
              </div>
            </div>
          )}

          {/* TAB 12: MY PROFILE */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Student Profile Details</h3>
                <p className="text-xs text-muted-foreground">Your official academy registration information.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={activeStudent.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"}
                    alt={activeStudent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                  <div>
                    <h4 className="font-serif text-xl font-bold text-[#1B3B2B]">{activeStudent.name}</h4>
                    <p className="text-xs text-muted-foreground font-mono">{activeStudent.rollNo}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 bg-white rounded-xl border border-[#1B3B2B]/10">
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Email Address</span>
                    <span className="font-semibold text-[#1B3B2B]">{activeStudent.email}</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-[#1B3B2B]/10">
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Current Course</span>
                    <span className="font-semibold text-[#1B3B2B]">{activeStudent.course}</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-[#1B3B2B]/10">
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Batch Year</span>
                    <span className="font-semibold text-[#1B3B2B]">{activeStudent.batch}</span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-[#1B3B2B]/10">
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Attendance Record</span>
                    <span className="font-semibold text-emerald-800">{activeStudent.attendance}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
