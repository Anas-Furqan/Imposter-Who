import { hintMap } from "./hintMap";

export function generateHint(word: string, packName: string): string {
  const normalized = word.trim().toLowerCase();
  return (
    hintMap[normalized] || `It's related to the category: ${packName}`
  );
}
