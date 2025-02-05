import { type ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { type FastifyReply } from 'fastify';
import { MESSAGES } from '@/constants/messages';
import { createResponseBody } from '@/helpers/create-response-body';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    /**
     * Обрабатывает все необработанные исключения в приложении.
     * @param {unknown} exception - Исключение, возникшее в процессе выполнения
     * @param {ArgumentsHost} host - Контекст запроса
     */
    public catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const reply = ctx.getResponse<FastifyReply>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string = MESSAGES.COMMON.INTERNAL_SERVER;

        if (exception instanceof HttpException) {
            statusCode = exception.getStatus();

            const errorResponse = exception.getResponse();
            if (typeof errorResponse === 'string') {
                message = errorResponse;
            }
            else if (errorResponse && typeof errorResponse === 'object') {
                const { message: msg } = errorResponse as Record<string, any>;

                if (Array.isArray(msg)) {
                    message = msg.join(', ');
                }
                else {
                    message = msg || message;
                }
            }
        }

        const responseBody = createResponseBody({
            data: null,
            isSuccess: false,
            message,
        });

        reply
            .status(statusCode)
            .send(responseBody);
    }
}