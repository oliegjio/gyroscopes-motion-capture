"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var T = require("three");
exports.sphereMesh = function (radius, material) {
    var segments = radius * 3;
    var rings = radius * 3;
    if (!material)
        material = new T.MeshStandardMaterial();
    var sphere = new T.SphereGeometry(radius, segments, rings);
    return new T.Mesh(sphere, material);
};
exports.boxMesh = function (width, height, depth, material) {
    if (!material)
        material = new T.MeshStandardMaterial();
    var box = new T.BoxGeometry(width, height, depth);
    return new T.Mesh(box, material);
};
exports.move = function (object, x, y, z) {
    object.position.setX(x);
    object.position.setY(y);
    object.position.setZ(z);
};
