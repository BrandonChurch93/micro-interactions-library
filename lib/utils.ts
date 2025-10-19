/**
 * Utility functions for the Micro-Interactions Library
 */

// Theme management
export type Theme = "light" | "dark";

/**
 * Get the current theme from localStorage or default to dark
 */
export function getTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored) return stored;

  // Default to dark mode
  return "dark";
}

/**
 * Toggle between light and dark theme
 */
export function toggleTheme(): Theme {
  const currentTheme = getTheme();
  const newTheme: Theme = currentTheme === "light" ? "dark" : "light";

  // Update localStorage
  localStorage.setItem("theme", newTheme);

  // Update data-theme attribute on html element
  document.documentElement.setAttribute("data-theme", newTheme);

  return newTheme;
}

/**
 * Apply theme on initial load
 */
export function applyTheme(theme: Theme): void {
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

/**
 * Utility function for merging class names (similar to clsx/classnames)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
