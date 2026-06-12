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
      className="relative min-h-screen flex items-center overflow-x-hidden"
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

          {/* Profile Image */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          >
            <div className="relative w-80 h-[28rem] md:w-[420px] md:h-[520px] lg:w-[480px] lg:h-[580px]">
              {/* Large diffused ambient glow */}
              <div className="absolute inset-[-40px] bg-gradient-to-t from-primary-400/25 via-primary-700/10 to-accent-800/15 rounded-full blur-[100px] pointer-events-none" />
              {/* Tighter body glow to soften cutout edges */}
              <div className="absolute inset-[10%] bg-gradient-to-br from-primary-500/20 via-accent-500/15 to-primary-600/20 rounded-full blur-[60px] pointer-events-none" />
              {/* Subtle rim light effect */}
              <div className="absolute inset-[5%] bg-gradient-to-t from-transparent via-cyan-500/8 to-primary-400/10 rounded-full blur-[40px] pointer-events-none" />
              
              {/* Main image with layered linear masks for perfect edge fading */}
              <div
                className="relative w-full h-full"
                style={{
                  maskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 95%)",
                }}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 100%)",
                  }}
                >
                  <Image
                    src="/profile.png"
                    alt={PERSONAL_INFO.name}
                    fill
                    priority
                    unoptimized
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </div>
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
