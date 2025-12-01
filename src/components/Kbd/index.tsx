import React from "react";
import styles from "./index.module.scss";

// 修饰键符号映射
const keySymbolMap: Record<string, string> = {
  Control: "⌃",
  Command: "⌘",
  Cmd: "⌘",
  Shift: "⇧",
  Option: "⌥",
  Alt: "⌥",
};

interface KbdProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Kbd 组件 - 用于展示单个键盘按键
 * @example
 * <Kbd>Control</Kbd>
 */
export const Kbd: React.FC<KbdProps> = ({ children, className = "" }) => {
  const keyName = String(children);
  const symbol = keySymbolMap[keyName];

  return (
    <kbd className={`${styles.kbd} ${className}`}>
      {symbol ? (
        <>
          <span className={styles.kbdSymbol}>{symbol}</span>
          <span className={styles.kbdName}>{keyName}</span>
        </>
      ) : (
        children
      )}
    </kbd>
  );
};

interface ShortcutProps {
  keys: string[];
  separator?: string;
  className?: string;
}

/**
 * Shortcut 组件 - 用于展示组合快捷键
 * @example
 * <Shortcut keys={['Control', 'Q']} />
 * <Shortcut keys={['Command', 'Shift', 'P']} separator="+" />
 */
export const Shortcut: React.FC<ShortcutProps> = ({
  keys,
  separator = "+",
  className = "",
}) => {
  return (
    <span className={`${styles.shortcut} ${className}`}>
      {keys.map((key, index) => (
        <React.Fragment key={index}>
          <Kbd>{key}</Kbd>
          {index < keys.length - 1 && (
            <span className={styles.shortcutSeparator}>{separator}</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
};
