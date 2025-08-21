<script setup lang="ts">
import { computed } from "vue";
import * as icons from "@mdi/js";
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  w: {
    type: String,
    default: "w-4",
  },
  h: {
    type: String,
    default: "h-4",
  },
  size: {
    type: [String, Number],
    default: null,
  },
});

const spanClass = computed(
  () =>
    `inline-flex justify-center items-center cursor-pointer ${props.w} ${props.h}`
);

const iconSize = computed(() => props.size ?? 16);

const getIcon = (path: any) => {
  if (path.includes("mdi")) {
    return (icons as Record<string, string>)[path];
  }
  return path;
};
</script>

<template>
  <span :class="spanClass">
    <svg
      viewBox="0 0 24 24"
      :width="iconSize"
      :height="iconSize"
      class="inline-block"
    >
      <path fill="currentColor" :d="getIcon(path)" />
    </svg>
    <slot />
  </span>
</template>
