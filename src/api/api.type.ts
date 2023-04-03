import { AxiosError } from "axios";

export type ApiResult<T> = [AxiosError | null, T | null];
