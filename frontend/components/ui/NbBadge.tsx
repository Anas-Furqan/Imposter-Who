import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface NbBadgeProps {
  color?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Simple hash function to generate a consistent rotation based on children string
const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const NbBadge = ({
  color = "#FFE135",
  children,
  size = "md",
  className = "",
}: NbBadgeProps) => {
  const rotationOptions = [-2, -1, 0, 1, 2];
  const hash = typeof children === "string" ? hashString(children) : 0;
  const rotate = rotationOptions[Math.abs(hash) % rotationOptions.length];

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  return (
    <div
      style={{
        backgroundColor: color,
        transform: `rotate(${rotate}deg)`,
        color: ['#000000', '#FF3B5C', '#3B82F6', '#8B5CF6'].includes(color) ? '#FFFFFF' : '#000000'
      }}
      className={twMerge(
        "inline-block border-2 border-nb-border rounded-full shadow-[2px_2px_0px_#000] font-heading font-bold whitespace-nowrap",
        sizes[size],
        className
      )}
    >
      {children}
    </div>
  );
};

export default NbBadge;
