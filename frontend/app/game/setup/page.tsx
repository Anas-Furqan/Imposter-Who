"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GameSetupPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/game/players");
  }, [router]);

  return null;
}
