"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var server = net_1.createServer(function (socket) {
    socket.write('Echo server\n');
    socket.pipe(socket);
});
server.listen(1337, 'localhost');
function hello(compiler) {
    console.log("Hello from " + compiler);
}
hello('Typescript');
