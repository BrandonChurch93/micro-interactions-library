"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTheme, toggleTheme, type Theme } from "@/lib/utils";
import styles from "./Header.module.css";

// SVG Sun Icon
const SunIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

// SVG Moon Icon
const MoonIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export default function Header() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentTheme = getTheme();
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  const handleToggleTheme = () => {
    const newTheme = toggleTheme();
    setTheme(newTheme);
  };

  // Prevent hydration mismatch by not rendering theme-dependent UI until mounted
  if (!mounted) {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <Link
            href="/"
            className={styles.logoLink}
            aria-label="Go to homepage"
          >
            <div className={styles.logoContainer}>
              <div className={styles.bracketLogo}>
                <span className={styles.bracket}>{"{"}</span>
                <div className={styles.particleContainer}>
                  <div className={styles.centerDot} />
                </div>
                <span className={styles.bracket}>{"}"}</span>
              </div>
              <h1 className={styles.logoText}>Micro-Interactions</h1>
            </div>
          </Link>
          <button className={styles.themeToggle} aria-label="Toggle theme">
            <div className={styles.toggleTrack}>
              <div className={styles.toggleThumb} />
            </div>
          </button>
        </div>
      </header>
    );
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink} aria-label="Go to homepage">
          <div className={styles.logoContainer}>
            <div className={styles.bracketLogo}>
              <span className={styles.bracket}>{"{"}</span>
              <div className={styles.particleContainer}>
                <div className={styles.centerDot} />
                <div className={`${styles.particle} ${styles.particleUp}`} />
                <div className={`${styles.particle} ${styles.particleDown}`} />
                <div className={`${styles.particle} ${styles.particleLeft}`} />
                <div className={`${styles.particle} ${styles.particleRight}`} />
                <div
                  className={`${styles.particle} ${styles.particleCenter}`}
                />
              </div>
              <span className={styles.bracket}>{"}"}</span>
            </div>
            <h1 className={styles.logoText}>Micro-Interactions</h1>
          </div>
        </Link>
        <button
          className={styles.themeToggle}
          onClick={handleToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <div className={styles.toggleTrack}>
            <span className={styles.iconSun}>
              <SunIcon />
            </span>
            <span className={styles.iconMoon}>
              <MoonIcon />
            </span>
            <div
              className={`${styles.toggleThumb} ${
                theme === "dark" ? styles.toggleThumbDark : ""
              }`}
            >
              <span className={styles.thumbIcon}>
                {theme === "light" ? <SunIcon /> : <MoonIcon />}
              </span>
            </div>
          </div>
        </button>
      </div>
    </header>
  );
}
