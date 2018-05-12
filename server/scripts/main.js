"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
var net_1 = require("net");
var limb_1 = require("./limb");
var canvas = document.querySelector('#canvas');
var engine = new B.Engine(canvas, true, null, true);
var scene = new B.Scene(engine);
var light = new B.PointLight('Light', new B.Vector3(0, 100, 100), scene);
var camera = new B.ArcRotateCamera('Camera', 0, 0.8, 100, B.Vector3.Zero(), scene);
var cameraD = 200;
camera.setPosition(new B.Vector3(cameraD, cameraD, cameraD));
camera.attachControl(canvas, true);
var worldX = B.Mesh.CreateLines('WorldXAxis', [B.Vector3.Zero(), new B.Vector3(1000, 0, 0)], scene);
var worldY = B.Mesh.CreateLines('WorldYAxis', [B.Vector3.Zero(), new B.Vector3(0, 1000, 0)], scene);
var worldZ = B.Mesh.CreateLines('WorldZAxis', [B.Vector3.Zero(), new B.Vector3(0, 0, 1000)], scene);
worldX.color = B.Color3.Red();
worldY.color = B.Color3.Green();
worldZ.color = B.Color3.Blue();
var limbs = [];
var leftLowerLimb = new limb_1.Limb(4, 8, scene);
leftLowerLimb.translate(B.Vector3.Right(), 90);
leftLowerLimb.saveTransform();
limbs.push(leftLowerLimb);
var leftUpperLimb = new limb_1.Limb(5, 8, scene);
leftUpperLimb.translate(B.Vector3.Right(), 40);
leftUpperLimb.saveTransform();
limbs.push(leftUpperLimb);
var rightLowerLimb = new limb_1.Limb(4, 8, scene);
rightLowerLimb.translate(B.Vector3.Left(), 90);
rightLowerLimb.saveTransform();
limbs.push(rightLowerLimb);
var rightUpperLimb = new limb_1.Limb(5, 8, scene);
rightUpperLimb.translate(B.Vector3.Left(), 40);
rightUpperLimb.saveTransform();
limbs.push(rightUpperLimb);
// leftLowerLimb.rotate(B.Axis.Z, Math.PI / 2, B.Space.WORLD)
scene.registerAfterRender(function () { });
engine.runRenderLoop(function () { scene.render(); });
window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
var degreesToRadians = function (n) { return n * Math.PI / 180; };
var transform = function (limb, data) {
    limb.translate(B.Vector3.Left(), data[0] * 9.8, B.Space.LOCAL);
    limb.translate(B.Vector3.Up(), data[1] * 9.8, B.Space.LOCAL);
    if (Math.abs(data[2]) >= 1.8)
        limb.translate(B.Vector3.Forward(), data[2] * 9.8, B.Space.LOCAL);
    limb.rotate(B.Vector3.Left(), degreesToRadians(data[3] / 8));
    limb.rotate(B.Vector3.Up(), degreesToRadians(data[4] / 8));
    limb.rotate(B.Vector3.Forward(), degreesToRadians(data[5] / 8));
};
var transformWithData = function (data) {
    var parsed = data.toString().split('|').map(function (x) { return parseFloat(x); });
    var id = parsed.shift();
    transform(limbs[id], parsed);
};
var handleRequest = function (data) {
    var dataString = data.toString();
    console.log(dataString);
    if (dataString[0] == '>')
        limbs[parseInt(dataString[1])].resetTransform();
    else
        transformWithData(data);
};
var server = net_1.createServer(function (socket) {
    socket.write('You are connected');
    socket.on('data', function (data) { handleRequest(data); });
    socket.on('end', function () { console.log('Closing connection'); });
});
server.on('connection', function (socket) { console.log('Client connected'); });
server.listen(1337, '192.168.1.154');
