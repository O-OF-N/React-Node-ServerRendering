class ErrorRoot extends Error {
    constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message; 
    Error.captureStackTrace(this, this.constructor.name);
    }
};

export class InvalidStateError extends Error {
    constructor(message) {
        super(message);
    this.name = this.constructor.name;
    this.message = message; 
    Error.captureStackTrace(this, this.constructor.name);
    }
};


export class AuthenticationError extends Error {
    constructor(message) {
        super(message);
    this.name = this.constructor.name;
    this.message = message; 
    Error.captureStackTrace(this, this.constructor.name);
    }
};