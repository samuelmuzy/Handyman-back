export class CustomError extends Error {
    public statusCode: number;
    public details?: string | null | object | number;

    constructor(message: string, statusCode: number = 500, details?: string | null | object | number) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;

        Object.setPrototypeOf(this, CustomError.prototype);
    }
}