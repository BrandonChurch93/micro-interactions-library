"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ProgressBar.module.css";

type Variant = "linear" | "accelerated";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [variant, setVariant] = useState<Variant>("linear");
  const [customColor, setCustomColor] = useState("#3b82f6");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startProgress = () => {
    if (isRunning) return;

    setProgress(0);
    setIsRunning(true);

    const duration = 3000; // 3 seconds
    const steps = 100;
    const stepDuration = duration / steps;
    let currentStep = 0;

    intervalRef.current = setInterval(() => {
      currentStep++;

      if (currentStep >= steps) {
        setProgress(100);
        setIsRunning(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      if (variant === "linear") {
        setProgress(currentStep);
      } else {
        // Accelerated: slow at start, fast at end
        const easedProgress = easeInCubic(currentStep / steps) * 100;
        setProgress(Math.min(easedProgress, 100));
      }
    }, stepDuration);
  };

  const easeInCubic = (t: number): number => {
    return t * t * t;
  };

  const resetProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setProgress(0);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Completion pulse effect
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setShowPulse(true);
      const timer = setTimeout(() => setShowPulse(false), 600);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className={styles.container}>
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
              backgroundColor: customColor,
            }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.buttonGroup}>
          <button
            className={styles.startButton}
            onClick={startProgress}
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "Start"}
          </button>
          <button
            className={styles.resetButton}
            onClick={resetProgress}
            disabled={!isRunning && progress === 0}
          >
            Reset
          </button>
        </div>

        <div className={styles.variantSelector}>
          <p className={styles.label}>Variant:</p>
          <div className={styles.variantButtons}>
            <button
              className={`${styles.variantButton} ${
                variant === "linear" ? styles.active : ""
              }`}
              onClick={() => setVariant("linear")}
              disabled={isRunning}
            >
              Linear
            </button>
            <button
              className={`${styles.variantButton} ${
                variant === "accelerated" ? styles.active : ""
              }`}
              onClick={() => setVariant("accelerated")}
              disabled={isRunning}
            >
              Accelerated
            </button>
          </div>
        </div>

        <div className={styles.colorSelector}>
          <p className={styles.label}>Color:</p>
          <div className={styles.colorOptions}>
            <button
              className={`${styles.colorButton} ${
                customColor === "#3b82f6" ? styles.active : ""
              }`}
              style={{ backgroundColor: "#3b82f6" }}
              onClick={() => setCustomColor("#3b82f6")}
              disabled={isRunning}
              aria-label="Blue"
            />
            <button
              className={`${styles.colorButton} ${
                customColor === "#10b981" ? styles.active : ""
              }`}
              style={{ backgroundColor: "#10b981" }}
              onClick={() => setCustomColor("#10b981")}
              disabled={isRunning}
              aria-label="Green"
            />
            <button
              className={`${styles.colorButton} ${
                customColor === "#f59e0b" ? styles.active : ""
              }`}
              style={{ backgroundColor: "#f59e0b" }}
              onClick={() => setCustomColor("#f59e0b")}
              disabled={isRunning}
              aria-label="Orange"
            />
            <button
              className={`${styles.colorButton} ${
                customColor === "#8b5cf6" ? styles.active : ""
              }`}
              style={{ backgroundColor: "#8b5cf6" }}
              onClick={() => setCustomColor("#8b5cf6")}
              disabled={isRunning}
              aria-label="Purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
