"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthGuard from "../../components/AuthGuard";
import NbBadge from "../../components/ui/NbBadge";
import NbButton from "../../components/ui/NbButton";
import NbCard from "../../components/ui/NbCard";
import { api } from "../../lib/api";

const fallbackHistory = [
  { mode: "Classic", pack: "Animals", win: true, xp: 75, date: "Today" },
  { mode: "Emoji", pack: "Movies", win: false, xp: 10, date: "Yesterday" },
  { mode: "AI", pack: "Science", win: true, xp: 50, date: "2 days ago" },
];

type GameHistory = {
  mode: string;
  pack_name: string;
  won: boolean;
  xp_earned: number;
  created_at: string;
};

export default function ProfilePage() {
  return null;

  const [history, setHistory] = useState(fallbackHistory);
  const [profile, setProfile] = useState({
    username: "Player",
    email: "player@email.com",
    xp: 0,
    gamesPlayed: 0,
    gamesWon: 0,
  });

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/user/profile");
        const user = response.data.user;
        setProfile({
          username: user.username,
          email: user.email,
          xp: user.xp,
          gamesPlayed: user.games_played,
          gamesWon: user.games_won,
        });
        setHistory(
          (response.data.history || []).map((item: GameHistory) => ({
            mode: item.mode,
            pack: item.pack_name,
            win: item.won,
            xp: item.xp_earned,
            date: new Date(item.created_at).toLocaleDateString(),
          }))
        );
      } catch {
        toast.error("Failed to load profile");
      }
    };

    load();
  }, []);

  const xp = profile.xp;
  const level = "Detective";
  const nextLevelXp = 500;
  const progress = Math.min(100, Math.round((xp / nextLevelXp) * 100));

  return (
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
          <header className="flex items-center justify-between">
            <h1 className="font-heading text-2xl">PROFILE</h1>
            <Link href="/dashboard" className="text-lg font-semibold">
              ✕
            </Link>
          </header>

          <NbCard bgColor="var(--nb-yellow)" className="p-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-bold">
              {profile.username.slice(0, 2).toUpperCase()}
            </div>
            <h2 className="mt-3 text-lg font-semibold">{profile.username}</h2>
            <p className="text-xs text-nb-muted">{profile.email}</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs">
              <NbBadge color="var(--nb-surface)">{level}</NbBadge>
              <NbBadge color="var(--nb-surface)">{profile.xp} XP</NbBadge>
            </div>
          </NbCard>

          <NbCard bgColor="var(--nb-surface)" className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">XP Progress</p>
              <span className="text-xs text-nb-muted">
                {profile.xp}/{nextLevelXp}
              </span>
            </div>
            <div className="mt-3 h-3 w-full rounded-full border-2 border-black bg-white">
              <div
                className="h-full rounded-full bg-black"
                style={{ width: `${progress}%` }}
              />
            </div>
          </NbCard>

          <section className="grid grid-cols-3 gap-3">
            {[
              { label: "Played", value: profile.gamesPlayed.toString() },
              { label: "Won", value: profile.gamesWon.toString() },
              {
                label: "Win Rate",
                value:
                  profile.gamesPlayed > 0
                    ? `${Math.round(
                        (profile.gamesWon / profile.gamesPlayed) * 100
                      )}%`
                    : "0%",
              },
            ].map((stat) => (
              <NbCard key={stat.label} className="px-3 py-3 text-center">
                <div className="font-mono text-lg font-bold">{stat.value}</div>
                <div className="text-[10px] uppercase text-nb-muted">
                  {stat.label}
                </div>
              </NbCard>
            ))}
          </section>

          <section>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase text-nb-muted">
                Recent Games
              </h3>
              <button className="text-xs font-semibold underline">Edit Profile</button>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              {history.map((item) => (
                <NbCard
                  key={`${item.mode}-${item.date}`}
                  bgColor="var(--nb-surface)"
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div>
                    <div className="text-sm font-semibold">
                      {item.mode} · {item.pack}
                    </div>
                    <div className="text-xs text-nb-muted">{item.date}</div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-xs font-semibold ${
                        item.win ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {item.win ? "Win" : "Loss"}
                    </div>
                    <div className="text-xs text-nb-muted">+{item.xp} XP</div>
                  </div>
                </NbCard>
              ))}
            </div>
          </section>

          <NbButton variant="secondary" className="w-full">
            SIGN OUT
          </NbButton>
        </main>
      </div>
    </AuthGuard>
  );
}
