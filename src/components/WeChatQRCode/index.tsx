import React from "react";
import styles from "./index.module.scss";

interface WeChatQRCodeProps {
  size?: number;
  title?: string;
  description?: string;
}

export default function WeChatQRCode({
  size = 200,
  title = "微信公众号",
  description = "@ 硅基海獭",
}: WeChatQRCodeProps) {
  return (
    <div className={styles.qrCodeWrapper}>
      <div className={styles.qrCodeCard}>
        <div className={styles.iconHeader}>
          <svg
            className={styles.wechatIcon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.5 11C9.32843 11 10 10.3284 10 9.5C10 8.67157 9.32843 8 8.5 8C7.67157 8 7 8.67157 7 9.5C7 10.3284 7.67157 11 8.5 11Z"
              fill="currentColor"
            />
            <path
              d="M13 9.5C13 10.3284 13.6716 11 14.5 11C15.3284 11 16 10.3284 16 9.5C16 8.67157 15.3284 8 14.5 8C13.6716 8 13 8.67157 13 9.5Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 11.5C2 7.91015 4.91015 5 8.5 5H14.5C18.0899 5 21 7.91015 21 11.5C21 15.0899 18.0899 18 14.5 18H12.7071L9.85355 20.8536C9.53857 21.1685 9 20.9466 9 20.5V18C5.41015 18 2 15.0899 2 11.5ZM8.5 7C6.01472 7 4 9.01472 4 11.5C4 13.9853 6.01472 16 8.5 16H10C10.5523 16 11 16.4477 11 17V18.2929L12.2929 17H14.5C16.9853 17 19 13.9853 19 11.5C19 9.01472 16.9853 7 14.5 7H8.5Z"
              fill="currentColor"
            />
          </svg>
          <h3 className={styles.title}>{title}</h3>
        </div>

        <div className={styles.qrCodeContainer}>
          <div className={styles.qrCodeFrame}>
            <img
              src="/wechat-qr.jpg"
              alt="微信公众号二维码"
              width={size}
              height={size}
              className={styles.qrCodeImage}
            />
          </div>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.decorativeElements}>
          <div className={styles.corner} data-position="top-left"></div>
          <div className={styles.corner} data-position="top-right"></div>
          <div className={styles.corner} data-position="bottom-left"></div>
          <div className={styles.corner} data-position="bottom-right"></div>
        </div>
      </div>
    </div>
  );
}
