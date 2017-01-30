'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var pattern = require("matches").pattern;

var ErrorHandler = exports.ErrorHandler = pattern({
    '"InternalServerError",res,message': function InternalServerErrorResMessage(res, err) {
        return res.status(500).send({
            title: 'InternalServerError',
            error: {
                status: err.status
            },
            message: err.message
        });
    },
    '"AuthenticationError",res,message': function AuthenticationErrorResMessage(res, message) {
        return res.status(401).render('error', {
            title: 'Authorization Failed',
            message: 'Authorization Failed',
            error: {
                status: 401
            }
        });
    }
});
//# sourceMappingURL=error-handler.js.map