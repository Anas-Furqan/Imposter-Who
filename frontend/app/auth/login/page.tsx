"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../lib/api";
import { useAuthStore } from "../../../store/authStore";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";
import NbInput from "../../../components/ui/NbInput";

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
    <div className="min-h-screen bg-nb-bg text-nb-text">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+28px)] pt-10"
      >
        <div className="text-center">
          <div className="text-3xl">🕵️</div>
          <h1 className="mt-2 font-heading text-3xl">WELCOME BACK 👋</h1>
          <p className="mt-2 text-sm text-nb-muted">
            Ready to expose the impostor?
          </p>
        </div>

        <NbCard bgColor="var(--nb-surface)" className="p-6">
          <div className="h-1 w-full bg-[var(--nb-yellow)]" />
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <NbInput
              label="Email"
              placeholder="you@email.com"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
            />
            <div>
              <NbInput
                label="Password"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="mt-2 text-xs font-semibold underline"
              >
                {showPassword ? "Hide" : "Show"} password
              </button>
            </div>

            <Link
              href="/auth/forgot-password"
              className="text-right text-xs font-semibold underline"
            >
              Forgot Password?
            </Link>

            <NbButton loading={loading} className="w-full">
              SIGN IN
            </NbButton>
          </form>
        </NbCard>

        <p className="text-center text-sm text-nb-muted">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="font-semibold underline">
            Sign Up
          </Link>
        </p>
      </motion.main>
    </div>
  );
}
