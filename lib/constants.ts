/**
 * Component metadata and constants for the Micro-Interactions Library
 */

export type Category =
  | "State Transitions"
  | "Click Feedback"
  | "Accessibility"
  | "Navigation";

export interface Component {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: Category;
  code: string;
}

export const CATEGORIES: Category[] = [
  "State Transitions",
  "Click Feedback",
  "Accessibility",
  "Navigation",
];

export const COMPONENTS_PART1: Component[] = [
  // State Transitions (5)
  {
    id: 1,
    slug: "button-loading",
    title: "Button Loading States",
    description:
      "Interactive button with idle, loading, success, and error states",
    category: "State Transitions",
    code: `// ButtonLoading.tsx
"use client";

import { useState } from "react";
import styles from "./ButtonLoading.module.css";

type ButtonState = "idle" | "loading" | "success" | "error";

export default function ButtonLoading() {
  const [state, setState] = useState<ButtonState>("idle");

  const handleClick = async () => {
    if (state !== "idle") return;

    setState("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const success = Math.random() > 0.3;
    setState(success ? "success" : "error");

    setTimeout(() => setState("idle"), 2000);
  };

  const getButtonText = () => {
    switch (state) {
      case "loading": return "Loading...";
      case "success": return "Success!";
      case "error": return "Error";
      default: return "Click Me";
    }
  };

  return (
    <button
      className={\`\${styles.button} \${styles[state]}\`}
      onClick={handleClick}
      disabled={state !== "idle"}
    >
      {state === "loading" && <span className={styles.spinner} />}
      {state === "success" && <span className={styles.icon}>✓</span>}
      {state === "error" && <span className={styles.icon}>✕</span>}
      <span>{getButtonText()}</span>
    </button>
  );
}

// ButtonLoading.module.css
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 160px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 200ms ease;
}

.button:disabled { cursor: not-allowed; }

.button.idle:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.button.idle:active { transform: scale(0.98); }

.button.loading { min-width: 180px; }

.button.success {
  background-color: #10b981;
  animation: successBounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes successBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.button.error {
  background-color: #ef4444;
  animation: errorShake 0.5s ease;
}

@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.icon {
  font-size: 1.125rem;
  font-weight: 700;
  animation: iconScale 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes iconScale {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}`,
  },
  {
    id: 2,
    slug: "skeleton-to-content",
    title: "Skeleton to Content",
    description: "Smooth transition from loading skeleton to actual content",
    category: "State Transitions",
    code: `// SkeletonToContent.tsx
"use client";

import { useState } from "react";
import styles from "./SkeletonToContent.module.css";

type Variant = "card" | "list" | "profile";

export default function SkeletonToContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [variant, setVariant] = useState<Variant>("card");

  const handleReplay = () => {
    setIsLoaded(false);
    setTimeout(() => setIsLoaded(true), 100);
  };

  // Auto-play on mount
  useState(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    return () => clearTimeout(timer);
  });

  return (
    <div className={styles.container}>
      {variant === "card" && (
        <div className={styles.wrapper}>
          <div className={\`\${styles.skeleton} \${isLoaded ? styles.hidden : ""}\`}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonBar} style={{ width: "80%" }} />
            <div className={styles.skeletonBar} />
            <div className={styles.skeletonBar} style={{ width: "60%" }} />
          </div>
          <div className={\`\${styles.content} \${isLoaded ? styles.visible : ""}\`}>
            <div className={styles.image} />
            <h3>Interactive Card Component</h3>
            <p>This is a beautiful card component with smooth loading animation</p>
          </div>
        </div>
      )}
      <button onClick={handleReplay}>↻ Replay</button>
    </div>
  );
}

// SkeletonToContent.module.css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
}

.wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
  min-height: 340px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
}

.skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  opacity: 1;
  transition: opacity 300ms ease;
}

.skeleton.hidden {
  opacity: 0;
  pointer-events: none;
}

.skeletonImage,
.skeletonBar {
  background: linear-gradient(90deg, #e5e7eb 0%, #f9fafb 50%, #e5e7eb 100%);
  background-size: 200% 100%;
  animation: pulse 1.5s ease-in-out infinite;
  border-radius: 0.5rem;
}

@keyframes pulse {
  0%, 100% { background-position: 200% 0; opacity: 0.5; }
  50% { opacity: 0.8; }
}

.skeletonImage {
  width: 100%;
  height: 200px;
  margin-bottom: 1rem;
}

.skeletonBar {
  height: 12px;
  margin-bottom: 0.75rem;
}

.content {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 300ms ease, transform 300ms ease;
}

.content.visible {
  opacity: 1;
  transform: translateY(0);
}

.image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
}`,
  },
  {
    id: 3,
    slug: "toast-notification",
    title: "Toast Notifications",
    description:
      "Elegant toast notifications with multiple positions and variants",
    category: "State Transitions",
    code: `// ToastNotifications.tsx
"use client";

import { useState } from "react";
import styles from "./ToastNotifications.module.css";

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

  const showToast = (variant: ToastVariant) => {
    const messages = {
      success: "Action completed successfully!",
      error: "Something went wrong. Please try again.",
      warning: "Warning: Please review your changes.",
      info: "Here's some helpful information."
    };

    const newToast = { id: nextId, variant, message: messages[variant] };
    setToasts((prev) => [...prev, newToast]);
    setNextId((prev) => prev + 1);

    setTimeout(() => dismissToast(newToast.id), 3000);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={\`\${styles.toastContainer} \${styles[position.replace("-", "")]}\`}>
        {toasts.map((toast) => (
          <div key={toast.id} className={\`\${styles.toast} \${styles[toast.variant]}\`}>
            <div className={styles.toastIcon}>
              {toast.variant === "success" && "✓"}
              {toast.variant === "error" && "✕"}
              {toast.variant === "warning" && "⚠"}
              {toast.variant === "info" && "ℹ"}
            </div>
            <p className={styles.toastMessage}>{toast.message}</p>
            <button onClick={() => dismissToast(toast.id)}>✕</button>
          </div>
        ))}
      </div>
      <button onClick={() => showToast("success")}>Show Success</button>
    </div>
  );
}

// ToastNotifications.module.css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  min-height: 400px;
}

.toastContainer {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 9999;
  pointer-events: none;
}

.toastContainer.topright { top: 1rem; right: 1rem; }
.toastContainer.topleft { top: 1rem; left: 1rem; }
.toastContainer.bottomright { bottom: 1rem; right: 1rem; }
.toastContainer.bottomleft { bottom: 1rem; left: 1rem; }

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 320px;
  padding: 1rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  animation: slideInRight 0.3s ease-out forwards;
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.toast.success { border-left: 4px solid #10b981; }
.toast.error { border-left: 4px solid #ef4444; }
.toast.warning { border-left: 4px solid #f59e0b; }
.toast.info { border-left: 4px solid #3b82f6; }

.toastIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-weight: 700;
}

.toast.success .toastIcon { color: #10b981; background: rgba(16, 185, 129, 0.1); }
.toast.error .toastIcon { color: #ef4444; background: rgba(239, 68, 68, 0.1); }
.toast.warning .toastIcon { color: #f59e0b; background: rgba(245, 158, 11, 0.1); }
.toast.info .toastIcon { color: #3b82f6; background: rgba(59, 130, 246, 0.1); }

button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}`,
  },
  {
    id: 4,
    slug: "form-validation",
    title: "Form Input Validation",
    description: "Real-time form validation with visual feedback",
    category: "State Transitions",
    code: `// FormValidation.tsx
"use client";

import { useState, useEffect } from "react";
import styles from "./FormValidation.module.css";

type ValidationState = "empty" | "invalid" | "valid";

export default function FormValidation() {
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<ValidationState>("empty");
  const [password, setPassword] = useState("");
  const [passwordState, setPasswordState] = useState<ValidationState>("empty");

  const validateEmail = (value: string) => {
    if (value === "") return "empty";
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value) ? "valid" : "invalid";
  };

  const validatePassword = (value: string) => {
    if (value === "") return "empty";
    return value.length >= 8 ? "valid" : "invalid";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email) setEmailState(validateEmail(email));
      if (password) setPasswordState(validatePassword(password));
    }, 500);
    return () => clearTimeout(timer);
  }, [email, password]);

  return (
    <form className={styles.form}>
      <div className={styles.fieldWrapper}>
        <label className={styles.label}>Email Address</label>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={\`\${styles.input} \${styles[emailState]}\`}
            placeholder="Enter your email"
          />
          {emailState === "valid" && <span className={styles.validIcon}>✓</span>}
          {emailState === "invalid" && <span className={styles.invalidIcon}>✕</span>}
        </div>
        {emailState === "invalid" && (
          <p className={styles.error}>Please enter a valid email</p>
        )}
      </div>

      <div className={styles.fieldWrapper}>
        <label className={styles.label}>Password</label>
        <div className={styles.inputWrapper}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={\`\${styles.input} \${styles[passwordState]}\`}
            placeholder="Enter your password"
          />
          {passwordState === "valid" && <span className={styles.validIcon}>✓</span>}
          {passwordState === "invalid" && <span className={styles.invalidIcon}>✕</span>}
        </div>
        {passwordState === "invalid" && (
          <p className={styles.error}>Password must be at least 8 characters</p>
        )}
      </div>
    </form>
  );
}

// FormValidation.module.css
.form {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.fieldWrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  outline: none;
  transition: all 200ms ease;
}

.input.valid {
  border-color: #10b981;
}

.input.invalid {
  border-color: #ef4444;
  animation: shake 0.3s ease;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.validIcon,
.invalidIcon {
  position: absolute;
  right: 1rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 700;
  animation: iconScale 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes iconScale {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.validIcon {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.invalidIcon {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.error {
  font-size: 0.75rem;
  color: #ef4444;
  margin: 0;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}`,
  },
  {
    id: 5,
    slug: "progress-bar",
    title: "Progress Bar",
    description: "Animated progress bar with synchronized counter",
    category: "State Transitions",
    code: `// ProgressBar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ProgressBar.module.css";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [variant, setVariant] = useState<"linear" | "accelerated">("linear");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const easeInCubic = (t: number) => t * t * t;

  const startProgress = () => {
    if (isRunning) return;
    setProgress(0);
    setIsRunning(true);

    const duration = 3000;
    const steps = 100;
    let currentStep = 0;

    intervalRef.current = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setProgress(100);
        setIsRunning(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }

      if (variant === "linear") {
        setProgress(currentStep);
      } else {
        setProgress(Math.min(easeInCubic(currentStep / steps) * 100, 100));
      }
    }, duration / steps);
  };

  const resetProgress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Progress</h3>
        <div className={styles.counter}>{Math.round(progress)}%</div>
      </div>
      <div className={styles.barContainer}>
        <div
          className={styles.bar}
          style={{ transform: \`scaleX(\${progress / 100})\` }}
        />
      </div>
      <button onClick={startProgress} disabled={isRunning}>
        {isRunning ? "Running..." : "Start"}
      </button>
      <button onClick={resetProgress}>Reset</button>
    </div>
  );
}

// ProgressBar.module.css
.container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.counter {
  font-family: "SF Mono", Monaco, monospace;
  font-size: 1.5rem;
  font-weight: 700;
  color: #3b82f6;
  min-width: 70px;
  text-align: right;
}

.barContainer {
  position: relative;
  width: 100%;
  height: 24px;
  background-color: #f9fafb;
  border-radius: 9999px;
  overflow: hidden;
}

.bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3b82f6;
  border-radius: 9999px;
  transform-origin: left;
  transition: transform 30ms linear;
  will-change: transform;
}

.bar.complete {
  animation: pulse 0.6s ease;
}

@keyframes pulse {
  0%, 100% { transform: scaleX(1) scaleY(1); }
  50% { transform: scaleX(1) scaleY(1.15); }
}

button {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
  },

  // Click Feedback (4)
  {
    id: 6,
    slug: "ripple-effect",
    title: "Ripple Effect",
    description: "Material Design-inspired ripple effect on click",
    category: "Click Feedback",
    code: `// RippleEffect.tsx
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: nextId, x, y };
    setRipples((prev) => [...prev, newRipple]);
    setNextId((prev) => prev + 1);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <button ref={buttonRef} className={styles.button} onClick={handleClick}>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{ left: \`\${ripple.x}px\`, top: \`\${ripple.y}px\` }}
        />
      ))}
      <span className={styles.text}>Click Anywhere</span>
    </button>
  );
}

// RippleEffect.module.css
.button {
  position: relative;
  min-width: 300px;
  min-height: 200px;
  padding: 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  overflow: hidden;
}

.text {
  position: relative;
  z-index: 1;
  pointer-events: none;
}

.ripple {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none;
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(4);
    opacity: 0;
  }
}`,
  },
  {
    id: 7,
    slug: "bounce-press",
    title: "Bounce Press",
    description: "Satisfying spring-based bounce animation on press",
    category: "Click Feedback",
    code: `// BouncePress.tsx
"use client";

import { useState } from "react";
import styles from "./BouncePress.module.css";

export default function BouncePress() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      className={\`\${styles.button} \${isPressed ? styles.pressed : ""}\`}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
    >
      Press Me
    </button>
  );
}

// BouncePress.module.css
.button {
  min-width: 200px;
  min-height: 200px;
  padding: 1.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 150ms ease;
}

.button.pressed {
  transform: scale(0.95);
  transition: transform 100ms cubic-bezier(0.4, 0, 1, 1);
}

.button:not(.pressed) {
  animation: bounce 350ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes bounce {
  0% { transform: scale(0.95); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}`,
  },
  {
    id: 8,
    slug: "glow-pulse",
    title: "Glow Pulse",
    description: "Expanding glow effect on interaction",
    category: "Click Feedback",
    code: `// GlowPulse.tsx
"use client";

import { useState } from "react";
import styles from "./GlowPulse.module.css";

interface Glow {
  id: number;
}

export default function GlowPulse() {
  const [glows, setGlows] = useState<Glow[]>([]);
  const [nextId, setNextId] = useState(0);

  const handleClick = () => {
    const newGlow = { id: nextId };
    setGlows((prev) => [...prev, newGlow]);
    setNextId((prev) => prev + 1);

    setTimeout(() => {
      setGlows((prev) => prev.filter((glow) => glow.id !== newGlow.id));
    }, 800);
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {glows.map((glow) => (
        <span key={glow.id} className={styles.glow} />
      ))}
      <span className={styles.text}>Click Me</span>
    </button>
  );
}

// GlowPulse.module.css
.button {
  position: relative;
  min-width: 180px;
  padding: 1rem 1.5rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  z-index: 1;
}

.text {
  position: relative;
  z-index: 2;
  pointer-events: none;
}

.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border-radius: 0.5rem;
  pointer-events: none;
  animation: glowPulse 0.8s ease-out;
  z-index: 0;
}

@keyframes glowPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.6);
    opacity: 1;
  }
  100% {
    box-shadow: 0 0 0 30px rgba(59, 130, 246, 0);
    opacity: 0;
  }
}`,
  },
  {
    id: 9,
    slug: "confetti-burst",
    title: "Confetti Burst",
    description: "Celebratory confetti explosion with physics",
    category: "Click Feedback",
    code: `// ConfettiBurst.tsx
"use client";

import { useState, useRef } from "react";
import styles from "./ConfettiBurst.module.css";

interface Particle {
  id: number;
  color: string;
  angle: number;
  distance: number;
  rotation: number;
}

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function ConfettiBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [nextId, setNextId] = useState(0);
  const [burstCount, setBurstCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const createBurst = () => {
    const particleCount = Math.floor(Math.random() * 6) + 15;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: nextId + i,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        angle: Math.random() * 360,
        distance: Math.random() * 100 + 50,
        rotation: Math.random() * 720,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);
    setNextId((prev) => prev + particleCount);
    setBurstCount((prev) => prev + 1);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 1000);
  };

  const resetCount = () => {
    setBurstCount(0);
  };

  const animateParticle = (element: HTMLDivElement | null, particle: Particle) => {
    if (!element) return;

    const radians = (particle.angle * Math.PI) / 180;
    const endX = Math.cos(radians) * particle.distance;
    const endY = Math.sin(radians) * particle.distance + 50;

    element.animate(
      [
        {
          transform: "translate(-50%, -50%) translate(0, 0) rotate(0deg)",
          opacity: 1,
        },
        {
          transform: \`translate(-50%, -50%) translate(\${endX}px, \${endY}px) rotate(\${particle.rotation}deg)\`,
          opacity: 0,
        },
      ],
      {
        duration: 1000,
        easing: "cubic-bezier(0, 0, 0.2, 1)",
        fill: "forwards",
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.demoArea} ref={containerRef}>
        <button className={styles.burstButton} onClick={createBurst}>
          {particles.map((particle) => (
            <div
              key={particle.id}
              ref={(el) => animateParticle(el, particle)}
              className={styles.particle}
              style={{ backgroundColor: particle.color }}
            />
          ))}
          <span className={styles.buttonText}>🎉 Celebrate!</span>
        </button>
      </div>

      <div className={styles.controls}>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Burst Count</span>
            <span className={styles.statValue}>{burstCount}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Active Particles</span>
            <span className={styles.statValue}>{particles.length}</span>
          </div>
        </div>
        <button className={styles.resetButton} onClick={resetCount}>
          Reset Count
        </button>
      </div>

      <div className={styles.info}>
        <p className={styles.infoText}>
          Click the button to trigger a celebratory confetti burst! Each burst
          spawns 15-20 particles with realistic physics including gravity and
          rotation.
        </p>
      </div>
    </div>
  );
}

// ConfettiBurst.module.css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-8);
  width: 100%;
}

.demoArea {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 400px;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
}

.burstButton {
  position: relative;
  min-width: 200px;
  padding: var(--space-4) var(--space-6);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: white;
  background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
  border: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--duration-base) ease;
  z-index: 1;
  box-shadow: var(--shadow-lg);
}

.burstButton:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: var(--shadow-xl);
}

.burstButton:active {
  transform: scale(0.98);
}

.buttonText {
  position: relative;
  z-index: 2;
  pointer-events: none;
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 4px;
  border-radius: 2px;
  pointer-events: none;
  z-index: 10;
}

.controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  width: 100%;
  max-width: 400px;
}

.stats {
  display: flex;
  gap: var(--space-6);
  width: 100%;
  justify-content: center;
}

.statItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  min-width: 140px;
}

.statLabel {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.statValue {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-accent);
}

.resetButton {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-base) ease;
}

.resetButton:hover {
  border-color: var(--color-accent);
  background-color: var(--color-background);
}

.resetButton:active {
  transform: scale(0.98);
}

.info {
  width: 100%;
  max-width: 500px;
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.infoText {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .demoArea {
    min-height: 300px;
  }

  .burstButton {
    min-width: 160px;
    font-size: var(--text-lg);
  }

  .stats {
    flex-direction: column;
    gap: var(--space-3);
  }

  .statItem {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .particle {
    animation: none !important;
  }

  .burstButton:hover {
    transform: none;
  }

  .burstButton:active {
    transform: none;
  }

  .resetButton:active {
    transform: none;
  }
}`,
  },

  // Accessibility (3)
  {
    id: 10,
    slug: "focus-indicators",
    title: "Focus Indicators",
    description: "Three variants of accessible focus indicators",
    category: "Accessibility",
    code: `// FocusIndicators.tsx
"use client";

import { useState } from "react";
import styles from "./FocusIndicators.module.css";

type Variant = "glow" | "offset" | "animated";

export default function FocusIndicators() {
  const [variant, setVariant] = useState<Variant>("glow");

  return (
    <div className={styles.container}>
      <div className={styles.variantSelector}>
        <button
          onClick={() => setVariant("glow")}
          className={\`\${styles.variantButton} \${
            variant === "glow" ? styles.active : ""
          }\`}
        >
          Glow
        </button>
        <button
          onClick={() => setVariant("offset")}
          className={\`\${styles.variantButton} \${
            variant === "offset" ? styles.active : ""
          }\`}
        >
          Offset
        </button>
        <button
          onClick={() => setVariant("animated")}
          className={\`\${styles.variantButton} \${
            variant === "animated" ? styles.active : ""
          }\`}
        >
          Animated
        </button>
      </div>

      <div className={styles.demoArea}>
        <p className={styles.instruction}>
          Press <kbd className={styles.kbd}>Tab</kbd> to navigate between
          elements
        </p>

        {variant === "glow" && (
          <div className={styles.glowDemo}>
            <button className={styles.glowButton}>Button 1</button>
            <button className={styles.glowButton}>Button 2</button>
            <button className={styles.glowButton}>Button 3</button>
            <input
              type="text"
              placeholder="Input field"
              className={styles.glowInput}
            />
          </div>
        )}

        {variant === "offset" && (
          <div className={styles.offsetDemo}>
            <button className={styles.offsetButton}>Button 1</button>
            <button className={styles.offsetButton}>Button 2</button>
            <button className={styles.offsetButton}>Button 3</button>
            <input
              type="text"
              placeholder="Input field"
              className={styles.offsetInput}
            />
          </div>
        )}

        {variant === "animated" && (
          <div className={styles.animatedDemo}>
            <button className={styles.animatedButton}>Button 1</button>
            <button className={styles.animatedButton}>Button 2</button>
            <button className={styles.animatedButton}>Button 3</button>
            <input
              type="text"
              placeholder="Input field"
              className={styles.animatedInput}
            />
          </div>
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>About Focus Indicators</h3>
        <p className={styles.infoText}>
          <strong>Glow:</strong> Soft box-shadow that expands outward
          <br />
          <strong>Offset:</strong> Solid outline with 2px offset from element
          <br />
          <strong>Animated:</strong> Pulsing ring that scales and fades
        </p>
        <p className={styles.infoText}>
          All variants meet WCAG 2.1 Level AA requirements for focus visibility
          and use <code>:focus-visible</code> to only show when navigating with
          keyboard.
        </p>
      </div>
    </div>
  );
}

// FocusIndicators.module.css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-8);
  width: 100%;
}

.variantSelector {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-2);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.variantButton {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-secondary);
  background-color: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-base) ease;
}

.variantButton:hover {
  color: var(--color-text-primary);
  background-color: var(--color-background);
}

.variantButton.active {
  color: white;
  background-color: var(--color-accent);
}

.demoArea {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
  width: 100%;
  max-width: 600px;
  padding: var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  min-height: 300px;
}

.instruction {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0;
}

.kbd {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 0 0 var(--color-border);
}

.glowDemo,
.offsetDemo,
.animatedDemo {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: center;
  align-items: center;
  width: 100%;
}

.glowButton,
.glowInput {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-base) ease;
  outline: none;
}

.glowButton:focus-visible,
.glowInput:focus-visible {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}

.glowInput {
  min-width: 200px;
}

.offsetButton,
.offsetInput {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-base) ease;
  outline: none;
}

.offsetButton:focus-visible,
.offsetInput:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

.offsetInput {
  min-width: 200px;
}

.animatedButton,
.animatedInput {
  position: relative;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--duration-base) ease;
  outline: none;
}

.animatedButton:focus-visible::before,
.animatedInput:focus-visible::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border: 3px solid var(--color-accent);
  border-radius: var(--radius-md);
  animation: focusRing 1.5s ease-in-out infinite;
  pointer-events: none;
}

@keyframes focusRing {
  0% {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  50% {
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    opacity: 0.6;
  }
  100% {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
}

.animatedInput {
  min-width: 200px;
}

.info {
  width: 100%;
  max-width: 600px;
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.infoTitle {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.infoText {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-3) 0;
}

.infoText:last-child {
  margin-bottom: 0;
}

.infoText code {
  padding: 0.125rem 0.375rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-accent);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

@media (max-width: 640px) {
  .variantSelector {
    width: 100%;
  }

  .variantButton {
    flex: 1;
    font-size: var(--text-xs);
    padding: var(--space-2) var(--space-3);
  }

  .glowDemo,
  .offsetDemo,
  .animatedDemo {
    flex-direction: column;
  }

  .glowInput,
  .offsetInput,
  .animatedInput {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes focusRing {
    0%,
    100% {
      width: calc(100% + 8px);
      height: calc(100% + 8px);
      opacity: 0.8;
    }
  }
}`,
  },
  {
    id: 11,
    slug: "skip-to-content",
    title: "Skip to Content",
    description: "Keyboard-accessible skip navigation link",
    category: "Accessibility",
    code: `// SkipToContent.tsx
"use client";

import { useRef } from "react";
import styles from "./SkipToContent.module.css";

export default function SkipToContent() {
  const mainContentRef = useRef<HTMLDivElement>(null);

  const handleSkipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (mainContentRef.current) {
      mainContentRef.current.focus();
      mainContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.demoWrapper}>
        <a href="#main-content" className={styles.skipLink} onClick={handleSkipClick}>
          Skip to main content
        </a>

        <header className={styles.header}>
          <div className={styles.logo}>Logo</div>
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>Home</a>
            <a href="#" className={styles.navLink}>About</a>
            <a href="#" className={styles.navLink}>Services</a>
            <a href="#" className={styles.navLink}>Blog</a>
            <a href="#" className={styles.navLink}>Contact</a>
          </nav>
        </header>

        <main
          id="main-content"
          ref={mainContentRef}
          tabIndex={-1}
          className={styles.mainContent}
        >
          <h1 className={styles.mainTitle}>Main Content Area</h1>
          <p className={styles.mainText}>
            This is the main content area. When using keyboard navigation, press{" "}
            <kbd className={styles.kbd}>Tab</kbd> once to reveal the "Skip to
            main content" link, then press <kbd className={styles.kbd}>Enter</kbd>{" "}
            to jump directly here, bypassing all navigation links.
          </p>
          <div className={styles.contentBox}>
            <h2>Why Skip Links Matter</h2>
            <p>
              Skip links are essential for keyboard and screen reader users. They
              allow users to bypass repetitive navigation and jump directly to
              the main content, saving time and improving the user experience.
            </p>
          </div>
        </main>
      </div>

      <div className={styles.info}>
        <h3 className={styles.infoTitle}>How to Test</h3>
        <ol className={styles.infoList}>
          <li>Click anywhere in the demo area above</li>
          <li>Press <kbd className={styles.kbd}>Tab</kbd> once</li>
          <li>The "Skip to main content" link will appear</li>
          <li>Press <kbd className={styles.kbd}>Enter</kbd> to skip navigation</li>
          <li>Focus moves directly to main content</li>
        </ol>
        <p className={styles.infoText}>
          The skip link is hidden by default but becomes visible when focused
          with keyboard navigation. This is a WCAG 2.1 Level A requirement for
          accessible websites.
        </p>
      </div>
    </div>
  );
}

// SkipToContent.module.css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-8);
  width: 100%;
}

.demoWrapper {
  position: relative;
  width: 100%;
  max-width: 800px;
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.skipLink {
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: white;
  background-color: var(--color-accent);
  border: 3px solid var(--color-accent);
  border-radius: var(--radius-md);
  text-decoration: none;
  box-shadow: var(--shadow-xl);
  transition: top 0.3s ease, box-shadow 0.3s ease;
}

.skipLink:focus {
  top: var(--space-4);
  outline: 3px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.logo {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.nav {
  display: flex;
  gap: var(--space-4);
}

.navLink {
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: all var(--duration-base) ease;
}

.navLink:hover {
  color: var(--color-text-primary);
  background-color: var(--color-background);
}

.navLink:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
  color: var(--color-accent);
}

.mainContent {
  padding: var(--space-8) var(--space-6);
  min-height: 400px;
  outline: none;
}

.mainContent:focus {
  background-color: rgba(59, 130, 246, 0.05);
  animation: focusFlash 0.6s ease;
}

@keyframes focusFlash {
  0% { background-color: rgba(59, 130, 246, 0.15); }
  100% { background-color: rgba(59, 130, 246, 0.05); }
}

.mainTitle {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.mainText {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 var(--space-6) 0;
}

.kbd {
  display: inline-block;
  padding: 0.125rem 0.5rem;
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  box-shadow: 0 2px 0 0 var(--color-border);
}

.contentBox {
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.contentBox h2 {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.contentBox p {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

.info {
  width: 100%;
  max-width: 800px;
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.infoTitle {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.infoList {
  margin: 0 0 var(--space-4) 0;
  padding-left: var(--space-6);
  color: var(--color-text-secondary);
}

.infoList li {
  font-size: var(--text-sm);
  line-height: 1.8;
  margin-bottom: var(--space-2);
}

.infoList li:last-child {
  margin-bottom: 0;
}

.infoText {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-3);
  }

  .nav {
    flex-wrap: wrap;
    gap: var(--space-2);
  }

  .navLink {
    font-size: var(--text-xs);
    padding: var(--space-1) var(--space-2);
  }

  .mainContent {
    padding: var(--space-6) var(--space-4);
    min-height: 300px;
  }

  .mainTitle {
    font-size: var(--text-2xl);
  }
}

@media (prefers-reduced-motion: reduce) {
  .skipLink {
    transition: none;
  }

  .skipLink:focus {
    animation: none;
  }

  .mainContent:focus {
    animation: none;
    background-color: rgba(59, 130, 246, 0.05);
  }

  * {
    scroll-behavior: auto !important;
  }
}`,
  },
];

// Import remaining components from constants2.ts
import { COMPONENTS_PART2 } from "./constants2";

// Combine all components
export const COMPONENTS: Component[] = [
  ...COMPONENTS_PART1,
  ...COMPONENTS_PART2,
];

/**
 * Get component by slug
 */
export function getComponentBySlug(slug: string): Component | undefined {
  return COMPONENTS.find((component) => component.slug === slug);
}

/**
 * Get all components in a category
 */
export function getComponentsByCategory(category: Category): Component[] {
  return COMPONENTS.filter((component) => component.category === category);
}

/**
 * Filter components by search query
 */
export function searchComponents(query: string): Component[] {
  const lowercaseQuery = query.toLowerCase().trim();

  if (!lowercaseQuery) return COMPONENTS;

  return COMPONENTS.filter((component) => {
    const searchableText =
      `${component.title} ${component.description} ${component.category}`.toLowerCase();
    return searchableText.includes(lowercaseQuery);
  });
}
