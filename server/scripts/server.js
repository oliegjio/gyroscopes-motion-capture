"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var server = net_1.createServer(function (socket) {
    // Send to the client:
    // socket.write('You are connected')
    // Get data from the client:
    socket.on('data', function (data) {
        console.log(data);
    });
    // Closing connection with the client:
    socket.on('end', function () {
        console.log('Closing connection');
    });
    socket.pipe(socket);
});
server.on('connection', function (socket) {
    console.log('New connection');
});
server.listen(1337, 'localhost');
