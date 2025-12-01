import { SourceCode } from "rspress/theme";
import { useLocation, useLang } from "rspress/runtime";

const baseUrl =
  "https://github.com/Jellyfish-Studio/jelly-official-web/blob/main/";

export default function GitHubEdit() {
  const location = useLocation();
  const lang = useLang();

  // 获取当前路径，例如 "/guide/intro" 或 "/en/guide/intro"
  let pathname = location.pathname;

  // 移除开头的斜杠
  pathname = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  // 移除语言前缀（如果存在）
  if (pathname.startsWith("en/")) {
    pathname = pathname.slice(3);
  } else if (pathname.startsWith("zh/")) {
    pathname = pathname.slice(3);
  }

  // 移除尾部的斜杠
  if (pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  // 移除 .html 后缀（如果存在）
  if (pathname.endsWith(".html")) {
    pathname = pathname.slice(0, -5);
  }

  // 如果路径为空，则是首页
  if (pathname === "" || pathname === "index") {
    pathname = "index";
  }

  // 构建完整的 GitHub URL
  // 例如: docs/zh/guide/intro.mdx
  const githubUrl = `${baseUrl}docs/${lang}/${pathname}.mdx`;

  return <SourceCode href={githubUrl} platform="github" />;
}
