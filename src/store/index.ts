import { appStore } from "./modules/app"

const store: any = {}

export const registerStore = () => {
  store.appStore = appStore()
}

export default store
