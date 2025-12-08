import { WrappedHomeHero } from "./WrappedHomeHero";
import { Footer } from "./Footer";
import { Helmet } from "rspress/runtime";
import { HomeFeature } from "rspress/theme";

const features = [
  {
    title: "看到=记住",
    details:
      "Jelly 的划词功能支持直接选中 / 框选屏幕OCR，保证在任何应用中都可用。还可以发音、收藏。只要是您能在屏幕上看到的单词，最终都可以牢牢掌握。",
    icon: "📝",
  },
  {
    title: "最智能的阅读助手",
    details:
      "Jelly 可以为你智能提取屏幕中的单词、句子、段落，还能基于屏幕内容自动感知上下文。只看翻译看不懂？没关系，让 AI 结合上下文为你解释，保证你 get 到。",
    icon: "🤖",
  },
  {
    title: "最沉浸的写作体验",
    details:
      "在 Jelly 的帮助下，你可以用母语写作，然后翻译、替换、修正语法、润色，甚至是续写，整个流程全由轻量级的窗口承载，完全不用切出当前 App，让你沉浸在创作中。",
    icon: "✍️",
  },
  {
    title: "功能全由你定制",
    details:
      "「简洁但强大」是 Jelly 第一设计原则。虽然 Jelly 内置了数十种免费功能，但您全部可以关闭，保持界面清爽干净。您还可以定制任意功能的配置，包括 AI 功能的提示词。您也可以分享和查看来自社区的提示词，以发掘 Jelly 的更多潜能。",
    icon: "⚙️",
  },
  {
    title: "服务也全由你定制",
    details:
      "在 Jelly 中，您可以使用迅捷且无需联网的系统服务，也可以使用强大的在线服务，甚至可以通过插件扩展。在线服务采用 BYOK（Bring Your Own Key）模式，不做中间商赚差价，不搞订阅收费，让您自由选择。",
    icon: "🔌",
  },
  {
    title: "没人喜欢背快捷键",
    details:
      "Jelly 全部功能最多只占用您三个快捷键。Jelly 还内置了多种实用小工具，包括取色器、屏幕坐标、截屏、OCR 文本提取等等，一个软件满足您所有的工作需求。有了它，您甚至可以卸载其他应用，来释放更多的快捷键。",
    icon: "⌨️",
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
      <HomeFeature
        frontmatter={{
          features: features,
        }}
        routePath=""
      />
      <Footer />
    </div>
  );
};

export { HomePage };
