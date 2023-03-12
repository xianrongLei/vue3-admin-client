import service from "@/utils/request"
import { awaitTo } from "@/utils/helpers"
import { AnyObject } from "@/types/common"

export const useCaptchaApi = (params: AnyObject): Promise<any[]> =>
  awaitTo(
    service.get("/auth/captcha", {
      params
    })
  )
