import type { PiniaPlugin, PiniaPluginContext } from "pinia";
import { watch } from "vue";
import { isEmpty } from "lodash";
import { getCache, setCache } from "@/utils/utils.cache-operator";

export const cacheManager: PiniaPlugin = (context: PiniaPluginContext) => {
  context.store.$cache = context.options.cache;
  if (!context.options.cache) return;
  const $cache = context.options.cache;
  Object.keys($cache).forEach((key) => {
    const cache = $cache[key];
    $cache[key]?.beforeMounted?.bind(context.store)(getCache(key, cache?.type));
    watch(
      () => context.store.$state[key],
      (newValue) => {
        const cacheValue = getCache(key, cache?.type);
        const isCacheEmpty = isEmpty(cacheValue);
        const isNewValueEmpty = isEmpty(newValue);

        // 传入和缓存都不是空
        if (!isCacheEmpty && !isNewValueEmpty) {
          // 且传入不等于缓存
          if (JSON.stringify(cacheValue) !== JSON.stringify(newValue)) {
            setCache(key, newValue, cache?.type);
          }
        }
        // 传入和缓存都是空
        else if (isCacheEmpty && isNewValueEmpty) {
          context.store.$state[key] = cache?.default;
        }
        // 传入是空
        else if (isNewValueEmpty) {
          context.store.$state[key] = cacheValue;
        }
        // 缓存是空
        else {
          setCache(key, newValue, cache?.type);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );
  });
};
