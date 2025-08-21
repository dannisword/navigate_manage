<script lang="ts" setup>
import TagsView from "./TagsView.vue";
import { storeToRefs } from "pinia";

import { useBasicStore } from "../store/useBasicStore";
const route = useRoute();
const { cachedViews, getCachedViews } = storeToRefs(useBasicStore());
const basic = useBasicStore();

const _data = reactive({
  isLoading: false,
  label: "載入中",
});
watch(
  () => route.name,
  (val) => {
    const routerLevel = route.matched.length;
    basic.addVisitedView(route);
  },

  { immediate: true }
);

const wrapperMap = new Map();

const formatComponentInstance = (component: any, route: any) => {
  let wrapper;
  if (component) {
    const wrapperName = route.path;
    if (wrapperMap.has(wrapperName)) {
      wrapper = wrapperMap.get(wrapperName);
    } else {
      wrapper = {
        name: wrapperName,
        render() {
          return h(component);
        },
      };
      wrapperMap.set(wrapperName, wrapper);
    }
  }
  return h(wrapper);
};
</script>
<template>
  <div class="flex flex-1 flex-col">
    <main class="flex-1 mt-16 p-6 overflow-y-auto">
      <!-- <TagsView></TagsView> -->
      <!-- no transition -->
      <router-view
        v-loading="_data.isLoading"
        :element-loading-text="_data.label"
        v-slot="{ Component, route }"
      >
        <keep-alive :include="getCachedViews">
          <component
            :is="formatComponentInstance(Component, route)"
            :key="route.fullPath"
          />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>
