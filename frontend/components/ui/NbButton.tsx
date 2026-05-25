"use client";

import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "danger" | "ghost";

type Size = "sm" | "md" | "lg";

interface NbButtonProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-14 px-6 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--nb-yellow)] text-black border-[2.5px] border-black shadow-[4px_4px_0px_#000]",
  secondary:
    "bg-white text-black border-[2.5px] border-black shadow-[4px_4px_0px_#000]",
  danger:
    "bg-[var(--nb-red)] text-white border-[2.5px] border-black shadow-[4px_4px_0px_#000]",
  ghost:
    "bg-transparent text-black border-2 border-black border-dashed shadow-none",
};

export default function NbButton({
  variant = "primary",
  size = "md",
  loading,
  disabled,
  onClick,
  className,
  children,
}: NbButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96, x: 2, y: 2 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-heading transition-shadow ${
        sizes[size]
      } ${variants[variant]} ${
        disabled ? "opacity-50" : "hover:shadow-[2px_2px_0px_#000]"
      } ${className || ""}`}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
      )}
      {children}
    </motion.button>
  );
}
