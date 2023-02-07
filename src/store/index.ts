type Store = Record<string, { [key: string]: any }>
const store: Store = {}
const files: Store = import.meta.globEager("./modules/*.ts")

export const registerStore = () => {
  Object.keys(files).forEach(fileName => {
    const name: string = fileName.replace(/\.\/|\.ts/g, "").split("/")[1]
    store[name] = files[fileName].default()
  })
  console.log(store)
}
export default store
