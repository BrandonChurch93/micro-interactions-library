"use client";

import { useState } from "react";
import styles from "./ButtonLoading.module.css";

type ButtonState = "idle" | "loading" | "success" | "error";
type Variant = "default" | "minimal" | "bold";

export default function ButtonLoading() {
  const [state, setState] = useState<ButtonState>("idle");
  const [variant, setVariant] = useState<Variant>("default");
  const [forceOutcome, setForceOutcome] = useState<
    "random" | "success" | "error"
  >("random");

  const handleClick = async () => {
    if (state !== "idle") return;

    // Start loading
    setState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Determine outcome based on forceOutcome setting
    let success: boolean;
    if (forceOutcome === "success") {
      success = true;
    } else if (forceOutcome === "error") {
      success = false;
    } else {
      // Random (70% success rate)
      success = Math.random() > 0.3;
    }

    setState(success ? "success" : "error");

    // Reset after showing result
    setTimeout(() => {
      setState("idle");
    }, 2000);
  };

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
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles[state]} ${styles[variant]}`}
        onClick={handleClick}
        disabled={state !== "idle"}
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

      <div className={styles.controls}>
        <p className={styles.variantLabel}>Variant:</p>
        <div className={styles.variantButtons}>
          <button
            className={`${styles.variantButton} ${
              variant === "default" ? styles.active : ""
            }`}
            onClick={() => setVariant("default")}
          >
            Default
          </button>
          <button
            className={`${styles.variantButton} ${
              variant === "minimal" ? styles.active : ""
            }`}
            onClick={() => setVariant("minimal")}
          >
            Minimal
          </button>
          <button
            className={`${styles.variantButton} ${
              variant === "bold" ? styles.active : ""
            }`}
            onClick={() => setVariant("bold")}
          >
            Bold
          </button>
        </div>
      </div>

      <div className={styles.controls}>
        <p className={styles.variantLabel}>Outcome:</p>
        <div className={styles.variantButtons}>
          <button
            className={`${styles.variantButton} ${
              forceOutcome === "random" ? styles.active : ""
            }`}
            onClick={() => setForceOutcome("random")}
          >
            Random
          </button>
          <button
            className={`${styles.variantButton} ${
              forceOutcome === "success" ? styles.active : ""
            }`}
            onClick={() => setForceOutcome("success")}
          >
            Success
          </button>
          <button
            className={`${styles.variantButton} ${
              forceOutcome === "error" ? styles.active : ""
            }`}
            onClick={() => setForceOutcome("error")}
          >
            Error
          </button>
        </div>
      </div>

      <div className={styles.stateIndicator}>
        <p className={styles.stateLabel}>Current State:</p>
        <code className={styles.stateValue}>{state}</code>
      </div>
    </div>
  );
}
