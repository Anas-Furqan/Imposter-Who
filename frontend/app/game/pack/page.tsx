"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import NbBadge from "../../../components/ui/NbBadge";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";
import NbInput from "../../../components/ui/NbInput";
import NbTag from "../../../components/ui/NbTag";
import { api } from "../../../lib/api";
import { useGameStore } from "../../../store/gameStore";

const cardColors = [
  "#FFF9E6",
  "#F0FFF4",
  "#FFF0F6",
  "#F0F4FF",
  "#FFF5F0",
  "#F5F0FF",
];

type Pack = {
  id: string;
  name: string;
  emoji: string;
  category: string;
  wordCount: number;
};

export default function PackPage() {
  const router = useRouter();
  const players = useGameStore((state) => state.players);
  const selectedPackId = useGameStore((state) => state.selectedPackId);
  const selectedPackName = useGameStore((state) => state.selectedPackName);
  const selectedPackEmoji = useGameStore((state) => state.selectedPackEmoji);
  const selectPack = useGameStore((state) => state.selectPack);
  const initGame = useGameStore((state) => state.initGame);

  const [tab, setTab] = useState<"built-in" | "custom">("built-in");
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customName, setCustomName] = useState("");
  const [customInput, setCustomInput] = useState("");
  const [customWords, setCustomWords] = useState<string[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(useGameStore.persist.hasHydrated());
    const unsubscribe = useGameStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (hasHydrated && players.length < 3) {
      router.replace("/game/players");
    }
  }, [hasHydrated, players.length, router]);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<Pack[]>("/packs");
        setPacks(response.data || []);
      } catch {
        setError("Failed to load pack. Check your connection.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const customReady = customWords.length >= 10;
  const hasSelectedPack = Boolean(selectedPackId);
  const canStart = tab === "custom" ? customReady : hasSelectedPack;

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    api
      .get<Pack[]>("/packs")
      .then((response) => setPacks(response.data || []))
      .catch(() => setError("Failed to load pack. Check your connection."))
      .finally(() => setLoading(false));
  };

  const addCustomWord = () => {
    const trimmed = customInput.trim();
    if (!trimmed) {
      return;
    }
    if (customWords.some((word) => word.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Word already added");
      return;
    }
    setCustomWords((prev) => [...prev, trimmed]);
    setCustomInput("");
  };

  const removeCustomWord = (word: string) => {
    setCustomWords((prev) => prev.filter((item) => item !== word));
  };

  const handleStart = async () => {
    if (!canStart) {
      return;
    }

    try {
      let words: string[] = [];
      let packName = selectedPackName;
      let packEmoji = selectedPackEmoji;

      if (tab === "custom") {
        words = customWords;
        packName = customName.trim() || "Custom Pack";
        packEmoji = "✍️";
        selectPack("custom", packName, packEmoji);
      } else if (selectedPackId) {
        const response = await api.get<{ words: string[] }>(
          `/packs/${selectedPackId}/words`
        );
        words = response.data.words || [];
      }

      if (!words.length) {
        toast.error("Failed to load pack. Check your connection.");
        return;
      }

      initGame(words);
      router.replace("/game/reveal");
    } catch {
      toast.error("Failed to load pack. Check your connection.");
    }
  };

  const playerCountLabel = useMemo(
    () => `${players.length} Players`,
    [players.length]
  );

  if (!hasHydrated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-nb-bg text-nb-text">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+120px)] pt-6">
        <header className="flex items-center gap-3">
          <button
            onClick={() => router.push("/game/players")}
            className="text-lg font-semibold"
          >
            ←
          </button>
          <div>
            <h1 className="font-heading text-2xl">CHOOSE A PACK 📦</h1>
            <NbBadge size="sm" color="var(--nb-yellow)" className="mt-2">
              👥 {playerCountLabel}
            </NbBadge>
          </div>
        </header>

        <div className="flex gap-2 rounded-full border-2 border-black bg-white p-1">
          <button
            onClick={() => setTab("built-in")}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
              tab === "built-in" ? "bg-[var(--nb-yellow)]" : "text-nb-muted"
            }`}
          >
            BUILT-IN PACKS
          </button>
          <button
            onClick={() => setTab("custom")}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
              tab === "custom" ? "bg-[var(--nb-yellow)]" : "text-nb-muted"
            }`}
          >
            CUSTOM PACK
          </button>
        </div>

        {tab === "built-in" && (
          <div className="flex flex-col gap-4">
            {loading && (
              <div className="grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="h-24 rounded-[14px] border-2 border-dashed border-black/40 bg-white/60"
                  />
                ))}
              </div>
            )}

            {error && (
              <NbCard className="p-4" bgColor="var(--nb-surface)">
                <p className="text-sm text-nb-muted">{error}</p>
                <NbButton
                  size="sm"
                  variant="secondary"
                  className="mt-3"
                  onClick={handleRetry}
                >
                  RETRY
                </NbButton>
              </NbCard>
            )}

            {!loading && !error && (
              <div className="grid grid-cols-2 gap-3">
                {packs.map((pack, index) => {
                  const isSelected = selectedPackId === pack.id;
                  return (
                    <motion.button
                      key={pack.id}
                      whileHover={{ y: -4 }}
                      onClick={() => selectPack(pack.id, pack.name, pack.emoji)}
                      className={`rounded-[16px] border-2 px-3 py-3 text-left shadow-[6px_6px_0px_#000] ${
                        isSelected
                          ? "border-black bg-[var(--nb-yellow)]"
                          : "border-black"
                      }`}
                      style={{
                        backgroundColor: isSelected
                          ? "var(--nb-yellow)"
                          : cardColors[index % cardColors.length],
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{pack.emoji}</span>
                        {isSelected && (
                          <NbBadge size="sm" color="var(--nb-green)">
                            ✓
                          </NbBadge>
                        )}
                      </div>
                      <div className="mt-2 font-heading text-sm">
                        {pack.name}
                      </div>
                      <div className="text-xs font-mono text-nb-muted">
                        {pack.wordCount} words
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === "custom" && (
          <NbCard className="p-5" bgColor="var(--nb-surface)">
            <NbInput
              label="Pack name (optional)"
              placeholder="My Custom Pack"
              value={customName}
              onChange={(event) => setCustomName(event.target.value)}
            />

            <div className="mt-4">
              <NbInput
                label="Add words"
                placeholder="Type a word, press Enter to add"
                value={customInput}
                onChange={(event) => setCustomInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addCustomWord();
                  }
                }}
              />
              <NbButton
                size="sm"
                variant="secondary"
                className="mt-2"
                onClick={addCustomWord}
              >
                ADD WORD
              </NbButton>
            </div>

            <p
              className={`mt-3 text-xs font-mono ${
                customReady ? "text-nb-muted" : "text-nb-red"
              }`}
            >
              {customWords.length} words added (min 10)
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <AnimatePresence>
                {customWords.map((word) => (
                  <motion.div
                    key={word}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                  >
                    <NbTag onRemove={() => removeCustomWord(word)}>
                      {word}
                    </NbTag>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <NbButton
              className="mt-4"
              disabled={!customReady}
              onClick={() => {
                if (!customReady) {
                  toast.error("Add at least 10 words to continue");
                  return;
                }
                selectPack(
                  "custom",
                  customName.trim() || "Custom Pack",
                  "✍️"
                );
              }}
            >
              USE THIS PACK →
            </NbButton>
          </NbCard>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[480px] bg-nb-bg px-5 pb-[calc(env(safe-area-inset-bottom,0px)+20px)] pt-3">
        <NbButton className="w-full" disabled={!canStart} onClick={handleStart}>
          START GAME 🎮
        </NbButton>
      </div>
    </div>
  );
}
