import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-[#1B3B2B]";
import { createFileRoute as createRoute } from "@tanstack/react-router";
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
  ArrowUpRight,
  Edit2,
  MicOff,
  Camera,
  Hand,
  RotateCcw,
  SlidersHorizontal,
  Calendar as CalendarIcon,
  Play
} from "lucide-react";
import { getCurrentStudent, signOutStudent, StudentProfile, DEMO_STUDENT } from "@/lib/supabase";

export const Route = createRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Portal Dashboard — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      { name: "description", content: "Student Dashboard for course progress, live classes, assignments, digital library, profile, and certificates." },
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

  // Live Class Countdown State (02:45:10)
  const [timer, setTimer] = useState({ hours: 2, minutes: 45, seconds: 10 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Recorded Classes State
  const [activeChapter, setActiveChapter] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [recordedPage, setRecordedPage] = useState(1);

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

  // Profile Edit State (NO AVATAR PHOTO AS REQUESTED)
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingGuardian, setIsEditingGuardian] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "Fatima Zahra",
    email: "fatima.z@student.jamiya.edu",
    dob: "15 March 2002",
    contact: "+91 98765 43210",
    gender: "Female",
    bloodGroup: "O+",
    guardianName: "Syed Ahmed Ali",
    emergencyContact: "+91 98765 00000",
    emailNotifications: true,
  });

  // Quiz State
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
    { id: "courses", label: "My Courses", icon: BookOpen, badge: "4 Active" },
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
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C201D] flex overflow-hidden font-sans selection:bg-[#D4AF37]/30 selection:text-[#1B3B2B]">
      
      {/* SIDEBAR NAVIGATION (Desktop) */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[270px] bg-[#1B3B2B] text-white shadow-2xl z-30 border-r border-[#D4AF37]/20">
        
        {/* Brand Header with Logo Emblem */}
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
          <div className="w-[270px] h-full bg-[#1B3B2B] text-white flex flex-col p-4 shadow-2xl animate-in slide-in-from-left">
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
              {activeTab === "overview" || activeTab === "fee" || activeTab === "report" || activeTab === "profile" || activeTab === "live-classes" || activeTab === "recorded-classes" ? (
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
            <div className="hidden sm:flex items-center gap-2 bg-[#F5EFE6] border border-[#1B3B2B]/15 rounded-full px-4 py-2 text-xs w-48 md:w-64 focus-within:ring-2 focus-within:ring-[#1B3B2B]/20">
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
                      <p className="font-semibold text-[#1B3B2B]">Exam Schedule Released</p>
                      <p className="text-[10px] text-muted-foreground">The mid-term examination schedule has been posted.</p>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F5EFE6]/60">
                      <p className="font-semibold text-[#1B3B2B]">Live Class Alert</p>
                      <p className="text-[10px] text-muted-foreground">Tajweed & Qirat Level 2 starts in 2 hours 45 mins.</p>
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

            {/* User Profile Icon */}
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className="p-2 rounded-full bg-[#F5EFE6] hover:bg-[#1B3B2B]/10 text-[#1B3B2B] transition-colors cursor-pointer"
              title="My Profile"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* DASHBOARD BODY CONTENT BY TAB */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW / DASHBOARD HOME */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Top Hero Banner with Live Class Timer Box */}
              <div className="rounded-2xl bg-[#1B3B2B] text-white p-6 sm:p-8 shadow-xl border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-white">
                    Assalamu Alaikum
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
                    May your pursuit of knowledge be blessed today.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/10 border border-white/20 text-center space-y-1 shrink-0 w-full md:w-auto">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FED65B] block">
                    NEXT LIVE CLASS IN
                  </span>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-white font-mono tracking-widest">
                    {String(timer.hours).padStart(2, "0")} : {String(timer.minutes).padStart(2, "0")} : {String(timer.seconds).padStart(2, "0")}
                  </p>
                  <p className="text-[11px] text-white/70 font-sans">
                    Tajweed & Qirat - Level 2
                  </p>
                </div>
              </div>

              {/* 4 Summary Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div 
                  onClick={() => setActiveTab("attendance")}
                  className="p-5 sm:p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs hover:border-[#D4AF37] transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#1B3B2B]/5 flex items-center justify-center text-[#1B3B2B]">
                      <CalendarCheck className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Excellent
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">Overall Attendance</span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">94%</p>
                  </div>
                  <div className="w-full bg-[#1B3B2B] h-1 rounded-full absolute bottom-0 left-0" />
                </div>

                <div 
                  onClick={() => setActiveTab("courses")}
                  className="p-5 sm:p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs hover:border-[#D4AF37] transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#1B3B2B]/5 flex items-center justify-center text-[#1B3B2B]">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">Enrolled Courses</span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">4</p>
                  </div>
                  <div className="w-full bg-[#1B3B2B] h-1 rounded-full absolute bottom-0 left-0" />
                </div>

                <div 
                  onClick={() => setActiveTab("assignments")}
                  className="p-5 sm:p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs hover:border-[#D4AF37] transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                      Due Soon
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">Pending Assignments</span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">2</p>
                  </div>
                  <div className="w-full bg-[#D4AF37] h-1 rounded-full absolute bottom-0 left-0" />
                </div>

                <div 
                  onClick={() => setActiveTab("fee")}
                  className="p-5 sm:p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs hover:border-[#D4AF37] transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Clear
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">Fee Status</span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">Paid</p>
                  </div>
                  <div className="w-full bg-[#1B3B2B] h-1 rounded-full absolute bottom-0 left-0" />
                </div>
              </div>

              {/* Active Courses & Notice Board */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <div className="lg:col-span-8 p-5 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Active Courses</h3>
                    <button type="button" onClick={() => setActiveTab("courses")} className="text-xs font-semibold text-[#1B3B2B] hover:underline flex items-center gap-1">
                      View All →
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-white border border-[#1B3B2B]/10 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="font-serif font-bold text-lg text-[#1B3B2B]">Tajweed & Qirat - Level 2</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">👤 Ustadha Ayesha</p>
                        </div>
                        <button type="button" onClick={() => setActiveTab("courses")} className="px-5 py-2 rounded-xl bg-[#1B3B2B] text-white text-xs font-semibold hover:bg-[#2B543D] cursor-pointer self-start sm:self-auto">
                          Continue
                        </button>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-muted-foreground">
                          <span>Progress</span>
                          <span className="font-bold text-[#1B3B2B]">65%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-[#1B3B2B] h-full rounded-full w-[65%]" />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-white border border-[#1B3B2B]/10 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <h4 className="font-serif font-bold text-lg text-[#1B3B2B]">Arabic Grammar (Nahw)</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">👤 Ustadha Fatima</p>
                        </div>
                        <button type="button" onClick={() => setActiveTab("courses")} className="px-5 py-2 rounded-xl bg-[#1B3B2B] text-white text-xs font-semibold hover:bg-[#2B543D] cursor-pointer self-start sm:self-auto">
                          Continue
                        </button>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-medium text-muted-foreground">
                          <span>Progress</span>
                          <span className="font-bold text-[#1B3B2B]">40%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-[#1B3B2B] h-full rounded-full w-[40%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 p-5 sm:p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5 shadow-xs relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📣</span>
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Notice Board</h3>
                  </div>

                  <div className="space-y-4 divide-y divide-[#1B3B2B]/10 text-xs">
                    <div className="pt-2 space-y-1">
                      <span className="text-[10px] font-bold text-[#D4AF37] block">Today, 09:00 AM</span>
                      <p className="font-bold text-[#1B3B2B]">Exam Schedule Released</p>
                      <p className="text-[#1B3B2B]/70 leading-relaxed">The mid-term examination schedule for all levels has been posted.</p>
                    </div>
                    <div className="pt-3 space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground block">Yesterday</span>
                      <p className="font-bold text-[#1B3B2B]">Library Maintenance</p>
                      <p className="text-[#1B3B2B]/70 leading-relaxed">The digital library will be down for maintenance from 2 AM to 4 AM.</p>
                    </div>
                    <div className="pt-3 space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground block">Oct 12, 2023</span>
                      <p className="font-bold text-[#1B3B2B]">New Guest Lecture</p>
                      <p className="text-[#1B3B2B]/70 leading-relaxed">Special session on Seerah scheduled for this Friday.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MY PROFILE (NO PROFILE PICTURE AVATAR AS REQUESTED) */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: Student Details Card & Account Settings */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Profile Card (Without Picture as per prompt) */}
                  <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 text-center space-y-4 shadow-xs">
                    <div className="space-y-1.5">
                      <h3 className="font-serif font-bold text-2xl text-[#1B3B2B]">{profileData.fullName}</h3>
                      <span className="inline-block px-3 py-1 rounded-full bg-white border border-[#1B3B2B]/15 text-[#1B3B2B] text-[11px] font-bold">
                        Student ID: JK-2024-089
                      </span>
                      <p className="text-xs text-muted-foreground pt-1">Advanced Islamic Studies</p>
                    </div>

                    <div className="pt-4 border-t border-[#1B3B2B]/10 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Batch</span>
                        <span className="font-bold text-[#1B3B2B]">Al-Fatiha</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground uppercase font-semibold block">Enrolled</span>
                        <span className="font-bold text-[#1B3B2B]">Aug 2024</span>
                      </div>
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                    <h3 className="font-serif font-bold text-lg text-[#1B3B2B] flex items-center gap-2">
                      ⚙ Account Settings
                    </h3>

                    <div className="space-y-3 text-xs">
                      <button
                        type="button"
                        onClick={() => alert("Password reset link sent to fatima.z@student.jamiya.edu")}
                        className="w-full p-3.5 rounded-xl bg-white border border-[#1B3B2B]/10 flex items-center justify-between font-semibold text-[#1B3B2B] hover:bg-gray-50 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <RotateCcw className="w-4 h-4 text-muted-foreground" /> Update Password
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>

                      <div className="p-3.5 rounded-xl bg-white border border-[#1B3B2B]/10 flex items-center justify-between font-semibold text-[#1B3B2B]">
                        <span className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-muted-foreground" /> Email Notifications
                        </span>
                        <input
                          type="checkbox"
                          checked={profileData.emailNotifications}
                          onChange={(e) => setProfileData({ ...profileData, emailNotifications: e.target.checked })}
                          className="w-4 h-4 accent-[#1B3B2B] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Column: Personal Information & Guardian Details */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Personal Information */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-6 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#1B3B2B]/10 pb-4">
                      <h3 className="font-serif font-bold text-xl text-[#1B3B2B] flex items-center gap-2">
                        💳 Personal Information
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#1B3B2B] hover:underline cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> {isEditingProfile ? "Save" : "Edit"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Full Name</label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          className="w-full p-3 rounded-xl bg-white border border-gray-200 text-[#1B3B2B] font-semibold disabled:opacity-90"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Email Address</label>
                        <input
                          type="email"
                          disabled={!isEditingProfile}
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full p-3 rounded-xl bg-white border border-gray-200 text-[#1B3B2B] font-semibold disabled:opacity-90"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Date of Birth</label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={profileData.dob}
                          onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                          className="w-full p-3 rounded-xl bg-white border border-gray-200 text-[#1B3B2B] font-semibold disabled:opacity-90"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Contact Number</label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={profileData.contact}
                          onChange={(e) => setProfileData({ ...profileData, contact: e.target.value })}
                          className="w-full p-3 rounded-xl bg-white border border-gray-200 text-[#1B3B2B] font-semibold disabled:opacity-90"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Gender</label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={profileData.gender}
                          onChange={(e) => setProfileData({ ...profileData, gender: e.target.value })}
                          className="w-full p-3 rounded-xl bg-white border border-gray-200 text-[#1B3B2B] font-semibold disabled:opacity-90"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Blood Group</label>
                        <input
                          type="text"
                          disabled={!isEditingProfile}
                          value={profileData.bloodGroup}
                          onChange={(e) => setProfileData({ ...profileData, bloodGroup: e.target.value })}
                          className="w-full p-3 rounded-xl bg-white border border-gray-200 text-[#1B3B2B] font-semibold disabled:opacity-90"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guardian Details */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-6 shadow-xs">
                    <div className="flex items-center justify-between border-b border-[#1B3B2B]/10 pb-4">
                      <h3 className="font-serif font-bold text-xl text-[#1B3B2B] flex items-center gap-2">
                        👥 Guardian Details
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsEditingGuardian(!isEditingGuardian)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#1B3B2B] hover:underline cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> {isEditingGuardian ? "Save" : "Edit"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Father's / Guardian's Name</label>
                        <input
                          type="text"
                          disabled={!isEditingGuardian}
                          value={profileData.guardianName}
                          onChange={(e) => setProfileData({ ...profileData, guardianName: e.target.value })}
                          className="w-full p-3 rounded-xl bg-white border border-gray-200 text-[#1B3B2B] font-semibold disabled:opacity-90"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-muted-foreground font-medium">Emergency Contact Number</label>
                        <input
                          type="text"
                          disabled={!isEditingGuardian}
                          value={profileData.emergencyContact}
                          onChange={(e) => setProfileData({ ...profileData, emergencyContact: e.target.value })}
                          className="w-full p-3 rounded-xl bg-white border border-gray-200 text-[#1B3B2B] font-semibold disabled:opacity-90"
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 3: RECORDED CLASSES (Screenshot 3 Exact Replica) */}
          {activeTab === "recorded-classes" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Header Title */}
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Recorded Classes</h2>
              </div>

              {/* Main Featured Video Player & Chapters Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Left Video Player Container (8 Cols matching Screenshot 3) */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#1B3B2B]/15 bg-black group">
                    <img
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&auto=format&fit=crop&q=80"
                      alt="Lecture Video Player"
                      className="w-full h-[280px] sm:h-[380px] object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => alert("Playing lecture video: Rules of Noon Sakinah")}
                        className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#1B3B2B] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Play className="w-8 h-8 fill-[#1B3B2B] ml-1" />
                      </button>
                    </div>
                  </div>

                  {/* Video Meta Info */}
                  <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 text-xs">
                          <span className="px-3 py-1 rounded-full bg-white border border-[#1B3B2B]/20 text-[#1B3B2B] font-bold text-[10px] uppercase">
                            TAJWEED
                          </span>
                          <span className="text-muted-foreground">Oct 24, 2023 • Shaykh Ali</span>
                        </div>
                        <h3 className="font-serif font-bold text-2xl text-[#1B3B2B]">
                          Rules of Noon Sakinah
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsCompleted(!isCompleted)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                          isCompleted
                            ? "bg-emerald-700 text-white"
                            : "bg-[#1B3B2B] text-white hover:bg-[#2B543D]"
                        }`}
                      >
                        <Check className="w-4 h-4" /> {isCompleted ? "Completed" : "Mark as Completed"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Chapters Sidebar Container (4 Cols matching Screenshot 3) */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5 shadow-xs">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Chapters</h3>

                  <div className="space-y-2.5 text-xs font-sans">
                    {[
                      { id: 0, time: "00:00", title: "Introduction & Review" },
                      { id: 1, time: "24:15", title: "Izhar (Clear Pronunciation)", desc: "Detailed explanation..." },
                      { id: 2, time: "32:40", title: "Idgham (Assimilation)" },
                      { id: 3, time: "45:10", title: "Iqlab & Ikhfa" },
                      { id: 4, time: "52:00", title: "Q&A Session" },
                    ].map((chap) => {
                      const isActive = activeChapter === chap.id;
                      return (
                        <div
                          key={chap.id}
                          onClick={() => setActiveChapter(chap.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isActive
                              ? "bg-white border-[#1B3B2B]/20 shadow-xs"
                              : "bg-transparent border-transparent hover:bg-white/60"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`font-mono text-xs font-bold ${isActive ? "text-[#1B3B2B]" : "text-[#D4AF37]"}`}>
                              {chap.time}
                            </span>
                            <span className={`font-semibold ${isActive ? "text-[#1B3B2B] font-bold" : "text-[#1B3B2B]/80"}`}>
                              {chap.title}
                            </span>
                          </div>
                          {chap.desc && (
                            <p className="text-[10px] text-muted-foreground mt-1 pl-12">{chap.desc}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Bottom Video Library Section */}
              <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1B3B2B]/10 pb-4">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[#1B3B2B]">Video Library</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">Explore past lectures and continue your learning journey.</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs w-full sm:w-48">
                      <Search className="w-3.5 h-3.5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search lectures..."
                        className="bg-transparent focus:outline-none w-full text-xs"
                      />
                    </div>
                    <button type="button" className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-[#1B3B2B] flex items-center gap-1.5 hover:bg-gray-50">
                      <SlidersHorizontal className="w-3.5 h-3.5" /> Subject
                    </button>
                    <button type="button" className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-[#1B3B2B] flex items-center gap-1.5 hover:bg-gray-50">
                      <CalendarIcon className="w-3.5 h-3.5" /> Date
                    </button>
                  </div>
                </div>

                {/* 3-Column Video Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Introduction to Sahih Al-Bukhari",
                      desc: "An overview of the compilation methodology and historical context.",
                      tag: "HADITH",
                      timeAgo: "2 days ago",
                      duration: "45:20",
                      instructor: "Ustadh Umar",
                      progress: 100,
                      img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80"
                    },
                    {
                      title: "Advanced Grammar: Nahw Patterns",
                      desc: "Deep dive into complex sentence structures and grammatical states.",
                      tag: "ARABIC",
                      timeAgo: "1 week ago",
                      duration: "58:15",
                      instructor: "Shaykh Salih",
                      progress: 45,
                      img: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=80"
                    },
                    {
                      title: "Principles of Jurisprudence (Usool)",
                      desc: "Understanding the foundational texts and how rulings are derived.",
                      tag: "FIQH",
                      timeAgo: "2 weeks ago",
                      duration: "1:12:05",
                      instructor: "Mufti Ahmad",
                      progress: 0,
                      img: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=600&auto=format&fit=crop&q=80"
                    },
                  ].map((video, i) => (
                    <div key={i} className="rounded-2xl bg-white border border-[#1B3B2B]/10 overflow-hidden shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="relative h-44 bg-black overflow-hidden group cursor-pointer">
                          <img src={video.img} alt={video.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-300" />
                          <span className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-mono text-white">
                            {video.duration}
                          </span>
                        </div>

                        <div className="px-5 space-y-2">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#F5EFE6] font-bold text-[#1B3B2B]">
                              {video.tag}
                            </span>
                            <span className="text-muted-foreground">{video.timeAgo}</span>
                          </div>
                          <h4 className="font-serif font-bold text-base text-[#1B3B2B] leading-snug">{video.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">{video.desc}</p>
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-2 space-y-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-[#1B3B2B]/10 flex items-center justify-center font-bold text-[10px] text-[#1B3B2B]">
                              {video.instructor[0]}
                            </div>
                            <span className="font-semibold text-[#1B3B2B] text-xs">{video.instructor}</span>
                          </div>
                          <span className="font-mono text-xs font-bold text-[#1B3B2B]">{video.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#1B3B2B] h-full rounded-full" style={{ width: `${video.progress}%` }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center justify-center gap-2 pt-4">
                  <button type="button" onClick={() => setRecordedPage(Math.max(1, recordedPage - 1))} className="p-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1B3B2B] hover:bg-gray-50">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {[1, 2, 3].map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setRecordedPage(p)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold ${
                        recordedPage === p
                          ? "bg-[#1B3B2B] text-white"
                          : "bg-white border border-gray-200 text-[#1B3B2B] hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <span className="text-xs text-muted-foreground">...</span>
                  <button type="button" onClick={() => setRecordedPage(recordedPage + 1)} className="p-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1B3B2B] hover:bg-gray-50">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: ATTENDANCE (Screenshot 1 Exact Replica) */}
          {activeTab === "attendance" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Attendance</h2>
              </div>

              {/* 4 Summary Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#1B3B2B]/5 flex items-center justify-center text-[#1B3B2B]">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">CONDUCTED CLASSES</span>
                    <p className="font-serif font-bold text-4xl text-[#1B3B2B] mt-1">120</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">PRESENT</span>
                    <p className="font-serif font-bold text-4xl text-[#1B3B2B] mt-1">112</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                    <X className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">ABSENT</span>
                    <p className="font-serif font-bold text-4xl text-rose-700 mt-1">5</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#1B3B2B] text-white space-y-4 shadow-md border border-[#D4AF37]/30">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FED65B]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FED65B] block">ATTENDANCE %</span>
                    <p className="font-serif font-bold text-4xl text-[#FED65B] mt-1">94%</p>
                  </div>
                </div>
              </div>

              {/* Bottom Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">{calendarMonth}</h3>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => setCalendarMonth("September 2023")} className="p-1 text-[#1B3B2B] hover:bg-[#1B3B2B]/10 rounded-lg">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button type="button" onClick={() => setCalendarMonth("October 2023")} className="p-1 text-[#1B3B2B] hover:bg-[#1B3B2B]/10 rounded-lg">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold">
                    <span className="p-2"></span>
                    <span className="p-2 text-gray-700">1</span>
                    {[2, 3, 4, 5].map((d) => (
                      <span key={d} className="w-8 h-8 rounded-full bg-[#36493F] text-white flex items-center justify-center mx-auto">
                        {d}
                      </span>
                    ))}
                    <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto">6</span>
                    {[7, 8].map((d) => (<span key={d} className="p-2 text-gray-700">{d}</span>))}
                    {[9, 10].map((d) => (
                      <span key={d} className="w-8 h-8 rounded-full bg-[#36493F] text-white flex items-center justify-center mx-auto">
                        {d}
                      </span>
                    ))}
                    <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1B3B2B] font-bold flex items-center justify-center mx-auto">11</span>
                    <span className="w-8 h-8 rounded-full bg-[#36493F] text-white flex items-center justify-center mx-auto">12</span>
                    <span className="w-8 h-8 rounded-full bg-[#36493F] text-white flex items-center justify-center mx-auto">13</span>
                    <span className="p-2 text-gray-700">14</span>
                    <span className="p-2 text-gray-700">15</span>
                    <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1B3B2B] font-bold flex items-center justify-center mx-auto ring-2 ring-[#1B3B2B]">16</span>
                    {[17, 18, 19, 20, 21].map((d) => (<span key={d} className="p-2 text-gray-400">{d}</span>))}
                  </div>

                  <div className="pt-4 border-t border-[#1B3B2B]/10 flex items-center justify-start gap-6 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#36493F]" /> Present</span>
                    <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Absent</span>
                    <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" /> Excused</span>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Attendance Log</h3>
                    <button type="button" onClick={() => alert("Exporting log...")} className="flex items-center gap-1.5 text-xs font-semibold text-[#1B3B2B] hover:underline">
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
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.badge}`}>{row.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-2 text-center">
                    <button type="button" onClick={() => alert("Loading older logs...")} className="text-xs font-semibold text-[#1B3B2B] hover:underline">
                      View Older Logs
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: PROGRESS REPORT (Screenshot 2 Exact Replica) */}
          {activeTab === "report" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B3B2B]/10 pb-4">
                <div>
                  <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Academic Progress</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Term 1: Fall 2023 - Overall Performance</p>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Generating & Downloading Official PDF Report Card...")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#1B3B2B] text-xs font-bold hover:bg-[#e9c349] transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Official Report Card (PDF)
                </button>
              </div>

              {/* Grade Trends & Term Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 flex flex-col justify-between shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Grade Trends</h3>
                    <span className="px-3 py-1 rounded-full bg-[#E8E0D2] text-[#1B3B2B] text-[10px] font-bold uppercase tracking-wider">
                      TERM 1
                    </span>
                  </div>

                  <div className="w-full pt-4 pb-2">
                    <svg viewBox="0 0 500 180" className="w-full h-44 overflow-visible">
                      {[0, 30, 60, 90, 120, 150].map((y, idx) => (
                        <line key={idx} x1="30" y1={y + 10} x2="480" y2={y + 10} stroke="#1B3B2B" strokeOpacity="0.08" strokeDasharray="4 4" />
                      ))}
                      <text x="5" y="15" fill="#71717A" fontSize="9" className="font-mono">100</text>
                      <text x="5" y="45" fill="#71717A" fontSize="9" className="font-mono">95</text>
                      <text x="5" y="75" fill="#71717A" fontSize="9" className="font-mono">90</text>
                      <text x="5" y="105" fill="#71717A" fontSize="9" className="font-mono">85</text>
                      <text x="5" y="135" fill="#71717A" fontSize="9" className="font-mono">80</text>
                      <text x="5" y="165" fill="#71717A" fontSize="9" className="font-mono">60</text>

                      <path d="M 50 100 Q 120 75 190 90 T 330 65 T 470 70 L 470 160 L 50 160 Z" fill="#36493F" fillOpacity="0.12" />
                      <path d="M 50 100 Q 120 75 190 90 T 330 65 T 470 70" fill="none" stroke="#36493F" strokeWidth="3" />
                      {[
                        { x: 50, y: 100 }, { x: 120, y: 80 }, { x: 190, y: 90 }, { x: 260, y: 72 }, { x: 330, y: 82 }, { x: 400, y: 55 }, { x: 470, y: 68 }
                      ].map((pt, i) => (
                        <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#D4AF37" stroke="#36493F" strokeWidth="2" />
                      ))}

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

                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs relative overflow-hidden flex flex-col justify-between">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Term Summary</h3>

                  <div className="space-y-3 relative z-10">
                    <div className="p-4 rounded-xl bg-white/80 border border-[#1B3B2B]/10 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">OVERALL GPA</span>
                        <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-0.5">3.8</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[#1B3B2B]" />
                    </div>

                    <div className="p-4 rounded-xl bg-white/80 border border-[#1B3B2B]/10 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">ATTENDANCE</span>
                        <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-0.5">95%</p>
                      </div>
                      <Check className="w-5 h-5 text-emerald-700 stroke-[3]" />
                    </div>

                    <div className="p-4 rounded-xl bg-white/80 border border-[#1B3B2B]/10 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground block">CLASS RANK</span>
                        <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-0.5">4<span className="text-lg font-sans">th</span></p>
                      </div>
                      <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Subject Breakdown Table */}
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
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.badge}`}>{row.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Teacher's Remarks */}
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

          {/* TAB 6: FEE STATUS (Rupees ₹) */}
          {activeTab === "fee" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Financial Overview</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Review your fee status, payment history, and upcoming dues in Indian Rupees (₹).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[#1B3B2B]/5 flex items-center justify-center text-[#1B3B2B]">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">TOTAL FEE (ANNUAL)</span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">₹6,000.00</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">PAID AMOUNT</span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B]">₹4,500.00</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#1B3B2B] h-full rounded-full w-[75%]" />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">DUE BALANCE</span>
                    <p className="font-serif font-bold text-3xl text-rose-700 mt-1">₹1,500.00</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#1B3B2B] text-white space-y-4 shadow-md border border-[#D4AF37]/30 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FED65B] block">NEXT DUE DATE</span>
                    <p className="font-serif font-bold text-2xl text-white mt-1">Nov 15, 2026</p>
                    <p className="text-xs text-white/70 mt-0.5 font-sans">Installment: ₹500.00</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaymentModalOpen(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37] text-[#1B3B2B] text-xs font-bold uppercase tracking-wider hover:bg-[#e9c349] transition-colors cursor-pointer shadow-sm"
                  >
                    Pay Online →
                  </button>
                </div>
              </div>

              {/* Payment History Table */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#1B3B2B]/10 pb-4">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Payment History</h3>
                  <button type="button" onClick={() => alert("Downloading statement...")} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#1B3B2B] text-[#1B3B2B] text-xs font-semibold hover:bg-gray-50">
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
                        { receipt: "RCP-2026-089", date: "Sep 01, 2026", amount: "₹1,500.00", isFailed: false, mode: "Online UPI / GPay", status: "Successful", badge: "bg-emerald-100 text-emerald-800" },
                        { receipt: "RCP-2026-042", date: "Jul 15, 2026", amount: "₹1,000.00", isFailed: false, mode: "Bank Transfer", status: "Successful", badge: "bg-emerald-100 text-emerald-800" },
                        { receipt: "RCP-2026-090", date: "Sep 01, 2026", amount: "₹500.00", isFailed: true, mode: "Online NetBanking", status: "Failed", badge: "bg-rose-100 text-rose-700" },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#1B3B2B]/5 transition-colors">
                          <td className="py-4 font-mono font-medium text-[#1B3B2B]">{row.receipt}</td>
                          <td className="py-4 text-[#1B3B2B]">{row.date}</td>
                          <td className={`py-4 font-bold ${row.isFailed ? "text-rose-600" : "text-[#1B3B2B]"}`}>{row.amount}</td>
                          <td className="py-4 text-[#1B3B2B]">{row.mode}</td>
                          <td className="py-4"><span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.badge}`}>{row.status}</span></td>
                          <td className="py-4 text-right">
                            <button type="button" onClick={() => alert(`Downloading Receipt #${row.receipt}`)} className="p-1.5 rounded-lg text-[#1B3B2B] hover:bg-[#1B3B2B]/10">
                              <FileCheck className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Certificates</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-[#1B3B2B]/5 flex items-center justify-center text-[#1B3B2B]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">TOTAL EARNED</span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B]">2</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#92400E]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">IN PROGRESS</span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B]">1</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5 pt-2">
                <h3 className="font-serif font-bold text-2xl text-[#1B3B2B]">Earned Certificates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-[#F5EFE6] border-2 border-[#D4AF37]/50 flex flex-col sm:flex-row gap-6 shadow-xs">
                    <div className="w-full sm:w-36 h-48 rounded-xl bg-white border border-[#1B3B2B]/20 p-2 shrink-0 flex items-center justify-center text-center">
                      <span className="font-serif text-xs font-bold text-[#1B3B2B]">شهادة تقدير وإجازة</span>
                    </div>
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold uppercase">
                          COURSE COMPLETION
                        </span>
                        <h4 className="font-serif font-bold text-xl text-[#1B3B2B] mt-2">Tajweed Rules & Recitation</h4>
                        <p className="text-xs text-muted-foreground mt-1">Awarded for demonstrating proficiency in Quranic recitation rules.</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => alert("Downloading PDF...")} className="flex-1 py-2 px-3 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold flex items-center justify-center gap-1.5">
                          <Download className="w-3.5 h-3.5 text-[#FED65B]" /> Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* OTHER TABS (DIGITAL LIBRARY, ASSIGNMENTS, ONLINE TESTS, LIVE CLASSES, COURSES) */}
          {activeTab === "library" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Digital Library</h2>
              <p className="text-xs text-muted-foreground">Access our curated collection of reference books and study materials.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Principles of Islamic Jurisprudence", category: "REFERENCE", size: "4.2 MB", date: "Oct 12, 2023" },
                  { title: "Morning & Evening Supplications", category: "DAILY DUAS", size: "1.8 MB", date: "Nov 05, 2023" },
                  { title: "History of the Prophets", category: "REFERENCE", size: "8.5 MB", date: "Dec 20, 2023" },
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#EFE9DD] text-[#4A4237]">{item.category}</span>
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">{item.title}</h3>
                    <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-[#1B3B2B]/10">
                      <span>{item.size}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Assignments</h2>
              <div className="p-6 rounded-2xl bg-[#F5EFE6] border space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Fiqh al-Ibadat: Purification</h3>
                <p className="text-xs text-muted-foreground">Due: Oct 25, 11:59 PM • 50 Marks</p>
                <p className="text-xs text-[#1B3B2B]/80 leading-relaxed">
                  Please write a comprehensive essay (1500 words) detailing the conditions and pillars of Wudu (ablution) according to the Hanafi school of thought. Include evidences from the Quran and Sunnah.
                </p>
              </div>
            </div>
          )}

          {activeTab === "tests" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Online Examinations & Quizzes</h2>
              <div className="p-6 rounded-2xl bg-[#F5EFE6] border space-y-4">
                <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Tajweed Makharij & Sifat Online Quiz</h3>
                <button type="button" onClick={() => alert("Starting Quiz...")} className="px-6 py-2.5 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold">Start Quiz →</button>
              </div>
            </div>
          )}

          {activeTab === "courses" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">My Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Alimiyya Degree Course (Year 2)", instructor: "Muftia Fatima Ali Hashmi" },
                  { title: "Tajweed & Qirat - Level 2", instructor: "Ustadha Ayesha" },
                  { title: "Arabic Grammar (Nahw)", instructor: "Ustadha Fatima" },
                ].map((c, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[#F5EFE6] border space-y-3">
                    <h4 className="font-serif font-bold text-xl text-[#1B3B2B]">{c.title}</h4>
                    <p className="text-xs text-muted-foreground">Instructor: {c.instructor}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "live-classes" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Live Interactive Classrooms</h2>
              <div className="p-8 rounded-2xl bg-[#1B3B2B] text-white space-y-4">
                <span className="px-3 py-1 rounded-full bg-red-500 text-xs font-bold uppercase">LIVE NOW</span>
                <h3 className="font-serif text-3xl font-bold">Advanced Fiqh Studies</h3>
                <p className="text-xs text-white/80">Shaykh Abdullah Al-Mahmoud • 06:00 PM - 07:30 PM (IST)</p>
                <a href="https://zoom.us" target="_blank" rel="noreferrer" className="inline-block px-6 py-3 rounded-xl bg-[#D4AF37] text-[#1B3B2B] text-xs font-bold uppercase">Join Live Class →</a>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
