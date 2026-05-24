"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", {
        email: form.email,
        username: form.username,
        password: form.password,
      });
      toast.success("Verification email sent");
      router.push(`/auth/verify-email?email=${encodeURIComponent(form.email)}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+28px)] pt-10"
      >
        <div className="text-center">
          <div className="text-3xl">🕵️</div>
          <h1 className="mt-2 font-heading text-3xl">Create Account</h1>
          <p className="mt-2 text-sm text-brand-cream/70">
            Join 10M+ players and start the chaos.
          </p>
        </div>

        <div className="rounded-3xl border border-brand-border bg-brand-card p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label className="text-sm text-brand-cream/80">
              Username
              <div className="mt-2 flex items-center gap-2 rounded-2xl border border-brand-border bg-black/40 px-4 py-3">
                <span className="text-brand-cream/50">@</span>
                <input
                  className="w-full bg-transparent text-sm text-brand-cream outline-none"
                  placeholder="yourname"
                  autoComplete="username"
                  value={form.username}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, username: event.target.value }))
                  }
                />
              </div>
            </label>

            <label className="text-sm text-brand-cream/80">
              Email
              <input
                className="mt-2 w-full rounded-2xl border border-brand-border bg-black/40 px-4 py-3 text-sm text-brand-cream outline-none"
                placeholder="you@email.com"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </label>

            <label className="text-sm text-brand-cream/80">
              Password
              <div className="mt-2 flex items-center rounded-2xl border border-brand-border bg-black/40 px-4 py-3">
                <input
                  className="w-full bg-transparent text-sm text-brand-cream outline-none"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, password: event.target.value }))
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-xs text-brand-cream/70"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <label className="text-sm text-brand-cream/80">
              Confirm Password
              <div className="mt-2 flex items-center rounded-2xl border border-brand-border bg-black/40 px-4 py-3">
                <input
                  className="w-full bg-transparent text-sm text-brand-cream outline-none"
                  placeholder="••••••••"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      confirmPassword: event.target.value,
                    }))
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((value) => !value)}
                  className="text-xs text-brand-cream/70"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <button
              disabled={loading}
              className="mt-2 h-12 rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)] transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-brand-cream/70">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-cream underline">
            Sign In
          </Link>
        </p>
      </motion.main>
    </div>
  );
}
