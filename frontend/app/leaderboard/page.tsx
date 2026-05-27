"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthGuard from "../../components/AuthGuard";
import NbBadge from "../../components/ui/NbBadge";
import NbCard from "../../components/ui/NbCard";
import { api } from "../../lib/api";

const fallbackTopThree = [
  { name: "Nova", xp: 1520, rank: 1 },
  { name: "Echo", xp: 1380, rank: 2 },
  { name: "Luna", xp: 1290, rank: 3 },
];

const fallbackPlayers = [
  { name: "Nova", xp: 1520 },
  { name: "Echo", xp: 1380 },
  { name: "Luna", xp: 1290 },
  { name: "Blaze", xp: 1180 },
  { name: "Jade", xp: 1110 },
  { name: "Rex", xp: 980 },
  { name: "Kai", xp: 940 },
  { name: "Mia", xp: 910 },
  { name: "Leo", xp: 880 },
  { name: "Zoe", xp: 860 },
];

export default function LeaderboardPage() {
  return null;

  const [tab, setTab] = useState<"week" | "all">("week");
  const [topThree, setTopThree] = useState(fallbackTopThree);
  const [players, setPlayers] = useState(fallbackPlayers);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/user/leaderboard");
        const list = response.data || [];
        setPlayers(list);
        setTopThree(
          list.slice(0, 3).map((player: any, index: number) => ({
            name: player.username,
            xp: player.xp,
            rank: index + 1,
          }))
        );
      } catch {
        toast.error("Failed to load leaderboard");
      }
    };

    load();
  }, [tab]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl">LEADERBOARD</h1>
              <p className="text-sm text-nb-muted">
                See who is leading the pack.
              </p>
            </div>
            <Link href="/dashboard" className="text-lg font-semibold">
              ✕
            </Link>
          </header>

          <div className="flex gap-2 rounded-full border-2 border-black bg-white p-1">
            <button
              onClick={() => setTab("week")}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
                tab === "week" ? "bg-[var(--nb-yellow)]" : "text-nb-muted"
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTab("all")}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
                tab === "all" ? "bg-[var(--nb-yellow)]" : "text-nb-muted"
              }`}
            >
              All Time
            </button>
          </div>

          <section className="grid grid-cols-3 gap-3">
            {topThree.map((player) => (
              <NbCard
                key={player.rank}
                bgColor={
                  player.rank === 1
                    ? "var(--nb-yellow)"
                    : player.rank === 2
                    ? "var(--nb-blue)"
                    : "var(--nb-pink)"
                }
                className="px-3 py-4 text-center"
              >
                <div className="text-2xl">
                  {player.rank === 1 ? "👑" : player.rank === 2 ? "🥈" : "🥉"}
                </div>
                <div className="mt-2 text-sm font-semibold">{player.name}</div>
                <div className="text-xs text-nb-muted">{player.xp} XP</div>
              </NbCard>
            ))}
          </section>

          <NbCard bgColor="var(--nb-surface)" className="p-4">
            <div className="flex flex-col gap-3">
              {players.map((player, index) => (
                <div
                  key={player.name}
                  className={`flex items-center justify-between rounded-[12px] border-2 px-4 py-3 ${
                    player.name === "Nova"
                      ? "border-black bg-[var(--nb-yellow)]"
                      : "border-black bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <NbBadge color="var(--nb-surface)">#{index + 1}</NbBadge>
                    <span className="text-sm font-semibold">{player.name}</span>
                  </div>
                  <span className="text-xs font-semibold">
                    {player.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </NbCard>
        </main>
      </div>
    </AuthGuard>
  );
}
