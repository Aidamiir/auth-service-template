import { HttpStatus } from '@nestjs/common';
import { createResponseBody } from '@/helpers/create-response-body';
import { createResponseExample } from '@/helpers/create-response-example';
import { MESSAGES } from '@/constants/messages';
import { API_MAP } from '@/constants/api-map';

const { AUTH, COMMON } = MESSAGES;

/**
 * Конфигурация Swagger-документации для API.
 */
export const SWAGGER = {
    URL: `${API_MAP.PREFIX}/${API_MAP.DOCS}`,

    AUTH: {
        TAG: 'Авторизация',
        REGISTER: {
            OPERATION: { summary: 'Регистрация аккаунта' },
            DTO: {
                EMAIL: { description: 'Почта', example: 'example@example.com' },
                PASSWORD: { description: 'Пароль', example: '12345678' }
            },
            SUCCESS: createResponseExample(HttpStatus.CREATED, AUTH.REGISTER.SUCCESS, createResponseBody({
                data: { id: 1, email: 'example@example.com' },
                message: AUTH.REGISTER.SUCCESS,
            })),
        },
        LOGIN: {
            OPERATION: { summary: 'Вход в аккаунт' },
            DTO: {
                EMAIL: { description: 'Почта', example: 'example@example.com' },
                PASSWORD: { description: 'Пароль', example: '12345678' }
            },
            SUCCESS: createResponseExample(HttpStatus.OK, AUTH.LOGIN.SUCCESS, createResponseBody({
                data: { token: 'example-token' },
                message: AUTH.LOGIN.SUCCESS,
            })),
        },
        TELEGRAM_LOGIN: {
            OPERATION: { summary: 'Вход через телеграм' },
            DTO: {
                INIT_DATA: { description: 'initData от telegram', example: 'initDataString' },
                APP_ID: { description: 'id запущенного приложения', example: 'initDataString' },
            },
            SUCCESS: createResponseExample(HttpStatus.OK, AUTH.LOGIN.SUCCESS, createResponseBody({
                data: { token: 'example-token' },
                message: AUTH.LOGIN.SUCCESS,
            })),
        },
        LOGOUT: {
            OPERATION: { summary: 'Выход из текущей сессии' },
            SUCCESS: createResponseExample(HttpStatus.OK, AUTH.LOGOUT.SUCCESS, createResponseBody({
                message: AUTH.LOGOUT.SUCCESS,
            })),
        },
        LOGOUT_ALL: {
            OPERATION: { summary: 'Выход из всех активных сессий' },
            SUCCESS: createResponseExample(HttpStatus.OK, AUTH.LOGOUT_ALL.SUCCESS, createResponseBody({
                message: AUTH.LOGOUT_ALL.SUCCESS,
            })),
        },
        REFRESH: {
            OPERATION: { summary: 'Обновление access-токена с помощью refresh-токена' },
            SUCCESS: createResponseExample(HttpStatus.OK, AUTH.REFRESH.SUCCESS, createResponseBody({
                data: { accessToken: 'new-access-token' },
                message: AUTH.REFRESH.SUCCESS,
            })),
        },
    },
    COMMON: {
        BAD_REQUEST: createResponseExample(HttpStatus.BAD_REQUEST, COMMON.BAD_REQUEST, createResponseBody({
            isSuccess: false,
            message: COMMON.BAD_REQUEST,
        })),
        UNAUTHORIZED: createResponseExample(HttpStatus.UNAUTHORIZED, COMMON.UNAUTHORIZED, createResponseBody({
            isSuccess: false,
            message: COMMON.UNAUTHORIZED,
        })),
        NOT_FOUND: createResponseExample(HttpStatus.NOT_FOUND, COMMON.NOT_FOUND, createResponseBody({
            isSuccess: false,
            message: COMMON.NOT_FOUND,
        })),
        CONFLICT: createResponseExample(HttpStatus.CONFLICT, COMMON.CONFLICT, createResponseBody({
            isSuccess: false,
            message: COMMON.CONFLICT,
        })),
        INTERNAL_SERVER: createResponseExample(HttpStatus.INTERNAL_SERVER_ERROR, COMMON.INTERNAL_SERVER, createResponseBody({
            isSuccess: false,
            message: COMMON.INTERNAL_SERVER,
        })),
    },
} as const;