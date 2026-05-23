import { questionPairs } from "./questionPairs";

export type GameMode = "classic" | "question" | "emoji" | "troll" | "ai";

export interface GameConfig {
  mode: GameMode;
  playerCount: number;
  impostorCount: number;
  packId: string;
  words: string[];
  hintsEnabled: boolean;
  votingType: "open" | "secret";
}

export interface Player {
  id: string;
  name: string;
  isImpostor: boolean;
}

export interface GameState {
  config: GameConfig;
  players: Player[];
  currentWord: string;
  impostorIndices: number[];
  phase: "reveal" | "play" | "vote" | "result";
  votes: Record<string, string>;
  round: number;
}

export const assignRoles = (playerCount: number, impostorCount: number) => {
  const indices = new Set<number>();
  while (indices.size < impostorCount) {
    indices.add(Math.floor(Math.random() * playerCount));
  }
  return Array.from({ length: playerCount }, (_v, index) =>
    indices.has(index)
  );
};

export const initGame = (config: GameConfig): GameState => {
  const currentWord =
    config.words[Math.floor(Math.random() * config.words.length)] || "";
  const impostorFlags = assignRoles(config.playerCount, config.impostorCount);
  const players: Player[] = impostorFlags.map((flag, index) => ({
    id: `player-${index + 1}`,
    name: `Player ${index + 1}`,
    isImpostor: flag,
  }));

  const impostorIndices = impostorFlags
    .map((flag, index) => (flag ? index : -1))
    .filter((value) => value >= 0);

  return {
    config,
    players,
    currentWord,
    impostorIndices,
    phase: "reveal",
    votes: {},
    round: 1,
  };
};

export const getPlayerCard = (gameState: GameState, playerIndex: number) => {
  const player = gameState.players[playerIndex];
  if (!player) {
    return { isImpostor: false };
  }

  if (gameState.config.mode === "question") {
    const pair = questionPairs[gameState.currentWord] || {
      civilian: `What do you love about ${gameState.currentWord}?`,
      impostor: `What do you love about something like ${gameState.currentWord}?`,
    };

    return {
      isImpostor: player.isImpostor,
      question: player.isImpostor ? pair.impostor : pair.civilian,
    };
  }

  return {
    isImpostor: player.isImpostor,
    word: player.isImpostor ? undefined : gameState.currentWord,
  };
};

export const calculateVoteResult = (votes: Record<string, string>) => {
  const tally: Record<string, number> = {};
  Object.values(votes).forEach((name) => {
    tally[name] = (tally[name] || 0) + 1;
  });

  const maxVotes = Math.max(...Object.values(tally), 0);
  const top = Object.entries(tally)
    .filter(([, count]) => count === maxVotes)
    .map(([name]) => name);

  if (top.length === 0) return "";
  return top[Math.floor(Math.random() * top.length)];
};

export const calculateXP = (
  won: boolean,
  wasImpostor: boolean,
  _playerCount: number
) => {
  if (won && wasImpostor) return 75;
  if (won) return 50;
  return 10;
};
