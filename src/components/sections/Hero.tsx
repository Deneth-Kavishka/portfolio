"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaDownload,
  FaArrowRight,
  FaChevronDown,
  FaReact,
  FaNodeJs,
  FaPython,
  FaTwitter,
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiArduino } from "react-icons/si";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { scrollToSection } from "@/lib/utils";
import Button from "@/components/ui/Button";
import TypewriterText from "@/components/effects/TypewriterText";

const socialIconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub />,
  FaLinkedinIn: <FaLinkedinIn />,
  FaFacebookF: <FaFacebookF />,
  FaInstagram: <FaInstagram />,
  FaWhatsapp: <FaWhatsapp />,
  FaEnvelope: <FaEnvelope />,
  FaTwitter: <FaTwitter />,
  // SiFiverr: <SiFiverr />,
};

// Pre-computed positions (radius=180) to avoid SSR hydration mismatch from Math.cos/sin precision
const floatingIcons = [
  { icon: <FaReact className="text-cyan-400" />, label: "React", delay: 0, x: 180, y: 0 },
  { icon: <SiTypescript className="text-blue-400" />, label: "TypeScript", delay: 1, x: 90, y: 156 },
  { icon: <SiNextdotjs className="text-white" />, label: "Next.js", delay: 2, x: -90, y: 156 },
  { icon: <FaNodeJs className="text-green-400" />, label: "Node.js", delay: 1.5, x: -180, y: 0 },
  { icon: <FaPython className="text-yellow-400" />, label: "Python", delay: 0.5, x: -90, y: -156 },
  { icon: <SiArduino className="text-teal-400" />, label: "Arduino", delay: 2.5, x: 90, y: -156 },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
           {/* <motion.p
              className="text-text-secondary text-lg mb-3 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="inline-block animate-float text-2xl">👋</span>
              Hello, I&apos;m
            </motion.p>*/}

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text leading-tight mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.div
              className="text-xl md:text-2xl text-text-secondary mb-6 h-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <TypewriterText
                texts={PERSONAL_INFO.roles}
                className="font-medium"
              />
            </motion.div>

            <motion.p
              className="text-text-secondary leading-relaxed max-w-lg mb-8 text-justify"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {PERSONAL_INFO.shortBio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                variant="primary"
                size="md"
                icon={<FaArrowRight />}
                iconPosition="right"
                onClick={() => scrollToSection("projects")}
              >
                View Projects
              </Button>
              <Button
                variant="outline"
                size="md"
                icon={<FaDownload />}
                href={PERSONAL_INFO.cvUrl}
                target="_blank"
              >
                Download CV
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={() => scrollToSection("contact")}
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {SOCIAL_LINKS.filter(l => l.name !== "WhatsApp").slice(0, 5).map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full glass text-text-secondary hover:text-primary-400 hover:bg-primary-500/10 transition-all text-sm"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {socialIconMap[link.icon]}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Avatar / Image */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            {/* Decorative ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 md:w-[400px] md:h-[400px] rounded-full border border-primary-500/20 animate-spin-slow" />
            </div>

            {/* Avatar */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 via-accent-500/10 to-primary-600/20 animate-pulse-glow" />
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={PERSONAL_INFO.avatarUrl}
                    alt={PERSONAL_INFO.name}
                    fill
                    priority
                    unoptimized
                    className="object-cover rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Floating tech icons */}
            {floatingIcons.map((item) => (
                <motion.div
                  key={item.label}
                  className="absolute top-1/2 left-1/2 glass rounded-xl p-2.5 text-lg"
                  style={{
                    x: item.x - 20,
                    y: item.y - 20,
                  }}
                  animate={{
                    y: [item.y - 20, item.y - 30, item.y - 20],
                  }}
                  transition={{
                    duration: 3,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {item.icon}
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-label="Scroll down"
      >
        <FaChevronDown size={20} />
      </motion.button>
    </section>
  );
}
