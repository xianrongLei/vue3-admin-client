import { Router } from "vue-router";
import { useRouterStore } from "@/store/modules/router";
import { useUserStore } from "@/store/modules/user";
import { clearAll } from "@/utils/utils.cache-operator";
import { discreteApi } from "@/naive";

// 解决刷新动态路由丢失
const isRefresh = { value: true };
// 白名单
const whiteList: string[] = ["/login"];
export const mountGuard = (router: Router): void => {
  // 路由加载前
  router.beforeEach(async (to, _from, next) => {
    discreteApi.loadingBar.start();
    const { useMountRoutes } = useRouterStore();
    const userStore = useUserStore();
    // 用户已登录
    if (userStore.user_token.userId) {
      // 刷新页面
      if (!userStore.user_userInfo.id && isRefresh.value) {
        // 刷新页面重新拉取用户数据
        try {
          isRefresh.value = false;
          await userStore.useGetUserInfo(userStore.user_token.userId);
          useMountRoutes(router, userStore.user_menuTree);
          if (to.path === "/login") next("/"); // 已登录去登录页进行拦截
          else next({ ...to, replace: true }); // 防止刷新页面后同一路由找不到的情况
        } catch (error: any) {
          discreteApi.message.error(error.message);
          userStore.user_token = {}; // 清除缓存token
          clearAll("local");
          clearAll("session");
          next({ ...to, path: "/login", replace: true }); // 防止刷新页面后同一路由找不到的情况
        }
      }
      // 有数据但还未设置动态路由
      else if (isRefresh.value) {
        try {
          isRefresh.value = false;
          // 设置动态路由
          useMountRoutes(router, userStore.user_menuTree);
          if (to.path === "/login") next("/"); // 已登录去登录页进行拦截
          else next({ ...to, replace: true }); // 防止刷新页面后同一路由找不到的情况
        } catch (error: any) {
          discreteApi.message.error(error.message);
          // 清除缓存token
          userStore.user_token = {};
          clearAll("local");
          clearAll("session");
          next({ ...to, path: "/login", replace: true }); // 防止刷新页面后同一路由找不到的情况
        }
      } else {
        next();
      }
    } else if (whiteList.indexOf(to.path) > -1) {
      // 用户未登录 可以进入白名单
      next();
    } else {
      // 用户未登录
      next("/login");
    }
  });
  router.afterEach(() => {
    discreteApi.loadingBar.finish();
  });
};
