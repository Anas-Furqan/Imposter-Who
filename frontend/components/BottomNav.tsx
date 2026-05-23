"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Home", icon: "🏠" },
  { href: "/game/setup", label: "Play", icon: "🎮" },
  { href: "/packs", label: "Packs", icon: "📦" },
  { href: "/profile", label: "Profile", icon: "👤" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-[480px] border-t border-brand-border bg-brand-card/95 px-5 py-3 backdrop-blur">
      <div className="flex items-center justify-between">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center text-xs transition-colors ${
                isActive ? "text-brand-cream" : "text-brand-muted"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
