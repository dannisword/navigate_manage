<script setup lang="ts">
import AsideMenuLayer from './AsideMenuLayer.vue';
const props = defineProps({
  menus: {
    type: Array,
    required: true,
  },
  isAsideMobileExpanded: Boolean,
  isAsideLgActive: Boolean,
  isAsideActive: Boolean,
});

const emit = defineEmits(["menu-click", "aside-lg-close-click"]);
const componentClass = computed(() => {
  const base = props.isAsideActive ? "flex" : "hidden";

  return base;
});

const menuClick = (event: any, item: any) => {  
  emit("menu-click", event, item);
};

const asideLgCloseClick = (event: any) => {
  emit("aside-lg-close-click", event);
};
</script>

<template>
  <AsideMenuLayer
    :menus="menus"
    :class="componentClass"
    @menu-click="menuClick"
    @aside-lg-close-click="asideLgCloseClick"
  />
</template>
