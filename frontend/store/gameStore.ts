import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateHint } from "../lib/generateHint";

export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
  word: string;
  hasRevealed: boolean;
}

export interface GameState {
  players: Player[];
  selectedPackId: string | null;
  selectedPackName: string;
  selectedPackEmoji: string;
  currentRevealIndex: number;
  gamePhase: "idle" | "players" | "pack" | "reveal" | "start";
  impostorIndex: number;
  secretWord: string;
  impostorHint: string;
  setPlayers: (names: string[]) => void;
  selectPack: (id: string, name: string, emoji: string) => void;
  initGame: (words: string[]) => void;
  revealNext: () => void;
  resetGame: () => void;
}

const createId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);

const initialState = {
  players: [] as Player[],
  selectedPackId: null as string | null,
  selectedPackName: "",
  selectedPackEmoji: "",
  currentRevealIndex: 0,
  gamePhase: "idle" as const,
  impostorIndex: -1,
  secretWord: "",
  impostorHint: "",
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...initialState,
      setPlayers: (names) =>
        set({
          ...initialState,
          players: names.map((name) => ({
            id: createId(),
            name,
            isImpostor: false,
            word: "",
            hasRevealed: false,
          })),
          gamePhase: "players",
        }),
      selectPack: (id, name, emoji) =>
        set({
          selectedPackId: id,
          selectedPackName: name,
          selectedPackEmoji: emoji,
          gamePhase: "pack",
        }),
      initGame: (words) =>
        set((state) => {
          if (!state.players.length || !words.length) {
            return state;
          }
          const secretWord =
            words[Math.floor(Math.random() * words.length)];
          const impostorIndex = Math.floor(
            Math.random() * state.players.length
          );
          const impostorHint = generateHint(
            secretWord,
            state.selectedPackName || "Unknown"
          );
          const updatedPlayers = state.players.map((player, index) => ({
            ...player,
            isImpostor: index === impostorIndex,
            word: index === impostorIndex ? impostorHint : secretWord,
            hasRevealed: false,
          }));

          return {
            players: updatedPlayers,
            impostorIndex,
            secretWord,
            impostorHint,
            currentRevealIndex: 0,
            gamePhase: "reveal",
          };
        }),
      revealNext: () =>
        set((state) => {
          if (!state.players.length) {
            return state;
          }
          const currentIndex = state.currentRevealIndex;
          const updatedPlayers = state.players.map((player, index) =>
            index === currentIndex
              ? { ...player, hasRevealed: true }
              : player
          );
          const isLast = currentIndex >= updatedPlayers.length - 1;

          return {
            players: updatedPlayers,
            currentRevealIndex: isLast ? currentIndex : currentIndex + 1,
            gamePhase: isLast ? "start" : "reveal",
          };
        }),
      resetGame: () => set({ ...initialState }),
    }),
    { name: "imposter-game" }
  )
);
