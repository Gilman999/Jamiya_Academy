import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";
import { ShieldCheck, Lock, ArrowRight, KeyRound, Sparkles, UserCheck, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/admin-login")({
  head: () => ({
    meta: [
      { title: "Admin Portal Sign In — Jamiya Kaneez E Sayyeda Fatima Lilbanat ﷺ" },
      { name: "description", content: "Official administration portal login for Jamiya Kaneez E Sayyeda Fatima Academy." },
    ],
  }),
  component: AdminLoginPage,
});

export function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("jamiya_admin_session", "true");
      setSuccessMsg("Access Granted! Welcome to Academy Admin Dashboard.");
      setTimeout(() => {
        window.location.href = "/admin-dashboard";
      }, 800);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1C201D] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#1B3B2B]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8 lg:p-12">
        <div className="w-full max-w-4xl rounded-3xl bg-white border-2 border-[#1B3B2B]/15 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          
          {/* LEFT SIDE: ADMIN HERO */}
          <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#12271c] via-[#1B3B2B] to-[#0d1c14] text-white p-8 flex-col justify-between relative overflow-hidden border-r border-[#D4AF37]/40">
            <div className="space-y-6 relative z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FED65B] text-xs font-bold uppercase tracking-widest">
                <KeyRound className="w-4 h-4 text-[#FED65B]" /> Directress Panel
              </span>
              <h2 className="font-serif text-3xl font-bold leading-tight text-white">
                Academy Administration
              </h2>
              <p className="text-xs text-white/80 leading-relaxed">
                Authorized management portal for courses, online admissions, student directory, kitabs, notices, and certificates.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-2 relative z-10">
              <p className="text-xs italic text-white/90">
                “Leading traditional Islamic scholarship with administrative excellence.”
              </p>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-white/70 font-semibold uppercase tracking-wider relative z-10 pt-4 border-t border-white/10">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-[#D4AF37]" /> Encrypted Admin Gateway
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: ADMIN LOGIN FORM */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-6 bg-[#FDFBF7]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">ADMINISTRATION SIGN IN</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B3B2B]">
                Academy Admin Portal
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Enter your administrative credentials to access the management dashboard.
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

            {/* FORM */}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#1B3B2B] mb-1.5">
                  Admin Username / Email
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@jamiya.edu"
                  className="w-full rounded-full border border-[#1B3B2B]/20 bg-white px-5 py-3 text-xs text-[#1B3B2B] focus:border-[#D4AF37] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] text-[#1B3B2B] mb-1.5">
                  Admin Secret Key / Password
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
                <span>{loading ? "Authenticating..." : "OPEN ADMIN DASHBOARD →"}</span>
                <ArrowRight className="w-4 h-4 text-[#FED65B]" />
              </button>

              <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#D4AF37]">
                <button
                  type="button"
                  onClick={() => {
                    setUsername("admin@jamiya.edu");
                    setPassword("admin123");
                  }}
                  className="hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Autofill Demo Admin Key
                </button>
                <Link to="/student-login" className="text-[#1B3B2B] hover:underline">
                  Switch to Student Login →
                </Link>
              </div>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
