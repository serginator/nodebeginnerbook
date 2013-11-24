var server = require('./modules/server'),
    router = require('./modules/router'),
    requestHandlers = require('./modules/requestHandlers');

var handle = {
    '/': requestHandlers.start,
    '/start': requestHandlers.start,
    '/upload': requestHandlers.upload,
    '/show': requestHandlers.show
};

server.start(router.route, handle);
