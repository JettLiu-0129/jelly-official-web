import { useState } from "react";
import styles from "./index.module.scss";

interface CopyableEmailProps {
  email: string;
}

export default function CopyableEmail({ email }: CopyableEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className={styles.emailContainer}>
      <a href={`mailto:${email}`} className={styles.emailLink}>
        <span className={styles.emailIcon}>✉️</span>
        <span className={styles.emailText}>{email}</span>
      </a>
      <button
        onClick={handleCopy}
        className={styles.copyButton}
        aria-label="Copy email"
      >
        {copied ? (
          <span className={styles.copiedIcon}>✓</span>
        ) : (
          <svg
            className={styles.copyIcon}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 2.5h-3v11h8v-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="5.5"
              y="2.5"
              width="8"
              height="8"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
