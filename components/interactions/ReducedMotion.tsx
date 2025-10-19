"use client";

import { useState } from "react";
import styles from "./ReducedMotion.module.css";

export default function ReducedMotion() {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [leftCardKey, setLeftCardKey] = useState(0);
  const [rightCardKey, setRightCardKey] = useState(0);

  const handleLeftClick = () => {
    setLeftCount((c) => c + 1);
    setLeftCardKey((k) => k + 1); // Force card re-animation
  };

  const handleRightClick = () => {
    setRightCount((c) => c + 1);
    setRightCardKey((k) => k + 1); // Force card re-animation
  };

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
        {/* Full Motion Side */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Full Motion</h3>
            <span className={styles.badge}>Default</span>
          </div>

          <div className={styles.demoArea}>
            {/* Bouncing Button */}
            <button
              className={`${styles.button} ${styles.fullMotion}`}
              onClick={handleLeftClick}
            >
              <span className={styles.buttonIcon}>🎯</span>
              <span>Click Me ({leftCount})</span>
            </button>

            {/* Loading Spinner */}
            <div className={styles.spinnerWrapper}>
              <div className={`${styles.spinner} ${styles.fullMotion}`} />
              <p className={styles.label}>Loading Spinner</p>
            </div>

            {/* Sliding Card */}
            <div
              key={leftCardKey}
              className={`${styles.card} ${styles.fullMotion}`}
            >
              <div className={styles.cardIcon}>✨</div>
              <h4>Animated Card</h4>
              <p>Slides in with bounce</p>
            </div>
          </div>
        </div>

        {/* Reduced Motion Side */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Reduced Motion</h3>
            <span className={`${styles.badge} ${styles.badgeReduced}`}>
              Accessible
            </span>
          </div>

          <div className={styles.demoArea}>
            {/* Simple Button */}
            <button
              className={`${styles.button} ${styles.reducedMotion}`}
              onClick={handleRightClick}
            >
              <span className={styles.buttonIcon}>🎯</span>
              <span>Click Me ({rightCount})</span>
            </button>

            {/* Reduced Spinner */}
            <div className={styles.spinnerWrapper}>
              <div className={`${styles.spinner} ${styles.reducedMotion}`} />
              <p className={styles.label}>Loading Spinner</p>
            </div>

            {/* Simple Card */}
            <div
              key={rightCardKey}
              className={`${styles.card} ${styles.reducedMotion}`}
            >
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
          differs. Click the buttons to replay the card animations! This is a
          WCAG 2.1 Level AAA requirement.
        </p>
      </div>
    </div>
  );
}
