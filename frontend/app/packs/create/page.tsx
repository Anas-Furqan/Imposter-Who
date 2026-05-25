"use client";

import Link from "next/link";
import { useState } from "react";
import AuthGuard from "../../../components/AuthGuard";
import NbBadge from "../../../components/ui/NbBadge";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";
import NbInput from "../../../components/ui/NbInput";

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
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl">CREATE PACK</h1>
              <p className="text-sm text-nb-muted">
                Add at least 10 words to save.
              </p>
            </div>
            <Link href="/packs" className="text-lg font-semibold">
              ✕
            </Link>
          </header>

          <NbCard bgColor="var(--nb-surface)" className="p-5">
            <NbInput
              label="Pack Name"
              value={packName}
              onChange={(event) => setPackName(event.target.value)}
              placeholder="Night Life"
            />

            <div className="mt-4">
              <p className="text-sm font-semibold">Choose Emoji</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {emojis.map((item) => (
                  <button
                    key={item}
                    onClick={() => setEmoji(item)}
                    className={`rounded-[12px] border-2 px-3 py-2 text-lg ${
                      emoji === item
                        ? "border-black bg-[var(--nb-yellow)]"
                        : "border-black bg-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Visibility</p>
                <p className="text-xs text-nb-muted">
                  {isPublic ? "Public" : "Private"}
                </p>
              </div>
              <button
                onClick={() => setIsPublic((value) => !value)}
                className={`h-8 w-14 rounded-full border-2 px-1 ${
                  isPublic
                    ? "border-black bg-[var(--nb-yellow)]"
                    : "border-black bg-white"
                }`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-black transition-transform ${
                    isPublic ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </NbCard>

          <NbCard bgColor="var(--nb-surface)" className="p-5">
            <label className="text-sm font-semibold">Add Words</label>
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
                className="w-full rounded-[12px] border-2 border-black bg-white px-4 py-3 text-sm outline-none"
                placeholder="Type a word and press Enter"
              />
              <NbButton variant="secondary" onClick={addWord}>
                ADD
              </NbButton>
            </div>

            <p className="mt-3 text-xs text-nb-muted">
              {words.length}/200 words (min 10)
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {words.map((word) => (
                <NbBadge key={word} color="var(--nb-surface)" size="sm">
                  {word}
                </NbBadge>
              ))}
            </div>
          </NbCard>

          <NbButton className="w-full">SAVE PACK</NbButton>
        </main>
      </div>
    </AuthGuard>
  );
}
