# heroku_cors

Testing out [express](https://www.npmjs.com/package/express), and [cors](https://www.npmjs.com/package/cors) in node.js.

## clone, install, create, and deploy to heroku

To get started with this clone it down, install the dependencies, login to the heroku CLI, create and push.

```
$ git clone https://github.com/dustinpfister/heroku_cors
$ cd heroku_cors
$ npm install
$ heroku login
$ heroku create dp83-cors
$ git push heroku master
```

The install process might be optional if you just want to deploy.

## The Client System

For a client system I just put together a simple xhr get method, and then call it at the url that i deployed the app to on heroku. I would just copy and paste this into the javaScript console to make the GET request to the deployment. When I tested it out it was working at the white listed origins (http://dustinpfister.github.io,https://dp83-cors.herokuapp.com/,and https://www.google.com), and not working elsewhere as expected.

```js
var get = function (theUrl, done, fail) {

    var xhr = new XMLHttpRequest();

    done = done || function (xhr, evt) {

        console.log(xhr.response);
        console.log(evt);

    };

    fail = fail || function (xhr, evt) {

        console.log(xhr);
        console.log(evt);

    }

    xhr.onreadystatechange = function (evt) {
        if (xhr.readyState == 4) {

            if (xhr.status == 200) {

                done(xhr, evt);

            } else {

                fail(xhr, evt);

            }

        }
    }
    xhr.open("GET", theUrl, true); // true for asynchronous
    xhr.send(null);
};

get('https://dp83-cors.herokuapp.com/');
```