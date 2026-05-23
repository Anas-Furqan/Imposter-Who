"use client";

import { useState } from "react";

const aiPlayers = ["Nova", "Rex", "Jade"];

export default function AiMatch() {
  const [clue, setClue] = useState("");

  return (
    <section className="rounded-3xl border border-brand-border bg-brand-card p-5">
      <h2 className="text-sm font-semibold text-brand-cream/80">AI Clues</h2>
      <div className="mt-3 grid gap-2">
        {aiPlayers.map((name) => (
          <div
            key={name}
            className="rounded-2xl border border-brand-border bg-black/40 px-4 py-3 text-sm"
          >
            {name}: "Crystal"
          </div>
        ))}
      </div>

      <label className="mt-4 block text-sm text-brand-cream/80">
        Your Clue
        <input
          value={clue}
          onChange={(event) => setClue(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-brand-border bg-black/40 px-4 py-3 text-sm text-brand-cream outline-none"
          placeholder="Type your clue"
        />
      </label>

      <button className="mt-4 h-11 w-full rounded-full bg-brand-red text-sm font-semibold text-white">
        Submit Clue
      </button>
    </section>
  );
}
