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
            NOT_FOUND: 'Пользователь не найден',
        },
    },
    COMMON: {
        SUCCESS: 'Операция успешно завершена',
        BAD_REQUEST: 'Некорректные данные',
        UNAUTHORIZED: 'Неавторизованный доступ',
        NOT_FOUND: 'Ресурс не найден',
        CONFLICT: 'Конфликт данных или ресурсов',
        INTERNAL_SERVER: 'Ошибка на стороне сервера ',
    }
} as const;