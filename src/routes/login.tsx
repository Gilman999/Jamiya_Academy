import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { signInStudent, signInWithGoogle } from "@/lib/supabase";
import { Sparkles, ShieldCheck, ArrowRight, Lock, UserCheck, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Student & Admin Login — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      { name: "description", content: "Official login portal for Jamiya Kaneez E Sayyeda Fatima Academy students and faculty." },
    ],
  }),
  component: LoginPage,
});

export function LoginPage() {
  const [role, setRole] = useState<"student" | "admin">("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
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
        <div className="w-full max-w-5xl rounded-3xl bg-white border-2 border-[#1B3B2B]/15 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
          
          {/* LEFT SIDE: BRAND ARTWORK (Desktop 5 cols) */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#1B3B2B] via-[#244b37] to-[#12271c] text-white p-10 flex-col justify-between relative overflow-hidden border-r border-[#D4AF37]/30">
            <div className="space-y-6 relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FED65B] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Official Portal
              </span>
              <h2 className="font-serif text-3xl font-bold leading-tight text-white">
                Sanctuary of Sacred & Scholastic Wisdom
              </h2>
              <p className="text-xs text-white/80 leading-relaxed">
                State Registered Online & Offline Academy for Women & Girls. Access your live classes, sanad courses, digital library, and progress reports.
              </p>
            </div>

            {/* Quote Card */}
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2 relative z-10">
              <p className="text-xs italic text-white/90">
                “Education at Jamiya is a spiritual journey connecting classical Islamic knowledge with modern clarity.”
              </p>
              <p className="text-[10px] font-bold text-[#FED65B] uppercase tracking-wider">
                — Muftia Fatima Ali Hashmi (Founder & Principal)
              </p>
            </div>

            {/* Footer Trust Badges */}
            <div className="flex items-center gap-4 text-[10px] text-white/70 font-semibold uppercase tracking-wider relative z-10 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> State Registered
              </span>
              <span>•</span>
              <span>100% Secure Authentication</span>
            </div>

            {/* Background Ornamental Emblem */}
            <div className="absolute right-[-30px] bottom-[-30px] opacity-10 text-9xl font-serif text-[#D4AF37] pointer-events-none">
              ﷺ
            </div>
          </div>

          {/* RIGHT SIDE: AUTHENTICATION FORM (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6 bg-[#FDFBF7]">
            
            {/* Role Toggle Tabs */}
            <div className="flex items-center p-1 rounded-full bg-[#F5EFE6] border border-[#1B3B2B]/15">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  role === "student"
                    ? "bg-[#1B3B2B] text-white shadow-md"
                    : "text-muted-foreground hover:text-[#1B3B2B]"
                }`}
              >
                🎓 Student Portal
              </button>
              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`flex-1 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  role === "admin"
                    ? "bg-[#1B3B2B] text-white shadow-md"
                    : "text-muted-foreground hover:text-[#1B3B2B]"
                }`}
              >
                🔐 Admin / Faculty Panel
              </button>
            </div>

            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B2B]">
                {role === "student" ? "Welcome Back, Student!" : "Faculty & Admin Sign In"}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {role === "student"
                  ? "Enter your student credentials or sign in with Google to access your dashboard."
                  : "Authorized personnel portal for managing admissions, grades, and classes."}
              </p>
            </div>

            {/* Success Notification */}
            {successMsg && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <UserCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Error Notification */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-300 text-red-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-red-700 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* GOOGLE OAUTH BUTTON */}
            {role === "student" && (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={googleLoading}
                  className="w-full flex items-center justify-center gap-3 py-3.5 px-5 rounded-full border-2 border-[#1B3B2B]/20 bg-white hover:bg-[#F5EFE6] text-xs font-bold uppercase tracking-wider text-[#1B3B2B] transition-all cursor-pointer shadow-sm hover:border-[#D4AF37]"
                >
                  {/* Official Google SVG Icon */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.29v3.15C3.26 21.3 7.31 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.29C.47 8.21 0 10.05 0 12s.47 3.79 1.29 5.42l3.99-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.58l3.99 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>{googleLoading ? "Connecting Google Auth..." : "Continue with Google"}</span>
                </button>

                <div className="flex items-center gap-3 text-center my-2">
                  <div className="h-px bg-[#1B3B2B]/15 flex-1" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    OR SIGN IN WITH CREDENTIALS
                  </span>
                  <div className="h-px bg-[#1B3B2B]/15 flex-1" />
                </div>
              </div>
            )}

            {/* EMAIL / ROLL NO LOGIN FORM */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#1B3B2B] mb-1.5">
                  {role === "student" ? "Roll No / Student Email" : "Admin Username / Email"}
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={role === "student" ? "e.g. JAM-2026-084 or student@jamiya.edu" : "admin@jamiya.edu"}
                  className="w-full rounded-full border border-[#1B3B2B]/20 bg-white px-5 py-3 text-xs text-[#1B3B2B] placeholder:text-muted-foreground/60 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none"
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
                  className="w-full rounded-full border border-[#1B3B2B]/20 bg-white px-5 py-3 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#1B3B2B] text-white py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#244b37] transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <span>{loading ? "Authenticating..." : role === "student" ? "Sign In to Dashboard →" : "Sign In to Admin Panel →"}</span>
                <ArrowRight className="w-4 h-4 text-[#FED65B]" />
              </button>

              {role === "student" && (
                <div className="pt-3 text-center border-t border-[#1B3B2B]/10">
                  <button
                    type="button"
                    onClick={() => {
                      setIdentifier("JAM-2026-084");
                      setPassword("student123");
                    }}
                    className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider hover:underline cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Autofill Demo Student Credentials
                  </button>
                </div>
              )}
            </form>

            <p className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1">
              <Lock className="w-3 h-3 text-[#1B3B2B]" /> Protected by 256-bit SSL Encryption
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
