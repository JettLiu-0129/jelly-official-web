import { Helmet } from "rspress/runtime";
import styles from "./index.module.scss";

const HomeICP = () => {
  return (
    <div className={styles.container}>
      {/* 修复首页顶导遮住背景颜色的问题 */}
      <Helmet>
        <style>{`
          .dark {
            .rspress-nav {
              background: transparent;
            }
          }
        `}</style>
      </Helmet>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>Jelly</h1>
        <p className={styles.subtitle}>一款 macOS 翻译工具</p>
        <p className={styles.description}>
          提供划词翻译、截屏翻译等功能，帮助用户在 macOS
          系统上进行高效的文本翻译工作
        </p>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📝</div>
            <h3 className={styles.featureTitle}>划词翻译</h3>
            <p className={styles.featureDesc}>
              支持直接选中文本或框选屏幕进行 OCR 识别翻译
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🖼️</div>
            <h3 className={styles.featureTitle}>截屏翻译</h3>
            <p className={styles.featureDesc}>
              快速截取屏幕区域并进行文本识别与翻译
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🤖</div>
            <h3 className={styles.featureTitle}>AI 辅助</h3>
            <p className={styles.featureDesc}>
              基于上下文提供智能翻译和解释功能
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚙️</div>
            <h3 className={styles.featureTitle}>自定义配置</h3>
            <p className={styles.featureDesc}>支持自定义功能配置和提示词设置</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔌</div>
            <h3 className={styles.featureTitle}>服务扩展</h3>
            <p className={styles.featureDesc}>
              支持系统服务、在线服务和插件扩展
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛠️</div>
            <h3 className={styles.featureTitle}>实用工具</h3>
            <p className={styles.featureDesc}>
              内置取色器、屏幕坐标、截屏等实用小工具
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2024 Jelly - macOS 翻译工具 | 开发者：Jett Liu
        </p>
      </footer>
    </div>
  );
};

export { HomeICP };
