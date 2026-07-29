export interface CourseItem {
  id: string;
  title: string;
  category: "ALIMIA" | "TAJWEED" | "FREE" | "SPECIALIZATION";
  duration: string;
  fee: string;
  instructor: string;
  description: string;
  enrolledStudents: number;
  status: "ACTIVE" | "UPCOMING" | "PAUSED";
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  guardianName: string;
  age: string;
  whatsapp: string;
  email: string;
  city: string;
  country: string;
  learningMode: "online" | "offline";
  course: string;
  appliedDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rollNoAssigned?: string;
}

export interface StudentItem {
  id: string;
  rollNo: string;
  name: string;
  email: string;
  whatsapp: string;
  course: string;
  batch: string;
  attendance: string;
  feeStatus: "PAID" | "PENDING" | "OVERDUE";
  status: "ACTIVE" | "BLOCKED" | "GRADUATED";
}

export interface LibraryItem {
  id: string;
  title: string;
  category: "HADITH" | "TAFSEER" | "FIQH" | "ARABIC" | "TAJWEED";
  author: string;
  pages: string;
  size: string;
  fileUrl: string;
  uploadDate: string;
}

export interface MediaLecture {
  id: string;
  title: string;
  type: "VIDEO" | "AUDIO";
  course: string;
  instructor: string;
  duration: string;
  url: string;
  uploadDate: string;
}

export interface NoticeItem {
  id: string;
  title: string;
  badge: "EXAM" | "ANNOUNCEMENT" | "HOLIDAY" | "MEHFIL";
  content: string;
  date: string;
  isUrgent: boolean;
}

export interface ResultItem {
  id: string;
  studentRollNo: string;
  studentName: string;
  course: string;
  examTerm: string;
  grade: string;
  marks: string;
  status: "PASSED" | "FAILED";
  issueDate: string;
}

export interface CertificateItem {
  id: string;
  sanadNo: string;
  studentName: string;
  rollNo: string;
  course: string;
  issueDate: string;
  verificationStatus: "VERIFIED" | "PENDING";
}

export interface FeeRecord {
  id: string;
  receiptNo: string;
  studentName: string;
  rollNo: string;
  amount: string;
  type: "TUITION" | "KITAB_MATERIAL" | "EXAM_FEE";
  paymentDate: string;
  status: "PAID" | "UNPAID";
}

// DEFAULT INITIAL SEED DATA
const DEFAULT_COURSES: CourseItem[] = [
  {
    id: "crs-1",
    title: "Alimiyya Degree Course (With Fazliyat)",
    category: "ALIMIA",
    duration: "5 Years",
    fee: "Free Tuition / ₹300 Material",
    instructor: "Muftia Fatima Ali Hashmi",
    description: "Complete traditional Sanad course including Tafseer, Mishkat Hadith, Fiqh Hanafi, & Sarf-Nahw.",
    enrolledStudents: 142,
    status: "ACTIVE",
  },
  {
    id: "crs-2",
    title: "Tajweed-ul-Quran & Madani Qaida",
    category: "TAJWEED",
    duration: "3 Months",
    fee: "Free Tuition",
    instructor: "Qaria Ayesha Siddiqua",
    description: "Makharij correction, Sifat-e-Lazimah, and voice recitation coaching.",
    enrolledStudents: 215,
    status: "ACTIVE",
  },
  {
    id: "crs-3",
    title: "Urdu Reading & Writing Masterclass",
    category: "FREE",
    duration: "3 Months",
    fee: "100% FREE",
    instructor: "Alima Zoya Khan",
    description: "Foundational course to read and write fluent Urdu prose and Islamic literature.",
    enrolledStudents: 310,
    status: "ACTIVE",
  },
];

const DEFAULT_ADMISSIONS: AdmissionApplication[] = [
  {
    id: "adm-101",
    studentName: "Sumayya Parveen",
    guardianName: "Mohd Tariq",
    age: "19",
    whatsapp: "+91 98765 43210",
    email: "sumayya.p@gmail.com",
    city: "New Delhi",
    country: "India",
    learningMode: "online",
    course: "Alima Course (With Fazliyat)",
    appliedDate: "28 July 2026",
    status: "PENDING",
  },
  {
    id: "adm-102",
    studentName: "Zainab Fatimah",
    guardianName: "Abdul Rahman",
    age: "21",
    whatsapp: "+91 91234 56789",
    email: "zainab.f@yahoo.com",
    city: "Lucknow",
    country: "India",
    learningMode: "online",
    course: "Tajweed Course (With Madani Qaida)",
    appliedDate: "27 July 2026",
    status: "PENDING",
  },
];

const DEFAULT_STUDENTS: StudentItem[] = [
  {
    id: "std-1",
    rollNo: "JAM-2026-084",
    name: "Ayesha Fatima",
    email: "ayesha.fatima@jamiya.edu",
    whatsapp: "+91 93683 24180",
    course: "Alima Course — Year 2",
    batch: "2025-2027",
    attendance: "96.4%",
    feeStatus: "PAID",
    status: "ACTIVE",
  },
  {
    id: "std-2",
    rollNo: "JAM-2026-085",
    name: "Mariam Khan",
    email: "mariam.k@jamiya.edu",
    whatsapp: "+91 98765 11223",
    course: "Tajweed-ul-Quran",
    batch: "2026",
    attendance: "92.0%",
    feeStatus: "PAID",
    status: "ACTIVE",
  },
];

const DEFAULT_NOTICES: NoticeItem[] = [
  {
    id: "not-1",
    title: "Annual Alimiyya & Tajweed Final Examination Schedule 2026",
    badge: "EXAM",
    content: "All online and offline students are hereby notified that the final examinations for the 2025-2026 academic session will commence from August 10th.",
    date: "28 July 2026",
    isUrgent: true,
  },
  {
    id: "not-2",
    title: "1500 Saal Jashn-e-Milad-un-Nabi ﷺ Free Admissions Open",
    badge: "ANNOUNCEMENT",
    content: "Admissions for the 4 free foundational courses are currently open for the new batch. No tuition charges required.",
    date: "25 July 2026",
    isUrgent: false,
  },
];

// DATA STORE API FUNCTIONS WITH LOCALSTORAGE PERSISTENCE

export function getAcademyCourses(): CourseItem[] {
  const saved = localStorage.getItem("jamiya_courses");
  return saved ? JSON.parse(saved) : DEFAULT_COURSES;
}

export function saveAcademyCourse(course: CourseItem): void {
  const list = getAcademyCourses();
  const index = list.findIndex((c) => c.id === course.id);
  if (index >= 0) {
    list[index] = course;
  } else {
    list.unshift(course);
  }
  localStorage.setItem("jamiya_courses", JSON.stringify(list));
}

export function getAdmissionApplications(): AdmissionApplication[] {
  const saved = localStorage.getItem("jamiya_admissions");
  return saved ? JSON.parse(saved) : DEFAULT_ADMISSIONS;
}

export function submitAdmissionApplication(app: Omit<AdmissionApplication, "id" | "appliedDate" | "status">): AdmissionApplication {
  const list = getAdmissionApplications();
  const newApp: AdmissionApplication = {
    ...app,
    id: `adm-${Date.now().toString().slice(-4)}`,
    appliedDate: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
    status: "PENDING",
  };
  list.unshift(newApp);
  localStorage.setItem("jamiya_admissions", JSON.stringify(list));
  return newApp;
}

export function updateAdmissionStatus(id: string, status: "APPROVED" | "REJECTED"): void {
  const list = getAdmissionApplications();
  const app = list.find((a) => a.id === id);
  if (app) {
    app.status = status;
    if (status === "APPROVED") {
      const rollNo = `JAM-2026-${Math.floor(100 + Math.random() * 900)}`;
      app.rollNoAssigned = rollNo;

      // Add to student directory
      const students = getStudentList();
      students.unshift({
        id: `std-${Date.now()}`,
        rollNo,
        name: app.studentName,
        email: app.email,
        whatsapp: app.whatsapp,
        course: app.course,
        batch: "2026-2028",
        attendance: "100%",
        feeStatus: "PAID",
        status: "ACTIVE",
      });
      localStorage.setItem("jamiya_students", JSON.stringify(students));
    }
  }
  localStorage.setItem("jamiya_admissions", JSON.stringify(list));
}

export function getStudentList(): StudentItem[] {
  const saved = localStorage.getItem("jamiya_students");
  return saved ? JSON.parse(saved) : DEFAULT_STUDENTS;
}

export function getAcademyNotices(): NoticeItem[] {
  const saved = localStorage.getItem("jamiya_notices");
  return saved ? JSON.parse(saved) : DEFAULT_NOTICES;
}

export function postAcademyNotice(notice: Omit<NoticeItem, "id" | "date">): NoticeItem {
  const list = getAcademyNotices();
  const newNotice: NoticeItem = {
    ...notice,
    id: `not-${Date.now().toString().slice(-4)}`,
    date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  };
  list.unshift(newNotice);
  localStorage.setItem("jamiya_notices", JSON.stringify(list));
  return newNotice;
}
