
let express = require('express'),
cors = require('cors'),
app = express(),

// hard coded configuration object
conf = {

    // look for PORT environment variable,
    // else look for CLI argument,
    // else use hard coded value for port 8080
    port: process.env.PORT || process.argv[2] || 8080,

    // origin fixer
    // see https://github.com/expressjs/cors/issues/71
    originFix: function (req, res, next) {

        req.headers.origin = req.headers.origin || req.headers.host;

        next();

    },

    // Cross Origin Resource Sharing Options
    cors: {

        // origin handler
        origin: function (origin, cb) {

            let wl = ['dp83-cors.herokuapp.com', 'dustinpfister.github.io'];

            if (wl.indexOf(origin) != -1) {

                cb(null, true);

            } else {

                cb(new Error('invalid origin: ' + origin), false);

            }

        },

        optionsSuccessStatus: 200

    }

};

// use origin fixer, then cors
app.use(conf.originFix, cors(conf.cors));

// get at root
app.get('/', function (req, res, next) {

    res.json({
        mess: 'hello '+ req.headers.host + ' it looks like you are on the whitelist'
    });

});

app.listen(conf.port, function () {

    console.log('CORS-enabled JSON servcie is live on port: ' + conf.port);

})
