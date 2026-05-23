"use client";

import { useState } from "react";

export default function RoleRevealPage() {
  const [playerNumber, setPlayerNumber] = useState(1);
  const [playerName, setPlayerName] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [isImpostor, setIsImpostor] = useState(false);

  const handleReveal = () => {
    setIsImpostor(Math.random() < 0.25);
    setRevealed(true);
  };

  const handleHide = () => {
    setRevealed(false);
    setPlayerName("");
    setPlayerNumber((value) => value + 1);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-10">
        <div className="text-center">
          <h1 className="font-heading text-2xl">Pass the phone</h1>
          <p className="mt-2 text-sm text-brand-cream/70">
            Player {playerNumber}, it is your turn.
          </p>
        </div>

        <div
          className="mx-auto h-[340px] w-full max-w-[320px]"
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative h-full w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl border border-brand-border bg-brand-card p-6 text-center shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="text-2xl">📱</div>
              <h2 className="mt-3 font-heading text-xl">I&apos;m Ready</h2>
              <input
                value={playerName}
                onChange={(event) => setPlayerName(event.target.value)}
                className="mt-6 w-full rounded-2xl border border-brand-border bg-black/40 px-4 py-3 text-center text-lg text-brand-cream outline-none"
                placeholder="Your name"
              />
              <button
                onClick={handleReveal}
                className="mt-6 h-12 w-full rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)]"
              >
                I&apos;m Ready 👁️
              </button>
            </div>

            <div
              className="absolute inset-0 rounded-3xl border border-brand-border bg-brand-card p-6 text-center shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              {isImpostor ? (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <div className="text-3xl">🔴</div>
                  <h2 className="font-heading text-xl text-brand-cream">
                    YOU ARE THE IMPOSTOR
                  </h2>
                  <p className="text-sm text-brand-cream/70">
                    You don&apos;t know the word. Bluff your way through.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                  <div className="text-3xl">🟢</div>
                  <h2 className="font-heading text-xl">CIVILIAN</h2>
                  <div className="rounded-2xl bg-black/40 px-6 py-3 text-xl font-semibold">
                    Secret Word
                  </div>
                  <p className="text-sm text-brand-cream/70">
                    Give a one-word clue. Don&apos;t reveal the word.
                  </p>
                </div>
              )}

              <button
                onClick={handleHide}
                className="mt-6 h-12 w-full rounded-full border border-brand-border bg-black/40 text-sm font-semibold text-brand-cream"
              >
                Got it! Hide
              </button>
            </div>
          </div>
        </div>

        {playerNumber > 1 && !revealed && (
          <button className="h-12 w-full rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)]">
            Everyone&apos;s Ready! Start Round 🎯
          </button>
        )}
      </main>
    </div>
  );
}
