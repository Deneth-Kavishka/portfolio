"use client";

import { motion } from "motion/react";
import {
  HiGlobeAlt,
  HiCodeBracket,
  HiServerStack,
  HiCpuChip,
  HiPaintBrush,
  HiWrenchScrewdriver,
  HiCommandLine,
} from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { SERVICES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/effects/ScrollReveal";

const serviceIconMap: Record<string, React.ReactNode> = {
  HiGlobeAlt: <HiGlobeAlt />,
  HiCode: <HiCodeBracket />,
  HiServerStack: <HiServerStack />,
  HiCpuChip: <HiCpuChip />,
  HiPaintBrush: <HiPaintBrush />,
  HiWrenchScrewdriver: <HiWrenchScrewdriver />,
  HiCommandLine: <HiCommandLine />,
};

export default function Services() {
  return (
    <section id="services" className="relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container">
        <SectionHeading
          badge="What I Offer"
          title="My Services"
          subtitle="Professional solutions tailored to your needs"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title} direction="up" delay={i * 0.1}>
              <GlassCard hover glow padding="lg" className="relative group h-full border-t-2 border-t-primary-500/20 hover:border-t-primary-500/60 transition-colors">
                {/* Number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-xs text-text-muted font-mono">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Icon */}
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-2xl text-primary-400 group-hover:text-accent-400 transition-colors mb-5"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  {serviceIconMap[service.icon] || <HiGlobeAlt />}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-text-muted"
                    >
                      <FaCheck className="text-primary-400 text-xs shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
