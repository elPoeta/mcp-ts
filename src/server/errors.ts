
export class InvalidArgumentError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InvalidArgumentError';
	}
}

export class NotFoundError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'NotFoundError';
	}
}

export function isClientError(
	error: unknown,
): error is InvalidArgumentError | NotFoundError {
	return (
		error instanceof InvalidArgumentError || error instanceof NotFoundError
	);
}

export function errorResponse(error: unknown) {
	return {
		isError: true,
		content: [
			{
				type: 'text' as const,
				text:
					error instanceof Error
						? `${error.name}: ${error.message}`
						: 'Unknown error',
			},
		],
	};
}

export function handleToolError(
	error: unknown,
	properties: Record<string, string>,
) {
	if (isClientError(error)) {
		return errorResponse(error);

	} else {
		console.error('Tool call error:', {
			error:
				error instanceof Error
					? `${error.name}: ${error.message}`
					: 'Unknown error',
			properties,
		});
		return errorResponse(error);
	}
}
