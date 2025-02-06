/**
 * Карта сообщений для API.
 * Используется для централизованного управления текстами ответов.
 */
export const MESSAGES = {
    APP: {
        START: 'Application is running on',
        SWAGGER: 'SWAGGER is running on',
    },
    AUTH: {
        REGISTER: {
            SUCCESS: 'Регистрация прошла успешно',
            CONFLICT: 'Произошла ошибка при регистрации',
            EMAIL_CONFIRMATION: 'Подтвердите свою почту, перейдя по ссылке в письме.',
        },
        LOGIN: {
            SUCCESS: 'Вход выполнен успешно',
            TELEGRAM_VALIDATE_DATA_ERROR: 'Произошла ошибка при проверке данных от телеграм',
        },
        LOGOUT: {
            SUCCESS: 'Успешный выход из сессии',
        },
        LOGOUT_ALL: {
            SUCCESS: 'Успешный выход из активных сессий',
        },
        REFRESH: {
            SUCCESS: 'Успешное обновление токена',
        },
        NO_ACTIVE_SESSIONS: 'Нет активных сессий',
        INVALID_REFRESH_TOKEN: 'Токен обновления отсутствует или поврежден',
    },
    USER: {
        ALREADY_EXISTS: 'Пользователь уже существует',
        NOT_FOUND: 'Пользователь не найден',
    },
    COMMON: {
        SUCCESS: 'Операция успешно завершена',
        BAD_REQUEST: 'Некорректные данные',
        UNAUTHORIZED: 'Неавторизованный доступ',
        NOT_FOUND: 'Ресурс не найден',
        CONFLICT: 'Конфликт данных или ресурсов',
        INTERNAL_SERVER: 'Ошибка на стороне сервера ',
    },
} as const;
