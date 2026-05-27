"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import NbBadge from "../../../components/ui/NbBadge";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";
import NbInput from "../../../components/ui/NbInput";
import { useGameStore } from "../../../store/gameStore";

const MAX_PLAYERS = 20;
const MIN_PLAYERS = 3;

export default function PlayersPage() {
  const router = useRouter();
  const storedPlayers = useGameStore((state) => state.players);
  const setPlayers = useGameStore((state) => state.setPlayers);
  const [input, setInput] = useState("");
  const [names, setNames] = useState<string[]>(() =>
    storedPlayers.map((player) => player.name)
  );

  useEffect(() => {
    if (!names.length && storedPlayers.length) {
      setNames(storedPlayers.map((player) => player.name));
    }
  }, [names.length, storedPlayers]);

  const playerCount = names.length;
  const canProceed = playerCount >= MIN_PLAYERS;

  const addPlayer = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }
    if (trimmed.length > 20) {
      toast.error("Player name must be 20 characters or less");
      return;
    }
    if (names.some((name) => name.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Player name already added");
      return;
    }
    if (names.length >= MAX_PLAYERS) {
      toast.error("Maximum 20 players");
      return;
    }
    setNames((prev) => [...prev, trimmed]);
    setInput("");
  };

  const removePlayer = (index: number) => {
    setNames((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleNext = () => {
    if (!canProceed) {
      toast.error("Add at least 3 players to continue");
      return;
    }
    setPlayers(names);
    router.push("/game/pack");
  };

  const listVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-nb-bg text-nb-text">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+120px)] pt-6">
        <header className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="text-lg font-semibold"
          >
            ←
          </button>
          <div>
            <h1 className="font-heading text-2xl">WHO'S PLAYING? 👥</h1>
            <p className="text-xs text-nb-muted">Add at least 3 players</p>
          </div>
        </header>

        <div className="flex items-end gap-2">
          <div className="flex-1">
            <NbInput
              label="Player name"
              placeholder="Enter player name..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addPlayer();
                }
              }}
            />
          </div>
          <NbButton size="sm" variant="secondary" onClick={addPlayer}>
            ADD PLAYER +
          </NbButton>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase text-nb-muted">
            Players
          </h2>
          <NbBadge size="sm" color="var(--nb-yellow)">
            {playerCount} / {MAX_PLAYERS} PLAYERS
          </NbBadge>
        </div>

        <AnimatePresence mode="popLayout">
          {names.map((name, index) => (
            <motion.div
              key={`${name}-${index}`}
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <NbCard className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <NbBadge size="sm" color="var(--nb-surface)">
                    #{index + 1}
                  </NbBadge>
                  <span className="font-heading text-sm">{name}</span>
                </div>
                <NbButton
                  size="sm"
                  variant="ghost"
                  onClick={() => removePlayer(index)}
                  className="h-8 px-2 text-nb-red"
                >
                  ✕
                </NbButton>
              </NbCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] bg-nb-bg px-5 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] pt-3">
        <NbButton
          className="w-full"
          disabled={!canProceed}
          onClick={handleNext}
        >
          NEXT: CHOOSE PACK →
        </NbButton>
      </div>
    </div>
  );
}
