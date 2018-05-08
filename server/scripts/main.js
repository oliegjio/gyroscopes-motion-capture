"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
var limb_1 = require("./limb");
var canvas = document.querySelector('#canvas');
var engine = new B.Engine(canvas, true, null, true);
var scene = new B.Scene(engine);
var light = new B.PointLight('Light', new B.Vector3(0, 100, 100), scene);
var camera = new B.ArcRotateCamera('Camera', 0, 0.8, 100, B.Vector3.Zero(), scene);
camera.attachControl(canvas, true);
camera.position = new B.Vector3(50, 50, 50);
exports.middlePoint = function (point1, point2) {
    var x = (point1.x + point2.x) / 2;
    var y = (point1.y + point2.y) / 2;
    var z = (point1.z + point2.z) / 2;
    return new B.Vector3(x, y, z);
};
var worldX = B.Mesh.CreateLines('WorldXAxis', [B.Vector3.Zero(), new B.Vector3(1000, 0, 0)], scene);
var worldY = B.Mesh.CreateLines('WorldYAxis', [B.Vector3.Zero(), new B.Vector3(0, 1000, 0)], scene);
var worldZ = B.Mesh.CreateLines('WorldZAxis', [B.Vector3.Zero(), new B.Vector3(0, 0, 1000)], scene);
worldX.color = B.Color3.Red();
worldY.color = B.Color3.Green();
worldZ.color = B.Color3.Blue();
var updateJoinSphere = function (sphere, limb1, limb2) {
    var middle = exports.middlePoint(limb1.getFrontPoint(), limb2.getFrontPoint());
    sphere.position = middle;
};
var lowerLimb = new limb_1.Limb(4.5, 5, scene);
lowerLimb.translate(B.Vector3.Up(), 25);
lowerLimb.translate(B.Vector3.Left(), 6);
lowerLimb.rotate(B.Vector3.Forward(), Math.PI / 2);
var upperLimb = new limb_1.Limb(6, 6, scene);
var sphere = B.Mesh.CreateSphere('Sphere1', 30, 9, scene);
scene.registerAfterRender(function () {
    // lowerLimb.rotate(new B.Vector3(0, 0, 1), Math.PI / 100)
    updateJoinSphere(sphere, lowerLimb, upperLimb);
});
engine.runRenderLoop(function () {
    scene.render();
});
window.onresize = function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
