import { useState, useEffect, useRef } from "react";
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
  Play,
  Lock,
  Mail,
  CheckCircle
} from "lucide-react";
import { getCurrentStudent, signOutStudent, StudentProfile, DEMO_STUDENT } from "@/lib/supabase";

export const Route = createFileRoute("/dashboard")({
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

  // Countdown Timer State (02:45:10)
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

  // Courses Tab State (Screenshot 1 Exact replica)
  const [selectedCourseId, setSelectedCourseId] = useState<string>("tajweed-qirat");

  // Profile Photo Upload State & Handlers
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarSrc, setAvatarSrc] = useState<string>("https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80");
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

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newUrl = URL.createObjectURL(file);
      setAvatarSrc(newUrl);
      alert("Profile picture updated successfully!");
    }
  };

  // Quiz State
  const [activeQuizModal, setActiveQuizModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Certificates Filter State
  const [certFilter, setCertFilter] = useState<"All" | "Completed">("Completed");

  // Reminders State
  const [remindersSet, setRemindersSet] = useState<Record<string, boolean>>({ "rem-1": true });

  // Notifications Modal State
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    async function loadSession() {
      const current = await getCurrentStudent();
      if (current) {
        setStudent(current);
        if (current.avatarUrl) setAvatarSrc(current.avatarUrl);
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
              {activeTab === "overview" || activeTab === "fee" || activeTab === "report" || activeTab === "profile" || activeTab === "live-classes" || activeTab === "recorded-classes" || activeTab === "courses" ? (
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
                placeholder={activeTab === "library" ? "Search digital library..." : activeTab === "courses" ? "Search courses..." : "Search..."}
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

            {/* User Profile Circle Icon */}
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className="p-[#D4AF37] rounded-full border-2 border-[#D4AF37] hover:opacity-90 transition-opacity cursor-pointer overflow-hidden"
              title="My Profile"
            >
              <img src={avatarSrc} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
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

          {/* TAB 2: MY PROFILE (WITH INTERACTIVE PROFILE PHOTO UPLOAD AS REQUESTED) */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Hidden File Input for Avatar Upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column: Student Summary Card with Photo Change Feature */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Profile Summary Card */}
                  <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 text-center space-y-4 shadow-xs">
                    
                    {/* Interactive Profile Photo Container */}
                    <div className="relative w-28 h-28 mx-auto group cursor-pointer" onClick={() => fileInputRef.current?.click()} title="Click to change profile photo">
                      <img
                        src={avatarSrc}
                        alt={profileData.fullName}
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-md group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white">
                        <Camera className="w-6 h-6 mb-1" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Change</span>
                      </div>
                      <div className="absolute bottom-0 right-0 bg-[#D4AF37] text-[#1B3B2B] p-1.5 rounded-full shadow-md border-2 border-white">
                        <Camera className="w-3.5 h-3.5" />
                      </div>
                    </div>

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

          {/* TAB 3: MY COURSES (Screenshot 1 Exact Replica) */}
          {activeTab === "courses" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Left Column: Enrolled Subjects Cards List (5 Cols matching Screenshot 1) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1B3B2B]/10 pb-3">
                    <h3 className="font-serif font-bold text-2xl text-[#1B3B2B]">Enrolled Subjects</h3>
                    <span className="text-xs text-muted-foreground font-semibold">3 Active</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        id: "tajweed-qirat",
                        title: "Tajweed & Qirat",
                        level: "ADVANCED",
                        desc: "Mastering the phonetic rules and beautiful recitation styles of the Holy Quran.",
                        progress: 65,
                        icon: "📖"
                      },
                      {
                        id: "hadith-studies",
                        title: "Hadith Studies",
                        level: "INTERMEDIATE",
                        desc: "Comprehensive analysis of Sahih Al-Bukhari and principles of Hadith...",
                        progress: 30,
                        icon: "📜"
                      },
                      {
                        id: "arabic-grammar",
                        title: "Arabic Grammar",
                        level: "BEGINNER",
                        desc: "Foundational Nahw and Sarf for understanding classical texts.",
                        progress: 15,
                        icon: "🔤"
                      }
                    ].map((subject) => {
                      const isSelected = selectedCourseId === subject.id;
                      return (
                        <div
                          key={subject.id}
                          onClick={() => setSelectedCourseId(subject.id)}
                          className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-4 ${
                            isSelected
                              ? "bg-[#F5EFE6] border-2 border-[#D4AF37] shadow-sm"
                              : "bg-[#F5EFE6]/60 border-[#1B3B2B]/10 hover:bg-[#F5EFE6]"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-[#1B3B2B]/5 flex items-center justify-center text-xl">
                              {subject.icon}
                            </div>
                            <span className="px-3 py-1 rounded-full bg-[#E5E7EB] text-[#374151] text-[10px] font-bold uppercase tracking-wider">
                              {subject.level}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-serif font-bold text-xl text-[#1B3B2B]">{subject.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{subject.desc}</p>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-[#1B3B2B]">{subject.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-[#D4AF37] h-full rounded-full transition-all duration-500"
                                style={{ width: `${subject.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Course Detail & Syllabus Viewer (7 Cols matching Screenshot 1) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Hero Module Banner (Dark Green Card with Gold Accent) */}
                  <div className="rounded-2xl bg-[#1B3B2B] text-white p-6 sm:p-8 shadow-xl border border-[#D4AF37]/30 space-y-4 relative overflow-hidden bg-[radial-gradient(#FED65B_1px,transparent_1px)] [background-size:16px_16px]">
                    <div className="flex items-start justify-between gap-4 relative z-10">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#FED65B] block">
                          MODULE 4 • SESSION 2
                        </span>
                        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white mt-1">
                          Tajweed & Qirat
                        </h2>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-white/70 uppercase block font-semibold">Current Progress</span>
                        <span className="font-serif font-bold text-3xl text-[#FED65B]">65%</span>
                      </div>
                    </div>
                  </div>

                  {/* Lead Instructor Card */}
                  <div className="p-4 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
                        alt="Shaykh Abdullah Al-Qari"
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                      />
                      <div>
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider block">LEAD INSTRUCTOR</span>
                        <h4 className="font-serif font-bold text-base text-[#1B3B2B]">Shaykh Abdullah Al-Qari</h4>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert("Opening message modal for Shaykh Abdullah Al-Qari")}
                      className="p-2.5 rounded-xl bg-white border border-[#1B3B2B]/10 text-[#1B3B2B] hover:bg-gray-50"
                      title="Contact Instructor"
                    >
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Course Syllabus Container */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5 shadow-xs">
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Course Syllabus</h3>

                    <div className="space-y-4 text-xs font-sans">
                      {/* Module 1 Completed */}
                      <div className="p-4 rounded-xl bg-white/70 border border-gray-200 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                        <div>
                          <h5 className="font-bold text-[#1B3B2B]">Module 1: Foundations of Makharij</h5>
                          <p className="text-[11px] text-muted-foreground">Articulation points of Arabic letters.</p>
                        </div>
                      </div>

                      {/* Module 2 Completed */}
                      <div className="p-4 rounded-xl bg-white/70 border border-gray-200 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                        <div>
                          <h5 className="font-bold text-[#1B3B2B]">Module 2: Sifat Al-Huruf (Attributes)</h5>
                          <p className="text-[11px] text-muted-foreground">Inherent and conditional characteristics of letters.</p>
                        </div>
                      </div>

                      {/* Module 3 Current Active */}
                      <div className="p-5 rounded-2xl bg-white border-2 border-[#D4AF37] shadow-sm space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                            <Play className="w-3.5 h-3.5 fill-amber-800" />
                          </div>
                          <div>
                            <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider block">CURRENT MODULE</span>
                            <h5 className="font-bold text-[#1B3B2B] text-sm">Module 3: Rules of Noon Sakinah & Tanween</h5>
                            <p className="text-[11px] text-muted-foreground">Understanding Izhar, Idgham, Iqlab, and Ikhfa.</p>
                          </div>
                        </div>

                        {/* Lessons List Inside Current Module */}
                        <div className="pl-9 space-y-2 text-xs border-t border-gray-100 pt-3">
                          <div className="flex items-center justify-between text-gray-500">
                            <span className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-emerald-600" /> Introduction to Noon Sakinah
                            </span>
                          </div>
                          <div className="flex items-center justify-between font-bold text-[#1B3B2B] bg-[#F5EFE6]/60 p-2 rounded-lg">
                            <span className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#1B3B2B]" /> Izhar (Clear Pronunciation)
                            </span>
                            <span className="font-mono text-[10px]">15:00</span>
                          </div>
                          <div className="flex items-center justify-between text-gray-400">
                            <span className="flex items-center gap-2">
                              <Lock className="w-3.5 h-3.5" /> Idgham (Assimilation)
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Module 4 Locked */}
                      <div className="p-4 rounded-xl bg-white/40 border border-gray-200 flex items-center gap-3 text-gray-400">
                        <Lock className="w-5 h-5 shrink-0" />
                        <div>
                          <h5 className="font-semibold">Module 4: Mudood (Elongation Rules)</h5>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1B3B2B]/10">
                      <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#1B3B2B]" /> Est. time left: 4h 30m
                      </span>
                      <button
                        type="button"
                        onClick={() => alert("Resuming Tajweed & Qirat Module 3...")}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4AF37] text-[#1B3B2B] font-bold text-xs hover:bg-[#e9c349] transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Resume Course →
                      </button>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 4: DIGITAL LIBRARY (Screenshot 2 Exact Replica) */}
          {activeTab === "library" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
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

              {/* Cards Grid (3 Columns matching Screenshot 2) */}
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
                ]
                  .filter((b) => {
                    if (libraryCategory === "All Files") return true;
                    if (libraryCategory === "Reference Books" && b.category === "REFERENCE") return true;
                    if (libraryCategory === "Daily Duas" && b.category === "DAILY DUAS") return true;
                    return true;
                  })
                  .map((item, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 shadow-xs flex flex-col justify-between space-y-5 hover:shadow-md transition-all">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${item.iconBg}`}>
                            {item.iconType === "pdf" ? <span className="text-xs font-bold font-mono">PDF</span> : <Library className="w-5 h-5" />}
                          </div>
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${item.categoryBadgeClass}`}>
                            {item.category}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-serif font-bold text-xl text-[#1B3B2B] leading-tight">{item.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{item.subtitle}</p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-2 border-t border-[#1B3B2B]/10">
                        <div className="flex items-center justify-between text-xs text-muted-foreground font-sans">
                          <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> {item.size}</span>
                          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {item.date}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <button type="button" onClick={() => setPreviewBook(item)} className="w-full flex items-center justify-center gap-2 rounded-xl bg-white border border-[#1B3B2B] text-[#1B3B2B] py-2.5 text-xs font-semibold hover:bg-[#1B3B2B]/5 cursor-pointer">
                            <Eye className="w-4 h-4" /> Preview
                          </button>
                          <a href="#" onClick={(e) => { e.preventDefault(); alert(`Downloading "${item.title}"`); }} className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1B3B2B] text-white py-2.5 text-xs font-semibold hover:bg-[#2B543D] cursor-pointer">
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
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => { alert(`Opening reader for ${previewBook.title}`); setPreviewBook(null); }} className="flex-1 bg-[#1B3B2B] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#2B543D]">
                        Open Reader →
                      </button>
                      <button type="button" onClick={() => setPreviewBook(null)} className="px-4 bg-white text-[#1B3B2B] py-2.5 rounded-xl text-xs font-semibold border border-[#1B3B2B]">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 5: ASSIGNMENTS (Screenshot 3 Exact Replica) */}
          {activeTab === "assignments" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="space-y-4 border-b border-[#1B3B2B]/10 pb-3">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Assignments</h2>

                <div className="flex gap-8 text-sm font-semibold">
                  {["pending", "submitted", "graded"].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setAssignmentSubTab(tab as any)}
                      className={`pb-2 capitalize transition-all cursor-pointer ${assignmentSubTab === tab ? "text-[#1B3B2B] font-bold border-b-2 border-[#1B3B2B]" : "text-muted-foreground"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left List (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  {[
                    { id: "fiqh-101", title: "Fiqh al-Ibadat: Purification", course: "Islamic Jurisprudence 101", due: "Oct 25", marks: "50 Marks", status: "PENDING", badgeClass: "bg-rose-100 text-rose-700" },
                    { id: "tafsir-201", title: "Tafsir Surah Al-Fatiha", course: "Quranic Exegesis", due: "Oct 28", marks: "100 Marks", status: "PENDING", badgeClass: "bg-rose-100 text-rose-700" },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedAssignmentId(item.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${selectedAssignmentId === item.id ? "bg-[#F5EFE6] border-[#1B3B2B] ring-1 ring-[#1B3B2B]" : "bg-[#F5EFE6]/60 border-[#1B3B2B]/10"}`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.badgeClass}`}>{item.status}</span>
                        <span className="text-muted-foreground font-medium">Due: {item.due}</span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#1B3B2B]">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.course}</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#1B3B2B] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> {item.marks}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Detail Panel (7 Cols) */}
                <div className="lg:col-span-7">
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-6 shadow-xs">
                    <div className="space-y-2 border-b border-[#1B3B2B]/10 pb-4">
                      <h2 className="font-serif font-bold text-2xl text-[#1B3B2B]">Fiqh al-Ibadat: Purification</h2>
                      <p className="text-xs font-semibold text-[#1B3B2B]">📖 Islamic Jurisprudence 101 • <span className="text-rose-700">Due: Oct 25, 11:59 PM</span></p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#1B3B2B]/80 leading-relaxed font-sans">
                      Please write a comprehensive essay (1500 words) detailing the conditions and pillars of Wudu (ablution) according to the Hanafi school of thought. Include evidences from the Quran and Sunnah.
                    </p>

                    <div className="space-y-2">
                      <h3 className="font-serif font-bold text-lg text-[#1B3B2B]">Instructions:</h3>
                      <ul className="list-disc list-inside text-xs sm:text-sm text-[#1B3B2B]/80 space-y-1 pl-1">
                        <li>Format as PDF or DOCX.</li>
                        <li>Use standard academic referencing.</li>
                        <li>Ensure clarity and proper structuring.</li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-[#1B3B2B]/10 space-y-4">
                      <h3 className="font-serif font-bold text-lg text-[#1B3B2B] flex items-center gap-2">
                        <UploadCloud className="w-5 h-5 text-[#1B3B2B]" /> Submit Assignment
                      </h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-[#FDFBF7]">
                        <UploadCloud className="w-6 h-6 mx-auto text-[#1B3B2B]" />
                        <p className="text-xs font-semibold text-[#1B3B2B] mt-2">
                          {assignmentFile ? assignmentFile.name : "Drag and drop your file here, or click to browse"}
                        </p>
                        <p className="text-[10px] text-muted-foreground mt-1">Supported formats: PDF, DOCX (Max 10MB)</p>
                        <input type="file" onChange={(e) => e.target.files?.[0] && setAssignmentFile(e.target.files[0])} className="hidden" id="asgn-file" />
                        <label htmlFor="asgn-file" className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-[#F5EFE6] text-xs font-bold border cursor-pointer">Choose File</label>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-semibold text-[#1B3B2B]">Comments for Teacher (Optional)</label>
                        <textarea rows={3} placeholder="Add any notes about your submission here..." value={assignmentNotes} onChange={(e) => setAssignmentNotes(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#1B3B2B]/20 bg-white" />
                      </div>

                      <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => alert("Draft saved!")} className="px-5 py-2.5 rounded-xl bg-white border border-[#1B3B2B] text-xs font-semibold">Save Draft</button>
                        <button type="button" onClick={() => alert("Submitted assignment!")} className="px-6 py-2.5 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold">Submit Assignment</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 6: ONLINE TESTS */}
          {activeTab === "tests" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Online Examinations & Quizzes</h3>
                <p className="text-xs text-muted-foreground">Take scheduled multiple choice assessments and check instantly scored results.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4">
                <h4 className="font-serif text-xl font-bold text-[#1B3B2B]">Tajweed Makharij & Sifat Online Quiz</h4>
                <p className="text-xs text-muted-foreground">20 Multiple choice questions • 30 Minutes Duration • Passing Marks: 70%</p>

                {!activeQuizModal ? (
                  <button type="button" onClick={() => setActiveQuizModal(true)} className="rounded-xl bg-[#1B3B2B] text-white px-6 py-2.5 text-xs font-bold">Start Quiz Now →</button>
                ) : (
                  <div className="p-5 rounded-xl bg-white border border-[#1B3B2B]/20 space-y-4">
                    <h5 className="font-bold text-sm text-[#1B3B2B]">Question 1 of 5: What is the primary Makhraj of letter 'Qaf' (ق)?</h5>
                    <div className="space-y-2 text-xs">
                      {["A. Deepest root of tongue against soft palate", "B. Tip of tongue against front upper teeth", "C. Both lips pressed together", "D. Throat cavity"].map((opt, idx) => (
                        <label key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F5EFE6] border border-[#1B3B2B]/10 cursor-pointer">
                          <input type="radio" name="q1" checked={quizAnswers[1] === idx} onChange={() => setQuizAnswers({ ...quizAnswers, 1: idx })} />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                    <button type="button" onClick={() => setQuizSubmitted(true)} className="rounded-xl bg-[#D4AF37] text-[#1B3B2B] px-5 py-2 text-xs font-bold">Submit Answers →</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: LIVE CLASSES */}
          {activeTab === "live-classes" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <div className="lg:col-span-8 space-y-6">
                  <div className="rounded-2xl overflow-hidden border border-[#1B3B2B]/20 shadow-lg">
                    <div className="bg-[#1B3B2B] text-white p-8 space-y-6">
                      <span className="inline-block px-3 py-1 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FED65B] text-[10px] font-bold uppercase tracking-widest">
                        LIVE NOW
                      </span>
                      <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">Advanced Fiqh Studies</h2>
                      <p className="text-xs sm:text-sm text-white/80">Shaykh Abdullah Al-Mahmoud</p>
                    </div>

                    <div className="bg-[#F5EFE6] p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#1B3B2B]">
                      <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-semibold">
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#1B3B2B]" /> 06:00 PM - 07:30 PM (IST)</span>
                        <span className="flex items-center gap-2"><User className="w-4 h-4 text-[#1B3B2B]" /> 142 Students Joined</span>
                      </div>
                      <p className="text-[#1B3B2B]/80 leading-relaxed text-xs sm:text-sm">
                        Today's session focuses on the principles of Islamic jurisprudence regarding contemporary financial transactions, exploring historical contexts and modern applications.
                      </p>
                      <a href="https://zoom.us" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-[#1B3B2B] font-bold text-xs uppercase tracking-wider shadow-sm">
                        <Video className="w-4 h-4" /> Join Live Class
                      </a>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-6 shadow-xs">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">ℹ Class Etiquette</h3>
                  <div className="space-y-4 text-xs">
                    <div className="space-y-1">
                      <div className="font-bold text-[#1B3B2B]">🎙 Microphone Muted</div>
                      <p className="text-muted-foreground">Please keep your microphone muted unless asked to speak.</p>
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold text-[#1B3B2B]">📹 Camera Optional</div>
                      <p className="text-muted-foreground">Camera on is encouraged for interaction, but not mandatory.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: RECORDED CLASSES */}
          {activeTab === "recorded-classes" && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Recorded Classes</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <div className="lg:col-span-8 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#1B3B2B]/15 bg-black group">
                    <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1000&auto=format&fit=crop&q=80" alt="Video Player" className="w-full h-[280px] sm:h-[380px] object-cover opacity-90" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button type="button" onClick={() => alert("Playing lecture video...")} className="w-16 h-16 rounded-full bg-[#D4AF37] text-[#1B3B2B] flex items-center justify-center shadow-2xl">
                        <Play className="w-8 h-8 fill-[#1B3B2B] ml-1" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-white border text-[#1B3B2B] font-bold text-[10px]">TAJWEED</span>
                        <h3 className="font-serif font-bold text-2xl text-[#1B3B2B] mt-2">Rules of Noon Sakinah</h3>
                      </div>
                      <button type="button" onClick={() => setIsCompleted(!isCompleted)} className="px-5 py-2.5 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold">
                        {isCompleted ? "Completed" : "Mark as Completed"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Chapters</h3>
                  <div className="space-y-2 text-xs">
                    {[{ time: "00:00", title: "Introduction & Review" }, { time: "24:15", title: "Izhar (Clear Pronunciation)" }, { time: "32:40", title: "Idgham (Assimilation)" }].map((c, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white border text-[#1B3B2B] font-semibold">{c.time} • {c.title}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: ATTENDANCE */}
          {activeTab === "attendance" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Attendance</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">CONDUCTED CLASSES</span>
                  <p className="font-serif font-bold text-4xl text-[#1B3B2B]">120</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">PRESENT</span>
                  <p className="font-serif font-bold text-4xl text-[#1B3B2B]">112</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-2">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">ABSENT</span>
                  <p className="font-serif font-bold text-4xl text-rose-700">5</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#1B3B2B] text-white space-y-2 border border-[#D4AF37]/30">
                  <span className="text-[10px] font-bold uppercase text-[#FED65B]">ATTENDANCE %</span>
                  <p className="font-serif font-bold text-4xl text-[#FED65B]">94%</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F5EFE6] border space-y-4">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">October 2023</h3>
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold">
                    {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                      <span key={d} className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${d === 6 ? "bg-rose-500 text-white" : d === 11 ? "bg-[#D4AF37] text-[#1B3B2B]" : "bg-[#36493F] text-white"}`}>{d}</span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 rounded-2xl bg-[#F5EFE6] border space-y-4">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Attendance Log</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead>
                        <tr className="border-b text-muted-foreground font-bold uppercase text-[10px]">
                          <th className="py-3">DATE</th>
                          <th className="py-3">SUBJECT</th>
                          <th className="py-3">TEACHER</th>
                          <th className="py-3 text-right">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[{ date: "Oct 16, 2023", subject: "Islamic History", teacher: "Sheikh Abdullah", status: "Present" }, { date: "Oct 13, 2023", subject: "Quranic Studies", teacher: "Ustadh Rahman", status: "Present" }].map((r, i) => (
                          <tr key={i}>
                            <td className="py-3 font-medium">{r.date}</td>
                            <td className="py-3 font-bold">{r.subject}</td>
                            <td className="py-3 text-muted-foreground">{r.teacher}</td>
                            <td className="py-3 text-right"><span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">{r.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: PROGRESS REPORT */}
          {activeTab === "report" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B3B2B]/10 pb-4">
                <div>
                  <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Academic Progress</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">Term 1: Fall 2023 - Overall Performance</p>
                </div>
                <button type="button" onClick={() => alert("Downloading Report Card...")} className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#1B3B2B] text-xs font-bold flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download Official Report Card (PDF)
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-8 p-6 rounded-2xl bg-[#F5EFE6] border space-y-4">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Grade Trends</h3>
                  <div className="h-44 w-full flex items-center justify-center font-serif text-lg font-bold text-[#1B3B2B]">
                    Average Grade: 91% (A+) Across Term Modules
                  </div>
                </div>
                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F5EFE6] border space-y-3">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Term Summary</h3>
                  <div className="p-3 bg-white rounded-xl border text-xs font-bold">OVERALL GPA: 3.8</div>
                  <div className="p-3 bg-white rounded-xl border text-xs font-bold">ATTENDANCE: 95%</div>
                  <div className="p-3 bg-white rounded-xl border text-xs font-bold">CLASS RANK: 4th</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: FEE STATUS (Indian Rupees ₹) */}
          {activeTab === "fee" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Financial Overview</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">Review your fee status, payment history, and upcoming dues in Indian Rupees (₹).</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">TOTAL FEE (ANNUAL)</span>
                  <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">₹6,000.00</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">PAID AMOUNT</span>
                  <p className="font-serif font-bold text-3xl text-[#1B3B2B]">₹4,500.00</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">DUE BALANCE</span>
                  <p className="font-serif font-bold text-3xl text-rose-700">₹1,500.00</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#1B3B2B] text-white space-y-4 border border-[#D4AF37]/30">
                  <span className="text-[10px] font-bold uppercase text-[#FED65B] block">NEXT DUE DATE</span>
                  <p className="font-serif font-bold text-2xl text-white">Nov 15, 2026</p>
                  <button type="button" onClick={() => setPaymentModalOpen(true)} className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-[#1B3B2B] text-xs font-bold">Pay Online →</button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Certificates</h2>
              <div className="p-6 rounded-2xl bg-[#F5EFE6] border space-y-4">
                <h4 className="font-serif font-bold text-xl text-[#1B3B2B]">Tajweed Rules & Recitation Completion Sanad</h4>
                <button type="button" onClick={() => alert("Downloading PDF...")} className="px-5 py-2 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold">Download PDF</button>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
