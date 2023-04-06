import { AxiosError } from "axios";

export type ApiResult = [AxiosError | null, any];
