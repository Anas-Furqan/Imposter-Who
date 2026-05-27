"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import NbButton from "../components/ui/NbButton";

const highlights = [
  "🎭 Bluff & Deceive",
  "🗳️ Discuss & Vote",
  "✍️ Custom Packs",
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-nb-bg text-nb-text">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mx-auto flex w-full max-w-[480px] flex-col gap-8 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+32px)] pt-14"
      >
        <div className="text-center">
          <div className="text-5xl">🕵️</div>
          <h1 className="mt-3 font-heading text-4xl">IMPOSTER WHO?</h1>
          <p className="mt-4 text-base text-nb-muted">
            One word. One impostor. Can your group spot the fake?
          </p>
        </div>

        <NbButton
          size="lg"
          className="w-full"
          onClick={() => router.push("/game/players")}
        >
          PLAY NOW →
        </NbButton>

        <div className="flex flex-wrap justify-center gap-2">
          {highlights.map((item) => (
            <span
              key={item}
              className="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-semibold"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="text-center text-sm text-nb-muted">
          No sign up needed. Just play.
        </p>
      </motion.main>
    </div>
  );
}
