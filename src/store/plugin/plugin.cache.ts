import type { PiniaPluginContext } from "pinia";
import { watch } from "vue";
import { isEmpty } from "lodash";
import type { CacheItem } from "./plugin.types";
import { getCache, setCache } from "@/utils/utils.cache-operator";

export const cache = (context: PiniaPluginContext) => {
  if (typeof context.options.cache !== "object") return;
  context.store.$cache = context.options.cache;
  Object.keys(context.options.cache).forEach((key: string) => {
    if (typeof context.options.cache !== "object") return;
    const cacheOptions: CacheItem | undefined = context.options.cache[key];
    watch(
      () => context.store.$state[key],
      (newValue) => {
        const cacheValue = getCache({
          key,
          type: cacheOptions?.type
        });
        const isCacheEmpty = isEmpty(cacheValue);
        const isNewValueEmpty = isEmpty(newValue);

        // 传入和缓存都不是空 且传入等于缓存
        if (!isCacheEmpty && !isNewValueEmpty && JSON.stringify(cacheValue) === JSON.stringify(newValue)) {
          return;
        }
        // 传入和缓存都是空
        if (isCacheEmpty && isNewValueEmpty) {
          context.store.$state[key] = cacheOptions?.default;
          return;
        }
        // 传入是空 缓存不是空
        if (isNewValueEmpty) {
          context.store.$state[key] = cacheValue;
          return;
        }
        // 缓存是空 传入不是空
        if (isCacheEmpty) {
          setCache({
            key,
            value: newValue,
            type: cacheOptions?.type
          });
        }
      },
      {
        immediate: true
      }
    );
  });
};
