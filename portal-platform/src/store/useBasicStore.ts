import { defineStore } from "pinia";
import type { RouteLocationNormalized } from "vue-router";

interface VisitedView {
  name: string;
  path: string;
  query?: Record<string, any>;
  meta?: Record<string, any>;
}

export const useBasicStore = defineStore("useBasicStore", {
  state: () => {
    return {
      // 標籤資料
      //visitedViews: Array<VisitedView>(),
      visitedViews: [] as VisitedView[],
      // keep alive cachedViews
      //cachedViews: new Array<string>(),
      cachedViews: [] as string[],
    };
  },
  getters: {
    getVisitedViews(state) {
      return state.visitedViews;
    },
    getCachedViews(): string[] {
      //return Array.from(this.cachedViews);
      return [...this.cachedViews];
    },
  },
  actions: {
    /**
     *
     * @param route
     */
    addVisitedView(route: any) {
      this.$patch((state) => {
        if (state.visitedViews.some((v: any) => v.path === route.path)) {
          return;
        }
        if (route.params.sysOrderNo !== undefined) {
          route.meta.title = route.params.sysOrderNo;
        }
        if (route.params.docNo !== undefined) {
          route.meta.title = route.params.docNo;
        }
        const tagViwe = {
          name: route.name,
          path: route.path,
          query: route.query,
          meta: route.meta,
        };
        state.visitedViews.push(tagViwe);

        if (state.cachedViews.includes(route.path)) {
          return;
        }
        state.cachedViews.push(route.path);
      });
    },
    delVisitedView(view: any) {
      return new Promise((resolve) => {
        this.$patch((state: any) => {
          //匹配view.path元素将其删除
          for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
              state.visitedViews.splice(i, 1);
              break;
            }
          }
          const index = state.cachedViews.indexOf(view.path);
          if (index > -1) {
            state.cachedViews.splice(index, 1);
          }
          resolve([...state.visitedViews]);
        });
      });
    },
    delOthersVisitedViews(view: any) {
      this.$patch((state: any) => {
        state.visitedViews = state.visitedViews.filter((x: any) => {
          return x.meta.affix == false || x.path === view.path;
        });
        state.cachedViews = state.cachedViews.filter(
          (x: any) => x == view.path
        );
      });
    },
    delAllVisitedViews() {
      const view = this.visitedViews.find((x) => x.name == "Dashboard");
      if (view) {
        this.visitedViews = this.visitedViews.filter(
          (x) => x.path == view.path
        );
        this.cachedViews = this.cachedViews.filter((x) => x == view.path);
      }
    }
  },
  persist: true,
});
