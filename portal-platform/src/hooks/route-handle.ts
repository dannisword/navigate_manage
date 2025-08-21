import { useRouter, useRoute } from "vue-router";

export function routeHandle() {
  const router = useRouter();
  const route = useRoute();
  const appRoutes = Array<any>();

  const params = () => {
    return route.params;
  };

  const pageName = () => {
    return route.name?.toString();
  };
  /**
   * 重定位
   * @param url
   */
  const redirect = (url: any) => {
    const redirectUrl = route.query && route.query.redirect;
  };
  /**
   * 導覽頁面
   * @param url
   */
  const navigation = (url: any) => {
    const path = `${url}`;
    router.push({ path: path });
  };
  /**
   *
   * @returns
   */
  const currentRouteValue = () => {
    //  route 全部
    return router.currentRoute;
  };
  const addViews = () => {
    appRoutes.push(router.currentRoute.value.meta);
  };

  const getAllViews = () => {
    const data = localStorage.getItem("app-view");
    if (data == null) {
      return data;
    }
    return JSON.parse(data);
  };
  return {
    redirect,
    navigation,
    currentRouteValue,
    getAllViews,
    addViews,
    route,
    pageName,
    params,
  };
}
