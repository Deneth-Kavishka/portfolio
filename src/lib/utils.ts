// ============================================================
// Portfolio Website — Utility Functions
// ============================================================

/**
 * Conditionally join classNames together.
 * Simple alternative to clsx/twMerge for Tailwind v4.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Smooth scroll to an element by ID
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Format a number with commas (e.g., 1000 → 1,000)
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

/**
 * Get current year for copyright
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
