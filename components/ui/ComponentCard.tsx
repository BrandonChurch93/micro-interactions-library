import Link from "next/link";
import styles from "./ComponentCard.module.css";

interface ComponentCardProps {
  title: string;
  description: string;
  category: string;
  slug: string;
}

export default function ComponentCard({
  title,
  description,
  category,
  slug,
}: ComponentCardProps) {
  return (
    <Link href={`/${slug}`} className={styles.card}>
      <div className={styles.categoryBadge}>{category}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </Link>
  );
}
