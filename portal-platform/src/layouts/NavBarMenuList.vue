<script setup>
import NavBarItem from "./NavBarItem.vue";

defineProps({
  menus: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["menu-click"]);

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};
</script>

<template>
  <NavBarItem
    v-for="(item, index) in menus"
    :key="index"
    :item="item"
    :isFixed="true"
    @menu-click="menuClick"
  />
</template>
