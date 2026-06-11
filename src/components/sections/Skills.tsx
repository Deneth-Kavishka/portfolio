"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaVuejs,
  FaPhp,
  FaLaravel,
  FaJava,
  FaAndroid,
  FaDatabase,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiFirebase,
  SiRedis,
  SiFlutter,
  SiArduino,
  SiRaspberrypi,
  SiEspressif,
  SiMqtt,
  SiC,
  SiTensorflow,
  SiPytorch,
  SiOpencv,
  SiScikitlearn,
  SiCplusplus,
  SiSharp,
  SiDart,
  SiR,
  SiKotlin,
  SiSpringboot,
} from "react-icons/si";
import { SKILLS, SKILL_CATEGORIES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ScrollReveal from "@/components/effects/ScrollReveal";

const iconMap: Record<string, React.ReactNode> = {
  // Frontend
  FaReact: <FaReact />,
  SiNextdotjs: <SiNextdotjs />,
  SiTypescript: <SiTypescript />,
  SiTailwindcss: <SiTailwindcss />,
  FaHtml5: <FaHtml5 />,
  FaCss3Alt: <FaCss3Alt />,
  SiJavascript: <SiJavascript />,
  FaVuejs: <FaVuejs />,
  // Backend
  FaNodeJs: <FaNodeJs />,
  SiExpress: <SiExpress />,
  FaPython: <FaPython />,
  SiDjango: <SiDjango />,
  FaPhp: <FaPhp />,
  FaLaravel: <FaLaravel />,
  SiFastapi: <SiFastapi />,
  SiGraphql: <SiGraphql />,
  SiR: <SiR />,
  SiSpringboot: <SiSpringboot />,
  // Database
  SiMongodb: <SiMongodb />,
  SiPostgresql: <SiPostgresql />,
  SiMysql: <SiMysql />,
  SiFirebase: <SiFirebase />,
  SiRedis: <SiRedis />,
  FaDatabase: <FaDatabase />,
  // Mobile
  SiFlutter: <SiFlutter />,
  FaAndroid: <FaAndroid />,
  SiKotlin: <SiKotlin />,
  // Robotics & IoT
  SiArduino: <SiArduino />,
  SiRaspberrypi: <SiRaspberrypi />,
  SiEspressif: <SiEspressif />,
  SiMqtt: <SiMqtt />,
  SiC: <SiC />,
  // AI & ML
  SiTensorflow: <SiTensorflow />,
  SiPytorch: <SiPytorch />,
  SiOpencv: <SiOpencv />,
  SiScikitlearn: <SiScikitlearn />,
  // Languages
  FaJava: <FaJava />,
  SiCplusplus: <SiCplusplus />,
  SiSharp: <SiSharp />,
  SiDart: <SiDart />,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("Frontend");

  const filteredSkills = SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="relative">
      <div className="section-container">
        <SectionHeading
          badge="My Skills"
          title="Technical Expertise"
          subtitle="Technologies and tools I work with"
        />

        {/* Category Tabs */}
        <ScrollReveal direction="up">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {SKILL_CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                    : "glass text-text-secondary hover:text-text-primary"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <GlassCard hover glow padding="md" className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl text-primary-400 group-hover:text-accent-400 transition-colors">
                      {iconMap[skill.icon] || <SiJavascript />}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {skill.name}
                      </p>
                      <p className="text-xs text-text-muted">{skill.level}%</p>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 bg-dark-300 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                    />
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
