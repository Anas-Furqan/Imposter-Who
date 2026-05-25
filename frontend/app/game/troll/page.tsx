"use client";

import Link from "next/link";
import AuthGuard from "../../../components/AuthGuard";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";

export default function TrollModePage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-nb-bg text-nb-text">
        <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-2xl">TROLL MODE</h1>
              <p className="text-sm text-nb-muted">Everyone is the impostor.</p>
            </div>
            <Link href="/dashboard" className="text-lg font-semibold">
              ✕
            </Link>
          </header>

          <NbCard bgColor="var(--nb-pink)" className="p-6 text-center">
            <div className="text-4xl">🤡</div>
            <h2 className="mt-3 text-xl font-semibold">
              Everyone is the impostor!
            </h2>
            <p className="mt-2 text-sm text-nb-muted">
              There is no real word. Just bluff and have fun.
            </p>
          </NbCard>

          <NbCard bgColor="var(--nb-surface)" className="p-6">
            <label className="text-sm font-semibold">Your Bluff</label>
            <textarea
              className="mt-3 min-h-[120px] w-full rounded-[12px] border-2 border-black bg-white p-4 text-sm outline-none"
              placeholder="Type your bluff here..."
            />
            <NbButton className="mt-4 w-full">SUBMIT BLUFF</NbButton>
          </NbCard>

          <NbButton variant="secondary" className="w-full">
            PLAY AGAIN
          </NbButton>
        </main>
      </div>
    </AuthGuard>
  );
}
