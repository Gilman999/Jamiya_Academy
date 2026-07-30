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
  Volume2,
  RotateCcw,
  CheckSquare
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

  // Live Class Timer State (02:45:10)
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

  // Profile Edit State
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

  // Online Quiz State
  const [activeQuizModal, setActiveQuizModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Certificates Filter State
  const [certFilter, setCertFilter] = useState<"All" | "Completed">("Completed");

  // Live Class Reminders State
  const [remindersSet, setRemindersSet] = useState<Record<string, boolean>>({ "rem-1": true });

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
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C201D] flex overflow-hidden font-sans">
      
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
              {activeTab === "overview" || activeTab === "fee" || activeTab === "report" || activeTab === "profile" || activeTab === "live-classes" ? (
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
                placeholder={activeTab === "library" ? "Search digital library..." : "Search courses, library..."}
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
          
          {/* TAB 1: OVERVIEW / DASHBOARD HOME (Screenshot 2 Exact replica) */}
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

                {/* Right Timer Box */}
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

              {/* 4 Summary Metric Cards (matching Screenshot 2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Card 1: Overall Attendance */}
                <div 
                  onClick={() => setActiveTab("attendance")}
                  className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs hover:border-[#D4AF37] transition-all cursor-pointer relative overflow-hidden"
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
                    <span className="text-[11px] font-semibold text-muted-foreground block">
                      Overall Attendance
                    </span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">94%</p>
                  </div>
                  <div className="w-full bg-[#1B3B2B] h-1 rounded-full absolute bottom-0 left-0" />
                </div>

                {/* Card 2: Enrolled Courses */}
                <div 
                  onClick={() => setActiveTab("courses")}
                  className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs hover:border-[#D4AF37] transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#1B3B2B]/5 flex items-center justify-center text-[#1B3B2B]">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">
                      Enrolled Courses
                    </span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">4</p>
                  </div>
                  <div className="w-full bg-[#1B3B2B] h-1 rounded-full absolute bottom-0 left-0" />
                </div>

                {/* Card 3: Pending Assignments */}
                <div 
                  onClick={() => setActiveTab("assignments")}
                  className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs hover:border-[#D4AF37] transition-all cursor-pointer relative overflow-hidden"
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
                    <span className="text-[11px] font-semibold text-muted-foreground block">
                      Pending Assignments
                    </span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">2</p>
                  </div>
                  <div className="w-full bg-[#D4AF37] h-1 rounded-full absolute bottom-0 left-0" />
                </div>

                {/* Card 4: Fee Status */}
                <div 
                  onClick={() => setActiveTab("fee")}
                  className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-4 shadow-xs hover:border-[#D4AF37] transition-all cursor-pointer relative overflow-hidden"
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
                    <span className="text-[11px] font-semibold text-muted-foreground block">
                      Fee Status
                    </span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">Paid</p>
                  </div>
                  <div className="w-full bg-[#1B3B2B] h-1 rounded-full absolute bottom-0 left-0" />
                </div>

              </div>

              {/* Bottom Split Layout: Active Courses (Left) + Notice Board (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Active Courses List (8 Cols matching Screenshot 2) */}
                <div className="lg:col-span-8 p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Active Courses</h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab("courses")}
                      className="text-xs font-semibold text-[#1B3B2B] hover:underline flex items-center gap-1"
                    >
                      View All →
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Course 1 */}
                    <div className="p-5 rounded-2xl bg-white border border-[#1B3B2B]/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-lg text-[#1B3B2B]">Tajweed & Qirat - Level 2</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">👤 Ustadha Ayesha</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab("courses")}
                          className="px-5 py-2 rounded-xl bg-[#1B3B2B] text-white text-xs font-semibold hover:bg-[#2B543D] cursor-pointer"
                        >
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

                    {/* Course 2 */}
                    <div className="p-5 rounded-2xl bg-white border border-[#1B3B2B]/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-serif font-bold text-lg text-[#1B3B2B]">Arabic Grammar (Nahw)</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">👤 Ustadha Fatima</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab("courses")}
                          className="px-5 py-2 rounded-xl bg-[#1B3B2B] text-white text-xs font-semibold hover:bg-[#2B543D] cursor-pointer"
                        >
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

                {/* Right Notice Board (4 Cols matching Screenshot 2) */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-5 shadow-xs relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📣</span>
                    <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Notice Board</h3>
                  </div>

                  <div className="space-y-4 divide-y divide-[#1B3B2B]/10 text-xs">
                    <div className="pt-2 space-y-1">
                      <span className="text-[10px] font-bold text-[#D4AF37] block">Today, 09:00 AM</span>
                      <p className="font-bold text-[#1B3B2B]">Exam Schedule Released</p>
                      <p className="text-[#1B3B2B]/70 leading-relaxed">
                        The mid-term examination schedule for all levels has been posted.
                      </p>
                    </div>

                    <div className="pt-3 space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground block">Yesterday</span>
                      <p className="font-bold text-[#1B3B2B]">Library Maintenance</p>
                      <p className="text-[#1B3B2B]/70 leading-relaxed">
                        The digital library will be down for maintenance from 2 AM to 4 AM.
                      </p>
                    </div>

                    <div className="pt-3 space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground block">Oct 12, 2023</span>
                      <p className="font-bold text-[#1B3B2B]">New Guest Lecture</p>
                      <p className="text-[#1B3B2B]/70 leading-relaxed">
                        Special session on Seerah scheduled for this Friday.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: MY PROFILE (Screenshots 3 & 4 Exact replica) */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left Column (4 Cols): Student Summary Card & Account Settings */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Profile Card */}
                  <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 text-center space-y-4 shadow-xs">
                    <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden mx-auto">
                      <img
                        src={activeStudent.avatarUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"}
                        alt={profileData.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-2xl text-[#1B3B2B]">{profileData.fullName}</h3>
                      <span className="inline-block px-3 py-1 rounded-full bg-white border border-[#1B3B2B]/15 text-[#1B3B2B] text-[11px] font-semibold">
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

                {/* Right Column (8 Cols): Personal Information & Guardian Details */}
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

          {/* TAB 3: LIVE CLASSES (Screenshot 5 Exact replica) */}
          {activeTab === "live-classes" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Hero Card (8 Cols matching Screenshot 5) */}
                <div className="lg:col-span-8 space-y-6">
                  
                  {/* Main Live Banner */}
                  <div className="rounded-2xl overflow-hidden border border-[#1B3B2B]/20 shadow-lg">
                    {/* Top Dark Green Banner */}
                    <div className="bg-[#1B3B2B] text-white p-8 space-y-6">
                      <span className="inline-block px-3 py-1 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FED65B] text-[10px] font-bold uppercase tracking-widest">
                        LIVE NOW
                      </span>

                      <div className="space-y-2">
                        <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white">
                          Advanced Fiqh Studies
                        </h2>
                        <p className="text-xs sm:text-sm text-white/80">
                          Shaykh Abdullah Al-Mahmoud
                        </p>
                      </div>
                    </div>

                    {/* Bottom Cream Container */}
                    <div className="bg-[#F5EFE6] p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-[#1B3B2B]">
                      <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-semibold">
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#1B3B2B]" /> 06:00 PM - 07:30 PM (IST)
                        </span>
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#1B3B2B]" /> 142 Students Joined
                        </span>
                      </div>

                      <p className="text-[#1B3B2B]/80 leading-relaxed text-xs sm:text-sm">
                        Today's session focuses on the principles of Islamic jurisprudence regarding contemporary financial transactions, exploring historical contexts and modern applications.
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                        {/* Student Avatars Stack */}
                        <div className="flex items-center -space-x-2">
                          <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80" alt="Student" />
                          <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="Student" />
                          <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" alt="Student" />
                          <span className="w-8 h-8 rounded-full bg-[#1B3B2B] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                            +30
                          </span>
                        </div>

                        <a
                          href="https://zoom.us"
                          target="_blank"
                          rel="noreferrer"
                          className="px-6 py-3 rounded-xl bg-[#D4AF37] text-[#1B3B2B] font-bold text-xs uppercase tracking-wider hover:bg-[#e9c349] transition-colors flex items-center gap-2 shadow-sm"
                        >
                          <Video className="w-4 h-4" /> Join Live Class
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Schedule */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1B3B2B]/10 pb-3">
                      <div>
                        <h3 className="font-serif font-bold text-2xl text-[#1B3B2B]">Upcoming Schedule</h3>
                        <p className="text-xs text-muted-foreground">Your planned live sessions for the week.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => alert("Opening full live calendar schedule...")}
                        className="px-4 py-2 rounded-xl bg-white border border-[#1B3B2B] text-[#1B3B2B] text-xs font-semibold hover:bg-gray-50"
                      >
                        View Full Calendar
                      </button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { id: "rem-1", day: "Tomorrow", time: "10:00 AM", title: "Tafseer ul Quran: Surah Al-Kahf", instructor: "Ustadh Tariq Jameel • Part 3", icon: "📖" },
                        { id: "rem-2", day: "Wed, Oct 25", time: "02:30 PM", title: "Islamic History: The Umayyad Caliphate", instructor: "Dr. Yasir Qadhi • Module 4", icon: "📜" },
                        { id: "rem-3", day: "Thu, Oct 26", time: "05:00 PM", title: "Arabic Linguistics (Intermediate)", instructor: "Shaykha Fatima Ali • Session 12", icon: "🔤" },
                      ].map((item) => {
                        const isSet = remindersSet[item.id];
                        return (
                          <div key={item.id} className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="text-center bg-white p-2.5 rounded-xl border border-[#1B3B2B]/10 shrink-0 w-24">
                                <span className="text-[10px] font-bold text-muted-foreground block uppercase">{item.day}</span>
                                <span className="text-xs font-bold text-[#1B3B2B]">{item.time}</span>
                              </div>
                              <div className="space-y-1">
                                <h4 className="font-serif font-bold text-base text-[#1B3B2B]">{item.title}</h4>
                                <p className="text-xs text-muted-foreground">{item.instructor}</p>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setRemindersSet((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                                isSet
                                  ? "bg-white text-[#1B3B2B] border-[#1B3B2B]/20"
                                  : "bg-[#1B3B2B] text-white border-transparent"
                              }`}
                            >
                              {isSet ? "Reminder Set" : "Set Reminder"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* Right Class Etiquette Sidebar (4 Cols matching Screenshot 5) */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-6 shadow-xs">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B] flex items-center gap-2">
                    ℹ Class Etiquette
                  </h3>

                  <div className="space-y-4 divide-y divide-[#1B3B2B]/10 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 font-bold text-[#1B3B2B]">
                        <MicOff className="w-4 h-4 text-[#1B3B2B]" /> Microphone Muted
                      </div>
                      <p className="text-[#1B3B2B]/70 leading-relaxed pl-6">
                        Please keep your microphone muted unless asked to speak by the instructor to avoid background noise.
                      </p>
                    </div>

                    <div className="pt-4 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-[#1B3B2B]">
                        <Camera className="w-4 h-4 text-[#1B3B2B]" /> Camera Optional
                      </div>
                      <p className="text-[#1B3B2B]/70 leading-relaxed pl-6">
                        Having your camera on is encouraged for interaction, but not mandatory. Ensure a modest background.
                      </p>
                    </div>

                    <div className="pt-4 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-[#1B3B2B]">
                        <Hand className="w-4 h-4 text-[#1B3B2B]" /> Raise Hand
                      </div>
                      <p className="text-[#1B3B2B]/70 leading-relaxed pl-6">
                        Use the 'Raise Hand' feature in the platform if you have a question during the lecture.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 4: CERTIFICATES (Screenshot 1 Exact replica) */}
          {activeTab === "certificates" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Main Heading */}
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Certificates</h2>
              </div>

              {/* Top Summary Cards Grid (2 Cards matching Screenshot 1) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
                
                {/* Card 1: Total Earned */}
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-[#1B3B2B]/5 flex items-center justify-center text-[#1B3B2B]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      TOTAL EARNED
                    </span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B]">2</p>
                  </div>
                </div>

                {/* Card 2: In Progress */}
                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 flex items-center gap-4 shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#92400E]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      IN PROGRESS
                    </span>
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B]">1</p>
                  </div>
                </div>

              </div>

              {/* Earned Certificates Section */}
              <div className="space-y-5 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-[#1B3B2B]">Earned Certificates</h3>
                    <p className="text-xs text-muted-foreground">Your official records of achievement.</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCertFilter("All")}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        certFilter === "All"
                          ? "bg-[#1B3B2B] text-white"
                          : "bg-white border border-gray-200 text-[#1B3B2B]"
                      }`}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      onClick={() => setCertFilter("Completed")}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        certFilter === "Completed"
                          ? "bg-[#1B3B2B] text-white"
                          : "bg-white border border-gray-200 text-[#1B3B2B]"
                      }`}
                    >
                      Completed
                    </button>
                  </div>
                </div>

                {/* 2-Column Certificates Cards Grid (matching Screenshot 1) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Certificate Card 1 */}
                  <div className="p-6 rounded-2xl bg-[#F5EFE6] border-2 border-[#D4AF37]/50 flex flex-col sm:flex-row gap-6 shadow-xs hover:shadow-md transition-all">
                    {/* Left Thumbnail Preview */}
                    <div className="w-full sm:w-36 h-48 rounded-xl bg-white border border-[#1B3B2B]/20 overflow-hidden shadow-inner flex items-center justify-center p-2 shrink-0 relative bg-[radial-gradient(#1B3B2B_1px,transparent_1px)] [background-size:8px_8px]">
                      <div className="w-full h-full border border-[#D4AF37] p-2 text-center flex flex-col items-center justify-center space-y-1">
                        <span className="font-serif text-[10px] font-bold text-[#1B3B2B]">شهادة تقدير وإجازة</span>
                        <div className="w-8 h-8 rounded-full border border-[#D4AF37] mx-auto flex items-center justify-center text-[10px] font-serif text-[#D4AF37]">
                          إجازة
                        </div>
                        <span className="text-[7px] text-gray-500 block">Jamiya Sanad Document</span>
                      </div>
                    </div>

                    {/* Right Details */}
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold uppercase tracking-wider">
                          <CheckCircle2 className="w-3 h-3" /> COURSE COMPLETION
                        </span>
                        <h4 className="font-serif font-bold text-xl text-[#1B3B2B] leading-tight">
                          Tajweed Rules & Recitation
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          Awarded for demonstrating proficiency in the makharij, sifat, and Qirat rules of Quranic recitation.
                        </p>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-[#1B3B2B]/10">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-muted-foreground block">Issue Date</span>
                            <span className="font-bold text-[#1B3B2B]">15 Shaban 1445</span>
                            <span className="text-[10px] text-muted-foreground block">Feb 25, 2024</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-muted-foreground block">Credential ID</span>
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-gray-200">
                              JKSF-TJ-8842
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => alert("Downloading official PDF Sanad Certificate...")}
                            className="flex-1 py-2 px-3 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold hover:bg-[#2B543D] flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-[#FED65B]" /> Download PDF
                          </button>
                          <button
                            type="button"
                            onClick={() => window.print()}
                            className="py-2 px-3 rounded-xl bg-white border border-[#1B3B2B] text-[#1B3B2B] text-xs font-semibold hover:bg-gray-50 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" /> Print
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Card 2 */}
                  <div className="p-6 rounded-2xl bg-[#F5EFE6] border-2 border-[#D4AF37]/50 flex flex-col sm:flex-row gap-6 shadow-xs hover:shadow-md transition-all">
                    {/* Left Thumbnail Preview */}
                    <div className="w-full sm:w-36 h-48 rounded-xl bg-white border border-[#1B3B2B]/20 overflow-hidden shadow-inner flex items-center justify-center p-2 shrink-0 relative bg-[radial-gradient(#1B3B2B_1px,transparent_1px)] [background-size:8px_8px]">
                      <div className="w-full h-full border border-[#D4AF37] p-2 text-center flex flex-col items-center justify-center space-y-1">
                        <span className="font-serif text-[10px] font-bold text-[#1B3B2B]">شهادة تفوق وإجازة</span>
                        <div className="w-8 h-8 rounded-full border border-[#D4AF37] mx-auto flex items-center justify-center text-[10px] font-serif text-[#D4AF37]">
                          تفوق
                        </div>
                        <span className="text-[7px] text-gray-500 block">Jamiya Merit Sanad</span>
                      </div>
                    </div>

                    {/* Right Details */}
                    <div className="space-y-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E5E7EB] text-[#374151] text-[10px] font-bold uppercase tracking-wider">
                          <Star className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" /> ACADEMIC EXCELLENCE
                        </span>
                        <h4 className="font-serif font-bold text-xl text-[#1B3B2B] leading-tight">
                          Annual Merit Award
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          Recognizing outstanding academic performance and commitment to Sanad studies.
                        </p>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-[#1B3B2B]/10">
                        <div className="flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-muted-foreground block">Issue Date</span>
                            <span className="font-bold text-[#1B3B2B]">30 Dhul-Hijjah 1444</span>
                            <span className="text-[10px] text-muted-foreground block">Jul 18, 2023</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-muted-foreground block">Credential ID</span>
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-gray-200">
                              JKSF-AM-1029
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => alert("Downloading Annual Merit Award PDF...")}
                            className="flex-1 py-2 px-3 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold hover:bg-[#2B543D] flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5 text-[#FED65B]" /> Download PDF
                          </button>
                          <button
                            type="button"
                            onClick={() => window.print()}
                            className="py-2 px-3 rounded-xl bg-white border border-[#1B3B2B] text-[#1B3B2B] text-xs font-semibold hover:bg-gray-50 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" /> Print
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          )}

          {/* TAB 5: DIGITAL LIBRARY */}
          {activeTab === "library" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Digital Library</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Access our curated collection of reference books, study materials, and daily spiritual readings.
                </p>
              </div>

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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Principles of Islamic Jurisprudence", subtitle: "Advanced Fiqh Studies", category: "REFERENCE", categoryBadgeClass: "bg-[#EFE9DD] text-[#4A4237]", iconBg: "bg-rose-100 text-rose-600", iconType: "pdf", size: "4.2 MB", date: "Oct 12, 2023", desc: "Comprehensive manual on Usul al-Fiqh, legal deduction, and sharia ruling methodologies." },
                  { title: "Morning & Evening Supplications", subtitle: "Essential Adhkar from the Sunnah", category: "DAILY DUAS", categoryBadgeClass: "bg-[#FEF3C7] text-[#92400E]", iconBg: "bg-amber-100 text-amber-800", iconType: "book", size: "1.8 MB", date: "Nov 05, 2023", desc: "Authentic daily morning and evening adhkar, protection prayers, and prophetic supplications." },
                  { title: "History of the Prophets", subtitle: "Detailed biographical accounts", category: "REFERENCE", categoryBadgeClass: "bg-[#EFE9DD] text-[#4A4237]", iconBg: "bg-rose-100 text-rose-600", iconType: "pdf", size: "8.5 MB", date: "Dec 20, 2023", desc: "Chronological accounts of the Prophets of Allah from Adam (AS) to Prophet Muhammad ﷺ." },
                ].map((item, idx) => (
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
            </div>
          )}

          {/* TAB 6: ASSIGNMENTS */}
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
                      className={`pb-2 capitalize cursor-pointer ${assignmentSubTab === tab ? "text-[#1B3B2B] font-bold border-b-2 border-[#1B3B2B]" : "text-muted-foreground"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  {[
                    { id: "fiqh-101", title: "Fiqh al-Ibadat: Purification", course: "Islamic Jurisprudence 101", due: "Oct 25", marks: "50 Marks", status: "PENDING", badgeClass: "bg-rose-100 text-rose-700" },
                    { id: "tafsir-201", title: "Tafsir Surah Al-Fatiha", course: "Quranic Exegesis", due: "Oct 28", marks: "100 Marks", status: "PENDING", badgeClass: "bg-rose-100 text-rose-700" },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedAssignmentId(item.id)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${selectedAssignmentId === item.id ? "bg-[#F5EFE6] border-[#1B3B2B]" : "bg-[#F5EFE6]/60 border-[#1B3B2B]/10"}`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${item.badgeClass}`}>{item.status}</span>
                        <span className="text-muted-foreground">Due: {item.due}</span>
                      </div>
                      <h3 className="font-serif font-bold text-lg text-[#1B3B2B]">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.course}</p>
                      <div className="flex items-center gap-1.5 text-xs text-[#1B3B2B] font-semibold">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" /> {item.marks}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-7">
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/10 space-y-6">
                    <h2 className="font-serif font-bold text-2xl text-[#1B3B2B]">Fiqh al-Ibadat: Purification</h2>
                    <p className="text-xs sm:text-sm text-[#1B3B2B]/80 leading-relaxed">
                      Please write a comprehensive essay (1500 words) detailing the conditions and pillars of Wudu (ablution) according to the Hanafi school of thought. Include evidences from the Quran and Sunnah.
                    </p>
                    <div className="p-6 rounded-2xl bg-white border border-[#1B3B2B]/10 space-y-4">
                      <h3 className="font-serif font-bold text-lg text-[#1B3B2B] flex items-center gap-2">
                        <UploadCloud className="w-5 h-5 text-[#1B3B2B]" /> Submit Assignment
                      </h3>
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-[#FDFBF7]">
                        <UploadCloud className="w-6 h-6 mx-auto text-[#1B3B2B]" />
                        <p className="text-xs font-semibold text-[#1B3B2B] mt-2">
                          {assignmentFile ? assignmentFile.name : "Drag and drop your file here, or click to browse"}
                        </p>
                        <input type="file" onChange={(e) => e.target.files?.[0] && setAssignmentFile(e.target.files[0])} className="hidden" id="asgn-file" />
                        <label htmlFor="asgn-file" className="inline-block mt-3 px-4 py-1.5 rounded-lg bg-[#F5EFE6] text-xs font-bold border cursor-pointer">Choose File</label>
                      </div>
                      <div className="flex justify-end gap-3">
                        <button type="button" onClick={() => alert("Submitted!")} className="px-6 py-2.5 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold cursor-pointer">Submit Assignment</button>
                      </div>
                    </div>
                  </div>
                </div>
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

              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4">
                <h4 className="font-serif text-xl font-bold text-[#1B3B2B]">Tajweed Makharij & Sifat Online Quiz</h4>
                <p className="text-xs text-muted-foreground">20 Multiple choice questions • 30 Minutes Duration • Passing Marks: 70%</p>
                <button type="button" onClick={() => setActiveQuizModal(true)} className="rounded-xl bg-[#1B3B2B] text-white px-6 py-2.5 text-xs font-bold">Start Quiz →</button>
              </div>
            </div>
          )}

          {/* TAB 8: ATTENDANCE */}
          {activeTab === "attendance" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Attendance</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                  <p className="font-serif font-bold text-4xl text-[#B91C1C]">5</p>
                </div>
                <div className="p-6 rounded-2xl bg-[#1B3B2B] text-white space-y-2 border border-[#D4AF37]/30">
                  <span className="text-[10px] font-bold uppercase text-[#FED65B]">ATTENDANCE %</span>
                  <p className="font-serif font-bold text-4xl text-[#FED65B]">94%</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: PROGRESS REPORT */}
          {activeTab === "report" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B3B2B]/10 pb-4">
                <div>
                  <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Academic Progress</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">Term 1: Fall 2023 - Overall Performance</p>
                </div>
                <button type="button" onClick={() => alert("Downloading PDF...")} className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#1B3B2B] text-xs font-bold flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download Official Report Card (PDF)
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 p-6 rounded-2xl bg-[#F5EFE6] border space-y-4">
                  <h3 className="font-serif font-bold text-xl text-[#1B3B2B]">Grade Trends</h3>
                  <div className="h-44 w-full flex items-center justify-center font-serif text-lg font-bold text-[#1B3B2B]">
                    Average Grade: 91% (A+) Across All Term Modules
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

          {/* TAB 10: FEE STATUS (Corrected Rupees ₹ Fee Info matching User prompt) */}
          {activeTab === "fee" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Main Heading & Subtitle */}
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-3xl text-[#1B3B2B]">Financial Overview</h2>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Review your fee status, payment history, and upcoming dues in Indian Rupees (₹).
                </p>
              </div>

              {/* Top Summary Metric Cards (4 Cards matching Screenshot 4 in Indian Rupees ₹) */}
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
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B] mt-1">₹6,000.00</p>
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
                    <p className="font-serif font-bold text-3xl text-[#1B3B2B]">₹4,500.00</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#1B3B2B] h-full rounded-full w-[75%]" />
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
                    <p className="font-serif font-bold text-3xl text-rose-700 mt-1">₹1,500.00</p>
                  </div>
                </div>

                {/* Card 4: Next Due Date (Dark Green Card with Gold Pay Button) */}
                <div className="p-6 rounded-2xl bg-[#1B3B2B] text-white space-y-4 shadow-md border border-[#D4AF37]/30 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FED65B] block">
                      NEXT DUE DATE
                    </span>
                    <p className="font-serif font-bold text-2xl text-white mt-1">Nov 15, 2026</p>
                    <p className="text-xs text-white/70 mt-0.5 font-sans">Installment: ₹500.00</p>
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

              {/* Payment History Table in Rupees ₹ (matching Screenshot 4) */}
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
                        { receipt: "RCP-2026-089", date: "Sep 01, 2026", amount: "₹1,500.00", isFailed: false, mode: "Online UPI / GPay", status: "Successful", badge: "bg-emerald-100 text-emerald-800" },
                        { receipt: "RCP-2026-042", date: "Jul 15, 2026", amount: "₹1,000.00", isFailed: false, mode: "Bank Transfer", status: "Successful", badge: "bg-emerald-100 text-emerald-800" },
                        { receipt: "RCP-2026-090", date: "Sep 01, 2026", amount: "₹500.00", isFailed: true, mode: "Online NetBanking", status: "Failed", badge: "bg-rose-100 text-rose-700" },
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
                        <span className="font-bold text-lg text-[#1B3B2B]">₹500.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Due Date:</span>
                        <span className="font-semibold text-rose-700">Nov 15, 2026</span>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <label className="block font-semibold text-[#1B3B2B]">Select Payment Method</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            alert("Opening UPI / GPay / PhonePe Gateway...");
                            setPaymentModalOpen(false);
                          }}
                          className="p-3 rounded-xl bg-white border border-[#1B3B2B]/20 hover:border-[#1B3B2B] text-center font-bold text-[#1B3B2B]"
                        >
                          📲 UPI / GPay
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            alert("Redirecting to Indian Bank NetBanking Portal...");
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

          {/* TAB 11: MY COURSES */}
          {activeTab === "courses" && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B3B2B]/10 pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">My Registered Courses</h3>
                  <p className="text-xs text-muted-foreground">Access syllabus, lecture notes, and assignments for your enrolled programs.</p>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#1B3B2B] text-white text-xs font-bold uppercase tracking-wider">
                  4 Enrolled Courses
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Alimiyya Degree Course (Year 2)", badge: "ALIMIA • SANAD", progress: 82, modules: "24 Modules Completed", instructor: "Muftia Fatima Ali Hashmi" },
                  { title: "Tajweed & Qirat - Level 2", badge: "TAJWEED • SPECIALIZATION", progress: 65, modules: "18 Modules Completed", instructor: "Ustadha Ayesha" },
                  { title: "Arabic Grammar (Nahw)", badge: "ARABIC GRAMMAR", progress: 40, modules: "12 Modules Completed", instructor: "Ustadha Fatima" },
                  { title: "Hadith & Sunnah Studies", badge: "HADITH STUDIES", progress: 55, modules: "15 Modules Completed", instructor: "Alima Zoya Khan" },
                ].map((c, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4 flex flex-col justify-between hover:shadow-md transition-all">
                    <div className="space-y-3">
                      <span className="inline-block px-3 py-1 rounded-full bg-[#1B3B2B] text-white text-[10px] font-bold uppercase tracking-widest">
                        {c.badge}
                      </span>
                      <h4 className="font-serif text-xl font-bold text-[#1B3B2B]">{c.title}</h4>
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
                    <button type="button" className="w-full rounded-xl bg-[#1B3B2B] text-white py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#2B543D]">
                      Open Course Modules →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: RECORDED CLASSES */}
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

        </main>
      </div>

    </div>
  );
}
