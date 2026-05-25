"use client";

import { useState } from "react";
import AuthGuard from "../../../components/AuthGuard";
import NbBadge from "../../../components/ui/NbBadge";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";

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
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-10">
          <div className="text-center">
            <h1 className="font-heading text-2xl">PASS THE PHONE</h1>
            <p className="mt-2 text-sm text-nb-muted">
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
              <NbCard
                bgColor="var(--nb-yellow)"
                className="absolute inset-0 p-6 text-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="text-2xl">📱</div>
                <h2 className="mt-3 font-heading text-xl">I&apos;M READY</h2>
                <input
                  value={playerName}
                  onChange={(event) => setPlayerName(event.target.value)}
                  className="mt-6 w-full rounded-[12px] border-2 border-black bg-white px-4 py-3 text-center text-lg font-semibold outline-none"
                  placeholder="Your name"
                />
                <NbButton className="mt-6 w-full" onClick={handleReveal}>
                  I&apos;M READY 👁️
                </NbButton>
              </NbCard>

              <NbCard
                bgColor="var(--nb-surface)"
                className="absolute inset-0 p-6 text-center"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                {isImpostor ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    <NbBadge color="var(--nb-pink)">IMPOSTOR</NbBadge>
                    <h2 className="font-heading text-xl">
                      YOU ARE THE IMPOSTOR
                    </h2>
                    <p className="text-sm text-nb-muted">
                      You don&apos;t know the word. Bluff your way through.
                    </p>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-4">
                    <NbBadge color="var(--nb-green)">CIVILIAN</NbBadge>
                    <div className="rounded-[12px] border-2 border-black bg-white px-6 py-3 text-xl font-semibold">
                      Secret Word
                    </div>
                    <p className="text-sm text-nb-muted">
                      Give a one-word clue. Don&apos;t reveal the word.
                    </p>
                  </div>
                )}

                <NbButton
                  variant="secondary"
                  className="mt-6 w-full"
                  onClick={handleHide}
                >
                  GOT IT! HIDE
                </NbButton>
              </NbCard>
            </div>
          </div>

          {playerNumber > 1 && !revealed && (
            <NbButton className="w-full">EVERYONE READY! START ROUND 🎯</NbButton>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
