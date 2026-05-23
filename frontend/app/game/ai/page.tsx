"use client";

import Link from "next/link";
import { useState } from "react";

const difficulties = ["Easy", "Medium", "Hard"];

const packs = [
  { name: "Animals", emoji: "🐾" },
  { name: "Food", emoji: "🍕" },
  { name: "Movies", emoji: "🎬" },
  { name: "Gaming", emoji: "🎮" },
];

export default function AiModePage() {
  const [role, setRole] = useState("Civilian");
  const [difficulty, setDifficulty] = useState("Medium");
  const [pack, setPack] = useState("Animals");

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl">AI Solo Mode</h1>
            <p className="text-sm text-brand-cream/70">
              Play against smart AI opponents.
            </p>
          </div>
          <Link href="/dashboard" className="text-lg">
            ✕
          </Link>
        </header>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-5">
          <p className="text-xs text-brand-cream/60">Play as</p>
          <div className="mt-3 flex gap-2">
            {"Civilian,Impostor".split(",").map((value) => (
              <button
                key={value}
                onClick={() => setRole(value)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  role === value
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-brand-border"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-5">
          <p className="text-xs text-brand-cream/60">Difficulty</p>
          <div className="mt-3 flex gap-2">
            {difficulties.map((value) => (
              <button
                key={value}
                onClick={() => setDifficulty(value)}
                className={`rounded-full border px-4 py-2 text-sm ${
                  difficulty === value
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-brand-border"
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </section>

        <section>
          <p className="text-xs text-brand-cream/60">Select Word Pack</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {packs.map((item) => (
              <button
                key={item.name}
                onClick={() => setPack(item.name)}
                className={`rounded-2xl border px-4 py-3 text-left ${
                  pack === item.name
                    ? "border-brand-red bg-brand-card"
                    : "border-brand-border bg-brand-card"
                }`}
              >
                <div className="text-xl">{item.emoji}</div>
                <div className="mt-1 text-sm font-semibold">{item.name}</div>
              </button>
            ))}
          </div>
        </section>

        <button className="h-12 w-full rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)]">
          Start AI Match
        </button>
      </main>
    </div>
  );
}
