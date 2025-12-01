import React from "react";
import styles from "./index.module.scss";

interface DownloadIconProps {
  href: string;
  fileName?: string;
  fullWidth?: boolean;
}

const DownloadIcon: React.FC<DownloadIconProps> = ({
  href,
  fileName,
  fullWidth = false,
}) => {
  // Extract filename from href if not provided
  const downloadFileName = fileName || href.split("/").pop() || "download";

  return (
    <div className={fullWidth ? styles.wrapperFull : styles.wrapper}>
      <a
        href={href}
        download={downloadFileName}
        className={styles.downloadIcon}
        title="下载插件"
        aria-label="下载插件"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </a>
    </div>
  );
};

export default DownloadIcon;
