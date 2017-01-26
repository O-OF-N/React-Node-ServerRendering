var pattern = require("matches").pattern;


// development error handler
// will print stacktrace
export const DevErrorHandle = (err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
};

// production error handler
// no stacktraces leaked to user
export const ProdErrorHandle = (err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
        message: 'Some sort of an error',
        error: {}
    });
};


export const ErrorHandler = pattern({
    '"InternalServerError",res,message': (res, message) => res.status(500).send({
        message
    }),
    '"AuthenticationError",res,message': (res, message) => res.status(401).send({
        message
    })
});