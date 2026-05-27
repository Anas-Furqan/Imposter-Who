"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";
import { useGameStore } from "../../../store/gameStore";

export default function GameStartPage() {
  const router = useRouter();
  const players = useGameStore((state) => state.players);
  const gamePhase = useGameStore((state) => state.gamePhase);
  const setPlayers = useGameStore((state) => state.setPlayers);
  const resetGame = useGameStore((state) => state.resetGame);

  const [starter, setStarter] = useState<string>("");
  const [hasHydrated, setHasHydrated] = useState(false);

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
    if (hasHydrated && (players.length === 0 || gamePhase !== "start")) {
      router.replace("/game/players");
      return;
    }
    if (hasHydrated && !starter && players.length) {
      const randomName = players[Math.floor(Math.random() * players.length)].name;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStarter(randomName);
    }
  }, [hasHydrated, players, gamePhase, router, starter]);

  const handleReroll = () => {
    if (!players.length) return;
    const randomName = players[Math.floor(Math.random() * players.length)].name;
    setStarter(randomName);
  };

  const playerCountLabel = useMemo(
    () => `👥 ${players.length} players | 🔴 1 impostor`,
    [players.length]
  );

  if (!hasHydrated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-nb-bg text-nb-text">
      <main className="mx-auto flex w-full max-w-[480px] flex-col items-center gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-10 text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
          className="text-5xl"
        >
          🎉
        </motion.div>
        <h1 className="font-heading text-2xl">ALL SET! LET&apos;S PLAY 🎉</h1>

        <NbCard
          bgColor="var(--nb-yellow)"
          className="w-full -rotate-1 px-5 py-6 text-left"
        >
          <p className="text-xs font-semibold uppercase text-nb-muted">
            GOES FIRST:
          </p>
          <div className="mt-2 flex items-center justify-between">
            <span className="font-heading text-3xl">{starter || "Player"}</span>
            <motion.button
              onClick={handleReroll}
              whileTap={{ rotate: 180 }}
              className="text-2xl"
              aria-label="Reroll"
            >
              🎲
            </motion.button>
          </div>
          <p className="mt-3 text-sm text-nb-muted">
            Start by giving a one-word hint about the secret word.
          </p>
        </NbCard>

        <div className="grid w-full grid-cols-2 gap-3">
          <NbCard bgColor="var(--nb-green)" className="px-3 py-3">
            <p className="font-heading text-xs text-white">
              🟢 Civilians: Give hints about the secret word
            </p>
          </NbCard>
          <NbCard bgColor="var(--nb-red)" className="px-3 py-3">
            <p className="font-heading text-xs text-white">
              🔴 Impostor: Blend in! You have a hint, not the real word.
            </p>
          </NbCard>
        </div>

        <p className="text-xs text-nb-muted">{playerCountLabel}</p>

        <div className="flex w-full flex-col gap-3">
          <NbButton
            variant="secondary"
            className="w-full"
            onClick={() => {
              const names = players.map((player) => player.name);
              setPlayers(names);
              router.push("/game/pack");
            }}
          >
            PLAY AGAIN WITH SAME PLAYERS 🔄
          </NbButton>
          <NbButton
            variant="ghost"
            className="w-full"
            onClick={() => {
              resetGame();
              router.push("/game/players");
            }}
          >
            NEW GAME (CHANGE PLAYERS) 🏠
          </NbButton>
        </div>
      </main>
    </div>
  );
}
