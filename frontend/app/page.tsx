"use client";

import { motion } from "framer-motion";

const features = [
  {
    emoji: "🎭",
    title: "Bluff & Deceive",
    body: "Sell a fake story or spot the liar before time runs out.",
  },
  {
    emoji: "🗳️",
    title: "Vote & Debate",
    body: "Argue your case, then vote together to expose the impostor.",
  },
  {
    emoji: "🎮",
    title: "5 Game Modes",
    body: "Classic, questions, emojis, troll chaos, or AI solo play.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ff3b5c]/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-[#7f63ff]/20 blur-[140px]" />
      </div>

      <motion.main
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 },
          },
        }}
        className="relative mx-auto flex w-full max-w-[480px] flex-col gap-8 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+28px)] pt-10"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: -12 }, show: { opacity: 1, y: 0 } }}
          className="flex flex-col items-center text-center"
        >
          <div className="text-4xl drop-shadow-[0_0_18px_rgba(255,59,92,0.45)]">
            🕵️
          </div>
          <h1 className="mt-2 font-heading text-4xl tracking-tight text-brand-cream">
            IMPOSTER WHO?
          </h1>
          <p className="mt-3 max-w-sm text-base text-brand-cream/80">
            One secret word. One impostor. Can you spot the fake?
          </p>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1 } }}
          className="mx-auto w-fit rounded-full bg-brand-red px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(255,59,92,0.35)]"
        >
          ⭐ 10M+ Downloads
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          className="flex flex-col gap-3"
        >
          <button className="h-14 w-full rounded-full bg-brand-red text-base font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)] transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
            ▶ Play Now
          </button>
          <button className="h-14 w-full rounded-full border border-brand-cream/40 text-base font-semibold text-brand-cream transition-all hover:border-brand-cream hover:bg-brand-cream/10">
            Sign In
          </button>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2"
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="min-w-[220px] flex-1 rounded-2xl border border-brand-border bg-brand-card p-4 shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
            >
              <div className="text-2xl">{feature.emoji}</div>
              <h3 className="mt-2 font-heading text-lg text-brand-cream">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-brand-cream/70">
                {feature.body}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.footer
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          className="flex flex-wrap items-center justify-center gap-4 text-xs text-brand-muted"
        >
          <a href="#" className="transition-colors hover:text-brand-cream">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-brand-cream">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-brand-cream">
            Contact
          </a>
        </motion.footer>
      </motion.main>
    </div>
  );
}
