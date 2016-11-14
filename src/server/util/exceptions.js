class ErrorRoot extends Error {
    constructor(message,name,params = null) {
    super(message);
    this.name = name;
    this.message = message; 
    this.params = params;
    Error.captureStackTrace(this, this.constructor.name);
    }
};

export class InvalidStateError extends ErrorRoot {
    constructor(message) {
        super(message,'InvalidStateError');
    }
};


export class AuthenticationError extends ErrorRoot {
    constructor(message,params) {
        super(message,'AuthenticationError');
    }
};