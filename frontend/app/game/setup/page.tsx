"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const modes = ["Classic", "Question", "Emoji", "Troll", "AI"];

const packs = [
  { name: "Animals", emoji: "🐾", count: 40 },
  { name: "Food", emoji: "🍕", count: 40 },
  { name: "Countries", emoji: "🌍", count: 30 },
  { name: "Cities", emoji: "🏙️", count: 30 },
  { name: "Movies", emoji: "🎬", count: 30 },
  { name: "Music", emoji: "🎵", count: 30 },
  { name: "Nature", emoji: "🌿", count: 30 },
  { name: "Science", emoji: "🔬", count: 30 },
  { name: "Celebrities", emoji: "⭐", count: 26 },
  { name: "Cars", emoji: "🚗", count: 30 },
  { name: "Gaming", emoji: "🎮", count: 30 },
  { name: "Anime", emoji: "🎌", count: 30 },
  { name: "K-Pop", emoji: "🎤", count: 30 },
  { name: "Superheroes", emoji: "🦸", count: 30 },
  { name: "Football", emoji: "⚽", count: 30 },
  { name: "Make-up", emoji: "💄", count: 30 },
  { name: "Nostalgia", emoji: "🌟", count: 30 },
  { name: "My Custom Packs", emoji: "➕", count: 0 },
];

export default function GameSetupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/game/players");
  }, [router]);

  return null;
}
