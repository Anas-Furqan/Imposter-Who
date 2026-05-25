"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import AuthGuard from "../../../components/AuthGuard";
import NbBadge from "../../../components/ui/NbBadge";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";

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
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+90px)] pt-6">
          <header className="flex items-center gap-3">
            <Link href="/dashboard" className="text-lg font-semibold">
              ←
            </Link>
            <div>
              <h1 className="font-heading text-2xl">GAME SETUP</h1>
              <p className="text-xs text-nb-muted">
                Tune the chaos before you play.
              </p>
            </div>
          </header>

          <section>
            <h2 className="text-xs font-semibold uppercase text-nb-muted">
              Select Game Mode
            </h2>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {modes.map((label) => (
                <button
                  key={label}
                  onClick={() => setMode(label)}
                  className={`rounded-full border-2 px-4 py-2 text-xs font-semibold transition-colors ${
                    mode === label
                      ? "border-black bg-[var(--nb-yellow)]"
                      : "border-black bg-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>

          {!isAiMode && (
            <NbCard bgColor="var(--nb-surface)" className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-semibold">Number of Players</h2>
                  <p className="text-xs text-nb-muted">3 to 20 players</p>
                </div>
                <NbBadge color="var(--nb-yellow)">{players}</NbBadge>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setPlayers((value) => Math.max(3, value - 1))}
                  className="h-10 w-10 rounded-full border-2 border-black bg-white text-lg font-bold"
                >
                  −
                </button>
                <div className="text-3xl font-semibold">{players}</div>
                <button
                  onClick={() => setPlayers((value) => Math.min(20, value + 1))}
                  className="h-10 w-10 rounded-full border-2 border-black bg-white text-lg font-bold"
                >
                  +
                </button>
              </div>
            </NbCard>
          )}

          <NbCard bgColor="var(--nb-surface)" className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Number of Impostors</h2>
                <p className="text-xs text-nb-muted">
                  Max {maxImpostors} impostors for {players} players
                </p>
              </div>
              <NbBadge color="var(--nb-pink)">{impostors}</NbBadge>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setImpostors((value) => Math.max(1, value - 1))}
                className="h-10 w-10 rounded-full border-2 border-black bg-white text-lg font-bold"
              >
                −
              </button>
              <div className="text-3xl font-semibold">{impostors}</div>
              <button
                onClick={() =>
                  setImpostors((value) => Math.min(maxImpostors, value + 1))
                }
                className="h-10 w-10 rounded-full border-2 border-black bg-white text-lg font-bold"
              >
                +
              </button>
            </div>
          </NbCard>

          <section>
            <h2 className="text-xs font-semibold uppercase text-nb-muted">
              Select Word Pack
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {packs.map((pack) => (
                <button
                  key={pack.name}
                  onClick={() => setSelectedPack(pack.name)}
                  className={`rounded-[14px] border-2 px-3 py-3 text-left transition-all ${
                    selectedPack === pack.name
                      ? "border-black bg-[var(--nb-yellow)]"
                      : "border-black bg-white"
                  }`}
                >
                  <div className="text-xl">{pack.emoji}</div>
                  <div className="mt-1 text-sm font-semibold">{pack.name}</div>
                  {pack.count > 0 && (
                    <div className="text-xs text-nb-muted">
                      {pack.count} words
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          <NbCard bgColor="var(--nb-surface)" className="p-5">
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
                  <p className="text-xs text-nb-muted">Timer per round</p>
                  <div className="mt-2 flex gap-2">
                    {["30s", "60s", "90s", "Off"].map((value) => (
                      <button
                        key={value}
                        onClick={() => setTimer(value)}
                        className={`rounded-full border-2 px-3 py-1 text-xs font-semibold ${
                          timer === value
                            ? "border-black bg-[var(--nb-yellow)]"
                            : "border-black bg-white"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-nb-muted">Hint for impostor</p>
                    <p className="text-sm font-semibold">
                      {hintEnabled ? "On" : "Off"}
                    </p>
                  </div>
                  <button
                    onClick={() => setHintEnabled((value) => !value)}
                    className={`h-8 w-14 rounded-full border-2 px-1 ${
                      hintEnabled
                        ? "border-black bg-[var(--nb-yellow)]"
                        : "border-black bg-white"
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-black transition-transform ${
                        hintEnabled ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <p className="text-xs text-nb-muted">Voting style</p>
                  <div className="mt-2 flex gap-2">
                    {["Open discussion", "Private"].map((value) => (
                      <button
                        key={value}
                        onClick={() => setVotingType(value)}
                        className={`rounded-full border-2 px-3 py-1 text-xs font-semibold ${
                          votingType === value
                            ? "border-black bg-[var(--nb-yellow)]"
                            : "border-black bg-white"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-nb-muted">Impostor count</p>
                  <div className="mt-2 flex gap-2">
                    {["Fixed", "Random"].map((value) => (
                      <button
                        key={value}
                        onClick={() => setCountMode(value)}
                        className={`rounded-full border-2 px-3 py-1 text-xs font-semibold ${
                          countMode === value
                            ? "border-black bg-[var(--nb-yellow)]"
                            : "border-black bg-white"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </NbCard>

          <div className="flex flex-col gap-3">
            <Link href="/game/reveal" className="inline-flex">
              <NbButton className="w-full">START GAME 🎯</NbButton>
            </Link>
            <Link href="/dashboard" className="inline-flex">
              <NbButton variant="secondary" className="w-full">
                BACK TO DASHBOARD
              </NbButton>
            </Link>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
