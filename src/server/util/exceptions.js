class ErrorRoot extends Error {
    constructor(message,name) {
    super(message);
    this.name = this.constructor.name;
    this.message = message; 
    Error.captureStackTrace(this, this.constructor.name);
    }
};

export class InvalidStateError extends ErrorRoot {
    constructor(message) {
        super(message);
    }
};


export class AuthenticationError extends ErrorRoot {
    constructor(message) {
        super(message);
    }
};