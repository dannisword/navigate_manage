<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";
import { IconHandle } from "../hooks/icon-handle";
import NavBar from "./NavBar.vue";
import NavBarItemPlain from "./NavBarItemPlain.vue";
import AppMain from "./AppMain.vue";
import AsideMenu from "./AsideMenu.vue";
import menuNavBar from "../utils/menuNavBar";

const { width } = useWindowSize();
const sidebarOpen = ref(true);

const { mdiMenu, mdiClose, mdiMonitor, mdiTextBoxOutline, mdiViewDashboard } =
  IconHandle();
const menus = [
  {
    name: "Dashboard",
    label: "Dashboard",
    icon: mdiViewDashboard,
    isDropdownList: false,
    path: "/dashboard",
  },
  {
    name: "設備管理",
    label: "設備管理",
    icon: mdiMonitor,
    isDropdownList: false,
    path: "",
    menu: [
      {
        name: "設備查詢",
        label: "設備查詢",
        icon: null,
        isDropdownList: true,
        path: "/device-records",
      },
      {
        name: "感測器查詢",
        label: "感測器查詢",
        icon: null,
        isDropdownList: true,
        path: "/sensor-records",
      },
    ],
  },
  {
    name: "表單設定",
    label: "表單設定",
    icon: mdiTextBoxOutline,
    isDropdownList: false,
    path: "/documents",
  }
];

watch(width, (vaule) => {
  sidebarOpen.value = vaule < 768 ? false : true;
});
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};
</script>

<template>
  <div :class="'h-screen flex bg-gray-50'">
    <!-- Navbar -->
    <NavBar :menus="menuNavBar">
      <NavBarItemPlain class="text-white" useMargin @click="toggleSidebar()">
        <BaseIcon :w="'w-12'" :h="'h-12'" :path="mdiMenu" size="36" />
      </NavBarItemPlain>
      <div class="flex items-center text-white">
        <h1 class="font-bold text-xl">工業研究院</h1>
      </div>
    </NavBar>

    <!-- Sidebar -->
    <AsideMenu
      :menus="menus"
      :is-aside-mobile-expanded="true"
      :is-aside-active="sidebarOpen"
      @asideLgCloseClick="toggleSidebar()"
    />
    <!-- main -->
    <AppMain class="grid grid-cols-1" />
  </div>
</template>
