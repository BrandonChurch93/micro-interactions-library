import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.attribution}>
          Built by{" "}
          <a
            href="https://brandon-church-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Brandon Church
          </a>
        </p>
        <div className={styles.links}>
          <a
            href="https://github.com/BrandonChurch93/micro-interactions-library"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            GitHub
          </a>
          <span className={styles.divider}>•</span>
          <span className={styles.badge}>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
