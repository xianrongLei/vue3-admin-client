import service from "@/utils/request"
import { awaitTo } from "@/utils/awaitTo"
import { AnyObject } from "@/types/common"

export const useCaptchaApi = (params: AnyObject): Promise<any[]> =>
  awaitTo(
    service.get("/auth/captcha", {
      params
    })
  )

export const useSigninApi = (data: AnyObject): Promise<any[]> =>
  awaitTo(service.post("/auth/signin", data))
