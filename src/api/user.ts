import service from "@/utils/request"
import { to } from "@/utils/awaitToJs"

export const useUserInfoApi = (): Promise<any> => to(service.get("/sys/user/info"))
