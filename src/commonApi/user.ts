import service from "@/utils/request"
import { awaitTo } from "@/utils/helpers"

export const useUserInfoApi = (): Promise<any> =>
  awaitTo(service.get("/sys/user/info"))
