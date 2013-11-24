var http = require('http'),
    url = require('url');

/**
 * Method to launch a simple http server.
 * @param {Object} route The router.
 * @param {Object} handle The handler.
 */
function start(route, handle) {
    function onRequest(req, res) {
        var pathname = url.parse(req.url).pathname;
        console.log('Request for ' + pathname + ' received.');
        route(handle, pathname, res, req);
    }

    http.createServer(onRequest).listen(process.env.PORT);

    console.log('Server has started.');
}

/**
 * exports our module
 */
exports.start = start;
