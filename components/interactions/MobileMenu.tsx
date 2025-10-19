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
        {/* Header with Hamburger */}
        <header className={styles.header}>
          <div className={styles.logo}>Logo</div>
          <button
            className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
            <span className={styles.hamburgerLine} />
          </button>
        </header>

        {/* Overlay */}
        <div
          className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
          onClick={toggleMenu}
        />

        {/* Menu */}
        <nav className={`${styles.menu} ${isOpen ? styles.menuOpen : ""}`}>
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

        {/* Main Content */}
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
