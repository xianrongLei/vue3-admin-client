import service from "@/utils/request";
import { awaitTo } from "@/utils/awaitTo";
import { ApiResult } from "@/api/api.type";

export type UseCaptchaApiResult = ApiResult<Record<string, any>>;
export const useCaptchaApi = (
  params: Record<string, unknown>
): Promise<UseCaptchaApiResult> =>
  awaitTo(
    service.get("/auth/captcha", {
      params
    })
  );

export type UseSigninApiResult = ApiResult<Record<string, any>>;
export const useSigninApi = (
  data: Record<string, unknown>
): Promise<UseSigninApiResult> => awaitTo(service.post("/auth/signin", data));
