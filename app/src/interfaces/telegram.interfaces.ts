export interface ITelegramInitData {
    user: ITelegramUser;
    authDate: string;
    queryId: string;
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
