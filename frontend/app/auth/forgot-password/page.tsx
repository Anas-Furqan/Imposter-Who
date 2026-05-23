"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const CODE_LENGTH = 6;

type Step = "email" | "code" | "reset";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+28px)] pt-10"
      >
        <div className="text-center">
          <div className="text-3xl">🔐</div>
          <h1 className="mt-2 font-heading text-3xl">Forgot Password</h1>
          <p className="mt-2 text-sm text-brand-cream/70">
            {step === "email" && "Enter your email to receive a reset code."}
            {step === "code" && "Type the 6-digit code we emailed you."}
            {step === "reset" && "Set a new password for your account."}
          </p>
        </div>

        <div className="rounded-3xl border border-brand-border bg-brand-card p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          {step === "email" && (
            <div className="flex flex-col gap-4">
              <label className="text-sm text-brand-cream/80">
                Email
                <input
                  className="mt-2 w-full rounded-2xl border border-brand-border bg-black/40 px-4 py-3 text-sm text-brand-cream outline-none"
                  placeholder="you@email.com"
                  type="email"
                  autoComplete="email"
                />
              </label>
              <button
                onClick={() => setStep("code")}
                className="mt-2 h-12 rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Send Reset Code
              </button>
            </div>
          )}

          {step === "code" && (
            <div>
              <div className="grid grid-cols-6 gap-2">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    value={digit}
                    onChange={(event) => {
                      const value = event.target.value.replace(/\D/g, "");
                      setDigits((prev) => {
                        const updated = [...prev];
                        updated[index] = value.slice(-1);
                        return updated;
                      });
                    }}
                    maxLength={1}
                    inputMode="numeric"
                    className="h-12 rounded-2xl border border-brand-border bg-black/40 text-center text-lg text-brand-cream outline-none"
                  />
                ))}
              </div>

              <button
                onClick={() => setStep("reset")}
                className="mt-6 h-12 w-full rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Verify Code
              </button>
            </div>
          )}

          {step === "reset" && (
            <div className="flex flex-col gap-4">
              <label className="text-sm text-brand-cream/80">
                New Password
                <div className="mt-2 flex items-center rounded-2xl border border-brand-border bg-black/40 px-4 py-3">
                  <input
                    className="w-full bg-transparent text-sm text-brand-cream outline-none"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
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

              <button className="mt-2 h-12 rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]">
                Reset Password
              </button>
            </div>
          )}
        </div>
      </motion.main>
    </div>
  );
}
