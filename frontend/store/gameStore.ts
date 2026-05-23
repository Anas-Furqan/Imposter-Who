import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { GameState } from "../lib/gameEngine";

interface GameStore {
  gameState: GameState | null;
  setGameState: (state: GameState) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set) => ({
      gameState: null,
      setGameState: (state) => set({ gameState: state }),
      resetGame: () => set({ gameState: null }),
    }),
    { name: "imposter-game" }
  )
);
