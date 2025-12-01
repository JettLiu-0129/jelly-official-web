import { WrappedHomeHero } from "./WrappedHomeHero";
import { Footer } from "./Footer";
import { Helmet } from "rspress/runtime";
import { BentoGrid } from "./FeatureVariants/BentoGrid";

const features = [
  {
    title: "划词，翻译。没有废话。",
    details:
      "Jelly 的划词翻译功能支持直接选中 / 框选屏幕OCR，在任何应用中都可用。智能识别语言，极速秒出。您还可以继续通过弹窗调用发音、收藏、AI润色、语法纠错等等30余种功能。",
    image: "/recognition-tool-example.png",
    video: "/videos/home-demo.mp4",
  },
  {
    title: "全部免费。",
    details:
      "Jelly 的所有功能都是免费的，并且不限制次数，可以无限使用。您还可以自由定制AI、翻译、语音合成服务。",
    image: "/home-2.png",
  },
  {
    title: "保持沉浸感。",
    details:
      "用外文写作卡壳了？您可以用母语写作，翻译后插入。修正语法、润色、续写更是不在话下。整个流程全由轻量级的窗口承载，完全不用切出当前 App。",
    image: "/home-3.png",
  },
  {
    title: "恰到好处。",
    details:
      "Jelly 能在使用过程中自动感知上下文，在提供更好翻译结果的同时，自动帮您记忆单词场景。有了Jelly，您再也不用担心忘记单词出处了。",
    images: ["/home-4-1.png", "/home-4-2.png"], // Added carousel images
  },
  {
    title: "极客精神。",
    details:
      "在保持开箱即用的同时，Jelly 所有的界面、提示词、服务都高度可定制。依托 Jelly 强大的插件系统和开源生态，您可以轻松扩展功能，为您的工作和学习提效。",
    image: "/home-5.png",
  },
];

const HomePage = () => {
  return (
    <div>
      {/* 修复首页顶导遮住hero背景颜色的问题 */}
      <Helmet>
        <style>{`
          .dark {
            .rspress-nav {
              background: transparent;
            }
          }
        `}</style>
      </Helmet>
      <WrappedHomeHero />
      <BentoGrid features={features.slice(0, 5)} />
      <Footer />
    </div>
  );
};

export { HomePage };
