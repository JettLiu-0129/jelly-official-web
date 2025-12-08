import type { ReactNode } from "react";
import css from "./index.module.scss";

interface FeatureItem {
  title: string;
  description: ReactNode; // 改为支持 ReactNode，可以是字符串或 JSX
  mediaType: "video" | "image";
  mediaSrc: string;
}

const featuresList: FeatureItem[] = [
  {
    title: "看到=记住",
    description: (
      <>
        Jelly 的划词功能支持<strong>直接选中 / 框选屏幕OCR</strong>
        ，保证在任何应用中都可用。还可以<strong>发音、收藏</strong>
        。只要是您能在屏幕上看到的单词，最终都可以牢牢掌握。
        <br />
        <br />
      </>
    ),
    mediaType: "video",
    mediaSrc: "/1.mp4",
  },
  {
    title: "最智能的阅读助手",
    description: (
      <>
        Jelly 可以为你<strong>智能提取</strong>
        屏幕中的单词、句子、段落，还能基于屏幕内容
        <strong>自动感知上下文</strong>。
        <br />
        <br />
        只看翻译看不懂？没关系，让 AI <strong>结合上下文为你解释</strong>
        ，保证你 get 到。
      </>
    ),
    mediaType: "video",
    mediaSrc: "/1.mp4",
  },
  {
    title: "最沉浸的写作体验",
    description: (
      <>
        在 Jelly 的帮助下，你可以用母语写作，然后
        <strong>翻译、替换、修正语法、润色，甚至是续写</strong>
        ，整个流程全由轻量级的窗口承载，<strong>完全不用切出当前 App</strong>
        ，让你沉浸在创作中。
      </>
    ),
    mediaType: "video",
    mediaSrc: "/1.mp4",
  },
  {
    title: "功能全由你定制",
    description: (
      <>
        <strong>「简洁而强大」</strong>是 Jelly 第一设计原则。虽然 Jelly
        内置了数十种免费功能，但您<strong>全部可以关闭</strong>
        ，保持界面清爽干净。
        <br />
        <br />
        您还可以<strong>定制任意功能的配置</strong>，包括 AI
        功能的提示词。您也可以
        <strong>分享和查看来自社区的提示词</strong>，以发掘 Jelly 的更多潜能。
      </>
    ),
    mediaType: "video",
    mediaSrc: "/1.mp4",
  },
  {
    title: "服务也全由你定制",
    description: (
      <>
        在 Jelly 中，您可以使用迅捷且无需联网的
        <strong>系统服务</strong>，也可以使用强大的<strong>在线服务</strong>
        ，甚至可以通过<strong>插件扩展</strong>。
        <br />
        <br />
        在线服务采用 <strong>BYOK（Bring Your Own Key）</strong>
        模式，不做中间商赚差价，不搞订阅收费，让您自由选择。
      </>
    ),
    mediaType: "video",
    mediaSrc: "/1.mp4",
  },
  {
    title: "没人喜欢背快捷键",
    description: (
      <>
        Jelly 全部功能<strong>最多只占用您三个快捷键</strong>。
        <br />
        <br />
        Jelly 还内置了多种实用小工具，包括
        <strong>取色器、屏幕坐标、截屏、OCR 文本提取</strong>
        等等，一个软件满足您所有的工作需求。有了它，您甚至可以
        <strong>卸载其他应用，来释放更多的快捷键</strong>。
      </>
    ),
    mediaType: "video",
    mediaSrc: "/1.mp4",
  },
];

const Features = () => {
  return (
    <div className={css.container}>
      {featuresList.map((feature, index) => (
        <div
          key={index}
          className={`${css.featureSection} ${
            index % 2 === 1 ? css.reverse : ""
          }`}
        >
          <div className={css.content}>
            <h2 className={css.title}>{feature.title}</h2>
            <p className={css.description}>{feature.description}</p>
          </div>
          <div className={css.media}>
            {feature.mediaType === "video" ? (
              <video
                className={css.video}
                src={feature.mediaSrc}
                autoPlay
                playsInline
                loop
                muted
              />
            ) : (
              <img
                className={css.image}
                src={feature.mediaSrc}
                alt={feature.title}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export { Features };
