/**
 * Карта API-маршрутов.
 * Используется для централизованного управления путями в приложении.
 */
export const API_MAP = {
    PREFIX: 'api',
    DOCS: 'docs',

    LOGIN: 'login',
    REGISTER: 'register',
    TELEGRAM_LOGIN: 'telegram/login',
    REFRESH_TOKENS: 'refresh-tokens',
    LOGOUT: 'logout',
    LOGOUT_ALL: 'logout-all',
} as const;
