<template>
  <doc-header></doc-header>

  <main class="home-main">
    <section class="home-section">
      <div class="home-text">
        <div>
          <div class="home-logo">
            <img src="/src/assets/images/quark-logo.png" alt="" />
          </div>
          <h1 class="home-title">Next-gen frontend component library</h1>
          <p class="home-subtitle">
            it can be used in any framework or no framework.
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
                >Get Started</a
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
                >Why Quark?</a
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
        <span>Scroll down</span>
        <!-- <span class="arrow" id="arrow">&gt;</span> -->
        <span class="arrow">
          <img src="/src/assets/images/arrow.png" alt="arrow" />
        </span>
      </a>
    </section>
    <section class="we-believe" id="we-believe">
      <div class="wrap">
        <h2>
          WE BELIEVE
          <img
            class="down-icon"
            alt="down-icon"
            src="/src/assets/images/i-down.svg"
            height="34"
            width="36"
          />
        </h2>
        <p>
          The component library can exist without relying on the technical
          framework.
        </p>
        <p style="margin-top: 1.5rem">
          If this can be done, then the component library can go through ups and
          downs and go through a long period of time!
        </p>
        <p style="margin-top: 1.5rem">
          It does not need to be updated with the update of the technology
          stack.
        </p>
      </div>
    </section>
    <section class="what-we-do" id="what-we-do">
      <div class="wrap">
        <h2>
          WHAT WE DO
          <img
            class="down-icon"
            alt="down-icon"
            src="/src/assets/images/i-down.svg"
            height="34"
            width="36"
          />
        </h2>
        <p>
          Benefiting from the native support of web components in browsers, we
          developed Quark Design using this technology.
        </p>
        <p style="margin-top: 1.5rem">
          This allows the front-end group library to actually find that the
          technology stack has nothing to do.
        </p>
        <div class="actions" style="margin-top: 1.5rem; justify-content: left">
          <div class="action">
            <!-- TODO: link to playground -->
            <a
              class="get-started"
              :href="`${
                isZhLang
                  ? `#/zh-CN/guide/quickstart`
                  : `#/en-US/guide/quickstart`
              }`"
              >Have a try</a
            >
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
import { defineComponent, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "Main",
  components: {
    [Header.name]: Header,
  },
  setup() {
    const { t } = useI18n();

    onMounted(() => {
      // 默认中文
      if (localStorage.getItem("language") === null) {
        localStorage.setItem("language", "zh-CN");
      }
      // 默认 vue 文档
      if (localStorage.getItem("docMd") === null) {
        localStorage.setItem("docMd", "vue");
      }

      const intersectionObserver = new IntersectionObserver((entries) => {
        // 进入视窗
        if (entries[0].isIntersecting) {
          document.querySelector("#scroll-down").style.opacity = 0;
        } else {
          document.querySelector("#scroll-down").style.opacity = 1;
        }
      });
      intersectionObserver.observe(document.querySelector("#we-believe"));
    });

    return {
      isZhLang: localStorage.getItem("language") === "zh-CN",
      t,
    };
  },
});
</script>

<style lang="scss" src="./main.scss"></style>
