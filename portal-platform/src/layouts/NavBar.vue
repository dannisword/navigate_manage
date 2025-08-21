<script setup lang="ts">
import NavBarMenuList from './NavBarMenuList.vue';
defineProps({
  menus: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <nav
    class="top-0 inset-x-0 fixed bg-primary-700/80 z-40 shadow transition-position w-screen lg:w-auto dark:bg-slate-800"
  >
    <div class="flex lg:items-stretch">
      <div class="flex flex-1 items-stretch">
        <slot />
      </div>
      <!-- <div class="flex-none flex h-14 items-center">物流中心</div> -->
      <div class="flex-none items-stretch flex h-14 text-white">
        <NavBarMenuList :menus="menus" />
      </div>
    </div>
  </nav>
</template>
