import type { PiniaPlugin, PiniaPluginContext } from "pinia";
import { watch } from "vue";
import { isEmpty } from "lodash";
import { getCache, setCache } from "@/utils/utils.cache-operator";
import { CacheItem } from "./plugin.types";

export const cacheManager: PiniaPlugin = (context: PiniaPluginContext) => {
  /**
   * 和其他原生参数一样设置$cache
   */
  context.store.$cache = context.options.cache;
  /**
   * 如果store中没有定义cache则自己返回
   */
  if (!context.options.cache) return;
  const $cache = context.options.cache;
  Object.keys($cache).forEach((key) => {
    const cacheItem = $cache[key] as CacheItem<typeof context.store.$state, typeof context.store>;
    /**
     * beforeMounted的意义
     * 1.
     */
    cacheItem?.beforeMounted?.bind(context.store)(getCache(key, cacheItem.type));
    watch(
      () => context.store.$state[key],
      (newValue, oldValue) => {
        /**
         * 如果有使用监听变化的钩子则调用
         */

        cacheItem.onChange?.bind(context.store)(newValue, oldValue);
        const cacheValue = getCache(key, cacheItem.type);
        const isCacheEmpty = isEmpty(typeof cacheValue === "number" ? "0" : cacheValue);
        const isNewValueEmpty = isEmpty(typeof cacheValue === "number" ? "0" : newValue);
        // 传入和缓存都不是空
        if (!isCacheEmpty && !isNewValueEmpty) {
          // 且传入不等于缓存
          if (JSON.stringify(cacheValue) !== JSON.stringify(newValue)) {
            setCache(key, newValue, cacheItem.type);
          }
        }
        // 传入和缓存都是空
        else if (isCacheEmpty && isNewValueEmpty) {
          context.store.$state[key] = cacheItem.default;
          setCache(key, newValue, cacheItem.type);
        }
        // 传入是空 拉取缓存
        else if (isNewValueEmpty) {
          context.store.$state[key] = cacheValue;
        }
        // 缓存是空 设置缓存
        else {
          setCache(key, newValue, cacheItem.type);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
  });
};
