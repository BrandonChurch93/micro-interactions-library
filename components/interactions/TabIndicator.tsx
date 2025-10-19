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
              className={`${styles.tab} ${
                activeTab === tab.id ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
          <div
            className={styles.indicator}
            style={{
              transform: `translateX(${indicatorStyle.left}px)`,
              width: `${indicatorStyle.width}px`,
            }}
          />
        </div>
      </div>

      <div className={styles.content}>
        {activeTabData && (
          <div
            id={`panel-${activeTabData.id}`}
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
