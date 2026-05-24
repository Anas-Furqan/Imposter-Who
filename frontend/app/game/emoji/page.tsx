"use client";

import Link from "next/link";
import { useState } from "react";
import AuthGuard from "../../../components/AuthGuard";

const emojiGrid = [
  "🌧️",
  "🏞️",
  "💧",
  "🏔️",
  "🌈",
  "🌊",
  "🍃",
  "✨",
  "☁️",
  "🪨",
  "🏜️",
  "🌿",
];

export default function EmojiModePage() {
  const [clues, setClues] = useState<string[]>([]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl">Emoji Mode</h1>
            <p className="text-sm text-brand-cream/70">
              Describe the word using only emojis.
            </p>
          </div>
          <Link href="/dashboard" className="text-lg">
            ✕
          </Link>
        </header>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-6">
          <h2 className="text-sm font-semibold text-brand-cream/80">
            Your Emoji Clue
          </h2>
          <div className="mt-3 min-h-[64px] rounded-2xl bg-black/40 px-4 py-3 text-center text-2xl">
            {clues.length > 0 ? clues.join(" ") : "Pick emojis below"}
          </div>
        </section>

        <section className="grid grid-cols-4 gap-3">
          {emojiGrid.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setClues((prev) => [...prev, emoji])}
              className="rounded-2xl border border-brand-border bg-brand-card py-4 text-xl"
            >
              {emoji}
            </button>
          ))}
        </section>

        <div className="flex gap-3">
          <button
            onClick={() => setClues([])}
            className="h-12 flex-1 rounded-full border border-brand-border text-sm font-semibold"
          >
            Clear
          </button>
          <button className="h-12 flex-1 rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)]">
            Submit Clue
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
