"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
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
// let rightHand = new Hand(scene)
// rightHand.rotate(B.Vector3.Left(), Math.PI)
// rightHand.rotate(B.Vector3.Forward(), Math.PI / 6)
// rightHand.translate(B.Vector3.Left(), 30)
//
// let leftHand = new Hand(scene)
// leftHand.rotate(B.Vector3.Left(), Math.PI)
// leftHand.rotate(B.Vector3.Forward(), Math.PI / 6)
// leftHand.rotate(B.Vector3.Up(), Math.PI)
// leftHand.translate(B.Vector3.Right(), 30)
var leftLowerLimb = new limb_1.Limb(4, 8, scene);
var leftUpperLimb = new limb_1.Limb(5, 8, scene);
var rightLowerLimb = new limb_1.Limb(4, 8, scene);
var rightUpperLimb = new limb_1.Limb(5, 8, scene);
scene.registerAfterRender(function () {
});
engine.runRenderLoop(function () {
    scene.render();
});
window.onresize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
