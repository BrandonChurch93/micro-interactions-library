"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ComponentCard from "@/components/ui/ComponentCard";
import SearchModal from "@/components/ui/SearchModal";
import ButtonLoadingDemo from "@/components/demos/ButtonLoadingDemo";
import ProgressBarDemo from "@/components/demos/ProgressBarDemo";
import SkeletonToContentDemo from "@/components/demos/SkeletonToContentDemo";
import { COMPONENTS, CATEGORIES, type Category } from "@/lib/constants";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [displayedComponents, setDisplayedComponents] = useState(COMPONENTS);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hasFilteredOnce, setHasFilteredOnce] = useState(false);
  const [gridKey, setGridKey] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer for scroll animations (only on initial load)
    if (!hasFilteredOnce) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = Number(entry.target.getAttribute("data-id"));
              setVisibleCards((prev) => new Set([...prev, id]));
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        }
      );
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasFilteredOnce]);

  useEffect(() => {
    // Observe all card elements (only for initial scroll animation)
    if (!hasFilteredOnce) {
      const cards = document.querySelectorAll("[data-card]");
      cards.forEach((card) => {
        if (observerRef.current) {
          observerRef.current.observe(card);
        }
      });
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [displayedComponents, hasFilteredOnce]);

  const handleCategoryChange = (category: Category | "All") => {
    if (category === selectedCategory) return;

    // If this is the first filter, make all cards visible immediately
    if (!hasFilteredOnce) {
      setVisibleCards(new Set(COMPONENTS.map((c) => c.id)));
    }

    setHasFilteredOnce(true);

    // Start fade out
    setIsTransitioning(true);

    // After fade out completes, update content
    setTimeout(() => {
      setSelectedCategory(category);
      setDisplayedComponents(
        category === "All"
          ? COMPONENTS
          : COMPONENTS.filter((component) => component.category === category)
      );
      // Increment key to force re-render of all cards
      setGridKey((prev) => prev + 1);

      // Trigger fade in
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    }, 300);
  };

  const handleDemoClick = (slug: string) => {
    router.push(`/${slug}`);
  };

  return (
    <>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>15 Copy-Paste Micro-Interactions</h1>
          <p className={styles.heroSubtitle}>
            A curated collection of beautiful, accessible micro-interactions for
            modern web applications. Built with Next.js, TypeScript, and pure
            CSS animations.
          </p>
          <div className={styles.heroActions}>
            <button
              className={styles.ctaButton}
              onClick={() => {
                document.getElementById("components-grid")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              Explore Components
            </button>
            <button
              className={styles.searchButton}
              onClick={() => setIsSearchOpen(true)}
            >
              <kbd className={styles.kbd}>⌘</kbd>
              <kbd className={styles.kbd}>K</kbd>
              <span>Search</span>
            </button>
          </div>
        </section>

        {/* Live Demos Section */}
        <section className={styles.demosSection}>
          <h2 className={styles.demosTitle}>See Them in Action</h2>
          <div className={styles.demosGrid}>
            {/* Button Loading Demo */}
            <div
              className={styles.demoCard}
              onClick={() => handleDemoClick("button-loading")}
            >
              <div className={styles.demoContent}>
                <div className={styles.demoWrapper}>
                  <ButtonLoadingDemo />
                </div>
              </div>
              <div className={styles.demoOverlay}>
                <span className={styles.demoOverlayText}>
                  Click to explore →
                </span>
              </div>
              <div className={styles.demoLabel}>Button Loading States</div>
            </div>

            {/* Progress Bar Demo */}
            <div
              className={styles.demoCard}
              onClick={() => handleDemoClick("progress-bar")}
            >
              <div className={styles.demoContent}>
                <div className={styles.demoWrapper}>
                  <ProgressBarDemo />
                </div>
              </div>
              <div className={styles.demoOverlay}>
                <span className={styles.demoOverlayText}>
                  Click to explore →
                </span>
              </div>
              <div className={styles.demoLabel}>Progress Bar</div>
            </div>

            {/* Skeleton to Content Demo */}
            <div
              className={styles.demoCard}
              onClick={() => handleDemoClick("skeleton-to-content")}
            >
              <div className={styles.demoContent}>
                <div className={styles.demoWrapper}>
                  <SkeletonToContentDemo />
                </div>
              </div>
              <div className={styles.demoOverlay}>
                <span className={styles.demoOverlayText}>
                  Click to explore →
                </span>
              </div>
              <div className={styles.demoLabel}>Skeleton to Content</div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className={styles.filters} id="components-grid">
          <button
            className={`${styles.filterButton} ${
              selectedCategory === "All" ? styles.active : ""
            }`}
            onClick={() => handleCategoryChange("All")}
          >
            All
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${
                selectedCategory === category ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </section>

        {/* Component Grid */}
        <section
          className={`${styles.grid} ${
            isTransitioning ? styles.fadeOut : styles.fadeIn
          }`}
        >
          {displayedComponents.map((component, index) => (
            <div
              key={`${component.id}-${gridKey}`}
              data-card
              data-id={component.id}
              className={`${styles.cardWrapper} ${
                hasFilteredOnce
                  ? styles.filterCard
                  : visibleCards.has(component.id)
                  ? styles.visible
                  : ""
              }`}
              style={{
                animationDelay: hasFilteredOnce
                  ? `${index * 30}ms`
                  : `${index * 50}ms`,
              }}
            >
              <ComponentCard
                title={component.title}
                description={component.description}
                category={component.category}
                slug={component.slug}
              />
            </div>
          ))}
        </section>
      </div>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
