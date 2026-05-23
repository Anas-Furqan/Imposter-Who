"use client";

import { useMemo, useState } from "react";

const players = ["Ava", "Noah", "Mia", "Leo", "Zoe", "Kai"];

export default function VotePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState("Mia");

  const canVote = useMemo(() => Boolean(selected), [selected]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <h1 className="text-center font-heading text-2xl">
          {revealed ? "Results" : "Vote for the Impostor"}
        </h1>

        {!revealed && (
          <section className="grid gap-3">
            {players.map((player) => (
              <button
                key={player}
                onClick={() => setSelected(player)}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition-all ${
                  selected === player
                    ? "border-brand-red bg-brand-card"
                    : "border-brand-border bg-brand-card"
                }`}
              >
                <span className="text-sm font-semibold">{player}</span>
                {selected === player && (
                  <span className="rounded-full bg-brand-red px-2 py-1 text-[10px] text-white">
                    Selected
                  </span>
                )}
              </button>
            ))}
          </section>
        )}

        {!revealed && (
          <button
            disabled={!canVote}
            onClick={() => setRevealed(true)}
            className="h-12 w-full rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)] disabled:opacity-40"
          >
            Cast Vote
          </button>
        )}

        {revealed && (
          <section className="rounded-3xl border border-brand-border bg-brand-card p-6 text-center">
            <div className="text-3xl">🗳️</div>
            <h2 className="mt-3 text-lg font-semibold">
              {result} received the most votes
            </h2>
            <p className="mt-2 text-sm text-brand-cream/70">
              Was {result} the impostor?
            </p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setResult("Mia")}
                className="flex-1 rounded-full bg-brand-red px-4 py-3 text-sm font-semibold text-white"
              >
                ✅ Yes
              </button>
              <button className="flex-1 rounded-full border border-brand-border px-4 py-3 text-sm font-semibold">
                ❌ No
              </button>
            </div>
          </section>
        )}

        {revealed && (
          <div className="flex flex-col gap-2">
            <button className="h-12 w-full rounded-full bg-brand-red text-sm font-semibold text-white">
              Play Again 🔄
            </button>
            <button className="h-12 w-full rounded-full border border-brand-border text-sm font-semibold">
              New Game 🎮
            </button>
            <button className="h-12 w-full rounded-full border border-brand-border text-sm font-semibold">
              Home 🏠
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
