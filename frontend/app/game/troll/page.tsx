"use client";

import Link from "next/link";
import AuthGuard from "../../../components/AuthGuard";

export default function TrollModePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl">Troll Mode</h1>
            <p className="text-sm text-brand-cream/70">
              Everyone is the impostor.
            </p>
          </div>
          <Link href="/dashboard" className="text-lg">
            ✕
          </Link>
        </header>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-6 text-center">
          <div className="text-4xl">🤡</div>
          <h2 className="mt-3 text-xl font-semibold">
            Everyone is the impostor!
          </h2>
          <p className="mt-2 text-sm text-brand-cream/70">
            There is no real word. Just bluff and have fun.
          </p>
        </section>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-6">
          <label className="text-sm text-brand-cream/80">Your Bluff</label>
          <textarea
            className="mt-3 min-h-[120px] w-full rounded-2xl border border-brand-border bg-black/40 p-4 text-sm text-brand-cream outline-none"
            placeholder="Type your bluff here..."
          />
          <button className="mt-4 h-12 w-full rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)]">
            Submit Bluff
          </button>
        </section>

        <button className="h-12 w-full rounded-full border border-brand-border text-sm font-semibold">
          Play Again
        </button>
      </main>
      </div>
    </AuthGuard>
  );
}
