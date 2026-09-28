import { AppError } from '#app/errors/app-error.js';
import { Errors } from '#app/errors/catalog.js';

export function normalizeError(error) {
	if (error instanceof AppError) {
		return error;
	}

	return new AppError({
		cause: error,
		...Errors.INTERNAL_SERVER_ERROR,
	});
}

