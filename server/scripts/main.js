"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("three");
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
scene.background = new T.Color(255, 0, 0);
scene.add(camera);
scene.add(light);
container.appendChild(renderer.domElement);
/////////////////////////////////
// GENERAL:
/////////////////////////////////
var updateJoinSphere = function (sphere, box1, box2) {
    var box1Geometry = box1.geometry;
    var box2Geometry = box2.geometry;
    box1Geometry.computeBoundingBox();
};
var limb1 = new limb_1.Limb(30, 200);
limb1.move(-50, 0, -300);
limb1.toScene(scene);
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
    renderer.render(scene, camera);
    limb1.rotate(geometry_1.N.z, Math.PI / 100);
    limb1.rotate(geometry_1.N.x, Math.PI / 100);
    limb1.rotate(geometry_1.N.y, Math.PI / 100);
    requestAnimationFrame(update);
};
requestAnimationFrame(update);
