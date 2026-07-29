import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { signInStudent, signInWithGoogle } from "@/lib/supabase";
import { Sparkles, ShieldCheck, ArrowRight, Lock, UserCheck, AlertCircle, GraduationCap } from "lucide-react";

export const Route = createFileRoute("/student-login")({
  head: () => ({
    meta: [
      { title: "Student Login Portal — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      { name: "description", content: "Official student login portal for Jamiya Kaneez E Sayyeda Fatima Academy." },
    ],
  }),
  component: StudentLoginPage,
});

export function StudentLoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { user, error } = await signInStudent(identifier, password);

    setLoading(false);
    if (error) {
      setErrorMsg(error);
    } else if (user) {
      setSuccessMsg(`Welcome, ${user.name}! Redirecting to your Student Dashboard...`);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setErrorMsg(null);

    const { user, error } = await signInWithGoogle();

    setGoogleLoading(false);
    if (error) {
      setErrorMsg(error);
    } else if (user) {
      setSuccessMsg(`Authenticated via Google as ${user.name}! Redirecting...`);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C201D] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#1B3B2B]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-4xl rounded-3xl bg-white border-2 border-[#1B3B2B]/15 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          
          {/* LEFT SIDE: BRAND HERO */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#1B3B2B] via-[#244b37] to-[#12271c] text-white p-8 flex-col justify-between relative overflow-hidden border-r border-[#D4AF37]/30">
            <div className="space-y-6 relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FED65B] text-xs font-bold uppercase tracking-widest">
                <GraduationCap className="w-4 h-4 text-[#FED65B]" /> Student Portal
              </span>
              <h2 className="font-serif text-3xl font-bold leading-tight text-white">
                Student Access Sanctuary
              </h2>
              <p className="text-xs text-white/80 leading-relaxed">
                Log in to access your live & recorded class links, PDF study notes, assignment submissions, and progress reports.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2 relative z-10">
              <p className="text-xs italic text-white/90">
                “Nurturing young women through authentic Islamic Sanad education.”
              </p>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-white/70 font-semibold uppercase tracking-wider relative z-10 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> State Registered
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: STUDENT LOGIN FORM */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6 bg-[#FDFBF7]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">STUDENT SIGN IN</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B2B]">
                Student Portal Login
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Enter your Roll Number or Email to sign in, or use Google OAuth.
              </p>
            </div>

            {/* Notifications */}
            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-700 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* GOOGLE LOGIN BUTTON */}
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-full border-2 border-[#1B3B2B]/20 bg-white hover:bg-[#F5EFE6] text-xs font-bold uppercase tracking-wider text-[#1B3B2B] transition-all cursor-pointer shadow-sm hover:border-[#D4AF37]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>{googleLoading ? "Connecting Google..." : "Continue with Google (Supabase)"}</span>
            </button>

            <div className="flex items-center gap-3 text-center my-1">
              <div className="h-px bg-[#1B3B2B]/15 flex-1" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                OR ROLL NO / EMAIL LOGIN
              </span>
              <div className="h-px bg-[#1B3B2B]/15 flex-1" />
            </div>

            {/* FORM */}
            <form onSubmit={handleStudentLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#1B3B2B] mb-1.5">
                  Roll No / Student Email
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. JAM-2026-084 or student@jamiya.edu"
                  className="w-full rounded-full border border-[#1B3B2B]/20 bg-white px-5 py-3 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#1B3B2B] mb-1.5">
                  Passcode / Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-full border border-[#1B3B2B]/20 bg-white px-5 py-3 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#1B3B2B] text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#244b37] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>{loading ? "Authenticating..." : "LOGIN TO STUDENT DASHBOARD →"}</span>
                <ArrowRight className="w-4 h-4 text-[#FED65B]" />
              </button>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                <button
                  type="button"
                  onClick={() => {
                    setIdentifier("JAM-2026-084");
                    setPassword("student123");
                  }}
                  className="hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Demo Student Login
                </button>
                <Link to="/admin-login" className="text-[#1B3B2B] hover:underline">
                  Switch to Admin Login →
                </Link>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
