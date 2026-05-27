"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import AuthGuard from "../../components/AuthGuard";
import BottomNav from "../../components/BottomNav";
import NbBadge from "../../components/ui/NbBadge";
import NbButton from "../../components/ui/NbButton";
import NbCard from "../../components/ui/NbCard";
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

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [avatarLabel] = useState(
    user?.username?.slice(0, 2).toUpperCase() || "IW"
  );
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
              <div className="h-8 w-8 rounded-full border-2 border-black bg-white text-center text-xs font-bold leading-7">
                {avatarLabel}
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

        </motion.main>
        <BottomNav />
      </div>
    </AuthGuard>
  );
}
