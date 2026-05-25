"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type MotionButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag">;

interface NbButtonProps extends MotionButtonProps {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  loading?: boolean;
}

export const NbButton = ({
  variant = "primary",
  size = "md",
  children,
  loading,
  disabled,
  className,
  ...props
}: NbButtonProps) => {
  const baseStyles = "font-heading font-bold inline-flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-nb-yellow text-nb-text border-[2.5px] border-nb-border shadow-nb-md",
    secondary: "bg-nb-surface text-nb-text border-[2.5px] border-nb-border shadow-nb-md",
    danger: "bg-nb-red text-white border-[2.5px] border-nb-border shadow-nb-md",
    ghost: "bg-transparent text-nb-text border-2 border-dashed border-nb-border",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-nb",
    md: "px-5 py-2.5 text-base rounded-nb",
    lg: "px-8 py-4 text-lg rounded-nb",
  };

  return (
    <motion.button
      whileTap={!disabled && !loading ? { scale: 0.96, x: 2, y: 2, boxShadow: "1px 1px 0px #000" } : {}}
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </motion.button>
  );
};

export default NbButton;
