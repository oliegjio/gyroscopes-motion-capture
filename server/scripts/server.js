"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var server = net_1.createServer(function (socket) {
    socket.write('Server started.\n');
    socket.pipe(socket);
});
server.on('connection', function (socket) {
    console.log('New connection.');
});
server.listen(1337, 'localhost');
