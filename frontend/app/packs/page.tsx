"use client";

import Link from "next/link";
import { useState } from "react";
import AuthGuard from "../../components/AuthGuard";

const myPacks = [
  { name: "Night City", emoji: "🌃", count: 28, isPublic: false },
  { name: "Retro Tech", emoji: "📼", count: 40, isPublic: true },
];

const communityPacks = [
  { name: "Dream Jobs", emoji: "💼", count: 36, author: "Nova" },
  { name: "Street Food", emoji: "🌮", count: 42, author: "Echo" },
  { name: "Space",
    emoji: "🚀",
    count: 30,
    author: "Luna",
  },
];

export default function PacksPage() {
  const [tab, setTab] = useState<"my" | "community">("my");

  return (
    <AuthGuard>
      <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl">Custom Packs</h1>
            <p className="text-sm text-brand-cream/70">
              Create and share your own word packs.
            </p>
          </div>
          <Link href="/dashboard" className="text-lg">
            ✕
          </Link>
        </header>

        <div className="flex gap-2 rounded-full border border-brand-border bg-brand-card p-1">
          <button
            onClick={() => setTab("my")}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
              tab === "my"
                ? "bg-brand-red text-white"
                : "text-brand-cream/70"
            }`}
          >
            My Packs
          </button>
          <button
            onClick={() => setTab("community")}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold ${
              tab === "community"
                ? "bg-brand-red text-white"
                : "text-brand-cream/70"
            }`}
          >
            Community
          </button>
        </div>

        {tab === "my" && (
          <div className="flex flex-col gap-3">
            <Link
              href="/packs/create"
              className="inline-flex h-12 items-center justify-center rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)]"
            >
              + Create New Pack
            </Link>
            {myPacks.map((pack) => (
              <div
                key={pack.name}
                className="flex items-center justify-between rounded-2xl border border-brand-border bg-brand-card px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{pack.emoji}</div>
                  <div>
                    <div className="text-sm font-semibold">{pack.name}</div>
                    <div className="text-xs text-brand-cream/60">
                      {pack.count} words
                    </div>
                  </div>
                </div>
                <span className="rounded-full border border-brand-border px-2 py-1 text-[10px] text-brand-cream/70">
                  {pack.isPublic ? "Public" : "Private"}
                </span>
              </div>
            ))}
          </div>
        )}

        {tab === "community" && (
          <div className="flex flex-col gap-3">
            {communityPacks.map((pack) => (
              <div
                key={pack.name}
                className="flex items-center justify-between rounded-2xl border border-brand-border bg-brand-card px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{pack.emoji}</div>
                  <div>
                    <div className="text-sm font-semibold">{pack.name}</div>
                    <div className="text-xs text-brand-cream/60">
                      by {pack.author}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-brand-cream/60">
                  {pack.count} words
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
      </div>
    </AuthGuard>
  );
}
