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
            target="_blank"
          >
            <span class="sr-only">GitHub repository</span>
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              ></path>
            </svg>
          </a>

          <a
            class="translate-lang"
            href="javascript:void(0);"
            @click="switchLang"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              viewBox="0 0 24 24"
              class="option-icon"
              data-v-bb72eb81=""
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                class="css-c4d79v"
              ></path>
            </svg>
          </a>

          <a class="nav-item-a-link theme-mode" href="javascript:void(0)">
            <dark-light-mode />
          </a>

          <div id="docsearch"></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { onMounted, defineComponent, reactive, computed, ref } from "vue";
import Search from "./Search.vue";
import { header, versions, nav } from "@/config/index";
import { version as defaultVersion } from "@/docs_vue/config.json";
import { useRoute } from "vue-router";

import docsearch from "@docsearch/js";
import "@docsearch/css";

export default defineComponent({
  name: "doc-header",
  components: {
    Search,
  },
  setup() {
    const version = ref(defaultVersion);
    const isZhLang = localStorage.getItem("language") === "zh-CN";
    const route = useRoute();
    let packages = [];
    nav.forEach((item) => {
      packages.push(...item.packages);
    });

    const data = reactive({
      navIndex: 0,
      activeIndex: 0,
      isShowSelect: false,
    });

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

    onMounted(() => {
      docsearch({
        container: "#docsearch",
        appId: "EA4BY59U66",
        indexName: "Why",
        apiKey: "5d1fd7c976a98a74421011f1374dd200",
      });
    });

    return {
      docMd: localStorage.getItem("docMd"),
      isZhLang,
      header,
      versions,
      version,
      data,
      isActive,
      switchLang,
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
