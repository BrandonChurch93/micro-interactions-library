"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../interactions/ProgressBar.module.css";

export default function ProgressBarDemo() {
  const [progress, setProgress] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const runProgress = () => {
      setProgress(0);

      const duration = 3000; // 3 seconds
      const steps = 100;
      const stepDuration = duration / steps;
      let currentStep = 0;

      intervalRef.current = setInterval(() => {
        currentStep++;

        if (currentStep >= steps) {
          setProgress(100);
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }

          // Show pulse effect
          setShowPulse(true);
          setTimeout(() => setShowPulse(false), 600);

          // Restart after completion
          setTimeout(runProgress, 2000);
          return;
        }

        setProgress(currentStep);
      }, stepDuration);
    };

    // Start immediately
    runProgress();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.progressWrapper}>
      <div className={styles.header}>
        <h3 className={styles.title}>Progress</h3>
        <div className={styles.counter}>{Math.round(progress)}%</div>
      </div>

      <div className={styles.barContainer}>
        <div
          className={`${styles.bar} ${showPulse ? styles.pulse : ""}`}
          style={{
            transform: `scaleX(${progress / 100})`,
            backgroundColor: "#3b82f6",
          }}
        />
      </div>
    </div>
  );
}
