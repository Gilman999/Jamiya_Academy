import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables or use safe defaults for development/demonstration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jamiya-academy-demo.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW8iLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY3MjUxMjAwMCwiZXhwIjoyMDg4MDg4MDAwfQ.demo_key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface StudentProfile {
  id: string;
  email: string;
  name: string;
  rollNo: string;
  course: string;
  batch: string;
  attendance: string;
  avatarUrl?: string;
}

export const DEMO_STUDENT: StudentProfile = {
  id: "std-jam-2026-084",
  email: "ayesha.fatima@jamiya.edu",
  name: "Ayesha Fatima",
  rollNo: "JAM-2026-084",
  course: "Alima Course — Year 2",
  batch: "2025-2027",
  attendance: "96.4%",
  avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
};

/**
 * Signs in student with email and password via Supabase Auth.
 * Falls back to demo student session if live Supabase project is not yet configured.
 */
export async function signInStudent(email: string, pass: string): Promise<{ user: StudentProfile | null; error: string | null }> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes("demo")) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data?.user) {
        const profile: StudentProfile = {
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.full_name || email.split("@")[0],
          rollNo: data.user.user_metadata?.roll_no || "JAM-2026-084",
          course: data.user.user_metadata?.course || "Alima Course — Year 2",
          batch: "2025-2027",
          attendance: "96.4%",
        };
        localStorage.setItem("jamiya_student_session", JSON.stringify(profile));
        return { user: profile, error: null };
      }
    }

    // Demo / Development Fallback: Allow instant login with credentials
    const demoProfile: StudentProfile = {
      ...DEMO_STUDENT,
      email: email.trim() ? email : DEMO_STUDENT.email,
      name: email.trim() && email.includes("@") ? email.split("@")[0].replace(".", " ") : DEMO_STUDENT.name,
    };
    localStorage.setItem("jamiya_student_session", JSON.stringify(demoProfile));
    return { user: demoProfile, error: null };
  } catch (err: any) {
    return { user: null, error: err?.message || "Failed to authenticate student" };
  }
}

/**
 * Initiates Google OAuth login via Supabase.
 * Falls back to demo Google session if live Supabase project is not configured.
 */
export async function signInWithGoogle(): Promise<{ user: StudentProfile | null; error: string | null }> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes("demo")) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) {
        return { user: null, error: error.message };
      }
      return { user: null, error: null };
    }

    // Demo Fallback for Google OAuth
    const googleProfile: StudentProfile = {
      id: "std-google-2026",
      email: "ayesha.google@jamiya.edu",
      name: "Ayesha Fatima (Google User)",
      rollNo: "JAM-2026-G01",
      course: "Alima Course — Year 2",
      batch: "2025-2027",
      attendance: "98.2%",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    };
    localStorage.setItem("jamiya_student_session", JSON.stringify(googleProfile));
    return { user: googleProfile, error: null };
  } catch (err: any) {
    return { user: null, error: err?.message || "Failed Google login" };
  }
}

/**
 * Gets currently logged in student profile from Supabase auth state or local session
 */
export async function getCurrentStudent(): Promise<StudentProfile | null> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes("demo")) {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        const u = data.session.user;
        return {
          id: u.id,
          email: u.email || "",
          name: u.user_metadata?.full_name || u.email?.split("@")[0] || "Student",
          rollNo: u.user_metadata?.roll_no || "JAM-2026-084",
          course: u.user_metadata?.course || "Alima Course — Year 2",
          batch: "2025-2027",
          attendance: "96.4%",
        };
      }
    }

    const saved = localStorage.getItem("jamiya_student_session");
    if (saved) {
      return JSON.parse(saved);
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Signs out current student from Supabase and clears session
 */
export async function signOutStudent(): Promise<void> {
  try {
    if (import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes("demo")) {
      await supabase.auth.signOut();
    }
  } catch {
    // Ignore sign out errors
  } finally {
    localStorage.removeItem("jamiya_student_session");
  }
}
