import { StatusCodes } from "http-status-codes";


class CustomError extends Error {
    constructor(message) {
        super(message);
    }
}

//BAD REQUEST ERROR
export class Error400 extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

//UNAUTHORIZED ERROR
export class Error401 extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

//NOT FOUND ERROR
export class Error404 extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}