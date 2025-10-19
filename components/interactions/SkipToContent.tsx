"use client";

import { useRef } from "react";
import styles from "./SkipToContent.module.css";

export default function SkipToContent() {
  const mainContentRef = useRef<HTMLDivElement>(null);

  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (mainContentRef.current) {
      mainContentRef.current.focus();
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.demoWrapper}>
        {/* Skip to Content Link - Only visible when focused */}
        <a
          href="#main-content"
          className={styles.skipLink}
          onClick={handleSkipClick}
        >
          Skip to main content
        </a>

        {/* Simulated Header Navigation */}
        <header className={styles.header}>
          <div className={styles.logo}>Logo</div>
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>
              Home
            </a>
            <a href="#" className={styles.navLink}>
              About
            </a>
            <a href="#" className={styles.navLink}>
              Services
            </a>
            <a href="#" className={styles.navLink}>
              Blog
            </a>
            <a href="#" className={styles.navLink}>
              Contact
            </a>
          </nav>
        </header>

        {/* Main Content */}
        <main
          id="main-content"
          ref={mainContentRef}
          tabIndex={-1}
          className={styles.mainContent}
        >
          <h1 className={styles.mainTitle}>Main Content Area</h1>
          <p className={styles.mainText}>
            This is the main content area. When using keyboard navigation, press{" "}
            <kbd className={styles.kbd}>Tab</kbd> once to reveal the "Skip to
            main content" link, then press{" "}
            <kbd className={styles.kbd}>Enter</kbd> to jump directly here,
            bypassing all navigation links.
          </p>
          <div className={styles.contentBox}>
            <h2>Why Skip Links Matter</h2>
            <p>
              Skip links are essential for keyboard and screen reader users.
              They allow users to bypass repetitive navigation and jump directly
              to the main content, saving time and improving the user
              experience.
            </p>
          </div>
        </main>
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>How to Test</h3>
        <ol className={styles.infoList}>
          <li>Click anywhere in the demo area above</li>
          <li>
            Press <kbd className={styles.kbd}>Tab</kbd> once
          </li>
          <li>The "Skip to main content" link will appear</li>
          <li>
            Press <kbd className={styles.kbd}>Enter</kbd> to skip navigation
          </li>
          <li>Focus moves directly to main content</li>
        </ol>
        <p className={styles.infoText}>
          The skip link is hidden by default but becomes visible when focused
          with keyboard navigation. This is a WCAG 2.1 Level A requirement for
          accessible websites.
        </p>
      </div>
    </div>
  );
}
