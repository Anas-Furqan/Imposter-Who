"use client";

import Link from "next/link";
import { useState } from "react";
import AuthGuard from "../../../components/AuthGuard";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";

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
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl">AI SOLO MODE</h1>
              <p className="text-sm text-nb-muted">
                Play against smart AI opponents.
              </p>
            </div>
            <Link href="/dashboard" className="text-lg font-semibold">
              ✕
            </Link>
          </header>

          <NbCard bgColor="var(--nb-surface)" className="p-5">
            <p className="text-xs text-nb-muted">Play as</p>
            <div className="mt-3 flex gap-2">
              {"Civilian,Impostor".split(",").map((value) => (
                <button
                  key={value}
                  onClick={() => setRole(value)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold ${
                    role === value
                      ? "border-black bg-[var(--nb-yellow)]"
                      : "border-black bg-white"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </NbCard>

          <NbCard bgColor="var(--nb-surface)" className="p-5">
            <p className="text-xs text-nb-muted">Difficulty</p>
            <div className="mt-3 flex gap-2">
              {difficulties.map((value) => (
                <button
                  key={value}
                  onClick={() => setDifficulty(value)}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold ${
                    difficulty === value
                      ? "border-black bg-[var(--nb-yellow)]"
                      : "border-black bg-white"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </NbCard>

          <section>
            <p className="text-xs font-semibold uppercase text-nb-muted">
              Select Word Pack
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {packs.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setPack(item.name)}
                  className={`rounded-[12px] border-2 px-4 py-3 text-left ${
                    pack === item.name
                      ? "border-black bg-[var(--nb-yellow)]"
                      : "border-black bg-white"
                  }`}
                >
                  <div className="text-xl">{item.emoji}</div>
                  <div className="mt-1 text-sm font-semibold">{item.name}</div>
                </button>
              ))}
            </div>
          </section>

          <NbButton className="w-full">START AI MATCH</NbButton>
        </main>
      </div>
    </AuthGuard>
  );
}
