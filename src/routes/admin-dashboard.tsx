import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard,
  UserCheck,
  Users,
  BookOpen,
  Library,
  Video,
  Bell,
  Award,
  Receipt,
  Settings,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Upload,
  Search,
  LogOut,
  Sparkles,
  ShieldCheck,
  FileText,
  FileCheck,
  Radio,
  Send,
  Download,
  Check
} from "lucide-react";
import {
  getAcademyCourses,
  saveAcademyCourse,
  getAdmissionApplications,
  updateAdmissionStatus,
  getStudentList,
  getAcademyNotices,
  postAcademyNotice,
  CourseItem,
  AdmissionApplication,
  StudentItem,
  NoticeItem
} from "@/lib/academy-data";

export const Route = createFileRoute("/admin-dashboard")({
  head: () => ({
    meta: [
      { title: "Academy Administration Dashboard — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      { name: "description", content: "Management panel for academy courses, admissions, students, library, notices, and certificates." },
    ],
  }),
  component: AdminDashboardPage,
});

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "admissions"
    | "students"
    | "courses"
    | "library"
    | "media"
    | "notices"
    | "results"
    | "certificates"
    | "fees"
  >("overview");

  // Reactive Stores State
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>([]);
  const [students, setStudents] = useState<StudentItem[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Forms State
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "ALIMIA" as const,
    duration: "1 Year",
    fee: "Free",
    instructor: "Muftia Fatima Ali Hashmi",
    description: "",
  });

  const [newNotice, setNewNotice] = useState({
    title: "",
    badge: "ANNOUNCEMENT" as const,
    content: "",
    isUrgent: false,
  });

  const [newBook, setNewBook] = useState({
    title: "",
    category: "HADITH",
    author: "",
    pages: "200 Pages",
    fileUrl: "",
  });

  const [newResult, setNewResult] = useState({
    rollNo: "",
    studentName: "",
    course: "Alima Course — Year 2",
    marks: "95/100",
    grade: "A+",
  });

  const [newCert, setNewCert] = useState({
    studentName: "",
    rollNo: "",
    course: "Tajweed-ul-Quran",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setCourses(getAcademyCourses());
    setAdmissions(getAdmissionApplications());
    setStudents(getStudentList());
    setNotices(getAcademyNotices());
  };

  const handleApproveAdmission = (id: string) => {
    updateAdmissionStatus(id, "APPROVED");
    loadData();
    setActionSuccess("Admission Approved! Roll Number generated & student added to active directory.");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleRejectAdmission = (id: string) => {
    updateAdmissionStatus(id, "REJECTED");
    loadData();
    setActionSuccess("Admission application rejected.");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    saveAcademyCourse({
      id: `crs-${Date.now()}`,
      ...newCourse,
      enrolledStudents: 0,
      status: "ACTIVE",
    });
    setNewCourse({ title: "", category: "ALIMIA", duration: "1 Year", fee: "Free", instructor: "", description: "" });
    loadData();
    setActionSuccess("New Course created successfully!");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    postAcademyNotice(newNotice);
    setNewNotice({ title: "", badge: "ANNOUNCEMENT", content: "", isUrgent: false });
    loadData();
    setActionSuccess("Academy Notice published to Student Dashboard & Website!");
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("jamiya_admin_session");
    window.location.href = "/";
  };

  const pendingAdmissions = admissions.filter((a) => a.status === "PENDING");

  const adminNav = [
    { id: "overview", label: "Admin Overview", icon: LayoutDashboard },
    { id: "admissions", label: "Approve Admissions", icon: UserCheck, badge: pendingAdmissions.length ? `${pendingAdmissions.length} Pending` : undefined },
    { id: "students", label: "Student Directory", icon: Users },
    { id: "courses", label: "Course Management", icon: BookOpen },
    { id: "library", label: "Upload Kitabs & PDFs", icon: Library },
    { id: "media", label: "Upload Videos & Audio", icon: Video },
    { id: "notices", label: "Post Notices", icon: Bell },
    { id: "results", label: "Upload Grade Sheets", icon: FileCheck },
    { id: "certificates", label: "Issue Sanad Certificates", icon: Award },
    { id: "fees", label: "Fee Management", icon: Receipt },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C201D] flex overflow-hidden font-sans">
      
      {/* ADMIN SIDEBAR */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-[280px] bg-[#12271c] text-white shadow-2xl z-30 border-r border-[#D4AF37]/40">
        <div className="p-6 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-[#1B3B2B] flex items-center justify-center font-serif font-bold text-xl shadow-md shrink-0">
            A
          </div>
          <div className="overflow-hidden">
            <h1 className="font-serif font-bold text-base text-[#FED65B] leading-tight truncate">
              Admin Directress
            </h1>
            <p className="text-[10px] text-white/70 uppercase tracking-widest leading-none mt-0.5">
              Jamiya Control Panel
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {adminNav.map((item) => {
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
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white uppercase tracking-wider">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 mt-auto">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-bold text-red-300 hover:bg-red-500/20 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>

      {/* MAIN ADMIN AREA */}
      <div className="flex-1 lg:pl-[280px] flex flex-col min-h-screen">
        
        {/* HEADER */}
        <header className="sticky top-0 z-20 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#1B3B2B]/10 px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">
              ACADEMY MANAGEMENT CONSOLE
            </span>
            <h2 className="font-serif font-bold text-xl text-[#1B3B2B]">
              Directress Control Panel
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="px-4 py-2 rounded-full border border-[#1B3B2B] text-[#1B3B2B] text-xs font-bold uppercase tracking-wider hover:bg-[#1B3B2B] hover:text-white transition-all"
            >
              View Student Portal →
            </a>
          </div>
        </header>

        {/* NOTIFICATION FEEDBACK ALERT */}
        {actionSuccess && (
          <div className="mx-6 mt-4 p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* MAIN BODY TAB CONTENTS */}
        <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-[#1B3B2B] text-white space-y-2 shadow-lg">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FED65B]">Total Students</span>
                  <p className="font-serif text-4xl font-bold">{students.length}</p>
                  <p className="text-xs text-white/70">Enrolled across 5 courses</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-800">Pending Admissions</span>
                  <p className="font-serif text-4xl font-bold text-[#1B3B2B]">{pendingAdmissions.length}</p>
                  <p className="text-xs text-amber-800 font-semibold">Requires Approval Review</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Courses</span>
                  <p className="font-serif text-4xl font-bold text-[#1B3B2B]">{courses.length}</p>
                  <p className="text-xs text-muted-foreground">Alima, Tajweed, Urdu, Fiqh</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">Active Notices</span>
                  <p className="font-serif text-4xl font-bold text-emerald-800">{notices.length}</p>
                  <p className="text-xs text-emerald-800 font-semibold">Published to Website</p>
                </div>
              </div>

              {/* Pending Admissions Preview Card */}
              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-xl font-bold text-[#1B3B2B]">Pending Online Admissions</h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab("admissions")}
                    className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider hover:underline"
                  >
                    View All Queue →
                  </button>
                </div>

                {pendingAdmissions.length === 0 ? (
                  <p className="text-xs text-muted-foreground">No pending admission applications right now.</p>
                ) : (
                  <div className="space-y-3">
                    {pendingAdmissions.slice(0, 3).map((app) => (
                      <div key={app.id} className="p-4 rounded-xl bg-white border border-[#1B3B2B]/10 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h4 className="font-serif font-bold text-base text-[#1B3B2B]">{app.studentName}</h4>
                          <p className="text-xs text-muted-foreground">Guardian: {app.guardianName} • Course: {app.course}</p>
                          <p className="text-[11px] text-muted-foreground font-mono">Applied: {app.appliedDate} • Mode: {app.learningMode}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleApproveAdmission(app.id)}
                            className="px-4 py-2 rounded-lg bg-[#1B3B2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#244b37] cursor-pointer"
                          >
                            Approve Admission ✓
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectAdmission(app.id)}
                            className="px-3 py-2 rounded-lg bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider hover:bg-red-200 cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: APPROVE ADMISSIONS */}
          {activeTab === "admissions" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Online Admission Application Queue</h3>
                <p className="text-xs text-muted-foreground">Review online registration submissions, assign Roll Numbers, and grant student portal access.</p>
              </div>

              <div className="space-y-4">
                {admissions.map((app) => (
                  <div key={app.id} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider ${
                        app.status === "APPROVED" ? "bg-emerald-100 text-emerald-800" : app.status === "REJECTED" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        STATUS: {app.status}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">App ID: {app.id} • Submitted: {app.appliedDate}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground block">Student Details</span>
                        <p className="font-bold text-[#1B3B2B] text-sm">{app.studentName}</p>
                        <p className="text-muted-foreground">Age: {app.age} • Guardian: {app.guardianName}</p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground block">Contact Info</span>
                        <p className="font-mono text-[#1B3B2B]">{app.whatsapp}</p>
                        <p className="text-muted-foreground">{app.email}</p>
                        <p className="text-muted-foreground">{app.city}, {app.country}</p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold uppercase text-muted-foreground block">Applied Course</span>
                        <p className="font-bold text-[#1B3B2B]">{app.course}</p>
                        <p className="text-muted-foreground uppercase font-bold text-[10px]">Mode: {app.learningMode}</p>
                      </div>
                    </div>

                    {app.status === "PENDING" && (
                      <div className="pt-2 flex gap-3 border-t border-[#1B3B2B]/10">
                        <button
                          type="button"
                          onClick={() => handleApproveAdmission(app.id)}
                          className="px-6 py-2.5 rounded-xl bg-[#1B3B2B] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#244b37] cursor-pointer"
                        >
                          Approve Admission & Issue Roll No ✓
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRejectAdmission(app.id)}
                          className="px-5 py-2.5 rounded-xl bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider hover:bg-red-200 cursor-pointer"
                        >
                          Reject Application
                        </button>
                      </div>
                    )}

                    {app.rollNoAssigned && (
                      <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold">
                        ✓ Assigned Roll Number: {app.rollNoAssigned}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT DIRECTORY */}
          {activeTab === "students" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1B3B2B]/10 pb-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Student Directory</h3>
                  <p className="text-xs text-muted-foreground">Manage active enrolled students, check attendance records, and assign courses.</p>
                </div>
                <div className="flex items-center gap-2 bg-[#F5EFE6] border border-[#1B3B2B]/20 rounded-full px-4 py-2 text-xs">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name, roll no..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent focus:outline-none text-xs"
                  />
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-[#1B3B2B]/15 bg-[#F5EFE6]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#1B3B2B] text-white uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="p-4">Roll No</th>
                      <th className="p-4">Student Name</th>
                      <th className="p-4">Course</th>
                      <th className="p-4">WhatsApp / Contact</th>
                      <th className="p-4">Attendance</th>
                      <th className="p-4">Fee Status</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1B3B2B]/10 font-medium">
                    {students
                      .filter((s) => !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((s) => (
                        <tr key={s.id} className="hover:bg-white/60">
                          <td className="p-4 font-mono font-bold text-[#1B3B2B]">{s.rollNo}</td>
                          <td className="p-4 font-bold text-[#1B3B2B]">{s.name}</td>
                          <td className="p-4">{s.course}</td>
                          <td className="p-4 font-mono">{s.whatsapp}</td>
                          <td className="p-4 font-bold text-emerald-800">{s.attendance}</td>
                          <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">PAID</span></td>
                          <td className="p-4"><span className="px-2 py-0.5 rounded bg-emerald-800 text-white font-bold text-[10px]">ACTIVE</span></td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: COURSE MANAGEMENT */}
          {activeTab === "courses" && (
            <div className="space-y-8 animate-in fade-in">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Course Management Panel</h3>
                <p className="text-xs text-muted-foreground">Add new academic programs, edit syllabus content, and update fee structures.</p>
              </div>

              {/* Add Course Form */}
              <form onSubmit={handleAddCourse} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4">
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B] flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#D4AF37]" /> Create & Add New Course
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Course Title *
                    </label>
                    <input
                      type="text"
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      placeholder="e.g. Alimiyya Degree Course Year 3"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Instructor / Alima *
                    </label>
                    <input
                      type="text"
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                      placeholder="Muftia Fatima Ali Hashmi"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Category
                    </label>
                    <select
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value as any })}
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="ALIMIA">ALIMIA DEGREE</option>
                      <option value="TAJWEED">TAJWEED</option>
                      <option value="FREE">FREE FOUNDATIONAL</option>
                      <option value="SPECIALIZATION">SPECIALIZATION</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      placeholder="e.g. 1 Year"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                      Tuition Fee
                    </label>
                    <input
                      type="text"
                      value={newCourse.fee}
                      onChange={(e) => setNewCourse({ ...newCourse, fee: e.target.value })}
                      placeholder="e.g. 100% FREE"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">
                    Course Description
                  </label>
                  <textarea
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    rows={2}
                    placeholder="Brief description of subjects covered in this course..."
                    className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-[#1B3B2B] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#244b37] cursor-pointer"
                >
                  Publish Course to Website →
                </button>
              </form>

              {/* Course List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((c) => (
                  <div key={c.id} className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-3">
                    <span className="px-3 py-0.5 rounded-full bg-[#1B3B2B] text-white text-[10px] font-bold uppercase">
                      {c.category}
                    </span>
                    <h5 className="font-serif font-bold text-lg text-[#1B3B2B]">{c.title}</h5>
                    <p className="text-xs text-muted-foreground">{c.description}</p>
                    <div className="text-xs flex justify-between pt-2 border-t border-[#1B3B2B]/10">
                      <span>Instructor: {c.instructor}</span>
                      <span className="font-bold text-[#D4AF37]">{c.fee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: UPLOAD LIBRARY KITABS & PDFS */}
          {activeTab === "library" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Digital Library PDF Uploader</h3>
                <p className="text-xs text-muted-foreground">Upload authentic Sanad books, Tajweed guides, and PDF syllabus notes for student access.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActionSuccess(`Uploaded PDF Kitab "${newBook.title}" to Digital Library!`);
                  setNewBook({ title: "", category: "HADITH", author: "", pages: "200 Pages", fileUrl: "" });
                  setTimeout(() => setActionSuccess(null), 3000);
                }}
                className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4 max-w-2xl"
              >
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B] flex items-center gap-2">
                  <Upload className="w-5 h-5 text-[#D4AF37]" /> Upload New Kitab PDF
                </h4>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Kitab Title *</label>
                  <input
                    type="text"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    placeholder="e.g. Tafseer Ibn Kathir Juz 1 PDF"
                    className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Category</label>
                    <select
                      value={newBook.category}
                      onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                    >
                      <option>HADITH KITAB</option>
                      <option>TAFSEER KITAB</option>
                      <option>FIQH KITAB</option>
                      <option>ARABIC GRAMMAR</option>
                      <option>TAJWEED GUIDE</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Author / Scholar</label>
                    <input
                      type="text"
                      value={newBook.author}
                      onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                      placeholder="e.g. Imam Ghazali"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">PDF Direct Link / Upload URL</label>
                  <input
                    type="text"
                    value={newBook.fileUrl}
                    onChange={(e) => setNewBook({ ...newBook, fileUrl: e.target.value })}
                    placeholder="https://jamiya.edu/files/kitab-01.pdf"
                    className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-[#1B3B2B] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#244b37] cursor-pointer"
                >
                  Upload & Publish PDF Kitab →
                </button>
              </form>
            </div>
          )}

          {/* TAB 6: UPLOAD VIDEOS & AUDIOS */}
          {activeTab === "media" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Video & Audio Lecture Uploader</h3>
                <p className="text-xs text-muted-foreground">Add live class recordings and MP3 audio lectures to the student video archives.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4 max-w-2xl">
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B] flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#D4AF37]" /> Add New Recorded Class Video
                </h4>
                <div className="space-y-3 text-xs">
                  <input
                    type="text"
                    placeholder="Lecture Title (e.g. Surah Al-Baqarah Ayah 255 Tafseer)"
                    className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-[#1B3B2B]"
                  />
                  <input
                    type="text"
                    placeholder="YouTube / Vimeo / Zoom Recording URL"
                    className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-[#1B3B2B]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setActionSuccess("Recorded Class Video added to Student Dashboard Archives!");
                      setTimeout(() => setActionSuccess(null), 3000);
                    }}
                    className="rounded-full bg-[#1B3B2B] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#244b37]"
                  >
                    Publish Lecture Video →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: POST NOTICES */}
          {activeTab === "notices" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Academy Notice Board Publisher</h3>
                <p className="text-xs text-muted-foreground">Publish official exam date sheets, holiday notices, and announcements.</p>
              </div>

              <form onSubmit={handlePostNotice} className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4 max-w-2xl">
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B] flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#D4AF37]" /> Post New Academy Notice
                </h4>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Notice Headline *</label>
                  <input
                    type="text"
                    value={newNotice.title}
                    onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
                    placeholder="e.g. Annual Alimiyya Examination Date Sheet 2026"
                    className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Notice Category</label>
                  <select
                    value={newNotice.badge}
                    onChange={(e) => setNewNotice({ ...newNotice, badge: e.target.value as any })}
                    className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                  >
                    <option value="EXAM">EXAMINATION</option>
                    <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
                    <option value="HOLIDAY">HOLIDAY NOTICE</option>
                    <option value="MEHFIL">MEHFIL-E-NOOR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B3B2B] mb-1">Notice Content Details</label>
                  <textarea
                    value={newNotice.content}
                    onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
                    rows={4}
                    placeholder="Enter complete notice text..."
                    className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-[#1B3B2B] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#244b37] cursor-pointer"
                >
                  Publish Notice to Website & Dashboard →
                </button>
              </form>

              <div className="space-y-3">
                {notices.map((n) => (
                  <div key={n.id} className="p-4 rounded-xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-1">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase">{n.badge} • {n.date}</span>
                    <h5 className="font-serif font-bold text-base text-[#1B3B2B]">{n.title}</h5>
                    <p className="text-xs text-muted-foreground">{n.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: UPLOAD RESULTS */}
          {activeTab === "results" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Upload Student Results & Grade Sheets</h3>
                <p className="text-xs text-muted-foreground">Input student marks, calculate distinctions, and publish term reports.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setActionSuccess(`Result published for Roll No ${newResult.rollNo} (${newResult.studentName}) - Grade ${newResult.grade}!`);
                  setNewResult({ rollNo: "", studentName: "", course: "Alima Course — Year 2", marks: "95/100", grade: "A+" });
                  setTimeout(() => setActionSuccess(null), 3000);
                }}
                className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4 max-w-xl"
              >
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B]">Publish Term Marksheet</h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#1B3B2B] mb-1">Student Roll No *</label>
                    <input
                      type="text"
                      value={newResult.rollNo}
                      onChange={(e) => setNewResult({ ...newResult, rollNo: e.target.value })}
                      placeholder="JAM-2026-084"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#1B3B2B] mb-1">Student Name *</label>
                    <input
                      type="text"
                      value={newResult.studentName}
                      onChange={(e) => setNewResult({ ...newResult, studentName: e.target.value })}
                      placeholder="Ayesha Fatima"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#1B3B2B] mb-1">Marks Obtained</label>
                    <input
                      type="text"
                      value={newResult.marks}
                      onChange={(e) => setNewResult({ ...newResult, marks: e.target.value })}
                      placeholder="95/100"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#1B3B2B] mb-1">Grade Assigned</label>
                    <input
                      type="text"
                      value={newResult.grade}
                      onChange={(e) => setNewResult({ ...newResult, grade: e.target.value })}
                      placeholder="A+ (Distinction)"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-[#1B3B2B] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#244b37]"
                >
                  Publish Result to Student Portal →
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: ISSUE CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Issue Sanad Certificates</h3>
                <p className="text-xs text-muted-foreground">Generate state-registered digital certificates for graduating students.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const sanadNo = `SANAD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                  setActionSuccess(`State Registered Certificate ${sanadNo} issued to ${newCert.studentName}!`);
                  setNewCert({ studentName: "", rollNo: "", course: "Tajweed-ul-Quran" });
                  setTimeout(() => setActionSuccess(null), 3000);
                }}
                className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4 max-w-xl"
              >
                <h4 className="font-serif text-lg font-bold text-[#1B3B2B]">Issue Digital Sanad Certificate</h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#1B3B2B] mb-1">Student Roll No *</label>
                    <input
                      type="text"
                      value={newCert.rollNo}
                      onChange={(e) => setNewCert({ ...newCert, rollNo: e.target.value })}
                      placeholder="JAM-2026-084"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-[#1B3B2B] mb-1">Student Name *</label>
                    <input
                      type="text"
                      value={newCert.studentName}
                      onChange={(e) => setNewCert({ ...newCert, studentName: e.target.value })}
                      placeholder="Mariam Khan"
                      className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-[#1B3B2B] mb-1">Completed Sanad Course</label>
                  <select
                    value={newCert.course}
                    onChange={(e) => setNewCert({ ...newCert, course: e.target.value })}
                    className="w-full rounded-xl border border-[#1B3B2B]/20 bg-white px-4 py-2.5 text-xs text-[#1B3B2B]"
                  >
                    <option>Tajweed-ul-Quran & Madani Qaida</option>
                    <option>Alimiyya Degree Sanad</option>
                    <option>Mubaligha Course</option>
                    <option>Urdu Language Masterclass</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="rounded-full bg-[#1B3B2B] text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#244b37]"
                >
                  Generate & Issue Sanad Certificate →
                </button>
              </form>
            </div>
          )}

          {/* TAB 10: FEE MANAGEMENT */}
          {activeTab === "fees" && (
            <div className="space-y-6 animate-in fade-in">
              <div className="border-b border-[#1B3B2B]/10 pb-4">
                <h3 className="font-serif text-2xl font-bold text-[#1B3B2B]">Fee Management & Receipts</h3>
                <p className="text-xs text-muted-foreground">Approve tuition receipts, grant scholarships, and log payment records.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#1B3B2B]/15 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-serif font-bold text-lg text-[#1B3B2B]">Tuition Payment Audit</h4>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                    100% DUES CLEARED
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="border-b border-[#1B3B2B]/20 uppercase font-bold text-[10px] text-[#1B3B2B]">
                      <tr>
                        <th className="py-2">Receipt No</th>
                        <th className="py-2">Student</th>
                        <th className="py-2">Amount</th>
                        <th className="py-2">Date</th>
                        <th className="py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1B3B2B]/10">
                      <tr>
                        <td className="py-3 font-mono font-bold">REC-2026-901</td>
                        <td>Ayesha Fatima (JAM-2026-084)</td>
                        <td className="font-bold text-[#1B3B2B]">₹300 (Material Kitab Charge)</td>
                        <td>01 July 2026</td>
                        <td><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">PAID</span></td>
                      </tr>
                      <tr>
                        <td className="py-3 font-mono font-bold">REC-2026-902</td>
                        <td>Mariam Khan (JAM-2026-085)</td>
                        <td className="font-bold text-[#1B3B2B]">₹0 (Free Scholarship)</td>
                        <td>05 July 2026</td>
                        <td><span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">PAID</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
