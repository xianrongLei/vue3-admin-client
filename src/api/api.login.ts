import service from "@/utils/request";
import { awaitTo } from "@/utils/awaitTo";
import { ApiResult } from "@/types/common";

export const useCaptchaApi = (
  params: Record<string, unknown>
): Promise<ApiResult> =>
  awaitTo(
    service.get("/auth/captcha", {
      params
    })
  );

export const useSigninApi = (
  data: Record<string, unknown>
): Promise<ApiResult> => awaitTo(service.post("/auth/signin", data));
