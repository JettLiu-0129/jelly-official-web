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
                link: "/placeholder",
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
