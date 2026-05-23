"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const CODE_LENGTH = 6;

export default function VerifyEmailClient() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "your email";
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [cooldown, setCooldown] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCooldown((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const isComplete = useMemo(
    () => digits.every((digit) => digit.length === 1),
    [digits]
  );

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+28px)] pt-10"
      >
        <div className="text-center">
          <div className="text-3xl">📬</div>
          <h1 className="mt-2 font-heading text-3xl">Check Your Email</h1>
          <p className="mt-2 text-sm text-brand-cream/70">
            We sent a 6-digit code to {email}
          </p>
        </div>

        <div className="rounded-3xl border border-brand-border bg-brand-card p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
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
            disabled={!isComplete}
            className="mt-6 h-12 w-full rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)] transition-transform enabled:hover:-translate-y-0.5 enabled:active:scale-[0.98] disabled:opacity-40"
          >
            Verify
          </button>

          <button
            className="mt-3 w-full text-xs text-brand-cream/70 underline disabled:opacity-50"
            disabled={cooldown > 0}
          >
            Resend Code {cooldown > 0 ? `(${cooldown}s)` : ""}
          </button>
        </div>
      </motion.main>
    </div>
  );
}
