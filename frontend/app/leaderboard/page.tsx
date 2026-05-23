"use client";

import Link from "next/link";
import { useState } from "react";

const topThree = [
  { name: "Nova", xp: 1520, rank: 1 },
  { name: "Echo", xp: 1380, rank: 2 },
  { name: "Luna", xp: 1290, rank: 3 },
];

const players = [
  { name: "Nova", xp: 1520 },
  { name: "Echo", xp: 1380 },
  { name: "Luna", xp: 1290 },
  { name: "Blaze", xp: 1180 },
  { name: "Jade", xp: 1110 },
  { name: "Rex", xp: 980 },
  { name: "Kai", xp: 940 },
  { name: "Mia", xp: 910 },
  { name: "Leo", xp: 880 },
  { name: "Zoe", xp: 860 },
];

export default function LeaderboardPage() {
  const [tab, setTab] = useState<"week" | "all">("week");

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl">Leaderboard</h1>
            <p className="text-sm text-brand-cream/70">
              See who is leading the pack.
            </p>
          </div>
          <Link href="/dashboard" className="text-lg">
            ✕
          </Link>
        </header>

        <div className="flex gap-2 rounded-full border border-brand-border bg-brand-card p-1">
          <button
            onClick={() => setTab("week")}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
              tab === "week"
                ? "bg-brand-red text-white"
                : "text-brand-cream/70"
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTab("all")}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
              tab === "all"
                ? "bg-brand-red text-white"
                : "text-brand-cream/70"
            }`}
          >
            All Time
          </button>
        </div>

        <section className="grid grid-cols-3 gap-3">
          {topThree.map((player) => (
            <div
              key={player.rank}
              className="rounded-3xl border border-brand-border bg-brand-card px-3 py-4 text-center"
            >
              <div className="text-2xl">
                {player.rank === 1 ? "👑" : player.rank === 2 ? "🥈" : "🥉"}
              </div>
              <div className="mt-2 text-sm font-semibold">{player.name}</div>
              <div className="text-xs text-brand-cream/60">
                {player.xp} XP
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-4">
          <div className="flex flex-col gap-3">
            {players.map((player, index) => (
              <div
                key={player.name}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
                  player.name === "Nova"
                    ? "border-brand-red bg-black/30"
                    : "border-brand-border bg-black/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-brand-cream/60">#{index + 1}</span>
                  <span className="text-sm font-semibold">{player.name}</span>
                </div>
                <span className="text-xs text-brand-cream/60">
                  {player.xp} XP
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
