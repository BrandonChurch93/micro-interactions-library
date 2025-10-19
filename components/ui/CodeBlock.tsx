"use client";

import { useEffect, useState, useRef } from "react";
import { codeToHtml } from "shiki";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
  language?: string;
}

interface Particle {
  id: number;
  color: string;
  angle: number;
  distance: number;
  rotation: number;
}

interface Toast {
  id: number;
  variant: "success" | "error";
  message: string;
}

const CONFETTI_COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
];

export default function CodeBlock({
  code,
  language = "typescript",
}: CodeBlockProps) {
  const [html, setHtml] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [copied, setCopied] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [nextParticleId, setNextParticleId] = useState(0);
  const [nextToastId, setNextToastId] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  // Detect theme on mount and listen for changes
  useEffect(() => {
    const getTheme = () => {
      return document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    };

    setTheme(getTheme());

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function highlightCode() {
      setIsLoading(true);
      try {
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: theme === "light" ? "github-light" : "github-dark",
        });
        setHtml(highlighted);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHtml(`<pre><code>${code}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    }

    highlightCode();
  }, [code, language, theme]);

  const createConfetti = () => {
    setIsAnimating(true);
    const particleCount = Math.floor(Math.random() * 11) + 25; // 25-35 particles
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: nextParticleId + i,
        color:
          CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        angle: Math.random() * 360,
        distance: Math.random() * 150 + 100, // 100-250px
        rotation: Math.random() * 1080, // 0-1080 degrees
      });
    }

    // CRITICAL: Replace, don't append - this prevents the stacking bug
    setParticles(newParticles);
    setNextParticleId((prev) => prev + particleCount);

    // Remove particles after animation completes
    setTimeout(() => {
      setParticles([]);
    }, 1200);

    // Re-enable button slightly after particles are cleared
    setTimeout(() => {
      setIsAnimating(false);
    }, 1250);
  };

  const showToast = (variant: "success" | "error", message: string) => {
    const newToast: Toast = {
      id: nextToastId,
      variant,
      message,
    };

    setToasts((prev) => [...prev, newToast]);
    setNextToastId((prev) => prev + 1);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      dismissToast(newToast.id);
    }, 3000);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleCopy = async () => {
    // Prevent clicks during animation to avoid the bug
    if (isAnimating) return;

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      createConfetti();
      showToast("success", "Code copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
      showToast("error", "Failed to copy code. Please try again.");
    }
  };

  // Animate particle using WAAPI
  const animateParticle = (
    element: HTMLDivElement | null,
    particle: Particle
  ) => {
    if (!element || !copyButtonRef.current) return;

    // Prevent animation from running multiple times on the same element
    if (element.dataset.animated === "true") return;
    element.dataset.animated = "true";

    const buttonRect = copyButtonRef.current.getBoundingClientRect();

    // Calculate spawn position relative to viewport
    const spawnX = buttonRect.left + buttonRect.width / 2;
    const spawnY = buttonRect.top + buttonRect.height / 2;

    const radians = (particle.angle * Math.PI) / 180;
    const endX = Math.cos(radians) * particle.distance;
    const endY = Math.sin(radians) * particle.distance + 80; // Gravity effect

    element.animate(
      [
        {
          transform: `translate(${spawnX}px, ${spawnY}px) rotate(0deg) scale(1)`,
          opacity: 1,
        },
        {
          transform: `translate(${spawnX + endX}px, ${
            spawnY + endY
          }px) rotate(${particle.rotation}deg) scale(0.5)`,
          opacity: 0,
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fill: "forwards",
      }
    );
  };

  if (isLoading) {
    return (
      <div className={styles.codeBlock}>
        <div className={styles.header}>
          <span className={styles.language}>{language}</span>
          <button className={styles.copyButton} disabled>
            Copy
          </button>
        </div>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <span>Loading code...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.codeBlock}>
        <div className={styles.header}>
          <span className={styles.language}>{language}</span>
          <button
            ref={copyButtonRef}
            className={styles.copyButton}
            onClick={handleCopy}
            disabled={isAnimating}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div
          className={styles.code}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      {/* Confetti Particles - Outside codeBlock to allow overflow */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          ref={(el) => animateParticle(el, particle)}
          className={styles.particle}
          style={{
            backgroundColor: particle.color,
          }}
        />
      ))}

      {/* Toast Notifications */}
      <div className={styles.toastContainer}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles.toast} ${styles[toast.variant]}`}
          >
            <div className={styles.toastIcon}>
              {toast.variant === "success" ? "✓" : "✕"}
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
    </>
  );
}
