"use client";

import { useState, useEffect } from "react";
import styles from "../interactions/SkeletonToContent.module.css";

export default function SkeletonToContentDemo() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const runSequence = async () => {
      // Show skeleton
      setIsLoaded(false);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show content
      setIsLoaded(true);
      await new Promise((resolve) => setTimeout(resolve, 2500));

      // Loop back
      runSequence();
    };

    runSequence();
  }, []);

  return (
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
          <h3 className={styles.contentTitle}>Interactive Card Component</h3>
          <p className={styles.contentDescription}>
            This is a beautiful card component with smooth loading animation
          </p>
        </div>
      </div>
    </div>
  );
}
