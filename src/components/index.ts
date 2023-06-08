import { defineAsyncComponent } from "vue";

export const mountComponents = (vueComponent: Function) => {
  const components = import.meta.glob("./**/index.vue");
  Object.keys(components).forEach((path) => {
    if (Object.prototype.hasOwnProperty.call(components, path)) {
      const name = path.match(/\/([^/]+)\/(?=index\.vue$)/)?.[1];

      const component = defineAsyncComponent(() => components[path]());

      vueComponent(name, component);
    }
  });
};
