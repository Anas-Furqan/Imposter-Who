"use client";

import Link from "next/link";

const history = [
  { mode: "Classic", pack: "Animals", win: true, xp: 75, date: "Today" },
  { mode: "Emoji", pack: "Movies", win: false, xp: 10, date: "Yesterday" },
  { mode: "AI", pack: "Science", win: true, xp: 50, date: "2 days ago" },
];

export default function ProfilePage() {
  const xp = 320;
  const level = "Detective";
  const nextLevelXp = 500;
  const progress = Math.min(100, Math.round((xp / nextLevelXp) * 100));

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <main className="mx-auto flex w-full max-w-[480px] flex-col gap-6 px-5 pb-[calc(env(safe-area-inset-bottom,0px)+40px)] pt-8">
        <header className="flex items-center justify-between">
          <h1 className="font-heading text-2xl">Profile</h1>
          <Link href="/dashboard" className="text-lg">
            ✕
          </Link>
        </header>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-red/30 text-2xl">
            AF
          </div>
          <h2 className="mt-3 text-lg font-semibold">Anas</h2>
          <p className="text-xs text-brand-cream/60">anas@email.com</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-brand-cream/70">
            <span className="rounded-full border border-brand-border px-3 py-1">
              {level}
            </span>
            <span className="rounded-full border border-brand-border px-3 py-1">
              {xp} XP
            </span>
          </div>
        </section>

        <section className="rounded-3xl border border-brand-border bg-brand-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">XP Progress</p>
            <span className="text-xs text-brand-cream/60">
              {xp}/{nextLevelXp}
            </span>
          </div>
          <div className="mt-3 h-3 w-full rounded-full bg-black/40">
            <div
              className="h-3 rounded-full bg-brand-red"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3">
          {[
            { label: "Played", value: "48" },
            { label: "Won", value: "22" },
            { label: "Win Rate", value: "46%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-brand-border bg-brand-card px-3 py-3 text-center"
            >
              <div className="text-lg font-semibold">{stat.value}</div>
              <div className="text-[11px] text-brand-cream/70">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-cream/80">
              Recent Games
            </h3>
            <button className="text-xs text-brand-cream/60">Edit Profile</button>
          </div>
          <div className="mt-3 flex flex-col gap-3">
            {history.map((item) => (
              <div
                key={`${item.mode}-${item.date}`}
                className="flex items-center justify-between rounded-2xl border border-brand-border bg-brand-card px-4 py-3"
              >
                <div>
                  <div className="text-sm font-semibold">
                    {item.mode} · {item.pack}
                  </div>
                  <div className="text-xs text-brand-cream/60">{item.date}</div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xs font-semibold ${
                      item.win ? "text-emerald-300" : "text-rose-300"
                    }`}
                  >
                    {item.win ? "Win" : "Loss"}
                  </div>
                  <div className="text-xs text-brand-cream/60">+{item.xp} XP</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <button className="h-12 w-full rounded-full border border-brand-border text-sm font-semibold">
          Sign Out
        </button>
      </main>
    </div>
  );
}
