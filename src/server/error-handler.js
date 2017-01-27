var pattern = require("matches").pattern;

export const ErrorHandler = pattern({
    '"InternalServerError",res,message': (res, err) => res.status(500).send({
        title: 'InternalServerError',
        error: {
            status:err.status
        },
        message: err.message
    }),
    '"AuthenticationError",res,message': (res, message) => res.status(401).render('error', {
        title: 'Authorization Failed',
        message: 'Authorization Failed',
        error: {
            status:401
        }
    })
});