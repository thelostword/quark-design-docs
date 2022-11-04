<template>
  <div class="min-h-[800px] bg-white dark:bg-gray-900 doc-content-document full">
    <blockquote><p>{{ isZhLang ? '本站就 React/Vue 有单独说明，其它技术栈可以参考 Vue 文档。' : 'This site has separate instructions for React/Vue,For other technology stacks, please refer to the Vue documentation.' }}</p></blockquote>
    <p><a href="https://quark-design.hellobike.com/#/zh-CN/component/button">{{ isZhLang ? '点击查看 Vue 文档' : 'Click to view Vue documentation' }}</a></p>

    <h2>{{ isZhLang ? '各类技术栈使用示例' : 'Examples of the use of various technology stacks' }}</h2>
    <div class="code-demo-container">
      <div class="code-demo relative">
        <div class="absolute inset-x-0 top-0 z-10 m-[2px] md:left-auto">
          <div class="flex items-stretch justify-end rounded-t-[10px] px-2 py-1 md:rounded-lg">
            <button @click="handleTabSwitch(0)" :class="tabIndex === 0 ? 'bg-opacity-20': 'bg-opacity-0' " class="bg-black mr-1 flex rounded-md px-3 py-2 text-xs font-medium text-white  focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50 ">Preview</button>
            <button @click="handleTabSwitch(1)" :class="tabIndex === 1 ? 'bg-opacity-50 bg-white': 'bg-opacity-0' " class="bg-black bg-opacity-0 hover:bg-opacity-[0.05] flex rounded-md px-3 py-2 text-xs font-medium text-white focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50">React</button>
            <button @click="handleTabSwitch(2)" :class="tabIndex === 2 ? 'bg-opacity-50 bg-white': 'bg-opacity-0' " class="bg-black bg-opacity-0 hover:bg-opacity-[0.05] flex rounded-md px-3 py-2 text-xs font-medium text-white focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50">Vue</button>
            <button @click="handleTabSwitch(3)" :class="tabIndex === 3 ? 'bg-opacity-50 bg-white': 'bg-opacity-0' " class="bg-black bg-opacity-0 hover:bg-opacity-[0.05] flex rounded-md px-3 py-2 text-xs font-medium text-white focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50">Angular</button>
            <button @click="handleTabSwitch(4)" :class="tabIndex === 4 ? 'bg-opacity-50 bg-white': 'bg-opacity-0' " class="bg-black bg-opacity-0 hover:bg-opacity-[0.05] flex rounded-md px-3 py-2 text-xs font-medium text-white focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-50">Html</button>
          </div>
        </div>

        <div v-if="tabIndex === 0" class="preview">
          <quark-button size="big" :loading="isLoading" @click="handleClick">Button</quark-button>
        </div>

        <div v-else>
          <div class="editor-skin-header">
            <div class="editor-skin-header-btn-group">
              <span class="editor-skin-header-btn red"></span>
              <span class="editor-skin-header-btn yellow"></span>
              <span class="editor-skin-header-btn green"></span>
            </div>
          </div>

          <CodeDemo :tabName="tabName" />
        </div>
      </div>
    </div>

    <h2>{{ isZhLang ? 'Vue/React/Angular/无框架项目' : 'Vue/React/Angular/frameless project' }}</h2>
    <p>{{ isZhLang ? 'Vue/React/Angular/无框架项目皆可使用 `quarkd` 这个包。': 'Vue/React/Angular/frameless projects can use the `quarkd` package.' }}</p>
    <pre>
      <code style="padding: 0;">
        <span class="hljs-meta"># </span>npm i quarkd
      </code>
    </pre>
    <h2>{{ isZhLang ? 'React 项目特别说明': 'React Project Special Notes' }}</h2>
    <p>{{ isZhLang ? '1：由于 `quarkd` 提供的组件均为原生自定义元素（类比div），因此组件派发的事件需要使用addEventLisener接收。': '1: Since the components provided by `quarkd` are all native custom elements (analogous to div), the events dispatched by the components need to be received by addEventListener.' }}</p>
    <br/>
    <p>{{ isZhLang ? '2：Vue 技术栈使用 `@xx` 即可接收原生派发的事件，因此不需要使用addEventLisener接收。' : '2: The Vue technology stack uses `@xx` to receive natively dispatched events, so there is no need to use addEventListener to receive them.' }}</p>
    <br/>
    <p>{{ isZhLang ? '3：针对 React 技术栈，为了避免开发者手动 addEventLisener 接收事件，我们底层依托 `quarkd` ，上层进行了 Reactify(React 化)！因此 React 项目推荐使用 `@quarkd/quark-react`。': '3: For the React technology stack, in order to avoid developers manually addingEventLisener to receive events, we rely on `quarkd` at the bottom and Reactify (React) the upper layer! Therefore the React project recommends using `@quarkd/quark-react`.' }}</p>
    <pre>
      <code style="padding: 0;">
        <span class="hljs-meta"># </span>npm i @quarkd/quark-react
      </code>
    </pre>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, toRefs, ref } from "vue";
  import CodeDemo from "../components/codedemo/index.vue";
  import { useI18n } from "vue-i18n";
  import "quarkd/lib/button";
  import "quarkd/lib/tab";

  export default defineComponent({
    name: "other-docs",
    components: {
      CodeDemo,
    },
    setup() {
      const isLoading = ref(false);
      const isZhLang = localStorage.getItem("language") === "zh-CN";
      const data = reactive({
        tabs: ["React", "Vue", "Angular", "Html"],
        tabName: "Vue",
        tabIndex: 0,
      });

      const handleTabSwitch = (index: number) => {
        data.tabIndex = index;
        data.tabName = data.tabs[index-1];
      }

      const handleClick = () => {
        isLoading.value = true;
        setTimeout(() => {
          isLoading.value = false;
        }, 2000); // 点击2s后loading消失
      };

      return {
        ...toRefs(data),
        isLoading,
        isZhLang,
        handleClick,
        handleTabSwitch,
      };
    },
  });
</script>
<style src="./index.scss"></style>