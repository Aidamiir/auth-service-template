/**
 * Карта переменных окружения.
 * Используется для централизованного управления настройками приложения.
 */
export const ENV = {
    FILE_NAME: '.env',
    PORT: 'PORT',
    CORS_ORIGIN: 'CORS_ORIGIN',
    TELEGRAM_BOT_TOKEN: 'TELEGRAM_BOT_TOKEN',
    JWT_SECRET: 'JWT_SECRET',
} as const;
