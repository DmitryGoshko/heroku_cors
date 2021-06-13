let express = require('express'),
const path = require('path');
cors = require('cors'),
os = require('os'),
app = express(),
 
// hard coded configuration object
conf = {
    // look for PORT environment variable,
    // else look for CLI argument,
    // else use hard coded value for port 8080
    port: process.env.PORT || process.argv[2] || 8080,
 
    // origin undefined handler
    // see https://github.com/expressjs/cors/issues/71
    originUndefined: function (req, res, next) {
 
        if (!req.headers.origin) {
 
            res.json({
 
                mess: 'Hi you are visiting the service locally. If this was a CORS the origin header should not be undefined'
 
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
            let wl = ['https://dustinpfister.github.io', 'https://r2f-dev-ed.lightning.force.com/c/Mortgage_calculator.app?aura.format=JSON&aura.formatAdapter=LIGHTNING_OUT'];
 
            if (wl.indexOf(origin) != -1) {
 
                cb(null, true);
 
            } else {
 
                cb(new Error('invalid origin: ' + origin), false);
 
            }
 
        },
 
        optionsSuccessStatus: 200
 
    }
 
};
 
// use origin undefined handler, then cors for all paths
app.use(conf.originUndefined, cors(conf.cors));
 
// get at root
app.get('/', function (req, res, next) {
 
    res.json({
        mess: 'hello it looks like you are on the whitelist',
        origin: req.headers.origin,
        os_hostname: os.hostname(),
        os_cpus: os.cpus()
    });
 
});

// get at root
app.get('/app', function (req, res, next) {
 
    res.sendFile(path.join(__dirname, '/index.html'));
 
});
 
app.listen(conf.port, function () {
 
    console.log('CORS-enabled JSON service is live on port: ' + conf.port);
 
});