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
  ChevronLeft,
  Eye,
  Check,
  AlertTriangle,
  UploadCloud,
  Star,
  Printer,
  FileCheck,
  ArrowUpRight
} from "lucide-react";
import { getCurrentStudent, signOutStudent, StudentProfile, DEMO_STUDENT } from "@/lib/supabase";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Portal Dashboard — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      { name: "description", content: "Student Dashboard for course progress, live classes, assignments, digital library, and certificates." },
    ],
  }),
  component: StudentDashboardPage,
});

export function StudentDashboardPage() {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "profile"
    | "courses"
    | "live-classes"
    | "recorded-classes"
    | "library"
    | "assignments"
    | "tests"
    | "attendance"
    | "report"
    | "fee"
    | "certificates"
  >("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Digital Library State
  const [libraryCategory, setLibraryCategory] = useState<string>("All Files");
  const [previewBook, setPreviewBook] = useState<{ title: string; category: string; size: string; pages: string; desc: string } | null>(null);

  // Assignments State
  const [assignmentSubTab, setAssignmentSubTab] = useState<"pending" | "submitted" | "graded">("pending");
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>("fiqh-101");
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [assignmentNotes, setAssignmentNotes] = useState<string>("");
  const [submittedAssignments, setSubmittedAssignments] = useState<Record<string, boolean>>({});

  // Attendance State
  const [calendarMonth, setCalendarMonth] = useState<string>("October 2023");

  // Fee State
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Online Quiz State
  const [activeQuizModal, setActiveQuizModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Notifications Modal
  const [notifOpen, setNotifOpen] = useState(false);

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
    { id: "profile", label: "My Profile", icon: User },
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
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C201D] flex overflow-hidden font-sans">
      
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[270px] bg-[#1B3B2B] text-white shadow-2xl z-30 border-r border-[#D4AF37]/20">
        
        {/* Brand Header with Logo */}
        <div className="p-6 border-b border-white/10 flex flex-col items-center text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-white p-1 border-2 border-[#D4AF37] shadow-lg overflow-hidden flex items-center justify-center">
            <img src="/jamiya-logo.png" alt="Jamiya Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-base text-[#FED65B] leading-tight tracking-wide">
              Jamiya Kaneez E Sayyeda Fatima
            </h1>
            <p className="text-[10px] text-white/70 uppercase tracking-widest leading-none mt-1 font-sans">
              Student Portal
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1 scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer relative ${
                  isActive
                    ? "bg-[#284B3B] text-[#FED65B] font-bold shadow-sm border-l-4 border-[#D4AF37]"
                    : "text-white/80 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#FED65B]" : "text-white/60"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      item.badge.includes("LIVE")
                        ? "bg-red-500 text-white animate-pulse"
                        : isActive
                        ? "bg-[#1B3B2B] text-[#FED65B]"
                        : "bg-white/10 text-white/80"
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
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-300 hover:bg-red-500/20 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER NAV */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden">
          <div className="w-[270px] h-full bg-[#1B3B2B] text-white flex flex-col p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <img src="/jamiya-logo.png" alt="Logo" className="w-8 h-8 rounded-full bg-white p-0.5" />
                <span className="font-serif text-sm font-bold text-[#FED65B]">Jamiya Portal</span>
              </div>
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
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[#284B3B] text-[#FED65B] font-bold border-l-4 border-[#D4AF37]"
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
              className="mt-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-300 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:pl-[270px] flex flex-col min-h-screen">
        
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

            {/* Page Title or Greeting */}
            <div>
              {activeTab === "overview" || activeTab === "fee" || activeTab === "report" ? (
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1B3B2B]">
                  Welcome back, Student
                </h2>
              ) : (
                <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1B3B2B] capitalize">
                  {navItems.find((n) => n.id === activeTab)?.label || "Student Portal"}
                </h2>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Top Search Input */}
            <div className="hidden sm:flex items-center gap-2 bg-[#F5EFE6] border border-[#1B3B2B]/15 rounded-full px-4 py-2 text-xs w-64 focus-within:ring-2 focus-within:ring-[#1B3B2B]/20">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder={activeTab === "library" ? "Search digital library..." : "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent focus:outline-none w-full text-xs text-[#1B3B2B]"
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-2 rounded-full bg-[#F5EFE6] hover:bg-[#1B3B2B]/10 text-[#1B3B2B] transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#1B3B2B]/10 p-4 space-y-3 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="font-serif font-bold text-sm text-[#1B3B2B]">Notifications</span>
                    <span className="text-[10px] bg-[#D4AF37]/20 text-[#1B3B2B] px-2 py-0.5 rounded font-bold">2 New</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-lg bg-[#F5EFE6]/60">
                      <p className="font-semibold text-[#1B3B2B]">Assignment Submitted</p>
                      <p className="text-[10px] text-muted-foreground">Fiqh al-Ibadat essay is ready for review.</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F5EFE6]/60">
                      <p className="font-semibold text-[#1B3B2B]">Live Class Alert</p>
                      <p className="text-[10px] text-muted-foreground">Tajweed & Qirat live session today at 4:30 PM.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Video Camera Icon */}
            <button
              type="button"
              onClick={() => setActiveTab("live-classes")}
              className="p-2 rounded-full bg-[#F5EFE6] hover:bg-[#1B3B2B]/10 text-[#1B3B2B] transition-colors cursor-pointer"
              title="Live Classes"
            >
              <Video className="w-4 h-4" />
            </button>

            {/* User Profile Avatar Icon */}
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className="p-0.5 rounded-full border-2 border-[#D4AF37] hover:opacity-90 transition-opacity cursor-pointer"
              title="My Profile"
            >
              <img
                src={activeStudent.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"}
                alt={activeStudent.name}
                className="w-7 h-7 rounded-full object-cover"
              />
            </button>
          </div>
        </header>

        {/* DASHBOARD BODY CONTENT BY TAB */}
        <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Welcome Banner */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1B3B2B] to-[#2B543D] text-white p-6 sm:p-8 shadow-xl border border-[#D4AF37]/30">
                <div className="relative z-10 space-y-3 max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FED65B] text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5" /> State Registered Academic Portal
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight text-white">
                    Assalamu Alaikum, {activeStudent.name.split(" ")[0]} 👋
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
              </div>

              {/* Quick Access Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div 
                  onClick={() => setActiveTab("attendance")}
                  className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 shadow-sm space-y-2 hover:border-[#D4AF37] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[#1B3B2B]">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Attendance</span>
                    <CalendarCheck className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#1B3B2B]">94%</p>
                  <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 112 / 120 Classes Present
                  </p>
                </div>

                <div 
                  onClick={() => setActiveTab("courses")}
                  className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 shadow-sm space-y-2 hover:border-[#D4AF37] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[#1B3B2B]">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Active Courses</span>
                    <BookOpen className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#1B3B2B]">3 Courses</p>
                  <p className="text-[11px] text-muted-foreground">Alima, Tajweed & Hadith</p>
                </div>

                <div 
                  onClick={() => setActiveTab("assignments")}
                  className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 shadow-sm space-y-2 hover:border-[#D4AF37] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[#1B3B2B]">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Assignments</span>
                    <FileText className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#1B3B2B]">2 Pending</p>
                  <p className="text-[11px] text-amber-700 font-semibold">Due in 3 Days</p>
                </div>

                <div 
                  onClick={() => setActiveTab("fee")}
                  className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 shadow-sm space-y-2 hover:border-[#D4AF37] transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[#1B3B2B]">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fee Status</span>
                    <Receipt className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <p className="font-serif text-3xl font-bold text-emerald-700">PAID</p>
                  <p className="text-[11px] text-emerald-700 font-semibold">Due Balance: $2,000</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: DIGITAL LIBRARY (Screenshot 1 Exact replica) */}
          {activeTab === "library" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Main Heading & Subtitle */}
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Digital Library</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Access our curated collection of reference books, study materials, and daily spiritual readings.
                </p>
              </div>

              {/* Filter Tabs / Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {["All Files", "Reference Books", "Daily Duas", "Tafseer Kitabs", "Hadith Studies"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setLibraryCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      libraryCategory === cat
                        ? "bg-[#1B3B2B] text-white shadow-sm"
                        : "bg-white border border-gray-200 text-[#1B3B2B] hover:bg-[#F5EFE6]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Cards Grid (3 Columns matching Screenshot 1) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Principles of Islamic Jurisprudence",
                    subtitle: "Advanced Fiqh Studies",
                    category: "REFERENCE",
                    categoryBadgeClass: "bg-[#EFE9DD] text-[#4A4237]",
                    iconBg: "bg-rose-100 text-rose-600",
                    iconType: "pdf",
                    size: "4.2 MB",
                    date: "Oct 12, 2023",
                    desc: "Comprehensive manual on Usul al-Fiqh, legal deduction, and sharia ruling methodologies."
                  },
                  {
                    title: "Morning & Evening Supplications",
                    subtitle: "Essential Adhkar from the Sunnah",
                    category: "DAILY DUAS",
                    categoryBadgeClass: "bg-[#FEF3C7] text-[#92400E]",
                    iconBg: "bg-amber-100 text-amber-800",
                    iconType: "book",
                    size: "1.8 MB",
                    date: "Nov 05, 2023",
                    desc: "Authentic daily morning and evening adhkar, protection prayers, and prophetic supplications."
                  },
                  {
                    title: "History of the Prophets",
                    subtitle: "Detailed biographical accounts",
                    category: "REFERENCE",
                    categoryBadgeClass: "bg-[#EFE9DD] text-[#4A4237]",
                    iconBg: "bg-rose-100 text-rose-600",
                    iconType: "pdf",
                    size: "8.5 MB",
                    date: "Dec 20, 2023",
                    desc: "Chronological accounts of the Prophets of Allah from Adam (AS) to Prophet Muhammad ﷺ."
                  },
                  {
                    title: "Mishkat-ul-Masabih PDF Vol 1",
                    subtitle: "Hadith & Sunnah Collection",
                    category: "HADITH STUDIES",
                    categoryBadgeClass: "bg-[#EFE9DD] text-[#4A4237]",
                    iconBg: "bg-emerald-100 text-emerald-800",
                    iconType: "book",
                    size: "14.2 MB",
                    date: "Jan 10, 2024",
                    desc: "Volume 1 containing Hadiths on Faith, Knowledge, Purification, and Daily Worship."
                  },
                  {
                    title: "Madani Qaida with Tajweed Rules",
                    subtitle: "Makharij & Pronunciation",
                    category: "TAJWEED",
                    categoryBadgeClass: "bg-[#FEF3C7] text-[#92400E]",
                    iconBg: "bg-amber-100 text-amber-800",
                    iconType: "book",
                    size: "4.1 MB",
                    date: "Feb 14, 2024",
                    desc: "Color-coded Tajweed guide for accurate letter articulation and Quranic recitation."
                  },
                ]
                  .filter((b) => {
                    if (libraryCategory === "All Files") return true;
                    if (libraryCategory === "Reference Books" && b.category === "REFERENCE") return true;
                    if (libraryCategory === "Daily Duas" && b.category === "DAILY DUAS") return true;
                    if (libraryCategory === "Tafseer Kitabs" && b.category.includes("TAFSEER")) return true;
                    if (libraryCategory === "Hadith Studies" && b.category.includes("HADITH")) return true;
                    return true;
                  })
                  .filter((b) => b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((item, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 shadow-xs flex flex-col justify-between space-y-5 hover:shadow-md transition-all">
                      <div className="space-y-4">
                        {/* Top Badge & Icon */}
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${item.iconBg}`}>
                            {item.iconType === "pdf" ? (
                              <span className="text-xs font-bold font-mono">PDF</span>
                            ) : (
                              <Library className="w-5 h-5" />
                            )}
                          </div>
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${item.categoryBadgeClass}`}>
                            {item.category}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                          <h3 className="font-serif font-bold text-xl text-[#1B3B2B] leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Meta Info & Actions */}
                      <div className="space-y-4 pt-2 border-t border-[#1B3B2B]/10">
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-sans">
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" /> {item.size}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {item.date}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPreviewBook(item)}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border border-[#1B3B2B] text-[#1B3B2B] py-2.5 text-xs font-semibold hover:bg-[#1B3B2B]/5 transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" /> Preview
                          </button>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Downloading "${item.title}" (${item.size})...`);
                            }}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1B3B2B] text-white py-2.5 text-xs font-semibold hover:bg-[#2B543D] transition-colors cursor-pointer"
                          >
                            <Download className="w-4 h-4 text-[#FED65B]" /> Download
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Book Preview Modal */}
              {previewBook && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-[#F5EFE6] w-full max-w-lg rounded-2xl p-6 space-y-4 shadow-2xl border border-[#1B3B2B]/20 animate-in zoom-in-95">
                    <div className="flex items-center justify-between border-b border-[#1B3B2B]/10 pb-3">
                      <div>
                        <span className="text-[10px] font-bold text-[#D4AF37] uppercase">{previewBook.category}</span>
                        <h4 className="font-serif text-xl font-bold text-[#1B3B2B]">{previewBook.title}</h4>
                      </div>
                      <button type="button" onClick={() => setPreviewBook(null)} className="p-1 hover:bg-[#1B3B2B]/10 rounded-lg">
                        <X className="w-5 h-5 text-[#1B3B2B]" />
                      </button>
                    </div>
                    <p className="text-xs text-[#1B3B2B]/80 leading-relaxed">{previewBook.desc}</p>
                    <div className="p-4 rounded-xl bg-white space-y-2 text-xs border border-[#1B3B2B]/10">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Format:</span>
                        <span className="font-bold text-[#1B3B2B]">Digital PDF Document</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">File Size:</span>
                        <span className="font-bold text-[#1B3B2B]">{previewBook.size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Uploaded Date:</span>
                        <span className="font-bold text-[#1B3B2B]">{previewBook.date}</span>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          alert(`Opening digital reader for ${previewBook.title}`);
                          setPreviewBook(null);
                        }}
                        className="flex-1 bg-[#1B3B2B] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#2B543D]"
                      >
                        Open Digital Reader →
                      </button>
                      <button
                        type="button"
                        onClick={() => setPreviewBook(null)}
                        className="px-4 bg-white text-[#1B3B2B] py-2.5 rounded-xl text-xs font-semibold border border-[#1B3B2B]"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: ASSIGNMENTS (Screenshot 2 Exact replica) */}
          {activeTab === "assignments" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Header Title & Subtabs */}
              <div className="space-y-4 border-b border-[#1B3B2B]/10 pb-3">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Assignments</h2>

                <div className="flex gap-8 text-sm font-semibold">
                  <button
                    type="button"
                    onClick={() => setAssignmentSubTab("pending")}
                    className={`pb-2 transition-all cursor-pointer relative ${
                      assignmentSubTab === "pending"
                        ? "text-[#1B3B2B] font-bold border-b-2 border-[#1B3B2B]"
                        : "text-muted-foreground hover:text-[#1B3B2B]"
                    }`}
                  >
                    Pending
                  </button>
                  <button
                    type="button"
                    onClick={() => setAssignmentSubTab("submitted")}
                    className={`pb-2 transition-all cursor-pointer relative ${
                      assignmentSubTab === "submitted"
                        ? "text-[#1B3B2B] font-bold border-b-2 border-[#1B3B2B]"
                        : "text-muted-foreground hover:text-[#1B3B2B]"
                    }`}
                  >
                    Submitted
                  </button>
                  <button
                    type="button"
                    onClick={() => setAssignmentSubTab("graded")}
                    className={`pb-2 transition-all cursor-pointer relative ${
                      assignmentSubTab === "graded"
                        ? "text-[#1B3B2B] font-bold border-b-2 border-[#1B3B2B]"
                        : "text-muted-foreground hover:text-[#1B3B2B]"
                    }`}
                  >
                    Graded
                  </button>
                </div>
              </div>

              {/* 2-Column Split Layout (matching Screenshot 2) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Assignment Cards List (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  {[
                    {
                      id: "fiqh-101",
                      title: "Fiqh al-Ibadat: Purification",
                      course: "Islamic Jurisprudence 101",
                      due: "Oct 25",
                      fullDue: "Oct 25, 11:59 PM",
                      marks: "50 Marks",
                      status: "PENDING",
                      badgeClass: "bg-rose-100 text-rose-700",
                      instructions: "Please write a comprehensive essay (1500 words) detailing the conditions and pillars of Wudu (ablution) according to the Hanafi school of thought. Include evidences from the Quran and Sunnah."
                    },
                    {
                      id: "tafsir-201",
                      title: "Tafsir Surah Al-Fatiha",
                      course: "Quranic Exegesis",
                      due: "Oct 28",
                      fullDue: "Oct 28, 11:59 PM",
                      marks: "100 Marks",
                      status: "PENDING",
                      badgeClass: "bg-rose-100 text-rose-700",
                      instructions: "Analyze the grammatical structure, spiritual depth, and commentary of Al-Fatiha using Tafsir Ibn Kathir and Jalalain."
                    },
                    {
                      id: "sarf-301",
                      title: "Fe'el Madi Conjugation Table",
                      course: "Arabic Grammar",
                      due: "Oct 15",
                      fullDue: "Oct 15 (Graded)",
                      marks: "98/100 Marks",
                      status: "GRADED",
                      badgeClass: "bg-emerald-100 text-emerald-800",
                      instructions: "Submitted Sarf conjugation tables for 14 forms of past tense verbs. Graded: A+ Distinction."
                    }
                  ]
                    .filter((a) => {
                      if (assignmentSubTab === "pending") return a.status === "PENDING";
                      if (assignmentSubTab === "submitted") return submittedAssignments[a.id] || a.status === "SUBMITTED";
                      if (assignmentSubTab === "graded") return a.status === "GRADED";
                      return true;
                    })
                    .map((item) => {
                      const isSelected = selectedAssignmentId === item.id;
                      return (
                        <div
                          key={item.id}
                          onClick={() => setSelectedAssignmentId(item.id)}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                            isSelected
                              ? "bg-[#F5EFE6] border-[#1B3B2B] ring-1 ring-[#1B3B2B]"
                              : "bg-[#F5EFE6]/60 border-[#1B3B2B]/10 hover:bg-[#F5EFE6]"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.badgeClass}`}>
                              {item.status}
                            </span>
                            <span className="text-muted-foreground font-medium">Due: {item.due}</span>
                          </div>

                          <div>
                            <h3 className="font-serif font-bold text-lg text-[#1B3B2B] leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-0.5">{item.course}</p>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-[#1B3B2B] font-semibold pt-1">
                            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                            <span>{item.marks}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Right Column: Selected Assignment Detail & Submit Form (7 Cols) */}
                <div className="lg:col-span-7">
                  {selectedAssignmentId && (
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-6 shadow-xs">
                      
                      {/* Assignment Title & Subtitle */}
                      <div className="space-y-2 border-b border-[#1B3B2B]/10 pb-4">
                        <h2 className="font-serif font-bold text-2xl text-[#1B3B2B]">
                          Fiqh al-Ibadat: Purification
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          <span className="flex items-center gap-1.5 text-[#1B3B2B]">
                            <BookOpen className="w-4 h-4 text-[#D4AF37]" /> Islamic Jurisprudence 101
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="flex items-center gap-1.5 text-rose-700">
                            <Clock className="w-4 h-4" /> Due: Oct 25, 11:59 PM
                          </span>
                        </div>
                      </div>

                      {/* Assignment Text Prompt */}
                      <p className="text-xs sm:text-sm text-[#1B3B2B]/80 leading-relaxed font-sans">
                        Please write a comprehensive essay (1500 words) detailing the conditions and pillars of Wudu (ablution) according to the Hanafi school of thought. Include evidences from the Quran and Sunnah.
                      </p>

                      {/* Instructions Section */}
                      <div className="space-y-2">
                        <h3 className="font-serif font-bold text-lg text-[#1B3B2B]">Instructions:</h3>
                        <ul className="list-disc list-inside text-xs sm:text-sm text-[#1B3B2B]/80 space-y-1.5 pl-1">
                          <li>Format as PDF or DOCX.</li>
                          <li>Use standard academic referencing.</li>
                          <li>Ensure clarity and proper structuring.</li>
                        </ul>
                      </div>

                      {/* Submit Assignment Container Box */}
                      <div className="p-6 rounded-2xl bg-white border border-[#1B3B2B]/10 space-y-5">
                        <h3 className="font-serif font-bold text-lg text-[#1B3B2B] flex items-center gap-2">
                          <UploadCloud className="w-5 h-5 text-[#1B3B2B]" /> Submit Assignment
                        </h3>

                        {/* File Drag and Drop Box */}
                        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center space-y-3 hover:border-[#1B3B2B] transition-colors bg-[#FDFBF7]">
                          <div className="w-10 h-10 rounded-full bg-[#1B3B2B]/5 mx-auto flex items-center justify-center text-[#1B3B2B]">
                            <UploadCloud className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#1B3B2B]">
                              {assignmentFile ? (
                                <span className="text-emerald-700 font-bold">Selected: {assignmentFile.name}</span>
                              ) : (
                                "Drag and drop your file here, or click to browse"
                              )}
                            </p>
                            <p className="text-[10px] text-muted-foreground mt-1">
                              Supported formats: PDF, DOCX (Max 10MB)
                            </p>
                          </div>
                          <input
                            type="file"
                            accept=".pdf,.docx,.doc"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                setAssignmentFile(e.target.files[0]);
                              }
                            }}
                            className="hidden"
                            id="file-upload-input"
                          />
                          <label
                            htmlFor="file-upload-input"
                            className="inline-block px-4 py-1.5 rounded-lg bg-[#F5EFE6] text-[#1B3B2B] text-xs font-bold border border-[#1B3B2B]/20 cursor-pointer hover:bg-[#1B3B2B]/10"
                          >
                            Choose File
                          </label>
                        </div>

                        {/* Teacher Notes Textarea */}
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-[#1B3B2B]">
                            Comments for Teacher (Optional)
                          </label>
                          <textarea
                            rows={3}
                            placeholder="Add any notes about your submission here..."
                            value={assignmentNotes}
                            onChange={(e) => setAssignmentNotes(e.target.value)}
                            className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]/20 bg-white"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => alert("Draft saved successfully!")}
                            className="px-5 py-2.5 rounded-xl bg-white border border-[#1B3B2B] text-[#1B3B2B] text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                          >
                            Save Draft
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (!assignmentFile && !assignmentNotes) {
                                alert("Please select a file or add notes before submitting.");
                                return;
                              }
                              setSubmittedAssignments((prev) => ({ ...prev, [selectedAssignmentId]: true }));
                              alert("Assignment submitted successfully to teacher portal!");
                            }}
                            className="px-6 py-2.5 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold hover:bg-[#2B543D] transition-colors cursor-pointer"
                          >
                            Submit Assignment
                          </button>
                        </div>

                      </div>

                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: ATTENDANCE (Screenshot 3 Exact replica) */}
          {activeTab === "attendance" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Main Heading */}
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Attendance</h2>
              </div>

              {/* Top Metric Cards Grid (4 Cards matching Screenshot 3) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Card 1: Conducted Classes */}
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#1B3B2B]/5 flex items-center justify-center text-[#1B3B2B]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      CONDUCTED CLASSES
                    </span>
                    <p className="font-serif font-bold text-4xl text-[#1B3B2B] mt-1">120</p>
                  </div>
                </div>

                {/* Card 2: Present */}
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      PRESENT
                    </span>
                    <p className="font-serif font-bold text-4xl text-[#1B3B2B] mt-1">112</p>
                  </div>
                </div>

                {/* Card 3: Absent */}
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                    <X className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      ABSENT
                    </span>
                    <p className="font-serif font-bold text-4xl text-[#B91C1C] mt-1">5</p>
                  </div>
                </div>

                {/* Card 4: Attendance % (Dark Green Card with Gold Text) */}
                <div className="p-6 rounded-2xl bg-[#1B3B2B] text-white space-y-4 shadow-md border border-[#D4AF37]/30">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FED65B]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FED65B] block">
                      ATTENDANCE %
                    </span>
                    <p className="font-serif font-bold text-4xl text-[#FED65B] mt-1">94%</p>
                  </div>
                </div>

              </div>

              {/* Bottom Split Layout (Calendar Left + Log Table Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Calendar Widget (5 Cols matching Screenshot 3) */}
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">{calendarMonth}</h3>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCalendarMonth("September 2023")}
                        className="p-1 text-[#1B3B2B] hover:bg-[#1B3B2B]/10 rounded-lg"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalendarMonth("October 2023")}
                        className="p-1 text-[#1B3B2B] hover:bg-[#1B3B2B]/10 rounded-lg"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Day Names Row */}
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>

                  {/* Date Grid */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold">
                    {/* Empty padding days */}
                    <span className="p-2"></span>
                    <span className="p-2 text-gray-700">1</span>
                    {[2, 3, 4, 5].map((d) => (
                      <span key={d} className="w-8 h-8 rounded-full bg-[#36493F] text-white flex items-center justify-center mx-auto">
                        {d}
                      </span>
                    ))}
                    {/* Oct 6 Absent */}
                    <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto">
                      6
                    </span>
                    {[7, 8].map((d) => (
                      <span key={d} className="p-2 text-gray-700">{d}</span>
                    ))}
                    {[9, 10].map((d) => (
                      <span key={d} className="w-8 h-8 rounded-full bg-[#36493F] text-white flex items-center justify-center mx-auto">
                        {d}
                      </span>
                    ))}
                    {/* Oct 11 Excused */}
                    <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1B3B2B] font-bold flex items-center justify-center mx-auto">
                      11
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#36493F] text-white flex items-center justify-center mx-auto">
                      12
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#36493F] text-white flex items-center justify-center mx-auto">
                      13
                    </span>
                    <span className="p-2 text-gray-700">14</span>
                    <span className="p-2 text-gray-700">15</span>
                    <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1B3B2B] font-bold flex items-center justify-center mx-auto ring-2 ring-[#1B3B2B]">
                      16
                    </span>
                    {[17, 18, 19, 20, 21].map((d) => (
                      <span key={d} className="p-2 text-gray-400">{d}</span>
                    ))}
                  </div>

                  {/* Legend Footer */}
                  <div className="pt-4 border-t border-[#1B3B2B]/10 flex items-center justify-start gap-6 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#36493F]"></span> Present
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Absent
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span> Excused
                    </span>
                  </div>
                </div>

                {/* Right Attendance Log Table (7 Cols matching Screenshot 3) */}
                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Attendance Log</h3>
                    <button
                      type="button"
                      onClick={() => alert("Exporting full attendance log CSV...")}
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#1B3B2B] hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" /> Export
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b border-[#1B3B2B]/10 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                          <th className="py-3">DATE</th>
                          <th className="py-3">SUBJECT</th>
                          <th className="py-3">TEACHER</th>
                          <th className="py-3 text-right">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1B3B2B]/10">
                        {[
                          { date: "Oct 16, 2023", subject: "Islamic History", teacher: "Sheikh Abdullah", status: "Present", badge: "bg-emerald-100 text-emerald-800" },
                          { date: "Oct 13, 2023", subject: "Quranic Studies", teacher: "Ustadh Rahman", status: "Present", badge: "bg-emerald-100 text-emerald-800" },
                          { date: "Oct 11, 2023", subject: "Arabic Grammar", teacher: "Ustadh Rahman", status: "Excused", badge: "bg-amber-100 text-amber-800" },
                          { date: "Oct 06, 2023", subject: "Hadith", teacher: "Sheikh Abdullah", status: "Absent", badge: "bg-rose-100 text-rose-700" },
                          { date: "Oct 05, 2023", subject: "Islamic History", teacher: "Sheikh Abdullah", status: "Present", badge: "bg-emerald-100 text-emerald-800" },
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#1B3B2B]/5 transition-colors">
                            <td className="py-3.5 font-medium text-[#1B3B2B]">{row.date}</td>
                            <td className="py-3.5 font-bold text-[#1B3B2B]">{row.subject}</td>
                            <td className="py-3.5 text-muted-foreground">{row.teacher}</td>
                            <td className="py-3.5 text-right">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.badge}`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => alert("Loading older attendance logs...")}
                      className="text-xs font-semibold text-[#1B3B2B] hover:underline"
                    >
                      View Older Logs
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 5: FEE STATUS / FINANCIAL OVERVIEW (Screenshot 4 Exact replica) */}
          {activeTab === "fee" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Main Heading & Subtitle */}
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Financial Overview</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Review your fee status, payment history, and upcoming dues.
                </p>
              </div>

              {/* Top Summary Metric Cards (4 Cards matching Screenshot 4) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Card 1: Total Fee */}
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#1B3B2B]/5 flex items-center justify-center text-[#1B3B2B]">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      TOTAL FEE (ANNUAL)
                    </span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">$4,500.00</p>
                  </div>
                </div>

                {/* Card 2: Paid Amount with progress bar */}
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      PAID AMOUNT
                    </span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B]">$2,500.00</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#1B3B2B] h-full rounded-full w-[55%]" />
                    </div>
                  </div>
                </div>

                {/* Card 3: Due Balance */}
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      DUE BALANCE
                    </span>
                    <p className="font-serif font-bold text-3xl text-[#B91C1C] mt-1">$2,000.00</p>
                  </div>
                </div>

                {/* Card 4: Next Due Date (Dark Green Card with Gold Pay Button) */}
                <div className="p-6 rounded-2xl bg-[#1B3B2B] text-white space-y-4 shadow-md border border-[#D4AF37]/30 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FED65B] block">
                      NEXT DUE DATE
                    </span>
                    <p className="font-serif font-bold text-2xl text-white mt-1">Nov 15, 2023</p>
                    <p className="text-xs text-white/70 mt-0.5 font-sans">Installment: $500.00</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaymentModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#1B3B2B] text-xs font-bold uppercase tracking-wider hover:bg-[#e9c349] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    Pay Online →
                  </button>
                </div>

              </div>

              {/* Payment History Table (matching Screenshot 4) */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1B3B2B]/10 pb-4">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Payment History</h3>
                  <button
                    type="button"
                    onClick={() => alert("Downloading full account statement PDF...")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#1B3B2B] text-[#1B3B2B] text-xs font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Statement
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#1B3B2B]/10 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3">RECEIPT #</th>
                        <th className="py-3">DATE</th>
                        <th className="py-3">AMOUNT</th>
                        <th className="py-3">MODE</th>
                        <th className="py-3">STATUS</th>
                        <th className="py-3 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1B3B2B]/10">
                      {[
                        { receipt: "RCP-2023-089", date: "Sep 01, 2023", amount: "$1,500.00", isFailed: false, mode: "Online", status: "Successful", badge: "bg-emerald-100 text-emerald-800" },
                        { receipt: "RCP-2023-042", date: "Jul 15, 2023", amount: "$1,000.00", isFailed: false, mode: "Bank Transfer", status: "Successful", badge: "bg-emerald-100 text-emerald-800" },
                        { receipt: "RCP-2023-090", date: "Sep 01, 2023", amount: "$500.00", isFailed: true, mode: "Online", status: "Failed", badge: "bg-rose-100 text-rose-700" },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#1B3B2B]/5 transition-colors">
                          <td className="py-4 font-mono font-medium text-[#1B3B2B]">{row.receipt}</td>
                          <td className="py-4 text-[#1B3B2B]">{row.date}</td>
                          <td className={`py-4 font-bold ${row.isFailed ? "text-rose-600" : "text-[#1B3B2B]"}`}>{row.amount}</td>
                          <td className="py-4 text-[#1B3B2B]">{row.mode}</td>
                          <td className="py-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.badge}`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <button
                              type="button"
                              onClick={() => alert(`Downloading Receipt #${row.receipt}`)}
                              className="p-1.5 rounded-lg text-[#1B3B2B] hover:bg-[#1B3B2B]/10"
                              title="Download Receipt"
                            >
                              <FileCheck className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Online Payment Modal */}
              {paymentModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-[#F5EFE6] w-full max-w-md rounded-2xl p-6 space-y-5 shadow-2xl border border-[#1B3B2B]/20 animate-in zoom-in-95">
                    <div className="flex items-center justify-between border-b border-[#1B3B2B]/10 pb-3">
                      <h4 className="font-serif text-xl font-bold text-[#1B3B2B]">Online Installment Payment</h4>
                      <button type="button" onClick={() => setPaymentModalOpen(false)} className="p-1 text-[#1B3B2B] hover:bg-[#1B3B2B]/10 rounded-lg">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="p-4 rounded-xl bg-white space-y-2 text-xs border border-[#1B3B2B]/10">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Installment Amount:</span>
                        <span className="font-bold text-lg text-[#1B3B2B]">$500.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span className="font-semibold text-rose-700">Nov 15, 2023</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <label className="block font-semibold text-[#1B3B2B]">Select Payment Gateway</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            alert("Redirecting to Secure Online Credit/Debit Card Checkout...");
                            setPaymentModalOpen(false);
                          }}
                          className="p-3 rounded-xl bg-white border border-[#1B3B2B]/20 hover:border-[#1B3B2B] text-center font-bold text-[#1B3B2B]"
                        >
                          💳 Card / Stripe
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            alert("Redirecting to Razorpay / NetBanking Portal...");
                            setPaymentModalOpen(false);
                          }}
                          className="p-3 rounded-xl bg-white border border-[#1B3B2B]/20 hover:border-[#1B3B2B] text-center font-bold text-[#1B3B2B]"
                        >
                          🏦 Net Banking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 6: PROGRESS REPORT / ACADEMIC PROGRESS (Screenshot 5 Exact replica) */}
          {activeTab === "report" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Main Heading & Subtitle & Top Right Button */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B3B2B]/10 pb-4">
                <div>
                  <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Academic Progress</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Term 1: Fall 2023 - Overall Performance
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Generating & Downloading Official PDF Report Card...")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#1B3B2B] text-xs font-bold hover:bg-[#e9c349] transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Official Report Card (PDF)
                </button>
              </div>

              {/* Top Section: Grade Trends Chart + Term Summary Cards (matching Screenshot 5) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left Card: Grade Trends SVG Line Graph (8 Cols) */}
                <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Grade Trends</h3>
                    <span className="px-3 py-1 rounded-full bg-[#E8E0D2] text-[#1B3B2B] text-[10px] font-bold uppercase tracking-wider">
                      TERM 1
                    </span>
                  </div>

                  {/* Custom SVG Line Chart */}
                  <div className="w-full pt-4 pb-2">
                    <svg viewBox="0 0 500 180" className="w-full h-44 overflow-visible">
                      {/* Grid Lines */}
                      {[0, 30, 60, 90, 120, 150].map((y, idx) => (
                        <line
                          key={idx}
                          x1="30"
                          y1={y + 10}
                          x2="480"
                          y2={y + 10}
                          stroke="#1B3B2B"
                          strokeOpacity="0.08"
                          strokeDasharray="4 4"
                        />
                      ))}

                      {/* Y-axis Labels */}
                      <text x="5" y="15" fill="#71717A" fontSize="9" className="font-mono">100</text>
                      <text x="5" y="45" fill="#71717A" fontSize="9" className="font-mono">95</text>
                      <text x="5" y="75" fill="#71717A" fontSize="9" className="font-mono">90</text>
                      <text x="5" y="105" fill="#71717A" fontSize="9" className="font-mono">85</text>
                      <text x="5" y="135" fill="#71717A" fontSize="9" className="font-mono">80</text>
                      <text x="5" y="165" fill="#71717A" fontSize="9" className="font-mono">60</text>

                      {/* Area fill under curve */}
                      <path
                        d="M 50 100 Q 120 75 190 90 T 330 65 T 470 70 L 470 160 L 50 160 Z"
                        fill="#36493F"
                        fillOpacity="0.12"
                      />

                      {/* Smooth Line Path */}
                      <path
                        d="M 50 100 Q 120 75 190 90 T 330 65 T 470 70"
                        fill="none"
                        stroke="#36493F"
                        strokeWidth="3"
                      />

                      {/* Data Point Dots */}
                      {[
                        { x: 50, y: 100 },
                        { x: 120, y: 80 },
                        { x: 190, y: 90 },
                        { x: 260, y: 72 },
                        { x: 330, y: 82 },
                        { x: 400, y: 55 },
                        { x: 470, y: 68 },
                      ].map((pt, i) => (
                        <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#D4AF37" stroke="#36493F" strokeWidth="2" />
                      ))}

                      {/* X-axis Labels */}
                      <text x="40" y="178" fill="#71717A" fontSize="9">Week 1</text>
                      <text x="110" y="178" fill="#71717A" fontSize="9">Week 2</text>
                      <text x="180" y="178" fill="#71717A" fontSize="9">Week 3</text>
                      <text x="250" y="178" fill="#71717A" fontSize="9">Week 4</text>
                      <text x="320" y="178" fill="#71717A" fontSize="9">Week 5</text>
                      <text x="390" y="178" fill="#71717A" fontSize="9">Week 6</text>
                      <text x="450" y="178" fill="#71717A" fontSize="9">Midterm</text>
                    </svg>
                  </div>
                </div>

                {/* Right Card: Term Summary (4 Cols with Watermark) */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Term Summary</h3>
                  </div>

                  {/* Summary Metric Boxes */}
                  <div className="space-y-3 relative z-10">
                    <div className="p-4 rounded-xl bg-white/80 border border-[#1B3B2B]/10 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">
                          OVERALL GPA
                        </span>
                        <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-0.5">3.8</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[#1B3B2B]" />
                    </div>

                    <div className="p-4 rounded-xl bg-white/80 border border-[#1B3B2B]/10 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">
                          ATTENDANCE
                        </span>
                        <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-0.5">95%</p>
                      </div>
                      <Check className="w-5 h-5 text-emerald-700 stroke-[3]" />
                    </div>

                    <div className="p-4 rounded-xl bg-white/80 border border-[#1B3B2B]/10 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">
                          CLASS RANK
                        </span>
                        <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-0.5">
                          4<span className="text-lg font-sans">th</span>
                        </p>
                      </div>
                      <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                  </div>

                </div>

              </div>

              {/* Middle Section: Subject Breakdown Table (matching Screenshot 5) */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5 shadow-xs">
                <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Subject Breakdown</h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#1B3B2B]/10 text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                        <th className="py-3">SUBJECT</th>
                        <th className="py-3">QUIZ AVG</th>
                        <th className="py-3">ASSIGNMENTS</th>
                        <th className="py-3">MIDTERM EXAM</th>
                        <th className="py-3">FINAL GRADE</th>
                        <th className="py-3 text-right">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1B3B2B]/10">
                      {[
                        { subject: "Islamic History", icon: "📖", quiz: "92%", assignments: "95%", midterm: "88%", final: "91% (A)", status: "Excellent", badge: "bg-emerald-100 text-emerald-800" },
                        { subject: "Arabic Grammar", icon: "🔤", quiz: "85%", assignments: "88%", midterm: "92%", final: "89% (B+)", status: "Good", badge: "bg-emerald-100 text-emerald-800" },
                        { subject: "Quranic Studies", icon: "📖", quiz: "98%", assignments: "100%", midterm: "96%", final: "98% (A+)", status: "Outstanding", badge: "bg-amber-100 text-amber-800" },
                        { subject: "Mathematics", icon: "📐", quiz: "78%", assignments: "82%", midterm: "75%", final: "79% (C+)", status: "Satisfactory", badge: "bg-gray-200 text-gray-700" },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#1B3B2B]/5 transition-colors">
                          <td className="py-4 font-bold text-[#1B3B2B] flex items-center gap-2">
                            <span>{row.icon}</span> <span>{row.subject}</span>
                          </td>
                          <td className="py-4 text-[#1B3B2B] font-medium">{row.quiz}</td>
                          <td className="py-4 text-[#1B3B2B] font-medium">{row.assignments}</td>
                          <td className="py-4 text-[#1B3B2B] font-medium">{row.midterm}</td>
                          <td className="py-4 font-bold text-[#1B3B2B]">{row.final}</td>
                          <td className="py-4 text-right">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.badge}`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bottom Section: Teacher's Remarks (Dark Green Card matching Screenshot 5) */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#1B3B2B] text-white space-y-4 shadow-xl border border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] overflow-hidden shrink-0 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Teacher Advisor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-[#FED65B] flex items-center gap-2">
                    <span className="text-2xl">❝</span> Teacher's Remarks
                  </h4>
                  <p className="text-xs sm:text-sm text-white/90 italic leading-relaxed">
                    "The student has shown exceptional dedication to Quranic Studies and Islamic History this term. Their participation in class discussions is insightful and inspiring to peers. While Mathematics remains an area for growth, consistent effort is evident. Continued focus on analytical problem-solving will yield great results."
                  </p>
                  <p className="text-xs font-semibold text-white/70 pt-1">
                    <strong className="text-[#FED65B]">Ustadha Amina Rashid</strong> | Head Advisor
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 7: MY COURSES */}
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
                  <div key={i} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 shadow-xs space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
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
                    </div>

                    <button
                      type="button"
                      className="w-full rounded-xl bg-[#1B3B2B] text-white py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#2B543D] transition-colors cursor-pointer"
                    >
                      Open Course Modules →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: LIVE CLASSES */}
          {activeTab === "live-classes" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Live Interactive Classrooms</h3>
                <p className="text-xs text-muted-foreground">Join scheduled live audio/video sessions directly with teachers.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#1B3B2B] to-[#2B543D] text-white space-y-6 shadow-xl">
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
            </div>
          )}

          {/* TAB 9: RECORDED CLASSES */}
          {activeTab === "recorded-classes" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Recorded Video Lecture Library</h3>
                <p className="text-xs text-muted-foreground">Replay past lectures anytime for revision and exam prep.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Surah Al-Baqarah Ayah 255-286 Detailed Tafseer", date: "26 July 2026", duration: "52 Mins", category: "TAFSEER" },
                  { title: "Tajweed Rules: Ghunna & Ikhfa Masterclass", date: "24 July 2026", duration: "45 Mins", category: "TAJWEED" },
                  { title: "Hadith 1: Intentions (Innamal A'malu Bin Niyyat)", date: "22 July 2026", duration: "60 Mins", category: "HADITH" },
                  { title: "Fiqh-e-Hanafi: Masail-e-Taharat & Wudu", date: "20 July 2026", duration: "50 Mins", category: "FIQH" },
                ].map((v, i) => (
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
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: ONLINE TESTS */}
          {activeTab === "tests" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Online Examinations & Quizzes</h3>
                <p className="text-xs text-muted-foreground">Take scheduled multiple choice assessments and check instantly scored results.</p>
              </div>

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
                    className="rounded-xl bg-[#1B3B2B] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#2B543D] cursor-pointer"
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
                        <label key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F5EFE6] border border-[#1B3B2B]/10 cursor-pointer hover:bg-[#1B3B2B]/10">
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
                      <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl">
                        ✓ Score: 100% Passed! Result submitted to portal.
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setQuizSubmitted(true)}
                        className="rounded-xl bg-[#D4AF37] text-[#1B3B2B] px-5 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Submit Test Answers →
                      </button>
                    )}
                  </div>
                )}
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

              <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-6 max-w-xl shadow-xs">
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
                  onClick={() => alert("Downloading official PDF Sanad Certificate...")}
                  className="w-full rounded-xl bg-[#1B3B2B] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#2B543D] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
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
                <p className="text-xs text-muted-foreground font-sans">Your official academy registration information.</p>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-6 shadow-xs">
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
                    <span className="font-semibold text-emerald-800">94% (112/120 Present)</span>
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
