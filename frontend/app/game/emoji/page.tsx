"use client";

import Link from "next/link";
import { useState } from "react";
import AuthGuard from "../../../components/AuthGuard";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";

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
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl">EMOJI MODE</h1>
              <p className="text-sm text-nb-muted">
                Describe the word using only emojis.
              </p>
            </div>
            <Link href="/dashboard" className="text-lg font-semibold">
              ✕
            </Link>
          </header>

          <NbCard bgColor="var(--nb-yellow)" className="p-6">
            <h2 className="text-sm font-semibold">Your Emoji Clue</h2>
            <div className="mt-3 min-h-[64px] rounded-[12px] border-2 border-black bg-white px-4 py-3 text-center text-2xl">
              {clues.length > 0 ? clues.join(" ") : "Pick emojis below"}
            </div>
          </NbCard>

          <section className="grid grid-cols-4 gap-3">
            {emojiGrid.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setClues((prev) => [...prev, emoji])}
                className="rounded-[12px] border-2 border-black bg-white py-4 text-xl"
              >
                {emoji}
              </button>
            ))}
          </section>

          <div className="flex gap-3">
            <NbButton variant="secondary" className="flex-1" onClick={() => setClues([])}>
              CLEAR
            </NbButton>
            <NbButton className="flex-1">SUBMIT CLUE</NbButton>
          </div>

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
