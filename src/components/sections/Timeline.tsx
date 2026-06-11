"use client";

import { FaGraduationCap, FaBriefcase, FaCertificate } from "react-icons/fa";
import { TIMELINE } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/effects/ScrollReveal";

const typeConfig = {
  education: {
    icon: <FaGraduationCap />,
    color: "text-blue-400",
    borderColor: "border-blue-400/30",
    bgColor: "bg-blue-500/10",
  },
  experience: {
    icon: <FaBriefcase />,
    color: "text-emerald-400",
    borderColor: "border-emerald-400/30",
    bgColor: "bg-emerald-500/10",
  },
  certification: {
    icon: <FaCertificate />,
    color: "text-yellow-400",
    borderColor: "border-yellow-400/30",
    bgColor: "bg-yellow-500/10",
  },
};

export default function Timeline() {
  return (
    <section id="experience" className="relative">
      <div className="section-container">
        <SectionHeading
          badge="My Journey"
          title="Experience & Education"
          subtitle="My professional and academic path"
        />

        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 opacity-30" />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => {
              const config = typeConfig[item.type];
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={i}
                  className="relative flex flex-col md:flex-row items-start"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full border-2 border-primary-500 bg-dark-500 animate-pulse-glow mt-6`}
                  />

                  {/* Content card */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] ${
                      isLeft
                        ? "md:mr-auto md:pr-8 pl-12 md:pl-0"
                        : "md:ml-auto md:pl-8 pl-12"
                    }`}
                  >
                    <ScrollReveal
                      direction={isLeft ? "left" : "right"}
                      delay={i * 0.1}
                    >
                      <GlassCard hover padding="lg">
                        {/* Year & type */}
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`p-2 rounded-lg ${config.bgColor} ${config.color}`}
                          >
                            {config.icon}
                          </span>
                          <span className="text-sm font-mono text-primary-400">
                            {item.year}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-text-primary mb-1">
                          {item.title}
                        </h3>
                        <p className={`text-sm font-medium mb-3 ${config.color}`}>
                          {item.subtitle}
                        </p>
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {item.description}
                        </p>
                      </GlassCard>
                    </ScrollReveal>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
