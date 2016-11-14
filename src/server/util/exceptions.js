class ErrorRoot extends Error {
    constructor(message,name) {
        super(message);
        this.name = name;
        this.message = message;
    }
};

export class InvalidStateError extends ErrorRoot {
    constructor(message) {
        super(message, this.constructor.name);
    }
};


export class AuthenticationError extends ErrorRoot {
    constructor(message) {
        super(message, this.constructor.name);
    }
};