import React from 'react';
import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.title}>Original:</p>
      <a href="https://github.com/HiraginoYuki/15-puzzle.app" target="_blank"rel="noopener noreferrer">HiraginoYuki/15-puzzle.app</a>
    </footer>
  );
}