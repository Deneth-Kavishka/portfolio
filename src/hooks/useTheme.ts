"use client";

import { useState, useEffect, useCallback } from "react";
import type { ThemeMode } from "@/lib/types";

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as ThemeMode | null;
    const initial = saved || "dark";
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (mode: ThemeMode) => {
    document.documentElement.setAttribute("data-theme", mode);
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      applyTheme(next);
      return next;
    });
  }, []);

  return {
    theme,
    toggleTheme,
    isDark: theme === "dark",
  };
}
