"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var socket = new net_1.Socket();
var rnd = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };
var makeRequestString = function (arr) { return arr.map(function (x) { return x.toString(); }).join('|'); };
socket.connect(1337, 'localhost', function () {
    console.log('Connected');
    setInterval(function () {
        var data = makeRequestString([
            2, rnd(1, 2), rnd(1, 2), rnd(1, 2),
            rnd(Math.PI / 10, Math.PI / 20),
            rnd(Math.PI / 10, Math.PI / 20),
            rnd(Math.PI / 10, Math.PI / 20)
        ]);
        socket.write(data);
        console.log(data);
    }, 1000);
});
socket.on('data', function (data) { console.log('Received: ' + data); });
socket.on('close', function () { console.log('Closing connection'); });
