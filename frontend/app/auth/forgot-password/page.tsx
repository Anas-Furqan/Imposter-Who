"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../lib/api";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";
import NbInput from "../../../components/ui/NbInput";

const CODE_LENGTH = 6;

type Step = "email" | "code" | "reset";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSendCode = async () => {
    try {
      setLoading(true);
      await api.post("/auth/forgot-password", { email });
      toast.success("Reset code sent");
      setStep("code");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/reset-password", {
        email,
        code: digits.join(""),
        password,
      });
      toast.success("Password updated");
      router.push("/auth/login");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || "Reset failed");
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
          <div className="text-3xl">🔐</div>
          <h1 className="mt-2 font-heading text-3xl">FORGOT PASSWORD</h1>
          <p className="mt-2 text-sm text-nb-muted">
            {step === "email" && "Enter your email to receive a reset code."}
            {step === "code" && "Type the 6-digit code we emailed you."}
            {step === "reset" && "Set a new password for your account."}
          </p>
        </div>

        <NbCard bgColor="var(--nb-surface)" className="p-6">
          {step === "email" && (
            <div className="flex flex-col gap-4">
              <NbInput
                label="Email"
                placeholder="you@email.com"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <NbButton loading={loading} onClick={handleSendCode}>
                SEND RESET CODE
              </NbButton>
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
                    className="h-16 rounded-[10px] border-[2.5px] border-black bg-white text-center text-lg font-semibold outline-none focus:border-[var(--nb-yellow)] focus:shadow-[4px_4px_0px_#000]"
                  />
                ))}
              </div>

              <NbButton className="mt-6 w-full" onClick={() => setStep("reset")}
              >
                VERIFY CODE
              </NbButton>
            </div>
          )}

          {step === "reset" && (
            <div className="flex flex-col gap-4">
              <div>
                <NbInput
                  label="New Password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
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
                  value={confirm}
                  onChange={(event) => setConfirm(event.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((value) => !value)}
                  className="mt-2 text-xs font-semibold underline"
                >
                  {showConfirm ? "Hide" : "Show"} confirm
                </button>
              </div>

              <NbButton loading={loading} onClick={handleReset}>
                RESET PASSWORD
              </NbButton>
            </div>
          )}
        </NbCard>
      </motion.main>
    </div>
  );
}
