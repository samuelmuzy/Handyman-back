import logger from '../middlewares/loggers';
import { CustomError } from './CustomError';


export class BaseService {
    protected handleError(error: unknown): never {
        this.logError(error); // Log o erro
        if (error instanceof CustomError) {
            throw error;
        } else if (error instanceof Error) {
            throw new CustomError(error.message, 500, 'An unexpected error occurred');
        } else {
            throw new CustomError('Unknown error', 500, 'An unexpected error occurred');
        }
    }

    private logError(error: unknown): void {
        if (error instanceof Error) {
            logger.error({
                message: error.message,
                stack: error.stack,
                name: error.name,
            });
        } else if (error instanceof CustomError) {
            logger.error({
                message: error.message,
                details: error.details,
            });
        } else {
            logger.error({
                message: 'Unknown error',
                details: error,
            });
        }
    }

    protected validateRequiredFields<T>(data: T, fields: (keyof T)[]): void {
        const missingFields = fields.filter((field) => !data[field]);
        if (missingFields.length > 0) {
            throw new CustomError(
                `Missing required fields: ${missingFields.join(', ')}`,
                400,
                'Please provide all required fields'
            );
        }
    }

    protected validateAtLeastOneField<T>(data: T, fields: (keyof T)[]): void {
        const fieldsExist = fields.some((field) => !!data[field]);
        if (!fieldsExist) {
            throw new CustomError(
                `At least one of the required fields must be provided: ${fields.join(', ')}`,
                400,
                'Please provide at least one of the required fields'
            );
        }
    }
    
    protected assertPermission(condition: boolean, message = 'Permission denied'): void {
        if (!condition) {
            throw new CustomError(message, 403, 'You do not have the required permissions');
        }
    }
    protected assertFound(data: unknown, message = 'Resource not found'): void {
        if (!data) {
            throw new CustomError(message, 404, 'Resource not found');
        }
    }
}