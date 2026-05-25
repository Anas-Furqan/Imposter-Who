"use client";

import Link from "next/link";
import AuthGuard from "../../../components/AuthGuard";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";

export default function QuestionModePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl">QUESTION MODE</h1>
              <p className="text-sm text-nb-muted">
                Answer your secret question.
              </p>
            </div>
            <Link href="/dashboard" className="text-lg font-semibold">
              ✕
            </Link>
          </header>

          <NbCard bgColor="var(--nb-yellow)" className="p-6">
            <h2 className="text-sm font-semibold">Your Question</h2>
            <div className="mt-4 rounded-[12px] border-2 border-black bg-white px-6 py-5 text-center text-lg font-semibold">
              What is your favorite topping on this Italian dish?
            </div>
            <p className="mt-3 text-sm text-nb-muted">
              Give a short, believable answer without giving away the pack.
            </p>
          </NbCard>

          <NbCard bgColor="var(--nb-surface)" className="p-5">
            <label className="text-sm font-semibold">Your Answer</label>
            <textarea
              className="mt-3 min-h-[120px] w-full rounded-[12px] border-2 border-black bg-white p-4 text-sm outline-none"
              placeholder="Type your answer here..."
            />
            <NbButton className="mt-4 w-full">SUBMIT ANSWER</NbButton>
          </NbCard>

          <Link href="/game/vote" className="inline-flex">
            <NbButton variant="secondary" className="w-full">
              GO TO VOTING
            </NbButton>
          </Link>
        </main>
      </div>
    </AuthGuard>
  );
}
