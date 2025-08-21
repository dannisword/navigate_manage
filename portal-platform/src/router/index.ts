import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Layout from "../layouts/LayoutAuthenticated.vue";
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/dashboard.vue"),
        meta: { title: "Dashboard", affix: false },
      }
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  strict: true,
  routes: constantRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export const resetRouter = (): void => {
  const resetWhiteNameList = ["Redirect", "Login", "NoFind", "Root"];
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !resetWhiteNameList.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
};
export default router;
