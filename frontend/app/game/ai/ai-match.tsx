"use client";

import { useState } from "react";
import NbButton from "../../../components/ui/NbButton";
import NbCard from "../../../components/ui/NbCard";

const aiPlayers = ["Nova", "Rex", "Jade"];

export default function AiMatch() {
  const [clue, setClue] = useState("");

  return (
    <NbCard bgColor="var(--nb-surface)" className="p-5">
      <h2 className="text-sm font-semibold">AI Clues</h2>
      <div className="mt-3 grid gap-2">
        {aiPlayers.map((name) => (
          <div
            key={name}
            className="rounded-[12px] border-2 border-black bg-white px-4 py-3 text-sm"
          >
            {name}: &quot;Crystal&quot;
          </div>
        ))}
      </div>

      <label className="mt-4 block text-sm font-semibold">
        Your Clue
        <input
          value={clue}
          onChange={(event) => setClue(event.target.value)}
          className="mt-2 w-full rounded-[12px] border-2 border-black bg-white px-4 py-3 text-sm outline-none"
          placeholder="Type your clue"
        />
      </label>

      <NbButton className="mt-4 w-full">SUBMIT CLUE</NbButton>
    </NbCard>
  );
}
