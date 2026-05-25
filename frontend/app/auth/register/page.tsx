"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../lib/api";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";
import NbInput from "../../../components/ui/NbInput";
import NbDivider from "../../../components/ui/NbDivider";

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
    <div className="min-h-screen bg-nb-bg text-nb-text">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+28px)] pt-10"
      >
        <div className="text-center">
          <div className="text-3xl">🕵️</div>
          <h1 className="mt-2 font-heading text-3xl">JOIN THE GAME</h1>
          <p className="mt-2 text-sm text-nb-muted">
            Create your account and start the chaos.
          </p>
        </div>

        <NbCard bgColor="var(--nb-surface)" className="p-6">
          <div className="h-1 w-full bg-[var(--nb-yellow)]" />
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <NbInput
              label="Username"
              placeholder="yourname"
              value={form.username}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, username: event.target.value }))
              }
            />
            <NbInput
              label="Email"
              placeholder="you@email.com"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
            />

            <NbDivider label="Secure" />

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

            <div>
              <NbInput
                label="Confirm Password"
                placeholder="••••••••"
                type={showConfirm ? "text" : "password"}
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
                className="mt-2 text-xs font-semibold underline"
              >
                {showConfirm ? "Hide" : "Show"} confirm
              </button>
            </div>

            <NbButton loading={loading} className="w-full">
              CREATE ACCOUNT
            </NbButton>
          </form>
        </NbCard>

        <p className="text-center text-sm text-nb-muted">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold underline">
            Sign In
          </Link>
        </p>
      </motion.main>
    </div>
  );
}
