"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("three");
var meshes_1 = require("./meshes");
var limb_1 = require("./limb");
var geometry_1 = require("./geometry");
////////////////////////////////////
// SCENE:
////////////////////////////////////
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var VIEW_ANGLE = 60;
var ASPECT = WIDTH / HEIGHT;
var NEAR = 0.1;
var FAR = 10000;
var container = document.querySelector('#canvas');
var renderer = new T.WebGLRenderer();
var camera = new T.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
var scene = new T.Scene();
var light = new T.PointLight(0xff0000, 0.5);
light.position.setX(10);
light.position.setY(50);
light.position.setZ(130);
meshes_1.move(camera, 500, 500, 500);
camera.lookAt(geometry_1.point(0, 0, 0));
scene.background = new T.Color(255, 0, 0);
scene.add(camera);
scene.add(light);
container.appendChild(renderer.domElement);
/////////////////////////////////
// GENERAL:
/////////////////////////////////
var updateJoinSphere = function (sphere, limb1, limb2) {
    var first = limb1.getElbowVertex();
    var second = limb2.getWristVertex();
    var middle = geometry_1.middlePoint(first, second);
    meshes_1.move(sphere, middle.x, middle.y, middle.z);
};
var joinSphere = meshes_1.sphereMesh(70);
scene.add(joinSphere);
var lowerLimb = new limb_1.Limb(30, 200);
lowerLimb.move(100, 0, -100);
lowerLimb.rotate(geometry_1.N.y, Math.PI / 2);
lowerLimb.toScene(scene);
var upperLimb = new limb_1.Limb(40, 250);
upperLimb.toScene(scene);
// let s1 = sphereMesh(70)
// let p1 = lowerLimb.getWristVertex()
// move(s1, p1.x, p1.y, p1.z)
// scene.add(s1)
////////////////////////////////
// EVENTS:
////////////////////////////////
window.onresize = function (event) {
    container.style.width = window.innerWidth.toString();
    container.style.height = window.innerHeight.toString();
    renderer.setSize(window.innerWidth, window.innerHeight);
};
window.onresize(null);
var update = function () {
    lowerLimb.rotate(geometry_1.N.z, Math.PI / 100);
    // lowerLimb.rotate(N.x, Math.PI / 100)
    // lowerLimb.rotate(N.y, Math.PI / 100)
    console.log(lowerLimb.getElbowVertex());
    updateJoinSphere(joinSphere, lowerLimb, upperLimb);
    requestAnimationFrame(update);
    renderer.render(scene, camera);
};
requestAnimationFrame(update);
// // let lastUpdate = Date.now()
// let tick = () => {
//     // let now = Date.now()
//     // let delta = now - lastUpdate
//     // lastUpdate = now
//     lowerLimb.rotate(N.z, Math.PI / 100)
//     renderer.render(scene, camera)
//     updateJoinSphere(joinSphere, lowerLimb, upperLimb)
// }
// setInterval(tick, 0)
