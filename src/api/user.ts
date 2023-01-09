import service from "@/utils/request"

export const useUserInfoApi = () => service.get("/sys/user/info")
