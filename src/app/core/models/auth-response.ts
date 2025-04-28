import { BaseResponse } from "./base-response";

export interface AuthResponse extends BaseResponse{
    token: string;
    requiresTwoFactor: boolean;
    userId: string;
}

