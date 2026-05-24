"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../lib/api";
import { useAuthStore } from "../../../store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/login", form);
      setUser(
        response.data.user,
        response.data.accessToken,
        response.data.refreshToken
      );
      toast.success("Welcome back");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
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
          <h1 className="mt-2 font-heading text-3xl">Welcome Back 👋</h1>
          <p className="mt-2 text-sm text-brand-cream/70">
            Ready to expose the impostor?
          </p>
        </div>

        <div className="rounded-3xl border border-brand-border bg-brand-card p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                  autoComplete="current-password"
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

            <Link
              href="/auth/forgot-password"
              className="text-right text-xs text-brand-cream/70 underline"
            >
              Forgot Password?
            </Link>

            <button
              disabled={loading}
              className="mt-2 h-12 rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)] transition-transform hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-brand-cream/70">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-brand-cream underline">
            Sign Up
          </Link>
        </p>
      </motion.main>
    </div>
  );
}
