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
scene.registerAfterRender(function () { });
engine.runRenderLoop(function () { scene.render(); });
window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
var rotateVector = function (vector, on) {
};
var degreesToRadians = function (n) { return n * Math.PI / 180; };
var removeGForce = function (n) { if (Math.abs(n) >= 1.8)
    return n;
else
    return 0; };
var transform = function (limb, data) {
    var moves = data.splice(0, 3).map(function (x) { return x * 9.8; });
    var rotates = data.splice(3, 3).map(function (x) { return degreesToRadians(x / 8); });
    moves[2] = removeGForce(moves[2]);
    limb.translate(B.Vector3.Left(), moves[0]);
    limb.translate(B.Vector3.Up(), moves[1]);
    limb.translate(B.Vector3.Forward(), moves[2]);
    limb.rotate(B.Vector3.Left(), rotates[0]);
    limb.rotate(B.Vector3.Up(), rotates[1]);
    limb.rotate(B.Vector3.Forward(), rotates[2]);
};
var transformWithData = function (data) {
    var parsed = data.split('|').map(function (x) { return parseFloat(x); });
    var id = parsed.shift();
    transform(limbs[id], parsed);
};
var isCalibrateRequest = function (data) { if (data[0] == '>')
    return true;
else
    return false; };
var calibrate = function (data) { limbs[parseInt(data[1])].resetTransform(); };
var handleRequest = function (data) {
    console.log(data);
    if (isCalibrateRequest(data))
        calibrate(data);
    else
        transformWithData(data);
};
var server = net_1.createServer(function (socket) {
    socket.write('You are connected');
    socket.on('data', function (data) { handleRequest(data.toString()); });
    socket.on('end', function () { console.log('Closing connection'); });
});
server.on('connection', function (socket) { console.log('Client connected'); });
server.listen(1337, '192.168.1.154');
