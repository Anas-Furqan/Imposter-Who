"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../lib/api";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";

const CODE_LENGTH = 6;

export default function VerifyEmailClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "your email";
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [cooldown, setCooldown] = useState(60);
  const [loading, setLoading] = useState(false);

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

  const handleVerify = async () => {
    try {
      setLoading(true);
      await api.post("/auth/verify-email", {
        email,
        code: digits.join(""),
      });
      toast.success("Email verified");
      router.push("/auth/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await api.post("/auth/resend-verification", { email });
      toast.success("Verification code resent");
      setCooldown(60);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend code");
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
          <div className="text-3xl">📬</div>
          <h1 className="mt-2 font-heading text-3xl">CHECK YOUR INBOX</h1>
          <p className="mt-2 text-sm text-nb-muted">
            We sent a 6-digit code to <span className="font-semibold">{email}</span>
          </p>
        </div>

        <NbCard bgColor="var(--nb-surface)" className="p-6">
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
                className="h-16 rounded-[10px] border-[2.5px] border-black bg-white text-center text-lg font-semibold outline-none focus:border-[var(--nb-yellow)] focus:shadow-[4px_4px_0px_#000]"
              />
            ))}
          </div>

          <NbButton
            loading={loading}
            disabled={!isComplete}
            onClick={handleVerify}
            className="mt-6 w-full"
          >
            VERIFY
          </NbButton>

          <button
            className="mt-3 w-full text-xs font-semibold underline"
            disabled={cooldown > 0}
            onClick={handleResend}
          >
            Resend Code {cooldown > 0 ? `(${cooldown}s)` : ""}
          </button>
        </NbCard>
      </motion.main>
    </div>
  );
}
