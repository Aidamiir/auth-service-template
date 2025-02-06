export interface ITokenPayload {
    userId: number;
}

export interface IGenerateTokens {
    accessToken: string;
    refreshToken: string;
}
