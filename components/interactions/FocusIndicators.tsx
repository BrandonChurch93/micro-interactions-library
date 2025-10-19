"use client";

import { useState, useRef } from "react";
import styles from "./FocusIndicators.module.css";

type Variant = "glow" | "offset" | "animated";

export default function FocusIndicators() {
  const [variant, setVariant] = useState<Variant>("glow");
  const [activeElement, setActiveElement] = useState<number | null>(null);

  // Refs for programmatic focus
  const glowRefs = useRef<(HTMLButtonElement | HTMLInputElement | null)[]>([]);
  const offsetRefs = useRef<(HTMLButtonElement | HTMLInputElement | null)[]>(
    []
  );
  const animatedRefs = useRef<(HTMLButtonElement | HTMLInputElement | null)[]>(
    []
  );

  const handleVariantClick = (newVariant: Variant, index: number) => {
    setVariant(newVariant);
    setActiveElement(index);

    // Focus the corresponding element after variant changes
    setTimeout(() => {
      const refs =
        newVariant === "glow"
          ? glowRefs
          : newVariant === "offset"
          ? offsetRefs
          : animatedRefs;
      refs.current[index]?.focus();
    }, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.variantSelector}>
        <button
          onClick={() => setVariant("glow")}
          className={`${styles.variantButton} ${
            variant === "glow" ? styles.active : ""
          }`}
        >
          Glow
        </button>
        <button
          onClick={() => setVariant("offset")}
          className={`${styles.variantButton} ${
            variant === "offset" ? styles.active : ""
          }`}
        >
          Offset
        </button>
        <button
          onClick={() => setVariant("animated")}
          className={`${styles.variantButton} ${
            variant === "animated" ? styles.active : ""
          }`}
        >
          Animated
        </button>
      </div>

      <div className={styles.demoArea}>
        <p className={styles.instruction}>
          Press <kbd className={styles.kbd}>Tab</kbd> to navigate, or click
          elements to see focus styles
        </p>

        {variant === "glow" && (
          <div className={styles.glowDemo}>
            <button
              ref={(el) => {
                glowRefs.current[0] = el;
              }}
              className={styles.glowButton}
              onClick={() => handleVariantClick("glow", 0)}
            >
              Button 1
            </button>
            <button
              ref={(el) => {
                glowRefs.current[1] = el;
              }}
              className={styles.glowButton}
              onClick={() => handleVariantClick("glow", 1)}
            >
              Button 2
            </button>
            <button
              ref={(el) => {
                glowRefs.current[2] = el;
              }}
              className={styles.glowButton}
              onClick={() => handleVariantClick("glow", 2)}
            >
              Button 3
            </button>
            <input
              ref={(el) => {
                glowRefs.current[3] = el;
              }}
              type="text"
              placeholder="Input field"
              className={styles.glowInput}
              onClick={() => setActiveElement(3)}
            />
          </div>
        )}

        {variant === "offset" && (
          <div className={styles.offsetDemo}>
            <button
              ref={(el) => {
                offsetRefs.current[0] = el;
              }}
              className={styles.offsetButton}
              onClick={() => handleVariantClick("offset", 0)}
            >
              Button 1
            </button>
            <button
              ref={(el) => {
                offsetRefs.current[1] = el;
              }}
              className={styles.offsetButton}
              onClick={() => handleVariantClick("offset", 1)}
            >
              Button 2
            </button>
            <button
              ref={(el) => {
                offsetRefs.current[2] = el;
              }}
              className={styles.offsetButton}
              onClick={() => handleVariantClick("offset", 2)}
            >
              Button 3
            </button>
            <input
              ref={(el) => {
                offsetRefs.current[3] = el;
              }}
              type="text"
              placeholder="Input field"
              className={styles.offsetInput}
              onClick={() => setActiveElement(3)}
            />
          </div>
        )}

        {variant === "animated" && (
          <div className={styles.animatedDemo}>
            <button
              ref={(el) => {
                animatedRefs.current[0] = el;
              }}
              className={styles.animatedButton}
              onClick={() => handleVariantClick("animated", 0)}
            >
              Button 1
            </button>
            <button
              ref={(el) => {
                animatedRefs.current[1] = el;
              }}
              className={styles.animatedButton}
              onClick={() => handleVariantClick("animated", 1)}
            >
              Button 2
            </button>
            <button
              ref={(el) => {
                animatedRefs.current[2] = el;
              }}
              className={styles.animatedButton}
              onClick={() => handleVariantClick("animated", 2)}
            >
              Button 3
            </button>
            <div className={styles.animatedInputWrapper}>
              <input
                ref={(el) => {
                  animatedRefs.current[3] = el;
                }}
                type="text"
                placeholder="Input field"
                className={styles.animatedInput}
                onClick={() => setActiveElement(3)}
              />
            </div>
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
          All variants meet WCAG 2.1 Level AA requirements for focus visibility.
          Both keyboard navigation (Tab) and mouse clicks will show focus
          indicators.
        </p>
      </div>
    </div>
  );
}
