"use client";

import { useState, useEffect } from "react";
import styles from "./SkeletonToContent.module.css";

type Variant = "card" | "list" | "profile";

export default function SkeletonToContent() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<Variant>("card");

  const handleReplay = () => {
    setIsLoaded(false);
    // Show skeleton for 1.5 seconds before loading content
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
  };

  const handleVariantChange = (newVariant: Variant) => {
    setCurrentVariant(newVariant);
    setIsLoaded(false);
    // Show skeleton for 1.5 seconds before loading content
    setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
  };

  // Auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      {/* Variant Wrapper - transitions height smoothly */}
      <div className={styles.variantWrapper}>
        {/* Card Variant */}
        {currentVariant === "card" && (
          <div className={styles.cardWrapper}>
            {/* Skeleton */}
            <div
              className={`${styles.skeleton} ${styles.card} ${
                isLoaded ? styles.hidden : ""
              }`}
            >
              <div className={styles.skeletonImage} />
              <div className={styles.skeletonText}>
                <div className={`${styles.skeletonBar} ${styles.title}`} />
                <div className={`${styles.skeletonBar} ${styles.line1}`} />
                <div className={`${styles.skeletonBar} ${styles.line2}`} />
              </div>
            </div>

            {/* Content */}
            <div
              className={`${styles.content} ${styles.card} ${
                isLoaded ? styles.visible : ""
              }`}
            >
              <div className={styles.contentImage}>
                <div className={styles.gradientPlaceholder} />
              </div>
              <div className={styles.contentText}>
                <h3 className={styles.contentTitle}>
                  Interactive Card Component
                </h3>
                <p className={styles.contentDescription}>
                  This is a beautiful card component with smooth loading
                  animation
                </p>
              </div>
            </div>
          </div>
        )}

        {/* List Variant */}
        {currentVariant === "list" && (
          <div className={styles.listWrapper}>
            {/* Skeleton */}
            <div
              className={`${styles.skeleton} ${styles.list} ${
                isLoaded ? styles.hidden : ""
              }`}
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.skeletonListItem}>
                  <div className={styles.skeletonCircle} />
                  <div className={styles.skeletonBar} />
                </div>
              ))}
            </div>

            {/* Content */}
            <div
              className={`${styles.content} ${styles.list} ${
                isLoaded ? styles.visible : ""
              }`}
            >
              <div
                className={styles.listItem}
                style={{ animationDelay: "0ms" }}
              >
                <div className={styles.listIcon}>📄</div>
                <span>First list item with description</span>
              </div>
              <div
                className={styles.listItem}
                style={{ animationDelay: "50ms" }}
              >
                <div className={styles.listIcon}>📋</div>
                <span>Second list item with description</span>
              </div>
              <div
                className={styles.listItem}
                style={{ animationDelay: "100ms" }}
              >
                <div className={styles.listIcon}>✅</div>
                <span>Third list item with description</span>
              </div>
            </div>
          </div>
        )}

        {/* Profile Variant */}
        {currentVariant === "profile" && (
          <div className={styles.profileWrapper}>
            {/* Skeleton */}
            <div
              className={`${styles.skeleton} ${styles.profile} ${
                isLoaded ? styles.hidden : ""
              }`}
            >
              <div className={styles.skeletonAvatar} />
              <div className={styles.skeletonProfileText}>
                <div className={`${styles.skeletonBar} ${styles.name}`} />
                <div className={`${styles.skeletonBar} ${styles.bio}`} />
              </div>
            </div>

            {/* Content */}
            <div
              className={`${styles.content} ${styles.profile} ${
                isLoaded ? styles.visible : ""
              }`}
            >
              <div className={styles.avatar}>
                <span className={styles.avatarText}>AJ</span>
              </div>
              <div className={styles.profileText}>
                <h3 className={styles.profileName}>Alex Johnson</h3>
                <p className={styles.profileBio}>Product Designer at TechCo</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.replayButton} onClick={handleReplay}>
          ↻ Replay
        </button>

        <div className={styles.variantSelector}>
          <button
            className={`${styles.variantButton} ${
              currentVariant === "card" ? styles.active : ""
            }`}
            onClick={() => handleVariantChange("card")}
          >
            Card
          </button>
          <button
            className={`${styles.variantButton} ${
              currentVariant === "list" ? styles.active : ""
            }`}
            onClick={() => handleVariantChange("list")}
          >
            List
          </button>
          <button
            className={`${styles.variantButton} ${
              currentVariant === "profile" ? styles.active : ""
            }`}
            onClick={() => handleVariantChange("profile")}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
