var pattern = require("matches").pattern;

export const ErrorHandler = pattern({
    '"InternalServerError",res,message': (res, message) => res.status(500).send({
        message
    }),
    '"AuthenticationError",res,message': (res, message) => res.status(401).render('error', {
        title: 'Authorization Failed',
        message: 'Authorization Failed',
        error: {
            status:401
        }
    })
});