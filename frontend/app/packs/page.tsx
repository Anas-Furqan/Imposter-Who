"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AuthGuard from "../../components/AuthGuard";
import NbBadge from "../../components/ui/NbBadge";
import NbButton from "../../components/ui/NbButton";
import NbCard from "../../components/ui/NbCard";
import { api } from "../../lib/api";
import { useAuthStore } from "../../store/authStore";

const fallbackMyPacks = [
  { name: "Night City", emoji: "🌃", count: 28, isPublic: false },
  { name: "Retro Tech", emoji: "📼", count: 40, isPublic: true },
];

const fallbackCommunityPacks = [
  { name: "Dream Jobs", emoji: "💼", count: 36, author: "Nova" },
  { name: "Street Food", emoji: "🌮", count: 42, author: "Echo" },
  { name: "Space",
    emoji: "🚀",
    count: 30,
    author: "Luna",
  },
];

type CustomPack = {
  user_id: string;
  name: string;
  emoji: string;
  words?: string[];
  is_public: boolean;
};

export default function PacksPage() {
  const [tab, setTab] = useState<"my" | "community">("my");
  const user = useAuthStore((state) => state.user);
  const [myPacks, setMyPacks] = useState(fallbackMyPacks);
  const [communityPacks, setCommunityPacks] = useState(fallbackCommunityPacks);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/packs/custom");
        const items = response.data || [];
        setMyPacks(
          items
            .filter((pack: CustomPack) => pack.user_id === user?.id)
            .map((pack: CustomPack) => ({
              name: pack.name,
              emoji: pack.emoji,
              count: pack.words?.length || 0,
              isPublic: pack.is_public,
            }))
        );
        setCommunityPacks(
          items
            .filter((pack: CustomPack) => pack.is_public && pack.user_id !== user?.id)
            .map((pack: CustomPack) => ({
              name: pack.name,
              emoji: pack.emoji,
              count: pack.words?.length || 0,
              author: "Player",
            }))
        );
      } catch {
        toast.error("Failed to load packs");
      }
    };

    load();
  }, [user?.id]);

  return (
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl">CUSTOM PACKS</h1>
              <p className="text-sm text-nb-muted">
                Create and share your own word packs.
              </p>
            </div>
            <Link href="/dashboard" className="text-lg font-semibold">
              ✕
            </Link>
          </header>

          <div className="flex gap-2 rounded-full border-2 border-black bg-white p-1">
            <button
              onClick={() => setTab("my")}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
                tab === "my"
                  ? "bg-[var(--nb-yellow)]"
                  : "text-nb-muted"
              }`}
            >
              My Packs
            </button>
            <button
              onClick={() => setTab("community")}
              className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
                tab === "community"
                  ? "bg-[var(--nb-yellow)]"
                  : "text-nb-muted"
              }`}
            >
              Community
            </button>
          </div>

          {tab === "my" && (
            <div className="flex flex-col gap-3">
              <Link href="/packs/create" className="inline-flex">
                <NbButton className="w-full">+ CREATE NEW PACK</NbButton>
              </Link>
              {myPacks.map((pack) => (
                <NbCard
                  key={pack.name}
                  bgColor="var(--nb-surface)"
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{pack.emoji}</div>
                    <div>
                      <div className="text-sm font-semibold">{pack.name}</div>
                      <div className="text-xs text-nb-muted">
                        {pack.count} words
                      </div>
                    </div>
                  </div>
                  <NbBadge color={pack.isPublic ? "var(--nb-green)" : "var(--nb-pink)"}>
                    {pack.isPublic ? "PUBLIC" : "PRIVATE"}
                  </NbBadge>
                </NbCard>
              ))}
            </div>
          )}

          {tab === "community" && (
            <div className="flex flex-col gap-3">
              {communityPacks.map((pack) => (
                <NbCard
                  key={pack.name}
                  bgColor="var(--nb-surface)"
                  className="flex items-center justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{pack.emoji}</div>
                    <div>
                      <div className="text-sm font-semibold">{pack.name}</div>
                      <div className="text-xs text-nb-muted">
                        by {pack.author}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold">
                    {pack.count} words
                  </span>
                </NbCard>
              ))}
            </div>
          )}
        </main>
      </div>
    </AuthGuard>
  );
}
