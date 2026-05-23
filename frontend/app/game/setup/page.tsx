"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const modes = ["Classic", "Question", "Emoji", "Troll", "AI"];

const packs = [
  { name: "Animals", emoji: "🐾", count: 40 },
  { name: "Food", emoji: "🍕", count: 40 },
  { name: "Countries", emoji: "🌍", count: 30 },
  { name: "Cities", emoji: "🏙️", count: 30 },
  { name: "Movies", emoji: "🎬", count: 30 },
  { name: "Music", emoji: "🎵", count: 30 },
  { name: "Nature", emoji: "🌿", count: 30 },
  { name: "Science", emoji: "🔬", count: 30 },
  { name: "Celebrities", emoji: "⭐", count: 26 },
  { name: "Cars", emoji: "🚗", count: 30 },
  { name: "Gaming", emoji: "🎮", count: 30 },
  { name: "Anime", emoji: "🎌", count: 30 },
  { name: "K-Pop", emoji: "🎤", count: 30 },
  { name: "Superheroes", emoji: "🦸", count: 30 },
  { name: "Football", emoji: "⚽", count: 30 },
  { name: "Make-up", emoji: "💄", count: 30 },
  { name: "Nostalgia", emoji: "🌟", count: 30 },
  { name: "My Custom Packs", emoji: "➕", count: 0 },
];

export default function GameSetupPage() {
  const [mode, setMode] = useState("Classic");
  const [players, setPlayers] = useState(6);
  const [impostors, setImpostors] = useState(1);
  const [selectedPack, setSelectedPack] = useState("Animals");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [timer, setTimer] = useState("60s");
  const [hintEnabled, setHintEnabled] = useState(true);
  const [votingType, setVotingType] = useState("Open discussion");
  const [countMode, setCountMode] = useState("Fixed");

  const isAiMode = mode === "AI";
  const maxImpostors = useMemo(
    () => Math.max(1, Math.min(3, players - 2)),
    [players]
  );

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+90px)] pt-6">
        <header className="flex items-center gap-3">
          <Link href="/dashboard" className="text-xl">
            ←
          </Link>
          <h1 className="font-heading text-2xl">Game Setup</h1>
        </header>

        <section>
          <h2 className="text-sm font-semibold text-brand-cream/80">
            Select Game Mode
          </h2>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
            {modes.map((label) => (
              <button
                key={label}
                onClick={() => setMode(label)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  mode === label
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-brand-border bg-brand-card text-brand-cream"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {!isAiMode && (
          <section className="rounded-3xl border border-brand-border bg-brand-card p-5">
            <h2 className="text-sm font-semibold text-brand-cream/80">
              Number of Players
            </h2>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setPlayers((value) => Math.max(3, value - 1))}
                className="h-10 w-10 rounded-full border border-brand-border"
              >
                −
              </button>
              <div className="text-3xl font-semibold">{players}</div>
              <button
                onClick={() => setPlayers((value) => Math.min(20, value + 1))}
                className="h-10 w-10 rounded-full border border-brand-border"
              >
                +
              </button>
            </div>
          </section>
        )}

        <section className="rounded-3xl border border-brand-border bg-brand-card p-5">
          <h2 className="text-sm font-semibold text-brand-cream/80">
            Number of Impostors
          </h2>
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() =>
                setImpostors((value) => Math.max(1, value - 1))
              }
              className="h-10 w-10 rounded-full border border-brand-border"
            >
              −
            </button>
            <div className="text-3xl font-semibold">{impostors}</div>
            <button
              onClick={() =>
                setImpostors((value) => Math.min(maxImpostors, value + 1))
              }
              className="h-10 w-10 rounded-full border border-brand-border"
            >
              +
            </button>
          </div>
          <p className="mt-2 text-xs text-brand-cream/60">
            Max {maxImpostors} impostors for {players} players
          </p>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-brand-cream/80">
            Select Word Pack
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {packs.map((pack) => (
              <button
                key={pack.name}
                onClick={() => setSelectedPack(pack.name)}
                className={`rounded-2xl border px-3 py-3 text-left transition-all ${
                  selectedPack === pack.name
                    ? "border-brand-red bg-brand-card"
                    : "border-brand-border bg-brand-card"
                }`}
              >
                <div className="text-xl">{pack.emoji}</div>
                <div className="mt-1 text-sm font-semibold">{pack.name}</div>
                {pack.count > 0 && (
                  <div className="text-xs text-brand-cream/60">
                    {pack.count} words
                  </div>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-5">
          <button
            onClick={() => setShowAdvanced((value) => !value)}
            className="flex w-full items-center justify-between text-sm font-semibold"
          >
            Advanced Options
            <span>{showAdvanced ? "−" : "+"}</span>
          </button>

          {showAdvanced && (
            <div className="mt-4 flex flex-col gap-4 text-sm">
              <div>
                <p className="text-xs text-brand-cream/60">Timer per round</p>
                <div className="mt-2 flex gap-2">
                  {["30s", "60s", "90s", "Off"].map((value) => (
                    <button
                      key={value}
                      onClick={() => setTimer(value)}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        timer === value
                          ? "border-brand-red bg-brand-red text-white"
                          : "border-brand-border"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-brand-cream/60">Hint for impostor</p>
                  <p className="text-sm">{hintEnabled ? "On" : "Off"}</p>
                </div>
                <button
                  onClick={() => setHintEnabled((value) => !value)}
                  className={`h-8 w-14 rounded-full border px-1 ${
                    hintEnabled ? "border-brand-red" : "border-brand-border"
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-brand-cream transition-transform ${
                      hintEnabled ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div>
                <p className="text-xs text-brand-cream/60">Voting type</p>
                <div className="mt-2 flex gap-2">
                  {["Open discussion", "Secret ballot"].map((value) => (
                    <button
                      key={value}
                      onClick={() => setVotingType(value)}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        votingType === value
                          ? "border-brand-red bg-brand-red text-white"
                          : "border-brand-border"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-brand-cream/60">Count mode</p>
                <div className="mt-2 flex gap-2">
                  {["Fixed", "Random"].map((value) => (
                    <button
                      key={value}
                      onClick={() => setCountMode(value)}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        countMode === value
                          ? "border-brand-red bg-brand-red text-white"
                          : "border-brand-border"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] px-5 pb-[calc(env(safe-area-inset-bottom,0px)+20px)]">
        <button className="h-14 w-full rounded-full bg-brand-red text-base font-semibold text-white shadow-[0_14px_30px_rgba(255,59,92,0.35)] transition-transform hover:-translate-y-0.5 active:scale-[0.98]">
          Start Game 🎮
        </button>
      </div>
    </div>
  );
}
