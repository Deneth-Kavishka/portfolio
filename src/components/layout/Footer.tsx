"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaChevronUp,
  FaHeart,
  FaMapMarkerAlt,
  FaTwitter,
} from "react-icons/fa";
// import { SiFiverr } from "react-icons/si";
import { NAV_ITEMS, PERSONAL_INFO, SOCIAL_LINKS, SERVICES } from "@/lib/constants";
import { scrollToSection, getCurrentYear } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  FaGithub: <FaGithub />,
  FaLinkedinIn: <FaLinkedinIn />,
  FaFacebookF: <FaFacebookF />,
  FaInstagram: <FaInstagram />,
  FaWhatsapp: <FaWhatsapp />,
  FaEnvelope: <FaEnvelope />,
  FaTwitter: <FaTwitter />,
  // SiFiverr: <SiFiverr />,
};

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative border-t border-[var(--glass-border)]">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">
              {PERSONAL_INFO.firstName}
              <span className="text-text-primary">-Kavishka</span>
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              {PERSONAL_INFO.shortBio}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-text-secondary hover:text-primary-400 text-sm transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 7).map((service) => (
                <li key={service.title}>
                  <span className="text-text-secondary text-sm">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-semibold mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-primary-400 shrink-0" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-primary-400 transition-colors"
                >
                  {PERSONAL_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="text-primary-400 shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-primary-400 shrink-0 mt-1" />
                <span>{PERSONAL_INFO.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full glass text-text-secondary hover:text-primary-400 hover:bg-primary-500/10 transition-all text-sm"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
              >
                {iconMap[link.icon] || <FaEnvelope />}
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-text-muted text-sm flex items-center gap-1">
            © {getCurrentYear()} {PERSONAL_INFO.name}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <FaChevronUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
