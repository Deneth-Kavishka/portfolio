"use client";

import { motion } from "motion/react";
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  href?: string;
  target?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent) => void;
}

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  href,
  target,
  children,
  className,
  disabled,
  type = "button",
  onClick,
}: ButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm gap-1.5",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-2.5",
  };

  const variantClasses = {
    primary:
      // "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-400 hover:to-primary-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]",
       "bg-gradient-to-r from-[#003366] via-[#0088cc] to-[#00e5ff] text-white hover:opacity-90 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]",
      //"bg-[#0088cc] text-white hover:bg-[#0077b6] hover:shadow-[0_0_20px_rgba(0,136,204,0.4)]",
    outline:
      // "bg-transparent border border-primary-500/40 text-primary-400 hover:bg-primary-500/10 hover:border-primary-400",
      "bg-transparent border border-[#0088cc]/50 text-[#0088cc] hover:bg-[#0088cc]/10 hover:border-[#0088cc]",
    ghost:
      "bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-light",
  };

  const classes = cn(
    "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 cursor-pointer",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    sizeClasses[size],
    variantClasses[variant],
    className
  );

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        target={target || (href.startsWith("http") ? "_blank" : undefined)}
        rel={target === "_blank" || href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {content}
    </motion.button>
  );
}
