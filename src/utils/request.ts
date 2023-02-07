import axios from "axios"
// import store from '@/store'
// import cache from '@/utils/cache'

// axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as any,
  timeout: 60000,
  headers: { "Content-Type": "application/json;charset=UTF-8" }
})

// 请求拦截器
service.interceptors.request.use(
  (config: any) => {
    // const userStore = store.userStore
    // if (userStore?.token) {
    //   config.headers.Authorization = 'Bearer ' + userStore.token
    // }

    // config.headers['Accept-Language'] = cache.getLanguage()

    // 追加时间戳，防止GET请求缓存
    if (config.method?.toUpperCase() === "GET") {
      config.params = { ...config.params, t: new Date().getTime() }
    }

    if (Object.values(config.headers).includes("application/x-www-form-urlencoded")) {
      // config.data = qs.stringify(config.data);
    }

    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      return Promise.reject(response)
    }
    const res = response.data
    // 没有权限，如：未登录、登录过期等，需要跳转到登录页
    if (res.code === 401) {
      window.location.reload()
    }

    return res
  },
  error => Promise.reject(error)
)

// 导出 axios 实例
export default service
