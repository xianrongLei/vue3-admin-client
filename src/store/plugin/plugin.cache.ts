import { PiniaPluginContext } from "pinia";
import { watch } from "vue";
import { getCache, setCache } from "@/utils/utils.cache-operator";
// eslint-disable-next-line arrow-body-style
const isEmpty = (value: any) => {
  return (
    JSON.stringify(value) === "{}" || JSON.stringify(value) === "[]" || !value
  );
};
export const cache = (context: PiniaPluginContext) => {
  if (typeof context.options.cache !== "object") return;
  context.store.$cache = context.options.cache;
  Object.keys(context.options.cache).forEach((key: string) => {
    if (typeof context.options.cache !== "object") return;
    const item = context.options.cache[key];
    watch(
      () => context.store.$state[key],
      (newValue) => {
        const isNewValueEmpty = isEmpty(newValue);
        const cacheValue = getCache({
          key,
          type: item?.type
        });
        const isCacheEmpty = isEmpty(cacheValue);

        // 传入和缓存都是空
        if (isCacheEmpty && isNewValueEmpty) {
          if (newValue?.toString() === item?.default?.toString()) {
            context.store.$state[key] = item?.default;
          }
          return;
        }
        // 传入和缓存都不是空 且传入等于缓存
        if (
          !isCacheEmpty &&
          !isNewValueEmpty &&
          JSON.stringify(cacheValue) === JSON.stringify(newValue)
        ) {
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
            type: item?.type
          });
        }
      },
      {
        immediate: true
      }
    );
  });
};
