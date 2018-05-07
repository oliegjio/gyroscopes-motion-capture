"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var socket = new net_1.Socket();
socket.connect(1337, 'localhost', function () {
    console.log('Connected');
    socket.write('Hello, server!');
});
socket.on('data', function (data) {
    console.log('Revieved: ' + data);
});
socket.on('close', function () {
    console.log('Closing');
});
