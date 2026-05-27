"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/game/players", label: "Play", icon: "🎮" },
  { href: "/game/pack", label: "Packs", icon: "📦" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-[480px] border-t-[2.5px] border-black bg-white px-5 py-3 shadow-[0_-3px_0px_#000]">
      <div className="flex items-center justify-between">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center text-xs"
            >
              <span
                className={`flex flex-col items-center gap-1 rounded-full px-3 py-1 text-xs ${
                  isActive
                    ? "bg-[var(--nb-yellow)] border border-black"
                    : "text-nb-muted"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
