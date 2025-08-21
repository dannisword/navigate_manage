<script setup lang="ts">
import { mdiChevronUp, mdiChevronDown } from "@mdi/js";
import { RouterLink } from "vue-router";
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useMainStore } from "../store/useMainStore";
import NavBarMenuList from './NavBarMenuList.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["menu-click"]);

const is = computed(() => {
  if (props.item.href) {
    return "a";
  }

  if (props.item.to) {
    return RouterLink;
  }

  return "div";
});

const componentClass = computed(() => {
  const base = [
    isDropdownActive.value
      ? `navbar-item-label-active dark:text-slate-400`
      : `navbar-item-label dark:text-white dark:hover:text-slate-400`,
    props.item.menu ? "lg:py-2 lg:px-3" : "py-2 px-3",
  ];

  if (props.item.isDesktopNoLabel) {
    base.push("lg:w-32", "lg:justify-center");
  }
  return base;
});

const itemLabel = computed(() =>
  props.item.isCurrentUser ? useMainStore().userName : props.item.label
);

const isDropdownActive = ref(false);

const menuClick = (event: any) => {
  emit("menu-click", event, props.item);

  if (props.item.menu) {
    isDropdownActive.value = !isDropdownActive.value;
  }
};

const menuClickDropdown = (event: any, item: any) => {
  emit("menu-click", event, item);
};

const root = ref(null);

const forceClose = (event: any) => {
  return;
};

onMounted(() => {
  if (props.item.menu) {
    window.addEventListener("click", forceClose);
  }
});

onBeforeUnmount(() => {
  if (props.item.menu) {
    window.removeEventListener("click", forceClose);
  }
});
</script>
<template>
   <BaseDivider v-if="item.isDivider" nav-bar />
  <component
    :is="is"
    v-else
    ref="root"
    class="flex items-center relative cursor-pointer"
    :class="componentClass"
    :to="item.to ?? null"
    :href="item.href ?? null"
    :target="item.target ?? null"
    @click="menuClick"
  >
    <div
      class="flex items-center"
      :class="{
        'bg-gray-100  dark:bg-slate-800 bg-transparent dark:bg-transparent p-6':
          item.menu,
      }"
    >
      <!-- <UserAvatarCurrentUser
        v-if="item.isCurrentUser"
        class="w-6 h-6 mr-3 inline-flex"
      />  -->

      <BaseIcon
        v-if="item.icon"
        :path="item.icon"
        class="text-white"
      />
      <span class="px-8 text-white">{{ itemLabel }}</span>
      <BaseIcon
        v-if="item.menu"
        :path="isDropdownActive ? mdiChevronUp : mdiChevronDown"
        class="text-white"
      />
    </div>

    <div
      v-if="item.menu"
      class="text-sm  bg-gray absolute top-full left-0 min-w-full z-20 rounded-lg shadow-lg"
      :class="{ hidden: !isDropdownActive }"
    >
      <NavBarMenuList :menus="item.menu" @menu-click="menuClickDropdown" />
    </div>
  </component>
</template>
