export const createResponseExample = (status: number, description: string, example: object) => ({
    status,
    description,
    content: {
        'application/json': {
            example,
        },
    },
});
