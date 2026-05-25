"use client";

interface NbBadgeProps {
  color?: string;
  size?: "sm" | "md";
  children: React.ReactNode;
}

const rotations = [-2, -1, 0, 1, 2];

const getRotation = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % rotations.length;
  return rotations[index];
};

export default function NbBadge({ color = "var(--nb-yellow)", size = "md", children }: NbBadgeProps) {
  const text = typeof children === "string" ? children : "badge";
  const rotation = getRotation(text);

  return (
    <span
      style={{ background: color, transform: `rotate(${rotation}deg)` }}
      className={`inline-flex items-center rounded-full border-2 border-black px-3 py-1 font-heading shadow-[2px_2px_0px_#000] ${
        size === "sm" ? "text-[10px]" : "text-xs"
      }`}
    >
      {children}
    </span>
  );
}
