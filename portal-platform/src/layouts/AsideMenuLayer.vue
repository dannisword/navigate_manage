<script setup>
import { mdiClose, mdiLogout } from "@mdi/js";
import AsideMenuList from "./AsideMenuList.vue";
import AsideMenuItem from "./AsideMenuItem.vue";

const props = defineProps({
  menus: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["menu-click", "aside-lg-close-click"]);

const componentClass = computed(() => {});

const logoutItem = computed(() => ({
  label: "Logout",
  icon: mdiLogout,
  color: "success",
  isLogout: true,
}));

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};

const asideLgCloseClick = (event) => {
  emit("aside-lg-close-click", event);
};
</script>

<template>
  <aside
    class="w-60 mt-16 bg-white flex z-40 top-0 h-[calc(100vh-4rem)] shadow transition-postion overflow-hidden"
  >
    <div class="aside flex flex-1 flex-col overflow-hidden dark:bg-slate-900">
      <div
        class="flex-1 overflow-y-auto overflow-x-hidden aside-scrollbars"
      >
        <AsideMenuList :menus="menus" @menu-click="menuClick" />
      </div>

      <ul>
        <AsideMenuItem :item="logoutItem" @menu-click="menuClick" />
      </ul>
    </div>
  </aside>
</template>
