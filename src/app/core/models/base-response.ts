export interface BaseResponse {
    result: boolean;
    message: string;
    token: string;
    requiresTwoFactor: boolean;
    userId: string;
}

