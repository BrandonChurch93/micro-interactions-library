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
            className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
            onClick={toggleDropdown}
            aria-expanded={isOpen}
            aria-haspopup="true"
          >
            <span className={styles.triggerText}>My Account</span>
            <span
              className={`${styles.chevron} ${
                isOpen ? styles.chevronOpen : ""
              }`}
            >
              ▼
            </span>
          </button>

          <div
            className={`${styles.dropdown} ${
              isOpen ? styles.dropdownOpen : ""
            }`}
            style={{ height: `${height}px` }}
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
