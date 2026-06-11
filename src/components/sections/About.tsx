"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { FaBriefcase, FaProjectDiagram, FaChalkboardTeacher, FaDownload } from "react-icons/fa";
import { PERSONAL_INFO, STATS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Button from "@/components/ui/Button";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold gradient-text">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const highlights = [
    { icon: <FaBriefcase />, text: "2+ Years Experience" },
    { icon: <FaProjectDiagram />, text: "10+ Projects Completed" },
    { icon: <FaChalkboardTeacher />, text: "University Instructor" },
  ];

  return (
    <section id="about" className="relative">
      <div className="section-container">
        <SectionHeading
          badge="About Me"
          title="Know Me More"
          subtitle="Developing future innovative solutions"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden glass p-3">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-primary-500/20 via-dark-200 to-accent-500/20 flex items-center justify-center">
                  <div className="text-[8rem] font-bold gradient-text opacity-50 select-none">
                    {PERSONAL_INFO.firstName[0]}
                    {PERSONAL_INFO.lastName[0]}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-2 flex items-center gap-2"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-text-secondary">Available for Freelance</span>
              </motion.div>

              {/* Decorative orbs */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary-500/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-accent-500/10 rounded-full blur-[60px] pointer-events-none" />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal direction="right">
            <div>
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Who am I?
              </h3>

              <div className="space-y-4 text-text-secondary leading-relaxed mb-8 text-justify">
                <p>{PERSONAL_INFO.bio}</p>
                <p>
                  With a strong foundation in both theoretical concepts and
                  practical applications, I strive to deliver solutions that are
                  not only functional but also elegant, scalable, and
                  maintainable.
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
                {highlights.map((item, i) => (
                  <div
                    key={i}
                    className="glass rounded-xl px-4 py-3 flex items-center gap-3"
                  >
                    <span className="text-primary-400">{item.icon}</span>
                    <span className="text-sm text-text-secondary">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>

              {/*<Button
                variant="outline"
                icon={<FaDownload />}
                href={PERSONAL_INFO.cvUrl}
              >
                Download CV
              </Button>*/}
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {STATS.map((stat, i) => (
              <GlassCard key={i} hover glow className="text-center">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-text-secondary text-sm mt-2">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
