<template>
  <div class="doc-demo-preview" :class="{ 'fixed-class': fixed }">
    <iframe :src="url" id="quark-demo" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from "vue";

export default defineComponent({
  name: "DocDemoPreview",
  props: {
    url: String,
    type: String,
    fixed: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.doc-demo-preview {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  /* --tw-drop-shadow: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow); */

  border-radius: 0.75rem;
  overflow: hidden;
  position: fixed;
  right: 30px;
  top: 88px;
  min-height: 620px;
  width: 360px;
  iframe {
    height: 590px;
    width: 100%;
  }
}
.fixed-class {
  top: 20px;
}
</style>
