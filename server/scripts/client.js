"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var socket = new net_1.Socket();
socket.connect(1337, 'localhost', function () {
    console.log('Connected');
    setInterval(function () {
        socket.write((Math.PI / 6).toString());
    }, 1000);
});
socket.on('data', function (data) { console.log('Message from server: ' + data); });
socket.on('close', function () { console.log('Closing connection'); });
