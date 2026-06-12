"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { HiMenuAlt3 } from "react-icons/hi";
import { HiXMark } from "react-icons/hi2";
import { FiSun, FiMoon } from "react-icons/fi";
import { NAV_ITEMS } from "@/lib/constants";
import { useTheme } from "@/hooks/useTheme";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { scrollToSection } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Only track scroll-spy for section items (not page links like /blog)
  const sectionItems = NAV_ITEMS.filter((i) => !i.href.startsWith("/"));
  const activeSection = useScrollSpy(sectionItems.map((i) => i.href));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    // If it's a page link (starts with /), use navigation
    if (href.startsWith("/")) {
      return; // Link component handles it
    }

    // If we're on the home page, scroll to section
    if (isHomePage) {
      scrollToSection(href);
    } else {
      // Navigate to home page with hash
      window.location.href = `/#${href}`;
    }
  };

  const isActive = (href: string) => {
    if (href.startsWith("/")) {
      return pathname.startsWith(href);
    }
    return isHomePage && activeSection === href;
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong py-3"
            : "bg-transparent py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          {isHomePage ? (
            <motion.button
              onClick={() => handleNavClick("hero")}
              className="text-2xl text-gradient font-bold cursor-pointer font-dealoras tracking-wider"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              DK
            </motion.button>
          ) : (
            <Link href="/">
              <motion.span
                className="text-3xl font-bold cursor-pointer font-dealoras tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                DK
              </motion.span>
            </Link>
          )}

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isPageLink = item.href.startsWith("/");
              const active = isActive(item.href);

              if (isPageLink) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      active
                        ? "text-primary-400"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                        layoutId="activeNav"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              }

              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    active
                      ? "text-primary-400"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glass text-text-secondary hover:text-primary-400 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2.5 rounded-xl glass text-text-secondary cursor-pointer"
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
            >
              <HiMenuAlt3 size={20} />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[70] w-72 glass-strong md:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <span className="text-lg font-bold gradient-text">Menu</span>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl glass cursor-pointer"
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <HiXMark size={20} />
                </motion.button>
              </div>

              <div className="flex flex-col p-4 gap-1">
                {NAV_ITEMS.map((item, i) => {
                  const isPageLink = item.href.startsWith("/");
                  const active = isActive(item.href);

                  if (isPageLink) {
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                            active
                              ? "bg-primary-500/10 text-primary-400"
                              : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.button
                      key={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                        active
                          ? "bg-primary-500/10 text-primary-400"
                          : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
