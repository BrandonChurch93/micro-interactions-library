"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { searchComponents } from "@/lib/constants";
import styles from "./SearchModal.module.css";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onClose]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearch("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (slug: string) => {
    router.push(`/${slug}`);
    onClose();
    setSearch("");
  };

  const results = searchComponents(search);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Command className={styles.command} shouldFilter={false}>
          <div className={styles.searchWrapper}>
            <svg
              className={styles.searchIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search components..."
              className={styles.input}
            />
          </div>
          <Command.List className={styles.list}>
            <Command.Empty className={styles.empty}>
              No results found for "{search}"
            </Command.Empty>

            {results.length > 0 && (
              <Command.Group heading="Components" className={styles.group}>
                {results.map((component) => (
                  <Command.Item
                    key={component.id}
                    value={component.slug}
                    onSelect={() => handleSelect(component.slug)}
                    className={styles.item}
                  >
                    <div className={styles.itemContent}>
                      <span className={styles.itemTitle}>
                        {component.title}
                      </span>
                      <span className={styles.itemDescription}>
                        {component.description}
                      </span>
                    </div>
                    <span className={styles.itemCategory}>
                      {component.category}
                    </span>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
