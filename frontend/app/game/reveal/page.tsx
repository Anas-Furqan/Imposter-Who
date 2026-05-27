"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import NbBadge from "../../../components/ui/NbBadge";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";
import { useGameStore } from "../../../store/gameStore";

const HOLD_DURATION_MS = 1500;

export default function RevealPage() {
  const router = useRouter();
  const players = useGameStore((state) => state.players);
  const currentRevealIndex = useGameStore((state) => state.currentRevealIndex);
  const revealNext = useGameStore((state) => state.revealNext);

  const [isRevealed, setIsRevealed] = useState(false);
  const [hasHiddenAfterReveal, setHasHiddenAfterReveal] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const [hasHydrated, setHasHydrated] = useState(false);

  const holdTimeoutRef = useRef<number | null>(null);
  const holdStartRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const currentPlayer = players[currentRevealIndex];
  const totalPlayers = players.length;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHydrated(useGameStore.persist.hasHydrated());
    const unsubscribe = useGameStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (hasHydrated && !players.length) {
      router.replace("/game/players");
    }
  }, [hasHydrated, players.length, router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsRevealed(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasHiddenAfterReveal(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHolding(false);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHoldProgress(0);
    holdStartRef.current = null;
    if (holdTimeoutRef.current) {
      window.clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, [currentRevealIndex]);

  const stopHold = () => {
    if (holdTimeoutRef.current) {
      window.clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    holdStartRef.current = null;
    setIsHolding(false);
    setHoldProgress(0);
  };

  const handleHoldStart = () => {
    if (isRevealed) {
      return;
    }
    setIsHolding(true);
    holdStartRef.current = performance.now();

    const tick = (now: number) => {
      if (!holdStartRef.current) {
        return;
      }
      const elapsed = now - holdStartRef.current;
      const progress = Math.min(elapsed / HOLD_DURATION_MS, 1);
      setHoldProgress(progress);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    holdTimeoutRef.current = window.setTimeout(() => {
      setIsHolding(false);
      setHoldProgress(1);
      setIsRevealed(true);
    }, HOLD_DURATION_MS);
  };

  const handleHoldEnd = () => {
    if (isRevealed) {
      return;
    }
    stopHold();
  };

  const handleHide = () => {
    setIsRevealed(false);
    setHasHiddenAfterReveal(true);
    setHoldProgress(0);
  };

  const handleNext = () => {
    revealNext();
    if (currentRevealIndex >= totalPlayers - 1) {
      router.replace("/game/start");
    }
  };

  const ringRadius = 160;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference * (1 - holdProgress);

  const isImpostor = Boolean(currentPlayer?.isImpostor);
  const showNextButton = hasHiddenAfterReveal;
  const isLastPlayer = currentRevealIndex >= totalPlayers - 1;

  const playerStatus = useMemo(() => {
    if (!currentPlayer) return "";
    return `${currentPlayer.name}&apos;S TURN`;
  }, [currentPlayer]);

  if (!hasHydrated || !currentPlayer) {
    return null;
  }

  return (
    <div className="min-h-screen bg-nb-bg text-nb-text">
      <main className="mx-auto flex w-full max-w-[520px] flex-col items-center gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <div className="text-center">
          <p className="font-mono text-xs text-nb-muted">
            PLAYER {currentRevealIndex + 1} OF {totalPlayers}
          </p>
          <h1 className="mt-2 font-heading text-2xl">{playerStatus}</h1>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPlayer.id}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-[420px]"
          >
            {isHolding && (
              <svg
                className="pointer-events-none absolute inset-0 z-10"
                viewBox="0 0 360 360"
              >
                <circle
                  cx="180"
                  cy="180"
                  r={ringRadius}
                  stroke="#FF3B5C"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={ringCircumference}
                  strokeDashoffset={ringOffset}
                  strokeLinecap="round"
                />
              </svg>
            )}

            <motion.div
              className="relative h-[340px] w-full"
              style={{ perspective: "1200px" }}
              animate={{ rotateY: isRevealed ? 180 : 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}
                onPointerDown={handleHoldStart}
                onPointerUp={handleHoldEnd}
                onPointerLeave={handleHoldEnd}
              >
                <NbCard
                  bgColor="#FFE135"
                  className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
                  style={{ boxShadow: "10px 10px 0px #000" }}
                >
                  <div className="font-heading text-7xl">?</div>
                  <div className="text-sm font-medium">
                    HOLD TO REVEAL 👇
                  </div>
                  <p className="text-xs text-nb-muted">
                    Keep screen hidden from others
                  </p>
                </NbCard>
              </div>

              <div
                className="absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <NbCard
                  bgColor={isImpostor ? "#FF3B5C" : "#00C875"}
                  className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center"
                  style={{ boxShadow: "10px 10px 0px #000" }}
                >
                  {isImpostor ? (
                    <motion.div
                      animate={
                        isRevealed
                          ? { x: [0, -12, 12, -8, 8, -4, 4, 0] }
                          : { x: 0 }
                      }
                      transition={{ duration: 0.5 }}
                      className="flex h-full flex-col items-center justify-center gap-4"
                    >
                      <NbBadge color="#FF3B5C">
                        🔴 YOU&apos;RE THE IMPOSTOR
                      </NbBadge>
                      <p className="font-heading text-xl text-white">
                        YOU DON&apos;T KNOW THE WORD
                      </p>
                      <div className="w-full rounded-[12px] border-2 border-black bg-white px-4 py-3">
                        <p className="text-[11px] font-semibold uppercase text-nb-muted">
                          Your hint:
                        </p>
                        <p className="mt-1 font-heading text-lg">
                          {currentPlayer.word}
                        </p>
                      </div>
                      <p className="text-xs text-white/80">
                        Blend in. Act like you know the word!
                      </p>
                    </motion.div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                      <NbBadge color="#00C875">
                        🟢 YOU&apos;RE A CIVILIAN
                      </NbBadge>
                      <div className="font-heading text-4xl text-black">
                        <span className="inline-block bg-[#FFE135] px-4 py-2">
                          {currentPlayer.word}
                        </span>
                      </div>
                      <p className="text-xs text-nb-muted">
                        Remember this word. Give clever hints!
                      </p>
                    </div>
                  )}

                  <NbButton
                    variant="secondary"
                    className="w-full"
                    onClick={handleHide}
                  >
                    HIDE CARD 🙈
                  </NbButton>
                </NbCard>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {players.map((player, index) => {
            const isCurrent = index === currentRevealIndex;
            const isDone = player.hasRevealed;
            return (
              <span
                key={player.id}
                className={`h-3 w-3 rounded-full border-2 border-black ${
                  isCurrent
                    ? "bg-[var(--nb-yellow)] animate-pulse"
                    : isDone
                    ? "bg-black"
                    : "bg-white"
                }`}
              />
            );
          })}
        </div>

        {showNextButton && (
          <NbButton className="w-full" onClick={handleNext}>
            {isLastPlayer ? "START THE GAME 🎯" : "NEXT PLAYER →"}
          </NbButton>
        )}
      </main>
    </div>
  );
}
