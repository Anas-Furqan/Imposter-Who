"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BottomNav from "../../components/BottomNav";

const modes = [
  {
    emoji: "🎭",
    title: "Classic Mode",
    body: "Everyone gives clues. Find the impostor.",
  },
  {
    emoji: "❓",
    title: "Question Mode",
    body: "Answer questions. Spot the odd one out.",
  },
  {
    emoji: "😀",
    title: "Emoji Mode",
    body: "Express using only emojis. No words allowed.",
  },
  {
    emoji: "🤡",
    title: "Troll Mode",
    body: "Everyone is the impostor. Pure chaos.",
  },
  {
    emoji: "🤖",
    title: "AI Mode",
    body: "Play solo against smart AI opponents.",
  },
  {
    emoji: "✍️",
    title: "Custom Pack",
    body: "Play with your own word packs.",
  },
];

const leaderboard = [
  { name: "Nova", xp: 1240 },
  { name: "Rogue", xp: 1180 },
  { name: "Echo", xp: 1125 },
  { name: "Blaze", xp: 980 },
  { name: "Luna", xp: 910 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+90px)] pt-8"
      >
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-heading text-lg">
            <span>🕵️</span>
            IMPOSTER WHO?
          </div>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-brand-red/30" />
            <div className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-cream/80">
              ⚡ 320 XP
            </div>
          </div>
        </header>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
          <h2 className="font-heading text-xl">Play with Friends 🎉</h2>
          <p className="mt-2 text-sm text-brand-cream/70">
            Pass the phone around, one device for everyone.
          </p>
          <Link
            href="/game/setup"
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Start Game
          </Link>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-brand-cream/80">
            Game Modes
          </h3>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {modes.map((mode) => (
              <div
                key={mode.title}
                className="rounded-2xl border border-brand-border bg-brand-card p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="text-xl">{mode.emoji}</div>
                <h4 className="mt-2 text-sm font-semibold">{mode.title}</h4>
                <p className="mt-1 text-xs text-brand-cream/70">
                  {mode.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex gap-3">
          {[
            { label: "Games Played", value: "48" },
            { label: "Games Won", value: "22" },
            { label: "Win Rate", value: "46%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex-1 rounded-2xl border border-brand-border bg-brand-card px-3 py-3 text-center"
            >
              <div className="text-lg font-semibold">{stat.value}</div>
              <div className="text-[11px] text-brand-cream/70">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-cream/80">
              🏆 Top Players
            </h3>
            <Link href="/leaderboard" className="text-xs text-brand-cream/60">
              View All
            </Link>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {leaderboard.map((player) => (
              <div
                key={player.name}
                className="min-w-[140px] rounded-2xl border border-brand-border bg-brand-card p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-brand-red/30" />
                  <div>
                    <div className="text-sm font-semibold">{player.name}</div>
                    <div className="text-xs text-brand-cream/60">
                      {player.xp} XP
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </motion.main>
      <BottomNav />
    </div>
  );
}
