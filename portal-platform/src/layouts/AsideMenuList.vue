<script setup lang="ts">
import AsideMenuItem from './AsideMenuItem.vue'
defineProps({
  isDropdownList: Boolean,
  menus: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['menu-click'])

const menuClick = (event: any, item: any) => {
  emit('menu-click', event, item)
}
</script>

<template>
  <ul>
    <AsideMenuItem
      v-for="(item, index) in menus"
      :key="index"
      :item="item"
      :is-dropdown-list="isDropdownList"
      @menu-click="menuClick"
    />
  </ul>
</template>
