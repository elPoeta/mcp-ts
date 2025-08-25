export class InvalidArgumentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidArgumentError';
    }
}
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}
export function isClientError(error) {
    return (error instanceof InvalidArgumentError || error instanceof NotFoundError);
}
export function errorResponse(error) {
    return {
        isError: true,
        content: [
            {
                type: 'text',
                text: error instanceof Error
                    ? `${error.name}: ${error.message}`
                    : 'Unknown error',
            },
        ],
    };
}
export function handleToolError(error, properties) {
    if (isClientError(error)) {
        return errorResponse(error);
    }
    else {
        console.error('Tool call error:', {
            error: error instanceof Error
                ? `${error.name}: ${error.message}`
                : 'Unknown error',
            properties,
        });
        return errorResponse(error);
    }
}
