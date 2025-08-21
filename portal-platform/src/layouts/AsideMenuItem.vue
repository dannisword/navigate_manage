<script setup lang="ts">
import { RouterLink } from "vue-router";
import { mdiMinus, mdiPlus } from "@mdi/js";
import AsideMenuList from "./AsideMenuList.vue";
import { routeHandle } from "../hooks/route-handle";
import { IsEmptyOrNull, getButtonColor } from "../utils/index";
const route = routeHandle();

const props = defineProps<{
  item: any;
  isDropdownList: Boolean;
}>();

const emit = defineEmits(["menu-click"]);

const hasColor = computed(() => props.item && props.item.color);

const asideMenuItemActiveStyle = computed(() =>
  hasColor.value ? "" : "aside-menu-item-active font-bold"
);
const isDropdownActive = ref(false);

const componentClass = computed(() => [
  props.isDropdownList ? "py-3 px-16" : "py-3",
  hasColor.value
    ? getButtonColor(props.item.color, false, true)
    : `aside-menu-item dark:text-slate-300 dark:hover:text-white`,
]);

const hasDropdown = computed(() => !!props.item.menu);

const menuClick = (event: any) => {
  if (IsEmptyOrNull(props.item.path) == false){
    route.navigation(props.item.path)
  }
  emit("menu-click", event, props.item);

  if (hasDropdown.value) {
    isDropdownActive.value = !isDropdownActive.value;
  }
};
</script>
<template>
  <li>
    <component
      :is="item.to ? RouterLink : 'a'"
      v-slot="vSlot"
      :to="item.to ?? null"
      :href="item.href ?? null"
      :target="item.target ?? null"
      class="flex cursor-pointer hover:bg-primary-50"
      :class="componentClass"
      @click="menuClick"
    >
      <BaseIcon
        v-if="item.icon"
        :path="item.icon"
        class="flex-none"
        :class="[vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '']"
        w="w-16"
        :size="18"
      />
      <span
        class="grow text-ellipsis line-clamp-1"
        :class="[
          { 'pr-2': !hasDropdown },
          vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '',
        ]"
        >{{ item.label }}</span
      >
      <BaseIcon
        v-if="hasDropdown"
        :path="isDropdownActive ? mdiMinus : mdiPlus"
        class="flex-none"
        :class="[vSlot && vSlot.isExactActive ? asideMenuItemActiveStyle : '']"
        w="w-12"
      />
    </component>
    <AsideMenuList
      v-if="hasDropdown"
      :menus="item.menu"
      :class="[
        'aside-menu-dropdown',
        isDropdownActive ? 'block dark:bg-slate-800/50' : 'hidden',
      ]"
      is-dropdown-list
    />
  </li>
</template>
