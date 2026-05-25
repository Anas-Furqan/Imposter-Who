"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface NbCardProps {
  bgColor?: string;
  children: ReactNode;
  className?: string;
  rotate?: number;
  style?: React.CSSProperties;
}

export const NbCard = ({
  bgColor = "#FFFFFF",
  children,
  className = "",
  rotate = 0,
  style,
}: NbCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "8px 8px 0px #000" }}
      transition={{ duration: 0.15 }}
      style={{
        backgroundColor: bgColor,
        transform: rotate ? `rotate(${rotate}deg)` : "none",
        ...style,
      }}
      className={twMerge(
        "border-[2.5px] border-nb-border rounded-[16px] p-6 shadow-nb-lg transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default NbCard;
