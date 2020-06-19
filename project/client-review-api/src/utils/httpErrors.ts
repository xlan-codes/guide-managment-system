export abstract class HTTPClientError extends Error {
    public readonly statusCode!: number;
    public readonly name!: string;

    constructor(message: object | string) {
        if (message instanceof Object) {
            super(JSON.stringify(message));
        } else {
            super(message);
        }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class ErrorToHTTPClientError extends HTTPClientError {
    public statusCode = 400;
    public name = "";
    public stack = "";
    constructor(statusCode: number,  message: string | object , stack?:string, name?:string) {
        super(message);
        this.statusCode = statusCode;
        this.name = name; 
        this.stack = stack;      
    }
}

class HTTP400Error extends HTTPClientError {
    public readonly statusCode = 400;

    constructor(message: string | object = "Bad Request") {
        super(message);
    }
}

class HTTP401Error extends HTTPClientError {
    public readonly statusCode = 401;

    constructor(message: string | object = "Unauthorized") {
        super(message);
    }
}

class HTTP403Error extends HTTPClientError {
    public readonly statusCode = 403;

    constructor(message: string | object = "Forbidden") {
        super(message);
    }
}

class HTTP404Error extends HTTPClientError {
    public readonly statusCode = 404;

    constructor(message: string | object = "Not found") {
        super(message);
    }
}

export function createHttpError(code: number, message: string | object): Error {

    const errors = new Map<number, Error>();  
    errors.set(400, new HTTP400Error(message));
    errors.set(401, new HTTP401Error(message));
    errors.set(403, new HTTP403Error(message));
    errors.set(404, new HTTP404Error(message)); 
    errors.set(409, new ErrorToHTTPClientError(409,message)); 
    return errors.get(code);
}