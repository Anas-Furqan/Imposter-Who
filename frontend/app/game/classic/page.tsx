"use client";

import Link from "next/link";
import AuthGuard from "../../../components/AuthGuard";
import NbBadge from "../../../components/ui/NbBadge";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";

const players = ["Ava", "Noah", "Mia", "Leo", "Zoe", "Kai"];

export default function ClassicModePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl">CLASSIC MODE</h1>
              <p className="text-sm text-nb-muted">Round 1 · Give a clue</p>
            </div>
            <Link href="/dashboard" className="text-lg font-semibold">
              ✕
            </Link>
          </header>

          <NbCard bgColor="var(--nb-yellow)" className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Secret Word</h2>
              <NbBadge color="var(--nb-surface)">ROUND 1</NbBadge>
            </div>
            <div className="mt-3 rounded-[12px] border-2 border-black bg-white px-6 py-4 text-center text-2xl font-semibold">
              WATERFALL
            </div>
            <p className="mt-3 text-sm text-nb-muted">
              Everyone gives a one-word clue. The impostor bluffs.
            </p>
          </NbCard>

          <section>
            <h2 className="text-xs font-semibold uppercase text-nb-muted">
              Player Order
            </h2>
            <div className="mt-3 grid gap-2">
              {players.map((player, index) => (
                <NbCard
                  key={player}
                  bgColor="var(--nb-surface)"
                  className="flex items-center justify-between px-4 py-3"
                >
                  <span className="text-sm font-semibold">
                    {index + 1}. {player}
                  </span>
                  <span className="text-xs text-nb-muted">Waiting</span>
                </NbCard>
              ))}
            </div>
          </section>

          <Link href="/game/vote" className="mt-4 inline-flex">
            <NbButton className="w-full">GO TO VOTING</NbButton>
          </Link>
        </main>
      </div>
    </AuthGuard>
  );
}
