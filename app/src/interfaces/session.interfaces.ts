export interface ICreateSession {
    userId: number;
    refreshToken: string;
    ip?: string;
    userAgent?: string;
    expiresAt: Date;
}

export interface IUpdateSession {
    refreshToken: string;
    expiresAt: Date;
}
