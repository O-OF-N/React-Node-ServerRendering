var pattern = require("matches").pattern;


// development error handler
// will print stacktrace
export const DevErrorHandle = (err, req, res) => {
    console.log('I reached here some how. But dont now how', err)
    res.status(err.status || 500);
    res.render('error', {
        message: 'What are you trying here???'
    });
};

// production error handler
// no stacktraces leaked to user
export const ProdErrorHandle = (err, req, res) => {
    console.log('I reached here some how. But dont now how', err)
    res.status(err.status || 500);
    res.render('error', {
        message: 'What are you trying here???'
    });
};


export const ErrorHandler = pattern({
    '"InvalidStateError",req,res,params': (req, res, params) =>
        res.render('error', {
            message: 'Are you cheating??',
            error: { stack: 'Dont even try', status: 'caught a fraud' }
        })
        /*res.status(500).send({
            message: 'Invalid authentication parameters sent'
        })*/,
    '"AuthenticationError",req,res,params': (req, res, params) => {
        console.log(`${req.hostname}/?iss=${params.iss}&launch=${params.launch}`);
        res.render('error', {
            message: 'Are you cheating??',
            error: { stack: 'Dont even try', status: 'caught a fraud' }
        })
    }
});