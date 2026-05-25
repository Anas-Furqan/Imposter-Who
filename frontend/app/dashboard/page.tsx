"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthGuard from "../../components/AuthGuard";
import BottomNav from "../../components/BottomNav";
import NbBadge from "../../components/ui/NbBadge";
import NbButton from "../../components/ui/NbButton";
import NbCard from "../../components/ui/NbCard";
import { api } from "../../lib/api";
import { useAuthStore } from "../../store/authStore";

const modes = [
  {
    emoji: "🎭",
    title: "Classic Mode",
    body: "Everyone gives clues. Find the impostor.",
    color: "var(--nb-yellow)",
  },
  {
    emoji: "❓",
    title: "Question Mode",
    body: "Answer questions. Spot the odd one out.",
    color: "var(--nb-blue)",
  },
  {
    emoji: "😀",
    title: "Emoji Mode",
    body: "Express using only emojis. No words allowed.",
    color: "var(--nb-pink)",
  },
  {
    emoji: "🤡",
    title: "Troll Mode",
    body: "Everyone is the impostor. Pure chaos.",
    color: "var(--nb-orange)",
  },
  {
    emoji: "🤖",
    title: "AI Mode",
    body: "Play solo against smart AI opponents.",
    color: "var(--nb-purple)",
  },
  {
    emoji: "✍️",
    title: "Custom Pack",
    body: "Play with your own word packs.",
    color: "var(--nb-green)",
  },
];

const fallbackLeaderboard = [
  { name: "Nova", xp: 1240 },
  { name: "Rogue", xp: 1180 },
  { name: "Echo", xp: 1125 },
  { name: "Blaze", xp: 980 },
  { name: "Luna", xp: 910 },
];

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [topPlayers, setTopPlayers] = useState(fallbackLeaderboard);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/user/leaderboard");
        setTopPlayers(response.data.slice(0, 5));
      } catch {
        toast.error("Failed to load leaderboard");
      }
    };

    load();
  }, []);
  return (
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+90px)] pt-6"
        >
          <header className="sticky top-0 z-10 -mx-5 flex items-center justify-between border-b-[2.5px] border-black bg-white px-5 py-3 shadow-[0_3px_0px_#000]">
            <div className="flex items-center gap-2 font-heading text-sm">
              <span>🕵️</span>
              IMPOSTER WHO?
            </div>
            <div className="flex items-center gap-2">
              <NbBadge color="var(--nb-yellow)">⚡ {user?.xp ?? 0} XP</NbBadge>
              <div className="h-8 w-8 rounded-full border-2 border-black bg-white text-center text-xs font-bold leading-7">
                {user?.username?.slice(0, 2).toUpperCase() || "IW"}
              </div>
            </div>
          </header>

          <NbCard bgColor="var(--nb-yellow)" className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-heading text-xl">PLAY WITH FRIENDS 🎉</h2>
                <p className="mt-2 text-sm text-nb-muted">
                  Pass the phone around, one device for everyone.
                </p>
              </div>
              <NbBadge color="var(--nb-surface)">PASS THE PHONE 📱</NbBadge>
            </div>
            <Link href="/game/setup" className="mt-4 inline-flex w-full">
              <NbButton variant="secondary" className="w-full">
                START GAME →
              </NbButton>
            </Link>
          </NbCard>

          <section>
            <h3 className="text-xs font-semibold uppercase text-nb-muted">
              Game Modes
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {modes.map((mode) => (
                <NbCard
                  key={mode.title}
                  bgColor={mode.color}
                  className="p-4"
                >
                  <div className="text-2xl">{mode.emoji}</div>
                  <h4 className="mt-2 font-heading text-sm text-black">
                    {mode.title}
                  </h4>
                  <p className="mt-1 text-xs text-nb-muted">{mode.body}</p>
                </NbCard>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-3 gap-3">
            {[
              { label: "Games Played", value: "48" },
              { label: "Games Won", value: "22" },
              { label: "Win Rate", value: "46%" },
            ].map((stat) => (
              <NbCard key={stat.label} className="p-3 text-center">
                <div className="font-mono text-lg font-bold">{stat.value}</div>
                <div className="text-[10px] uppercase text-nb-muted">
                  {stat.label}
                </div>
              </NbCard>
            ))}
          </section>

          <NbCard className="p-4" bgColor="var(--nb-surface)">
            <div className="flex items-center justify-between border-b-2 border-black pb-2">
              <h3 className="font-heading text-sm">🏆 TOP PLAYERS</h3>
              <Link href="/leaderboard" className="text-xs font-semibold underline">
                VIEW ALL →
              </Link>
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {topPlayers.map((player, index) => (
                <div
                  key={`${player.name}-${index}`}
                  className="flex items-center justify-between rounded-[12px] border-2 border-black bg-white px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    <NbBadge color="var(--nb-yellow)" size="sm">
                      #{index + 1}
                    </NbBadge>
                    <span className="text-sm font-semibold">{player.name}</span>
                  </div>
                  <span className="font-mono text-xs">{player.xp} XP</span>
                </div>
              ))}
            </div>
          </NbCard>
        </motion.main>
        <BottomNav />
      </div>
    </AuthGuard>
  );
}
