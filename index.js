
let express = require('express'),
cors = require('cors'),
app = express(),

// hard coded configuration object
conf = {

    // look for PORT environment variable,
    // else look for CLI argument,
    // else use hard coded value for port 8080
    port: process.env.PORT || process.argv[2] || 8080,

    // origin undefined
    // see https://github.com/expressjs/cors/issues/71
    originUndefined: function (req, res, next) {

        if (!req.headers.origin) {

            res.json({

                mess: 'Hi you are visiting the service locally. If this was a CORS the origin header shoud not be undefined'

            });

        } else {

            next();

        }

    },

    // Cross Origin Resource Sharing Options
    cors: {

        // origin handler
        origin: function (origin, cb) {

            // setup a white list
            let wl = ['https://dustinpfister.github.io'];

            if (wl.indexOf(origin) != -1) {

                cb(null, true);

            } else {

                cb(new Error('invalid origin: ' + origin), false);

            }

        },

        optionsSuccessStatus: 200

    }

};

// use origin undefined handler, then cors
app.use(conf.originUndefined, cors(conf.cors));

// get at root
app.get('/', function (req, res, next) {

    res.json({
        mess: 'hello it looks like you are on the whitelist!!',
        origin: req.headers.origin
    });

});

app.get('/app', function (req, res, next) {
    console.log(res);
    console.log(req);
    response.sendFile('/index.html');

});

app.listen(conf.port, function () {

    console.log('CORS-enabled JSON servcie is live on port: ' + conf.port);

});
