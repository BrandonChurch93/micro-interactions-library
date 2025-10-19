/**
 * Component metadata and constants for the Micro-Interactions Library (Part 2)
 * Components 12-15: Accessibility (1) and Navigation (3)
 */

import type { Component } from "./constants";

export const COMPONENTS_PART2: Component[] = [
  // Accessibility (1 remaining)
  {
    id: 12,
    slug: "reduced-motion",
    title: "Reduced Motion Toggle",
    description: "Side-by-side comparison of full and reduced motion",
    category: "Accessibility",
    code: `// ReducedMotion.tsx
"use client";

import { useState } from "react";
import styles from "./ReducedMotion.module.css";

export default function ReducedMotion() {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Animation Comparison</h2>
        <p className={styles.description}>
          Compare full motion (left) vs reduced motion (right). Both versions
          provide the same functionality with different animation intensities.
        </p>
      </div>

      <div className={styles.comparison}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Full Motion</h3>
            <span className={styles.badge}>Default</span>
          </div>

          <div className={styles.demoArea}>
            <button
              className={\`\${styles.button} \${styles.fullMotion}\`}
              onClick={() => setLeftCount((c) => c + 1)}
            >
              <span className={styles.buttonIcon}>🎯</span>
              <span>Click Me ({leftCount})</span>
            </button>

            <div className={styles.spinnerWrapper}>
              <div className={\`\${styles.spinner} \${styles.fullMotion}\`} />
              <p className={styles.label}>Loading Spinner</p>
            </div>

            <div className={\`\${styles.card} \${styles.fullMotion}\`}>
              <div className={styles.cardIcon}>✨</div>
              <h4>Animated Card</h4>
              <p>Slides in with bounce</p>
            </div>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Reduced Motion</h3>
            <span className={\`\${styles.badge} \${styles.badgeReduced}\`}>
              Accessible
            </span>
          </div>

          <div className={styles.demoArea}>
            <button
              className={\`\${styles.button} \${styles.reducedMotion}\`}
              onClick={() => setRightCount((c) => c + 1)}
            >
              <span className={styles.buttonIcon}>🎯</span>
              <span>Click Me ({rightCount})</span>
            </button>

            <div className={styles.spinnerWrapper}>
              <div className={\`\${styles.spinner} \${styles.reducedMotion}\`} />
              <p className={styles.label}>Loading Spinner</p>
            </div>

            <div className={\`\${styles.card} \${styles.reducedMotion}\`}>
              <div className={styles.cardIcon}>✨</div>
              <h4>Animated Card</h4>
              <p>Fades in simply</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>About Reduced Motion</h3>
        <p className={styles.infoText}>
          Users with vestibular disorders or motion sensitivity can enable
          "reduce motion" in their system preferences. Websites should respect
          this preference using the{" "}
          <code className={styles.code}>prefers-reduced-motion</code> CSS media
          query.
        </p>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <strong>Full Motion:</strong> Scales, bounces, rotations, complex
            easing
          </div>
          <div className={styles.infoItem}>
            <strong>Reduced Motion:</strong> Simple fades, opacity changes,
            instant position changes
          </div>
        </div>
        <p className={styles.infoText}>
          Both versions maintain full functionality - only the animation style
          differs. This is a WCAG 2.1 Level AAA requirement.
        </p>
      </div>
    </div>
  );
}

// ReducedMotion.module.css
.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: var(--space-8);
  width: 100%;
}

.header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.panelHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.panelTitle {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.badge {
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: white;
  background-color: var(--color-accent);
  border-radius: var(--radius-full);
}

.badgeReduced {
  background-color: #10b981;
}

.demoArea {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-4);
  min-height: 400px;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all 0.2s ease;
}

.buttonIcon {
  font-size: var(--text-xl);
}

.button.fullMotion:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.button.fullMotion:active {
  animation: buttonBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes buttonBounce {
  0% { transform: scale(1); }
  25% { transform: scale(0.9); }
  50% { transform: scale(1.1); }
  75% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.button.reducedMotion:hover {
  opacity: 0.9;
}

.button.reducedMotion:active {
  opacity: 0.8;
  transform: scale(0.98);
}

.spinnerWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-border);
  border-radius: 50%;
}

.spinner.fullMotion {
  border-top-color: var(--color-accent);
  animation: spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.1); }
  100% { transform: rotate(360deg) scale(1); }
}

.spinner.reducedMotion {
  border-top-color: var(--color-accent);
  animation: fadeSpinner 2s ease-in-out infinite;
}

@keyframes fadeSpinner {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

.label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.card {
  padding: var(--space-6);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
}

.cardIcon {
  font-size: var(--text-4xl);
  margin-bottom: var(--space-2);
}

.card h4 {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.card p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.card.fullMotion {
  animation: slideInBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes slideInBounce {
  0% {
    transform: translateX(-100px) rotate(-10deg);
    opacity: 0;
  }
  60% {
    transform: translateX(10px) rotate(2deg);
    opacity: 1;
  }
  80% {
    transform: translateX(-5px) rotate(-1deg);
  }
  100% {
    transform: translateX(0) rotate(0);
    opacity: 1;
  }
}

.card.reducedMotion {
  animation: simpleFadeIn 0.3s ease-out;
}

@keyframes simpleFadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.info {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.infoTitle {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.infoText {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-4) 0;
}

.infoText:last-child {
  margin-bottom: 0;
}

.code {
  padding: 0.125rem 0.375rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.infoGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin: var(--space-4) 0;
}

.infoItem {
  padding: var(--space-4);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  line-height: 1.6;
}

.infoItem strong {
  display: block;
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

@media (max-width: 1024px) {
  .comparison {
    grid-template-columns: 1fr;
  }

  .infoGrid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .container {
    padding: var(--space-4);
  }

  .panelHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }

  .demoArea {
    min-height: 300px;
  }
}`,
  },

  // Navigation (3)
  {
    id: 13,
    slug: "mobile-menu",
    title: "Mobile Menu Transition",
    description: "Smooth hamburger menu with icon morph and stagger",
    category: "Navigation",
    code: `// MobileMenu.tsx
"use client";

import { useState } from "react";
import styles from "./MobileMenu.module.css";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: "Home", icon: "🏠" },
    { label: "About", icon: "ℹ️" },
    { label: "Services", icon: "⚙️" },
    { label: "Portfolio", icon: "💼" },
    { label: "Blog", icon: "📝" },
    { label: "Contact", icon: "📧" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.demoWrapper}>
        <header className={styles.header}>
          <div className={styles.logo}>Logo</div>
          <button
            className={\`\${styles.hamburger} \${isOpen ? styles.open : ""}\`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </header>

        <div
          className={\`\${styles.overlay} \${isOpen ? styles.overlayVisible : ""}\`}
          onClick={toggleMenu}
        />

        <nav className={\`\${styles.menu} \${isOpen ? styles.menuOpen : ""}\`}>
          <div className={styles.menuHeader}>
            <h2 className={styles.menuTitle}>Menu</h2>
          </div>
          <ul className={styles.menuList}>
            {menuItems.map((item, index) => (
              <li
                key={item.label}
                className={styles.menuItem}
                style={
                  {
                    "--item-index": index,
                  } as React.CSSProperties
                }
              >
                <a href="#" className={styles.menuLink}>
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <main className={styles.mainContent}>
          <h1 className={styles.mainTitle}>Mobile Menu Demo</h1>
          <p className={styles.mainText}>
            Click the hamburger icon in the top-right corner to toggle the menu.
            Notice the smooth icon morph and staggered menu item animations.
          </p>
        </main>
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>Key Features</h3>
        <ul className={styles.infoList}>
          <li>
            <strong>Hamburger Icon Morph:</strong> Three lines transform into an
            X using CSS animations
          </li>
          <li>
            <strong>Menu Slide:</strong> Drawer slides in from the right with
            smooth easing
          </li>
          <li>
            <strong>Staggered Items:</strong> Menu items animate in one-by-one
            with 50ms delay
          </li>
          <li>
            <strong>Overlay:</strong> Semi-transparent backdrop fades in behind
            menu
          </li>
          <li>
            <strong>Accessibility:</strong> Proper ARIA labels and keyboard
            support
          </li>
        </ul>
      </div>
    </div>
  );
}

// MobileMenu.module.css
.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: var(--space-8);
  width: 100%;
}

.demoWrapper {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  min-height: 500px;
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  position: relative;
  z-index: 100;
}

.logo {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 32px;
  height: 32px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 200;
}

.hamburgerLine {
  width: 100%;
  height: 3px;
  background-color: var(--color-text-primary);
  border-radius: var(--radius-full);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform-origin: center;
}

.hamburger.open .hamburgerLine:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.hamburger.open .hamburgerLine:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

.hamburger.open .hamburgerLine:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 50;
  pointer-events: none;
}

.overlayVisible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 320px;
  max-width: 85vw;
  background-color: var(--color-surface);
  box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 150;
  overflow-y: auto;
}

.menuOpen {
  transform: translateX(0);
}

.menuHeader {
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.menuTitle {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.menuList {
  list-style: none;
  padding: var(--space-4) 0;
  margin: 0;
}

.menuItem {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: calc(var(--item-index) * 50ms);
}

.menuOpen .menuItem {
  opacity: 1;
  transform: translateX(0);
}

.menuLink {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  text-decoration: none;
  transition: background-color 0.2s ease, padding-left 0.2s ease;
}

.menuLink:hover {
  background-color: var(--color-background);
  padding-left: var(--space-8);
}

.menuLink:active {
  background-color: var(--color-border);
}

.menuIcon {
  font-size: var(--text-xl);
  width: 24px;
  text-align: center;
}

.mainContent {
  padding: var(--space-8) var(--space-6);
}

.mainTitle {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.mainText {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.info {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.infoTitle {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.infoList {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.infoList li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  padding-left: var(--space-6);
  position: relative;
}

.infoList li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
}

.infoList strong {
  color: var(--color-text-primary);
  font-weight: var(--font-semibold);
}

@media (max-width: 640px) {
  .container {
    padding: var(--space-4);
  }

  .menu {
    width: 280px;
  }

  .mainContent {
    padding: var(--space-6) var(--space-4);
  }

  .mainTitle {
    font-size: var(--text-2xl);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hamburgerLine {
    transition: all 0.1s linear;
  }

  .menu {
    transition: transform 0.2s ease;
  }

  .menuItem {
    transition: opacity 0.2s ease;
    transform: translateX(0);
  }

  .menuLink:hover {
    padding-left: var(--space-6);
  }
}`,
  },
  {
    id: 14,
    slug: "tab-indicator",
    title: "Tab Indicator Slide",
    description: "Sliding indicator that follows active tab",
    category: "Navigation",
    code: `// TabIndicator.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./TabIndicator.module.css";

interface Tab {
  id: string;
  label: string;
  icon: string;
  content: string;
}

const tabs: Tab[] = [
  {
    id: "overview",
    label: "Overview",
    icon: "📊",
    content:
      "Get a comprehensive overview of your dashboard metrics, key performance indicators, and recent activities.",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "📈",
    content:
      "Dive deep into your data with advanced analytics tools, charts, and detailed reporting features.",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "⚙️",
    content:
      "Customize your experience with user preferences, account settings, and integration options.",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "🔔",
    content:
      "Manage your notification preferences and stay updated with real-time alerts and updates.",
  },
];

export default function TabIndicator() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    const activeButton = tabsRef.current.get(activeTab);
    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [activeTab]);

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={styles.container}>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabsContainer}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) tabsRef.current.set(tab.id, el);
              }}
              className={\`\${styles.tab} \${
                activeTab === tab.id ? styles.active : ""
              }\`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={\`panel-\${tab.id}\`}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
          <div
            className={styles.indicator}
            style={{
              transform: \`translateX(\${indicatorStyle.left}px)\`,
              width: \`\${indicatorStyle.width}px\`,
            }}
          />
        </div>
      </div>

      <div className={styles.content}>
        {activeTabData && (
          <div
            id={\`panel-\${activeTabData.id}\`}
            className={styles.panel}
            role="tabpanel"
          >
            <div className={styles.panelIcon}>{activeTabData.icon}</div>
            <h3 className={styles.panelTitle}>{activeTabData.label}</h3>
            <p className={styles.panelContent}>{activeTabData.content}</p>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>How It Works</h3>
        <ul className={styles.infoList}>
          <li>
            <strong>Position Tracking:</strong> React measures each tab's
            position using refs
          </li>
          <li>
            <strong>Smooth Transition:</strong> CSS transform and width animate
            with cubic-bezier easing
          </li>
          <li>
            <strong>Responsive Width:</strong> Indicator adjusts to match the
            active tab's width
          </li>
          <li>
            <strong>Keyboard Support:</strong> Navigate tabs with arrow keys
            (standard browser behavior)
          </li>
          <li>
            <strong>Accessibility:</strong> Proper ARIA roles and attributes for
            screen readers
          </li>
        </ul>
      </div>
    </div>
  );
}

// TabIndicator.module.css
.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: var(--space-8);
  width: 100%;
}

.tabsWrapper {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-2);
}

.tabsContainer {
  position: relative;
  display: flex;
  gap: var(--space-1);
  background-color: var(--color-background);
  border-radius: var(--radius-md);
  padding: var(--space-1);
}

.tab {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-secondary);
  background-color: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: color var(--duration-base) ease;
  z-index: 2;
  white-space: nowrap;
}

.tab:hover {
  color: var(--color-text-primary);
}

.tab.active {
  color: var(--color-accent);
}

.tabIcon {
  font-size: var(--text-lg);
}

.tabLabel {
  user-select: none;
}

.indicator {
  position: absolute;
  bottom: var(--space-1);
  left: 0;
  height: calc(100% - var(--space-1) * 2);
  background-color: var(--color-surface);
  border-radius: var(--radius-md);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    width 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 1;
  will-change: transform, width;
}

.content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.panel {
  padding: var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: center;
  animation: fadeSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.panelIcon {
  font-size: var(--text-6xl);
  margin-bottom: var(--space-4);
  animation: iconBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes iconBounce {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.panelTitle {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.panelContent {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.info {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.infoTitle {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.infoList {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.infoList li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  padding-left: var(--space-6);
  position: relative;
}

.infoList li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
}

.infoList strong {
  color: var(--color-text-primary);
  font-weight: var(--font-semibold);
}

@media (max-width: 768px) {
  .container {
    padding: var(--space-4);
  }

  .tabsContainer {
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .tabsContainer::-webkit-scrollbar {
    display: none;
  }

  .tab {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-xs);
  }

  .tabIcon {
    font-size: var(--text-base);
  }

  .panel {
    padding: var(--space-6) var(--space-4);
  }

  .panelIcon {
    font-size: var(--text-5xl);
  }

  .panelTitle {
    font-size: var(--text-xl);
  }

  .panelContent {
    font-size: var(--text-sm);
  }
}

@media (max-width: 640px) {
  .tabLabel {
    display: none;
  }

  .tab {
    padding: var(--space-3);
  }
}

@media (prefers-reduced-motion: reduce) {
  .indicator {
    transition: transform 0.15s ease, width 0.15s ease;
  }

  .panel {
    animation: simpleFade 0.2s ease;
  }

  @keyframes simpleFade {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .panelIcon {
    animation: none;
  }
}`,
  },
  {
    id: 15,
    slug: "dropdown-menu",
    title: "Dropdown Menu",
    description: "Animated dropdown with height transition and item stagger",
    category: "Navigation",
    code: `// DropdownMenu.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./DropdownMenu.module.css";

interface MenuItem {
  label: string;
  icon: string;
  description?: string;
}

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const menuItems: MenuItem[] = [
    { label: "Profile", icon: "👤", description: "View your profile" },
    { label: "Settings", icon: "⚙️", description: "Manage preferences" },
    { label: "Notifications", icon: "🔔", description: "Check updates" },
    { label: "Help", icon: "❓", description: "Get support" },
    { label: "Logout", icon: "🚪", description: "Sign out" },
  ];

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.demoArea}>
        <div className={styles.dropdownWrapper}>
          <button
            className={\`\${styles.trigger} \${isOpen ? styles.triggerOpen : ""}\`}
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span className={styles.triggerText}>My Account</span>
            <span
              className={\`\${styles.chevron} \${isOpen ? styles.chevronOpen : ""}\`}
            >
              ▼
            </span>
          </button>

          <div
            className={\`\${styles.dropdown} \${isOpen ? styles.dropdownOpen : ""}\`}
            style={{ height: \`\${height}px\` }}
          >
            <div ref={contentRef} className={styles.dropdownContent}>
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href="#"
                  className={styles.menuItem}
                  style={
                    {
                      "--item-index": index,
                    } as React.CSSProperties
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                  }}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <div className={styles.menuText}>
                    <span className={styles.menuLabel}>{item.label}</span>
                    {item.description && (
                      <span className={styles.menuDescription}>
                        {item.description}
                      </span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className={styles.instruction}>
          Click the button above to toggle the dropdown menu. Notice the smooth
          height transition and staggered item animations.
        </p>
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>Key Features</h3>
        <ul className={styles.infoList}>
          <li>
            <strong>Height Transition:</strong> Menu expands/collapses smoothly
            based on content height
          </li>
          <li>
            <strong>Staggered Items:</strong> Each item fades in with 50ms delay
          </li>
          <li>
            <strong>Chevron Rotation:</strong> Icon rotates 180° when menu opens
          </li>
          <li>
            <strong>Auto-close:</strong> Clicking an item closes the menu
          </li>
          <li>
            <strong>Accessibility:</strong> Proper ARIA attributes for screen
            readers
          </li>
        </ul>
      </div>
    </div>
  );
}

// DropdownMenu.module.css
.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: var(--space-8);
  width: 100%;
}

.demoArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  min-height: 400px;
}

.dropdownWrapper {
  position: relative;
  width: 100%;
  max-width: 320px;
}

.trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-base) ease;
}

.trigger:hover {
  border-color: var(--color-accent);
  background-color: var(--color-surface);
}

.trigger:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.triggerOpen {
  border-color: var(--color-accent);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.triggerText {
  font-weight: var(--font-semibold);
}

.chevron {
  font-size: var(--text-sm);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  color: var(--color-text-secondary);
}

.chevronOpen {
  transform: rotate(180deg);
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--color-background);
  border: 2px solid var(--color-accent);
  border-top: none;
  border-bottom-left-radius: var(--radius-md);
  border-bottom-right-radius: var(--radius-md);
  overflow: hidden;
  height: 0;
  transition: height 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 10;
}

.dropdownOpen {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.dropdownContent {
  padding: var(--space-2) 0;
}

.menuItem {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: background-color 0.2s ease, padding-left 0.2s ease;
  opacity: 0;
  transform: translateY(-10px);
}

.dropdownOpen .menuItem {
  animation: slideIn 0.3s ease forwards;
  animation-delay: calc(var(--item-index) * 50ms);
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.menuItem:hover {
  background-color: var(--color-surface);
  padding-left: var(--space-6);
}

.menuItem:active {
  background-color: var(--color-border);
}

.menuIcon {
  font-size: var(--text-xl);
  width: 24px;
  text-align: center;
  flex-shrink: 0;
}

.menuText {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex: 1;
}

.menuLabel {
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
}

.menuDescription {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.instruction {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-align: center;
  line-height: 1.6;
  margin: 0;
  max-width: 400px;
}

.info {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.infoTitle {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.infoList {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.infoList li {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  padding-left: var(--space-6);
  position: relative;
}

.infoList li::before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
}

.infoList strong {
  color: var(--color-text-primary);
  font-weight: var(--font-semibold);
}

@media (max-width: 640px) {
  .container {
    padding: var(--space-4);
  }

  .demoArea {
    padding: var(--space-6);
  }

  .dropdownWrapper {
    max-width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chevron {
    transition: transform 0.1s linear;
  }

  .dropdown {
    transition: height 0.2s ease;
  }

  .menuItem {
    animation: simpleFade 0.2s ease forwards;
    animation-delay: 0s;
  }

  @keyframes simpleFade {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .menuItem:hover {
    padding-left: var(--space-4);
  }
}`,
  },
];
