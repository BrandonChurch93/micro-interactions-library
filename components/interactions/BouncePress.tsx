"use client";

import { useState } from "react";
import styles from "./BouncePress.module.css";

export default function BouncePress() {
  const [isPressed, setIsPressed] = useState(false);
  const [pressCount, setPressCount] = useState(0);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setPressCount((prev) => prev + 1);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const resetCount = () => {
    setPressCount(0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.demoArea}>
        <button
          className={`${styles.bounceButton} ${
            isPressed ? styles.pressed : ""
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          <span className={styles.buttonText}>Press Me</span>
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Press Count:</span>
            <span className={styles.statValue}>{pressCount}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>State:</span>
            <span
              className={`${styles.statValue} ${
                isPressed ? styles.active : ""
              }`}
            >
              {isPressed ? "Pressed" : "Idle"}
            </span>
          </div>
        </div>

        <button className={styles.resetButton} onClick={resetCount}>
          Reset Count
        </button>
      </div>

      <div className={styles.info}>
        <p className={styles.infoText}>
          Press and hold the button to see the spring-based bounce animation.
          Works with both mouse and touch inputs!
        </p>
      </div>
    </div>
  );
}
