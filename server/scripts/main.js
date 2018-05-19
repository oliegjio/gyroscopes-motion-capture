"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
var net_1 = require("net");
var limb_1 = require("./limb");
var math_1 = require("./math");
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
var g = 0.01;
var angle = B.Vector3.Zero();
// let gVector: B.Vector3 = B.Vector3.Up().negate().scale(g)
var gVector = new B.Vector3(0, 0, -0.01);
scene.registerAfterRender(function () { });
engine.runRenderLoop(function () { scene.render(); });
window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
var removeGForce = function (n) { if (Math.abs(n) >= 1.8)
    return n;
else
    return 0; };
var transform = function (limb, data) {
    // let moves = data.slice().splice(0, 3).map(x => x / 100000000).map(x => Math.abs(x) <= 1.5 ? 0 : x)
    // let rotates = data.slice().splice(3, 3).map(x => x / 100000000).map(x => Math.abs(x) <= 1 ? 0 : x)
    var moves = data.slice().splice(0, 3).map(function (x) { return x / 100; }).map(function (x) { return Math.abs(x) <= 0.001 ? 0 : x; });
    var rotates = data.slice().splice(3, 3).map(function (x) { return x / 1000; }).map(function (x) { return Math.abs(x) <= 0.0001 ? 0 : x; });
    // console.log(moves, rotates)
    // console.log(moves)
    angle.addInPlace(B.Vector3.FromArray(rotates));
    gVector = math_1.rotateVectorQ(gVector, angle.negate());
    // B.Vector3.FromArray(moves).add(gVector.negate()).toArray(moves)
    var movesV = B.Vector3.FromArray(moves).add(gVector);
    // console.log(movesV)
    console.log(gVector);
    limb.rotate(B.Axis.Z, rotates[2]);
    limb.rotate(B.Axis.X, rotates[0]);
    limb.rotate(B.Axis.Y, rotates[1]);
    // limb.translate(B.Axis.X, moves[0])
    // limb.translate(B.Axis.Y, moves[2])
    // limb.translate(B.Axis.Z, moves[1])
    limb.translate(B.Axis.X, movesV.x);
    limb.translate(B.Axis.Y, movesV.y);
    limb.translate(B.Axis.Z, movesV.z);
};
var transformWithData = function (data) {
    var parsed = data.split('|').map(function (x) { return parseFloat(x); });
    if (parsed.length != 7)
        return;
    var id = parsed.shift();
    transform(limbs[id], parsed);
};
var isCalibrateRequest = function (data) { if (data[0] == '>')
    return true;
else
    return false; };
var calibrate = function (data) { limbs[parseInt(data[1])].resetTransform(); };
var handleRequest = function (data) {
    // console.log(data)
    if (isCalibrateRequest(data))
        calibrate(data);
    else
        data.split('\n').filter(function (x) { return x != ""; }).map(function (x) { return transformWithData(x); });
};
var server = net_1.createServer(function (socket) {
    socket.write('You are connected');
    socket.on('data', function (data) { handleRequest(data.toString()); });
    socket.on('end', function () { console.log('Closing connection'); });
});
server.on('connection', function (socket) { console.log('Client connected'); });
server.listen(1337, '192.168.43.66');
