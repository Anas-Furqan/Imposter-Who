"use client";

import Link from "next/link";
import AuthGuard from "../../../components/AuthGuard";

const players = ["Ava", "Noah", "Mia", "Leo", "Zoe", "Kai"];

export default function ClassicModePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl">Classic Mode</h1>
            <p className="text-sm text-brand-cream/70">Round 1 · Give a clue</p>
          </div>
          <Link href="/dashboard" className="text-lg">
            ✕
          </Link>
        </header>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-5">
          <h2 className="text-sm font-semibold text-brand-cream/80">
            Secret Word
          </h2>
          <div className="mt-3 rounded-2xl bg-black/40 px-6 py-4 text-center text-2xl font-semibold">
            WATERFALL
          </div>
          <p className="mt-3 text-sm text-brand-cream/70">
            Everyone gives a one-word clue. The impostor bluffs.
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-brand-cream/80">
            Player Order
          </h2>
          <div className="mt-3 grid gap-2">
            {players.map((player, index) => (
              <div
                key={player}
                className="flex items-center justify-between rounded-2xl border border-brand-border bg-brand-card px-4 py-3"
              >
                <span className="text-sm font-semibold">
                  {index + 1}. {player}
                </span>
                <span className="text-xs text-brand-cream/60">Waiting</span>
              </div>
            ))}
          </div>
        </section>

        <Link
          href="/game/vote"
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)]"
        >
          Go to Voting
        </Link>
      </main>
      </div>
    </AuthGuard>
  );
}
