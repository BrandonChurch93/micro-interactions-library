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

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
];

export default function ConfettiBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [nextId, setNextId] = useState(0);
  const [burstCount, setBurstCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const createBurst = () => {
    // Prevent clicks during animation to avoid the bug
    if (isAnimating) return;

    setIsAnimating(true);
    const particleCount = Math.floor(Math.random() * 11) + 25; // 25-35 particles
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: nextId + i,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        angle: Math.random() * 360,
        distance: Math.random() * 150 + 100, // 100-250px
        rotation: Math.random() * 1080, // 0-1080 degrees
      });
    }

    // CRITICAL: Replace, don't append - this prevents the stacking bug
    setParticles(newParticles);
    setNextId((prev) => prev + particleCount);
    setBurstCount((prev) => prev + 1);

    // Remove particles after animation completes
    setTimeout(() => {
      setParticles([]);
      setIsAnimating(false);
    }, 1200);
  };

  const resetCount = () => {
    setBurstCount(0);
  };

  // Animate particle using WAAPI
  const animateParticle = (
    element: HTMLDivElement | null,
    particle: Particle
  ) => {
    if (!element) return;

    const radians = (particle.angle * Math.PI) / 180;
    const endX = Math.cos(radians) * particle.distance;
    const endY = Math.sin(radians) * particle.distance + 80; // Gravity effect

    element.animate(
      [
        {
          transform:
            "translate(-50%, -50%) translate(0, 0) rotate(0deg) scale(1)",
          opacity: 1,
        },
        {
          transform: `translate(-50%, -50%) translate(${endX}px, ${endY}px) rotate(${particle.rotation}deg) scale(0.5)`,
          opacity: 0,
          offset: 1,
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        fill: "forwards",
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.demoArea} ref={containerRef}>
        <button
          className={styles.burstButton}
          onClick={createBurst}
          disabled={isAnimating}
        >
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
          spawns 25-35 particles with realistic physics including gravity and
          rotation.
        </p>
      </div>
    </div>
  );
}
