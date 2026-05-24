"use client";

import Link from "next/link";
import AuthGuard from "../../../components/AuthGuard";

export default function QuestionModePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl">Question Mode</h1>
            <p className="text-sm text-brand-cream/70">
              Answer your secret question.
            </p>
          </div>
          <Link href="/dashboard" className="text-lg">
            ✕
          </Link>
        </header>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-6">
          <h2 className="text-sm font-semibold text-brand-cream/80">
            Your Question
          </h2>
          <div className="mt-4 rounded-2xl bg-black/40 px-6 py-5 text-center text-lg font-semibold">
            What is your favorite topping on this Italian dish?
          </div>
          <p className="mt-3 text-sm text-brand-cream/70">
            Give a short, believable answer without giving away the pack.
          </p>
        </section>

        <div className="rounded-3xl border border-brand-border bg-brand-card p-5">
          <label className="text-sm text-brand-cream/80">Your Answer</label>
          <textarea
            className="mt-3 min-h-[120px] w-full rounded-2xl border border-brand-border bg-black/40 p-4 text-sm text-brand-cream outline-none"
            placeholder="Type your answer here..."
          />
          <button className="mt-4 h-12 w-full rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)]">
            Submit Answer
          </button>
        </div>

        <Link
          href="/game/vote"
          className="inline-flex h-12 w-full items-center justify-center rounded-full border border-brand-border text-sm font-semibold"
        >
          Go to Voting
        </Link>
      </main>
      </div>
    </AuthGuard>
  );
}
