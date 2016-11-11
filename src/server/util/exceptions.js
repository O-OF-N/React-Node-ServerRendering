class ErrorRoot extends Error {
    constructor(message) {
        super(message);
        this.name = constructor.name;
        this.message = message;
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