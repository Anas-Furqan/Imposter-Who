"use client";

import Link from "next/link";
import { useState } from "react";
import AuthGuard from "../../../components/AuthGuard";

const emojis = ["🎮", "🌃", "📼", "🚀", "🎬", "🌮", "🐾", "🍭", "💡", "🪩"];

export default function CreatePackPage() {
  const [packName, setPackName] = useState("");
  const [emoji, setEmoji] = useState("🎮");
  const [isPublic, setIsPublic] = useState(false);
  const [wordInput, setWordInput] = useState("");
  const [words, setWords] = useState<string[]>([]);

  const addWord = () => {
    if (!wordInput.trim()) return;
    if (words.length >= 200) return;
    setWords((prev) => [...prev, wordInput.trim()]);
    setWordInput("");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl">Create Pack</h1>
            <p className="text-sm text-brand-cream/70">
              Add at least 10 words to save.
            </p>
          </div>
          <Link href="/packs" className="text-lg">
            ✕
          </Link>
        </header>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-5">
          <label className="text-sm text-brand-cream/80">Pack Name</label>
          <input
            value={packName}
            onChange={(event) => setPackName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-brand-border bg-black/40 px-4 py-3 text-sm text-brand-cream outline-none"
            placeholder="Night Life"
          />

          <div className="mt-4">
            <p className="text-sm text-brand-cream/80">Choose Emoji</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {emojis.map((item) => (
                <button
                  key={item}
                  onClick={() => setEmoji(item)}
                  className={`rounded-2xl border px-3 py-2 text-lg ${
                    emoji === item
                      ? "border-brand-red bg-brand-red/20"
                      : "border-brand-border"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-cream/80">Visibility</p>
              <p className="text-xs text-brand-cream/60">
                {isPublic ? "Public" : "Private"}
              </p>
            </div>
            <button
              onClick={() => setIsPublic((value) => !value)}
              className={`h-8 w-14 rounded-full border px-1 ${
                isPublic ? "border-brand-red" : "border-brand-border"
              }`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-brand-cream transition-transform ${
                  isPublic ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </section>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-5">
          <label className="text-sm text-brand-cream/80">Add Words</label>
          <div className="mt-2 flex gap-2">
            <input
              value={wordInput}
              onChange={(event) => setWordInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addWord();
                }
              }}
              className="w-full rounded-2xl border border-brand-border bg-black/40 px-4 py-3 text-sm text-brand-cream outline-none"
              placeholder="Type a word and press Enter"
            />
            <button
              onClick={addWord}
              className="rounded-2xl bg-brand-red px-4 text-sm font-semibold text-white"
            >
              Add
            </button>
          </div>

          <p className="mt-3 text-xs text-brand-cream/60">
            {words.length}/200 words (min 10)
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {words.map((word) => (
              <span
                key={word}
                className="rounded-full border border-brand-border px-3 py-1 text-xs"
              >
                {word}
              </span>
            ))}
          </div>
        </section>

        <button className="h-12 w-full rounded-full bg-brand-red text-sm font-semibold text-white shadow-[0_12px_24px_rgba(255,59,92,0.35)]">
          Save Pack
        </button>
      </main>
      </div>
    </AuthGuard>
  );
}
