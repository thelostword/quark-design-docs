<template>
  <header :class="{ sticky: isHomePage() }" class="header">
    <div>
      <div class="container">
        <div class="left-bar">
          <a href="/#/">
            <img src="/src/assets/images/quark-logo.png" alt="" />
          </a>
          <span href="/">
            {{ version }}
          </span>

          <Search />
        </div>

        <div class="menu">
          <!-- 其它技术栈文档 -->
          <div class="nav-item">
            <a
              :class="isActive('pages') ? 'nav-active' : ''"
              :href="`${
                isZhLang ? `#/zh-CN/pages/otherdocs` : `#/en-US/pages/otherdocs`
              }`"
            >
              {{ isZhLang ? "其它技术文档" : "Other documents" }}
            </a>
          </div>

          <!-- 指南 / 组件 -->
          <div class="nav-item" v-for="item in header" :key="item.name">
            <template v-if="docMd === 'react' && item.name === 'Components'">
              <a
                :class="isActive(item.type) ? 'nav-active' : ''"
                :href="`${
                  isZhLang
                    ? `${item.pathName}-react`
                    : `${item.pathEnName}-react`
                }`"
              >
                {{ isZhLang ? item.cName : item.name }}
              </a>
            </template>
            <template v-else>
              <a
                :class="isActive(item.type) ? 'nav-active' : ''"
                :href="`${isZhLang ? item.pathName : item.pathEnName}`"
              >
                {{ isZhLang ? item.cName : item.name }}
              </a>
            </template>
          </div>

          <a
            href="https://github.com/hellof2e/quark-design"
            class="github-link"
          >
            <span class="sr-only">GitHub repository</span>
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>

          <a
            class="nav-item-a-link translate-lang"
            href="javascript:void(0);"
            @click="switchLang"
          >
            <svg
              t="1660733385126"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3062"
              width="200"
              height="200"
            >
              <path
                d="M549.12 642.986667l-108.373333-107.093334 1.28-1.28A747.52 747.52 0 0 0 500.32 256H725.333333V170.666667h-298.666666V85.333333H341.333333v85.333334H42.666667v85.333333h476.586666C490.666667 337.92 445.44 416 384 484.266667 344.32 440.32 311.466667 392.106667 285.44 341.333333h-85.333333c31.146667 69.546667 73.813333 135.253333 127.146666 194.56l-217.173333 214.186667L170.666667 810.666667l213.333333-213.333334 132.693333 132.693334 32.426667-87.04M789.333333 426.666667h-85.333333L512 938.666667h85.333333l47.786667-128h202.666667L896 938.666667h85.333333l-192-512m-111.786666 298.666666l69.12-184.746666L815.786667 725.333333h-138.24z"
                fill="#9da3b0"
                p-id="3063"
              ></path>
            </svg>
          </a>

          <a class="nav-item-a-link theme-mode" href="javascript:void(0)">
            <dark-light-mode />
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onBeforeMount, ref } from "vue";
import Search from "./Search.vue";
import { header, versions, nav, docs } from "@/config/index";
import { version as defaultVersion } from "@/docs_vue/config.json";
import { useRoute } from "vue-router";

const sdk = window.HBConfigSDKclient.default;
const client = new sdk({
  project: "QuarkDesign",
  env: "pro",
});

export default defineComponent({
  name: "doc-header",
  components: {
    Search,
  },
  setup() {
    const version = ref();
    const isZhLang = localStorage.getItem("language") === "zh-CN";
    const route = useRoute();
    let packages = [];
    nav.forEach((item) => {
      packages.push(...item.packages);
    });

    // let docsList = [];
    // docsList = docs.packages.map((item) => item.name.toLowerCase());

    const data = reactive({
      navIndex: 0,
      activeIndex: 0,
      isShowSelect: false,
    });

    const handleFocus = () => {
      console.log(1);
    };
    const getVersion = async () => {
      const res = (await client.get("info")) || {};
      if (res.version) version.value = res.version;
    };
    onBeforeMount(() => {
      getVersion();
    });

    const handleFocusOut = () => {
      data.isShowSelect = false;
    };

    const isActive = computed(() => {
      return function (name: string) {
        const lName = name.toLowerCase();
        return route.path.includes(lName);
      };
    });

    const isHomePage = computed(() => {
      return function () {
        return !(
          route.path.includes("component") ||
          route.path.includes("guide") ||
          route.path.includes("otherdocs")
        );
      };
    });

    const switchLang = () => {
      let href = "";
      if (localStorage.getItem("language") === "en-US") {
        // 英文
        localStorage.setItem("language", "zh-CN");
        href = location.href.replace("en-US", "zh-CN");
      } else {
        localStorage.setItem("language", "en-US"); // 中文
        href = location.href.replace("zh-CN", "en-US");
      }
      location.href = href;
      window.location.reload();
    };

    // const switchTheme = () => {
    //   if (localStorage.getItem("theme") !== "dark") {
    //     localStorage.setItem("theme", "dark");
    //   } else {
    //     localStorage.removeItem("theme");
    //   }
    //   // window.location.reload();
    // };

    return {
      docMd: localStorage.getItem("docMd"),
      isZhLang,
      header,
      versions,
      version,
      data,
      isActive,
      handleFocus,
      handleFocusOut,
      switchLang,
      // switchTheme,
      isHomePage,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  height: 72px;
  z-index: 30;
  top: 0px;
  position: relative;
  min-width: 860px;

  &.sticky {
    position: sticky;
  }

  > div {
    margin-left: auto;
    margin-right: auto;
  }

  .container {
    margin: 0 auto;
    padding: 1.25rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    max-width: 1376px;
  }
  .menu,
  .left-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .menu {
    gap: 2rem;
  }
  .left-bar a {
    color: rgb(107 114 128);
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    img {
      height: 2rem;
    }
  }
  .left-bar span {
    display: flex;
    margin-right: 2rem;
    align-items: center;
    color: rgb(156 163 175);
  }
}
.nav-item a {
  font-size: 14px;
  transition-property: color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.nav-item-a-link {
  font-size: 14px;
}

.github-link {
  width: 1.25rem;
  height: 1.25rem;

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
}

.translate-lang {
  transition-property: color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  color: rgba(255 255 255 / 0.5);
  > svg {
    width: 1.5rem;
    height: 1.5rem;
  }

  &:hover {
    color: rgba(255 255 255 / 1);
  }
}

.theme-mode {
  > span svg {
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 0.5rem;
  }
  &:hover {
    color: rgba(255 255 255 / 1);
  }
}
</style>
