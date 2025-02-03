import { HttpStatus } from '@nestjs/common';
import { createResponseBody } from '@/helpers/create-response-body';
import { createResponseExample } from '@/helpers/create-response-example';
import { MESSAGES } from '@/constants/messages';
import { API_MAP } from '@/constants/api-map';

const { AUTH, USER, COMMON } = MESSAGES;

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
            EMAIL_CONFIRMATION: createResponseExample(HttpStatus.ACCEPTED, AUTH.REGISTER.EMAIL_CONFIRMATION, createResponseBody({
                message: AUTH.REGISTER.EMAIL_CONFIRMATION,
            })),
            CONFLICT: createResponseExample(HttpStatus.CONFLICT, AUTH.REGISTER.CONFLICT, createResponseBody({
                isSuccess: false,
                message: AUTH.REGISTER.CONFLICT,
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
            NOT_FOUND: createResponseExample(HttpStatus.NOT_FOUND,  USER.NOT_FOUND, createResponseBody({
                isSuccess: false,
                message:  USER.NOT_FOUND,
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
            NOT_FOUND: createResponseExample(HttpStatus.NOT_FOUND, USER.NOT_FOUND, createResponseBody({
                isSuccess: false,
                message: USER.NOT_FOUND,
            })),
        }
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