"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = require("net");
var socket = new net_1.Socket();
// AA|BBB|CCC|DDD|EEE|FFF|GGG
// AA - Bracer ID.
// BBB - X translation.
// CCC - Y translation.
// DDD - Z translation.
// EEE - X rotation.
// FFF - Y rotation.
// GGG - Z rotation.
var rnd = function (min, max) { return (Math.floor(Math.random() * (max - min + 1)) + min).toString(); };
socket.connect(1337, 'localhost', function () {
    console.log('Connected');
    setInterval(function () {
        var data = '01' + '|' + rnd(1, 2) + '|' + rnd(1, 2) + '|' + rnd(1, 2) + '|' +
            rnd(Math.PI / 10, Math.PI / 20) + '|' + rnd(Math.PI / 10, Math.PI / 20) + '|' +
            rnd(Math.PI / 10, Math.PI / 20);
        socket.write(data);
        console.log(data);
    }, 1000);
});
socket.on('data', function (data) { console.log('Message from server: ' + data); });
socket.on('close', function () { console.log('Closing connection'); });
