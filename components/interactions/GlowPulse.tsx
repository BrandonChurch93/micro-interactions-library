"use client";

import { useState } from "react";
import styles from "./GlowPulse.module.css";

interface Glow {
  id: number;
}

export default function GlowPulse() {
  const [glows, setGlows] = useState<Glow[]>([]);
  const [nextId, setNextId] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    const newGlow: Glow = {
      id: nextId,
    };

    setGlows((prev) => [...prev, newGlow]);
    setNextId((prev) => prev + 1);
    setClickCount((prev) => prev + 1);

    // Remove glow after animation completes (800ms)
    setTimeout(() => {
      setGlows((prev) => prev.filter((glow) => glow.id !== newGlow.id));
    }, 800);
  };

  const resetCount = () => {
    setClickCount(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.demoArea}>
        <button className={styles.glowButton} onClick={handleClick}>
          {glows.map((glow) => (
            <span key={glow.id} className={styles.glow} />
          ))}
          <span className={styles.buttonText}>Click Me</span>
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Click Count:</span>
            <span className={styles.statValue}>{clickCount}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Active Glows:</span>
            <span className={styles.statValue}>{glows.length}</span>
          </div>
        </div>

        <button className={styles.resetButton} onClick={resetCount}>
          Reset Count
        </button>
      </div>

      <div className={styles.info}>
        <p className={styles.infoText}>
          Click the button to trigger an expanding glow pulse. Multiple clicks
          stack nicely! Works best on dark backgrounds.
        </p>
      </div>
    </div>
  );
}
