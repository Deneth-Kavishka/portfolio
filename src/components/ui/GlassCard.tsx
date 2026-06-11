"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  padding = "md",
}: GlassCardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const classes = cn(
    "glass rounded-2xl transition-all duration-300",
    hover && "glass-hover cursor-default",
    glow &&
      "hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:border-primary-500/30",
    paddingClasses[padding],
    className
  );

  if (!hover) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <motion.div
      className={classes}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ duration: 0.3, ease: "easeOut" as const }}
    >
      {children}
    </motion.div>
  );
}
