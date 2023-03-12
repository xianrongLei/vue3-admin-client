import service from "@/utils/request"
import { awaitTo } from "@/utils/helpers"
import { AnyObject } from "@/types/common"

export const useCaptchaApi = (params: AnyObject): Promise<any> =>
  awaitTo(
    service.get("/sys/oauth/captcha", {
      params
    })
  )

export const useLoginApi = (data: any): Promise<any> =>
  awaitTo(
    service.post("/sys/oauth/token", data, {
      auth: {
        username: "web",
        password: "123456"
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
  )
export const useLogoutApi = (): Promise<any> =>
  awaitTo(service.post("/sys/oauth/logout"))
