import { notFound } from "next/navigation";
import Link from "next/link";
import { getComponentBySlug, COMPONENTS } from "@/lib/constants";
import CodeBlock from "@/components/ui/CodeBlock";
import ButtonLoading from "@/components/interactions/ButtonLoading";
import SkeletonToContent from "@/components/interactions/SkeletonToContent";
import ToastNotification from "@/components/interactions/ToastNotification";
import FormValidation from "@/components/interactions/FormValidation";
import ProgressBar from "@/components/interactions/ProgressBar";
import RippleEffect from "@/components/interactions/RippleEffect";
import BouncePress from "@/components/interactions/BouncePress";
import GlowPulse from "@/components/interactions/GlowPulse";
import ConfettiBurst from "@/components/interactions/ConfettiBurst";
import FocusIndicators from "@/components/interactions/FocusIndicators";
import SkipToContentDemo from "@/components/interactions/SkipToContent";
import ReducedMotion from "@/components/interactions/ReducedMotion";
import MobileMenu from "@/components/interactions/MobileMenu";
import TabIndicator from "@/components/interactions/TabIndicator";
import DropdownMenu from "@/components/interactions/DropdownMenu";

export const dynamic = "force-dynamic";

import styles from "./page.module.css";

interface ComponentPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return COMPONENTS.map((component) => ({
    slug: component.slug,
  }));
}

export default function ComponentPage({ params }: ComponentPageProps) {
  const component = getComponentBySlug(params.slug);

  if (!component) {
    notFound();
  }

  // Find previous and next components
  const currentIndex = COMPONENTS.findIndex((c) => c.id === component.id);
  const previousComponent =
    currentIndex > 0 ? COMPONENTS[currentIndex - 1] : null;
  const nextComponent =
    currentIndex < COMPONENTS.length - 1 ? COMPONENTS[currentIndex + 1] : null;

  // Render the appropriate demo component
  const renderDemo = () => {
    switch (component.slug) {
      case "button-loading":
        return <ButtonLoading />;
      case "skeleton-to-content":
        return <SkeletonToContent />;
      case "toast-notification":
        return <ToastNotification />;
      case "form-validation":
        return <FormValidation />;
      case "progress-bar":
        return <ProgressBar />;
      case "ripple-effect":
        return <RippleEffect />;
      case "bounce-press":
        return <BouncePress />;
      case "glow-pulse":
        return <GlowPulse />;
      case "confetti-burst":
        return <ConfettiBurst />;
      case "focus-indicators":
        return <FocusIndicators />;
      case "skip-to-content":
        return <SkipToContentDemo />;
      case "reduced-motion":
        return <ReducedMotion />;
      case "mobile-menu":
        return <MobileMenu />;
      case "tab-indicator":
        return <TabIndicator />;
      case "dropdown-menu":
        return <DropdownMenu />;
      default:
        return (
          <p className={styles.demoPlaceholder}>
            Interactive demo will be added in Phase 7-21
          </p>
        );
    }
  };

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      {/* Header */}
      <header className={styles.header}>
        <span className={styles.categoryBadge}>{component.category}</span>
        <h1 className={styles.title}>{component.title}</h1>
        <p className={styles.description}>{component.description}</p>
      </header>

      {/* Demo Section */}
      <section className={styles.demoSection}>
        <h2 className={styles.sectionTitle}>Demo</h2>
        <div className={styles.demoContainer}>{renderDemo()}</div>
      </section>

      {/* Code Section */}
      <section className={styles.codeSection}>
        <h2 className={styles.sectionTitle}>Code</h2>
        {component.code ? (
          <CodeBlock code={component.code} language="tsx" />
        ) : (
          <div className={styles.codePlaceholder}>
            <p>Code will be added when component is built (Phases 7-21)</p>
          </div>
        )}
      </section>

      {/* Navigation */}
      <nav className={styles.navigation}>
        {previousComponent ? (
          <Link href={`/${previousComponent.slug}`} className={styles.navLink}>
            <span className={styles.navLabel}>← Previous</span>
            <span className={styles.navTitle}>{previousComponent.title}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextComponent ? (
          <Link href={`/${nextComponent.slug}`} className={styles.navLink}>
            <span className={styles.navLabel}>Next →</span>
            <span className={styles.navTitle}>{nextComponent.title}</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
