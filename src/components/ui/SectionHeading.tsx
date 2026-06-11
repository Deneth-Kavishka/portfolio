"use client";

import { motion } from "motion/react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {badge && (
        <motion.span
          className="inline-block glass rounded-full px-4 py-1.5 text-xs uppercase tracking-widest text-primary-400 font-medium mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {badge}
        </motion.span>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text leading-tight">
        {title}
      </h2>

      <motion.div
        className={`mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 ${
          align === "center" ? "mx-auto" : ""
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      {subtitle && (
        <p
          className={`mt-4 text-lg text-text-secondary max-w-2xl ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
