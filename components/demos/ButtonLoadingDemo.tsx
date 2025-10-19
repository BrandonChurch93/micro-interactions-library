"use client";

import { useState, useEffect } from "react";
import styles from "../interactions/ButtonLoading.module.css";

type ButtonState = "idle" | "loading" | "success" | "error";

export default function ButtonLoadingDemo() {
  const [state, setState] = useState<ButtonState>("idle");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const runSequence = async () => {
      // Start from idle
      setState("idle");
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Loading
      setState("loading");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setState("success");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Reset to idle briefly
      setState("idle");
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Loading again for error demo
      setState("loading");
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Error
      setState("error");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Loop back to start
      timeoutId = setTimeout(runSequence, 500);
    };

    runSequence();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const getButtonText = () => {
    switch (state) {
      case "loading":
        return "Loading...";
      case "success":
        return "Success!";
      case "error":
        return "Error";
      default:
        return "Click Me";
    }
  };

  return (
    <button
      className={`${styles.button} ${styles[state]} ${styles.default}`}
      disabled
    >
      {state === "loading" && (
        <span className={styles.spinner} aria-hidden="true" />
      )}
      {state === "success" && (
        <span className={styles.icon} aria-hidden="true">
          ✓
        </span>
      )}
      {state === "error" && (
        <span className={styles.icon} aria-hidden="true">
          ✕
        </span>
      )}
      <span className={styles.text}>{getButtonText()}</span>
    </button>
  );
}
