const store: Record<string, any> = {};
const files: Record<string, any> = import.meta.globEager("./modules/*.ts");

export const registerStore = () => {
  Object.keys(files).forEach((fileName) => {
    const name: string = fileName.replace(/\.\/|\.ts/g, "").split("/")[1];
    store[name] = files[fileName].default();
  });
};
export default store;
