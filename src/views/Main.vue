<template>
  <doc-header></doc-header>

  <main class="home-main">
    <section class="home-section">
      <div class="home-text">
        <div>
          <div class="home-logo">
            <img src="/src/assets/images/quark-logo.png" alt="" />
          </div>
          <h1 class="home-title">{{ t("homeTitle") }}</h1>
          <p class="home-subtitle">
            {{ t("homeSubtitle") }}
          </p>

          <div class="actions">
            <div class="action">
              <a
                class="get-started"
                :href="`${
                  isZhLang
                    ? `#/zh-CN/guide/quickstart`
                    : `#/en-US/guide/quickstart`
                }`"
                >{{ t("getStarted") }}</a
              >
            </div>
            <div class="action">
              <a
                class="why-quark"
                :href="`${
                  isZhLang
                    ? `#/zh-CN/guide/introduction`
                    : `#/en-US/guide/introduction`
                }`"
                >{{ t("whyQuark") }}</a
              >
            </div>
          </div>
        </div>
      </div>
      <a
        class="scroll-down"
        id="scroll-down"
        href="#we-believe"
        style="opacity: 1"
      >
        <span>{{ t("scrollDown") }}</span>
        <span class="arrow">
          <img
            v-if="darkMode"
            src="/src/assets/images/arrow2.png"
            alt="arrow"
          />
          <img v-else src="/src/assets/images/arrow-light.png" alt="arrow" />
        </span>
      </a>
    </section>

    <section class="we-believe" id="we-believe">
      <div class="wrap">
        <h2>
          {{ t("weBelieve") }}
          <img
            v-if="darkMode"
            class="down-icon"
            alt="down-icon"
            src="/src/assets/images/i-down.png"
            height="34"
            width="36"
          />
          <img
            v-else
            class="down-icon"
            alt="down-icon"
            src="/src/assets/images/i-down-light.png"
            height="34"
            width="36"
          />
        </h2>
        <p>
          {{ t("weBelieveDesc1") }}
        </p>
        <p style="margin-top: 1.5rem">
          {{ t("weBelieveDesc2") }}
        </p>
        <p style="margin-top: 1.5rem">
          {{ t("weBelieveDesc3") }}
        </p>
      </div>
    </section>

    <section class="what-we-do" id="what-we-do">
      <div class="wrap">
        <h2>
          {{ t("whatWeDo") }}
          <img
            v-if="darkMode"
            class="down-icon"
            alt="down-icon"
            src="/src/assets/images/i-down.png"
            height="34"
            width="36"
          />
          <img
            v-else
            class="down-icon"
            alt="down-icon"
            src="/src/assets/images/i-down-light.png"
            height="34"
            width="36"
          />
        </h2>
        <p>
          {{ t("whatWeDoDesc1") }}
        </p>
        <p style="margin-top: 1.5rem">
          {{ t("whatWeDoDesc2") }}
        </p>

        <div class="code-demo-tab-group">
          <button
            v-for="item in tabs"
            :key="item"
            @click="handleTabSwitch(item)"
            :class="activeTab === item ? 'active-tab' : ''"
          >
            {{ item }}
          </button>
        </div>

        <div class="code-demo-container">
          <div class="code-demo relative">
            <div>
              <div class="editor-skin-header">
                <div class="editor-skin-header-btn-group">
                  <span class="editor-skin-header-btn red"></span>
                  <span class="editor-skin-header-btn yellow"></span>
                  <span class="editor-skin-header-btn green"></span>
                </div>
              </div>
              <CodeDemo :tabName="activeTab" />
            </div>

            <div class="preview">
              <quark-button size="big" :loading="isLoading" @click="handleClick"
                >Button</quark-button
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  <div class="footer-container">
    <footer>
      <div class="text-xs text-gray-400">
        A project by <a href="/"> Quark Labs</a>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, reactive } from "vue";
import { useI18n } from "vue-i18n";
import Header from "@/components/Header.vue";
import CodeDemo from "./components/codedemo/index.vue";

export default defineComponent({
  name: "Main",
  components: {
    [Header.name]: Header,
    CodeDemo,
  },
  setup() {
    const { t } = useI18n();
    let darkMode = ref(false);
    const isLoading = ref(false);
    const data = reactive({
      tabs: ["React", "Vue", "Angular", "Html"],
      activeTab: "React",
      tabIndex: 1,
    });

    onMounted(() => {
      // 默认中文
      if (localStorage.getItem("language") === null) {
        localStorage.setItem("language", "zh-CN");
      }
      // 默认 vue 文档
      if (localStorage.getItem("docMd") === null) {
        localStorage.setItem("docMd", "vue");
      }

      if (document.documentElement.classList.contains("dark")) {
        darkMode.value = true;
      }

      const intersectionObserver = new IntersectionObserver((entries) => {
        console.log(entries[0].target.className, 111);
        // 进入视窗
        if (
          entries[0].isIntersecting &&
          entries[0].target.className === "we-believe"
        ) {
          document.querySelector("#scroll-down").style.opacity = 0;
        } else {
          document.querySelector("#scroll-down").style.opacity = 1;
        }
      });
      intersectionObserver.observe(document.querySelector("#we-believe"));
      intersectionObserver.observe(document.querySelector("#we-believe"));
    });

    const handleTabSwitch = (tab) => {
      console.log(tab, 13);
      data.activeTab = tab;
    };

    const handleClick = () => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 2000); // 点击2s后loading消失
    };

    return {
      isZhLang: localStorage.getItem("language") === "zh-CN",
      t,
      darkMode,
      ...toRefs(data),
      isLoading,
      handleClick,
      handleTabSwitch,
    };
  },
});
</script>

<style lang="scss" src="./main.scss"></style>
