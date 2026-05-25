"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import NbBadge from "../components/ui/NbBadge";
import NbButton from "../components/ui/NbButton";
import NbCard from "../components/ui/NbCard";

const features = [
  {
    emoji: "🎭",
    title: "BLUFF & DECEIVE",
    body: "Sell a fake story or spot the liar before time runs out.",
    color: "#FFE135",
  },
  {
    emoji: "🗳️",
    title: "VOTE & DEBATE",
    body: "Argue your case, then vote together to expose the impostor.",
    color: "#FF61A6",
  },
  {
    emoji: "🎮",
    title: "5 GAME MODES",
    body: "Classic, questions, emojis, troll chaos, or AI solo play.",
    color: "#06B6D4",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-nb-bg text-nb-text">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-[480px] flex-col gap-8 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+32px)] pt-12"
      >
        <div className="text-center">
          <div className="text-5xl">🕵️</div>
          <h1 className="mt-3 font-heading text-3xl">IMPOSTER WHO?</h1>
          <div className="mx-auto mt-2 h-1 w-40 bg-black" />
          <div className="mt-4 flex justify-center">
            <NbBadge color="var(--nb-yellow)">⭐ 10M+ DOWNLOADS</NbBadge>
          </div>
        </div>

        <div className="text-center">
          <p className="font-heading text-2xl">One secret word.</p>
          <p className="mt-2 inline-block -rotate-2 bg-[var(--nb-yellow)] px-3 py-1 font-heading text-3xl text-[var(--nb-red)]">
            One impostor.
          </p>
          <p className="mt-3 text-base text-nb-muted">Can you spot the fake?</p>
        </div>

        <div className="flex flex-col gap-3">
          <NbButton size="lg" className="w-full">
            ▶ PLAY NOW
          </NbButton>
          <Link href="/auth/login" className="w-full">
            <NbButton size="lg" variant="secondary" className="w-full">
              SIGN IN
            </NbButton>
          </Link>
        </div>

        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2">
          {features.map((feature) => (
            <NbCard
              key={feature.title}
              bgColor={feature.color}
              className="min-w-[180px] p-4"
            >
              <div className="text-2xl">{feature.emoji}</div>
              <h3 className="mt-2 font-heading text-sm">{feature.title}</h3>
              <p className="mt-2 text-xs text-nb-muted">{feature.body}</p>
            </NbCard>
          ))}
        </div>

        <footer className="text-center text-xs text-nb-muted">
          Privacy Policy | Terms | Contact
        </footer>
      </motion.main>
    </div>
  );
}
