
let express = require('express'),
cors = require('cors'),
app = express(),

// just a string here
str = '',

// hard coded configuration object
conf = {

    // look for PORT environment variable,
    // else look for CLI argument,
    // else use hard coded value for port 8080
    port: process.env.PORT || process.argv[2] || 8080,

    cors: {

        // origin handler
        origin: function (origin, cb) {

            // always allow for now

            str = origin;
            cb(null, true);

        },
        optionsSuccessStatus: 200

    }

};

// use cors for all domains
//app.use(cors(conf.cors));

// get at root
app.get('/', cors(conf.cors), function (req, res, next) {

    console.log(req.hostname);

    res.json({
        mess: 'hello I am a simple json service.',
        fromHostname: req.hostname,
        origin: str || 'unknown'
    });

});

app.listen(conf.port, function () {

    console.log('CORS-enabled JSON servcie is live on port: ' + conf.port);

})
