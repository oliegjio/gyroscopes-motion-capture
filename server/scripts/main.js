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
var leftLowerLimb = new limb_1.Limb(4, 8, scene);
var leftUpperLimb = new limb_1.Limb(5, 8, scene);
leftLowerLimb.translate(B.Vector3.Right(), 90);
leftUpperLimb.translate(B.Vector3.Right(), 40);
var rightLowerLimb = new limb_1.Limb(4, 8, scene);
var rightUpperLimb = new limb_1.Limb(5, 8, scene);
rightLowerLimb.translate(B.Vector3.Left(), 90);
rightUpperLimb.translate(B.Vector3.Left(), 40);
scene.registerAfterRender(function () { });
engine.runRenderLoop(function () { scene.render(); });
window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
var server = net_1.createServer(function (socket) {
    socket.write('You are connected');
    socket.on('data', function (data) {
        console.log(data);
        leftLowerLimb.rotate(B.Vector3.Forward(), parseFloat(data));
    });
    socket.on('end', function () { console.log('Closing connection'); });
    // socket.pipe(socket)
});
server.on('connection', function (socket) { console.log('New connection'); });
server.listen(1337, 'localhost');
