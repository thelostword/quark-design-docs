import { createI18n } from "vue-i18n";
import zh_CN from "./zh-CN";
import en_US from "./en-US";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale:
    localStorage.getItem("language") === "en_US" ||
    localStorage.getItem("language") === null
      ? "en_US"
      : "zh_CN", // 默认中文
  messages: {
    zh_CN,
    en_US,
  },
});

export default i18n;
