"use client";

import { motion } from "framer-motion";

interface NbCardProps {
  bgColor?: string;
  rotate?: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function NbCard({
  bgColor = "var(--nb-surface)",
  rotate = 0,
  className,
  style,
  children,
}: NbCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "8px 8px 0px #000" }}
      transition={{ duration: 0.15 }}
      style={{ background: bgColor, transform: `rotate(${rotate}deg)`, ...style }}
      className={`border-[2.5px] border-black shadow-[6px_6px_0px_#000] rounded-[16px] ${
        className || ""
      }`}
    >
      {children}
    </motion.div>
  );
}
