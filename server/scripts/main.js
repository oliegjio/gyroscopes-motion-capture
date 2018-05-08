"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var B = require("babylonjs");
var hand_1 = require("./hand");
var canvas = document.querySelector('#canvas');
var engine = new B.Engine(canvas, true, null, true);
var scene = new B.Scene(engine);
var light = new B.PointLight('Light', new B.Vector3(0, 100, 100), scene);
var camera = new B.ArcRotateCamera('Camera', 0, 0.8, 100, B.Vector3.Zero(), scene);
camera.attachControl(canvas, true);
camera.position = new B.Vector3(50, 50, 50);
var worldX = B.Mesh.CreateLines('WorldXAxis', [B.Vector3.Zero(), new B.Vector3(1000, 0, 0)], scene);
var worldY = B.Mesh.CreateLines('WorldYAxis', [B.Vector3.Zero(), new B.Vector3(0, 1000, 0)], scene);
var worldZ = B.Mesh.CreateLines('WorldZAxis', [B.Vector3.Zero(), new B.Vector3(0, 0, 1000)], scene);
worldX.color = B.Color3.Red();
worldY.color = B.Color3.Green();
worldZ.color = B.Color3.Blue();
var rightHand = new hand_1.Hand(scene);
rightHand.rotate(B.Vector3.Forward(), Math.PI / 4);
rightHand.translate(B.Vector3.Left(), 10);
scene.registerAfterRender(function () {
    // rightHand.rotate(new B.Vector3(0, 0, 1), Math.PI / 100)
});
engine.runRenderLoop(function () {
    scene.render();
});
window.onresize = function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
