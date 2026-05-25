"use client";

import { useMemo, useState } from "react";
import AuthGuard from "../../../components/AuthGuard";
import NbBadge from "../../../components/ui/NbBadge";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";

const players = ["Ava", "Noah", "Mia", "Leo", "Zoe", "Kai"];

export default function VotePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [result, setResult] = useState("Mia");

  const canVote = useMemo(() => Boolean(selected), [selected]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
          <h1 className="text-center font-heading text-2xl">
            {revealed ? "RESULTS" : "VOTE FOR THE IMPOSTOR"}
          </h1>

          {!revealed && (
            <section className="grid gap-3">
              {players.map((player) => (
                <button
                  key={player}
                  onClick={() => setSelected(player)}
                  className={`flex items-center justify-between rounded-[14px] border-2 px-4 py-3 text-left transition-all ${
                    selected === player
                      ? "border-black bg-[var(--nb-yellow)]"
                      : "border-black bg-white"
                  }`}
                >
                  <span className="text-sm font-semibold">{player}</span>
                  {selected === player && (
                    <NbBadge color="var(--nb-pink)">SELECTED</NbBadge>
                  )}
                </button>
              ))}
            </section>
          )}

          {!revealed && (
            <NbButton
              disabled={!canVote}
              onClick={() => setRevealed(true)}
              className="w-full"
            >
              CAST VOTE
            </NbButton>
          )}

          {revealed && (
            <NbCard bgColor="var(--nb-surface)" className="p-6 text-center">
              <div className="text-3xl">🗳️</div>
              <h2 className="mt-3 text-lg font-semibold">
                {result} received the most votes
              </h2>
              <p className="mt-2 text-sm text-nb-muted">
                Was {result} the impostor?
              </p>
              <div className="mt-4 flex gap-3">
                <NbButton className="flex-1" onClick={() => setResult("Mia")}>
                  ✅ YES
                </NbButton>
                <NbButton variant="secondary" className="flex-1">
                  ❌ NO
                </NbButton>
              </div>
            </NbCard>
          )}

          {revealed && (
            <div className="flex flex-col gap-2">
              <NbButton className="w-full">PLAY AGAIN 🔄</NbButton>
              <NbButton variant="secondary" className="w-full">
                NEW GAME 🎮
              </NbButton>
              <NbButton variant="secondary" className="w-full">
                HOME 🏠
              </NbButton>
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
