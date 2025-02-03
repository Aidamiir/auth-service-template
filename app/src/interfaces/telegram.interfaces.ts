export interface ITelegramInitData {
    user: ITelegramUser | null;
    authDate: string | null;
    queryId: string | null;
}

export interface ITelegramUser {
    id: number;
    firstName: string;
    lastName?: string;
    username?: string;
    languageCode?: string;
    isPremium?: boolean;
    photoUrl?: string;
    addedToAttachmentMenu?: boolean;
    allowsWriteToPm?: boolean;
}
