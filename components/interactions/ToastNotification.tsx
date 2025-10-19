"use client";

import { useState, useEffect } from "react";
import styles from "./ToastNotification.module.css";

type ToastVariant = "success" | "error" | "warning" | "info";
type ToastPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

interface Toast {
  id: number;
  variant: ToastVariant;
  message: string;
}

export default function ToastNotifications() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [position, setPosition] = useState<ToastPosition>("top-right");
  const [nextId, setNextId] = useState(0);

  const getToastMessage = (variant: ToastVariant): string => {
    switch (variant) {
      case "success":
        return "Action completed successfully!";
      case "error":
        return "Something went wrong. Please try again.";
      case "warning":
        return "Warning: Please review your changes.";
      case "info":
        return "Here's some helpful information.";
    }
  };

  const showToast = (variant: ToastVariant) => {
    const newToast: Toast = {
      id: nextId,
      variant,
      message: getToastMessage(variant),
    };

    setToasts((prev) => [...prev, newToast]);
    setNextId((prev) => prev + 1);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      dismissToast(newToast.id);
    }, 3000);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const getPositionClass = () => {
    switch (position) {
      case "top-right":
        return styles.topRight;
      case "top-left":
        return styles.topLeft;
      case "bottom-right":
        return styles.bottomRight;
      case "bottom-left":
        return styles.bottomLeft;
    }
  };

  return (
    <div className={styles.container}>
      {/* Toast Container */}
      <div className={`${styles.toastContainer} ${getPositionClass()}`}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles.toast} ${styles[toast.variant]}`}
          >
            <div className={styles.toastIcon}>
              {toast.variant === "success" && "✓"}
              {toast.variant === "error" && "✕"}
              {toast.variant === "warning" && "⚠"}
              {toast.variant === "info" && "ℹ"}
            </div>
            <div className={styles.toastContent}>
              <p className={styles.toastMessage}>{toast.message}</p>
            </div>
            <button
              className={styles.dismissButton}
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.variantButtons}>
          <p className={styles.label}>Show Toast:</p>
          <div
            style={{
              display: "flex",
              gap: "var(--space-2)",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <button
              className={`${styles.button} ${styles.successButton}`}
              onClick={() => showToast("success")}
            >
              Success
            </button>
            <button
              className={`${styles.button} ${styles.errorButton}`}
              onClick={() => showToast("error")}
            >
              Error
            </button>
            <button
              className={`${styles.button} ${styles.warningButton}`}
              onClick={() => showToast("warning")}
            >
              Warning
            </button>
            <button
              className={`${styles.button} ${styles.infoButton}`}
              onClick={() => showToast("info")}
            >
              Info
            </button>
          </div>
        </div>

        <div className={styles.positionSelector}>
          <p className={styles.label}>Position:</p>
          <div className={styles.positionGrid}>
            <button
              className={`${styles.positionButton} ${
                position === "top-left" ? styles.active : ""
              }`}
              onClick={() => setPosition("top-left")}
            >
              ↖
            </button>
            <button
              className={`${styles.positionButton} ${
                position === "top-right" ? styles.active : ""
              }`}
              onClick={() => setPosition("top-right")}
            >
              ↗
            </button>
            <button
              className={`${styles.positionButton} ${
                position === "bottom-left" ? styles.active : ""
              }`}
              onClick={() => setPosition("bottom-left")}
            >
              ↙
            </button>
            <button
              className={`${styles.positionButton} ${
                position === "bottom-right" ? styles.active : ""
              }`}
              onClick={() => setPosition("bottom-right")}
            >
              ↘
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
