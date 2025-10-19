"use client";

import { useState, useRef } from "react";
import styles from "./RippleEffect.module.css";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function RippleEffect() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [nextId, setNextId] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();

    // Calculate click position relative to button
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple: Ripple = {
      id: nextId,
      x,
      y,
    };

    setRipples((prev) => [...prev, newRipple]);
    setNextId((prev) => prev + 1);

    // Remove ripple after animation completes (600ms)
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className={styles.container}>
      <div className={styles.demoArea}>
        <button
          ref={buttonRef}
          className={styles.rippleButton}
          onClick={handleClick}
        >
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className={styles.ripple}
              style={{
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
              }}
            />
          ))}
          <span className={styles.buttonText}>Click Anywhere</span>
        </button>
      </div>

      <div className={styles.info}>
        <p className={styles.infoText}>
          Click anywhere on the button to see the ripple effect spawn at that
          exact location. Multiple clicks create multiple ripples!
        </p>
        <div className={styles.stats}>
          <span className={styles.statLabel}>Active Ripples:</span>
          <span className={styles.statValue}>{ripples.length}</span>
        </div>
      </div>
    </div>
  );
}
