import { HomeHero } from "rspress/theme";
import css from "./index.module.scss";
import { useI18n } from "rspress/runtime";

const WrappedHomeHero = () => {
  const t = useI18n<typeof import("i18n")>();
  return (
    <div className={css.jlHomeHero}>
      <HomeHero
        frontmatter={{
          hero: {
            name: "Jelly",
            text: t("slogan"),
            tagline: t("textline"),
            actions: [
              {
                text: t("download_from_app_store"),
                link: "https://apps.apple.com/cn/app/jelly-%E5%8D%B3%E7%AB%8B%E8%AF%91/id6756085521?mt=12Jelly 即立译",
                theme: "brand",
              },
              // {
              //   text: t("windows_waitlist"),
              //   link: "/placeholder",
              //   theme: "alt",
              // },
            ],
          },
        }}
        routePath=""
      />
    </div>
  );
};

export { WrappedHomeHero };
