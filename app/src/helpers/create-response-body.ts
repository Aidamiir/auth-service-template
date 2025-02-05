import { MESSAGES } from '@/constants/messages';

/**
 * Создаёт стандартизированный объект ответа для ответа клиенту.
 *
 * @param data - Данные, которые будут включены в ответ.
 * @param isSuccess - Флаг, указывающий на успешность операции.
 * @param message - Сообщение, описывающее результат операции.
 * @returns Объект, содержащий поля `data`, `isSuccess` и `message`.
 */

interface ActionResult {
    data?: unknown;
    isSuccess?: boolean;
    message?: string;
}

export function createResponseBody({ data = null, isSuccess = true, message = MESSAGES.COMMON.SUCCESS }: ActionResult = {}) {
    return {
        data,
        isSuccess,
        message,
    };
}
