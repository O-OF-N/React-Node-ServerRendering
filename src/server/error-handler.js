var pattern = require("matches").pattern;

export const ErrorHandler = pattern({
    '"InternalServerError",res,message': (res, message) => res.status(500).send({
        message
    }),
    '"AuthenticationError",res,message': (res, message) => res.status(401).render('error', {
        title: 'Test',
        message: 'Some sort of an error',
        error: {
            status:401,
            stack: 'Some stack man'
        }
    })
});